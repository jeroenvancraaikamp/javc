---
title: "Rethinking IT Foundations: From SaaS to Services, Products, and Beyond"
date: 2025-08-16
categories: ["IT4ESM","IT4IT","ServiceNow","TBM/CSDM/CMDB"]
excerpt: "For years, we’ve relied on concepts like SaaS, PaaS, IaaS, and DCaaS to describe how technology is delivered. These terms still exist, but they no longer fully capture today’s reality. Why? As platforms become software-defined, AI prompts are replacing software"
image: "/wp-content/uploads/2025/08/NextGen_IT_Artefacts-scaled.png"
readingTime: 7
---

For years, we’ve relied on concepts like **SaaS, PaaS, IaaS, and DCaaS** to describe how technology is delivered. These terms still exist, but they no longer fully capture today’s reality.

Why? As **platforms become software-defined, AI prompts are replacing software code**, **and information is scattered across multiple repositories**, each serving the different needs of different types of stakeholders. To manage this complexity, we need a sharper lens and a common language, for the things we share.

* * *

### Baselines vs. Instances: Two Different Worlds

In modern IT, it’s essential to distinguish between **deployable items (baselines)** and **deployed items (instances):**

-   **Baselines**: where strategy, lifecycle, and roadmap decisions are made.
    
-   **Instances**: live detectable copies of baselines that inherit properties from their baseline and their tags.
    

One baseline can have many instances, but an instance always belongs to exactly one baseline.

* * *

### Products are not Services

Too often, we treat **Products** and **Services** as interchangeable. They’re not.

-   **Products** are owned by a *Product Owner* and consist of a collection of documented **Components**: software, scripts, AI prompts, APIs, plugins, configurations, and more. Products are defined, developed, and innovated by (teams of) an internal organisation or by a vendor/manufacturer. To keep things well organized, Products - by definition - are not consumed.
    
-   **Services** are owned by a *Service Owner* and delivered/supported by (teams of) a Service Provider. One defines commitments, entitlements, and subscriptions on a Service, not on a Product. Services are consumed by those who are entitled/subscribed to that Service.
    

The management lens differs: Products evolve through **major versioning**, while product components evolve continuously; their **minor versions** are tracked in DevSecOps pipelines, and their instances are fed into the CMDB as configuration items. Services are **not versioned** throughout their whole lifecycle.

Companies maintain both Service portfolios and Product portfolios. The Service Portfolios include the services that are provided (internally or externally) to the company. The product portfolios consist of digital products that may be deployed in/on the company's infrastructure, as well as products that comprise the company's infrastructure and the tools that are used to manage it. Define/use separate Product Portfolios for each Technology Tower and/or for each (owning) Business Domain. For Products developed in-house, utilize technology- or platform-specific component repositories that are integrated with the company's deployment/provisioning pipelines.

* * *

### Configuration Items: The Operational Layer

Configuration Items (CIs) are instances of baselines. Usually, CIs are detectable instances of components, although instances of Services, Offerings, and Products may be considered CIs as well. The technical characteristics and dependencies of CIs are generally technically detectable. The CIs inherit the attributes - especially their managed attribute values - from their baseline. E.g., suppose the owner of a product baseline is updated. In that case, all of the instances of (the components of) that product automatically should change, without having to raise a Change or having to re-deploy the CI.

CIs may be tagged. A **tag** provides a value for a particular **key** for a specific CI. For example, the "Environment" key for this CI has the value "Production", and the "GitLabID" key for that CI has the value "e83c5163316f89bfbde7d9ab23ca2e25604af290". Tags should not hold attribute values that are managed/authorized via formal processes (e.g., CIA rating, Ownership, Business Criticality, etc). Tags are deployed together with the CI that is being tagged, and are deemed an integral part of the CI. Updating a tag of a CI is regarded as an update of the CI itself. i.e., via redeployment of the (tag of the) CI.. Tags may be inherited; for example, if a cloud resource group instance is tagged, its tags apply to all fine-granular cloud resource instances in that group, without needing to tag each cloud resource instance separately.

