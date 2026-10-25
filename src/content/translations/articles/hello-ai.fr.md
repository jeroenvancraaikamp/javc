---
title: "IA, partie 2 : Claude, GitHub, Python, Cloudflare, Supabase et ChatBot"
excerpt: "Pour la masterclass IA que j'ai récemment suivie, on nous a demandé de produire un cas d'usage concret. Dans le prolongement de la partie 1 consacrée à l'IA, j'ai décidé de créer un site web « zero-touch » consacré au champagne, entièrement généré par l'IA, et qui exploite"
source: "a3aee8ea73f28065"
---

Pour la masterclass IA que j'ai récemment suivie, on nous a demandé de produire un cas d'usage concret. Dans le prolongement de la partie 1 consacrée à l'IA, j'ai décidé de créer un site web « zero-touch » consacré au champagne, entièrement généré par l'IA, et qui exploite les capacités actuelles. Le résultat est désormais en ligne sur [**Champagne360.nl**](https://Champagne360.nl),

### Le site offre les fonctionnalités suivantes à ses visiteurs :

-   Tout le monde peut consulter des **informations** collectées/générées à l'aide de l'IA (présentations, contenu web, etc.)
-   Tout le monde peut **consulter/filtrer des tableaux** recensant 319 villages champenois, 1 053 producteurs, 8 014 champagnes, 168 négociants/boutiques et 5 016 produits proposés.
-   Les membres connectés peuvent **consulter/exporter tous les tableaux et tous les prix** des 5 016 bouteilles de champagne proposées dans 168 boutiques de 6 pays
-   Tout le monde peut **discuter avec Claude**, le ChatBot intégré du site, qui sait tout ce qu'il y a à savoir sur « le » et « la » champagne
-   Tout le monde peut **signaler un site web** susceptible de contenir du contenu pertinent que mes agents IA sont autorisés à lire
-   Tout le monde peut **nous envoyer un message** via un formulaire de contact.
-   Tout le monde peut **devenir membre payant** du site
-   L'ensemble du contenu du site est proposé en **4 langues**
-   **Les administrateurs peuvent se connecter depuis des adresses IP situées aux Pays-Bas** pour assurer la maintenance et consulter les incidents/statistiques
-   Le **contenu du site est responsive,** c'est-à-dire qu'il existe des mises en page différentes pour les PC, les téléphones et les tablettes.

### « Sous le capot », le site s'appuie sur les **composants techniques** suivants :

1.  API Anthropic Claude (traductions, chatbot, résumés, etc.)
2.  Supabase pour l'adhésion et la connexion sécurisées
3.  Brevo SMTP Mail (par exemple pour les formulaires)
4.  SQLite/JSON (base de données)
5.  Cloudflare DNS, WAF, Rate Limiting, Agent Workers, routage, CAPTCHA, etc.
6.  GitHub Repo/Actions/Pages
7.  Stripe comme prestataire de paiement
8.  Brave/Aptify (récupère des résumés des sites web des entreprises, si autorisé)
9.  Apollo (API LinkedIn, récupère les sites web des maisons de champagne)
10.  Scripts Python (ShopScan, ProducerScan, AI Import, export XLSX, etc.)
11.  Suppression des données personnelles (RGPD)
12.  Conformité à la législation sur les bases de données (Databankenwet)
13.  Node / Chrome headless (présentations)
14.  SEO (robots.txt et sitemaps.xml générés automatiquement)
15.  Google & Abacus Website Analytics

## Qu'est-ce qui distingue ce site des sites web traditionnels ?

-   Le site est construit et maintenu via Anthropic Claude. En langage naturel, on demande à Claude d'« ajouter ceci », de « modifier cela », de « déplacer ceci », d'« ajouter un menu/une page », d'« aligner la mise en page sur », etc. Nous avons également demandé à Claude de « donner le même aspect et la même ergonomie à toutes les pages contenant des tableaux de données ». Claude a alors effectué et appliqué toutes les modifications, puis les a publiées sur GitHub, où le site est hébergé.

-   Claude m'a indiqué quels composants techniques utiliser, ce qu'ils coûteraient et comment les configurer. À ma demande, Claude m'a également expliqué comment protéger les données et empêcher des personnes non identifiées de copier le contenu sensible qui nous distingue des autres.

-   La force du site réside dans son contenu consolidé, pertinent et à jour en 4 langues, que le ChatBot Champagne peut consulter, interroger et exploiter. Pour les professionnels du vin, nous avons créé des fonctions de filtrage, de requête et d'export qui fournissent des informations propres et à jour. Au lieu de passer des heures à rédiger des notes de dégustation, nous reprenons le contenu en français du producteur et demandons à l'IA de le résumer et de le formuler dans notre ton, en 4 langues. Ajouter l'espagnol, une langue indienne ou le chinois (mandarin) ne demande qu'un clic (et un nombre non négligeable de tokens IA)...

