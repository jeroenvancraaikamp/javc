---
title: "How to manage content in ServiceNow CMDB/CSDM?"
date: 2025-07-31
categories: ["CSDM/CMDB/TBM"]
excerpt: "Populating and maintaining an accurate Configuration Management Database (CMDB), aligned with ServiceNow’s Common Service Data Model (CSDM), is a significant challenge for most enterprises. This guide outlines how to do it right, what types of items should (and should not)"
image: "/wp-content/uploads/2025/01/teampicture3.webp"
readingTime: 15
---

Populating and maintaining an accurate Configuration Management Database (CMDB), aligned with ServiceNow’s Common Service Data Model (CSDM), is a significant challenge for most enterprises. This guide outlines how to do it right, what types of items should (and should not) be registered in the CMDB, and the most effective methods to achieve high-quality data—both with today’s technology and in preparation for tomorrow’s needs.  

### Core Philosophy

  
Enterprises should manually define and maintain their portfolio baselines (e.g., services, offerings, applications). The instances of those baselines—the content of the CMDB—should be automatically discovered or federated from authorized data sources. **No human should manually alter the attributes or relationships of CMDB Configuration Items (CIs), to ensure the CMDB reflects technical reality.** Limited exceptions may be permitted where automated data quality will not be compromised.

Enterprise should only register their own items/relations, plus the items that the enterprise consumes (as a service) from an internal or external provider. The service providers should track (in their own CMDB) what they provide as a service, MSPs who manage product instances of the enterprise, must discover/federate those into the CMDB of the enterprise, so that the enterprise can always report on its own assets, from its own CMDB.  

### **Introduction**

  
ServiceNow offers multiple ways to populate/update Configuration Items (instances)in the ServiceNow CMDB.  

  
-   **ServiceNow offers five methods (that can be used in parallel) to identify the Configuration Items (CIs) required for the ServiceNow CMDB.**  
    
      
    -   Via an IP-sweep, all IP Devices in known/visible IP ranges will be discovered (IP/MAC address, FQDN, and available management protocols such as SSH, WMI, RDP, and SNMP, will be known for all devices)
      
    -   The Agent Client Collector (ACC) installed on a Linux/Windows/MacOS device can inform ServiceNow about the devices on which it is installed.
      
    -   Via Federation, ServiceNow can retrieve (from various data sources) the Configuration Items that it is authorized to provide.
      
    -   When ServiceNow receives an Event on a CI via an Integration, that CI can be registered in the CMDB (if needed).
      
    -   Authorized Users can manually register (relations/attributes of) CI’s in CMDB in ServiceNow, either via import of files or directly via the ServiceNow GUI.
      
    
      
    
  
-   **ServiceNow offers five methods (that can be used in parallel) for discovering and federating what is installed/running on the detected IP devices.**  
    
      
    -   Credential-based discovery can be used if the rights/credentials have been configured to do so (ServiceNow logs in to the IP device)
      
    -   Credential-less discovery can be used by querying the available management protocols of the detected IP-Device (ServiceNow will retrieve accessible info)
      
    -   Agent Client Collector (ACC) can inform ServiceNow of most of what is running/on the device on which ACC is installed, as well as who is/was using it by when.
      
    -   Via Federation, ServiceNow can retrieve information (from various data sources) about what is running in/on the known Configuration Items.
      
    -   Authorized Users can manually register what is installed in/on CI’s in CMDB in ServiceNow, either via import of files or directly via the ServiceNow GUI.
      
    
      
    
  
-   **Service Now has three ways to determine dependencies between (items in) the CMDB registered stacks**  
    
      
    -   Via Credential-Based discovery, ServiceNow can investigate patterns and dependencies (e.g., this Application Component consumes this DB/API of that Application)
      
    -   Via Federation ServiceNow can retrieve (from misc. Data Sources) the dependencies (e.g., according to APM, this Application has an interface with that Application)
      
    -   Authorized Users can manually register the known dependencies of the CI’s
      
    
      
    
  
