---
title: "25 Gesprächsbeispiele für einen KI-Support-Agenten"
excerpt: "Gesprächs-Playbook für KI-Support-Agenten – mehrsprachiger IT-Support über Microsoft Teams Überblick Dieses Playbook enthält 25 Gesprächsbeispiele für einen mehrsprachigen KI-Agenten, der Benutzer über Microsoft Teams in den folgenden IT-Bereichen unterstützt: Jedes Szenario umfasst eine typische"
source: "077e06d9444bed30"
---

**Gesprächs-Playbook für KI-Support-Agenten – mehrsprachiger IT-Support über Microsoft Teams**

**Überblick**

Dieses Playbook enthält 25 Gesprächsbeispiele für einen mehrsprachigen KI-Agenten, der Benutzer über Microsoft Teams in den folgenden IT-Bereichen unterstützt:

-   • Endgeräte
-   • Identity & Access Management
-   • Business-Anwendungen
-   • Netzwerk & Telekommunikation
-   • Collaboration-Tools
-   • Cloud-Infrastruktur
-   • Allgemeiner Support & Universal Requests
-   • Sensible Sicherheits- oder Compliance-Themen

Jedes Szenario umfasst eine typische Frage oder ein typisches Problem eines Benutzers, den Diagnose- und Antwortprozess des KI-Agenten sowie das Ergebnis. Die Gespräche verlaufen über mehrere Runden, um einen realistischen, menschenähnlichen Dialog abzubilden.

**1\. Endgeräte – Excel stürzt ab**

**Benutzer**: Mein Laptop friert immer wieder ein, wenn ich Excel öffne. **Agent**: Danke für Ihre Meldung. Ich sehe, dass Sie ein Windows-11-Firmengerät verwenden, das in Intune registriert ist. Ich prüfe, ob ähnliche Probleme bekannt sind. *...ruft Intune-Daten ab, prüft bekannte Probleme und Excel-Logs...* **Agent**: Es gibt ein bekanntes Problem mit der aktuellen Excel-Version. Sie können es beheben, indem Sie Office aktualisieren. Soll ich das Update remote anstoßen? **Benutzer**: Ja, bitte. **Agent**: Update gestartet. Es sollte in 3–5 Minuten abgeschlossen sein. Bitte starten Sie Excel anschließend neu. **Benutzer**: Verstanden. Sollte ich meine Arbeit speichern, bevor es installiert wird? **Agent**: Ja, bitte speichern Sie Ihre gesamte Arbeit, um Datenverlust zu vermeiden. Geben Sie mir Bescheid, sobald Sie bereit sind. **Benutzer**: Jetzt bereit. **Agent**: Das Update wird installiert ... Fertig. Bitte starten Sie Excel neu und prüfen Sie, ob es noch einfriert. **Benutzer**: Scheint jetzt stabil zu sein. Danke! **Agent**: Gern geschehen. Ich erfasse dies als gelöst. Melden Sie sich, falls noch etwas anderes auftritt.

**2\. Identity & Access – HR-Portal fehlt**

**Benutzer**: Ich komme nicht mehr ins HR-Portal. **Agent**: Ich sehe mir Ihre Zugriffsrechte an. Einen Moment, ich prüfe Saviynt und Ihre aktuellen Rollen. *...überprüft den Zugriffsstatus, erkennt eine Rollenänderung aus Workday...* **Agent**: Ich sehe, dass sich Ihre Rolle letzte Woche geändert hat und der Zugriff auf das HR-Portal automatisch entfernt wurde. **Benutzer**: Das erklärt es. Kann ich ihn zurückbekommen? **Agent**: Ja, ich reiche einen Universal Request ein, um Ihren Zugriff wiederherzustellen. Möglicherweise ist eine Genehmigung durch Ihre Führungskraft erforderlich. **Benutzer**: OK, danke. **Agent**: Der Request wurde eingereicht und an Ihre Führungskraft weitergeleitet. Sie werden benachrichtigt, sobald er genehmigt und der Zugriff wiederhergestellt ist.

