---
title: AI Scraping, a threat or a joy?
date: 2026-11-28
categories:
  - AI4IT
excerpt: 'As part of the AI journey, I activated Chinese Mandarin as a supported language on my website. All pages and articles automatically got translated without me speaking a single word of Chinese.  After a while, I noticed a significant increase in web traffic (thousands of hits per day), and 30-40% of that traffic came from Singapore and China. Traffic from the USA also increased drastically. Once I noticed these new "visitors" were predominantly AI agents scraping my articles and the IT4IT Atlas content, I asked myself: is this good or bad? The answer is not digital...'
image: /Unmasking AI crawlers behind a traffic spike.png
readingTime: null
popular: false
draft: false
lang: en
linkedin: ''
---

If you follow my blog, you will know that this year I embarked on an AI journey and am gaining experience and knowledge about the do's and don'ts of AI. I have noticed I'm not the only one playing with AI. The concerns we hear on the news about AI should be taken seriously, as I have noticed myself.

Two months after converting my WordPress/PHP websites into AI-native sites that use agents and Chatbots, I noticed web traffic increased drastically. Adding multi-language support definitely impacted visitor numbers, especially when I added support for Chinese Mandarin (aka simplified Chinese). At first, I got really excited about the extra attention because I knew the market for what I have to offer is much bigger than the Netherlands. Then I added analytics to see where the extra visitors came from, what they were doing/reading, and how long they stayed on each page. 

When I analyzed the web traffic, I saw that these visitors were either reading very quickly or something else was happening. When I saw what my new "friends" from China were asking my chatbots, I concluded they weren't humans; they were web crawlers, reading page after page, article after article, not skipping a single article/it4i4 product on my website and trying to break into the secured content that I have.

In all fairness, the content of the IT4IT Atlas and Champagne360.nl is also gathered from the internet using AI agents. However, I have instructed our agents to stick to the rules and laws that apply. E.g., if a website's robots.txt tells our agents they aren't welcome on certain pages, my agents don't read, translate, or summarize content from those pages.

If my agents aren't welcome on your pages, those pages and the products on them will not be included in the repositories I share with the rest of the world. I.e., you could have a great product, but sites like mine won't know about it because, for AI Agents, you don't exist.

On my own websites, I have configured robots.txt to limit what visiting bots can do/read if they use the authorized channels. Clearly, that protection isn't enough. The Chinese AI agents prove to come in via normal web browsers and look like humans, even circumventing robot checks. The only way I can tell they aren't human is that they read everything, do it really fast, and ask my chatbots suspicious questions.

I came to the following list of options that I could choose from:

- Accept that AI agents from others, especially those from CN, RU, VN, SG, are not as decent as my own Agents and let them crawl the content that is publicly visible to human visitors. Maybe I shouldn't make all data available to everyone? That said, putting sensitive data behind a login or paywall also has its pros and cons, especially in Holland.

- Blocking all traffic from where these rogue agents come from is problematic because I also saw many visitors from Switzerland, the USA, and other VPN drop-off points accessing my websites using Chinese web browsers and/or acting suspiciously. Blocking human users, e.g., from the USA and CH, isn't wise if you want to offer international content. 

- Limiting traffic, e.g., to so many pages per minute per IP, is also problematic, since Chinese users typically go for the result and don't seem to care how long that will take, so they will ask as many pages per minute as they can get away with, and come back later for the rest of the data.

- Limiting access to browsers with Western languages isn't an option either, because it is easily circumvented.

I ended up doing a mixture of the above:

1. Since I'm not seeking customers in China, Hong Kong, Vietnam, Russia, Ukraine, Belarus, Singapore, etc., I decided to block access to my sites from those countries using Cloudflare.
2. I moved sensitive content, such as prices for various champagnes by importer/producer, behind a paywall, leaving enough information visible to keep visitors interested. 
3. I created pages that Google can crawl, but that don't contain content valuable to AI crawlers. 
4. I left the restrictions in robots.txt, copyright/privacy notices, and my legal terms and conditions intact so decent crawlers/people can follow the rules, and others can not hide that they didn't know they shouldn't hack.
5. I inserted records only I know, and I seek those records on other sites so I know who illegally uses content taken from my sites and/or repositories. 
6. I limited the number of page visits per IP address per hour to what a human would typically do.
7. I removed Chinese Mandarin as a supported language. 
8. I had already trained my own chatbots to handle suspicious questions, but now I also monitor the questions and answers, including where the questions came from. I'm now figuring out how to use this info, e.g., for real-time blacklisting.

The good news: that worked. The number of rogue crawlers that visit my site has dropped drastically, but so has the number of page visits I see.

The sad news is that most likely Chinese AI platforms that crawl the internet and make that information available "as a Service" no longer see the content on my sites (if they are ethical). Their customers do not see my sites either.

SO AI BROUGHT NEW OPPORTUNITIES BUT ALSO BROUGHT NEW CONSIDERATIONS/CHOICES...
