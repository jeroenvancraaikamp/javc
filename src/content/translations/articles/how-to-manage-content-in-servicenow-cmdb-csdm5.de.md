---
title: "Wie verwaltet man Inhalte in der ServiceNow CMDB/CSDM?"
excerpt: "Eine korrekte Configuration Management Database (CMDB) im Einklang mit dem Common Service Data Model (CSDM) von ServiceNow aufzubauen und zu pflegen, ist für die meisten Unternehmen eine große Herausforderung. Dieser Leitfaden beschreibt, wie Sie dabei richtig vorgehen, welche Arten von Items in der CMDB registriert werden sollten (und welche nicht)"
source: "15fb901a5abce0fa"
---

Eine korrekte Configuration Management Database (CMDB) im Einklang mit dem Common Service Data Model (CSDM) von ServiceNow aufzubauen und zu pflegen, ist für die meisten Unternehmen eine große Herausforderung. Dieser Leitfaden beschreibt, wie Sie dabei richtig vorgehen, welche Arten von Items in der CMDB registriert werden sollten (und welche nicht) und mit welchen Methoden sich am wirksamsten eine hohe Datenqualität erreichen lässt – sowohl mit der heutigen Technologie als auch mit Blick auf künftige Anforderungen.  

### Grundprinzip

  
Unternehmen sollten ihre Portfolio-Baselines (z. B. Services, Offerings, Applikationen) manuell definieren und pflegen. Die Instanzen dieser Baselines – also der Inhalt der CMDB – sollten automatisch per Discovery ermittelt oder aus autorisierten Datenquellen föderiert werden. **Kein Mensch sollte Attribute oder Beziehungen von Configuration Items (CIs) in der CMDB manuell ändern, damit die CMDB die technische Realität widerspiegelt.** Begrenzte Ausnahmen können zugelassen werden, sofern die automatisierte Datenqualität dadurch nicht beeinträchtigt wird.

Unternehmen sollten nur ihre eigenen Items/Beziehungen registrieren sowie die Items, die sie (als Service) von einem internen oder externen Provider beziehen. Die Service Provider sollten (in ihrer eigenen CMDB) erfassen, was sie als Service bereitstellen. MSPs, die Produktinstanzen des Unternehmens verwalten, müssen diese per Discovery/Federation in die CMDB des Unternehmens einspielen, damit das Unternehmen jederzeit aus seiner eigenen CMDB über seine eigenen Assets berichten kann.  

### **Einleitung**

  
ServiceNow bietet mehrere Möglichkeiten, Configuration Items (Instanzen) in der ServiceNow CMDB anzulegen bzw. zu aktualisieren.  

  
-   **ServiceNow bietet fünf Methoden (die parallel genutzt werden können), um die für die ServiceNow CMDB benötigten Configuration Items (CIs) zu identifizieren.**  
    
      
    -   Über einen IP-Sweep werden alle IP-Geräte in bekannten/sichtbaren IP-Bereichen erkannt (IP-/MAC-Adresse, FQDN und verfügbare Managementprotokolle wie SSH, WMI, RDP und SNMP sind dann für alle Geräte bekannt).
      
    -   Der Agent Client Collector (ACC), installiert auf einem Linux-/Windows-/macOS-Gerät, kann ServiceNow über das Gerät informieren, auf dem er installiert ist.
      
    -   Per Federation kann ServiceNow (aus verschiedenen Datenquellen) die Configuration Items abrufen, für deren Bereitstellung diese Quellen autorisiert sind.
      
    -   Wenn ServiceNow über eine Integration ein Event zu einem CI empfängt, kann dieses CI (falls nötig) in der CMDB registriert werden.
      
    -   Berechtigte Benutzer können CIs (bzw. deren Beziehungen/Attribute) manuell in der CMDB in ServiceNow registrieren, entweder per Dateiimport oder direkt über die ServiceNow-Oberfläche.
      
    
      
    
  