**3\. Business-Anwendungen – SAP-Job fehlgeschlagen**

**Benutzer**: Unser SAP-Genehmigungsworkflow funktioniert heute Morgen nicht. **Agent**: Verstanden. Sehen wir uns an, was los ist. Ich prüfe Ihr Abonnement für SAP Finance ... bestätigt. Jetzt sehe ich mir die Job-Logs an. *...ruft den Fehler eines Batch-Jobs aus dem SAP-Job-Monitor ab...* **Agent**: Ein Hintergrundjob ist letzte Nacht fehlgeschlagen. Das ist wahrscheinlich die Ursache. **Benutzer**: Können wir ihn manuell erneut ausführen? **Agent**: Das muss das SAP-Betriebsteam übernehmen. Ich erfasse den Incident und benachrichtige das Team. **Benutzer**: Sehr gut. Bitte vermerken Sie, dass der CFO blockiert ist. **Agent**: Selbstverständlich. Ich habe dies als hohe Priorität markiert. Incident #INC123456 wurde erstellt und an das SAP-Team weitergeleitet.

**4\. Netzwerk – VPN-Problem**

**Benutzer**: Ich kann mich nicht mit dem VPN verbinden. Gestern hat es noch einwandfrei funktioniert. **Agent**: Gehen wir der Sache auf den Grund. Ich starte eine Remote-Diagnosesitzung auf Ihrem Gerät ... *...ACC ruft Konnektivitäts-Logs ab...* **Agent**: Die Version Ihres VPN-Clients ist veraltet. Das verursacht wahrscheinlich das Authentifizierungsproblem. **Benutzer**: Können Sie das beheben? **Agent**: Ich kann das neueste VPN-Paket auf Ihr Gerät verteilen. Möchten Sie fortfahren? **Benutzer**: Ja, bitte. **Agent**: Update gestartet. Ihre Verbindung kann vorübergehend unterbrochen werden. **Benutzer**: Verstanden. **Agent**: Das Update ist abgeschlossen. Bitte versuchen Sie jetzt, sich zu verbinden. **Benutzer**: Es funktioniert wieder. Vielen Dank! **Agent**: Gern geschehen. Ich erfasse dies als gelöst.

**5\. Collaboration – Teams-Kalendersynchronisierung**

**Benutzer**: Mein Teams-Kalender synchronisiert nicht mit Outlook. **Agent**: Prüfen wir die Synchronisierungskonfiguration. Ich greife auf Ihre Microsoft-365-Integration zu ... *...überprüft den Synchronisierungsstatus des Postfachs...* **Agent**: Ich sehe, dass Ihr Postfach gerade zwischen Servern migriert wird. Das verzögert manchmal die Kalendersynchronisierung. **Benutzer**: Wie lange wird das dauern? **Agent**: Bis zu 2 Stunden. Ich behalte das im Blick und benachrichtige Sie, sobald es wieder funktioniert. **Benutzer**: Kann ich in Teams trotzdem manuell Besprechungen anlegen? **Agent**: Ja, aber sie erscheinen möglicherweise nicht sofort in Outlook. Ich empfehle, vorerst direkt Teams zu verwenden. **Benutzer**: Alles klar, danke für den Hinweis. **Agent**: Kein Problem. Ich melde mich bei Ihnen, sobald die Synchronisierung wieder läuft.

**6\. Cloud-Infrastruktur – Azure-VM gestoppt**

**Benutzer**: Einer meiner Testserver in Azure reagiert nicht mehr. **Agent**: Sehen wir uns das an. In welcher Umgebung befindet er sich? **Benutzer**: Im Abonnement finance-dev. **Agent**: Gefunden. Er befindet sich derzeit im Status „Stopped (deallocated)“. Wahrscheinlich wurde er wegen Inaktivität heruntergefahren. **Benutzer**: Kann ich ihn selbst neu starten? **Agent**: Das können Sie, aber ich kann den Neustart auch sofort für Sie anstoßen. **Benutzer**: Bitte machen Sie das. **Agent**: Neustart läuft ... Die VM sollte in 2–3 Minuten wieder online sein. **Benutzer**: Danke. Ich schaue gleich nach. **Agent**: Geben Sie mir Bescheid, falls sie nicht erreichbar ist. Ich behalte sicherheitshalber die Boot-Logs im Blick.

