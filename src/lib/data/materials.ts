import { Material } from "@/types/material";
import { IMAGES } from "@/lib/unsplash";

export const materials: Material[] = [
  {
    slug: "carrara-marble",
    name: "Carrara Marble",
    nameIt: "Marmo di Carrara",
    category: "marble",
    origin: "Carrara, Tuscany — Italy",
    description:
      "The most celebrated marble in the world, quarried from the Apuan Alps just kilometres from our facility. Carrara marble's iconic white base and delicate grey veining have defined classical beauty for centuries — from Michelangelo's sculptures to the world's most prestigious interiors.",
    descriptionIt:
      "Il marmo più celebre al mondo, estratto dalle Alpi Apuane a pochi chilometri dal nostro stabilimento. La base bianca iconica del marmo di Carrara con le sue delicate venature grigie ha definito la bellezza classica per secoli — dalle sculture di Michelangelo agli interni più prestigiosi al mondo.",
    image: IMAGES.materials.carrara,
    finishes: ["polished", "honed", "spazzolato"],
    uses: ["Flooring", "Wall cladding", "Countertops", "Sculpture"],
    usesIt: ["Pavimentazione", "Rivestimenti", "Piani di lavoro", "Scultura"],
  },
  {
    slug: "nero-etrusco",
    name: "Nero Etrusco",
    nameIt: "Nero Etrusco",
    category: "marble",
    origin: "Tuscany — Italy",
    description:
      "An exclusive Tirrenia Marmi material. Nero Etrusco is a deep, dramatic black marble with subtle golden veining. Its name evokes the ancient Etruscan civilisation that once flourished across this very land — a stone as bold and enduring as the culture it honours.",
    descriptionIt:
      "Un materiale esclusivo Tirrenia Marmi. Il Nero Etrusco è un marmo nero profondo e scenografico con sottili venature dorate. Il suo nome evoca l'antica civiltà etrusca che un tempo fioriva su questa terra — una pietra audace e duratura come la cultura che onora.",
    image: IMAGES.materials.nero_etrusco,
    finishes: ["polished", "honed", "cannettato"],
    uses: ["Feature walls", "Flooring", "Furniture", "Facades"],
    usesIt: [
      "Pareti di pregio",
      "Pavimentazione",
      "Arredamento",
      "Facciate",
    ],
    exclusive: true,
  },
  {
    slug: "intrigo",
    name: "Intrigo",
    nameIt: "Intrigo",
    category: "marble",
    origin: "Exclusive Collection",
    description:
      "A contemporary marble of exceptional character. Intrigo features complex, interwoven veining in warm tones of cream, taupe and grey — creating surfaces that are at once ancient and wholly modern. Available exclusively through Tirrenia Marmi.",
    descriptionIt:
      "Un marmo contemporaneo di carattere eccezionale. L'Intrigo presenta venature complesse e intrecciate in toni caldi di crema, talpa e grigio — creando superfici allo stesso tempo antiche e completamente moderne. Disponibile esclusivamente tramite Tirrenia Marmi.",
    image: IMAGES.materials.intrigo,
    finishes: ["polished", "honed", "spazzolato"],
    uses: ["Statement walls", "Countertops", "Bespoke interiors"],
    usesIt: ["Pareti scenografiche", "Piani di lavoro", "Interni su misura"],
    exclusive: true,
  },
  {
    slug: "bianco-vietnamita",
    name: "Bianco Vietnamita",
    nameIt: "Bianco Vietnamita",
    category: "marble",
    origin: "Vietnam",
    description:
      "A pure, uniform white marble of remarkable consistency. Bianco Vietnamita offers a clean, minimal aesthetic with almost no visible veining — perfect for contemporary projects demanding absolute purity of surface.",
    descriptionIt:
      "Un marmo bianco puro e uniforme di straordinaria consistenza. Il Bianco Vietnamita offre un'estetica pulita e minimalista con veniture quasi invisibili — perfetto per progetti contemporanei che richiedono assoluta purezza della superficie.",
    image: IMAGES.materials.bianco_vietnamita,
    finishes: ["polished", "honed"],
    uses: ["Minimalist interiors", "Bathrooms", "Facades", "Flooring"],
    usesIt: ["Interni minimalisti", "Bagni", "Facciate", "Pavimentazione"],
    exclusive: true,
  },
  {
    slug: "silver-quartzite",
    name: "Silver Quartzite",
    nameIt: "Quarzite Silver",
    category: "quartzite",
    origin: "Minas Gerais — Brazil",
    description:
      "A premium quartzite with a silvery-white base and intricate metallic veining. Harder and more durable than marble, Silver Quartzite is ideal for high-traffic applications and exterior cladding while retaining the elegance of natural stone.",
    descriptionIt:
      "Una quarzite pregiata con base bianco-argento e venature metalliche intricate. Più dura e resistente del marmo, la Quarzite Silver è ideale per applicazioni ad alto traffico e rivestimenti esterni mantenendo l'eleganza della pietra naturale.",
    image: IMAGES.materials.silver_quartzite,
    finishes: ["polished", "honed", "spazzolato"],
    uses: ["Exterior cladding", "Kitchen countertops", "High-traffic floors"],
    usesIt: [
      "Rivestimenti esterni",
      "Piani cucina",
      "Pavimenti ad alto traffico",
    ],
  },
  {
    slug: "black-granite",
    name: "Absolute Black Granite",
    nameIt: "Granito Absolute Black",
    category: "granite",
    origin: "Karnataka — India",
    description:
      "The definitive black stone: pure, deep, and completely uniform. Absolute Black Granite has no visible grain or variation — a pure black surface of extraordinary density and permanence, polished to a mirror-like finish.",
    descriptionIt:
      "La pietra nera definitiva: pura, profonda e completamente uniforme. Il Granito Absolute Black non presenta grani o variazioni visibili — una superficie nera pura di straordinaria densità e permanenza, lucidata a specchio.",
    image: IMAGES.materials.black_granite,
    finishes: ["polished", "honed", "rigato"],
    uses: ["Feature elements", "Kitchen tops", "External paving"],
    usesIt: [
      "Elementi di pregio",
      "Piani cucina",
      "Pavimentazione esterna",
    ],
  },
  {
    slug: "honey-onyx",
    name: "Honey Onyx",
    nameIt: "Onice Miele",
    category: "onyx",
    origin: "Iran / Turkey",
    description:
      "A translucent stone of extraordinary warmth. When backlit, Honey Onyx reveals a breathtaking amber glow — layers of warm gold and cream that seem to radiate from within. Reserved for the most special applications.",
    descriptionIt:
      "Una pietra traslucente di straordinario calore. Quando retroilluminato, l'Onice Miele rivela un mozzafiato bagliore ambrato — strati di oro caldo e crema che sembrano irradiare dall'interno. Riservata per le applicazioni più speciali.",
    image: IMAGES.materials.honey_onyx,
    finishes: ["polished"],
    uses: ["Backlit panels", "Reception desks", "Feature walls", "Bars"],
    usesIt: [
      "Pannelli retroilluminati",
      "Banchi reception",
      "Pareti di pregio",
      "Bar",
    ],
  },
  {
    slug: "travertino-romano",
    name: "Roman Travertine",
    nameIt: "Travertino Romano",
    category: "travertine",
    origin: "Tivoli, Lazio — Italy",
    description:
      "The timeless stone of Rome. Roman Travertine's characteristic warm beige tone and natural porous surface have shaped the greatest architectural works in history — from the Colosseum to contemporary landmark buildings.",
    descriptionIt:
      "La pietra senza tempo di Roma. Il Travertino Romano con il suo caratteristico tono beige caldo e la superficie naturalmente porosa ha dato forma alle più grandi opere architettoniche della storia — dal Colosseo agli edifici contemporanei di maggior rilievo.",
    image: IMAGES.materials.travertino_romano,
    finishes: ["honed", "spazzolato", "polished"],
    uses: ["Architecture", "Flooring", "Wall cladding", "Landscaping"],
    usesIt: [
      "Architettura",
      "Pavimentazione",
      "Rivestimenti",
      "Paesaggistica",
    ],
  },
];
