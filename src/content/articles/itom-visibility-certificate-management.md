---
title: "ITOM, Certificate Management"
date: 2026-01-13
categories: ["CSDM/CMDB/TBM"]
excerpt: "As part of the ServiceNow ITOM Discovery product, ServiceNow provides a comprehensive Certificate Management capability. This functionality is designed to give organizations visibility, control, and automation across the full certificate lifecycle, while keeping the CMDB accurate and up to date."
image: "/wp-content/uploads/2026/01/ITOM-certificate-management.png"
readingTime: 2
---

As part of the **ServiceNow ITOM Discovery** product, ServiceNow provides a comprehensive **Certificate Management** capability. This functionality is designed to give organizations visibility, control, and automation across the full certificate lifecycle, while keeping the CMDB accurate and up to date.

### Core Capabilities

ServiceNow Certificate Management supports the following key functions:

-   **Discovery and federation of certificates**, registering them as Configuration Items (CIs) in the CMDB, including references to where certificates are deployed
-   **Expiration monitoring**, with detection of upcoming certificate expiry and automatic assignment and tracking of renewal tasks, including email notifications
-   **Catalog-based request management**, enabling users to request, approve, renew, or revoke certificates through standardized workflows
-   **Automated certificate renewal**, using workflow-driven automation where supported
-   **Event generation** (when ITOM Health is licensed), creating events if certificate-related issues or failures are detected

Through ITOM Visibility, certificates are automatically populated and continuously updated in the CMDB, supporting a *zero-touch* data management approach.

### Certificate Detection Methods

Certificate discovery can be performed using one or more of the following methods:

#### 1\. TCP Port Scanning

Certificates are detected by scanning the TCP ports on which they are exposed. This approach requires:

-   Discoverable TCP ports
-   MID Servers in place
-   Firewall access configured accordingly

Port discovery is typically performed after IP-based devices in the network have been discovered.

#### 2\. URL-Based Discovery

Certificates can be detected by querying known URLs that use them. This method is particularly useful for:

-   SaaS applications not discoverable through ITOM Discovery
-   External websites or partner systems that your organization depends on

#### 3\. Federation from Certificate Authorities

Certificates can be federated from one or more Certificate Authorities (such as DigiCert, GoDaddy, Microsoft, Entrust, or Let’s Encrypt). While this method does not reveal where a certificate is deployed, it provides valuable insight into:

-   Which certificates exist
-   Who issued them
-   When they expire

### CMDB Representation and Dashboards

Detected certificates are stored as CIs in the CMDB and include attributes such as provider and expiration date.

ServiceNow ITOM Visibility provides a dedicated **Certificate Management Dashboard**, offering insight into:

-   The total number of certificates in use
-   Certificates expiring within a configurable time window
-   The status and volume of manual renewal tasks
-   Automated workflows triggered for certificate renewal

### Notes and Operational Considerations

-   If IT artefacts are typically provisioned via **CI/CD pipelines, DevOps tooling, or APIs,** it is recommended to align certificate renewal requests with those same channels
-   Nowadays, the issuance of renewed certificates is commonly automated and typically governed by a pre-approved **Standard Change** rather than a **Normal Change.**
