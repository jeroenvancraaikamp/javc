---
title: "CSDM5 op één pagina"
excerpt: "Niet iedereen heeft tijd om een lange whitepaper te lezen of door eindeloze PowerPoint-slides te gaan. Dit artikel biedt een kennisartikel dat de belangrijkste artefacten beschrijft en uitlegt hoe je ze classificeert en beheert in overeenstemming met CSDM5. A"
source: "3df2d1de003e0477"
---

Niet iedereen heeft tijd om een lange whitepaper te lezen of door eindeloze PowerPoint-slides te gaan. Dit artikel biedt een kennisartikel dat de belangrijkste artefacten beschrijft en uitlegt hoe je ze classificeert en beheert in overeenstemming met CSDM5.

### **STRATEGISCH PORTFOLIO & ARCHITECTUUR**

Een Business Capability (bijv. "Contractmanagement") is een strategische functie die wordt gerealiseerd door de leidende portfolio-asset(s): de **Business Application(s)**. Een Business Application is het conceptuele systeem dat koppelingen heeft met andere Business Applications en een lifecycle en ratings heeft die de Application Owner beheert. Een applicatie kan **bestaan uit geversioneerde Application Components of modules** die afzonderlijk kunnen worden gedeployed.

**Geïnstalleerde pc-/mobiele packages (**inclusief besturingssystemen (OS), device drivers, policies en browserextensies) **zijn geen Business Applications**. Deze worden gemodelleerd als gedeployde producten van een bekend, geversioneerd productmodel en vormen een integraal onderdeel van de functionaliteit van de eindgebruiker die als service wordt geleverd. De geïnstalleerde pc-/telefoonproducten zijn vrijgesteld van formeel change management, ratings, BC/DR en andere practices die voor Business Applications gelden.

**Gehoste IT4IT-oplossingen** worden vastgelegd als **Technical Applications** die **Technical Capabilities** leveren. Het is aan te bevelen deze Technical Applications en hun componenten op dezelfde manier te beheren als business applications en hun componenten (bijv. IAM, CIA, EA, CHG enz.). Dat gezegd hebbende, mogen Business Service Offerings niet worden gerelateerd aan instances van Technical Applications, en mogen zakelijke gebruikers of externe klanten zich niet abonneren op de Technical Service Offerings.

### **LEVERING & OPERATIONALISERING**

Een **Business/Technical** **Application** kan meerdere keren worden gedeployed, **waarbij unieke Service Instances ontstaan** (specifieke draaiende omgevingen, zoals "UBW \[PR\]"). Deze Service Instances kunnen afhankelijk zijn van onderliggende technologieën die geen Business Applications zijn; de Technology Items worden gemodelleerd als geïnstalleerde producten van een geversioneerd productmodel (bijv. SQL Server 2022 SP1).

**Services** worden verpakt en afgenomen via **Offerings**, die een eigenaar, provider, commitments, entitlements en subscriptions hebben:

-   Een **Business Service Offering** verpakt het uiteindelijke resultaat voor de **zakelijke gebruiker/klant** en **is afhankelijk van** nul of meer Service Instances van Business Applications.
-   Een **Technology Management Service Offering** verpakt een interne IT-component (zoals "Linux Server", "SQL Server Database", "WildFly Server", "IIS Website" of "Storage Component") en bevat een of meer Service Instances of een of meer **dynamische groepen van CI's** die de offering leveren.

### **GOVERNANCE & AFHANKELIJKHEDEN**

De operationele portfolio-items kunnen steunen op de **onderliggende technologie**, die bestaat uit **onderling gerelateerde configuration items (CI's)** (zoals gedeployde servers, databases, netwerken en storage) die doorgaans via **discovery of federatie** in de CMDB terechtkomen.

Een fundamenteel principe van CSDM is dat elke afzonderlijke CI beheerd moet worden en een eigenaar moet hebben: **elke CI is opgenomen** (**direct of indirect, bijv. via een CI Grouping**) in **één Technology Management Service Offering**, zodat er voor elke beheerde technische component duidelijke verantwoordelijkheid en gedefinieerde support is.

SAAS-instances zijn black boxes die de onderliggende technologie van/voor de SAAS-leverancier omvatten. Dat wil zeggen: in CSDM worden ze niet gerelateerd aan onderliggende technologie.

## **CLASSIFICATIE VAN DIGITALE PRODUCTEN**

Digitale producten worden geclassificeerd op basis van afnemer en functie:

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>Productvoorwaarde</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>CSDM-classificatie</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ALS</i></b><i> het product een pc of telefoon is of erin/erop is geïnstalleerd.</i></p></td><td width="413"><p class="x_MsoNormal"><i>End-User Package bevat producten van een bepaald productmodel van een bepaalde fabrikant</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een onderdeel/module is dat deel uitmaakt van een Business of Technical Application.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Application Component, vaak gedeployd via een CI/CD-pipeline</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een product voor zakelijke gebruikers is.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Een instance van een Business Application of een instance van een Business Service.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een business-facing service is.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Business Service/Offering die afhankelijk is van een of meer Service Instances.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een Technical Service is</i></p></td><td width="413"><p class="x_MsoNormal"><i>Technical Service/Offering.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een Business/Technical Application ondersteunt.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Een instance (van een productmodel) die in een Technology Management Service/Offering is opgenomen.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ANDERS ALS</i></b><i> het product een product voor technische gebruikers is (bijv. een technische tool zoals Intune of SCVMM)</i></p></td><td width="413"><p class="x_MsoNormal"><i>Een instance van een Technical Application die in een Technology Management Service/Offering is opgenomen.</i></p></td></tr></tbody></table>

*Let op: het eigenaarschap van de onderliggende technologie ligt bij de eigenaar die de onderliggende infrastructuur als service aanbiedt. Hyper-V-hosts en het netwerk worden bijvoorbeeld geleverd door Infra, niet door de eigenaar van de business application die ervan afhankelijk is.*