-   **ServiceNow bietet fünf Methoden (die parallel genutzt werden können), um per Discovery und Federation zu ermitteln, was auf den erkannten IP-Geräten installiert ist bzw. läuft.**  
    
      
    -   Credential-based Discovery kann genutzt werden, wenn die entsprechenden Rechte/Credentials dafür konfiguriert sind (ServiceNow meldet sich am IP-Gerät an).
      
    -   Credential-less Discovery kann genutzt werden, indem die verfügbaren Managementprotokolle des erkannten IP-Geräts abgefragt werden (ServiceNow ruft die zugänglichen Informationen ab).
      
    -   Der Agent Client Collector (ACC) kann ServiceNow über das meiste informieren, was auf dem Gerät, auf dem ACC installiert ist, läuft bzw. vorhanden ist, sowie darüber, wer es wann nutzt bzw. genutzt hat.
      
    -   Per Federation kann ServiceNow (aus verschiedenen Datenquellen) Informationen darüber abrufen, was in/auf den bekannten Configuration Items läuft.
      
    -   Berechtigte Benutzer können manuell registrieren, was in/auf CIs in der CMDB in ServiceNow installiert ist, entweder per Dateiimport oder direkt über die ServiceNow-Oberfläche.
      
    
      
    
  
-   **ServiceNow hat drei Möglichkeiten, Abhängigkeiten zwischen (Items in) den in der CMDB registrierten Stacks zu ermitteln.**  
    
      
    -   Über Credential-based Discovery kann ServiceNow Patterns und Abhängigkeiten untersuchen (z. B.: Diese Application Component nutzt diese DB/API jener Applikation).
      
    -   Per Federation kann ServiceNow (aus verschiedenen Datenquellen) die Abhängigkeiten abrufen (z. B.: Laut APM hat diese Applikation eine Schnittstelle zu jener Applikation).
      
    -   Berechtigte Benutzer können die bekannten Abhängigkeiten der CIs manuell registrieren.
      
    
      
    
  
-   **ServiceNow-Automatisierung kann (sofern das Unternehmen die entsprechenden Lizenzen erworben hat):**  
    
      
    -   detaillierten Einblick geben, was auf IP-Geräten mit installiertem Agent Client Collector läuft/installiert/konfiguriert ist (und was nicht),
      
    -   dem Service Desk Remote-Zugriff auf IP-Geräte mit installiertem Agent Client Collector ermöglichen,
      
    -   Software installieren/entfernen oder Softwareeinstellungen/Policies auf IP-Geräten mit installiertem Agent Client Collector ändern,
      
    -   konfigurierte Events/Alarme direkt von IP-Geräten mit installiertem Agent Client Collector empfangen,
      
    -   Cloud Services/Resources mithilfe des ServiceNow Integration Hub installieren/entfernen (z. B. zur Cloud-Optimierung),
      
    -   IAM-Services/-Resources mithilfe des ServiceNow Integration Hub installieren/entfernen (direkt in AD/Entra oder über SailPoint/Saviynt),
      
    -   AI Agents und Skripte auslösen, direkt oder über ServiceNow MID Server.
      
    
      
    
  

  
Zur Information: ServiceNow enthält außerdem (Attribute/Beziehungen von) Portfolio-Items (Baselines):  

  
-   Business Applications und Business Capabilities werden mit dem APM-Modul (Teil von SPM) in ServiceNow oder in einer anderen autorisierten Datenquelle (LeanIX, Apptio usw.) gepflegt.
  
-   Services, Service Offerings und ihre Commitments/Entitlements werden mit dem DPM-Modul in ServiceNow gepflegt.
  
-   SDLC-Komponenten werden im DevOps-Modul nach Agile-/SAFe-Praktiken gepflegt.
  
-   Bestellbare Produktkatalog-Items werden mit Service Catalog Management (Teil von ITSM) gepflegt.
  
-   Asset-/CI-Modelle und Lizenzen werden in ServiceNow mit Software/Hardware Asset Management gepflegt oder als Teil der per Discovery/Federation ermittelten CI-Informationen bereitgestellt.
  
-   Integrated Risk Management, Business Continuity Management und Security Operations haben bzw. verwalten jeweils eigene Baseline-Artefakte, die häufig mit Instanzen in der CMDB verknüpft sind.
  
