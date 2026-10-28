---
title: "IA, partie 5 : le nouvel IT4IT Atlas"
excerpt: "Pour ma troisième solution Zero-touch, j'ai migré l'« IT4IT Atlas », que j'avais conçu dans OpenAI ChatGPT, vers Anthropic Claude et je l'ai intégré à mon site web. En chemin, j'ai créé un algorithme qui associe automatiquement les 1 600 outils logiciels recensés aux Value Streams d'IT4IT 3, aux domaines de CSDM 5 et aux types de solutions de TBM 5."
source: "796dc0486705d5c4"
---

Pour me simplifier la vie, j'ai décidé de regrouper mes solutions informatiques sur un nombre plus restreint de plateformes. J'ai migré les sites WordPress et je suis en train de consolider les plateformes d'IA que j'ai découvertes le mois dernier. Je vais standardiser sur Anthropic Claude, GitHub, Cloudflare, Supabase, Stripe et Svetla CMS.

Dans mon projet le plus récent, j'ai converti ma première tentative avec ChatGPT Pages, l'IT4IT Atlas, vers Anthropic Claude et je l'ai intégrée à mon site web, JAvC.nl.

La solution :

- Explore les sites web des éditeurs de logiciels pertinents et recense (et met à jour) leurs solutions logicielles.
- Associe automatiquement les solutions recensées aux chaînes de valeur IT4IT, aux domaines de CSDM 5 et aux types de solutions de TBM 5.
- Classe automatiquement les solutions selon une combinaison des pratiques ci-dessus.
- Met automatiquement à jour les 1 600 outils qu'elle contient (ZERO TOUCH).
- Offre aux visiteurs de JAvC.nl une expérience utilisateur qui leur permet d'interroger et de filtrer la liste des outils, puis d'en exporter un sous-ensemble filtré.

Afin de garder un périmètre raisonnable et pertinent pour les grandes entreprises, Atlas n'inclut pas les logiciels grand public conçus pour les PC ou les téléphones.

Le site recherche et traite automatiquement les mises à jour à l'aide d'API et de l'IA. Pour maîtriser le coût des tokens d'IA, le site est mis à jour une fois par semaine. Dans le Changelog, vous trouverez toutes les modifications apportées la semaine précédente.

Si vous trouvez IT4IT Atlas utile et/ou s'il vous a épargné des jours de recherche, vous pouvez contribuer en finançant les tokens d'IA que consomme IT4IT Atlas en cliquant sur le QR code Tikkie. Les sponsors peuvent choisir de recevoir les mises à jour hebdomadaires par e-mail.
