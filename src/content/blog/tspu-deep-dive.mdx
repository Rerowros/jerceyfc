---
title:
  ru: "Технический анализ новых алгоритмов фильтрации трафика ТСПУ"
  en: "TSPU Deep Dive: Modern Traffic Classification Techniques"
description:
  ru: "Глубокое техническое исследование современных методов классификации и фильтрации трафика в магистральных сетях."
  en: "A deep dive into the transformation of internet traffic filtering systems: the shift to active probing, behavioral analysis, and surgical precision."
tags: ['DPI', 'TSPU', 'Network Analysis', 'Cybersecurity', 'Runet 2025']
pubDate: 2025-12-15
type: 'web'
excerpt:
  ru: 'К концу 2025 года российский интернет окончательно перешел в эпоху "умной" фильтрации. Разбираем, как современные алгоритмы классификации управляют магистральными потоками данных.'
  en: 'By late 2025, the Russian internet has fully entered the era of "smart" filtering. We analyze how modern classification algorithms manage backbone traffic.'
tldr:
  ru: "Разбираем переход ТСПУ от блокировок IP к поведенческому анализу, узнаем, что стоит за «лимитом 13 КБ» и как активное зондирование верифицирует узлы в реальном времени."
  en: "Analyze the shift from IP blocking to behavioral analysis, discover the mechanics behind the '13 KB limit,' and learn how active probing verifies nodes in real-time."
---
---

<Lang val="ru">

# Введение: Точка невозврата

<Callout type="info" title="Цикл статей «Рунет 2025»">
  Это первая часть исследования, посвященная анализу систем фильтрации. 
</Callout>

К декабрю 2025 года архитектура Рунета стала неотделима от ТСПУ (Технических средств противодействия угрозам). Мы прошли точку невозврата: фильтрация трафика больше не является «внешним фильтром», она встроена в саму логику передачи пакетов на уровне магистралей. Современная система ТСПУ — это распределенная сеть нейросетевых анализаторов, способных в реальном времени классифицировать миллионы соединений и имитировать технические сбои там, где прямое ограничение нецелесообразна.

## Глава 1. Эволюция DPI: Переход к гранулярному анализу пакетов.

История систем фильтрации в России делится на «до» и «после» 2018 года. Провальная попытка ограничения Telegram через реестры IP-адресов стала уроком, который заставил регулятора полностью сменить технологический стек.

### 1.1 Уроки 2018 года: Почему IP-ограничения умерли
В 2018 году регулятор пытался остановить мессенджер, внося в черные списки миллионы IP-адресов облачных провайдеров. Результатом стал колоссальный побочный ущерб (collateral damage): падение банковских систем, ритейла и умных домов.

**Главные выводы регулятора:**
*   **Экономическая неприемлемость:** «Топорные» методы наносят ущерб цифровой экономике выше, чем эффект от фильтрации.
*   **Бесполезность против распределенных сетей:** Динамическая смена IP делает реестровый подход бессмысленным.

### 1.2 Рождение ТСПУ: Централизация и «Стелс-режим»
Принятый в 2019 году закон о «Суверенном рунете» перенес контроль с IP-адресов на **физический уровень магистралей**. На узлах связи всех крупных операторов были установлены комплексы ТСПУ — «черные ящики» на базе Deep Packet Inspection (DPI).

**Ключевые отличия архитектуры 2025 года:**
1.  **Централизация:** Оператор связи больше не управляет фильтрацией. Все команды приходят напрямую из ЦМУ ССОП (Центр мониторинга и управления сетью связи общего пользования).
2.  **Инспекция Payload:** ТСПУ анализирует не только заголовки, но и содержимое пакета.
3.  **Тактика дропа:** Система способна ограничивать конкретные протоколы, не разрывая саму сессию и не мешая работе соседних легитимных сервисов на том же IP.

## Глава 2. Механизмы управления трафиком: Тайм-ауты и ограничения сессий.

К 2025 году ТСПУ перешли от примитивной фильтрации к стратегии накопления данных. Теперь система не принимает решение мгновенно, а «выжидает», пока сессия наберет критическую массу признаков для классификации.

### 2.1 Феномен «13 КБ»: Точка насыщения классификатора
Одной из главных технических особенностей 2024–2025 годов стал обрыв HTTPS-сессий ровно после передачи 13–16 Килобайт данных. Это управляемое **stateful-поведение DPI**.