-   Grundlegende Stammdaten (z. B. Unternehmen, Geschäftsbereiche, Abteilungen, Länder, Regionen/Provinzen, Sprachen, Währungen, Standorte, Gruppen, Benutzer, Rollen usw.) können in ServiceNow gepflegt werden,  
    werden jedoch häufig von ServiceNow aus anderen autorisierten Datenquellen abgerufen (z. B. Workday, HCM, SuccessFactors, AD, Saviynt, SailPoint, ISO 3166, IANA usw.).
  

  
*Der Rest dieses Artikels konzentriert sich auf die Registrierung und Pflege von Instanz-CIs in der CMDB über ITOM/ITSM.*  

### **Überlegungen**:

  

  
-   Der Inhalt der CMDB wird immer feingranularer und muss nahezu in Echtzeit aktuell gehalten werden.
  
-   Public-Cloud-Plattformen, Network-/Element-Manager sowie SD-WAN-, AI- und CDaaS-Tools können ServiceNow inzwischen CMDB-Informationen liefern, häufig über Out-of-the-Box-Integrationen/-Konnektoren.
  
-   Einige Plattformen haben eigene Datenquellen (z. B. Copado, SAP CALM, SAP ChaRM, GitLab, SolarWinds usw.), die ServiceNow CMDB-Informationen liefern können, häufig über Out-of-the-Box-Integrationen/-Konnektoren.
  
-   Immer mehr Unternehmen entscheiden sich für eine Zero-Touch-CMDB, bei der keinerlei manuelle Pflege von CMDB-Inhalten mehr nötig ist – mit Ausnahme der Applikations-/Service-Portfolio-Baselines.
  
-   Einige Unternehmen erlauben die manuelle Pflege von CIs/Assets bestimmter Typen/Klassen (für die es keine geeignete Quelle gibt) in der CMDB, z. B. Autos, Fahrräder, Gebäude/Einrichtungen, Schlüssel, Racks, Cages.
  
-   ServiceNow kann nichts erkennen, was es nicht „sehen“ kann oder was keinen Kontakt zu ServiceNow aufnimmt (z. B. über ACC oder API).
  
-   ServiceNow MID Server können die Sichtbarkeit von ServiceNow auf das ausweiten, was mit On-Premises-IP-Netzwerken oder IP-Netzwerken Dritter verbunden ist.
  
-   In hochkomplexen/segmentierten/abgesicherten IP-Netzwerken wird typischerweise eine große Anzahl von MID Servern oder Agent Client Collectors benötigt.
  
-   Unternehmenseigene Endgeräte werden zunehmend außerhalb des Unternehmensstandorts genutzt (z. B. im Homeoffice) und sind nicht immer mit dem Unternehmen verbunden, etwa über ein VPN.
  
-   „Bring Your Own“ Device/License wirkt sich auf die traditionelle Arbeits- und Registrierungsweise aus.
  
-   Einige Organisationen (z. B. Verteidigungsministerien) nutzen eine lokal installierte ServiceNow-Instanz, die ihre eigenen Herausforderungen und Einschränkungen mit sich bringt.
  
-   Wenn Sie auch Risk/Compliance Management, Application Portfolio Management, Vendor Management oder Asset Management ermöglichen möchten, benötigen Sie in der CMDB zusätzliche Daten über das hinaus, was für IT Service Management erforderlich ist.
  

  

### **Leitprinzipien:**

  

  
-   Halten Sie sich an die Definitionen/Beziehungen des ServiceNow Common Service Data Model. Nutzen Sie so weit wie möglich Out-of-the-Box-Integrationen (OOTB) mit ServiceNow.  
    Passen Sie nur dann und dort an, wo es gerechtfertigt ist und die langfristigen Auswirkungen gut durchdacht sind.
  
-   Pflegen Sie CMDB-Inhalte nur dann manuell, wenn Automatisierung keine praktikable Option ist und Sie sicherstellen können, dass diese CMDB-Daten ordnungsgemäß gepflegt und regelmäßig überprüft (zertifiziert) werden.
  
-   Wenn Sie ein oder mehrere Items/Assets in der CMDB manuell pflegen, werden externe Auditoren auf Dokumentation, Implementierung, Schulung, Pflege und Governance der Prozesse sowie auf kontinuierliche Maßnahmen zur Verbesserung der Datenqualität für diese Items bestehen.
  