-   **ServiceNow Automation can (if the enterprise has appropriate licenses procured)**  
    
      
    -   Provide Fine-granular insight on what is (not) running/installed/configured on those IP Devices that have Agent Client Collector installed on them
      
    -   Provide ServiceDesk Remote Access to IP Devices that have Agent Client Collector installed on them
      
    -   Install/remove Software or modify software settings/policies on IP devices with Agent Client Collector installed.
      
    -   Directly receive configured Events/Alarms from IP Devices that have Agent Client Collector installed on them.
      
    -   Install/remove Cloud Services/Resources using ServiceNow Integration Hub (e.g., for Cloud Optimization)
      
    -   Install/remove IAM Services/Resources using ServiceNow Integration Hub (directly in AD/Entra or via SailPoint/Saviynt)
      
    -   Trigger AI Agents and Scripts, directly or via ServiceNow Mid-Servers
      
    
      
    
  

  
FYI: ServiceNow also has (attributes/relations of) Portfolio Items (baselines) in ServiceNow:  

  
-   Business Applications & Business Capabilities are maintained using the APM (part of SPM) module in ServiceNow or are maintained in another authorized data source (LeanIx, Apptio, etc.).
  
-   Services, Service Offerings, and their commitments/entitlements are maintained using the DPM Module in ServiceNow.
  
-   SDLC Components are maintained in the DevOps Module, using Agile/SAFe practices
  
-   Orderable Product Catalog Items are maintained using Service Catalog Management (part of ITSM)
  
-   Asset/CI Models & Licenses are maintained in ServiceNow using Software/Hardware Asset Mngt or are provided as part of the discovered/federated CI Info.
  
-   Integrated Risk Management, Business Continuity Management, and Security Operations each have/manage their baseline artifacts, which are often linked to instances in the CMDB.
  
-   Foundational Master Data (e.g., Companies, BU’s, Departments, Countries, Areas/Provinces, Languages, Currencies, Locations, Groups, Users, Roles, etc.) can be maintained in ServiceNow,  
    However, they are often retrieved by ServiceNow from other authorized data sources (e.g., Workday, HCM, SuccessFactors, AD, Saviynt, SailPoint, ISO 3166, IANA, etc.)
  

  
*The remainder of this article is focused on the registration and maintenance of instance CI’s in CMDB via ITOM/ITSM.*  

### **Considerations**:

  

  
-   The CMDB content is becoming fine-grained and must be kept up to date on a near-real-time basis.
  
-   Public Cloud Platforms, Network/Element Managers, SDWAN-, AI-, and CDAAS tools can now provide CMDB Information to ServiceNow, often using out-of-the-box integrations/connectors.
  
-   Some Platforms have their own Data Sources (e.g., Copado, SAP CALM, SAP CHARM, GITLAB, SolarWinds, etc.) that can provide CMDB info to ServiceNow, often using out-of-the-box integrations/connectors.
  
-   Increasingly, enterprises are choosing a Zero-touch CMDB that eliminates the need for Manual Maintenance of any CMDB content, except for Application/Service Portfolio Baselines.
  
-   Some enterprises permit the manual maintenance of CI’s/Assets of certain types/classes (for which there is no suitable source) in the CMDB. E.g., Cars, Bicycles, Facilities, Keys, Racks, Cages.
  
-   ServiceNow can not discover what it cannot “see” or what does not contact ServiceNow (e.g., via ACC or API).
  
-   ServiceNow Mid-Servers can extend visibility of ServiceNow to what is connected to on-premises or third-party IP networks.
  
-   In highly complex/segregated/secure IP networks, a large number of Mid-Servers or Agent Client Collectors are typically required.
  
-   Enterprise owned End-User Devices increasingly are used off-premises (e.g., by home workers), and not always connected to the Enterprise e.g., via a VPN.
  
-   “Bring Your Own” Device/License impacts the traditional way of working/registration.
  
-   Some enterprises (e.g., National Defense) use a locally installed ServiceNow instance, which has its specific challenges and limitations.
  
