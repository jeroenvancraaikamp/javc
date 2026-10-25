---
title: "Hoe implementeer je een Joiner-, Mover- en Leaver-proces?"
excerpt: "Hier vind je een geïntegreerd overzicht van hoe je organisatie de Joiner-, Mover- en Leaver-processen (JML) inricht met Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP en ServiceNow, waarbij alle gevraagde onderdelen aan bod komen."
source: "c1d6e33e30fd7ca2"
---

Hier vind je een geïntegreerd overzicht van hoe je organisatie de **Joiner-, Mover- en Leaver-processen (JML)** inricht met **Workday, Azure AD, Saviynt, Intune, JAMF, Ariba, ADP en ServiceNow**, waarbij alle gevraagde onderdelen aan bod komen.

* * *

## **1\. Joiner-proces (onboarding)**

### **1.1 Het proces starten**

-   **Vaste medewerkers:**
    -   Workday fungeert als **source of truth** voor HR-stamgegevens.
    -   In Workday wordt een record voor de nieuwe medewerker aangemaakt, inclusief rol, locatie en functieclassificatie.
    -   Saviynt haalt de gebruikersgegevens op uit Workday voor Identity Governance and Administration (IGA) en Access Management.
    -   Azure AD richt de basisaccounts voor de identiteit in (e-mail, SSO).
-   **Externe medewerkers (contractors):**
    -   Worden rechtstreeks beheerd via **Saviynt**, geïntegreerd met ServiceNow voor toegangsaanvragen en lifecyclebeheer.
    -   Gegevens van externe medewerkers (bijvoorbeeld contractperiode en rol) worden in Saviynt vastgelegd.

### **1.2 IT- en assetprovisioning**

-   **Identity and Access Management:**
    -   Saviynt verzorgt role-based access control (RBAC) en zorgt ervoor dat alleen de benodigde rechten worden toegekend.
    -   Azure AD verzorgt de authenticatie en de toegangsprovisioning voor bedrijfssystemen.
-   **Apparaatbeheer:**
    -   **Intune** beheert Windows-apparaten.
    -   **JAMF** beheert macOS- en iOS-apparaten.
    -   Apparaten worden voorzien van standaard bedrijfssoftware, zoals Microsoft Office 365, VPN-clients, samenwerkingstools (bijvoorbeeld Teams, Slack) en beveiligingstools (bijvoorbeeld antivirus, endpoint protection).
-   **Inkoop:**
    -   Apparaten worden ingekocht via **Ariba** (leveranciers op concernniveau).
    -   Lokale inkoop verloopt via goedgekeurde regionale leveranciers.