-   Wer sich für eine Zero-Touch-CMDB mit CI-Instanzen (und deren Beziehungen) entscheidet, muss die erforderlichen technischen CMDB-Integrationen pflegen und die Portfolio-Baselines mithilfe von Digital Portfolio Management manuell pflegen lassen – durch die Portfolio- bzw. Service Owner.
  

  
**Wann sollten Sie einen Agent Client Collector (ACC) auf einem Windows-/Linux-/macOS-Computer installieren bzw. nutzen?**  

  
-   Wenn das Unternehmen IP-Geräte nicht ohne Weiteres für ServiceNow sichtbar machen kann (z. B. weil sich die IP-Geräte hinter mehreren Firewalls befinden, die nicht geöffnet werden dürfen)
  
-   Wenn das Unternehmen Einblick in die tatsächliche Nutzung von Software/Ressourcen auf den IP-Geräten haben möchte (z. B. für Software Asset Management)
  
-   Wenn Unternehmen IP-Geräte wie PCs/VDIs mithilfe des Agent Client Collector überwachen/verwalten möchten (für Helpdesk/SecOps)
  
-   Wenn das Unternehmen keine Tools wie JAMF/Intune/SCCM hat bzw. nutzt, die PC-Informationen an ServiceNow föderieren können
  
-   Wenn das Unternehmen Informationen benötigt, die ACC liefert, die aber über JAMF/Intune/SCCM nicht verfügbar sind
  

  
*Zur Information: Für die ServiceNow-Lizenzierung spielt es keine Rolle, auf welchem Weg das CI in die CMDB gelangt; die Nutzung von ACC ist im Preis der ITOM-Lizenz enthalten.*  

### **Wann sollten Sie einen ServiceNow MID Server einsetzen?**

  

  
-   Wenn das Unternehmen per ServiceNow Discovery IP-Geräte hinter einer Firewall erkennen möchte, auf denen kein Agent Client Collector installiert ist
  
-   Wenn das Unternehmen IP-Geräte hinter einer Firewall (bzw. das, was sich in/auf ihnen befindet) verwalten oder darauf zugreifen möchte (mit oder ohne Agent Client Collector)
  
-   Wenn das Unternehmen möchte, dass ServiceNow auf APIs zugreift, die nicht direkt aus dem öffentlichen Internet erreichbar sind (z. B. für die OCI-API)
  
-   Wenn das Unternehmen einen Teil des IP-Netzwerks segmentiert, sodass ServiceNow oder seine anderen MID Server nicht sehen können, was in diesem Netzwerk angeschlossen ist
  

  
*Hinweis 1: Obwohl die MID-Server-Software keine kostenpflichtige ServiceNow-Lizenz erfordert, entstehen Kosten für Betriebssystemlizenzen, IAM und die Wartung der VMs, auf denen die Software installiert ist.*

*Hinweis 2: Ein MID Server hat Kapazitäts- und Performancegrenzen. Außerdem wird davon abgeraten, Produktions- und Nicht-Produktions-Traffic auf demselben MID Server zu mischen. Daher werden Sie wahrscheinlich mehrere MID Server benötigen.*  

### **Einsatz von Credentials für Discovery und Automatisierung**

  
Wird Credential-based Discovery gewählt, um CMDB-Inhalte anzulegen/zu aktualisieren und/oder Software/Einstellungen zu installieren/zu entfernen, benötigt ServiceNow dafür Credentials:  

  
-   ServiceNow kann so konfiguriert werden, dass es eine (begrenzte Anzahl) generischer Kombinationen aus Konto und Passwort verwendet, die lokal in ServiceNow gespeichert sind (einfach einzurichten und zu pflegen, von SecOps aber oft nicht bevorzugt).
  
-   ServiceNow kann so konfiguriert werden, dass es Credentials verwendet, die in CyberArk gespeichert und gepflegt und nicht in ServiceNow abgelegt werden (erfordert eine Integration mit CyberArk, wird von SecOps aber oft bevorzugt).
  

  
*Hinweis: Es wird vorausgesetzt, dass die Konto-Credentials auf den IP-Geräten, die per Credential-based Discovery erkannt werden sollen, vorab bereitgestellt sind (z. B. als Teil des Images).  
Das Konto für die Credential-based Discovery benötigt Lesezugriff auf die Inventardaten der Geräte.*  