**7\. Universal Request – Telefonnummer aktualisieren**

**Benutzer**: Können Sie meine Telefonnummer im Unternehmensverzeichnis aktualisieren? **Agent**: Gern. Ich überprüfe zunächst Ihre Identität. Einen Moment, ich prüfe Ihr Mitarbeiterprofil in Workday. *...überprüft Identität und Kontaktdaten...* **Agent**: Ich habe Ihr Profil gefunden. Welche neue Nummer möchten Sie hinterlegen? **Benutzer**: Bitte ändern Sie sie auf +31 6 12345678. **Agent**: Verstanden. Ich aktualisiere jetzt ... Die neue Nummer ist nun in Ihrem Profil und im Verzeichnis eingetragen. **Benutzer**: Perfekt. Muss ich noch jemanden informieren? **Agent**: Nein, die Änderung wird systemübergreifend synchronisiert. Für diesen Request wurde kein Incident erstellt.

**8\. Sicherheit – Phishing-Link**

**Benutzer**: Ich glaube, ich habe in einer E-Mail auf einen Phishing-Link geklickt. **Agent**: Danke, dass Sie das melden. Ich erfasse einen vertraulichen Incident und starte einen Hintergrundscan auf Ihrem Gerät. **Benutzer**: Soll ich meinen Laptop herunterfahren? **Agent**: Vorerst nicht nötig. Bitte klicken Sie auf nichts weiter aus dieser E-Mail. Der Scan läuft. *...startet ACC-Malware-Scan und Isolierung...* **Agent**: Der Scan wurde gestartet, und das Gerät wird auf Auffälligkeiten überwacht. Ich habe außerdem das IT-Security-Team informiert, das sich direkt bei Ihnen melden wird. **Benutzer**: Alles klar. Danke für die schnelle Hilfe. **Agent**: Gern geschehen. Dieser Fall wird vertraulich behandelt und ist nur für autorisiertes Personal sichtbar.

**9\. Eskalation – mit einem Menschen sprechen**

**Benutzer**: Ich möchte einfach mit einem echten Menschen sprechen. **Agent**: Das verstehe ich. Ich verbinde Sie jetzt mit einem Live-Agenten. Bitte warten Sie, während ich die Übergabe vorbereite. *...fasst den Kontext des Problems zusammen und leitet an die Support-Queue weiter...* **Agent**: Ich habe Ihr Gespräch und eine Zusammenfassung des Problems an den Helpdesk gesendet. Ein Live-Agent wird in Kürze diesem Teams-Chat beitreten. **Benutzer**: Danke. **Agent**: Gern geschehen. Ich bleibe verfügbar, falls Sie weitere automatisierte Unterstützung benötigen.

**10\. Endgeräte – Drucker nicht gefunden**

**Benutzer**: Ich kann nicht auf meinem üblichen Bürodrucker drucken. **Agent**: Prüfen wir, ob Ihr Gerät noch dem richtigen Drucker zugeordnet ist. Einen Moment ... *...scannt die Geräteeinstellungen über ACC...* **Agent**: Ihre Druckerzuordnung scheint zu fehlen. Sie wurde möglicherweise zurückgesetzt. **Benutzer**: Können Sie ihn wieder verbinden? **Agent**: Ja, ich verbinde jetzt den Drucker HP-3rdFloor. *...fügt den Drucker wieder hinzu...* **Agent**: Erledigt. Versuchen Sie erneut zu drucken. **Benutzer**: Jetzt funktioniert es. Vielen Dank! **Agent**: Gern geholfen. Ich habe die Lösung dokumentiert, falls das Problem erneut auftritt.

**11\. IAM – Passwort abgelaufen**

