export type NetworkType = 'tcp' | 'grpc' | 'xhttp';
export type SecurityType = 'reality' | 'tls' | 'none';
export type XHttpMode = 'auto' | 'packet-up' | 'stream-up' | 'stream-one';

export interface XmuxConfig {
  maxConcurrency: string; // "16-32"
  hMaxRequestTimes: string; // "600-900"
  hMaxReusableSecs: string; // "1800-3000"
}

// --- Xray Core Types ---

export interface LogConfig {
  access?: string;
  error?: string;
  loglevel: 'debug' | 'info' | 'warning' | 'error' | 'none';
  dnsLog?: boolean;
}

export interface DnsConfig {
  servers: (string | object)[];
  queryStrategy?: 'UseIP' | 'UseIPv4' | 'UseIPv6';
  disableCache?: boolean;
  disableFallback?: boolean;
}

export interface RoutingRule {
  type: 'field';
  domain?: string[];
  ip?: string[];
  port?: string;
  network?: string;
  source?: string[];
  user?: string[];
  inboundTag?: string[];
  protocol?: string[];
  attrs?: string;
  outboundTag: string;
  balancerTag?: string;
}

export interface RoutingBalancer {
  tag: string;
  selector: string[];
}

export interface RoutingConfig {
  domainStrategy: 'AsIs' | 'IPIfNonMatch' | 'IPOnDemand';
  rules: RoutingRule[];
  balancers?: RoutingBalancer[];
}

export interface PolicyLevel {
  handshake: number;
  connIdle: number;
  uplinkOnly: number;
  downlinkOnly: number;
  statsUserUplink: boolean;
  statsUserDownlink: boolean;
  bufferSize: number;
}

export interface PolicyConfig {
  levels: { [key: string]: PolicyLevel };
  system: {
    statsInboundUplink: boolean;
    statsInboundDownlink: boolean;
    statsOutboundUplink: boolean;
    statsOutboundDownlink: boolean;
  };
}

export interface InboundConfig {
  tag: string;
  port: number | string;
  protocol: string;
  settings: any;
  streamSettings: any;
  sniffing?: {
    enabled: boolean;
    destOverride: string[];
    metadataOnly?: boolean;
  };
}

export interface OutboundConfig {
  tag: string;
  protocol: string;
  settings: any;
  streamSettings?: any;
  mux?: any;
}

// --- Generator State ---

export interface XrayGeneratorConfig {
  // Core
  uuid: string;
  address: string;
  port: number;

  // Transport
  network: NetworkType;
  flow: string;

  // Reality
  security: SecurityType;
  publicKey: string;
  privateKey: string;
  shortId: string;
  sni: string;
  fingerprint: string;
  spiderX: string;

  // gRPC
  serviceName: string;

  // XHTTP
  xhttpMode: XHttpMode;
  xhttpPath: string;
  xhttpHost: string;
  xmux: XmuxConfig;

  // Logging
  logLevel: 'debug' | 'info' | 'warning' | 'error' | 'none';
  logAccess: string;
  logError: string;

  // Routing
  routingRules: {
    type: string;
    ip?: string[];
    domain?: string[];
    outboundTag: string;
  }[];

  // Advanced / Template
  isTemplate: boolean; // Если true, то clients: [] (пустой)
  enableRouting: boolean;
  dnsServers: string[]; // Просто список IP, например ["8.8.8.8", "1.1.1.1"]
}