### **Bring Your Own (BYO) Devices**

  

  
-   BYO-Geräte gehören einer anderen Partei als dem Unternehmen selbst. Gehören sie in Ihre CMDB?
  
-   Auf BYO-Geräten installierte Software kann im Besitz der anderen Partei sein bzw. von ihr bezahlt werden statt vom Unternehmen.
  
-   Wenn Sie das BYO-Gerät in Ihrer CMDB registrieren möchten (z. B. für SecOps oder Support), kennzeichnen Sie das Gerät als BYO.
  
-   Wenden Sie BYO-Regeln auf als BYO gekennzeichnete Geräte (bzw. das, was sich in/auf ihnen befindet) an.
  

  

### **SaaS-/PaaS-Lösungen**

  

  
-   Configuration Items werden häufig (als Einheit oder Bündel) „as a Service“ von einem internen/externen Managed Service Provider bereitgestellt. Die Baselines (d. h. Modelle) werden nicht in der CMDB registriert.  
    Die Instanzen der bereitgestellten Services können als „Service Instances“ registriert und mit den CIs verknüpft werden, von denen sie abhängen.
  
-   Bei den meisten SaaS-Services von Drittanbietern (die als verwaltete Blackbox angeboten werden) sind die CIs unbekannt und werden nicht in der CMDB registriert.  
    Die SaaS-Services/-Offerings (Baselines) werden in bzw. über Digital Portfolio Management definiert. Werden mehrere Instanzen des SaaS bereitgestellt, können diese als „Service Instances“ registriert werden.
  
-   Die meisten gängigen SaaS-Anbieter (z. B. Microsoft, SAP, Salesforce, Google, Asana usw.) stellen APIs bereit, über die Unternehmen sehen können, welche Benutzer/Rollen welche Lizenzen/Services nutzen.
  
-   Einige SaaS-Anbieter bieten APIs, über die Lizenzen, Services oder Rollen angefordert oder zurückgegeben werden können.
  

  

### **Tagging und Mapping:**

  

  
-   Moderne Configuration Items können getaggt werden. Für unterschiedliche Zwecke werden unterschiedliche Keys verwendet. Die Tags werden ServiceNow als Teil des CI übermittelt.  
    
      
    -   Einige Unternehmen verwenden die CI-Umgebung als Tag (z. B. Development, Test, Production).
      
    -   CIs, die (direkt) mit den Offerings verknüpft werden sollen, unter die sie fallen, sind mit der eindeutigen ID des Offerings zu taggen.  
        Das Tag wird dann verwendet, um eine Beziehung bzw. ein Mapping „Offering depends on Cloud Service Account“ anzulegen (d. h. Tag-based Mapping).
      
    
      
    
  
-   Gruppierung nicht getaggter CIs, die Offerings zugeordnet werden können:  
    
      
    -   Es können Gruppen von CIs definiert und deren Mitglieder diesen Gruppen manuell zugeordnet werden (z. B. D-, T-, A- und P-Umgebungen derselben Applikation).
      
    -   CIs einer ähnlichen Klasse bzw. eines ähnlichen Typs können anhand einer Abfrage automatisch der Gruppe zugeordnet werden (z. B. „Alle Windows-10-PCs von Benutzern mit Standort Amsterdam“).
      
    
      
    
  

  

### **Wann sollten die CMDB-Daten per Discovery/Federation ermittelt werden?**

  
Im Idealfall wird der CMDB-Inhalt nahezu in Echtzeit aktualisiert. Leider ist die Technologie dafür noch nicht ausgereift. Derzeit wird empfohlen,  

  
-   die Änderungen (an Attributen/Beziehungen) aller föderierten CIs täglich abzurufen (sogenannte „Delta Loads“), vorzugsweise außerhalb der Geschäftszeiten,
  
-   alle (Attribute/Beziehungen) der aktiven föderierten CIs wöchentlich abzurufen (sogenannte „Full Loads“), wodurch das Ziel (die CMDB) vollständig neu synchronisiert wird,
  