-   Suppose you also want to enable Risk/Compliance Management, Application Portfolio Management, Vendor Management, or Asset Management. In that case, you need additional data in CMDB beyond what is necessary for IT Service Management.
  

  

### **Guiding Principles:**

  

  
-   Stick to the definitions/relations in/of the ServiceNow Common Service Data Model. Use Out of the Box (OOTB) integrations with ServiceNow as much as possible.  
    Customize only when/where it is justifiable and the long-term impact is well considered.
  
-   Only perform manual maintenance of CMDB content when automation is not a viable option, and when you can ensure that proper maintenance and periodic data reviews (certification) of that CMDB data are appropriately done.
  
-   Suppose you have one or more items/assets in CMDB that are maintained manually. In that case, external auditors will insist on documentation/implementation/training/maintenance/governance of processes and conduct Continual Data Quality Improvement activities for these items.
  
-   When going for a Zero-touch CMDB containing (relations of) CI instances, enterprises need to maintain the required CMDB technical Integrations and manually maintain the portfolio baselines using Digital Portfolio Management fulfilled by portfolio/service owners.
  

  
**When to install/use an Agent Client Collector (ACC) on a Windows/Linux/MacOS Computer?**  

  
-   When the Enterprise cannot easily make IP Devices visible to ServiceNow (e.g., because the IP Devices are behind multiple firewalls that may not be opened)
  
-   When the Enterprise wants to have insight into the actual usage of software/resources on the IP Devices (i.e., for Software Asset Mngt)
  
-   When Enterprises want to monitor/manage IP Devices such as PC’s/VDIs, using Agent Client Collector (for Helpdesk/SecOps)
  
-   When the Enterprise does not have/use tools such as JAMF/INTUNE/SCCM that can federate PC info to ServiceNow
  
-   When the Enterprise requires information provided by ACC that is not available through JAMF/INTUNE/SCCM.
  

  
*FYI: For ServiceNow licensing, it does not matter how the CI comes into the CMDB; the use of ACC is included in the ITOM license price.*  

### **When to use a ServiceNow Mid-Server?**

  

  
-   When the enterprise wants to perform ServiceNow discovery of IP devices located behind a firewall, on which no Agent Client Collector is installed.
  
-   When the enterprise wants to manage/access of (what is in/on) IP Devices that are located behind a firewall (with or without Agent Client Collector)
  
-   When the enterprise wants ServiceNow to Access API’s that are not directly accessible from the Public Internet (e.g., for OCI API)
  
-   When the enterprise segregates a portion of the IP network, ServiceNow or its other Mid-Servers cannot see what is connected in that network.
  

  
*FYI1: Although the Mid-server software does not require a paid ServiceNow license, there will be costs associated for OS licensing, IAM, and maintenance for the VMs on which the software is installed*

*FYI2 A Mid-Server has capacity/performance limitations. It is also not recommended to mix production and non-production traffic on the same Mid-Server. Hence, you will likely need multiple Mid-servers*  

### **Use of Credentials for Discovery and Automation**

  
If Credential-based discovery is selected as a means to populate/update CMDB content and/or install/remove software/settings, ServiceNow needs credentials to do so:  

  
-   ServiceNow can be configured to use a (limited number of) generic account/password combination that is stored locally in ServiceNow (simple to set up/maintain, but often not preferred by SecOps)
  
-   ServiceNow can be configured to use credentials that are stored/maintained in CyberArk that will not be stored in ServiceNow (requires integration with CyberArk, but often preferred by SecOps)
  

  
*Note: it is assumed the account credentials are pre-provisioned (e.g., part of the image) on the IP Devices that are to be discovered using credential-based discovery  
The credential-based discovery account requires read-only access to the inventories on the devices.*  

### **Bring Your Own (BYO) Devices**

  

  
-   BYO devices are owned by a party other than the enterprise itself. Do they belong in your CMDB?
  
-   Software installed on BYO devices may be owned/paid for by the other party, rather than the enterprise.
  
-   If you want to register the BYO Device in your CMDB (e.g., for SecOps or Support), tag the Device as BYO.
  
