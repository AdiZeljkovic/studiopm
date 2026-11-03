/**
 * Ograničenje broja zahtjeva po IP adresi (u memoriji — dovoljno za jedan kontejner).
 * Cloudflare → Traefik (kao portmix.ch): posjetilac je u cf-connecting-ip, inače adresa konekcije.
 */
export function ogranicenje(limit: number, prozor: number) {
  const nedavni = new Map<string, number[]>();
  return function previse(req: Request) {
    const ip =
      req.headers.get("cf-connecting-ip") ||
      req.headers.get("x-real-ip") ||
      req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
      "nepoznata";
    const sad = Date.now();
    if (nedavni.size > 2000) for (const [k, l] of nedavni) if (l.every((t) => sad - t >= prozor)) nedavni.delete(k);
    const lista = (nedavni.get(ip) ?? []).filter((t) => sad - t < prozor);
    lista.push(sad);
    nedavni.set(ip, lista);
    return lista.length > limit;
  };
}