**Почему именно 13–16 КБ?**
Для современных ML-моделей ТСПУ этот объем является «точкой насыщения» (Saturation Point). В этот диапазон укладывается установление связи, обмен сертификатами и первые зашифрованные пакеты Application Data. Этого достаточно, чтобы с высокой вероятностью классифицировать тип трафика. Как только статистика накоплена, система активирует ограничение.

### 2.2 Сравнительный анализ связности по автономным системам (AS)
Политика ТСПУ в 2025 году крайне неоднородна и зависит от того, кому принадлежит целевой IP-адрес:

| Хостинг / CDN | Характер фильтрации (2025) |
| :--- | :--- |
| **Cloudflare** (AS13335) | **Тотальный дроп ECH** и жесткий лимит 13 КБ. |
| **Hetzner** (AS24940) | **Региональный троттлинг**. Частые обрывы на этапе TLS в ряде регионов. |
| **DigitalOcean** (AS14061) | **Портовая фильтрация**. Ограничение стандартных портов по ML-сигнатуре. |
| **OVH** (AS16276) | **UDP-триггер**. Краткосрочное ограничение IP при фиксации нетипичного UDP-трафика. |

### 2.3 Российские хостинги: Стратегия «Ban-on-Sight» и BGP-Flowspec
Внутри российского сегмента системы применяют политики немедленного ограничения трафика. Здесь система интегрирована напрямую с BGP-маршрутизацией магистральных провайдеров.

**Механика «Черной дыры»:**
1.  **Детекция:** ТСПУ выявляет пакет инициализации нелегитимного соединения.
2.  **Сигнализация:** ЦМУ ССОП мгновенно инициирует анонс «нулевого маршрута» (Null Route) через BGP Flowspec.
3.  **Результат:** Трафик к IP-адресу отбрасывается на ближайшем крупном узле связи (Backbone).

**Временные Blackholes:**
Инновацией 2025 года стали **динамические ограничения на 15 минут**. При обнаружении нетипичного трафика IP-адрес сервера ограничивается на короткий срок. Если после снятия ограничений активность возобновляется, срок ограничения увеличивается прогрессивно.

## Глава 3. Механизмы активной верификации (Active Probing) в современных сетях.

К середине 2025 года российская система ТСПУ окончательно заимствовала наиболее эффективную тактику — **активное зондирование (Active Probing)**. Если раньше система была пассивным наблюдателем, то теперь она стала активным участником сетевого диалога, способным выполнять автоматическую проверку откликов сервера для подтверждения своих подозрений.

### 3.1 Активные зонды ТСПУ: Механика перепроверки в реальном времени

Когда алгоритм ТСПУ фиксирует соединение к зарубежному хосту, которое не поддается мгновенной классификации, система инициирует серию проверочных запросов со своих узлов.

**Как работает активный зонд:**

1.  **Детекция аномалии:** Пользователь инициирует соединение. ТСПУ видит нетипичный отпечаток сессии или распределение длин пакетов.
2.  **Запуск пробы:** Параллельно с сессией пользователя (или сразу после её обрыва) ТСПУ отправляет на целевой IP-адрес сервера собственные пакеты.
3.  **Анализ ответа:** Зонд может имитировать запрос обычного клиента. Цель — спровоцировать сервер на ответ, который выдаст его истинную природу.

По данным исследований, задержка между запросом пользователя и прилетом активного зонда от системы в 2025 году может составлять всего **200–500 мс**, что делает этот процесс практически незаметным.

## Глава 4. Переход к Behavioral ML-Analysis (Машинное обучение)

К концу 2025 года парадигма «одна сигнатура — одно ограничение» окончательно уступила место многофакторному анализу. Масштабные инвестиции в модернизацию ТСПУ позволили внедрить ML-кластеры, способные обрабатывать терабиты трафика в секунду, выявляя скрытые закономерности без необходимости расшифровки содержимого.

### 4.1 Анализ энтропии и статистических профилей

Одной из фундаментальных характеристик любого туннелированного трафика является высокая энтропия (степень случайности) данных. Разница, которую научились видеть ML-модели ТСПУ в 2025 году, заключается в **статистическом профиле сессии**.

**Признаки классификации:**