-   Apply BYO rules to (what is in/on) BYO tagged devices.
  

  

### **SAAS/PAAS Solutions**

  

  
-   Configuration Items are often provided (as a unit or bundle) “as a Service” by an internal/external Managed Service Provider. The baselines (i.e., models) are not registered in CMDB.  
    The instances of the provided Services can be registered as “Service Instances” and can be related to the CIs that they depend on.
  
-   For most 3rd Party SAAS Services (that are offered as a managed black box), the CIs are unknown and will not be registered in CMDB.  
    The SAAS Services/Offerings (baselines) are defined in/via Digital Portfolio Mngt. If multiple instances of the SAAS are provided, these may be registered as “Service Instances.”
  
-   Most popular SAAS providers (e.g., Microsoft, SAP, Salesforce, Google, Asana, etc) provide API’s via which enterprises can see which users/roles consume which licenses/services.
  
-   Some SAAS providers offer APIs that allow users to request or retire licenses, services, or roles.
  

  

### **Tagging and Mapping:**

  

  
-   Modern Configuration Items can be tagged. Different Keys are used for different purposes. The tags are provided to ServiceNow as part of the CI  
    
      
    -   Some enterprises use the CI environment as a tag (e.g., Development, Test, Production).
      
    -   CIs that shall be (directly) related to the Offerings under which they fall are to be tagged with the Unique ID of the Offering.  
        The tag will then be used to create a “Offering depends on Cloud Service Account” Relation/Mapping (i.e., tag-based mapping)
      
    
      
    
  
-   Grouping of CIs that are not tagged, that may be mapped to offerings.  
    
      
    -   Groups of CIs can be defined, and their members can be manually mapped to these groups (e.g., D, T, A, and P Environments of the same App).
      
    -   CIs of a similar class/type can automatically be mapped to the group based on a query (e.g., “All Windows 10 PCs of users based in Amsterdam”)
      
    
      
    
  

  

### **When to discover/federate the CMDB data?**

  
In an ideal world, the CMDB content is updated on a near-real-time basis. Unfortunately, the technology is not ideal yet. Currently, it is recommended to  

  
-   Retrieve the changes to (attributes/relations) of all the federated CIs daily (aka “Delta Loads”), preferably out-of-office hours.
  
-   Retrieve all (attributes/relations) of the active federated CIs every week (aka “Full Loads), which fully resyncs the target (the CMDB).
  
-   Run each discovery job daily. E.g., Sweep the entire IP Network once per day.
  
-   Spread the different Jobs over the day to minimize load on ServiceNow instances/mid-servers.
  
-   Run real-time ad-hoc discoveries, if needed (for a config item with Agent Client Connector installed on it)
  
-   If possible, update the CMDB content in real-time, for example, when the source pushes its data into the CMDB.
  

  

### **How to manage CMDB Health?**

  

  
-   Track/review quantitative trends, using Performance Analytics or BI Tooling. E.g.,  
    
      
    -   Total Number of active Items per class, per source at the end of the previous period
      
    -   Number of items per class, per source that have been created in the previous period
      
    -   Number of items per class, per source that have been updated during the previous period
      
    -   Number of items per class, per source that have been retired in the previous period
      
    
      
    
  
-   Define what is good and monitor (and report on it), e.g.,  
    
      
    -   Percentage of Computers with Software installed on them (should be 100%, except for BYO/unmanaged devices)
      
    -   Percentage of Active CIs that have been updated/provided in the past 90 days (should be 100%)
      
    -   Percentage of VMs virtualizing a Server (should be more than 90%)
      
    -   Percentage of CI’s (e.g., PCs, Phones) that should be assigned to an active person, and are assigned to an active person (should be more than 90%)
      
    -   Percentage of physical CIs on a known location (should be 100%)
      
    -   Etc.
      
    
      
    
  
-   Report Monthly on (trend of) CI/Relation Coverage, Completeness, Accuracy, Staleness, and (optionally) Compliance Percentages
  
-   Govern the technical integrations (period review of data and plans with the owners of each integrated data source)
  
