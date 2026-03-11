// Centralized Unsplash image registry
// All images are sourced from Unsplash (unsplash.com) — free for commercial use

const BASE = "https://images.unsplash.com";

export const IMAGES = {
  hero: {
    homepage: `${BASE}/photo-1600585152220-90363fe7e115?w=1920&q=85&auto=format&fit=crop`,
    about: `${BASE}/photo-1541123437800-1bb1317badc2?w=1920&q=85&auto=format&fit=crop`,
    materials: `${BASE}/photo-1558618666-fcd25c85cd64?w=1920&q=85&auto=format&fit=crop`,
    projects: `${BASE}/photo-1600566753376-12c8ab7fb75b?w=1920&q=85&auto=format&fit=crop`,
    contact: `${BASE}/photo-1600573472592-401b489a3cdc?w=1920&q=85&auto=format&fit=crop`,
  },
  materials: {
    carrara: `${BASE}/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop`,
    nero_etrusco: `${BASE}/photo-1618220252344-8ec99ec624b1?w=800&q=80&auto=format&fit=crop`,
    intrigo: `${BASE}/photo-1577720643272-265f09367456?w=800&q=80&auto=format&fit=crop`,
    bianco_vietnamita: `${BASE}/photo-1566665797739-1674de7a421a?w=800&q=80&auto=format&fit=crop`,
    silver_quartzite: `${BASE}/photo-1584622650111-993a426fbf0a?w=800&q=80&auto=format&fit=crop`,
    black_granite: `${BASE}/photo-1619642751034-765dfdf7c58e?w=800&q=80&auto=format&fit=crop`,
    honey_onyx: `${BASE}/photo-1615529328331-f8917597711f?w=800&q=80&auto=format&fit=crop`,
    travertino_romano: `${BASE}/photo-1594818379496-da1e345b0ded?w=800&q=80&auto=format&fit=crop`,
  },
  projects: {
    p1: `${BASE}/photo-1600566752355-35792bedcfea?w=1200&q=80&auto=format&fit=crop`,
    p2: `${BASE}/photo-1567016376408-0226e4d0c1ea?w=1200&q=80&auto=format&fit=crop`,
    p3: `${BASE}/photo-1616486338812-3dadae4b4ace?w=1200&q=80&auto=format&fit=crop`,
    p4: `${BASE}/photo-1618219908412-a29a1bb7b86e?w=1200&q=80&auto=format&fit=crop`,
    p5: `${BASE}/photo-1600607687939-ce8a6c25118c?w=1200&q=80&auto=format&fit=crop`,
    p6: `${BASE}/photo-1631049307264-da0ec9d70304?w=1200&q=80&auto=format&fit=crop`,
    p7: `${BASE}/photo-1582268611958-ebfd161ef9cf?w=1200&q=80&auto=format&fit=crop`,
    p8: `${BASE}/photo-1613545325278-f24b0cae1224?w=1200&q=80&auto=format&fit=crop`,
    p9: `${BASE}/photo-1600210491369-e753d80a41f3?w=1200&q=80&auto=format&fit=crop`,
  },
  about: {
    teaser: `${BASE}/photo-1617791160536-598cf32026fb?w=1200&q=80&auto=format&fit=crop`,
    facility: `${BASE}/photo-1565193566173-7a0ee3dbe261?w=1920&q=85&auto=format&fit=crop`,
    workshop: `${BASE}/photo-1600566753086-00f18fb6b3ea?w=1200&q=80&auto=format&fit=crop`,
  },
  finishes: {
    cannettato: `${BASE}/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop`,
    rigato: `${BASE}/photo-1600585152220-90363fe7e115?w=600&q=80&auto=format&fit=crop`,
    spazzolato: `${BASE}/photo-1566665797739-1674de7a421a?w=600&q=80&auto=format&fit=crop`,
  },
};
