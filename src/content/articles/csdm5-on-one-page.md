---
title: "CSDM5 On One Page"
date: 2025-12-09
categories: ["Uncategorized"]
excerpt: "Not everybody has time to read a long white paper or go through endless PowerPoint slides. This article provides a knowledge article that describes the key artefacts and explains how to classify and govern them in compliance with CSDM5. A"
image: "/wp-content/uploads/2025/12/Simplified-CSDM5-Concept.png"
readingTime: 4
---

Not everybody has time to read a long white paper or go through endless PowerPoint slides. This article provides a knowledge article that describes the key artefacts and explains how to classify and govern them in compliance with CSDM5.

### **STRATEGIC PORTFOLIO & ARCHITECTURE**

A Business Capability (e.g., "Contract Management") is a strategic function realized by the governing portfolio asset(s): the **Business Application(s)**. A Business Application is the conceptual system that interfaces with other Business Applications and has a lifecycle and ratings that the Application Owner manages. An Application may **consist of versioned Application Components or Modules** that can be deployed separately.

**Installed PC/Mobile packages (**including Operating Systems (OS), device drivers, policies, and browser extensions) **are not Business Applications**. These are modelled as deployed products of a known versioned product model, forming an integral part of the end-user's functionality provided as a service. The installed PC/Phone products are exempted from formal Change Mngt, ratings, BC/DR and other practices that apply for Business Applications.

**Hosted IT4IT solutions** are recorded as **Technical Applications** that provide **Technical Capabilities**. It is recommended to govern these Technical Applications and their components the same way as business applications and their components (e.g., IAM, CIA, EA, CHG, etc). That said, Business Service Offerings may not be related to Instances of Technical Applications, and business users or external customers may not subscribe to the Technical Service Offerings.

### **DELIVERY & OPERATIONALIZATION**

A **Business/Technical** **Application** may be deployed multiple times, **creating unique Service Instances** (specific running environments, like "UBW \[PR\]"). These Service Instances may depend on Underpinning technologies, which are not Business Applications; the Technology Items are modelled as installed products of a versioned product model (e.g., SQL Server 2022 SP1).

**Services** are packaged and consumed via **Offerings**, which have an owner, provider, commitments, entitlements, and subscriptions:

-   A **Business Service Offering** packages the final outcome for the **business user/customer** and **depends on** zero or more Service Instances of Business Applications.
-   A **Technology Management Service Offering** packages an internal IT component (like "Linux Server", "SQL Server Database", "WildFly Server", "IIS Website", or “Storage Component”) and contains one or more Service Instances or one or more **dynamic groups of CIs** that deliver the offering.

### **GOVERNANCE & DEPENDENCIES**

The operational portfolio items can rely on the **Underpinning Technology**, which consists of **interrelated Configuration Items (CIs)** (such as deployed servers, databases, networks, and storage) that are typically **discovered or federated** into the CMDB.

A fundamental principle of CSDM is that every single CI must be governed/owned: **each CI is contained** (**directly or indirectly, e.g., via a CI Grouping**) by **one Technology Management Service Offering** to ensure clear accountability and defined support for every managed technical component.

SAAS instances are black boxes that include the Underpinning Technology of/for the SAAS vendor. I.e., in CSDM, they are not related to underpinning Technology.

## **CLASSIFICATION OF DIGITAL PRODUCTS**

Digital products are classified based on the consumer and function:

<table class="x_MsoNormalTable" border="1" width="100%" cellspacing="3" cellpadding="4"><tbody><tr><td width="386"><p class="x_MsoNormal"><b><i>Product Condition</i></b><i></i></p></td><td width="413"><p class="x_MsoNormal"><b><i>CSDM Classification</i></b><i></i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>IF</i></b><i> the Product is a PC or Phone or is installed in/on one.</i></p></td><td width="413"><p class="x_MsoNormal"><i>End-User Package contains Products of a particular Product Model of a particular manufacturer</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product is a part/module contained by a Business or Technical Application.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Application Component, often deployed via CI/CD pipeline</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product is a Product for Business Users.</i></p></td><td width="413"><p class="x_MsoNormal"><i>An instance of a Business Application or an Instance of a Business Service.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product is a business-facing Service.</i></p></td><td width="413"><p class="x_MsoNormal"><i>Business Service/Offering that depends on one or more Service Instances.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product is a Technical Service</i></p></td><td width="413"><p class="x_MsoNormal"><i>Technical Service/Offering.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product underpins a Business/Technical Application.</i></p></td><td width="413"><p class="x_MsoNormal"><i>An instance (of a Product Model) that a Technology Management Service/Offering contains.</i></p></td></tr><tr><td width="386"><p class="x_MsoNormal"><b><i>ELSE IF</i></b><i> the Product is a Product for Technical Users (e.g., a technical tool such as Intune, or SCVMM)</i></p></td><td width="413"><p class="x_MsoNormal"><i>An instance of a Technical Application that a Technology Management Service/Offering contains.</i></p></td></tr></tbody></table>

*Note: The ownership of the underlying technology lies with the owner who offers the underpinning infrastructure as a Service. E.g., Hyper-V hosts and Network are provided by Infra, not by the owner of the business application that depends on it.*
