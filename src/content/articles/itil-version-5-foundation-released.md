---
title: "ITIL Version 5 (Foundation) Released!!"
date: 2026-03-01
categories: ["IT4IT","ITIL"]
excerpt: "In February 2026, Peoplecert (formerly known as Axelos). published the long-awaited ITIL Version 5 Foundation. After reading the ITIL Version 5 Glossary and Quick Reference Guide , I became curious about what Version 5 has to offer in today's world"
image: "/wp-content/uploads/2026/03/ITIL_VERSION_5_RELEASED.png"
readingTime: 8
---

In February 2026, Peoplecert (formerly known as Axelos). published the long-awaited ITIL Version 5 Foundation. After reading the ITIL Version 5 Glossary and Quick Reference Guide , I became curious about what Version 5 has to offer in today's world of Cloud Computing, AI, DevOps, SecOps, Observability, and CI/CD Pipelines, as well as Digital Product Mngt.

So, I purchased the course, went through all the training material and took the Mock-up Exam. Clearly, I'm not perfect; I passed with a score of 83%, 33 out of 40 multiple choice questions answered correctly :-) . The course ticked all the boxes for me. The slides for the modules were clear. The recaps were relevant, and the exam questions are aligned with the content. Yes, there are trick questions as per usual; nobody should get a perfect 100% score. One may argue that the ITIL Version 5 framework has its flaws, but there is nothing wrong with **how** the ITIL Version 5 Foundation material was presented: I.e. K**udos to Peoplecert on the HOW!!**

The foundation course is nothing more (and nothing less) then an introduction. If you are looking for details, you need to wait until the practice guides and the ITIL Version 5 practitioner trainings are released (in Q2/2026). The foundation does give you an idea of what is about to come, especially if you are a already an ITIL 4 practitioner/professional.

### FIRST IMPRESSSION

> **Spoiler alert:**  
> ITIL Version 5, IMHO is an update of the ITIL 4 practice, but it is not quite a game-changer, Out of the box It will not align perfectly with modern DevSecOps Observability, Run-time Orchestration and/or AI practices. This will still require customization and mapping. The ITIL Version 5 terminology used, is predominantly in line with what was common in the past, but not quite with what is commonly used today, There are new additions for Environmental, Social & Governance (ESG), AI and Digital Portfolio Mngt (DPM), but those additions lack substance in the Foundation Material.

ITIL Version 5 uses terms such as AI, SecOps, Agile, Sustainability, User Experience, and Digital Portfolio Lifecycle. So, it looked like Peoplecert noticed things have changed since 2019, when ITIL 4 was published first. That said, the documentation recommends using ITIL, along with the frameworks of the DevOps Institute and Prince2, which apparently align well with ITIL Version 5. Since Prince2 which was released for the first time in 1996 (and even Prince2 Agile, that was released for the first time in 2015) are not (or no longer) used on large scale today.

I understand Peoplecert tries to push its own frameworks. However, there is no mention of (co-existence with) the practices/frameworks of others that have also become quite popular in the last decade. I.e. it is highly unlikely that ITIL Version 5 will replace IT4IT 3.0, Togaf 10, ArchiMate 3.2, SAFe 6.0, Scrum, Kanban, Observability, and other DevSecOps practices. Understanding ITIL Version 5 alone, will no longer suffice; modern practitioners need to understand the other frameworks as well.

Just like ITIL 4, ITIL Version 5 Foundation starts with an introduction and then continues with the definition of the four dimensions of Service Management.

1.  **Organization & People**
2.  **Information & Technology**
3.  **Partners & Suppliers**
4.  **Value Streams and Processes**

Then there is a new chapter abut **Digital Products and Service Offerings**. There is resemblance with IT4IT 3.0, but that does not mean it uses the same definitions/words, The story continues with relations, service journeys, and service level metrics. Then, there is section about the ITIL Value System; nothing wrong with it, but -for me- a collection of generic open doors. Same applies to the Governance section that came right after, Although it is commercial consultant lingo, the Guiding principles in Version 5, make a lot more sense than the ones in ITIL 4, i agree they should be used when adopting/governing the practices.

ITIL Version 5 differentiates **8 lifecycle stages for IT**:

1.  **Discover**: explore and prioritize needs and opportunities for the product and service
2.  **Design**: create a product and service solution meeting or exceeding the requirements.
3.  **Acquire**: procure or allocate resources required to build the product.
4.  **Build**: create, configure, and test the technology solutions that constitute the product.
5.  **Transition**: deploy the new product into the live environment.
6.  **Operate** the product to ensure the agreed-upon performance.
7.  **Deliver**: deliver digital services based on the live products.
8.  **Support**: restore normal product operation and service delivery when needed.

