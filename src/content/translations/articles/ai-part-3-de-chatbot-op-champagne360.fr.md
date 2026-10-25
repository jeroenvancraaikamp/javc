---
title: "IA, partie 3 : le chatbot de Champagne360"
excerpt: "Après avoir d'abord rassemblé, dans le cadre de ma formation en IA, une grande quantité d'informations sur le site Champagne360.nl (voir la partie 1 et la partie 2), j'y ai récemment ajouté un chatbot IA multilingue. Cette fois encore, j'ai été agréablement surpris par"
source: "9d7d3c988d5224af"
---

Après avoir d'abord rassemblé, dans le cadre de ma formation en IA, une grande quantité d'informations sur le site Champagne360.nl (voir la [partie 1](/fr/2723-2/) et la [partie 2)](/fr/hello-ai/), j'y ai récemment ajouté un chatbot IA multilingue. Cette fois encore, j'ai été agréablement surpris par la facilité et la rapidité avec lesquelles tout s'est fait. En trois soirées, j'ai assemblé, à force de clics et de dialogue, quelque chose que je n'aurais jamais réussi à faire sans IA. Le chatbot est la cerise sur le gâteau ou, si vous préférez, le bouchon sur la bouteille.

## Un clic sur le point d'interrogation

J'ai demandé à Claude de configurer une page avec un chatbot. Cette page est accessible via l'icône « ? » présente sur chaque page du site.

Le chatbot affiche une barre de recherche et une série de questions fréquentes, dans la langue choisie. Après un clic sur le bouton, le chatbot cherche une réponse ou une explication et l'affiche en bas de l'écran, là encore dans la langue choisie. Ceux qui le souhaitent peuvent se faire lire le texte à voix haute. La saisie vocale est venue s'y ajouter par la suite : vous posez votre question à l'oral via le microphone et la réponse vous est lue immédiatement. Après la première réponse de Claude, le visiteur peut envoyer une question complémentaire, à laquelle Claude répond en tenant compte du dialogue précédent. Les non-membres peuvent poser au maximum 8 questions complémentaires et au maximum 30 questions par heure depuis une même adresse IP. Ces limites ne s'appliquent pas aux membres. Les bots IA de tiers n'ont pas le droit de parler à Claude :-)

## L'éducation de Claude :

Une fois le chatbot opérationnel, nous l'avons éduqué :

-   Nous avons défini le *tone of voice* et lui avons indiqué sur quels sujets il peut ou non donner son « avis ».
-   Nous l'avons alimenté avec soixante pages d'explications en néerlandais sur « le » et « la » champagne, afin qu'il puisse donner des réponses pertinentes.
-   Nous lui avons indiqué que le site comporte des pages avec des diapositives d'information et des liens, et que ceux-ci doivent également apparaître dans la réponse.
-   Nous lui avons indiqué qu'il existe des tableaux dont le contenu peut être filtré ou affiché via une URL.
-   Nous lui avons indiqué que le visiteur peut proposer le site d'un producteur, d'un importateur ou d'un champagne si le chatbot ne le trouve pas.
-   Nous avons décidé que les questions posées et les réponses générées sont conservées en tant qu'informations historiques, pas nécessairement à jour.
-   Nous avons décidé que les informations de Claude peuvent, si nécessaire, être complétées par une poignée de résultats de recherche Google.
-   Nous avons décidé que les informations de Champagne360 priment toujours, et que le chatbot ne peut chercher des URL sur Internet que s'il ne connaît pas lui-même de bonne réponse.
-   Nous avons fait de Claude un planificateur d'itinéraire professionnel. Si la réponse porte sur une maison ou un village, un bouton « itinéraire » s'affiche automatiquement.

Notre chatbot dispose de données pertinentes et complètes issues de sources originales, ce qui lui permet de fournir des informations plus pertinentes que si vous utilisiez ChatGPT ou un autre outil d'IA. Les nouvelles possibilités de l'IA permettent de véritables dialogues. Ainsi, un enfant de moins de 10 ans peut rassembler sur le site de la matière pour son dossier ou son exposé sur la Champagne. Les professionnels apprécieront le contenu du site pour leurs études de marché.

Les questions soumises au chatbot sont conservées pendant un an, ce qui donne une bonne idée des besoins des visiteurs et de ce qu'ils recherchent. Ces informations servent à générer des Frequently Asked Questions et à réutiliser des réponses.

Toutes les informations de Champagne360 sont disponibles en quatre langues, et le chatbot l'est donc aussi. Les informations sont enregistrées dans une langue source, puis traduites dans les trois autres langues. Lorsqu'une page source est modifiée, elle est relue, résumée, puis traduite dans les trois autres langues. Cela garantit un site ultra-rapide et un contenu déjà traduit, donc consultable dans la langue choisie par les visiteurs et par Google. Pour les tokens d'IA, il est important que le contenu n'ait pas à être traduit par l'IA à chaque passage d'un visiteur parlant une autre langue. S'il s'avère que la majorité des pages traduites sont consultées moins d'une fois avant d'être mises à jour, nous inverserons la stratégie de traduction : l'IA ne générera la traduction que lorsqu'un visiteur parlant une autre langue consultera cette page. Cette traduction sera alors enregistrée, afin de ne pas avoir à retraduire les pages à chaque fois tant que la source ne change pas.

## Couper, coller, terminé :

L'éducation s'est elle aussi faite tout simplement en langage naturel. Chaque étape produisait une définition JavaScript mise à jour pour le Chatbot Worker. Un petit copier-coller, un clic sur « Deploy », et c'est terminé. Claude a désormais le même humour douteux que moi, et sait ce que je sais sur le champagne, et plus encore.

La mise en place d'une gestion sécurisée des membres avec paiements par carte de crédit, iDEAL et PayPal a représenté beaucoup de travail et une courbe d'apprentissage abrupte. Mais le résultat en vaut la peine : nous pouvons maîtriser les coûts générés par les non-membres en limitant leur utilisation du chatbot. Les membres ne sont pas soumis à ces limites et ont accès à des fonctionnalités supplémentaires, comme des possibilités d'export et un aperçu des prix de détail pratiqués dans les différents pays.

Le plus gros du travail a toutefois consisté à faire en sorte que les bots de tiers ne puissent pas distraire notre Claude, et que seuls de vrais humains puissent converser avec Claude et remplir des formulaires.

### **Découvrez le résultat sur [champagne360.nl](https://champagne360.nl).**
