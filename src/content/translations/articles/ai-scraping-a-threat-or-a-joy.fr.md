---
title: "Le scraping par l'IA, une menace ou une aubaine ?"
excerpt: "Dans le cadre de mon parcours IA, j'ai activé le chinois mandarin comme langue prise en charge sur mon site web. Toutes les pages et tous les articles ont été traduits automatiquement, sans que je parle un seul mot de chinois. Au bout d'un certain temps, j'ai constaté une forte hausse du trafic web (des milliers de visites par jour), dont 30 à 40 % provenaient de Singapour et de Chine. Le trafic en provenance des États-Unis a lui aussi augmenté de façon spectaculaire. Lorsque j'ai remarqué que ces nouveaux « visiteurs » étaient en grande majorité des agents d'IA qui aspiraient mes articles et le contenu de l'IT4IT Atlas, je me suis demandé : est-ce une bonne ou une mauvaise chose ? La réponse n'est pas binaire..."
source: "59ea3645e7aceb1a"
---

Si vous suivez mon blog, vous savez que cette année, je me suis lancé dans un parcours IA et que j'acquiers de l'expérience et des connaissances sur ce qu'il faut faire et ne pas faire avec l'IA. J'ai constaté que je ne suis pas le seul à jouer avec l'IA. Les inquiétudes que l'on entend aux informations à propos de l'IA doivent être prises au sérieux, comme j'ai pu le constater moi-même.

Deux mois après avoir converti mes sites WordPress/PHP en sites nativement IA, qui utilisent des agents et des chatbots, j'ai remarqué que le trafic web avait fortement augmenté. L'ajout d'un support multilingue a clairement eu un impact sur le nombre de visiteurs, en particulier lorsque j'ai ajouté le chinois mandarin (c'est-à-dire le chinois simplifié). Au début, j'étais vraiment enthousiaste devant cette attention supplémentaire, car je savais que le marché de ce que je propose est bien plus vaste que les Pays-Bas. J'ai alors ajouté des outils d'analyse pour voir d'où venaient ces visiteurs supplémentaires, ce qu'ils faisaient ou lisaient, et combien de temps ils restaient sur chaque page.

En analysant le trafic web, j'ai constaté que ces visiteurs lisaient soit très vite, soit qu'il se passait autre chose. Lorsque j'ai vu ce que mes nouveaux « amis » de Chine demandaient à mes chatbots, j'ai conclu qu'il ne s'agissait pas d'humains, mais de robots d'exploration (web crawlers) qui lisaient page après page, article après article, sans sauter un seul article ni produit IT4IT de mon site, et qui tentaient de pénétrer dans le contenu sécurisé que je détiens.

En toute honnêteté, le contenu de l'IT4IT Atlas et de Champagne360.nl est lui aussi collecté sur Internet à l'aide d'agents d'IA. Cependant, j'ai donné pour instruction à nos agents de respecter les règles et les lois en vigueur. Par exemple, si le fichier robots.txt d'un site web indique à nos agents qu'ils ne sont pas les bienvenus sur certaines pages, mes agents ne lisent, ne traduisent ni ne résument le contenu de ces pages.

Si mes agents ne sont pas les bienvenus sur vos pages, ces pages et les produits qu'elles présentent ne seront pas intégrés dans les référentiels que je partage avec le reste du monde. Autrement dit, vous pouvez avoir un excellent produit, mais des sites comme le mien n'en auront pas connaissance, car pour les agents d'IA, vous n'existez pas.

Sur mes propres sites web, j'ai configuré le fichier robots.txt pour limiter ce que les bots visiteurs peuvent faire ou lire s'ils passent par les canaux autorisés. De toute évidence, cette protection ne suffit pas. Les agents d'IA chinois s'avèrent passer par des navigateurs web ordinaires et se faire passer pour des humains, contournant même les contrôles anti-robots. Le seul moyen de savoir qu'ils ne sont pas humains, c'est qu'ils lisent tout, très rapidement, et posent à mes chatbots des questions suspectes.

Je suis arrivé à la liste d'options suivante :

- Accepter que les agents d'IA des autres, en particulier ceux de CN, RU, VN et SG, ne soient pas aussi honnêtes que mes propres agents, et les laisser explorer le contenu visible publiquement par les visiteurs humains. Peut-être ne devrais-je pas rendre toutes les données accessibles à tout le monde ? Cela dit, placer des données sensibles derrière une connexion ou un paywall a aussi ses avantages et ses inconvénients, en particulier aux Pays-Bas.

- Bloquer tout le trafic provenant des pays d'où viennent ces agents malveillants est problématique, car j'ai aussi vu de nombreux visiteurs de Suisse, des États-Unis et d'autres points de sortie de VPN accéder à mes sites avec des navigateurs chinois et/ou avoir un comportement suspect. Bloquer des utilisateurs humains, par exemple des États-Unis et de Suisse, n'est pas judicieux si l'on veut proposer un contenu international.

- Limiter le trafic, par exemple à un certain nombre de pages par minute et par adresse IP, est également problématique, car les utilisateurs chinois recherchent généralement le résultat sans se soucier du temps nécessaire : ils demandent autant de pages par minute que possible, puis reviennent plus tard chercher le reste des données.

- Limiter l'accès aux navigateurs configurés dans une langue occidentale n'est pas non plus une option, car cela se contourne facilement.

J'ai fini par opter pour une combinaison de ces mesures :

1. Comme je ne cherche pas de clients en Chine, à Hong Kong, au Vietnam, en Russie, en Ukraine, au Bélarus, à Singapour, etc., j'ai décidé de bloquer l'accès à mes sites depuis ces pays grâce à Cloudflare.
2. J'ai placé derrière un paywall les contenus sensibles, tels que les prix de divers champagnes par importateur/producteur, en laissant suffisamment d'informations visibles pour maintenir l'intérêt des visiteurs.
3. J'ai créé des pages que Google peut explorer, mais qui ne contiennent aucun contenu intéressant pour les robots d'exploration d'IA.
4. J'ai laissé intactes les restrictions du fichier robots.txt, les mentions de copyright et de confidentialité ainsi que mes conditions générales, afin que les robots et les personnes honnêtes puissent respecter les règles, et que les autres ne puissent pas prétendre qu'ils ignoraient qu'il ne fallait pas pirater.
5. J'ai inséré des enregistrements que moi seul connais, et je les recherche sur d'autres sites afin de savoir qui utilise illégalement du contenu issu de mes sites et/ou de mes référentiels.
6. J'ai limité le nombre de pages visitées par adresse IP et par heure à ce qu'un humain ferait normalement.
7. J'ai retiré le chinois mandarin de la liste des langues prises en charge.
8. J'avais déjà entraîné mes propres chatbots à traiter les questions suspectes, mais je surveille désormais aussi les questions et les réponses, y compris l'origine des questions. Je cherche à présent comment exploiter ces informations, par exemple pour une mise sur liste noire en temps réel.

La bonne nouvelle : cela a fonctionné. Le nombre de robots d'exploration malveillants qui visitent mon site a fortement diminué, mais le nombre de pages vues aussi.

La mauvaise nouvelle, c'est que les plateformes d'IA chinoises qui explorent Internet et mettent ces informations à disposition « as a Service » ne voient très probablement plus le contenu de mes sites (si elles sont éthiques). Leurs clients ne voient pas non plus mes sites.

L'IA A DONC APPORTÉ DE NOUVELLES OPPORTUNITÉS, MAIS AUSSI DE NOUVEAUX QUESTIONNEMENTS ET DE NOUVEAUX CHOIX...