**Benutzer**: Ich kann mich nicht anmelden – mein Passwort ist abgelaufen. **Agent**: Setzen wir Ihr Passwort zurück. Aus Sicherheitsgründen sende ich einen einmaligen Bestätigungscode an Ihre registrierte Mobilnummer. **Benutzer**: Okay, erhalten. Der Code lautet 742931. **Agent**: Bestätigt. Ich setze Ihr Passwort jetzt zurück ... Erledigt. Sie erhalten ein temporäres Passwort per E-Mail. Bitte ändern Sie es nach der Anmeldung. **Benutzer**: Mache ich. Danke! **Agent**: Alles erledigt. Melden Sie sich, wenn Sie noch etwas benötigen.

**12\. Business-Anwendungen – Salesforce-Feld fehlt**

**Benutzer**: Ein Pflichtfeld in Salesforce ist aus meiner Ansicht verschwunden. **Agent**: Finden wir es heraus. Können Sie mir sagen, welches Feld fehlt? **Benutzer**: Es ist das Feld „Customer Region“ auf der Account-Seite. **Agent**: Verstanden. Ich prüfe das Salesforce-Schema und die letzten Admin-Änderungen ... *...stellt fest, dass die Sichtbarkeit des Felds für Ihre Rolle geändert wurde...* **Agent**: Offenbar wurde das Feld kürzlich für Benutzer mit Ihrer Rolle ausgeblendet. Ich eskaliere dies an das Salesforce-Admin-Team. **Benutzer**: Können Sie es wieder sichtbar machen? **Agent**: Ich habe keine Berechtigung, die Sichtbarkeit auf Rollenebene zu ändern, aber ich habe einen Request mit allen Details erfasst. Sie werden benachrichtigt, sobald das Problem gelöst ist.

**13\. Netzwerk – langsames WLAN**

**Benutzer**: Mein WLAN ist heute wirklich langsam. **Agent**: Ich führe eine Leistungsprüfung Ihrer Netzwerkverbindung durch. *...analysiert WLAN-Signalstärke und Auslastung...* **Agent**: Sie sind mit einem stark ausgelasteten 2,4-GHz-Netz verbunden. Ich empfehle, auf das 5-GHz-Band zu wechseln, sofern verfügbar. **Benutzer**: Wie mache ich das? **Agent**: Öffnen Sie Ihre WLAN-Einstellungen und suchen Sie nach dem Netzwerk „CompanyNet-5G“. Versuchen Sie, sich damit zu verbinden. **Benutzer**: Erledigt. Die Geschwindigkeit scheint schon besser zu sein. **Agent**: Ausgezeichnet. Ich dokumentiere das für den Fall, dass es erneut auftritt.

**14\. Collaboration – Teams stürzt ab**

**Benutzer**: Teams stürzt während Anrufen immer wieder ab. **Agent**: Das tut mir leid. Ich prüfe die Logs Ihres letzten Absturzes. *...ruft Absturz-Logs über ACC ab...* **Agent**: Das Problem scheint mit der Speicherauslastung zusammenzuhängen. Mehrere Ihrer Apps belegen viel RAM. **Benutzer**: Was soll ich tun? **Agent**: Ich empfehle, Ihr Gerät neu zu starten und während Anrufen möglichst wenige Apps geöffnet zu haben. Soll ich außerdem den Teams-Cache leeren? **Benutzer**: Ja, bitte. **Agent**: Cache geleert. Starten Sie Teams neu und beobachten Sie die Leistung. **Benutzer**: Mache ich. Danke für die Hilfe.

**15\. Cloud – GCP-App ausgefallen**

**Benutzer**: Unsere auf GCP gehostete Marketing-App ist ausgefallen. **Agent**: Sehen wir uns das an. Ich prüfe den Integritätsstatus der Anwendung für das GCP-Projekt. *...fragt GCP-Status und Logs ab...* **Agent**: In der GCP-Zone, die Ihre App nutzt, gibt es einen regionalen Ausfall. Google untersucht das bereits. **Benutzer**: Wir müssen also einfach abwarten? **Agent**: Ja. Ich habe Sie für Updates angemeldet und benachrichtige Sie, sobald das Problem behoben ist. **Benutzer**: Alles klar, sagen Sie mir Bescheid, sobald sie wieder läuft. **Agent**: Mache ich.