-   Le contenu du site est quasiment « zero-touch ». Il est collecté en interrogeant LinkedIn pour obtenir les sites web de tous les importateurs/producteurs de champagne, puis en explorant leurs sites (si autorisé), en normalisant les données collectées, en résumant les données relatives aux villes, producteurs, importateurs et champagnes, et en les traduisant en 4 langues. Le tout est stocké de manière sécurisée dans une base de données SQL rapide.  
    **CHAMPAGNE360.NL CONTIENT DÉSORMAIS LE PLUS GRAND RÉFÉRENTIEL AU MONDE DE CHAMPAGNES (ET DE LEURS PRODUCTEURS/IMPORTATEURS)**

-   Nous avons également fourni à Claude les informations disponibles des **Nederlandse Champagne Pagina's** (que j'ai publiées au début de ce siècle, mais qui restent applicables et pertinentes), et nous avons utilisé Claude pour convertir ce contenu en présentations et en pages d'information multilingues.

-   Nous avons mis toutes les informations du site et de la base de données Champagne à la disposition de Claude, le **chatbot** du site. Les utilisateurs peuvent désormais « parler » au bot sur une seule page et obtenir des URL menant à des pages au contenu filtré. Par exemple, les membres peuvent demander à Claude : « Donne-moi une liste de champagnes rosés Grand Cru produits à Reims et coûtant entre 30 et 40 euros la bouteille. » En moins de 5 secondes, des URL **pertinentes** leur sont proposées, renvoyant vers les sources des producteurs/boutiques concernés. D'autres peuvent demander à notre Claude : « Quelle est la différence entre Premier Cru et Grand Cru ? » Les voyageurs peuvent demander : « Où manger/dormir le mieux à Reims ? » Comme la base de données est actualisée quotidiennement et stockée localement, le chatbot n'a pas besoin d'interroger Internet en permanence, et notre Claude n'hallucine pas, puisque nous lui fournissons des informations exactes et filtrées.

-   Anthropic Claude a généré des pages/URL distinctes pour chaque producteur, importateur et village, contenu compris. Nous avons ainsi proposé à Google des milliers de pages, ce qui devrait rapidement améliorer le référencement de la page Champagne360. Nous avons également veillé à ce que d'autres robots d'exploration IA ne puissent pas facilement copier le contenu en toute légalité. Nous avons ajouté dans tous les tableaux quelques enregistrements « lanceurs d'alerte », inaccessibles aux robots non humains. Nous surveillons en permanence Internet pour repérer les sites contenant nos lanceurs d'alerte :-) Ces sites reçoivent alors une lettre générée par notre nouvel agent IA, juriste maison, qui sait tout de la **loi européenne sur les bases de données** :-)

-   Nous ne vendons pas de produits et nous ne sommes pas rémunérés par les producteurs/boutiques. Nous vendons des abonnements au site destinés aux professionnels du vin, qui doivent couvrir nos coûts technologiques. Mes heures sont considérées comme gratuites, puisqu'il s'agit d'un projet personnel qui ne devrait pas demander beaucoup de temps une fois opérationnel. Cela dit, j'ai constaté que les tokens d'API peuvent facilement faire exploser le budget s'ils ne sont pas gérés judicieusement. Pour maîtriser les **coûts d'API**, nous ne ré-explorons donc que les sites/pages modifiés. Nous avons également choisi de traiter certaines opérations en local afin d'éviter des coûts excessifs en tokens IA.
-   L'adhésion annuelle coûte à peu près le prix d'une bouteille de champagne bon marché. Les professionnels économiseront probablement des dizaines d'heures par an s'ils utilisent le site comme prévu. Grâce à la disponibilité du contenu en quatre langues, le marché des adhésions ne se limite pas aux Pays-Bas et à la Belgique, où l'on parle néerlandais. Détail appréciable : les producteurs qui cherchent une représentation dans les pays où nous avons recensé des importateurs peuvent facilement les contacter.

> Je pense que Champagne360 est gagnant-gagnant-gagnant pour tous ceux qui utilisent le site, que vous soyez producteur/vigneron, importateur, boutique en ligne ou chargé d'études de marché, ou que vous souhaitiez faire un exposé sur le champagne à l'école. Claude vous aidera, 24 h/24 et 7 j/7, en quatre langues.

## Enseignements

Le site Champagne360 était avant tout pour moi un exercice destiné à me familiariser avec les nouvelles technologies d'IA, leurs capacités, leurs coûts et leurs limites. Si les visiteurs n'en perçoivent pas la valeur, tant pis... Voici les enseignements que je tire de ce mini-projet :