- **Структура сессии:** Обычный веб-серфинг — это чередование коротких запросов и всплесков ответов. Постоянный туннель характеризуется длинной сессией с монотонно высокой энтропией.
- **Двунаправленная симметрия:** ML-модели анализируют соотношение входящего и исходящего трафика. У специализированных каналов связи это соотношение часто более симметрично, чем у классического HTTP-трафика.

### 4.2 Тайминг-атаки (Timing Analysis) и временные отпечатки

К концу 2025 года ТСПУ начали активно использовать **Temporal Fingerprinting** (временные отпечатки). Интервалы между пакетами (Inter-Packet Arrival times) позволяют выявлять природу приложения.

**Методы временного анализа:**

- **Детекция интерактивности:** Сессии, через которые идет работа в консоли, имеют специфический ритм пакетов, соответствующий человеческому набору текста. 
- **Heartbeat-сигналы:** Многие специализированные протоколы отправляют пакеты для поддержания соединения (Keep-alive) через строго заданные интервалы. ML-модели находят эту цикличественность в общем потоке данных.

### 4.3 Распределение длин пакетов (Packet Size Distribution)

Важным фактором анализа в 2025 году стало распределение размеров полезной нагрузки. ТСПУ строят **гистограммы длин пакетов** для каждого соединения в режиме реального времени.

Если все пакеты в сессии имеют размеры, характерные для специфических протоколов, или, наоборот, демонстрируют аномальную равномерность (из-за фиксированного дополнения — Padding), ML-модель помечает это как признак для активации ограничений. Современные методы анализа позволяют отличать естественные сетевые шумы от попыток программной маскировки структуры трафика.

<Callout type="info" title="Вывод главы">
  В эпоху ML-фильтрации недостаточно зашифровать данные. Любое статистическое отклонение в таймингах или размерах пакетов становится триггером для активации ограничений.
</Callout>

## Глава 5. География и архитектура «островов фильтрации»

К концу 2025 года сформировалась архитектура «островов фильтрации», где технические возможности доступа к сети зависят от географического положения пользователя и провайдера.

### 5.1 Региональные полигоны

Анализ данных мониторинга за 2025 год показывает, что новые методы фильтрации обкатываются на определенных регионах перед федеральным запуском.

- **Северный Кавказ:** Регион с наиболее жесткими политиками, часто используемый для тестирования сценариев существенного ограничения UDP-трафика.
- **Поволжье:** Полигон для ML-анализаторов, где система обучается на плотном городском трафике.
- **Сибирь и Дальний Восток:** Здесь часто проявляется аномалия «13 КБ» из-за специфики трансграничных каналов и жестких настроек ТСПУ для иностранных AS.
- **Москва и Санкт-Петербург:** Характеризуются наличием обширных «белых списков» для обеспечения работы бизнес-инфраструктуры, однако мобильные сети фильтруются так же жестко, как и в регионах.

### 5.2 Фрагментация политик по провайдерам: Mobile vs Fixed

**Мобильные сети:**
Мобильные операторы первыми перешли к модели, где неопознанный зашифрованный трафик может превентивно замедляться. Здесь обкатываются самые ресурсоемкие модели поведенческого анализа.

**Фиксированный интернет:**
Здесь чаще используются классические методы фильтрации по SNI и IP-спискам, дополненные «13 КБ лимитом». Провайдеры вынуждены оставлять больше исключений для обеспечения работы специфического корпоративного софта.

## Глава 6. Эволюция прикладных решений.

Технологическое доминирование ТСПУ в 2025 году заставило разработчиков сетевых решений искать методы адаптации, которые имитируют легитимное поведение браузеров или микросервисов. Основная задача таких систем — создание нагрузки на DPI, которую системе становится экономически невыгодно обрабатывать.

# Заключение: Итоги внедрения систем прогнозного анализа трафика.

К концу 2025 года российская система фильтрации трафика завершила трансформацию из статической модели «черных списков» в динамическую, предиктивную экосистему. 

**Ключевые выводы 2025 года:**
1.  **Поведенческий анализ вместо сигнатур:** Основную роль в фильтрации теперь играет машинное обучение (ML) и активное зондирование. Система ищет «нетипичное поведение» трафика.
2.  **Сетевая фрагментация:** Доступность ресурсов может различаться между регионами в зависимости от текущих настроек локальных узлов ТСПУ.
3.  **Технические издержки:** Агрессивная фильтрация иногда приводит к ложным срабатываниям ML-фильтров, влияя на работу банковских API и корпоративных сервисов.
4.  **Деградация сетевых показателей:** Постоянная инспекция пакетов привела к росту задержек (RTT) на ряде направлений, что стало технологической ценой за внедрение систем глубокого анализа.

