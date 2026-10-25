---
title: "什么是 A2A 中的 AI Agent Card？"
excerpt: "AI Agent Card 是一种结构化、可被发现的配置文件——本质上是一份 YAML+ 格式的数字简历——它依据 Agent-to-Agent（A2A）协议对 AI Agent 进行描述。其中通常包含智能体的名称、提供方、能力、技能、API"
source: "f06dcb06fbd5f887"
---

**AI Agent Card** 是一种结构化、可被发现的配置文件——本质上是一份 YAML+ 格式的数字简历——它依据 **Agent-to-Agent（A2A）协议**对 AI Agent（AI 智能体）进行描述。其中通常包含以下元数据：智能体的名称、提供方、能力、技能、API 端点（URL）、认证机制、标签以及治理特征。

这些卡片要么由 AI Agent 本身直接提供，要么托管在符合 A2A 规范的服务器上，该服务器可以注册并对外公开多个 AI Agent。其目标是：**让其他智能体、系统或编排工具能够实时、便捷地发现哪个 AI Agent 适合执行哪项任务。**例如：  

  
-   “提供高级路线规划、交通分析和自定义地图生成服务。”
  
-   “计算两个或多个地点之间的最佳驾驶路线。”
  

  
迈向基于平台的 AI 清单 每个企业平台很可能都会发展出自己的 **AI 清单（AI-inventory）**：即一个登记平台内获准使用的 AI Agent 的注册表。AI Agent Card 可以被自动发现并联合汇入这样的清单，形成一个可用 AI 能力的实时目录。这使得跨工作流、跨领域乃至跨厂商的编排成为可能。

与传统的静态记录不同，AI Agent Card 是动态的，平台可以按需获取最新的、经过验证的信息，而不必依赖过时的 CMDB 快照。虽然有些配置经理可能仍倾向于将卡片数据导入 CMDB，但另一些人（包括我本人）认为，在需要时直接使用源卡片更具可扩展性，也更面向未来。

AI A2A 服务器共同构成了 AI 世界中的一种**虚拟 CMDB**——分布式、联合式且实时。目前仍缺少的是本地 AI 编排器（又称 VMDB-AI-Agent）——一个运行时组件，负责从可信来源拉取 AI Agent Card，并将其元数据公开给平台的 AI 生态系统。可以把它看作 AI Agent 的 DNS，只是包含更丰富的细节。

当然，这一切的前提是 AI 解决方案提供商为其 AI Agent 发布符合 A2A 规范的卡片。已有部分提供商这样做了。这些平台不仅能够看到本地运行的智能体，还能看到在外部平台上运行的智能体，以及与之相关的技能、模型、提示词、能力和数据集。

**AI 遇上 DevSecOps。**如今，AI Agent 的开发者面临着与 DevSecOps 团队类似的运维挑战——后者需要管理 API、微服务和云资源等细粒度组件。传统的 ITIL 工作流往往过于僵化，难以适应这种程度的敏捷性。于是 AI Ops 应运而生——在这一未来图景中，AI 本身将检测并解决运维问题。在此背景下，能够访问实时 AI Agent Card 的 VMDB-AI-Agent 将在“让 IT 重新运转起来”方面发挥不可估量的作用。

**与 DevSecOps 类似，AI 世界正在建立自己的治理体系，并使用自己的工具。**例如 ServiceNow NOW Assist 及其 AI Studio、AI Data Fabric、AI Guardian 和 AI Control Tower，它们与现有的 ITSM、ITOM 和 IRM 平台能力之间几乎没有关联或集成。

如果说云计算的核心是基础设施即代码，那么 AI 时代正在形成的则是**能力即卡片**。AI **Agent Card** 是 AI Agent 运维、功能和治理数据的来源，形式紧凑而内容丰富。它们提供：  

  
-   能力与技能
  
-   托管与访问信息（URL、认证）
  
-   标签与分类
  
-   合规与治理元数据
  
-   面向编排与自动化的实时可发现性
  

  
**AI Agent Card 示例：**  

> {  
> "**name**": "GeoSpatial Route Planner Agent",  
> "**description**": "Provides advanced route planning, traffic analysis, and custom map generation services. This agent can calculate optimal routes, estimate travel times considering real-time traffic, and create personalized maps with points of interest.",  
> "**url**": "https://georoute-agent.example.com/a2a/v1",  
> "**provider**": {  
> "**organization**": "Example Geo Services Inc.",  
> "**url**": "https://www.examplegeoservices.com"  
> },  
> "**version**": "1.2.0",  
> "**documentationUrl**": "https://docs.examplegeoservices.com/georoute-agent/api",  
> "**capabilities**": {  
> "**streaming**": true,  
> "**pushNotifications**": true,  
> "**stateTransitionHistory**": false  
> },  
> "**authentication**": {  
> "schemes": \["OAuth2"\],  
> "credentials": "{"authorizationUrl": "https://auth.examplegeoservices.com/authorize", "tokenUrl": "https://auth.examplegeoservices.com/token", "scopes": {"route:plan": "Allows planning new routes.", "map:custom": "Allows creating and managing custom maps."}}"  
> },  
> "defaultInputModes": \["application/json", "text/plain"\],  
> "defaultOutputModes": \["application/json", "image/png"\],  
> "**skills**": \[  
> {  
> "id": "route-optimizer-traffic",  
> "name": "Traffic-Aware Route Optimizer",  
> "description": "Calculates the optimal driving route between two or more locations, taking into account real-time traffic conditions, road closures, and user preferences (e.g., avoid tolls, prefer highways).",  
> "tags": \["maps", "routing", "navigation", "directions", "traffic"\],  
> "examples": \[  
> "Plan a route from '1600 Amphitheatre Parkway, Mountain View, CA' to 'San Francisco International Airport' avoiding tolls.",  
> "{"origin": {"lat": 37.422, "lng": -122.084}, "destination": {"lat": 37.7749, "lng": -122.4194}, "preferences": \["avoid\_ferries"\]}"  
> \],  
> "inputModes": \["application/json", "text/plain"\],  
> "outputModes": \[  
> "application/json",  
> "application/vnd.geo+json",  
> "text/html"  
> \]  
> },  
> {  
> "id": "custom-map-generator",  
> "name": "Personalized Map Generator",  
> "description": "Creates custom map images or interactive map views based on user-defined points of interest, routes, and style preferences. Can overlay data layers.",  
> "tags": \["maps", "customization", "visualization", "cartography"\],  
> "examples": \[  
> "Generate a map of my upcoming road trip with all planned stops highlighted.",  
> "Show me a map visualizing all coffee shops within a 1-mile radius of my current location."  
> \],  
> "inputModes": \["application/json"\],  
> "outputModes": \[  
> "image/png",  
> "image/jpeg",  
> "application/json",  
> "text/html"  
> \]  
> }  
> \]  
> }
