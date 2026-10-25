// The site in three languages: English on the plain addresses (/skills/), Dutch under /nl/ (/nl/skills/)
// and Simplified Chinese under /zh/ (/zh/skills/).
export type Lang = 'en' | 'nl' | 'zh';
export const LANGS: Lang[] = ['en', 'nl', 'zh'];
const PREFIX = /^\/(nl|zh)(?=\/|$)/;

// The language of a path, and the path without its language part: '/zh/skills/' → 'zh', '/skills/'.
export const langOf = (path: string): Lang => (path.match(PREFIX)?.[1] as Lang) ?? 'en';
export const basePath = (path: string) => path.replace(PREFIX, '') || '/';

// Address of a site path in a language: url('nl', '/skills/') → '/nl/skills/'. Other links are left alone.
export const url = (lang: Lang, path: string) =>
  !path.startsWith('/') || path.startsWith('//') ? path : lang === 'en' ? basePath(path) : `/${lang}${basePath(path)}`;

export const locale = { en: 'en-GB', nl: 'nl-NL', zh: 'zh-CN' } as const;
// Name of each language in its own language, for the flags.
export const LANG_LABEL = { en: 'English', nl: 'Nederlands', zh: '简体中文' } as const;

// "Translated from ..." in the language of the page.
const FROM = {
  en: { en: 'English', nl: 'Dutch', zh: 'Chinese' },
  nl: { en: 'het Engels', nl: 'het Nederlands', zh: 'het Chinees' },
  zh: { en: '英文', nl: '荷兰语', zh: '中文' },
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
  zh: {
    description: 'Jeroen van Craaikamp 的 IT 管理与咨询服务。',
    skip: '跳到正文',
    menu: '菜单',
    articles: '文章/出版物',
    contact: '联系我',
    privacy: '隐私政策',
    terms: '条款与条件',
    toTop: '返回顶部',
    search: '搜索',
    searchFor: '搜索：',
    searchPh: '搜索…',
    searchArticlesPh: '搜索文章…',
    searchResults: '搜索结果',
    popular: '热门',
    recent: '最新',
    categories: '分类',
    archives: '归档',
    category: '分类',
    archive: '归档',
    by: '作者',
    readMore: '阅读全文',
    minRead: '分钟阅读',
    related: '相关文章',
    discuss: '在 LinkedIn 上讨论这篇文章',
    prev: '上一篇',
    next: '下一篇',
    prevPage: '上一页',
    nextPage: '下一页',
    pagination: '分页',
    translatedFrom: (from: Lang) => `本文译自${FROM.zh[from]}。`,
    readOriginal: '阅读原文',
    legalNote: '本文为荷兰语原文的中文译本。如有任何解释上的差异，以荷兰语文本为准。',
    legalOriginal: '阅读荷兰语原文',
  },
};
export const t = (lang: Lang) => STRINGS[lang];

// Category names shown on the site; the name itself (and its address) stays the same in both languages.
const CATEGORY_NAMES: Partial<Record<Lang, Record<string, string>>> = { nl: { Uncategorized: 'Overig' }, zh: { Uncategorized: '其他' } };
export const categoryName = (name: string, lang: Lang) => CATEGORY_NAMES[lang]?.[name] || name;