**16\. Universal Request – Anzeigenamen ändern**

**Benutzer**: Ich möchte meinen Anzeigenamen in allen Unternehmenssystemen ändern. **Agent**: Gern helfe ich Ihnen dabei. Wie soll Ihr neuer Anzeigename lauten? **Benutzer**: Bitte ändern Sie ihn auf „Alex van der Meer“. **Agent**: Verstanden. Ich reiche den Request bei HR und den Identitätssystemen ein. Es kann einige Stunden dauern, bis die Änderung überall übernommen ist. **Benutzer**: Okay, geben Sie mir einfach Bescheid, wenn es erledigt ist. **Agent**: Request eingereicht. Sie erhalten eine Bestätigung, sobald die Änderung abgeschlossen ist.

**17\. Sicherheit – Compliance-Bedenken**

**Benutzer**: Ich glaube, wir nutzen mehr Adobe-Lizenzen, als wir haben. **Agent**: Ich prüfe Ihre Lizenznutzung über das Software-Asset-Management-System. *...ruft Daten aus dem SAM-Pro-Dashboard ab...* **Agent**: Sie haben recht – die Nutzung liegt derzeit 15 % über dem lizenzierten Volumen. **Benutzer**: Das ist nicht gut. Können wir etwas dagegen tun? **Agent**: Ich melde das an das Compliance-Team. Es kann ungenutzte Lizenzen zurückholen oder zusätzliche Lizenzen verhandeln. **Benutzer**: Bitte tun Sie das. **Agent**: Ich habe es als Compliance-Bedenken erfasst. Sie werden in die weitere Bearbeitung einbezogen.

**18\. Endgeräte – Webcam nicht erkannt**

**Benutzer**: Meine Webcam funktioniert in Zoom nicht. **Agent**: Gehen wir der Sache auf den Grund. Ich prüfe Ihre Gerätetreiber. *...erkennt fehlenden Webcam-Treiber...* **Agent**: Ihr Webcam-Treiber scheint zu fehlen. Soll ich ihn neu installieren? **Benutzer**: Ja, bitte. **Agent**: Wird neu installiert ... Erledigt. Bitte testen Sie Ihre Kamera. **Benutzer**: Sie funktioniert wieder. Danke! **Agent**: Das freut mich. Ich behalte das Gerät im Blick, falls das Problem erneut auftritt.

**19\. IAM – MFA-Sperre**

**Benutzer**: Ich komme nicht durch die MFA – mein Code wird ständig abgelehnt. **Agent**: Ich überprüfe Ihre Identität und die Token-Konfiguration. *...überprüft die Identität und die letzten Authentifizierungs-Logs...* **Agent**: Offenbar wurde Ihr Token wegen zu vieler Fehlversuche gesperrt. Ich setze ihn jetzt zurück. **Benutzer**: Danke. Was passiert jetzt? **Agent**: Sie erhalten per E-Mail einen neuen Link zur MFA-Registrierung. Damit richten Sie Ihr Gerät erneut ein. **Benutzer**: Verstanden. **Agent**: Alles erledigt. Melden Sie sich, wenn Sie bei der Einrichtung Hilfe brauchen.

**20\. Cloud – Fehler beim OCI-Bucket**

**Benutzer**: Ich erhalte bei unserem OCI-Storage-Bucket die Fehlermeldung „Zugriff verweigert“. **Agent**: Sehen wir uns Ihre IAM-Berechtigungen an. *...prüft OCI-Rollenzuweisungen und Richtlinien...* **Agent**: Ihrem Konto fehlt die erforderliche Leseberechtigung für diesen Bucket. **Benutzer**: Können Sie sie erteilen? **Agent**: Ich habe keinen Zugriff, um OCI-Rollen zu ändern, aber ich bitte den Bucket-Owner, Sie hinzuzufügen. **Benutzer**: Bitte tun Sie das. **Agent**: Request eingereicht. Sie werden benachrichtigt, sobald der Zugriff erteilt wurde.

