import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import {
  Copy,
  RefreshCw,
  Zap,
  Shield,
  Settings,
  CheckCheck,
  Smartphone,
  Server,
  FileJson,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { type XrayConfig } from './types';
import {
  generateVlessLink,
  generateClientJson,
  generateServerJson,
  generateUUID,
  generateShortId,
} from './utils';

// --- I18N & TEXTS ---

const TEXTS = {
  ru: {
    coreSettings: 'Основные настройки',
    uuid: 'UUID',
    uuidTooltip: 'Уникальный ID пользователя. Должен совпадать на клиенте и сервере.',
    address: 'Адрес сервера',
    addressTooltip: 'IP адрес или домен (например: 1.2.3.4 или vpn.mysite.com).',
    port: 'Порт',
    portTooltip: 'Порт подключения. Для Reality обязательно 443, для остальных любой.',
    transport: 'Транспорт и Безопасность',
    network: 'Протокол',
    networkTooltip: 'TCP+Vision — самый стабильный. XHTTP — для тяжелых условий блокировок.',
    flow: 'Flow (Поток)',
    flowTooltip: 'Алгоритм XTLS Vision. Нужен для TCP Reality, чтобы скрывать «TLS внутри TLS».',
    realitySettings: 'Настройки REALITY',
    realityTooltip:
      'Позволяет маскироваться под чужие сайты (Microsoft, Google) без своих сертификатов.',
    pubKey: 'Public Key',
    pubKeyTooltip: "Публичный ключ с сервера. Получите командой 'xray x25519'.",
    sni: 'SNI / Dest',
    sniTooltip: 'Домен, под который маскируемся. Должен поддерживать TLS 1.3 и H2.',
    shortId: 'Short ID',
    shortIdTooltip: 'Короткий ID для отличия «своих». Чужие увидят настоящий сайт.',
    fingerprint: 'Отпечаток',
    fingerprintTooltip: 'Имитация браузера (uTLS). Спасает от блокировок по JA3/JA4.',
    xhttpSettings: 'Настройки XHTTP',
    xhttpTooltip: 'SplitHTTP дробит трафик на мелкие запросы. Выглядит как CDN/API трафик.',
    xhttpWarnings: {
      title: 'Ограничения XHTTP:',
      relay: 'Не поддерживает Relay (проброс).',
      ios: 'Нестабилен на iOS в фоне (Sing-box).',
      nginx: 'Генерирует много логов на Nginx.',
    },
    mode: 'Режим',
    modeTooltip: 'Packet-Up лучше для обхода. Stream-Up быстрее.',
    path: 'Путь',
    pathTooltip: 'URL путь для маскировки (например /api/video).',
    xmux: 'XMUX (Мультиплексирование)',
    xmuxTooltip: 'Позволяет гнать много данных через одно TCP соединение.',
    concurrency: 'Потоки',
    maxReq: 'Лимит запросов',
    tabs: {
      link: 'Ссылка',
      client: 'Клиент',
      server: 'Сервер',
    },
    copy: 'Скопировать',
    copied: 'Скопировано!',
    footer: 'Для v2rayNG, Hiddify, NekoBox',
  },
  en: {
    coreSettings: 'Core Settings',
    uuid: 'UUID',
    uuidTooltip: 'Unique User ID. Must match on client and server.',
    address: 'Server Address',
    addressTooltip: 'IP address or domain (e.g., 1.2.3.4 or vpn.mysite.com).',
    port: 'Port',
    portTooltip: 'Connection port. 443 is required for Reality.',
    transport: 'Transport & Security',
    network: 'Network',
    networkTooltip: 'TCP+Vision is standard. XHTTP is for heavy censorship environments.',
    flow: 'Flow',
    flowTooltip: "XTLS Vision algorithm. Required for TCP Reality to hide 'TLS inside TLS'.",
    realitySettings: 'REALITY Settings',
    realityTooltip: 'Masquerades as popular sites (Microsoft, Google) without owning them.',
    pubKey: 'Public Key',
    pubKeyTooltip: "Server Public Key (x25519). Get via 'xray x25519' command.",
    sni: 'SNI / Dest',
    sniTooltip: 'Domain to masquerade as. Must support TLS 1.3 and H2.',
    shortId: 'Short ID',
    shortIdTooltip: 'Short ID to distinguish valid clients. Others see the real site.',
    fingerprint: 'Fingerprint',
    fingerprintTooltip: 'Browser simulation (uTLS). Bypasses JA3/JA4 fingerprinting.',
    xhttpSettings: 'XHTTP Settings',
    xhttpTooltip: 'SplitHTTP splits traffic into small requests. Looks like CDN/API traffic.',
    xhttpWarnings: {
      title: 'XHTTP Limitations:',
      relay: 'No Relay support.',
      ios: 'Unstable on iOS background (Sing-box).',
      nginx: 'Generates high log volume on Nginx.',
    },
    mode: 'Mode',
    modeTooltip: 'Packet-Up is stealthier. Stream-Up is faster.',
    path: 'Path',
    pathTooltip: 'URL path for camouflage (e.g. /api/video).',
    xmux: 'XMUX (Multiplexing)',
    xmuxTooltip: 'Multiplexes multiple streams into one TCP connection.',
    concurrency: 'Concurrency',
    maxReq: 'Max Requests',
    tabs: {
      link: 'Share Link',
      client: 'Client Config',
      server: 'Server Inbound',
    },
    copy: 'Copy',
    copied: 'Copied!',
    footer: 'For v2rayNG, Hiddify, NekoBox',
  },
};

// Хук для определения языка
const useLanguage = (initialLang?: 'ru' | 'en') => {
  const [lang, setLang] = useState<'ru' | 'en'>(initialLang || 'ru');

  useEffect(() => {
    if (initialLang) return;

    // Функция проверки языка из HTML атрибута (Astro его меняет)
    const checkLang = () => {
      const htmlLang = document.documentElement.lang;
      setLang(htmlLang === 'en' ? 'en' : 'ru');
    };

    // Проверяем сразу
    checkLang();

    // Следим за изменениями атрибутов на <html>
    const observer = new MutationObserver(checkLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });

    return () => observer.disconnect();
  }, [initialLang]);

  return lang;
};