В 2026 году прогнозируется дальнейшее размытие границ между специфическим сетевым трафиком и обычной работой веб-сервисов.

</Lang>

<Lang val="en">
# Introduction: The Point of No Return

<Callout type="info" title="'Runet 2025' Article Series">
  This is the first part of a study dedicated to the analysis of filtering systems. 
</Callout>

By December 2025, the architecture of the Runet has become inseparable from TSPU (Technical Means of Counteracting Threats). We have passed the point of no return: traffic filtering is no longer an "external filter"; it is built into the very logic of packet transmission at the backbone level. The modern TSPU system is a distributed network of neural network analyzers capable of classifying millions of connections in real-time and simulating technical failures where direct restriction is impractical.

## Chapter 1. DPI Evolution: The Shift to Granular Packet Analysis.

The history of filtering systems in Russia is divided into "before" and "after" 2018. The failed attempt to restrict Telegram via IP address registries served as a lesson that forced the regulator to completely overhaul its technology stack.

### 1.1 Lessons of 2018: Why IP Restrictions Died
In 2018, the regulator tried to stop services by blacklisting millions of cloud provider IP addresses. The result was massive collateral damage: the collapse of banking systems, retail, and smart homes.

**The regulator's main conclusions:**
*   **Economic Unacceptability:** "Clumsy" methods cause more damage to the digital economy than the filtering effect is worth.
*   **Uselessness Against Distributed Networks:** Dynamic IP shifting makes the registry-based approach meaningless.

### 1.2 The Birth of TSPU: Centralization and "Stealth Mode"
The "Sovereign Internet" law passed in 2019 shifted control from IP addresses to the **physical level of the backbones**. TSPU complexes—"black boxes" based on Deep Packet Inspection (DPI)—were installed at the communication nodes of all major operators.

**Key features of the 2025 architecture:**
1.  **Centralization:** The telecom operator no longer manages the filtering. All commands come directly from the CMU SSOP.
2.  **Payload Inspection:** TSPU analyzes not only headers but also the content of the packet.
3.  **Drop Tactics:** The system is capable of restricting specific protocols without breaking the session itself or interfering with adjacent legitimate services on the same IP.

## Chapter 2. Traffic Management Mechanisms: Timeouts and Session Limits.

By 2025, TSPU moved from primitive filtering to a data accumulation strategy. Now, the system doesn't make a decision instantly; it "waits" until a session gathers a critical mass of attributes for classification.

### 2.1 The "13 KB" Phenomenon: Classifier Saturation Point
One of the main technical features of 2024–2025 was the dropping of HTTPS sessions exactly after the transmission of 13–16 Kilobytes of data. This is a managed **stateful behavior of the DPI**.

**Why exactly 13–16 KB?**
For modern TSPU ML models, this volume is the "Saturation Point." This range covers the connection establishment, certificate exchange, and the first encrypted Application Data packets. This is enough to classify the traffic type with high probability. Once the statistics are gathered, the system activates the restriction.

### 2.2 Comparative Analysis of Connectivity by Autonomous Systems (AS)
TSPU policy in 2025 is extremely heterogeneous and depends on the target IP address ownership:

| Hosting / CDN | Nature of Filtering (2025) |
| :--- | :--- |
| **Cloudflare** (AS13335) | **Total ECH drop** and a hard 13 KB limit. |
| **Hetzner** (AS24940) | **Regional throttling**. Frequent drops at the TLS stage in some regions. |
| **DigitalOcean** (AS14061) | **Port filtering**. Restriction of standard ports via ML signature. |
| **OVH** (AS16276) | **UDP Trigger**. IP restriction for 10 minutes upon detection of atypical UDP traffic. |

### 2.3 Russian Hostings: "Ban-on-Sight" Strategy and BGP-Flowspec
Inside the Russian segment, systems apply immediate traffic restriction policies. Here, the system is integrated directly with the BGP routing of backbone providers.