-   **Assetregistratie:**
    -   **ServiceNow Asset Management (ITAM)** houdt de gegevens van alle IT-assets bij.
    -   De **ServiceNow Configuration Management Database (CMDB)** legt de configuratiegegevens van apparaten vast.
    -   Niet-IT-assets (bijvoorbeeld auto's, fietsen, toegangspassen en sleutels) worden eveneens in **ServiceNow** geregistreerd, onder Facilities Management of in de CMDB.

### **1.3 Compliance en beleid**

-   Beleid en rechten voor zowel hardware als software worden vastgelegd en beheerd via:
    -   **Saviynt (toegangsbeleid)**
    -   **ServiceNow (asset lifecycle management en goedkeuringen)**

### **1.4 Doorbelasting van kosten**

-   **IT-kosten:**
    -   Kosten voor de aanschaf van apparaten en softwarelicenties worden doorbelast via de inkoopworkflows in **Ariba** en de kostenplaatstoewijzingen in Workday.
    -   Kosten voor externe medewerkers worden verwerkt via de salarisadministratie in **ADP** (voor betalingen) en via **Ariba** (voor het volgen van inkoop en leveranciersfacturen).

### **1.5 Activering van accounts en tickets**

-   **ServiceNow:** volgt alle onboardingtaken en -tickets (bijvoorbeeld levering van assets, aanmaken van accounts).
-   Het eigenaarschap van onboardingtaken wordt toegewezen aan de betrokken afdelingen (IT, Facilities, HR).

* * *

## **2\. Mover-proces (rolwijzigingen, promoties, overplaatsingen)**

### **2.1 Rolwijzigingen en overplaatsingen**

-   **Vaste medewerkers:**
    -   Workday start rolwijzigingen, locatiewijzigingen en overplaatsingen naar een andere afdeling.
    -   Saviynt past de toegangsrechten aan op basis van de nieuwe rol.
    -   Azure AD werkt groepslidmaatschappen en SSO-rechten bij.
-   **Externe medewerkers:**
    -   Worden beheerd via Saviynt en ServiceNow.
    -   Wijzigingen in toegang worden verwerkt via Saviynt, met goedkeuringsworkflows.

### **2.2 Assetwijzigingen**

-   IT- en fysieke assets worden bijgewerkt via workflows in **ServiceNow ITAM/CMDB**.
-   Apparaten moeten mogelijk opnieuw worden ingericht via **Intune (Windows)** of **JAMF (macOS)**.
-   Facilitaire assets (bijvoorbeeld kantoorruimte, parkeervergunningen en toegangspassen) worden bijgewerkt in **ServiceNow Facilities Management**.

### **2.3 Softwareaanpassingen**

-   Rolgebonden softwarerechten (bijvoorbeeld licenties, VPN-toegang) worden automatisch bijgewerkt door Saviynt en uitgerold via:
    -   **Intune** (Windows-apparaten)
    -   **JAMF** (Mac-apparaten)

### **2.4 Compliance en audits**

-   Saviynt zorgt ervoor dat de processen voor access reviews en hercertificering correct worden gevolgd.
-   ServiceNow houdt auditlogs bij van goedkeuringen en wijzigingen.

### **2.5 Doorbelasting**

-   Wijzigingen in IT-middelen of licenties worden bijgewerkt in **Ariba** en doorbelast aan de juiste kostenplaatsen.

### **2.6 Openstaande taken en tickets**

-   Bestaande tickets en taken worden opnieuw toegewezen via workflows in **ServiceNow**.

* * *

## **3\. Leaver-proces (offboarding)**

### **3.1 De offboarding starten**

-   **Vaste medewerkers:**
    -   Workday start de workflows voor uitdiensttreding.
    -   Saviynt schakelt toegangsrechten uit en trekt rechten in.
    -   Azure AD schakelt accounts uit en verwijdert de SSO-toegang.
-   **Externe medewerkers:**
    -   Worden beheerd via workflows in Saviynt en ServiceNow.
    -   ServiceNow start ticketworkflows voor de IT- en facilitaire teams.

### **3.2 Inname van assets**

-   **ServiceNow ITAM:** volgt en beheert de inlevering van IT-assets (bijvoorbeeld laptops en mobiele telefoons).
-   **ServiceNow Facilities Management:** verzorgt de inlevering van niet-IT-assets (bijvoorbeeld sleutels en badges).

### **3.3 Terugwinnen van softwarelicenties**

-   Softwarelicenties worden ingetrokken via:
    -   **Intune** (Windows)
    -   **JAMF** (macOS)
    -   Vastgelegd en bijgewerkt in de **ServiceNow CMDB**

### **3.4 Financiële afwikkeling**

-   Openstaande betalingen aan leveranciers worden verwerkt via **Ariba**.
-   De eindafrekening van het salaris van vaste medewerkers verloopt via **ADP**.

### **3.5 Compliance en audits**

-   De laatste toegangsaudits worden afgerond in **Saviynt**.
-   ServiceNow legt de afronding van offboardingtaken en de inlevering van assets vast.

### **3.6 Doorbelasting**

-   De laatste kosten voor het terughalen van assets en licentieaanpassingen worden doorbelast via **Ariba**.

* * *

## **4\. Beheer van beleid en rechten**

### **4.1 Opslag en onderhoud**

-   **Saviynt:** toegangsbeleid, rolgebonden rechten.
-   **ServiceNow CMDB:** beleid voor assetlifecycle en configuratie.
-   **ServiceNow ITAM:** assetrechten, lifecyclebeleid.
-   **Workday:** kostenplaatstoewijzingen, HR-beleid.

### **4.2 Audit en compliance**

-   **Saviynt en ServiceNow:** periodieke access reviews en compliancecontroles.
-   **Intune en JAMF:** handhaving van apparaatcompliance en beveiligingsbeleid.

* * *

## **5\. Overzichtstabel**

| **Processtap** | **Source of truth** | **Identiteit/toegang** | **Assetbeheer** | **Software-uitrol** | **Kosten en facturatie** |
| --- | --- | --- | --- | --- | --- |
| **Joiner** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |
| **Mover** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba |
| **Leaver** | Workday / Saviynt | Saviynt, Azure AD | ServiceNow ITAM | Intune, JAMF | Ariba, ADP |

* * *

## **6\. Openstaande tickets en overdracht van eigenaarschap**

-   **Logische assets (accounts, rollen, workflows):** worden afgehandeld via **Saviynt en ServiceNow**.
-   **Fysieke assets:** worden beheerd en gevolgd via **ServiceNow ITAM/CMDB**.
-   **Openstaande tickets:** worden opnieuw toegewezen in workflows in **ServiceNow**.

Met deze geïntegreerde aanpak zet je elke tool in waar die het sterkst is, en zorg je voor duidelijkheid, compliance en efficiëntie in de hele **Joiner-, Mover- en Leaver-lifecycle**.