// --- КОМПОНЕНТЫ UI ---

// Портал для тултипа (Чтобы не обрезался overflow:hidden)
const TooltipPortal = ({ children, rect }: { children: React.ReactNode; rect: DOMRect }) => {
  if (typeof document === 'undefined') return null;

  // Позиционируем
  const style: React.CSSProperties = {
    position: 'fixed',
    top: rect.top - 10, // Чуть выше
    left: rect.left + rect.width / 2,
    transform: 'translate(-50%, -100%)',
    zIndex: 9999, // Поверх всего
    pointerEvents: 'none',
  };

  return createPortal(
    <div style={style} className="animate-in fade-in zoom-in-95 duration-200">
      {children}
    </div>,
    document.body
  );
};

const InfoTooltip = ({ text }: { text: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const iconRef = useRef<SVGSVGElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      setRect(iconRef.current.getBoundingClientRect());
      setIsVisible(true);
    }
  };

  return (
    <>
      <Info
        ref={iconRef}
        className="ml-1.5 h-3.5 w-3.5 cursor-help text-[var(--color-muted-foreground)] opacity-50 transition-all hover:text-[var(--color-primary)] hover:opacity-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && rect && (
        <TooltipPortal rect={rect}>
          <div className="w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-xs leading-relaxed text-[var(--color-foreground)] shadow-2xl backdrop-blur-xl">
            {text}
            {/* Стрелочка вниз */}
            <div className="absolute top-full left-1/2 -mt-[1px] h-2 w-2 -translate-x-1/2 rotate-45 border-r border-b border-[var(--color-border)] bg-[var(--color-card)]"></div>
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

const InputField = ({ label, value, onChange, placeholder, tooltip, className = '' }: any) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <div className="flex items-center">
      <label className="text-[10px] font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase opacity-80">
        {label}
      </label>
      {tooltip && <InfoTooltip text={tooltip} />}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2 font-mono text-sm text-[var(--color-foreground)] transition-all placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, tooltip }: any) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex items-center">
      <label className="text-[10px] font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase opacity-80">
        {label}
      </label>
      {tooltip && <InfoTooltip text={tooltip} />}
    </div>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2 text-sm text-[var(--color-foreground)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none"
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value} className="bg-[var(--color-background)]">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
        <svg
          className="h-4 w-4 text-[var(--color-muted-foreground)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
);

// --- ГЛАВНЫЙ КОМПОНЕНТ ---