**21\. Allgemein – Wie lautet meine IP-Adresse?**

**Benutzer**: Können Sie mir meine IP-Adresse sagen? **Agent**: Gern. Sie sind derzeit über das VPN verbunden. Ihre interne IP-Adresse lautet 10.1.45.122. **Benutzer**: Und meine externe? **Agent**: Ihre externe IP-Adresse lautet 84.234.91.7. Benötigen Sie sie für Support- oder Zugriffszwecke? **Benutzer**: Nur zur Information. Danke. **Agent**: Gern geschehen. Melden Sie sich, wenn Sie noch etwas benötigen.

**22\. Collaboration – Outlook-Suche funktioniert nicht**

**Benutzer**: Die Outlook-Suche liefert keine Ergebnisse. **Agent**: Sehen wir uns das an. Ich prüfe Ihre lokalen Indizierungseinstellungen und bekannte Probleme in M365. *...analysiert die Logs der letzten Updates...* **Agent**: Es gibt ein bekanntes Microsoft-Problem mit aktuellen Outlook-Builds. Der Workaround besteht darin, Ihr Postfach neu zu indizieren. **Benutzer**: Können Sie das remote erledigen? **Agent**: Ja. Ich starte jetzt die Neuindizierung. Sie kann 30–60 Minuten dauern. **Benutzer**: Danke. Beeinträchtigt das meinen E-Mail-Zugriff? **Agent**: Nein, der E-Mail-Zugriff bleibt bestehen. Sie erhalten eine Benachrichtigung, sobald die Indizierung abgeschlossen ist.

**23\. Business-Anwendungen – Zeiterfassungssystem nicht verfügbar**

**Benutzer**: Ich komme nicht in das Zeiterfassungssystem. **Agent**: Ich prüfe den Systemstatus und Ihre Zugriffsrechte. *...prüft den Kalender für geplante Wartungsarbeiten...* **Agent**: Das System befindet sich derzeit bis 18:00 Uhr in einer geplanten Wartung. **Benutzer**: Ich habe keine Benachrichtigung gesehen. **Agent**: Am Montag wurde eine Erinnerung per E-Mail verschickt. Soll ich sie Ihnen erneut senden? **Benutzer**: Ja, bitte. **Agent**: Erledigt. Geben Sie mir Bescheid, falls sie nicht in Kürze in Ihrem Posteingang ankommt.

**24\. Endgeräte – hohe CPU-Auslastung**

**Benutzer**: Der Lüfter meines Laptops ist laut, und er ist langsam. **Agent**: Ich führe remote eine Leistungsprüfung durch ... *...erfasst CPU-Auslastungsdaten über ACC...* **Agent**: Chrome nutzt 85 % Ihrer CPU. Sie haben 37 Tabs geöffnet. **Benutzer**: Ups. Das erklärt es. **Agent**: Schließen Sie am besten nicht benötigte Tabs. Soll ich jetzt Arbeitsspeicher freigeben? **Benutzer**: Ja, bitte. **Agent**: Arbeitsspeicher optimiert. Jetzt sollte alles flüssiger laufen.

**25\. Universal Request – neuen Laptop anfordern**

**Benutzer**: Kann ich einen neuen Laptop anfordern? **Agent**: Gern. Möchten Sie ein altes Gerät ersetzen oder fordern Sie einen Laptop für einen neuen Mitarbeiter an? **Benutzer**: Meinen ersetzen – er wird langsam. **Agent**: Ich prüfe das Alter Ihres aktuellen Geräts und Ihre Berechtigung ... *...prüft den Lebenszyklus über die CMDB...* **Agent**: Ihr Gerät ist 4,2 Jahre alt und erfüllt die Voraussetzungen für einen Austausch. Ich reiche den Request zur Genehmigung durch Ihre Führungskraft ein. **Benutzer**: Super, danke. **Agent**: Request eingereicht. Sie erhalten Updates zum weiteren Verlauf.
