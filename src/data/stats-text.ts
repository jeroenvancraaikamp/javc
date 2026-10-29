// The Statistics menu (src/layouts/Base.astro, only shown when signed in to the CMS) and its four pages (src/views/Stats.astro).
export const STATS_MENU = {
  en: { label: 'Statistics', site: 'Page/visitor statistics', changes: 'Site changes', contacts: 'Contact requests', subscribers: 'IT4IT Atlas subscribers' },
  nl: { label: 'Statistieken', site: 'Pagina-/bezoekersstatistieken', changes: 'Wijzigingen aan de site', contacts: 'Contactaanvragen', subscribers: 'Abonnees IT4IT Atlas' },
  cn: { label: '统计', site: '页面/访客统计', changes: '网站更改', contacts: '联系请求', subscribers: 'IT4IT Atlas 订阅者' },
  fr: { label: 'Statistiques', site: 'Statistiques pages/visiteurs', changes: 'Modifications du site', contacts: 'Demandes de contact', subscribers: 'Abonnés IT4IT Atlas' },
  de: { label: 'Statistiken', site: 'Seiten-/Besucherstatistiken', changes: 'Änderungen an der Website', contacts: 'Kontaktanfragen', subscribers: 'IT4IT-Atlas-Abonnenten' },
};
export const STATS_PARTS = [
  { part: 'site', path: '/stats/' },
  { part: 'changes', path: '/stats/changes/' },
  { part: 'contacts', path: '/stats/contacts/' },
  { part: 'subscribers', path: '/stats/subscribers/' },
] as const;