export default function XrayGenerator({ lang: initialLang }: { lang?: 'ru' | 'en' }) {
  const lang = useLanguage(initialLang);
  const t = TEXTS[lang]; // Текущие тексты

  const [config, setConfig] = useState<XrayConfig>({
    uuid: '',
    address: 'example.com',
    port: 443,
    flow: 'xtls-rprx-vision',
    network: 'tcp',
    security: 'reality',
    publicKey: '',
    privateKey: '',
    shortId: '',
    sni: 'yahoo.com',
    fingerprint: 'chrome',
    spiderX: '',
    serviceName: 'grpc',
    xhttpMode: 'auto',
    xhttpPath: '/xhttp',
    xhttpHost: '',
    xmux: { maxConcurrency: '16-32', hMaxRequestTimes: '600-900', hMaxReusableSecs: '1800-3000' },
  });

  const [activeOutput, setActiveOutput] = useState<'link' | 'client' | 'server'>('link');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setConfig((prev) => ({
      ...prev,
      uuid: generateUUID(),
      shortId: generateShortId(),
    }));
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getOutput = () => {
    if (activeOutput === 'link') return generateVlessLink(config);
    if (activeOutput === 'client') return generateClientJson(config);
    return generateServerJson(config);
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
      {/* ЛЕВАЯ ПАНЕЛЬ: ВВОД ДАННЫХ */}
      <div className="space-y-6">
        {/* 1. CORE SETTINGS */}
        <div className="glass-card rounded-2xl border border-[var(--color-border)] p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-[var(--color-border)]/50 pb-3">
            <Settings className="h-5 w-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">{t.coreSettings}</h3>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <InputField
                label={t.uuid}
                value={config.uuid}
                onChange={(v: string) => setConfig({ ...config, uuid: v })}
                tooltip={t.uuidTooltip}
              />
              <button
                onClick={() => setConfig({ ...config, uuid: generateUUID() })}
                className="absolute top-7 right-2 rounded-md p-1.5 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10"
                title="Сгенерировать новый"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <InputField
                  label={t.address}
                  value={config.address}
                  onChange={(v: string) => setConfig({ ...config, address: v })}
                  placeholder="1.2.3.4 or domain.com"
                  tooltip={t.addressTooltip}
                />
              </div>
              <InputField
                label={t.port}
                value={config.port}
                onChange={(v: string) => setConfig({ ...config, port: Number(v) })}
                placeholder="443"
                tooltip={t.portTooltip}
              />
            </div>
          </div>
        </div>

        {/* 2. TRANSPORT & REALITY */}
        <div className="glass-card rounded-2xl border border-[var(--color-border)] p-6">
          <div className="mb-5 flex items-center gap-2 border-b border-[var(--color-border)]/50 pb-3">
            <Zap className="h-5 w-5 text-[var(--color-primary)]" />
            <h3 className="text-lg font-bold">{t.transport}</h3>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <SelectField
              label={t.network}
              value={config.network}
              onChange={(v: any) => setConfig({ ...config, network: v })}
              options={[
                { value: 'tcp', label: 'TCP (Vision)' },
                { value: 'xhttp', label: 'XHTTP' },
                { value: 'grpc', label: 'gRPC' },
              ]}
              tooltip={t.networkTooltip}
            />
            <SelectField
              label={t.flow}
              value={config.flow}
              onChange={(v: any) => setConfig({ ...config, flow: v })}
              options={[
                { value: '', label: 'None' },
                { value: 'xtls-rprx-vision', label: 'xtls-rprx-vision' },
              ]}
              tooltip={t.flowTooltip}
            />
          </div>

          {/* REALITY BLOCK */}
          <div className="mb-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/40 p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)]">
                <Shield className="h-3.5 w-3.5" /> {t.realitySettings}
              </span>
              <InfoTooltip text={t.realityTooltip} />
            </div>
            <div className="space-y-4">
              <InputField
                label={t.pubKey}
                value={config.publicKey}
                onChange={(v: string) => setConfig({ ...config, publicKey: v })}
                placeholder="Paste Server Public Key"
                tooltip={t.pubKeyTooltip}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label={t.sni}
                  value={config.sni}
                  onChange={(v: string) => setConfig({ ...config, sni: v })}
                  placeholder="yahoo.com"
                  tooltip={t.sniTooltip}
                />
                <div className="relative">
                  <InputField
                    label={t.shortId}
                    value={config.shortId}
                    onChange={(v: string) => setConfig({ ...config, shortId: v })}
                    tooltip={t.shortIdTooltip}
                  />
                  <button
                    onClick={() => setConfig({ ...config, shortId: generateShortId() })}
                    className="absolute top-7 right-2 rounded-md p-1.5 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label={t.fingerprint}
                  value={config.fingerprint}
                  onChange={(v: any) => setConfig({ ...config, fingerprint: v })}
                  options={[
                    { value: 'chrome', label: 'Chrome' },
                    { value: 'firefox', label: 'Firefox' },
                    { value: 'random', label: 'Random' },
                  ]}
                  tooltip={t.fingerprintTooltip}
                />
                <InputField
                  label="SpiderX"
                  value={config.spiderX}
                  onChange={(v: string) => setConfig({ ...config, spiderX: v })}
                  placeholder="/"
                />
              </div>
            </div>
          </div>

          {/* XHTTP WARNINGS & SETTINGS */}
          {config.network === 'xhttp' && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/40 p-4">
              <span className="mb-3 flex items-center justify-between text-xs font-bold text-[var(--color-primary)]">
                <span>{t.xhttpSettings}</span>
                <InfoTooltip text={t.xhttpTooltip} />
              </span>

              {/* WARNING BOX */}
              <div className="mb-4 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-500" />
                  <div className="text-[11px] leading-relaxed text-amber-500/80">
                    <strong className="mb-1 block text-amber-500">{t.xhttpWarnings.title}</strong>
                    <ul className="list-disc space-y-1 pl-3">
                      <li>{t.xhttpWarnings.relay}</li>
                      <li>{t.xhttpWarnings.ios}</li>
                      <li>{t.xhttpWarnings.nginx}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-4">
                <SelectField
                  label={t.mode}
                  value={config.xhttpMode}
                  onChange={(v: any) => setConfig({ ...config, xhttpMode: v })}
                  options={[
                    { value: 'auto', label: 'Auto' },
                    { value: 'packet-up', label: 'Packet-Up (H2)' },
                    { value: 'stream-up', label: 'Stream-Up' },
                  ]}
                  tooltip={t.modeTooltip}
                />
                <InputField
                  label={t.path}
                  value={config.xhttpPath}
                  onChange={(v: string) => setConfig({ ...config, xhttpPath: v })}
                  tooltip={t.pathTooltip}
                />
              </div>
              <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-3">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[10px] font-bold text-[var(--color-muted-foreground)] uppercase">
                    {t.xmux}
                  </p>
                  <InfoTooltip text={t.xmuxTooltip} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <InputField
                    className="origin-left scale-90"
                    label={t.concurrency}
                    value={config.xmux.maxConcurrency}
                    onChange={(v: string) =>
                      setConfig({ ...config, xmux: { ...config.xmux, maxConcurrency: v } })
                    }
                    placeholder="16-32"
                  />
                  <InputField
                    className="origin-left scale-90"
                    label={t.maxReq}
                    value={config.xmux.hMaxRequestTimes}
                    onChange={(v: string) =>
                      setConfig({ ...config, xmux: { ...config.xmux, hMaxRequestTimes: v } })
                    }
                    placeholder="600-900"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: ВЫВОД */}
      <div className="space-y-4 xl:sticky xl:top-24">
        <div className="flex rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1">
          {[
            { id: 'link', icon: Smartphone, label: t.tabs.link },
            { id: 'client', icon: FileJson, label: t.tabs.client },
            { id: 'server', icon: Server, label: t.tabs.server },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveOutput(tab.id as any)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-xs font-bold tracking-wider uppercase transition-all ${activeOutput === tab.id ? 'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-[var(--color-primary)]/20 shadow-lg' : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="glass-card flex h-[500px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <div className="custom-scrollbar group relative flex-1 overflow-auto bg-[#0d1117] p-4">
            <pre
              className={`font-mono text-xs leading-relaxed break-all whitespace-pre-wrap sm:text-sm ${activeOutput === 'link' ? 'text-emerald-400' : 'text-blue-300'}`}
            >
              {getOutput()}
            </pre>
          </div>

          <div className="flex items-center justify-between border-t border-[var(--color-border)] bg-[var(--color-card)]/50 p-4 backdrop-blur">
            <div className="text-xs text-[var(--color-muted-foreground)]">{t.footer}</div>
            <button
              onClick={() => handleCopy(getOutput())}
              className="btn-primary flex items-center gap-2 px-4 py-2 text-sm"
            >
              {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