**The Mechanics of a "Black Hole":**
1.  **Detection:** TSPU identifies an initialization packet of an illegitimate connection.
2.  **Signaling:** CMU SSOP instantly initiates a "null route" announcement via BGP Flowspec.
3.  **Result:** Traffic to the IP is dropped at the nearest major backbone node.

**Temporary Blackholes:**
An innovation of 2025 is **dynamic 15-minute restrictions**. Upon detecting atypical traffic, the IP address is restricted for a short period. If activity resumes after the restrictions are lifted, the period increases progressively.

## Chapter 3. Active Verification Mechanisms (Active Probing) in Modern Networks.

By mid-2025, the Russian TSPU system fully adopted the most effective tactic—**Active Probing**. While the system was previously a passive observer, it has now become an active participant in the network dialogue, capable of performing automatic server response checks.

### 3.1 TSPU Active Probes: Real-time Re-verification Mechanics

When a TSPU algorithm detects a connection to a foreign host that defies instant classification, the system initiates a series of probe requests from its nodes.

**How an active probe works:**

1.  **Anomaly Detection:** A user initiates a connection. TSPU sees an atypical session fingerprint or packet length distribution.
2.  **Probe Trigger:** Parallel to the user's session (or immediately after its drop), TSPU sends its own packets to the target server IP.
3.  **Response Analysis:** The probe might simulate a regular client request. The goal is to provoke the server into a response that reveals its true nature.

According to research, the delay between the user's request and the arrival of an active probe from the system in 2025 is only **200–500 ms**, making this process practically invisible.

## Chapter 4. Transition to Behavioral ML-Analysis (Machine Learning)

By late 2025, the "one signature — one restriction" paradigm finally gave way to multi-factor analysis. Massive investments in TSPU modernization allowed for the deployment of ML clusters capable of processing terabits of traffic per second, identifying hidden patterns without the need for content decryption.

### 4.1 Analysis of Entropy and Statistical Profiles

One of the fundamental characteristics of any tunneled traffic is the high entropy (degree of randomness) of the data. The difference that TSPU ML models learned to see in 2025 lies in the **statistical profile of the session**.

**Classification Features:**

- **Session Structure:** Regular web surfing is an alternation of short requests and bursts of responses. A persistent tunnel is characterized by a long session with monotonically high entropy.
- **Bidirectional Symmetry:** ML models analyze the ratio of incoming and outgoing traffic. Specialized communication channels often have a more symmetrical ratio than classic HTTP traffic.

### 4.2 Timing Attacks and Temporal Fingerprinting

By late 2025, TSPU began actively using **Temporal Fingerprinting**. Intervals between packets (Inter-Packet Arrival times) reveal the nature of the application.

**Temporal Analysis Methods:**

- **Interactivity Detection:** Sessions used for console work have a specific packet rhythm corresponding to human typing.
- **Heartbeat Signals:** Many protocols send packets to maintain the connection (Keep-alive) at strictly defined intervals. ML models find this cyclicality in the general data stream.

### 4.3 Packet Size Distribution

A key analysis factor in 2025 is the payload size distribution. TSPU builds **packet length histograms** for every connection in real-time.

If all packets in a session have sizes characteristic of specific protocols, or display abnormal uniformity (due to fixed padding), the ML model flags this as an anomaly. Modern analysis methods allow distinguishing natural network noise from software attempts to mask traffic structure.

<Callout type="info" title="Chapter Conclusion">
  In the era of ML filtering, encrypting data is not enough. Any statistical deviation in timing or packet size becomes a trigger for activating restrictions.
</Callout>

## Chapter 5. Geography and the Architecture of "Filtering Islands"

By late 2025, an architecture of "filtering islands" has formed, where the technical capabilities of network access depend on the user's geographical location and provider.

### 5.1 Regional Proving Grounds

Analysis of 2025 monitoring data shows that new filtering methods are tested on specific regions before a federal launch.

- **North Caucasus:** A region with strict policies, often used for testing significant UDP traffic restrictions.
- **Volga Region:** A proving ground for ML analyzers, training on dense urban traffic.
- **Siberia and Far East:** The "13 KB" anomaly is frequent here due to cross-border channel specifics and harsh TSPU settings for foreign AS.
- **Moscow and Saint Petersburg:** Feature extensive "white lists" for business infrastructure, though mobile networks are filtered as strictly as in regions.

### 5.2 Policy Fragmentation by Provider: Mobile vs. Fixed

