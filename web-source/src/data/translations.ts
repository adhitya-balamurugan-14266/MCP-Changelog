export type Lang = 'en' | 'es';

export const UI = {
  en: {
    // Header
    title: "What's New in Zoho MCP",
    subtitle: 'A running log of everything new, improved, and shipped across Zoho\u00a0MCP.',
    searchPlaceholder: 'Search releases, services, tools…',
    goToConsole: 'Go To MCP Console',
    goToHelpDocs: 'Go To Help Docs',
    // Sidebar / Filters
    resetAll: 'Reset all',
    month: 'Month',
    services: 'Services',
    dataCenter: 'Data Center',
    clear: 'Clear',
    // Category tabs
    all: 'All',
    // Back to top
    backToTop: 'Back to top',
    // Empty state
    noReleases: 'No releases found',
    // DC labels
    dcAll: 'All DCs',
    dcUS: 'United States',
    dcEU: 'Europe',
    dcIN: 'India',
    dcAU: 'Australia',
    dcJP: 'Japan',
    dcCN: 'China',
    dcCA: 'Canada',
    dcSA: 'Saudi Arabia',
    // Month abbreviations (match CALENDAR_MONTHS labels exactly)
    Jan: 'Jan', Feb: 'Feb', Mar: 'Mar', Apr: 'Apr',
    May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Aug',
    Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dec',
  },
  es: {
    title: 'Novedades en Zoho MCP',
    subtitle: 'Un registro actualizado de todo lo nuevo, mejorado y lanzado en Zoho\u00a0MCP.',
    searchPlaceholder: 'Buscar versiones, servicios, herramientas…',
    goToConsole: 'Ir a la consola MCP',
    goToHelpDocs: 'Documentación',
    resetAll: 'Reiniciar todo',
    month: 'Mes',
    services: 'Servicios',
    dataCenter: 'Centro de datos',
    clear: 'Limpiar',
    all: 'Todo',
    backToTop: 'Volver arriba',
    noReleases: 'No se encontraron versiones',
    dcAll: 'Todos los DC',
    dcUS: 'Estados Unidos',
    dcEU: 'Europa',
    dcIN: 'India',
    dcAU: 'Australia',
    dcJP: 'Japón',
    dcCN: 'China',
    dcCA: 'Canadá',
    dcSA: 'Arabia Saudita',
    Jan: 'Ene', Feb: 'Feb', Mar: 'Mar', Apr: 'Abr',
    May: 'May', Jun: 'Jun', Jul: 'Jul', Aug: 'Ago',
    Sep: 'Sep', Oct: 'Oct', Nov: 'Nov', Dec: 'Dic',
  },
} as const;

export type TranslationKey = keyof typeof UI.en;

export function t(lang: Lang, key: TranslationKey): string {
  return (UI[lang] as Record<string, string>)[key] ?? UI.en[key];
}
