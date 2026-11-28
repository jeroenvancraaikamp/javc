// The site in four languages: English on the plain addresses (/skills/); Dutch, French and German
// under /nl/, /fr/ and /de/ (/nl/skills/ and so on).
export type Lang = 'en' | 'nl' | 'fr' | 'de';
export const LANGS: Lang[] = ['en', 'nl', 'fr', 'de'];
const PREFIX = /^\/(nl|fr|de)(?=\/|$)/;

// The language of a path, and the path without its language part: '/nl/skills/' → 'nl', '/skills/'.
export const langOf = (path: string): Lang => (path.match(PREFIX)?.[1] as Lang) ?? 'en';
export const basePath = (path: string) => path.replace(PREFIX, '') || '/';

// Address of a site path in a language: url('nl', '/skills/') → '/nl/skills/'. Other links are left alone.
export const url = (lang: Lang, path: string) =>
  !path.startsWith('/') || path.startsWith('//') ? path : lang === 'en' ? basePath(path) : `/${lang}${basePath(path)}`;

export const locale = { en: 'en-GB', nl: 'nl-NL', fr: 'fr-FR', de: 'de-DE' } as const;
// Language code for hreflang and lang attributes.
export const hreflang = (l: Lang) => l;
// Name of each language in its own language, for the flags.
export const LANG_LABEL = { en: 'English', nl: 'Nederlands', fr: 'Français', de: 'Deutsch' } as const;

// "Translated from ..." in the language of the page.
const FROM = {
  en: { en: 'English', nl: 'Dutch', fr: 'French', de: 'German' },
  nl: { en: 'het Engels', nl: 'het Nederlands', fr: 'het Frans', de: 'het Duits' },
  fr: { en: "l'anglais", nl: 'le néerlandais', fr: 'le français', de: "l'allemand" },
  de: { en: 'dem Englischen', nl: 'dem Niederländischen', fr: 'dem Französischen', de: 'dem Deutschen' },
};