The ambition to cover all 8 stages in a single framework is admirable, but it may have been overly ambitious. People who complained about the abstract nature of ITIL Version 4 will likely share similar concerns about ITIL Version 5. E.g., practical guidance for the operationalization of these lifecycle stages is missing in the foundation documentation. I expect some will be described in the extended practice documentation that is planned for later this year,.

**ITIL Version 5 defines 34 practices** and relates them to the 8 lifecycle stages that they support or enable. **They are exactly the same practices as in ITIL 4.**  
In the release notes, Peoplecert explicitly refers to this as "consistency", I rather consider this lack of innovation and insight.  

![](/wp-content/uploads/2026/03/ITIL_Version_5_processes.png)

As you can see in the table. the practices each support/enable multiple life-cycle stages and each life-cycle stage is enabled/supported by at least 10 ITIL Version 5 practices. Each practice is defined in a high-level one-pager in the foundation documentation. Don't expect extensive flows or extensive role/raci descriptions in he Foundation docs.

The list of practices includes practices such as Problem Mngt, which are nowadays are considered obsolete by most DevSecOps adepts. Monitoring and event Mngt are now often seen as being integral part of Observability. Capacity and performance Mngt, overlap with (automated) Orchestration/containerization. Change Enable Mngt is renamed from Change control, but does not describe integration with CI/CD pipelines (which uses a different governance and changes the scope of Change Mngt).

**Since I can, I mapped the ITIL Version 5 practices to the ServiceNow Capabilities t**hat currently (partially) support them: ServiceNow's capabilities do not map 1:1 to the life cycle stages of ITIL Version 5, nor do ITIL Version 5's life cycle stages map 1:1 to ServiceNow's capabilities. Some ITIL practices -such as Availability, Capacity, and Performance Management- are not supported in ServiceNow. Some ServiceNow capabilities -such as Field Service Mngt, are not defined in ITIL. If you hoped ServiceNow and ITIL Version 5 glossary would be reconciled I'm afraid that has not materialized.

Appendix C in the V5 foundation eBook lists the **roles for the practices**. In V5 only the managerial/owner roles are described. So, either ITIL Version 5 is assuming that going forward all work will be done by AI agents, or it misses the fulfiller roles (and its RACI) that fulfill the practices..

**The ITIL Version 5 Quick Reference Guide (29 pages) and Glossary provide a good overview of what ITIL Version 5 is, which is very useful if you are new to ITIL.**

### **IN CONCLUSION:**

-   The new version is not dramatically different from its predecessor, but it probably aligns a little bit better with modern ways of working.
-   The foundation material is rather abstract; i guess we will not know if -underneath the hood- the ITIL Version 5 practices have been innovated
-   There is a risk that ITIL Version 5 remains just as vague as its predecessor, and that success will be determined by the creativity and insights of its practitioners.
-   That said, Peoplecert's recommendation to use Prince 2 (waterfall) alongside ITIL Version 5 sounds like going back 10 years in time.
-   The ITIL Version 5 Foundation training course is really good if you want to understand the foundation of ITIL Version 5.

Considering all of the above, most enterprises will likely want to integrate the updates of ITIL into their existing IT Management frameworks , which also includes DevSecOps, SAFe, AI, and IT4IT practices,. I recommend those who use ServiceNow, to use/adopt the well-documented process guides/roles and glossary of ServiceNow because Process and Technology are then aligned out-of-the-box and integration with other IT4IT Platforms is seamless.

### 

For practice promotion, adoption, continual improvement, and governance I recommend to use the ITIL Version 5 guidance.

![](/wp-content/uploads/2026/03/Screenshot-2026-04-06-at-20.42.10.png)

### On April 6th 2026, I took the ITIL Version 5 exam.

This was my first online exam with PeopleCert, and it was memorable. I had to position my webcam so the proctor (Watchdog) could see that no one entered my room to assist me during the exam. I had to disconnect all my monitors and remove my headset. My 2 monitors had to be disconnected and covered with towels. I had to show my passport and show the proctor a 360-degree view of my room, including what was behind my monitors. Then I had to open Task Manager, and only the exam browser window could be open, with AI turned off. Then i had to show my desk that there was no book, phone or other material. So, if you want to cheat, this is not the online exam you should try to do.  
  
Anyway, 35 minutes after the start, I finished the exam. with a score of 83%.  
So I'm now certified and entitled to have an opinion about ITIL Version 5.
