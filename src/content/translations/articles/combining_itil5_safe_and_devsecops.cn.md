---
title: "ITIL Version 5 + IT4IT 3.0 + TOGAF 10 + SAFe 6.0  + DevOps + SecOps = ????"
excerpt: "现代 IT 组织很少只遵循单一的方法论。它们有意识地组合使用交付、运营、风险和架构等多种框架，而这些框架都想在同一项变革中分一杯羹。典型的组成部分：SAFe（规模化敏捷框架），用于规模化"
source: "b61c24637ea27f7d"
---

现代 IT 组织很少只遵循单一的方法论。它们有意识地组合使用交付、运营、风险和架构等多种框架，而这些框架都想在同一项变革中分一杯羹。

典型的组成部分：  

  
-   SAFe（Scaled Agile Framework，规模化敏捷框架），用于规模化的项目组合与产品管理
  
-   DevOps，用于工程流动与自动化
  
-   SecOps，用于安全监控、威胁处置和网络安全响应
  
-   ITIL Version 5，用于数字产品与服务的生命周期治理
  
-   TOGAF 10，用于企业架构能力建设和架构治理
  
-   ArchiMate 3.2，作为架构视图的建模语言
  
-   IT4IT 3.0，作为“像经营企业一样运营 IT”的参考架构
  
-   ServiceNow，作为覆盖 SPM、ITSM、ITOM、ITAM、IRM、SecOps、ESG 和 TPRM 的数字化控制平面
  

  
此外，董事会和监管机构还期望组织在以下方面具备成熟度：  

  
-   企业风险管理（Enterprise Risk Management）
  
-   BCM（Business Continuity Management，业务连续性管理）
  
-   DR（Disaster Recovery，灾难恢复）
  
-   ESG（Environmental, Social & Governance，环境、社会和治理）
  
-   TPRM（Third-Party Risk Management，第三方风险管理）
  

  
目标并不是“集齐所有框架”，而是实现受控、安全、有韧性且架构合理的价值交付。  

## 1\. 一条运营主线，多个框架

  
每个领域回答的是企业的一个不同问题：  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| 领域 | 核心问题 |
| --- | --- |
| SAFe | 我们资助哪些举措，按什么顺序推进？ |
| DevOps | 如何更快、更可靠地交付变更？ |
| SecOps | 如何检测、响应和遏制网络威胁？ |
| ITIL Version 5 | 如何管理数字产品与服务的完整生命周期？ |
| TOGAF 10 | 如何组织和治理企业架构能力？ |
| ArchiMate 3.2 | 如何在业务层、应用层和技术层对架构进行一致建模？ |
| IT4IT 3.0 | “IT 业务”本身的参考价值流架构是什么？ |
| 风险管理 | 我们是否在可接受的风险与合规边界内运营？ |
| ServiceNow | 如何编排、自动化这一切，并使其可视化？ |

  
 

风险在于碎片化：各自独立的汇报链条、重复的治理、相互竞争的工作流，以及与现实不符的架构图。解决方案是建立一条集成的运营主线：  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| 层级 | 主要驱动因素 | 关键框架 | ServiceNow 支撑点 |
| --- | --- | --- | --- |
| 企业架构与设计时治理 | 架构一致性与护栏 | TOGAF 10、ArchiMate 3.2 | SPM、CMDB、定制 EA 集成 |
| IT 管理参考架构 | IT 价值流与能力 | IT4IT 3.0 | SPM、ITSM、ITOM、ITAM、IRM 作为具体实现 |
| 战略与资金 | 项目组合决策 | SAFe、TOGAF（架构愿景） | SPM |
| 工程流动 | 快速构建与部署 | DevOps、IT4IT “Requirement-to-Deploy” | 与 SPM / 变更集成的开发工具链 |
| 安全监控与响应 | 检测与响应 | SecOps、IT4IT “Detect-to-Correct” | ServiceNow SecOps |
| 服务生命周期治理 | 运行与改进服务 | ITIL Version 5、IT4IT “Request-to-Fulfill” | ITSM |
| 运行时与可观测性 | 掌握什么在哪里运行 | ITIL Version 5、IT4IT | ITOM |
| 资产与成本治理 | 将 IT 作为资产和成本来管理 | ITIL、IT4IT “Strategy-to-Portfolio” | ITAM |
| 企业风险与合规 | 将风险敞口保持在可接受范围内 | 风险管理、TOGAF 治理 | IRM |
| BCM / DR | 韧性 | 风险管理、ITIL、TOGAF（业务连续性视图） | IRM + ITOM |
| ESG | 可持续性与治理 | ESG 框架、风险 | IRM ESG |
| TPRM | 供应商与供应链风险 | 风险管理、IT4IT（采购） | IRM TPRM |

  
 

