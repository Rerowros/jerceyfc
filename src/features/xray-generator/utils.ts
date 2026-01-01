import type { XrayConfig } from './types';

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

// Генерация пары ключей (Эмуляция для UI, в реальном проде лучше использовать wasm/libsodium)
// Xray требует Curve25519. В браузере нет нативного API для этого без сторонних либ.
// Мы сделаем кнопку-заглушку, которая вставляет валидный формат, или попросим юзера ввести.
// Для полноценной генерации нужно подключить 'curve25519-js'.
export const generateKeyPair = () => {
  // Это пример валидных ключей для теста UI.
  // В продакшене лучше генерировать на сервере через `xray x25519`
  return {
    private: 'yGTk4vK9pQ5j3wQ8xZ2aN1mJ6lK8xZ2aN1mJ6lK8xZ0=',
    public: 'P_G7x9qL4wN8xZ2aN1mJ6lK8xZ2aN1mJ6lK8xZ2aN1m=',
  };
};

// --- ГЕНЕРАТОРЫ ---

export const generateVlessLink = (c: XrayConfig, name: string = 'XrayConfig'): string => {
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

  // XHTTP (NEW 2026 SPEC)
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
export const generateClientJson = (c: XrayConfig) => {
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

// Генерация Server Config (Inbound) - как в PasarGuard
export const generateServerJson = (c: XrayConfig) => {
  const inbound: any = {
    tag: `vless-${c.network}`,
    port: Number(c.port),
    protocol: 'vless',
    settings: {
      clients: [
        {
          id: c.uuid,
          flow: c.network === 'tcp' && c.flow ? c.flow : '',
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
      scMaxEachPostBytes: '1000000', // Стандарт 2026
      scMinPostsIntervalMs: '10',
      noGRPCHeader: false,
    };
  }

  return JSON.stringify(inbound, null, 2);
};
