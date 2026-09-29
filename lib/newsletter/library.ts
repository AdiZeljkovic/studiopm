/**
 * Image library offered in the newsletter editor.
 *
 * - "unsplash:<id>" entries come from the client's Unsplash collection
 *   https://unsplash.com/collections/FA6LoMnzhog/Site-internet
 * - Paths starting with "/" are files in /public (real PortMix work).
 *
 * Any other absolute https URL can also be used in the editor.
 */
export interface LibraryImage {
  id: string;
  alt: string;
}

export const imageLibrary: LibraryImage[] = [
  { id: "/images/portmix/prilly-entrance-door.jpg", alt: "Porte d’entrée en chêne, Immeuble Prilly (réalisation PortMix)" },
  { id: "/images/portmix/prilly-door-frame-detail.jpg", alt: "Détail d’un encadrement de porte en chêne avec éclairage (réalisation PortMix)" },
  { id: "/images/portmix/prilly-window-joinery.jpg", alt: "Encadrement de fenêtre en chêne et cuisine, Immeuble Prilly (réalisation PortMix)" },
  { id: "unsplash:1682418460531-251ac2b522fe", alt: "une salle de bain avec du parquet et des toilettes blanches" },
  { id: "unsplash:1682418460512-5bfa99dd185f", alt: "une chambre avec une table, des chaises et un micro-ondes" },
  { id: "unsplash:1682418460503-fe7ee0513023", alt: "une armoire blanche avec des boutons noirs et un coussin vert" },
  { id: "unsplash:1781249144509-b275faf929f1", alt: "Salon moderne à aire ouverte avec accès au balcon" },
  { id: "unsplash:1781249144394-c2b5075ebb10", alt: "Intérieur moderne avec des étagères en bois, de l’art abstrait et un plan de travail sombre" },
  { id: "unsplash:1772442364639-20fe5e5438a1", alt: "La lumière du soleil traverse une salle à manger moderne avec des chaises en bois" },
  { id: "unsplash:1682418460489-46ae0ae7617a", alt: "une table blanche avec des points noirs dessus" },
  { id: "unsplash:1682418460530-e44b20890394", alt: "un bureau avec une chaise et une photo dessus" },
  { id: "unsplash:1682418460590-3a0105848ea2", alt: "une chambre avec un plancher en bois et des murs blancs" },
  { id: "unsplash:1781249144411-e6495e75e889", alt: "Salon moderne avec canapé gris, fauteuil rouge et fenêtre" },
  { id: "unsplash:1781249144372-e76e32526473", alt: "Salon moderne avec canapé, table basse et livre ouvert" },
  { id: "unsplash:1781249144237-1946dd3e0389", alt: "Cuisine moderne avec placards en bois et plans de travail gris tachetés" },
  { id: "unsplash:1781249144562-e15ab4c9f63c", alt: "Cuisine et salon lumineux et modernes avec vue sur l’extérieur" },
  { id: "unsplash:1682418460517-8e6054093618", alt: "une table blanche avec des cercles noirs dessus" },
  { id: "unsplash:1682418460684-673bb7293f65", alt: "un salon avec un canapé une table et des chaises" },
  { id: "unsplash:1781249144049-dc1f8a2f5292", alt: "Salon élégant avec canapé, fenêtre et lampe pendante ronde" },
  { id: "unsplash:1781249144275-c04daed37031", alt: "Cuisine moderne avec des placards en bois foncé et des plans de travail tachetés" },
  { id: "unsplash:1781249144368-e8e1c457482a", alt: "Salon moderne lumineux avec cuisine, bar et canapé" },
  { id: "unsplash:1781249144484-f5969c55e54e", alt: "Salon d’appartement moderne et ensoleillé avec balcon et plan de travail de cuisine" },
  { id: "unsplash:1781249144295-ee94376e47c2", alt: "Espace de vie contemporain avec un canapé et un plan de travail en pierre" },
  { id: "unsplash:1781249144235-7dff19f6e7db", alt: "Chambre moderne avec lit, armoire blanche et fenêtre" },
  { id: "unsplash:1760072513357-9d450e935a80", alt: "Salon moderne avec une grande étagère et des sièges confortables" },
  { id: "unsplash:1780257562925-d78de6cb6612", alt: "Intérieur élégant avec un fauteuil, une lampe ronde et des étagères remplies" },
  { id: "unsplash:1785873232027-ace4e4d3c9be", alt: "Espace de vie moderne avec bibliothèque en bois, table à manger et chaises" },
  { id: "unsplash:1787676560679-c6aefbac8767", alt: "Objets décoratifs et livres sur des étagères noires à côté d’une cheminée en marbre avec du bois de chauffage" },
  { id: "unsplash:1772567732993-c63fd77fa40b", alt: "Étagère moderne avec objets décoratifs et vases" },
  { id: "unsplash:1769690398694-9c5d5ca4b4ea", alt: "Chambre moderne avec grande armoire blanche et commode" },
  { id: "unsplash:1762545112336-646c69e4888b", alt: "Salon moderne avec cheminée et vue sur la forêt" },
  { id: "unsplash:1664638413509-6aa486866f9a", alt: "une personne écrivant sur papier" },
  { id: "unsplash:1680007889201-114ac772447d", alt: "un salon rempli de meubles et beaucoup de fenêtres" },
  { id: "unsplash:1781249144459-0a9ce5bbf77d", alt: "Espace de vie moderne et chaleureux avec canapé, fauteuil et lumière naturelle" },
  { id: "unsplash:1765371512707-9e0e96fd9e5b", alt: "Pièce moderne avec boiseries et grandes fenêtres" },
  { id: "unsplash:1765371512974-6fa510537d21", alt: "Décoré des étagères avec des livres, des œuvres d’art et des sculptures" },
  { id: "unsplash:1789132782814-283f7c851b1d", alt: "Une chambre moderne avec un bureau noir intégré et un lit avec une literie beige" },
  { id: "unsplash:1765371513189-44702dcee4be", alt: "Armoire en bois avec objets décoratifs sur une étagère" },
  { id: "unsplash:1765371513765-d2b624850162", alt: "Étagères en bois avec des livres et des objets d’art" },
  { id: "unsplash:1785535694900-b8199f0494be", alt: "Cuisine moderne avec îlot, quatre tabourets de bar et éclairage élégant" },
  { id: "unsplash:1765862835260-47843a7bba45", alt: "Chambre moderne avec un grand lit et une décoration minimaliste" },
  { id: "unsplash:1648536474504-7bbf8a1ee3ab", alt: "un salon avec un canapé et une cheminée" },
  { id: "unsplash:1737898378296-94dc316cd443", alt: "Une salle à manger avec une table et des chaises" },
  { id: "unsplash:1781249144182-b79f4a1d6a3a", alt: "Chambre moderne avec armoire, fenêtre et lit blancs" },
  { id: "unsplash:1790213680302-0a7f81115a45", alt: "Une chambre moderne avec un lit gris, un mur en béton et des étagères éclairées" },
  { id: "unsplash:1765371513044-33423dd85c25", alt: "Des étagères en bois avec des livres et des têtes décoratives" },
  { id: "unsplash:1761330439781-7919703f17ef", alt: "Cave à vin moderne avec éléments décoratifs" },
  { id: "unsplash:1780257563050-0ee78acfeee8", alt: "Étagère noire élégante avec éclairage d’accent et décorations variées" },
  { id: "unsplash:1781370764345-89b32df4705a", alt: "Chambre minimaliste moderne avec vue sur la ville, pouf et bureau" },
  { id: "unsplash:1758565811352-a439bd6f956e", alt: "Îlot de cuisine moderne avec coin repas et plafond en béton" },
  { id: "unsplash:1721630175454-0ca4517bb530", alt: "Un salon avec un canapé blanc et un vase de fleurs" },
];
