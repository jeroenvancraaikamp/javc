// The Statistics menu (src/layouts/Base.astro, only shown when signed in to the CMS) and its pages (src/views/Stats.astro).
export const STATS_MENU = {
  en: { chats: 'Chat conversations', label: 'Statistics', site: 'Page/visitor statistics', visits: 'Visits (page paths)', security: 'Hack attempts', changes: 'Site changes', contacts: 'Contact requests', subscribers: 'IT4IT Atlas subscribers' },
  nl: { chats: 'Chatgesprekken', label: 'Statistieken', site: 'Pagina-/bezoekersstatistieken', visits: 'Bezoeken (paginapaden)', security: 'Hackpogingen', changes: 'Wijzigingen aan de site', contacts: 'Contactaanvragen', subscribers: 'Abonnees IT4IT Atlas' },
  cn: { chats: '聊天记录', label: '统计', site: '页面/访客统计', visits: '访问（页面路径）', security: '入侵尝试', changes: '网站更改', contacts: '联系请求', subscribers: 'IT4IT Atlas 订阅者' },
  fr: { chats: 'Conversations du chatbot', label: 'Statistiques', site: 'Statistiques pages/visiteurs', visits: 'Visites (parcours)', security: 'Tentatives de piratage', changes: 'Modifications du site', contacts: 'Demandes de contact', subscribers: 'Abonnés IT4IT Atlas' },
  de: { chats: 'Chatverläufe', label: 'Statistiken', site: 'Seiten-/Besucherstatistiken', visits: 'Besuche (Seitenpfade)', security: 'Hackversuche', changes: 'Änderungen an der Website', contacts: 'Kontaktanfragen', subscribers: 'IT4IT-Atlas-Abonnenten' },
};
export const STATS_PARTS = [
  { part: 'site', path: '/stats/' },
  { part: 'visits', path: '/stats/visits/' },
  { part: 'security', path: '/stats/security/' },
  { part: 'chats', path: '/stats/chats/' },
  { part: 'changes', path: '/stats/changes/' },
  { part: 'contacts', path: '/stats/contacts/' },
  { part: 'subscribers', path: '/stats/subscribers/' },
] as const;