-   Have the CI/Relations that are manually maintained, certified by their CI/Service owner.
  
-   Conduct Data Quality Improvement project if/where needed.
  
-   Track which items were created by event Management tools (why didn't they come in via the normal route?)
  

  

### **Recommended Scenarios for a typical large enterprise:**

  
Large enterprises are recommended to apply the following:  

  
-   **PERSONAL COMPUTING:**
  

  

  
-     
    
      
    -   Federate Personal Devices (incl. what is installed in/on it) from JAMF and/or Intune (if those are used)
      
    -   Install Agent Client Collectors on Personal Computers if necessary, for example, to enhance data from Intune/JAMF and enable remote PC management.
      
    -   Federate Personal Device/Support Info from the global providers of these Devices (e.g., Dell, Lenovo, etc.), using the providers' OOTB API’s
      
    -   Determine Country/technology-specific policy for management of (what is in/on) BYO Devices (different countries è different legislations & workers councils)
      
    
      
    
  

  

  
-   **OFFICE COMPUTING**
  

  

  
-     
    
      
    -   Federate Office Printer (Service) info from the vendors of these printers (services).
      
    -   Federate Facility Assets from Facility Asset Management Tools (CCTV, Elevators, OT devices, LED TVs, etc.)
      
    -   Discover relevant OT Devices (e.g., PLCs) that are managed via IP Controllers, using SNMP or Custom Patterns.
      
    -   Federate Building Access Mngt Data from BAM Tools (i.e., biometric readers, gates/doors)
      
    
      
    
  

  

  
-   **CLOUD ARTEFACTS:**
  

  

  
-     
    
      
    -   Federate Cloud Artefacts from AWS, AZURE, GCP into CMDB using Out of the Box Service Graph Connectors
      
    -   Federate Cloud Artefacts from OCI using Out of the Box Plugins. Discover the Linux/Windows servers using credential-based discovery or Agent Client Collectors.
      
    -   If needed: Discover what is in Cloud Containers and inter-dependencies using ServiceNow Discovery.
      
    
      
    
  

  

  
-   **ON-PREMISE EQUIPMENT (Not being Personal Computing)**
  

  

  
-     
    
      
    -   Deploy (separated production and non-production) Mid-Servers in the Enterprise IP Network
      
    -   If allowed by Security: Discover which devices are connected to relevant IP Ranges of the Enterprise, using credential-less discovery.
      
    -   If security does not allow IP Sweeps: Have Agent Client Collectors installed on Windows/Linux servers, and/or federate data from authorized sources (e.g., SolarWinds, PRTG, SCCM)
      
    
      
    
  

  

  
-   **NETWORK COMPUTING**
  

  

  
-     
    
      
    -   If discovery is allowed by Security: Discover which routers/switches are connected to relevant IP Ranges of the Enterprise, using credential-less discovery.
      
    -   If discovery is not allowed by Security: Federate Network Device Data from an authoritative data source (e.g. Network Manager, Element Manager)
      
    -   Federate Network configuration data such as Network Segments, Firewall Rules, IP ranges, VPN’s, and Certificates from authoritative data sources.
      
    
      
    
  

  

  
-   **SAAS/PAAS SOLUTIONS**
  

  

  
-     
    
      
    -   SAAS/PAAS Services (baselines) procured from a 3rd party must be manually registered as Services/Offerings. Its instances/tenants (CI’s) may be registered as Service Instances either manually or via discovery.
      
    -   If the enterprise wants to visualize and manage the SAAS licenses/services/roles via ServiceNow, integration with relevant SAAS/PAAS providers (e.g. Microsoft, SAP, Salesforce, Google) is recommended.
      
    
      
    
  

  

### **Closing notes:**

  

  
-   For some enterprises, variations on the recommendations above may be needed/preferred.
  
-   Not all data sources have the same capabilities; the devil is in the details.
  
-   ServiceNow is great, but not perfect; some customizations are simply making it better :-)
  
-   Bring in a CMDB/CSDM specialist to advise on the best setup/roadmap for the needs/capabilities of your enterprise.