* * *

### Assets: The Financial Layer

Then there are **Assets**—unique devices or licenses with a monetary value, often tied to a user, cost center, company, region, or location. Unlike products or services, assets exist primarily for **tracking, compliance, and financial accountability (CAPEX/OPEX).**

**Asset Models aren’t Product baselines**; they’re fixed representations of what the enterprise owns/uses. E.g., "Microsoft Visio 2011 Professional" is an Asset Model, of which a company may deploy thousands of licensed instances. Registering each of those as a separate service instance is neither practical nor desirable. Instead, these are registered as software instances. Not only the software instance, but also its model is automatically detected. The same applies to hardware: both the hardware instances and their models are automatically detected.

Assets may be externally procured individually (e.g., per item) or in bulk (e.g., per pallet). Assets are of a type/model and are typically related to individual users and/or locations. Some companies register which assets were part of which delivery note, to be able to account in detail for the whereabouts of investments. Not everything that is procured is to be registered as an asset. E.g., consumables or items with little Euro value are not registered, especially if their whereabouts/status are not being tracked.

* * *

### Services and Service Offerings

A **Service** is a black box when the provider owns the products or assets that are consumed. When the consuming company owns them, the service is more of a **management activity** of the service provider**.** Either way, ownership and accountability for the services, as well as the supported product/assets, matter.

To differentiate within Services, we use **Service Offerings**: variations of a service with specific commitments. For example, production vs. non-production environments may be separate offerings. Both Services and Service Offerings are baselines, and they are (directly or indirectly) related to the Instances for which they provide coverage/support. It is considered good practice to tag CIs with the Offering under which they (and their children) are covered.

* * *

### Service Instances

Finally, **Service Instances** are the endpoints for products that are instantiated multiple times, e.g., one instance of the same product per geographic area or organisation, or one for each, respectively, Development, Test, Acceptance, and Production instance..

Examples:

-   A Workday SAAS Product is split into Development, Testing, and Production Service instances.
    
-   An Azure tenant or an OCI compartment is a Service instance of a larger Public Cloud Product.
    
-   The URL of a Portal or an API is a Service Instance (of a Product) that one or more Service Offerings may use.
    

Typically, **Service Instances** **are** **defined** **starting points for discovery** **and operational monitoring,** and are the demarcation points of Service/Offerings.

* * *

### Putting It All Together

Enterprises today need to rethink their IT structures across **baselines and instances**. In practice, that means different governance layers, tools, and responsibilities:

-   **Product Baselines** → Governed in Portfolio Management tools
    
-   **Component Baselines** → Governed in DevSecOps / SCM tooling
    
-   **Service Baselines** → Governed in Service Portfolio Management
    
-   **Service Offering Baselines** → Governed in Service Portfolio Management
    
-   **Service Instances** → Governed in IT Operations Management
    
-   **Asset Instances** → Governed in IT Asset Management
    
-   **CI Instances** → Automatically detected, registered in the CMDB
    
-   **CI Tags** → Deployed with the CI, providing non-technical info for (users of) CMDB.
    

* * *

### Closing Thoughts

The old labels—SaaS, PaaS, IaaS—are still useful shorthand, but they no longer describe the reality of software-defined, AI-driven, service-integrated enterprises. **We should no longer focus on the definition of the type of what is delivered as a Service, but rather be mindful that each Product is (to be) offered as a Service, either individually or as an integral part of a larger stack of Services.**

The future belongs to those who understand the distinction between Baselines and Instances, for resp. Products, Components, Assets, Services, and Offerings —and who can govern each with the right people, process, and tools. It should not matter what type of Product, Component, Asset, or Service is concerned, as long as each artifact-type is managed/governed similarly (minor type-specific variations are acceptable). **Ideally, baselines should be defined/registered/maintained by People, and instances should be deployed/detected/registered by Technology.**