1.  Je n'ai plus aucun doute : l'IA va bouleverser la façon dont les gens travaillent dans/avec l'IT. Si vous prenez quelques jours pour comprendre comment elle fonctionne, vous pouvez construire des solutions d'IA que seuls des passionnés aguerris, forts de nombreuses années d'expérience, étaient capables de réaliser il y a 2 ou 3 ans. Cela ne signifie pas que ces experts se retrouveront bientôt sans emploi. Ils doivent en revanche passer du code/contenu traditionnel au code/contenu généré par l'IA. S'ils ne le font pas rapidement, ils perdront probablement leur emploi dans l'IT d'ici 3 ans. Cela dit, vendre des glaces sur la plage est aussi une carrière sympathique :-)
2.  Les outils d'IA actuels peuvent générer du contenu libre de droits capable de rivaliser sans peine avec du contenu soumis à droits. Ils sont vraiment simples à utiliser pour quiconque a pris le temps de comprendre quel outil utiliser pour quoi.
3.  Il existe une multitude d'outils d'IA, qui apparaissent rapidement et sont remplacés tout aussi vite. Se tenir au courant des nouveautés et apprendre de nouveaux produits chaque mois sera un véritable défi. La consolidation et la standardisation des outils seront quasiment impossibles. Certains d'entre vous se retrouveront à utiliser une cinquantaine d'outils d'ici 2 ans. Espérons que nous verrons bientôt émerger une poignée d'outils « best-of-suite » plutôt que des centaines d'outils « best-of-breed ».
4.  La mise en place du site Champagne360 m'a demandé environ 30 heures, et sa maintenance quelques heures par mois. Son prédécesseur en HTML/CSS, que j'ai construit au début du siècle, m'avait coûté des centaines d'heures de développement et de nombreuses soirées par mois pour tenir les données à jour. Construire et maintenir un site web basé sur l'IA demande environ deux fois moins de temps et d'efforts qu'un site WordPress, alors même qu'il y a un mois, je ne connaissais pas grand-chose à l'IA. Cela dit, si vous disposez déjà d'un site WordPress fonctionnel, vous pouvez générer son contenu à l'aide de l'IA et gagner malgré tout un temps considérable.
5.  Si vous ne savez pas ce que vous faites, vous pouvez facilement vous mettre en difficulté en prenant de mauvaises décisions. Par exemple, lorsque je ne connaissais pas le coût des tokens IA, j'ai exploré chaque site de champagne à l'aide de crawlers payants, y compris les pages qui n'avaient pas été mises à jour. Résultat : les 50 premiers abonnements payants serviront à rembourser les coûts d'API engagés au cours des 48 premières heures du site :-)
6.  **La sécurité est une vraie préoccupation !** Si vous vous contentez de générer un site basique avec Claude.ai ou ChatGPT, il n'y a ni sécurité ni protection des données. J'ai appris à mes dépens que Claude avait placé l'ensemble du site dans une seule page HTML géante contenant toutes ses informations. Il faut demander explicitement à Claude de mettre en place des mesures de sécurité. La bonne nouvelle : Claude s'en chargera pour vous si vous le lui demandez, même si vous devrez peut-être acheter/intégrer un bon nombre de produits sous licence pour « Make IT Safe Again ».
7.  On entend beaucoup dire que l'IA est capable de pirater. Je peux vous assurer que nos bots IA ont trouvé quantité de données dont le propriétaire n'a probablement pas conscience, mais qui sont accessibles publiquement et légalement sur Internet. Propriétaires de boutiques WooCommerce ou Shopify, méfiez-vous !!! Si vous (ou votre créateur de site) ne l'avez pas empêché, n'importe qui peut extraire l'intégralité du contenu de votre boutique en un clic.
8.  D'un côté, travailler avec l'IA est vraiment simple. J'ai entendu parler de retraités qui créent désormais des sites web de loisirs grâce à l'IA. Cependant, si vous voulez bien faire les choses (« Do IT right »), vous devez rapidement vous familiariser avec 15 technologies différentes. Certes, l'IA peut vous aider à les installer et à les configurer, mais qui contrôle qui, dans ce cas ? Est-ce vous qui contrôlez l'IA, ou l'IA qui vous contrôle ? Par ailleurs, cela peut facilement engendrer une complexité architecturale qui fera grimper le coût total de possession.
9.  La plupart des outils d'IA proposent un abonnement gratuit, qui ne suffira pas. Passer aux versions pro peut vous coûter 20 euros par mois et par produit. Le simple site champagne360 coûterait 200 euros par mois en abonnements à des logiciels d'IA, sans compter les tokens IA. Si je construisais le même site sous WordPress avec des thèmes et des plugins payants, il coûterait toujours moins de 30 euros par mois, mais je devrais gérer le contenu moi-même, et WordPress est presque aussi amusant que l'IA.
