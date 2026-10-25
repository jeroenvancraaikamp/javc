---
title: "CSDM5 auf einer Seite"
excerpt: "Nicht jeder hat Zeit, ein langes Whitepaper zu lesen oder sich durch endlose PowerPoint-Folien zu arbeiten. Dieser Beitrag stellt einen Knowledge-Artikel bereit, der die zentralen Artefakte beschreibt und erläutert, wie man sie CSDM5-konform klassifiziert und steuert. A"
source: "09aca2e815259602"
---

Nicht jeder hat Zeit, ein langes Whitepaper zu lesen oder sich durch endlose PowerPoint-Folien zu arbeiten. Dieser Beitrag stellt einen Knowledge-Artikel bereit, der die zentralen Artefakte beschreibt und erläutert, wie man sie CSDM5-konform klassifiziert und steuert.

### **STRATEGISCHES PORTFOLIO & ARCHITEKTUR**

Eine Business Capability (z. B. „Vertragsmanagement“) ist eine strategische Funktion, die durch das bzw. die steuernden Portfolio-Assets realisiert wird: die **Business Application(s)**. Eine Business Application ist das konzeptionelle System, das über Schnittstellen mit anderen Business Applications verbunden ist und einen Lifecycle sowie Bewertungen besitzt, die der Application Owner verwaltet. Eine Application kann **aus versionierten Application Components oder Modulen bestehen**, die separat deployt werden können.

**Installierte PC-/Mobile-Pakete** (einschließlich Betriebssystemen (OS), Gerätetreibern, Richtlinien und Browser-Erweiterungen) **sind keine Business Applications**. Sie werden als deployte Produkte eines bekannten, versionierten Produktmodells modelliert und bilden einen integralen Bestandteil der Funktionalität, die dem Endanwender als Service bereitgestellt wird. Die installierten PC-/Telefon-Produkte sind vom formalen Change Management, von Bewertungen, BC/DR und anderen Praktiken ausgenommen, die für Business Applications gelten.

**Gehostete IT4IT-Lösungen** werden als **Technical Applications** erfasst, die **Technical Capabilities** bereitstellen. Es wird empfohlen, diese Technical Applications und ihre Komponenten genauso zu steuern wie Business Applications und deren Komponenten (z. B. IAM, CIA, EA, CHG usw.). Allerdings dürfen Business Service Offerings nicht mit Instanzen von Technical Applications verknüpft werden, und Business-Anwender oder externe Kunden dürfen die Technical Service Offerings nicht abonnieren.

### **DELIVERY & OPERATIONALISIERUNG**

Eine **Business/Technical** **Application** kann mehrfach deployt werden und **erzeugt dabei eindeutige Service Instances** (spezifische laufende Umgebungen wie „UBW \[PR\]“). Diese Service Instances können von zugrunde liegenden Technologien abhängen, die keine Business Applications sind; die Technology Items werden als installierte Produkte eines versionierten Produktmodells modelliert (z. B. SQL Server 2022 SP1).

**Services** werden über **Offerings** paketiert und konsumiert, die einen Owner, einen Provider, Commitments, Entitlements und Subscriptions haben:

-   Ein **Business Service Offering** paketiert das Endergebnis für den **Business-Anwender/Kunden** und **hängt von** null oder mehr Service Instances von Business Applications **ab**.
-   Ein **Technology Management Service Offering** paketiert eine interne IT-Komponente (wie „Linux Server“, „SQL Server Database“, „WildFly Server“, „IIS Website“ oder „Storage Component“) und enthält eine oder mehrere Service Instances oder eine oder mehrere **dynamische CI-Gruppen**, die das Offering erbringen.

### **GOVERNANCE & ABHÄNGIGKEITEN**

Die operativen Portfolio-Elemente können sich auf die **Underpinning Technology** stützen, die aus **miteinander verknüpften Configuration Items (CIs)** besteht (etwa deployten Servern, Datenbanken, Netzwerken und Storage), die typischerweise per **Discovery oder Federation** in die CMDB gelangen.

Ein Grundprinzip von CSDM lautet, dass jedes einzelne CI gesteuert werden und einen Owner haben muss: **Jedes CI ist** (**direkt oder indirekt, z. B. über ein CI Grouping**) **in genau einem Technology Management Service Offering enthalten**, um für jede verwaltete technische Komponente eine klare Verantwortlichkeit und einen definierten Support sicherzustellen.

SaaS-Instanzen sind Blackboxes, die die Underpinning Technology des bzw. für den SaaS-Anbieter einschließen. Das heißt, in CSDM werden sie nicht mit Underpinning Technology verknüpft.

## **KLASSIFIZIERUNG DIGITALER PRODUKTE**

Digitale Produkte werden anhand von Konsument und Funktion klassifiziert:

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>Produktbedingung</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>CSDM-Klassifizierung</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>WENN</i></b><i> das Produkt ein PC oder Telefon ist oder darauf installiert ist.</i></p></td><td width="413"><p class="x_MsoNormal"><i>End-User-Paket enthält Produkte eines bestimmten Produktmodells eines bestimmten Herstellers</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt ein Teil/Modul ist, das in einer Business oder Technical Application enthalten ist.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Application Component, häufig über eine CI/CD-Pipeline deployt</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt ein Produkt für Business-Anwender ist.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Eine Instanz einer Business Application oder eine Instanz eines Business Service.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt ein Business-orientierter Service ist.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Business Service/Offering, das von einer oder mehreren Service Instances abhängt.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt ein Technical Service ist</i></p></td><td width="413"><p class="x_MsoNormal"><i>Technical Service/Offering.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt einer Business/Technical Application zugrunde liegt.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Eine Instanz (eines Produktmodells), die in einem Technology Management Service/Offering enthalten ist.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>SONST WENN</i></b><i> das Produkt ein Produkt für technische Anwender ist (z. B. ein technisches Tool wie Intune oder SCVMM)</i></p></td><td width="413"><p class="x_MsoNormal"><i>Eine Instanz einer Technical Application, die in einem Technology Management Service/Offering enthalten ist.</i></p></td></tr></tbody></table>

*Hinweis: Die Ownership der zugrunde liegenden Technologie liegt bei dem Owner, der die zugrunde liegende Infrastruktur als Service anbietet. So werden beispielsweise Hyper-V-Hosts und das Netzwerk von Infra bereitgestellt, nicht vom Owner der Business Application, die davon abhängt.*
