---
title: "AI Part 4: Goodbye WordPress & PHP"
excerpt: "This week it turned out that the machines running PHP could easily be exploited. Patches/fixes have been made available for recent versions of PHP. Many people discovered that their WordPress installation, and even the underlying Linux and/or database management system, were not up to date either. WHAT TO DO?"
source: "be83a009355f37cd"
---

It seemed so easy: a website on your own VPS with a control panel. All sorted, right? Indeed, it was up and running within a few weeks. Installing and upgrading WordPress themes and plugins is a nuisance, but not impossible. After running for a number of years, many a WordPress website is now packed with pages, blog articles and so on. New technology is available to replace WordPress, but many people are staring at what seems to be a high threshold.

This week, many website owners suddenly got a wake-up call. There was a vulnerability in the PHP servers that PHP programs run on. The vulnerability was not in the programs themselves (such as WordPress), but in the underlying PHP server. So even if you had dutifully kept WordPress, your themes and your plugins up to date all those years, this week it was still your turn...  You would think: just install a patch and you're done. Well, no. If you haven't kept your PHP server up to date, you first have to upgrade it before you can install the patch. And then some people discovered that underneath the PHP server there was often also an outdated Linux operating system and/or an outdated database management system.

I hate to think how many people had to set up an entirely new server in a panic this week and migrate their WordPress CMS and its content. And then, sure enough, it turned out that the old CMS couldn't run on the new stack and therefore had to be upgraded as well. Oops... When you're tinkering with everything at the same time, chances are you can no longer pinpoint the cause when something doesn't work properly. After a lot of blood, sweat and tears, many are now running new versions of a platform that is still outdated. 

Over the past month I have fully adopted AI and discovered how wide the doors are open to AI snoopers on WordPress sites and the WooCommerce and Shopify web shops running on them. All you have to do is ask AI to research and summarise a site, and AI gets to work retrieving, completely legally, the information that needs to be researched.

> I suspect that in the coming period (the people behind) AI will discover and exploit many more vulnerabilities in older systems. Once you've plugged one hole, the next one is quickly found. You have a choice: either keep slogging on with outdated stuff, or bite the bullet and switch to modern technologies that are a lot less vulnerable and a lot easier to manage.

It was my turn as well. Until last night, this website was still running on WordPress, and when I started patching the technology underneath the WordPress CMS, I noticed that deep under the hood quite a lot of outdated open-source components were running, including MySQL, PHP and CentOS. 

I bit the bullet and migrated the content of my WordPress site to an AI solution running on Anthropic Claude, Cloudflare, GitHub and Sveltia (a Git-based headless CMS). It was astonishing how easily and quickly that transition actually went. 

I simply asked Claude to create an AI clone of my old website. Claude asked me to make an export of the WordPress site and to allow GitHub to pull the media over from my old site. Along the way, Claude sometimes proactively made a few "improvements" that I didn't always agree with. After a pleasant dialogue about what I want from the site, Claude adjusted things accordingly. After that, it was a matter of switching the DNS routing from Plesk to Cloudflare, which I had done overnight. By this morning, this site was running on AI… This evening I added some security and protection measures, set up backup facilities, had statistics pages and admin pages built, and launched and fed a new chatbot.   

In 2022 I needed an entire Christmas holiday to rebuild my old .NET website in WordPress. Now I do the same—and more—in two evenings. My website and the blog with 60 articles I have been writing since 2022 are watertight again in one fell swoop and now use only modern components. The new site is a platform on which all kinds of AI applications can be developed and run securely. The hurdle I thought I had to clear turns out to be nothing more than a low threshold. 

**_I can recommend to anyone who uses or manages IT solutions to become proficient in AI and to accelerate saying goodbye to outdated technology, preferably before AI brings this old technology down or some miscreant makes off with the data. Because the latter is no longer a question of whether it will happen, but only of when it will happen._**
