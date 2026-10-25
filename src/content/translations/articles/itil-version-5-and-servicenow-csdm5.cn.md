---
title: "ITIL Version 5、CSDM5、DevSecOps 与 IT4IT 3.0 的重叠之处"
excerpt: "ITIL Version 5 已于 2026 年 2 月发布，现在常有人问我它与 DevOps、SecOps、IT4IT 3.0 和 CSDM5 如何对齐。坦白说：这些框架之间似乎并没有真正的对齐。从卫星视角看，"
source: "2d6e7c21bfeb6cc6"
---

ITIL Version 5 已于 2026 年 2 月发布，现在常有人问我它与 DevOps、SecOps、IT4IT 3.0 和 CSDM5 如何对齐。坦白说：**这些框架之间似乎并没有真正的对齐。** 从卫星视角看，这些框架似乎大同小异；但越贴近实际，差异和混乱就显得越大。如果试图把 COTS（商用现成）产品及产品特定的实践映射到任一框架上，情况就会变得更加模糊。

充其量，人们只能画出类似上图的示意图，或者列出类似下表的对照表。一个 CSDM5 领域可以包含多个 ITIL Version 5 生命周期；一个 ITIL Version 5 生命周期也可以适用于多个 CSDM5 领域。IT4IT 价值流与 CSDM5 领域以及 ITIL Version 5 生命周期步骤相似，但并不完全一致。

尽管如此，下表仍有助于让 IT 保持简单。例如：

-   如果将 ITIL5 的“Discover”（发现）和“Design”（设计）合并，就得到了 CSDM5 中所谓的“Ideation, Strategy, Design, Planning, and Manage Portfolio”（构想、战略、设计、规划和组合管理）。
-   如果将 ITIL5 的“Deliver”（交付）和“Support”（支持）合并，就得到了 CSDM5 中所谓的“Service Consumption”（服务消费）。
-   如果将 CSDM5 Foundation 中的 DevOps 部分与 CSDM5 的 Build and Integration（构建与集成）合并，就得到了敏捷 IT 人员所说的 DEVOPS。
-   如果将 ITIL5“Transition and Operate”（转换与运营）中的服务交付部分合并，就得到了 CSDM5 中的“Service Delivery”（服务交付），其中包括 SECOPS。

然而，一旦细读条文，你就会发现事情并没有那么简单。此外，每家公司往往都有自己做 IT 的方式。公司规模越大，或者分布越分散，差异就越大。残酷的现实是：在整个企业范围内推行实践制度化/标准化的举措中，十有八九都未能带来显著的价值/成果。但什么都不做、不去改进，同样是灾难的根源。我经常运用帕累托原则：投入 20% 的精力，获得 80% 的成果。对于剩下的 20%，往往并不存在可行的商业论证。

在当今的现实中，DevOps 团队通常会使用几十种特定技术的工具。构想、战略和组合往往仍在 O365 中管理。服务交付和服务消费越来越多地通过服务管理工具来管理，从而实现超越 IT 范畴的工作流。将构想、战略和组合与服务消费和服务交付合并，也越来越有意义。

如果将 CSDM 的“Ideation & Strategy”（构想与战略）与“Design and Planning”（设计与规划）合并，就得到了 IT4IT 的“Strategy to Portfolio (PLAN)”（从战略到组合，即计划），其中包括 ITIL Version 5 的“Discover”（发现）、“Acquire”（获取）和“Design”（设计）。这三个框架都认同，解决方案的“BUILD”（构建）是独特的。然而，对于集成、测试和发布到生产环境是否属于 BUILD，这三个框架各有不同看法。这三个框架都有“DELIVERY”（交付）的概念，但各自所指的含义不同。IT4IT 似乎要等到检测出问题、需要纠正时才介入；ITIL Version 5 是“Operate”（运营）和“Support”（支持）IT 基础设施；而 CSDM 则是“Delivers a Consumable Service”（交付可消费的服务）。

我认为，IT 之外还有更广阔的天地，企业级智能体 AI（Agentic AI）平台将会兴起，以满足员工的所有需求。交付将不再局限于数字产品的交付/发布。我预计在几年之内，每家企业都会使用一到两个企业级 AI 平台，周围再辅以与这些平台交互的小众产品/智能体。如果企业决定让客户服务管理（CSM）和客户关系管理（CRM）由同一个（[IT4ESM?](https://it4esm.nl/)）平台来支撑，我也不会感到意外。

**因此，每个框架都各有利弊，在我看来，没有哪一个是 100% 正确或 100% 完整的。** 最好的做法或许是择优选用，从现有框架中汲取指导/治理思路，而不是全盘押注于某一个框架，或者实施每个框架中定义的全部实践。没错，这意味着你必须接受：不存在放之四海而皆准的框架。好消息是：有多家供应商提供商用现成平台，并附带同样预先配置好的实践和集成。

> 我认为，对于通用型服务管理（Commodity Service Management），最好使用商用现成（COTS）平台以及 COTS 实践/集成。由于 COTS 平台/实践由供应商负责更新和创新（而且你很可能要为此付费！！），我不建议为了与 IT4IT、ITIL、TOGAF、COBIT 或类似框架重新对齐而对 COTS 平台/实践进行定制。现实情况是，如果你想实现上图中的 16 项平台能力，很可能仍需采购多个平台。请记住，平台/供应商越少，通常对你越有利。我强烈建议选择最佳套件（best-of-suite）平台，而不是最佳单品（best-of-breed）工具。对于小众领域，如果确有必要，仍可使用小众工具。

对于希望使用 ServiceNow 的企业，建议如下：

1.  对于 **Discovery and Design（发现与设计）**，使用 ServiceNow Strategic Portfolio Mngt、Digital Portfolio Mngt、Technology Portfolio Mngt 和 Service Portfolio 来定义和管理企业所提供/消费的一切事物的生命周期。如果不需要复杂的 EA/BPM 能力，也可以使用 ServiceNow EA 进行流程/业务设计。由于企业架构师偏爱企业级平台（但他们自己除外），企业往往会使用独立的 EA/BPM 工具，并试图将其与企业级平台集成，而这种集成通常会失败，因为世界上只有少数人能听懂架构师的语言 :-)。
2.  对于 **Build and Transition（构建与转换）**，目前继续使用几十种特定技术的 DevOps 工具来构建、存储、集成、部署和观测/编排数字产品。将这些工具与服务管理平台集成，以治理风险与合规、跟踪中断（及其影响），并对观测到的问题进行跟进。假以时日，这些 DevOps 工具很可能会被 AI 取代，和/或通过 AI 进行治理/控制（见下文）。
3.  对于 **Transition and Operation（转换与运营）**，使用 IT Service Management、IT Operations Management 和 Security Operations 来管理服务交付。如果你不（想）使用独立的 GRC 平台，可以选择使用 ServiceNow 中现有的 Integrated Risk Management 能力来管理/缓解运营风险。
4.  对于 **Deliver & Support（交付与支持）**，使用企业服务交付产品（WPSD、HRSD、LSD、CSM、FSM 等）来管理服务消费和安全问题。
5.  使用 **AI（在平台上或与平台并行）**，并管理/治理/编排平台所使用或提供的智能体。

与其解读并实施各种变体的 ITIL5 流程，不如使用所选 ServiceNow 产品自带的流程指南，这些指南会随平台一起升级和创新。如果你决定停用某个 ServiceNow 产品，你很可能会购买另一个同样自带 COTS 通用实践的产品。  

![](/wp-content/uploads/2026/04/ITIL5-CSDM5-1.png)
