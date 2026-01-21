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
  Route,
  Activity,
  List,
  Plus,
  Trash2,
  X,
} from 'lucide-react';
import { type XrayGeneratorConfig } from './types';
import {
  generateVlessLink,
  generateClientJson,
  generateServerJson,
  generateUUID,
  generateShortId,
  generateKeyPair,
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
    inputTabs: {
      general: 'Общие',
      transport: 'Транспорт',
      routing: 'Роутинг',
      advanced: 'Дополнительно',
    },
    logLevel: 'Уровень логов',
    logAccess: 'Access Log',
    logError: 'Error Log',
    routingBuilder: {
      title: 'Конструктор правил',
      addRule: 'Добавить правило',
      type: 'Тип (IP/Domain)',
      value: 'Значение (через запятую)',
      outbound: 'Действие (Outbound Tag)',
      block: 'Блокировать (block)',
      direct: 'Напрямую (direct)',
      proxy: 'Прокси (proxy)',
      custom: 'Свой tag...',
    },
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
    inputTabs: {
      general: 'General',
      transport: 'Transport',
      routing: 'Routing',
      advanced: 'Advanced',
    },
    logLevel: 'Log Level',
    logAccess: 'Access Log Path',
    logError: 'Error Log Path',
    routingBuilder: {
      title: 'Rule Builder',
      addRule: 'Add Rule',
      type: 'Type (IP/Domain)',
      value: 'Value (comma separated)',
      outbound: 'Action (Outbound Tag)',
      block: 'Block',
      direct: 'Direct',
      proxy: 'Proxy',
      custom: 'Custom tag...',
    },
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

  // Рассчитываем позицию, чтобы не вылезать за экран
  const tooltipWidth = 240; // Ширина тултипа (w-60)
  const gap = 10;

  let left = rect.left + rect.width / 2;
  let top = rect.top - gap;
  let transform = 'translate(-50%, -100%)';

  // Если вылезает справа
  if (left + tooltipWidth / 2 > window.innerWidth) {
    left = window.innerWidth - gap;
    transform = 'translate(-100%, -100%)';
  }
  // Если вылезает слева
  if (left - tooltipWidth / 2 < 0) {
    left = gap;
    transform = 'translate(0, -100%)';
  }

  // Если вылезает сверху (показываем снизу)
  if (top - 100 < 0) {
    // 100 - примерная высота
    top = rect.bottom + gap;
    transform = transform.replace('-100%)', '0%)');
  }

  const style: React.CSSProperties = {
    position: 'fixed',
    top,
    left,
    transform,
    zIndex: 9999,
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
        className="ml-1.5 h-4 w-4 cursor-help text-[var(--color-muted-foreground)] opacity-50 transition-all hover:text-[var(--color-primary)] hover:opacity-100"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVisible(false)}
      />
      {isVisible && rect && (
        <TooltipPortal rect={rect}>
          <div className="w-60 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3 shadow-2xl backdrop-blur-xl">
            <p className="text-xs leading-relaxed text-[var(--color-foreground)]">{text}</p>
          </div>
        </TooltipPortal>
      )}
    </>
  );
};

const InputField = ({ label, value, onChange, placeholder, tooltip, className = '' }: any) => (
  <div className={`flex flex-col gap-2 ${className}`}>
    <div className="flex items-center">
      <label className="text-xs font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase opacity-80">
        {label}
      </label>
      {tooltip && <InfoTooltip text={tooltip} />}
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 px-3 py-2.5 font-mono text-sm text-[var(--color-foreground)] transition-all placeholder:text-[var(--color-muted-foreground)]/40 focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] focus:outline-none"
    />
  </div>
);

const SelectField = ({ label, value, onChange, options, tooltip }: any) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center">
      <label className="text-xs font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase opacity-80">
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

