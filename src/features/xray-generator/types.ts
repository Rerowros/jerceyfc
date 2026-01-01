export type NetworkType = 'tcp' | 'grpc' | 'xhttp';
export type SecurityType = 'reality' | 'tls' | 'none';
export type XHttpMode = 'auto' | 'packet-up' | 'stream-up' | 'stream-one';

export interface XmuxConfig {
  maxConcurrency: string; // "16-32"
  hMaxRequestTimes: string; // "600-900"
  hMaxReusableSecs: string; // "1800-3000"
}

export interface XrayConfig {
  // Core
  uuid: string;
  address: string; // IP или домен сервера
  port: number;

  // Transport
  network: NetworkType;
  flow: string; // 'xtls-rprx-vision' | ''

  // Reality
  security: SecurityType;
  publicKey: string; // x25519 public key
  privateKey: string; // x25519 private key (для серверного конфига)
  shortId: string; // hex, even length
  sni: string; // dest / serverName
  fingerprint: string; // 'chrome' | 'firefox' | 'random'
  spiderX: string; // Reality path

  // gRPC
  serviceName: string;

  // XHTTP (SplitHTTP)
  xhttpMode: XHttpMode;
  xhttpPath: string;
  xhttpHost: string;
  xmux: XmuxConfig;
}
