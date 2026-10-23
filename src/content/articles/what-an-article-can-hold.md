---
title: 'What an Article Can Hold: a Feature Tour'
date: 2026-10-20
categories:
  - IT4IT
excerpt: 'A demo article showing every type of content this new site supports: images, galleries, video, PDFs, tables, code, quotes and downloads'
image: https://picsum.photos/id/690/1920/1280.webp
readingTime: 4
popular: true
draft: false
---

This article is a **demo** for the prototype. It shows every kind of content one article can hold. Each article is a single Markdown file: you write plain text, and add richer blocks where you need them.

## Text and formatting

Regular paragraphs, **bold**, *italic*, [links](/articles/), and lists:

- Bullet lists for quick overviews
- Numbered lists for steps
- Nested lists when needed
  1. Plan
  2. Build
  3. Run

> "It is highly unlikely a company will buy/use all 1136 tools. However, it is not unlikely a company will use, and try to integrate, a hundred of them."

## Images and diagrams

<figure>
  <img src="/images/demo-diagram.svg" alt="IT4IT value streams diagram" />
  <figcaption>A diagram (SVG) stays sharp at any size.</figcaption>
</figure>

### Gallery

<div class="gallery">
  <img src="/images/ai-part-3-de-chatbot-op-champagne360.svg" alt="" />
  <img src="/images/the-ultimate-list-of-1000-it-management-tools-2026.svg" alt="" />
  <img src="/images/csdm_from_business_need_to_technology_delivery.svg" alt="" />
</div>

## Video

Self-hosted video:

<video controls preload="metadata" src="/media/sample-video.mp4"></video>

YouTube and Vimeo videos can be embedded the same way with their embed code.

## PDF document

<object class="pdf" data="/files/it4it-value-streams-sample.pdf" type="application/pdf">
  <p>Your browser can't show the PDF inline. <a href="/files/it4it-value-streams-sample.pdf">Download it instead</a>.</p>
</object>

<a class="download" href="/files/it4it-value-streams-sample.pdf" download>⬇ Download: IT4IT Value Streams (PDF, 2 KB)</a>

## Tables

| Value stream | Purpose | Example tools |
|---|---|---|
| Strategy to Portfolio | Plan and prioritise the IT portfolio | LeanIX, Planview, ServiceNow SPM |
| Requirement to Deploy | Build and deliver products | Jira, GitHub, GitLab |
| Request to Fulfill | Catalogue, order and fulfil services | ServiceNow, Ivanti, TOPdesk |
| Detect to Correct | Monitor, detect and resolve | Dynatrace, Splunk, PagerDuty |

## Code (for ServiceNow Scripts and similar)

```javascript
// ServiceNow background script: count active incidents per priority
var ga = new GlideAggregate('incident');
ga.addQuery('active', true);
ga.addAggregate('COUNT');
ga.groupBy('priority');
ga.query();
while (ga.next()) {
  gs.info(ga.getDisplayValue('priority') + ': ' + ga.getAggregate('COUNT'));
}
```

## Callout boxes

<div class="callout">💡 <strong>Tip:</strong> callouts highlight a key point, a warning or a summary.</div>

## Collapsible sections

<details>
  <summary>Click to expand: long tool list</summary>
  <p>Long lists, like the 1,000+ tools, can be folded away so the article stays readable.</p>
</details>