**Mobile Networks:**
Mobile operators moved to a model where unidentified encrypted traffic may be preemptively slowed down. This is where resource-intensive behavioral analysis models are tested.

**Fixed Internet:**
Classical SNI and IP filtering, supplemented by the "13 KB limit," are more common here. Providers are forced to leave more exceptions for corporate software.

## Chapter 6. Evolution of Application Solutions.

The technological dominance of TSPU in 2025 has forced the development of network solutions that mimic the legitimate behavior of browsers or microservices. The main task of such systems is to create a load on the DPI that is economically disadvantageous for the system to process.

# Conclusion: Results of Predictive Traffic Analysis Systems Deployment.

By the end of 2025, the Russian traffic filtering system completed its transformation from a static "black list" model to a dynamic, predictive ecosystem. 

**Key Conclusions of 2025:**
1.  **Behavioral Analysis instead of Signatures:** ML and active probing now play the leading role. The system looks for "atypical traffic behavior."
2.  **Network Fragmentation:** Resource availability can vary between regions depending on local TSPU node settings.
3.  **Technical Costs:** Aggressive filtering sometimes leads to false positives, affecting banking APIs and corporate services.
4.  **Network Quality Degradation:** Constant packet inspection has led to increased latency (RTT) on several routes, a technological price for deep analysis systems.

In 2026, the boundary between specialized network traffic and normal web service operation is expected to blur further.

</Lang>
<References
  items={[
    {
      id: 1,
      title: 'OONI: The systematic filtering of independent media in Russia (2024 Report)',
      url: 'https://ooni.org/post/2024-russia-report/',
      sourceName: 'OONI',
    },
    {
      id: 2,
      title: 'GitHub Issue #490: Analysis of new traffic management methods (13KB Limit)',
      url: 'https://github.com/net4people/bbs/issues/490',
      sourceName: 'Net4People',
    },
    {
      id: 3,
      title: 'Habr: «Кривые руки» или новый уровень DPI? Технический разбор фильтрации HTTPS',
      url: 'https://habr.com/ru/articles/969618/',
      sourceName: 'Habr',
    },
    {
      id: 4,
      title: 'Cloudflare Blog: Russian internet users are unable to access the open Internet',
      url: 'https://blog.cloudflare.com/russian-internet-users-are-unable-to-access-the-open-internet/',
      sourceName: 'Cloudflare',
    },
    {
      id: 5,
      title: 'Human Rights Watch: Disrupted, Throttled, and Filtered (July 2025 Report)',
      url: 'https://www.hrw.org/report/2025/07/30/disrupted-throttled-and-blocked/',
      sourceName: 'HRW',
    },
    {
      id: 8,
      title: 'NDSS 2025: Discriminative Power of Cross-layer RTTs in Network Discovery',
      url: 'https://www.ndss-symposium.org/wp-content/uploads/2025-966-paper.pdf',
      sourceName: 'NDSS',
    },
    {
      id: 15,
      title: 'OONI 2025: Country Report Russia - The era of predictive blocking',
      url: 'https://ooni.org/post/2025-russia-report/',
      sourceName: 'OONI',
    },
    {
      id: 16,
      title: 'Habr: Разбор прошивок ТСПУ - Что внутри «черных ящиков» РКН',
      url: 'https://habr.com/ru/articles/768778/',
      sourceName: 'Habr',
    },
    {
      id: 17,
      title: 'GlobalCheck: Мониторинг доступности Cloudflare ECH в регионах РФ',
      url: 'https://globalcheck.net/ru/monitoring/cloudflare-ech',
      sourceName: 'GlobalCheck',
    },
    {
      id: 29,
      title: 'Kommersant: Госзакупки VPN-сервисов в России выросли в 6 раз',
      url: 'https://www.kommersant.ru/doc/7251785',
      sourceName: 'Kommersant',
    },
    {
      id: 34,
      title: 'Censored Planet: Detailed analysis of the Russian TSPU infrastructure (2024)',
      url: 'https://censoredplanet.org/russia',
      sourceName: 'Censored Planet',
    },
    {
      id: 41,
      title: 'CNews: РКН выделил 59 млрд рублей на модернизацию ТСПУ до 2030 года',
      url: 'https://www.cnews.ru/news/top/2024-11-11_v_rossii_nachinaetsya_epidemiya',
      sourceName: 'CNews',
    },
  ]}
/>
