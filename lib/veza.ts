/** Link koji vodi van sajta (upisan u panelu, npr. https://…, mailto:). */
export const vanjska = (href: string) => /^(https?:|mailto:|tel:)/i.test(href.trim());

/**
 * Adresa linka iz menija/podnožja: sekcija („#contact") i stranica („/privacy") dobijaju
 * jezik ispred; vanjski link ostaje kakav je.
 */
export function putanja(locale: string, href: string) {
  const h = href.trim();
  if (vanjska(h)) return h;
  return `/${locale}${h.startsWith("#") || h.startsWith("/") ? h : `/${h}`}`;
}
