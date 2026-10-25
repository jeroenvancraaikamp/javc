---
title: "AI Part 3: The Chatbot on Champagne360"
excerpt: "After first gathering a whole load of information on the website Champagne360.nl for my AI course (see part 1 and part 2), I recently added a multilingual AI chatbot to it. Once again I was pleasantly surprised by"
source: "9d7d3c988d5224af"
---

After first gathering a whole load of information on the website Champagne360.nl for my AI course (see [part 1](/2723-2/) and [part 2)](/hello-ai/), I recently added a multilingual AI chatbot to it. Once again I was pleasantly surprised by how easy and fast it was. Within 3 evenings I had built, or rather talked, something together that I would never have managed without AI. The chatbot is the icing on the cake, or, if you like, the cork in the bottle.

## One click on the question mark

I asked Claude to configure a page with a chatbot. That page can be reached via the "?" icon that appears on every page of the site.

The chatbot shows a search bar and a number of frequently asked questions, in the selected language. After a click on the button, the chatbot looks for an answer or explanation and displays it at the bottom of the screen, again in the selected language. If you like, you can have the text read aloud. Voice input was added later: you speak your question into the microphone and the answer is read aloud straight away. After Claude's first response, the visitor can send a follow-up question, to which Claude responds taking the preceding dialogue into account. Non-members may ask a maximum of 8 follow-up questions and a maximum of 30 questions per hour from a single IP address. These restrictions do not apply to members. Other people's AI bots are not allowed to talk to Claude :-)

## Raising Claude:

Once the chatbot was up and running, we brought it up properly:

-   We defined the *tone of voice* and told it what it may and may not give an "opinion" on.
-   We fed it sixty Dutch pages of explanation about 'le' and 'la' champagne, so that it can give sensible answers.
-   We told it that the site contains pages with info slides and links, and that these should also be shown in the response.
-   We told it that there are tables whose contents can be filtered or displayed via a URL.
-   We told it that visitors can submit the site of a producer, importer or champagne if the chatbot cannot find it.
-   We decided that the questions asked and the answers generated are stored as historical, not necessarily up-to-date, information.
-   We decided that Claude's information may, where necessary, be supplemented with a handful of Google search results.
-   We decided that the information on Champagne360 always takes precedence, and that the chatbot may only search the internet for URLs if it does not know a good answer itself.
-   We trained Claude to be a professional route planner. If the response is about a firm or a village, you automatically get a "route" button.

Our chatbot has relevant, complete data from original sources, so it produces more meaningful information than you would get from ChatGPT or another AI tool. The new AI capabilities make full dialogues possible. A child under 10, for example, can use the site to gather material for a school project and/or presentation about Champagne. Professionals will appreciate the site's content for market research.

The questions put to the chatbot are kept for a year, which gives a good picture of what visitors need and what they are looking for. The information is used to generate Frequently Asked Questions and to reuse answers.

All information on Champagne360 is available in four languages, and so is the chatbot. The information is stored in a source language and then translated into the other three languages. When a source page is changed, it is read in again, summarised and then translated into the other three languages. This makes the site lightning fast and means the content has already been translated and can therefore be searched in the selected language by visitors and by Google. For the AI tokens, it is important that the content does not have to be translated by AI every single time a speaker of another language visits the site. Should it turn out that most translated pages are visited less than once before the page is updated, we will reverse the translation strategy and have AI generate the translation only when a speaker of another language comes across that page. That translation is then stored, so you do not have to translate pages again and again while the source remains unchanged.

## Cut, Paste, Done:

The training was also done simply in natural language. Each step produced an updated JavaScript definition for the Chatbot Worker. A quick cut and paste, press "Deploy" and done. Claude now shares my questionable sense of humour, and knows what I know about champagne, and more.

Setting up a secure membership administration with credit card, iDEAL and PayPal payments was a lot of work and a steep learning curve. But it pays off: we can control the costs caused by non-members by limiting their use of the chatbot. Members do not have those restrictions and get access to additional functionality, such as export options and insight into the retail prices used in the various countries.

The most work, though, was making sure that third-party bots cannot distract our Claude, and that only real people can converse with Claude and fill in forms.

### **You can see the result at [champagne360.nl](https://champagne360.nl).**