const STRINGS = {
  en: {
    description: 'IT management and consultancy by Jeroen van Craaikamp.',
    skip: 'Skip to content',
    menu: 'Menu',
    articles: 'Articles/Publications',
    contact: 'Contact me',
    privacy: 'Privacy policy',
    terms: 'Terms & Conditions',
    toTop: 'Go to Top',
    search: 'Search',
    searchFor: 'Search for:',
    searchPh: 'Search...',
    searchArticlesPh: 'Search articles...',
    searchResults: 'Search results',
    popular: 'Popular',
    recent: 'Recent',
    categories: 'Categories',
    archives: 'Archives',
    category: 'Category',
    archive: 'Archive',
    by: 'By',
    readMore: 'Read More',
    minRead: 'min read',
    related: 'Related Posts',
    discuss: 'Discuss this article on LinkedIn',
    prev: 'Previous',
    next: 'Next',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    pagination: 'Pagination',
    translatedFrom: (from: Lang) => `This text was translated from ${FROM.en[from]}.`,
    readOriginal: 'Read the original',
    legalNote: 'This is an English translation of the Dutch original. In case of any difference in interpretation, the Dutch text prevails.',
    legalOriginal: 'Read the Dutch original',
  },
  nl: {
    description: 'IT-management en consultancy door Jeroen van Craaikamp.',
    skip: 'Naar de inhoud',
    menu: 'Menu',
    articles: 'Artikelen/Publicaties',
    contact: 'Contact',
    privacy: 'Privacybeleid',
    terms: 'Algemene voorwaarden',
    toTop: 'Naar boven',
    search: 'Zoeken',
    searchFor: 'Zoeken naar:',
    searchPh: 'Zoeken...',
    searchArticlesPh: 'Zoek in artikelen...',
    searchResults: 'Zoekresultaten',
    popular: 'Populair',
    recent: 'Recent',
    categories: 'Categorieën',
    archives: 'Archief',
    category: 'Categorie',
    archive: 'Archief',
    by: 'Door',
    readMore: 'Lees meer',
    minRead: 'min lezen',
    related: 'Gerelateerde artikelen',
    discuss: 'Bespreek dit artikel op LinkedIn',
    prev: 'Vorige',
    next: 'Volgende',
    prevPage: 'Vorige pagina',
    nextPage: 'Volgende pagina',
    pagination: 'Paginering',
    translatedFrom: (from: Lang) => `Deze tekst is vertaald uit ${FROM.nl[from]}.`,
    readOriginal: 'Lees het origineel',
    legalNote: 'Dit is een vertaling van het Engelse origineel. Bij verschil in uitleg is de Engelse tekst leidend.',
    legalOriginal: 'Lees het Engelse origineel',
  },
  fr: {
    description: 'Gestion et conseil en informatique par Jeroen van Craaikamp.',
    skip: 'Aller au contenu',
    menu: 'Menu',
    articles: 'Articles/Publications',
    contact: 'Contact',
    privacy: 'Politique de confidentialité',
    terms: 'Conditions générales',
    toTop: 'Haut de page',
    search: 'Rechercher',
    searchFor: 'Rechercher :',
    searchPh: 'Rechercher…',
    searchArticlesPh: 'Rechercher des articles…',
    searchResults: 'Résultats de recherche',
    popular: 'Populaires',
    recent: 'Récents',
    categories: 'Catégories',
    archives: 'Archives',
    category: 'Catégorie',
    archive: 'Archives',
    by: 'Par',
    readMore: 'Lire la suite',
    minRead: 'min de lecture',
    related: 'Articles similaires',
    discuss: 'Discuter de cet article sur LinkedIn',
    prev: 'Précédent',
    next: 'Suivant',
    prevPage: 'Page précédente',
    nextPage: 'Page suivante',
    pagination: 'Pagination',
    translatedFrom: (from: Lang) => `Ce texte a été traduit de ${FROM.fr[from]}.`,
    readOriginal: "Lire l'original",
    legalNote: "Ceci est une traduction française de l'original néerlandais. En cas de divergence d'interprétation, le texte néerlandais prévaut.",
    legalOriginal: "Lire l'original néerlandais",
  },
  de: {
    description: 'IT-Management und Beratung von Jeroen van Craaikamp.',
    skip: 'Zum Inhalt springen',
    menu: 'Menü',
    articles: 'Artikel/Publikationen',
    contact: 'Kontakt',
    privacy: 'Datenschutzerklärung',
    terms: 'Allgemeine Geschäftsbedingungen',
    toTop: 'Nach oben',
    search: 'Suchen',
    searchFor: 'Suchen nach:',
    searchPh: 'Suchen…',
    searchArticlesPh: 'Artikel durchsuchen…',
    searchResults: 'Suchergebnisse',
    popular: 'Beliebt',
    recent: 'Neueste',
    categories: 'Kategorien',
    archives: 'Archiv',
    category: 'Kategorie',
    archive: 'Archiv',
    by: 'Von',
    readMore: 'Weiterlesen',
    minRead: 'Min. Lesezeit',
    related: 'Ähnliche Artikel',
    discuss: 'Diesen Artikel auf LinkedIn diskutieren',
    prev: 'Zurück',
    next: 'Weiter',
    prevPage: 'Vorherige Seite',
    nextPage: 'Nächste Seite',
    pagination: 'Seitennavigation',
    translatedFrom: (from: Lang) => `Dieser Text wurde aus ${FROM.de[from]} übersetzt.`,
    readOriginal: 'Original lesen',
    legalNote: 'Dies ist eine deutsche Übersetzung des niederländischen Originals. Bei Auslegungsunterschieden ist der niederländische Text maßgeblich.',
    legalOriginal: 'Niederländisches Original lesen',
  },
};
export const t = (lang: Lang) => STRINGS[lang];

// Category names shown on the site; the name itself (and its address) stays the same in both languages.
const CATEGORY_NAMES: Partial<Record<Lang, Record<string, string>>> = { nl: { Uncategorized: 'Overig' }, fr: { Uncategorized: 'Divers' }, de: { Uncategorized: 'Sonstiges' } };
export const categoryName = (name: string, lang: Lang) => CATEGORY_NAMES[lang]?.[name] || name;