简而言之，TOGAF、ArchiMate 和 IT4IT 定义设计时结构；SAFe、DevOps、SecOps 和 ITIL 定义工作方式；ServiceNow 提供运行时的执行与证据。  

## 2\. SAFe：战略方向与资金

  
SAFe 规定了战略如何转化为可执行的工作：  

  
-   项目组合优先级排序与精益预算
  
-   定义运营价值流和开发价值流
  
-   通过敏捷发布火车（Agile Release Train）交付价值增量
  

  
TOGAF 的架构愿景（Architecture Vision）和业务架构首先决定了哪些价值流和史诗（epic）是合理的。ArchiMate 模型可以展示拟议的解决方案如何支持能力和价值流。

ServiceNow SPM 通过以下方式提供支持：  

  
-   跟踪史诗和举措及其架构影响
  
-   与主题、能力和架构路线图进行战略对齐
  
-   投资可视化与治理
  
-   成果与收益跟踪
  

  
由此，项目组合决策既与架构意图（TOGAF/ArchiMate）挂钩，也与执行现实（SAFe/DevOps）挂钩。  

## 3\. DevOps：流动与工程纪律

  
DevOps 关注流动的工程层面：  

  
-   持续集成与持续交付（CI/CD）流水线
  
-   自动化的构建、测试和部署流程
  
-   基础设施即代码（Infrastructure as Code）与配置自动化
  
-   小批量发布与快速反馈循环
  

  
DevOps 优化的是：  

  
-   变更前置时间
  
-   部署频率
  
-   变更失败率
  
-   平均恢复时间（MTTR）
  

  
IT4IT 的 “Requirement-to-Deploy” 价值流为这一路径上的工具和数据对象（待办事项、构建、测试结果、发布）提供了参考模型。TOGAF 和 ArchiMate 为 DevOps 团队在代码中实现的约束和模式（参考架构、构建块）提供依据。

在集成模型中：  

  
-   SAFe 决定构建*什么*以及按什么顺序构建。
  
-   TOGAF/ArchiMate 定义在架构层面它*应该是什么样子*。
  
-   DevOps 定义在技术上*如何*构建和部署。
  
-   IT4IT 描述整个 IT 价值流*如何*组织和衡量。
  

  

## 4\. SecOps：检测、响应与网络韧性

  
SecOps 与 DevOps 不同：  

  
-   **DevOps** 负责构建、测试和部署变更。
  
-   **SecOps** 负责在运行时环境中检测、分析和响应威胁。
  

  
SecOps 的典型职责：  

  
-   安全事件分级与响应
  
-   威胁情报的接入与关联分析
  
-   与产品团队协调漏洞修复
  
-   与 SIEM/SOAR 平台集成
  
-   取证、遏制以及事后复盘学习
  

  
IT4IT 的 “Detect-to-Correct” 价值流描述了事件、问题和修复在各工具之间的逻辑流转。ArchiMate 模型可以展示安全控制在架构栈中的位置（例如在应用层、基础设施层和网络层）。

在 ServiceNow 中：  

  
-   SecOps 管理漏洞响应和安全事件工作流。
  
-   事件和漏洞与 ITOM 发现的配置项（CI）相关联。
  
-   风险和控制方面的影响与 IRM 相连。
  

  
DevOps 保护流水线；SecOps 保护运行中的服务；架构确保我们清楚一切实际所处的位置。  

## 5\. ITIL Version 5：生命周期治理

  
ITIL Version 5 为数字产品和服务提供了生命周期模型：

**发现 → 设计 → 获取 → 构建 → 过渡 → 运营 → 交付 → 支持**

在 SAFe/DevOps/ITIL/IT4IT 相结合的环境中：  

  
-   **发现与设计**——以架构（TOGAF/ArchiMate）和项目组合选择（SAFe）为指导。
  
-   **获取与构建**——使用 DevOps 执行，并与 IT4IT Requirement-to-Deploy 保持一致。
  
-   **过渡**——由 ITIL 变更与发布实践治理，并与流水线关联。
  
-   **运营**——由 ITOM 可观测性和 IT4IT Detect-to-Correct 提供支持。
  
-   **交付与支持**——通过 ITSM 流程（事件、请求、问题、服务级别）处理。
  

  
TOGAF 的架构存储库（Architecture Repository）和 ArchiMate 模型作为设计时参考；ITIL 和 IT4IT 确保运行时流程和数据流与该设计保持一致。  

