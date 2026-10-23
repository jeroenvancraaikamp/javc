---
title: 'AI Part 2: Claude, GitHub, Python, Cloudflare, Supabase & ChatBot'
date: 2026-10-12
categories:
  - Blog Article
excerpt: For the AI Masterclass that I recently attended, we were asked to produce a practical use case. Building on AI Part 1, i decided to create a zero-touch Champagne Webiste that is completely generated using AI, and that makes use
image: /wp-content/uploads/2026/10/Champagne360.png
readingTime: 9
popular: false
draft: false
---

For the AI Masterclass that I recently attended, we were asked to produce a practical use case. Building on AI Part 1, i decided to create a zero-touch Champagne Webiste that is completely generated using AI, and that makes use of todays capabilities. The result is now live on [**Champagne360.nl**](https://Champagne360.nl),

### The site provides the following functionalities to the website visitors:

-   Anyone may look at **Information** that is gathered/generated using AI (i.e., presentations, web content, etc)
-   Anyone may **view/filter tables** with 319 Champagne Villages, 1053 Producers, 8014 Champagnes,168 Merchants/Shops, and 5.016 Offered Products.
-   Logged-in members may **view/export all tables and all prices** of 5.016 Champagne bottles that are offered in 168 Shops in 6 countries
-   Anyone may **chat to Claude**, the built-in Champagne ChatBot that knows all there is to know about 'le' and 'la' champagne
-   Anyone may **report a website** that may contain relevant content that my AI Agents are allowed to read
-   Anyone may **send us a message** using a contact form.
-   Anyone may **become a paid member** of the site
-   All content on the site is offered in **4 Languages**
-   **Administrators can log in from IP's in NL** to do Maintenance and look at Issues/Statistics
-   The site's **content is responsive,** i.e. there are different site layouts for PC's, Phones and Tabliets.

### "Under the hood" the website makes use of the following **technical components**:

1.  Anthropic Claud API (translations, chatbot, summarizations, etc)
2.  Supabase Secure Membership/Login
3.  Brevo SMTP Mail (e.g. for forms)
4.  SQLLite/JSON (database)
5.  Cloudflare DNS, WAF, Rate Limiting, Agent Workers, Routing, CAPTCHA, etc
6.  Github Repo/Actions/Pages
7.  Stripe Payment Processor
8.  Brave/Aptify (fetches summaries of company websites, if allowed)
9.  Apollo (LinkedIn API, fetches websites of champagne companies)
10.  Python Scripts (ShopScan, ProducerScan, AI Import, XLSX Export, etc)
11.  Remove Personal Data (AVG)
12.  Databankenwet compliance
13.  Node / Headless Chrome (presentaties)
14.  SEO (auto-generated robots.txt, sitemaps.xml)
15.  Google & Abacus Website Analytics

## What makes this site different from traditional websites?

-   The site is built and maintained via Anthropic Claude. Via natural language, Claude is instructed to "add this", "change that", "move this", "add menu/page", "match layout of", etc. We also asked Claude to "make all pages that contain data tables look and feel the same." Claude then made and applied all the changes and published them to GitHub, where they are hosted.

-   Claude instructed me which technical components to use, what they will cost, and how to configure them. When asked, Claude also told me how to keep the data safe and prevent unidentified people from copying sensitive content that makes us different from the rest.

-   The site's key is its up-to-date consolidated/relevant content in 4 languages, which Champagne ChatBot can access/query/use. For wine professionals, we created filter, query, and export capabilities that deliver clean/up-to-date information. Instead of spending hours writing tasting notes, we take the producer's French content and ask AI to summarize and phrase it in our tone of voice, in 4 languages. Adding Spanish, Indian, or Chinese (Mandarin) takes one click (and a substantial number of AI tokens)...

-   The site content is almost zero-touch. The content is gathered by querying LinkedIn for the websites of all Champagne Importers/Producers, then crawling their websites (if allowed), normalizing the crawled data, summarizing the city/producer/importer/champagne data, and translating it into 4 languages. Storing it securely in a fast SQL database.  
    **CHAMPAGNE360.NL NOW CONTAINS THE WORLD'S BIGGEST REPOSITORY OF (PRODUCERS/IMPORTERS OF) CHAMPAGNES**

-   We also fed Claude the available information from the **Nederlandse Champagne Pagina's** (which I published at the beginning of this century, but that is still applicable/relevant), and we used Claude to convert its content into multi-language presentations and info page content.

-   We made all information on the Site and in the Champagne Database available to Claude, the **chatbot** on the website. Users can now "talk" to the bot on a single page and get URLs to pages with filtered content. I.e., members can ask Claude "give me a list of Grand Cru Rosé Champagnes that are produced in Reims, and that cost between 30 and 40 euros per bottle". Within 5 seconds, they will be presented with **relevant** URLs that take them to the producers'/shops' referenced sources. Others may ask our Claude, "What is the difference between Premier-Cru and Grand-Cru?" Travelers may ask, "Where can I best eat/sleep in Reims?" Since the database is refreshed daily and stored locally, the chatbot doesn't need to continuously query the internet, and our Claude doesn't hallucinate because we provide accurate/filtered info.

-   Anthropic Claude generated separate pages/URLs for each producer, importer, and village, including content. We offered Google thousands of pages, which will likely rapidly improve the ranking of the Champagne360 page. We also ensured that other AI crawlers cannot easily copy the content legally. We added a couple of whistleblower records to all tables that non-human crawlers can't access. We continuously monitor the internet to locate sites that contain our whistleblowers :-) Those sites get an AI-generated letter from our new In-house-lawyer AI-Agent who knows everything about the **European Database Act**:-)

-   We don't sell products, and we don't get paid by the producers/shops. We sell site subscriptions for wine professionals, and they should cover our Technology costs. My hours are considered to be free, since this is a hobby project that shouldn't take much time once it is up and running. That said, I noticed that API Tokens can easily break the bank if not managed wisely. So, to keep **API costs** in check, we re-crawl only changed sites/pages. We also chose to process some things locally to avoid excessive AI token costs.
-   The annual membership costs about the same as one cheap bottle of Champagne. Pros will likely save dozens of hours annually if they use the site as intended. By offering the content in four languages, the membership market isn't limited to the Netherlands and Belgium, where people speak Dutch. Nice detail: Producers who see representation in countries where we have found importers can easily contact them.

> I believe Champage360 is a win-win-win for everyone who uses the site, whether you are a producer/grower, importer, webshop, or market researcher, or if you want to do a champagne presentation in school. Claude will help, 24x7, in four languages.

## Take aways

The Champagne360 webpage was primarily an exercise for me to get acquainted with the new AI technologies and their capabilities, costs, and limitations. If visitors don't recognize its value, so be it... My takeaways from the mini-project are:

1.  I have no more doubts: AI will disrupt how people will work in/with IT. If you take a couple of days to figure out how it works, you can build AI solutions that only nerds with many years of experience could build 2-3 years ago. That does not mean those nerds will be out of a job soon. They do have to switch over from traditional code/content to AI-generated code/content. If they don't switch soon, they will probably be out of an IT job within 3 years. That said, selling ice cream on the beach is also a fun career :-)
2.  Today's AI tools can generate royalty-free content that can easily compete with royalty-based content. They're really simple to use for anyone who's spent some time figuring out what to use for what.
3.  A lot of AI tools are out there, and they emerge rapidly and get replaced just as quickly. Keeping up with what's new and learning new products every month will be challenging. Tool consolidation and standardization will be almost impossible. Some of you will find yourselves using fifty tools within 2 years. Hopefully we will soon see a handful of best-of-suite tools, rather than hundreds of best-of-breed tools.
4.  The Champagne360 site cost me approx. 30 hours to implement and a couple of hours per month to maintain. Its HTML/CSS predecessor, which I built at the beginning of the century, cost me hundreds of hours to build and many evenings per month to keep the data up to date. Building and maintaining an AI website takes about half as much time and effort as building and maintaining a WordPress website, even though a month ago I knew little about AI. That said, if you already have a working WordPress site, you can generate content for it using AI and still save substantial time.
5.  If you don't know what you are doing. you can easily get into trouble by making the wrong decisions. I.e., when I did not know the cost of AI tokens, I crawled every single Champagne website using paid crawlers, including pages that were not updated. As a result, the first 50 paid subscribtions will be used to reimburse the API costs that I incurred in the first 48 hours of the site :-)
6.  **Security is a real concern!** If you simply generate a basic site using Claude.ai or ChatGPT, there is no security or data protection. I found out the hard way that the Claude website was put into one giant HTML page containing all the site's information. Claude must be explicitly asked to implement measures to keep things safe. The good news: Claude will do that for you when asked, albeit you may have to buy/integrate quite a bunch of licensed products to "Make IT Safe Again"
7.  There is a lot of news that AI can hack. I can assure you our AI bots have found a lot of data the owner probably isn't aware of, but that is publicly/legally available on the internet. E.g., WooCommerce or Shopify shop owners, beware!!! If you (or your site builder) haven't prevented it, someone can extract your entire shop content with one click.
8.  On one side working with AI is really simple. I have heard examples of pensioners who are now creating hobby websites using AI. However, if you want to Do IT right, before you know it, you have to get acquainted with 15 different technologies. Yes, AI can help you install/configure them, but who controls whom then? Are you controlling AI, or is AI controlling you? Also, this could easily lead to architectural complexity, which will inflate the total cost of ownership.
9.  Most of the AI tools offer a free subscription, which will not suffice. Upgrading to pro versions may cost you 20 euros per month per product. The simple champagne360 site would cost 200 euros per month in AI software subscriptions, plus AI tokens. If I built the same site in WordPress with themes and paid plugins, it would still cost less than 30 euros per month, but I would have to maintain the content myself, and WordPress is nearly as much fun as AI.