-   jeden Discovery-Job täglich auszuführen, z. B. das gesamte IP-Netzwerk einmal pro Tag zu scannen,
  
-   die verschiedenen Jobs über den Tag zu verteilen, um die Last auf den ServiceNow-Instanzen/MID Servern zu minimieren,
  
-   bei Bedarf Ad-hoc-Discoveries in Echtzeit auszuführen (für ein Configuration Item mit installiertem Agent Client Collector),
  
-   den CMDB-Inhalt nach Möglichkeit in Echtzeit zu aktualisieren, zum Beispiel wenn die Quelle ihre Daten per Push in die CMDB überträgt.
  

  

### **Wie steuert man die CMDB Health?**

  

  
-   Verfolgen und überprüfen Sie quantitative Trends mithilfe von Performance Analytics oder BI-Tools, z. B.:  
    
      
    -   Gesamtzahl aktiver Items pro Klasse und Quelle zum Ende der Vorperiode
      
    -   Anzahl der Items pro Klasse und Quelle, die in der Vorperiode angelegt wurden
      
    -   Anzahl der Items pro Klasse und Quelle, die in der Vorperiode aktualisiert wurden
      
    -   Anzahl der Items pro Klasse und Quelle, die in der Vorperiode außer Betrieb genommen wurden
      
    
      
    
  
-   Definieren Sie, was „gut“ ist, und überwachen Sie dies (und berichten Sie darüber), z. B.:  
    
      
    -   Prozentsatz der Computer mit installierter Software (sollte 100 % betragen, ausgenommen BYO-/nicht verwaltete Geräte)
      
    -   Prozentsatz der aktiven CIs, die in den letzten 90 Tagen aktualisiert/geliefert wurden (sollte 100 % betragen)
      
    -   Prozentsatz der VMs, die einen Server virtualisieren (sollte über 90 % liegen)
      
    -   Prozentsatz der CIs (z. B. PCs, Telefone), die einer aktiven Person zugeordnet sein sollten und tatsächlich einer aktiven Person zugeordnet sind (sollte über 90 % liegen)
      
    -   Prozentsatz physischer CIs an einem bekannten Standort (sollte 100 % betragen)
      
    -   usw.
      
    
      
    
  
-   Berichten Sie monatlich über (den Trend der) Prozentsätze für Coverage, Completeness, Accuracy, Staleness und (optional) Compliance von CIs/Beziehungen.
  
-   Steuern Sie die technischen Integrationen (regelmäßige Überprüfung von Daten und Plänen mit den Ownern der einzelnen integrierten Datenquellen).
  
-   Lassen Sie manuell gepflegte CIs/Beziehungen von ihrem CI- bzw. Service Owner zertifizieren.
  
-   Führen Sie bei Bedarf Projekte zur Verbesserung der Datenqualität durch.
  
-   Verfolgen Sie, welche Items von Event-Management-Tools angelegt wurden (warum sind sie nicht über den regulären Weg hereingekommen?).
  

  

### **Empfohlene Szenarien für ein typisches Großunternehmen:**

  
Großunternehmen wird empfohlen, Folgendes umzusetzen:  

  
-   **PERSONAL COMPUTING:**
  

  

  
-     
    
      
    -   Föderieren Sie persönliche Endgeräte (einschließlich dessen, was darauf installiert ist) aus JAMF und/oder Intune (sofern diese genutzt werden).
      
    -   Installieren Sie bei Bedarf Agent Client Collectors auf PCs, zum Beispiel um die Daten aus Intune/JAMF anzureichern und die Remote-Verwaltung von PCs zu ermöglichen.
      
    -   Föderieren Sie Geräte- und Supportinformationen von den globalen Anbietern dieser Geräte (z. B. Dell, Lenovo usw.) über deren OOTB-APIs.
      
    -   Legen Sie länder- bzw. technologiespezifische Richtlinien für die Verwaltung von BYO-Geräten (bzw. dessen, was sich in/auf ihnen befindet) fest (verschiedene Länder è unterschiedliche Gesetzgebungen und Betriebsräte).
      
    
      
    
  

  

  