## 6\. TOGAF 10、ArchiMate 3.2 与 IT4IT 3.0：架构层

  

### TOGAF 10：架构能力与治理

  
TOGAF 10 定义了：  

  
-   用于迭代开发架构的架构开发方法（ADM）
  
-   架构内容结构与构建块
  
-   架构治理与合规机制
  
-   业务、数据、应用和技术的元模型与参考模型
  

  
在这种多框架架构中，TOGAF 为跨 SAFe 火车、DevOps 团队和 ServiceNow 实施的架构定义、审批和执行提供了治理保护伞。  

### ArchiMate 3.2：架构可视化

  
ArchiMate 是一种建模语言，它将 TOGAF 的概念转化为人们能够有效讨论的图表。它能够：  

  
-   对业务层、应用层和技术层进行一致建模
  
-   清晰地将能力映射到应用和基础设施
  
-   可视化价值流、服务和流程
  

  
这些模型可以映射到 ServiceNow CMDB 和 SPM：  

  
-   业务服务和能力 → 业务服务/SPM 服务产品
  
-   应用 → 业务应用 CI 和服务产品
  
-   技术节点 → 基础设施 CI（服务器、集群、云）
  

  
结果是：ArchiMate 中的设计时视图与 ServiceNow 中的运行时视图足够吻合，使人们能够认出自己的 IT 全景。  

### IT4IT 3.0：IT 自身的参考架构

  
IT4IT 将 IT 视为一条价值链，并提供参考模型，其中包括以下价值流：  

  
-   **Strategy-to-Portfolio**——对齐战略、投资和项目组合
  
-   **Requirement-to-Deploy**——管理新服务的构建与部署
  
-   **Request-to-Fulfill**——处理服务请求及其履行
  
-   **Detect-to-Correct**——处理事件、问题和改进
  

  
这些价值流可以与 ServiceNow 模块清晰对应：  

  
-   Strategy-to-Portfolio → SPM、架构治理、风险洞察
  
-   Requirement-to-Deploy → 与变更/发布集成的 DevOps 工具链
  
-   Request-to-Fulfill → ITSM 请求、目录和履行流程
  
-   Detect-to-Correct → ITOM、ITSM 事件/问题、SecOps、IRM
  

  
IT4IT 提供蓝图；ServiceNow 和 DevOps 实践负责落地实现。  

## 7\. 风险管理：平衡机制

  
风险管理的存在，是为了确保敏捷和创新不会使组织承受超出可接受范围的风险敞口。它涵盖：  

  
-   运营风险
  
-   网络与信息安全风险
  
-   监管与合规风险
  
-   第三方与供应链风险
  
-   战略与声誉风险
  

  
在 ServiceNow IRM 中，组织可以管理：  

  
-   风险登记册与风险评估
  
-   控制框架与政策
  
-   控制测试与证据
  
-   审计发现与整改
  

  
TOGAF 的治理结构和 IT4IT 的价值流为控制应设置在何处提供了背景；DevOps 和 SecOps 则提供这些控制在实际中如何运作的数据。  

## 8\. BCM 与灾难恢复

  
业务连续性管理（BCM）和灾难恢复（DR）横跨架构、运营和风险领域。

在实践中：  

  
-   **BCM**（在 IRM 中）定义影响、关键服务、RTO、RPO 和危机预案。
  
-   **ITOM** 映射技术依赖关系和实时服务健康状况。
  
-   **ITSM** 在发生中断时协调重大事件和灾难处置工作流。
  
-   **TOGAF/ArchiMate** 为关键服务提供依赖关系和位置视图。
  

  
DR 由此成为一种经过工程化设计的能力，在架构模型和运行时监控中均清晰可见。  

## 9\. ESG：可持续治理

  
ESG（环境、社会和治理）日益影响 IT 决策：  

  
-   云和数据中心的能耗
  
-   供应商的 ESG 表现与商业道德
  
-   数据隐私、安全与治理实践
  
-   IT 全景的整体可持续性
  

  
ServiceNow ESG（属于 IRM 产品系列）使组织能够：  

  
-   与 ESG 报告框架保持一致
  
-   跟踪与 ESG 相关的 KPI 和目标
  
-   整合用于审计和报告的证据
  

  
ITAM 提供资产和生命周期数据；SPM 将 ESG 指标与战略主题和目标关联；架构框架确保 ESG 要求被设计进未来状态的全景中，而不是事后附加。  

