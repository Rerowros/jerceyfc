import type {
  XrayGeneratorConfig,
  RoutingConfig,
  DnsConfig,
  PolicyConfig,
  InboundConfig,
  OutboundConfig,
  LogConfig,
} from './types';
import { generateKeys } from './curve25519';

// Генерация UUID v4
export const generateUUID = () => {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (+c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))).toString(16)
  );
};

// Генерация ShortId (hex, четная длина, max 16)
export const generateShortId = () => {
  const bytes = new Uint8Array(4); // 8 символов
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

// Генерируем реальные x25519 ключи
export const generateKeyPair = () => {
  return generateKeys();
};

// --- ГЕНЕРАТОРЫ ---

export const generateVlessLink = (c: XrayGeneratorConfig, name: string = 'XrayConfig'): string => {
  const url = new URL(`vless://${c.uuid}@${c.address}:${c.port}`);

  url.searchParams.set('security', c.security);
  url.searchParams.set('type', c.network);

  if (c.flow && c.network === 'tcp') {
    url.searchParams.set('flow', c.flow);
  }

  // Reality
  if (c.security === 'reality') {
    url.searchParams.set('pbk', c.publicKey);
    url.searchParams.set('fp', c.fingerprint);
    url.searchParams.set('sni', c.sni);
    url.searchParams.set('sid', c.shortId);
    if (c.spiderX) url.searchParams.set('spx', c.spiderX);
  }

  // gRPC
  if (c.network === 'grpc') {
    url.searchParams.set('serviceName', c.serviceName);
    url.searchParams.set('mode', 'gun');
  }

  // XHTTP
  if (c.network === 'xhttp') {
    url.searchParams.set('path', c.xhttpPath);
    url.searchParams.set('mode', c.xhttpMode);

    if (c.xhttpHost) url.searchParams.set('host', c.xhttpHost);

    // XHTTP Extra Params (XMUX) - упаковываем в JSON
    const extra = {
      xmux: {
        maxConcurrency: c.xmux.maxConcurrency || undefined,
        hMaxRequestTimes: c.xmux.hMaxRequestTimes || undefined,
        hMaxReusableSecs: c.xmux.hMaxReusableSecs || undefined,
      },
    };
    // Очищаем пустые поля
    if (!extra.xmux.maxConcurrency) delete (extra as any).xmux;

    if (Object.keys(extra).length > 0 && (extra as any).xmux) {
      url.searchParams.set('extra', JSON.stringify(extra));
    }
  }

  return url.toString() + `#${encodeURIComponent(name)}`;
};

// Генерация Client Config (Outbound)
export const generateClientJson = (c: XrayGeneratorConfig) => {
  const outbound: any = {
    tag: 'proxy',
    protocol: 'vless',
    settings: {
      vnext: [
        {
          address: c.address,
          port: Number(c.port),
          users: [
            {
              id: c.uuid,
              encryption: 'none',
              flow: c.network === 'tcp' && c.flow ? c.flow : undefined,
            },
          ],
        },
      ],
    },
    streamSettings: {
      network: c.network,
      security: c.security,
    },
  };

  if (c.security === 'reality') {
    outbound.streamSettings.realitySettings = {
      show: false,
      fingerprint: c.fingerprint,
      serverName: c.sni,
      publicKey: c.publicKey,
      shortId: c.shortId,
      spiderX: c.spiderX || '',
    };
  }

  if (c.network === 'xhttp') {
    outbound.streamSettings.xhttpSettings = {
      path: c.xhttpPath,
      mode: c.xhttpMode,
      host: c.xhttpHost || undefined,
      xmux: {
        maxConcurrency: c.xmux.maxConcurrency || '16-32',
        hMaxRequestTimes: c.xmux.hMaxRequestTimes || '600-900',
        hMaxReusableSecs: c.xmux.hMaxReusableSecs || '1800-3000',
      },
    };
  }

  if (c.network === 'grpc') {
    outbound.streamSettings.grpcSettings = {
      serviceName: c.serviceName,
    };
  }

  return JSON.stringify(outbound, null, 2);
};

// Генерация Server Config (FULL + Minimal option)
export const generateServerJson = (c: XrayGeneratorConfig) => {
  const config: any = {};

  // 1. Log
  config.log = {
    loglevel: c.logLevel || 'warning',
  };
  if (c.logAccess) config.log.access = c.logAccess;
  if (c.logError) config.log.error = c.logError;

  // 2. DNS
  if (c.dnsServers && c.dnsServers.length > 0) {
    config.dns = { servers: c.dnsServers };
  }

  // 3. Routing
  if (c.enableRouting) {
    // If we have custom rules defined, use them AND standard rules?
    // Or just use the rules list?
    // Let's assume 'routingRules' is the source of truth if populated,
    // otherwise fallback to a default block list if empty but routing enabled.

    const rules =
      c.routingRules && c.routingRules.length > 0
        ? c.routingRules
        : [
            {
              type: 'field',
              ip: ['geoip:private'],
              outboundTag: 'block',
            },
          ];

    config.routing = {
      domainStrategy: 'IPIfNonMatch',
      rules: rules,
    };
  }

  // 4. Inbounds
  const inbound: any = {
    tag: `vless-${c.network}`,
    port: Number(c.port),
    protocol: 'vless',
    settings: {
      clients: c.isTemplate
        ? []
        : [
            {
              id: c.uuid,
              flow: c.network === 'tcp' && c.flow ? c.flow : '',
              email: 'user',
            },
          ],
      decryption: 'none',
    },
    streamSettings: {
      network: c.network,
      security: c.security,
    },
    sniffing: {
      enabled: true,
      destOverride: ['http', 'tls', 'quic'],
    },
  };

  if (c.security === 'reality') {
    inbound.streamSettings.realitySettings = {
      show: false,
      dest: `${c.sni}:443`,
      xver: 0,
      serverNames: [c.sni, `www.${c.sni}`],
      privateKey: c.privateKey || 'YOUR_PRIVATE_KEY_HERE',
      shortIds: [c.shortId],
    };
  }

  if (c.network === 'xhttp') {
    inbound.streamSettings.xhttpSettings = {
      path: c.xhttpPath,
      mode: c.xhttpMode,
    };
    if (c.xhttpHost) inbound.streamSettings.xhttpSettings.host = c.xhttpHost;
  }

  if (c.network === 'grpc') {
    inbound.streamSettings.grpcSettings = { serviceName: c.serviceName };
  }

  config.inbounds = [inbound];

  // 5. Outbounds
  config.outbounds = [
    {
      protocol: 'freedom',
      tag: 'direct',
    },
    {
      protocol: 'blackhole',
      tag: 'block',
    },
  ];

  return JSON.stringify(config, null, 2);
};