-   **OFFICE COMPUTING**
  

  

  
-     
    
      
    -   Föderieren Sie Informationen zu Bürodruckern (bzw. Druckservices) von den Anbietern dieser Drucker (bzw. Services).
      
    -   Föderieren Sie Facility Assets aus Facility-Asset-Management-Tools (CCTV, Aufzüge, OT-Geräte, LED-Fernseher usw.).
      
    -   Erkennen Sie relevante OT-Geräte (z. B. SPS), die über IP-Controller verwaltet werden, per SNMP oder Custom Patterns.
      
    -   Föderieren Sie Daten aus dem Gebäudezutrittsmanagement aus BAM-Tools (z. B. biometrische Lesegeräte, Schranken/Türen).
      
    
      
    
  

  

  
-   **CLOUD-ARTEFAKTE:**
  

  

  
-     
    
      
    -   Föderieren Sie Cloud-Artefakte aus AWS, Azure und GCP mithilfe von Out-of-the-Box Service Graph Connectors in die CMDB.
      
    -   Föderieren Sie Cloud-Artefakte aus OCI mithilfe von Out-of-the-Box-Plugins. Erkennen Sie die Linux-/Windows-Server per Credential-based Discovery oder mit Agent Client Collectors.
      
    -   Bei Bedarf: Ermitteln Sie mit ServiceNow Discovery, was sich in Cloud-Containern befindet und welche Abhängigkeiten bestehen.
      
    
      
    
  

  

  
-   **ON-PREMISES-AUSSTATTUNG (ohne Personal Computing)**
  

  

  
-     
    
      
    -   Setzen Sie (getrennte Produktions- und Nicht-Produktions-)MID Server im IP-Netzwerk des Unternehmens ein.
      
    -   Sofern von der Security erlaubt: Ermitteln Sie per Credential-less Discovery, welche Geräte mit relevanten IP-Bereichen des Unternehmens verbunden sind.
      
    -   Wenn die Security keine IP-Sweeps erlaubt: Lassen Sie Agent Client Collectors auf Windows-/Linux-Servern installieren und/oder föderieren Sie Daten aus autorisierten Quellen (z. B. SolarWinds, PRTG, SCCM).
      
    
      
    
  

  

  
-   **NETWORK COMPUTING**
  

  

  
-     
    
      
    -   Wenn Discovery von der Security erlaubt ist: Ermitteln Sie per Credential-less Discovery, welche Router/Switches mit relevanten IP-Bereichen des Unternehmens verbunden sind.
      
    -   Wenn Discovery von der Security nicht erlaubt ist: Föderieren Sie die Daten der Netzwerkgeräte aus einer maßgeblichen Datenquelle (z. B. Network Manager, Element Manager).
      
    -   Föderieren Sie Netzwerkkonfigurationsdaten wie Netzwerksegmente, Firewall-Regeln, IP-Bereiche, VPNs und Zertifikate aus maßgeblichen Datenquellen.
      
    
      
    
  

  

  
-   **SAAS-/PAAS-LÖSUNGEN**
  

  

  
-     
    
      
    -   Von Drittanbietern bezogene SaaS-/PaaS-Services (Baselines) müssen manuell als Services/Offerings registriert werden. Ihre Instanzen/Tenants (CIs) können entweder manuell oder per Discovery als Service Instances registriert werden.
      
    -   Wenn das Unternehmen die SaaS-Lizenzen/-Services/-Rollen über ServiceNow visualisieren und verwalten möchte, empfiehlt sich eine Integration mit den relevanten SaaS-/PaaS-Anbietern (z. B. Microsoft, SAP, Salesforce, Google).
      
    
      
    
  

  

### **Abschließende Hinweise:**

  

  
-   Für manche Unternehmen können Abweichungen von den obigen Empfehlungen nötig oder sinnvoll sein.
  
-   Nicht alle Datenquellen haben die gleichen Fähigkeiten; der Teufel steckt im Detail.
  
-   ServiceNow ist großartig, aber nicht perfekt; manche Anpassungen machen es schlicht besser :-)
  
-   Ziehen Sie einen CMDB-/CSDM-Spezialisten hinzu, der Sie zum besten Setup und zur passenden Roadmap für die Anforderungen und Möglichkeiten Ihres Unternehmens berät.
