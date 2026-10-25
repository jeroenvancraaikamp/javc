// The site in two languages: English on the plain addresses (/skills/), Dutch under /nl/ (/nl/skills/).
export type Lang = 'en' | 'nl';
export const LANGS: Lang[] = ['en', 'nl'];
export const other = (lang: Lang): Lang => (lang === 'en' ? 'nl' : 'en');

// Address of a site path in a language: url('nl', '/skills/') → '/nl/skills/'. Other links are left alone.
export const url = (lang: Lang, path: string) =>
  lang === 'nl' && path.startsWith('/') && !path.startsWith('/nl/') && !path.startsWith('//') ? `/nl${path}` : path;

// The language of a path, and the same path in the other language (for the NL | EN switch).
export const langOf = (path: string): Lang => (path === '/nl' || path.startsWith('/nl/') ? 'nl' : 'en');
export const switchPath = (path: string) =>
  langOf(path) === 'nl' ? path.replace(/^\/nl(?=\/|$)/, '') || '/' : `/nl${path}`;

export const locale = { en: 'en-GB', nl: 'nl-NL' } as const;

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
    translatedFrom: 'This text was translated from Dutch.',
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
    translatedFrom: 'Deze tekst is vertaald uit het Engels.',
    readOriginal: 'Lees het origineel',
    legalNote: 'Dit is een vertaling van het Engelse origineel. Bij verschil in uitleg is de Engelse tekst leidend.',
    legalOriginal: 'Lees het Engelse origineel',
  },
};
export const t = (lang: Lang) => STRINGS[lang];

// Category names shown on the site; the name itself (and its address) stays the same in both languages.
const CATEGORY_NL: Record<string, string> = { Uncategorized: 'Overig' };
export const categoryName = (name: string, lang: Lang) => (lang === 'nl' && CATEGORY_NL[name]) || name;