const RoutingRuleBuilder = ({
  rules,
  onChange,
  t,
}: {
  rules: any[];
  onChange: (r: any[]) => void;
  t: any;
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // New Rule State
  const [newRuleType, setNewRuleType] = useState('field'); // always field
  const [newRuleTarget, setNewRuleTarget] = useState('ip'); // ip or domain
  const [newRuleValue, setNewRuleValue] = useState('');
  const [newRuleOutbound, setNewRuleOutbound] = useState('block');

  const addRule = () => {
    if (!newRuleValue) return;
    const values = newRuleValue
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (values.length === 0) return;

    const newRule: any = {
      type: 'field',
      outboundTag: newRuleOutbound,
    };
    // Add domain or ip field
    newRule[newRuleTarget] = values;

    onChange([...rules, newRule]);
    setNewRuleValue('');
    setIsEditing(false);
  };

  const removeRule = (index: number) => {
    const n = [...rules];
    n.splice(index, 1);
    onChange(n);
  };

  // JSON switch
  const [showJson, setShowJson] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-xs font-bold tracking-wider text-[var(--color-muted-foreground)] uppercase opacity-80">
          {t.title}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setShowJson(!showJson)}
            className="text-[10px] text-[var(--color-primary)] underline"
          >
            {showJson ? 'Switch to GUI' : 'Switch to JSON'}
          </button>
          {!showJson && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 rounded bg-[var(--color-primary)]/10 px-2 py-1 text-[10px] text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/20"
            >
              <Plus className="h-3 w-3" /> {t.addRule}
            </button>
          )}
        </div>
      </div>

      {showJson ? (
        <JsonRoutingEditor rules={rules} onChange={onChange} />
      ) : (
        <div className="space-y-2">
          {rules.length === 0 && (
            <div className="rounded-lg border border-dashed border-[var(--color-border)] p-4 text-center text-xs text-[var(--color-muted-foreground)]">
              No rules defined.
            </div>
          )}

          {/* List of Rules */}
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="group flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/50 p-2 transition-all hover:border-[var(--color-primary)]/50"
            >
              <div className="flex flex-col gap-1 overflow-hidden">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[var(--color-background)] px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase opacity-70">
                    {rule.type}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${rule.outboundTag === 'block' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}
                  >
                    ➔ {rule.outboundTag}
                  </span>
                </div>
                <div className="truncate font-mono text-xs text-[var(--color-muted-foreground)]">
                  {rule.domain ? `domain: ${rule.domain.join(', ')}` : ''}
                  {rule.ip ? `ip: ${rule.ip.join(', ')}` : ''}
                  {!rule.domain && !rule.ip && JSON.stringify(rule)}
                </div>
              </div>
              <button
                onClick={() => removeRule(idx)}
                className="rounded p-1.5 text-[var(--color-muted-foreground)] opacity-0 transition-colors group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {/* Add Rule Form */}
          {isEditing && (
            <div className="animate-in slide-in-from-top-2 mt-2 space-y-3 rounded-lg border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/5 p-3">
              <div className="flex items-center justify-between text-xs font-bold text-[var(--color-primary)]">
                New Rule
                <button onClick={() => setIsEditing(false)}>
                  <X className="h-3 w-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <select
                  className="rounded border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-xs"
                  value={newRuleTarget}
                  onChange={(e) => setNewRuleTarget(e.target.value)}
                >
                  <option value="ip">IP</option>
                  <option value="domain">Domain</option>
                </select>
                <select
                  className="rounded border border-[var(--color-border)] bg-[var(--color-background)] p-2 text-xs"
                  value={newRuleOutbound}
                  onChange={(e) => setNewRuleOutbound(e.target.value)}
                >
                  <option value="block">{t.block}</option>
                  <option value="direct">{t.direct}</option>
                  <option value="proxy">{t.proxy}</option>
                </select>
              </div>
              <input
                type="text"
                className="w-full rounded border border-[var(--color-border)] bg-[var(--color-background)] p-2 font-mono text-xs"
                placeholder={
                  newRuleTarget === 'ip'
                    ? 'geoip:private, 8.8.8.8'
                    : 'geosite:category-ads-all, google.com'
                }
                value={newRuleValue}
                onChange={(e) => setNewRuleValue(e.target.value)}
              />
              <button
                onClick={addRule}
                className="w-full rounded bg-[var(--color-primary)] py-1.5 text-xs font-bold text-white shadow-[var(--color-primary)]/20 shadow-lg"
              >
                {t.addRule}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const JsonRoutingEditor = ({ rules, onChange }: { rules: any[]; onChange: (r: any[]) => void }) => {
  const [json, setJson] = useState(JSON.stringify(rules, null, 2));
  const [error, setError] = useState<string | null>(null);

  const handleJsonChange = (val: string) => {
    setJson(val);
    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) {
        onChange(parsed);
        setError(null);
      } else {
        setError('Root must be an array');
      }
    } catch (e) {
      setError('Invalid JSON');
    }
  };

  return (
    <div className="animate-in fade-in flex flex-col gap-2">
      <textarea
        className={`h-40 w-full rounded-lg border bg-[var(--color-card)]/50 p-3 font-mono text-xs focus:border-[var(--color-primary)] focus:ring-1 focus:outline-none ${error ? 'border-red-500' : 'border-[var(--color-border)]'}`}
        value={json}
        onChange={(e) => handleJsonChange(e.target.value)}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

// --- ГЛАВНЫЙ КОМПОНЕНТ ---

export default function XrayGenerator({ lang: initialLang }: { lang?: 'ru' | 'en' }) {
  const lang = useLanguage(initialLang);
  const t = TEXTS[lang]; // Текущие тексты

  const [activeTab, setActiveTab] = useState<'general' | 'transport' | 'routing' | 'advanced'>(
    'general'
  );

  const [config, setConfig] = useState<XrayGeneratorConfig>({
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

    // Logging (New)
    logLevel: 'warning',
    logAccess: '',
    logError: '',

    // Routing (New)
    routingRules: [
      {
        type: 'field',
        ip: ['geoip:private'],
        outboundTag: 'block',
      },
    ],

    // Advanced fields
    isTemplate: false,
    enableRouting: true,
    dnsServers: ['8.8.8.8', '1.1.1.1'],
  });

  // Default to SERVER output as requested
  const [activeOutput, setActiveOutput] = useState<'link' | 'client' | 'server'>('server');
  const [copied, setCopied] = useState(false);
  const [keys, setKeys] = useState<{ privateKey: string; publicKey: string } | null>(null);

  useEffect(() => {
    // Автогенерация ключей при старте
    const k = generateKeyPair();
    setKeys(k);
    setConfig((prev) => ({
      ...prev,
      uuid: generateUUID(),
      shortId: generateShortId(),
      privateKey: k.privateKey,
      publicKey: k.publicKey,
    }));
  }, []);

  const regenerateKeys = () => {
    const k = generateKeyPair();
    setKeys(k);
    setConfig({ ...config, privateKey: k.privateKey, publicKey: k.publicKey });
  };

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

  // Render content based on active Input Tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-4 duration-300">
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
                title="Generate New"
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
                  placeholder="1.2.3.4"
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

            {/* Mode Toggle Moved Here for Visibility */}
            <div
              className={`mt-4 flex items-center justify-between rounded-lg border p-3 transition-all ${config.isTemplate ? 'border-[var(--color-primary)]/50 bg-[var(--color-primary)]/5' : 'border-[var(--color-border)] bg-[var(--color-card)]/30'}`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[var(--color-foreground)]">
                  Pasarguard / Panel Template Mode
                </span>
                <span className="text-xs text-[var(--color-muted-foreground)]">
                  {config.isTemplate
                    ? 'Generating TEMPLATE (empty clients).'
                    : 'Generating USER CONFIG (with UUID).'}
                </span>
              </div>
              <button
                onClick={() => setConfig({ ...config, isTemplate: !config.isTemplate })}
                className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${config.isTemplate ? 'bg-[var(--color-primary)]' : 'bg-gray-600'}`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${config.isTemplate ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>
          </div>
        );
      case 'transport':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-6 duration-300">
            <div className="grid grid-cols-2 gap-4">
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
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]/40 p-4">
              <div className="mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)]">
                  <Shield className="h-3.5 w-3.5" /> {t.realitySettings}
                </span>
                <InfoTooltip text={t.realityTooltip} />
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <InputField
                    label={t.pubKey}
                    value={config.publicKey}
                    onChange={(v: string) => setConfig({ ...config, publicKey: v })}
                    placeholder="Paste Server Public Key"
                    tooltip={t.pubKeyTooltip}
                  />
                  <button
                    onClick={regenerateKeys}
                    className="absolute top-7 right-2 rounded-md p-1.5 text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)]/10"
                    title="Generate New Keys"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
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
          </div>
        );
      case 'routing':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-6 duration-300">
            <div className="flex items-center justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-card)]/30 p-3">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[var(--color-foreground)]">
                  Enable Routing
                </span>
              </div>
              <button
                onClick={() => setConfig({ ...config, enableRouting: !config.enableRouting })}
                className={`relative h-6 w-11 rounded-full transition-colors ${config.enableRouting ? 'bg-[var(--color-primary)]' : 'bg-gray-600'}`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform ${config.enableRouting ? 'translate-x-5' : 'translate-x-0'}`}
                />
              </button>
            </div>

            {config.enableRouting && (
              <>
                <div className="border-t border-[var(--color-border)]/50 pt-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold">
                    <List className="h-4 w-4" /> Logs
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <SelectField
                      label={t.logLevel}
                      value={config.logLevel}
                      onChange={(v: any) => setConfig({ ...config, logLevel: v })}
                      options={[
                        { value: 'none', label: 'None' },
                        { value: 'error', label: 'Error' },
                        { value: 'warning', label: 'Warning' },
                        { value: 'info', label: 'Info' },
                        { value: 'debug', label: 'Debug' },
                      ]}
                    />
                    <InputField
                      label={t.logAccess}
                      value={config.logAccess}
                      onChange={(v: string) => setConfig({ ...config, logAccess: v })}
                      placeholder="/var/log/xray/access.log"
                    />
                  </div>
                </div>

                <div className="border-t border-[var(--color-border)]/50 pt-4">
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-bold">
                    <Route className="h-4 w-4" /> Rules
                  </h4>
                  <RoutingRuleBuilder
                    rules={config.routingRules}
                    onChange={(r) => setConfig({ ...config, routingRules: r })}
                    t={t.routingBuilder}
                  />
                </div>
              </>
            )}
          </div>
        );
      case 'advanced':
        return (
          <div className="animate-in fade-in slide-in-from-left-4 space-y-6 duration-300">
            <InputField
              label="DNS Servers"
              value={config.dnsServers.join(', ')}
              onChange={(v: string) =>
                setConfig({
                  ...config,
                  dnsServers: v
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
              placeholder="8.8.8.8, 1.1.1.1"
              tooltip="Comma separated list of DNS servers"
            />
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 items-start gap-8 xl:grid-cols-2">
      {/* ЛЕВАЯ ПАНЕЛЬ: ВВОД ДАННЫХ (Tabs) */}
      <div className="glass-card rounded-2xl border border-[var(--color-border)] p-1">
        {/* Tab Headers */}
        <div className="flex border-b border-[var(--color-border)] px-2 pt-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`border-b-2 px-4 pb-3 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'general' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
          >
            {t.inputTabs.general}
          </button>
          <button
            onClick={() => setActiveTab('transport')}
            className={`border-b-2 px-4 pb-3 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'transport' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
          >
            {t.inputTabs.transport}
          </button>
          <button
            onClick={() => setActiveTab('routing')}
            className={`border-b-2 px-4 pb-3 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'routing' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
          >
            {t.inputTabs.routing}
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`border-b-2 px-4 pb-3 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'advanced' ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-transparent text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'}`}
          >
            {t.inputTabs.advanced}
          </button>
        </div>

        {/* Tab Body */}
        <div className="min-h-[500px] p-6">{renderTabContent()}</div>
      </div>

      {/* ПРАВАЯ ПАНЕЛЬ: ВЫВОД */}
      <div className="space-y-4 xl:sticky xl:top-24">
        <div className="flex rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-1">
          {[
            { id: 'server', icon: Server, label: t.tabs.server },
            { id: 'client', icon: FileJson, label: t.tabs.client },
            { id: 'link', icon: Smartphone, label: t.tabs.link },
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

        <div className="glass-card flex h-[700px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)]">
          <div className="custom-scrollbar group relative flex-1 overflow-auto bg-[#0d1117] p-4 text-start">
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