## 10\. TPRM：平台经济中的供应商风险

  
现代 IT 高度依赖外部提供商：  

  
-   SaaS 应用
  
-   云平台
  
-   托管服务和外包合作伙伴
  

  
IRM 中的第三方风险管理（TPRM）能够实现：  

  
-   结构化的供应商风险评估
  
-   持续监控与重新评估
  
-   合规验证与证据跟踪
  
-   集中度风险与依赖风险分析
  

  
IT4IT 明确了供应商数据和控制在 IT 价值流中出现的位置；ArchiMate 展示哪些服务和能力依赖于哪些供应商；ServiceNow 使这些依赖关系在运营层面可见。  

## 11\. 全系统的度量

  
一个协调一致的运营模式需要跨领域的均衡指标：  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

| 维度 | 示例指标 |
| --- | --- |
| 流动（DevOps） | 部署频率、变更前置时间 |
| 可靠性（ITOM/ITSM） | 可用性、MTTR、事件数量 |
| 安全（SecOps） | 平均检测时间（MTTD）、平均遏制时间（MTTC）、未修复漏洞 |
| 风险 | 剩余风险评分、控制有效性、未关闭发现项 |
| 连续性 | BC/DR 测试成功率、恢复时间与 RTO 目标对比 |
| 财务 | 每条价值流的成本、每笔交易的单位成本 |
| ESG | 能耗 KPI、ESG 框架评分 |
| 架构 | 标准合规性、构建块复用率、批准的例外数量 |

  
 

ServiceNow 仪表板可以统一来自 SPM、ITSM、ITOM、ITAM、IRM 和 SecOps 的指标。架构工具提供补充视图（能力热力图、路线图进展），但两者的数据应当一致。  

## 结语

  
当各框架得到恰当集成时：  

  
-   TOGAF 10 定义如何开展架构工作并执行护栏。
  
-   ArchiMate 3.2 可视化现有全景和计划中的变更。
  
-   IT4IT 3.0 描述 IT 价值流和数据对象。
  
-   SAFe 决定构建什么、为什么构建，以及在哪些价值流中构建。
  
-   DevOps 加速构建和部署的方式。
  
-   SecOps 保护运行时环境免受威胁。
  
-   ITIL Version 5 治理从概念到支持的整个生命周期。
  
-   风险管理限制风险敞口并支持明智决策。
  
-   BCM 确保服务能够经受住中断。
  
-   ESG 确保 IT 为可持续的商业实践做出贡献。
  
-   TPRM 控制供应商和供应链依赖。
  
-   ServiceNow 在整个技术栈中提供编排、自动化和可追溯性。
  

  
这并不是为了收集框架，而是要让每个框架在其最擅长的地方发挥作用，并将它们连接成一个统一、易于理解的 IT 运营体系。做到这一点之后，那些缩写词会退居幕后，留下的是有纪律、安全、可持续的规模化价值交付。

<br> body {<br /> font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;<br /> line-height: 1.6;<br /> color: #222;<br /> padding: 1.5rem;<br /> max-width: 900px;<br /> margin: 0 auto;<br /> background-color: #f7f7f7;<br /> }<br /> h1, h2, h3 {<br /> color: #111;<br /> }<br /> h1 {<br /> margin-bottom: 0.2rem;<br /> }<br /> h2 {<br /> margin-top: 2rem;<br /> }<br /> h3 {<br /> margin-top: 1.5rem;<br /> }<br /> p {<br /> margin: 0.4rem 0 0.8rem 0;<br /> }<br /> ul, ol {<br /> margin: 0.2rem 0 1rem 1.5rem;<br /> }<br /> code {<br /> font-family: "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;<br /> background: #eee;<br /> padding: 0.1rem 0.3rem;<br /> border-radius: 3px;<br /> }<br /> table {<br /> border-collapse: collapse;<br /> margin: 1rem 0;<br /> width: 100%;<br /> background: #fff;<br /> }<br /> th, td {<br /> border: 1px solid #ddd;<br /> padding: 0.5rem 0.6rem;<br /> text-align: left;<br /> vertical-align: top;<br /> }<br /> th {<br /> background: #f0f0f0;<br /> font-weight: 600;<br /> }<br /> strong {<br /> font-weight: 600;<br /> }<br /> .subtitle {<br /> color: #555;<br /> margin-bottom: 1.2rem;<br /> font-style: italic;<br /> }<br /> .tagline {<br /> margin-bottom: 2rem;<br /> color: #444;<br /> }<br />
