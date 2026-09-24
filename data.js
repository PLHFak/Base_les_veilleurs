// Données du dossier « Base monobloc — Les Veilleurs ».
// Ce fichier est le seul à modifier pour mettre le site à jour :
// chaque commit sur GitHub redéploie automatiquement sur Vercel.

window.DATA = {
  version: "0.1",
  date: "24 septembre 2026",

  // ---- Objet -------------------------------------------------------------
  objet: {
    dims: "2 750 × 2 125 × 527 mm",
    volumeFini: "≈ 2,65 m³",
    blocBrut: "≈ 2,9 × 2,3 × 0,6 m ≈ 4 m³ (≈ 10 t en Comblanchien, ~35 % de chute)",
    poidsBase: "6 720 kg (Comblanchien)",
    poidsEnsemble: "≈ 7 300 kg",
    niche: "2 230 × 300 mm, profondeur 450 mm (caisson des 36 blocs cristal 200×100×100)",
    poche: "demi-disque R860 (rose des vents / fond gravé)",
    montants: "2 réservations 50 × 110 mm pour le châssis de l'écran (1 800 × 1 200)",
    plans: [
      { titre: "Base mono bloc V00 — plan coté (J. Miceli, 22-09-26)", fichier: "docs/base_mono_bloc_V00.pdf" },
      { titre: "Ensemble base + écran + cristaux (v01 260922)", fichier: "docs/base_cplt_260922.pdf" },
      { titre: "Variante écran courbe (essai 1)", fichier: "docs/base_cplt_courbe_260922.pdf" }
    ],
    rendu: "img/rendu_260924.jpeg"
  },

  // ---- Filières comparées -------------------------------------------------
  // Estimations HTVA hors pose, à remplacer par les devis reçus.
  filieres: [
    {
      id: "A", nom: "Comblanchien monobloc",
      matiere: "12–18 k€ (4 m³)", faconnage: "15–30 k€", transport: "1,5–3 k€ (10 t)",
      total: "35–50 k€", poids: "≈ 6,7 t", grue: "lourd",
      mer: "excellente (porosité 0,5–6 %)", ancrage: "tenue forte, usinage précis",
      couleur: "non, sauf finition sablée", rendu: "pierre vraie, veinée",
      reparation: "bonne", bloquant: "bloc de 2,3 m d'un seul banc", delai: "8–12 semaines",
      variante2blocs: "−20 à −30 %",
      devis: [{ qui: "à compléter", montant: "" }, { qui: "à compléter", montant: "" }]
    },
    {
      id: "B", nom: "Pierre sable (Massangis / Euville)",
      matiere: "8–12 k€", faconnage: "8–15 k€", transport: "1,5–3 k€",
      total: "25–35 k€", poids: "≈ 5,5–6,2 t", grue: "lourd",
      mer: "moyenne à bonne (porosité 6–21 %)", ancrage: "arêtes fragiles, chevilles à surdimensionner",
      couleur: "oui, naturelle", rendu: "pierre vraie, chaleureuse",
      reparation: "bonne", bloquant: "durabilité côtière à garantir", delai: "6–10 semaines",
      variante2blocs: "−20 à −30 %",
      devis: [{ qui: "à compléter", montant: "" }, { qui: "à compléter", montant: "" }]
    },
    {
      id: "C", nom: "Moule + béton architectonique",
      matiere: "3–6 k€ (UHPC ou GRC)", faconnage: "20–35 k€ (moule 40–50 %)", transport: "—",
      total: "25–45 k€", poids: "1,5–2,5 t", grue: "léger",
      mer: "très bonne en UHPC ; efflorescences possibles", ancrage: "noyés dans la masse (principe déjà retenu)",
      couleur: "oui, à la demande", rendu: "« béton », à valider sur échantillon",
      reparation: "moyenne", bloquant: "acceptation par Eva", delai: "10–14 semaines (moule)",
      variante2blocs: "sans objet",
      devis: [{ qui: "Kunstgiesserei St. Gallen (sept. 2026)", montant: "40 kCHF, pierre reconstituée" }, { qui: "à compléter", montant: "" }]
    }
  ],

  // ---- Sous-traitants -----------------------------------------------------
  // groupe : "bloc" | "usinage" | "beton" | "pilotage"
  // statut : "à contacter" | "contacté" | "devis reçu" | "écarté"
  soustraitants: [
    {
      groupe: "usinage", nom: "Monument Vandekerckhove", pays: "BE", lieu: "Ingelmunster (W-Vl.), ~40 km de Westende",
      site: "https://www.monument-vandekerckhove.be/fr/pierre-naturelle/atelier-de-travail-de-la-pierre-naturelle",
      realisations: "https://www.monument-vandekerckhove.be/fr/pierre-naturelle",
      moyens: "Parc de scies numériques, robots 5 et 6 axes, monowire ; pièces uniques finies à la main ; restauration de monuments (cathédrales, façades) et art.",
      pourquoi: "Le plus proche du site : évite un long transport de la pièce finie (7 t). Capacité 5/6 axes suffisante pour un usinage 2,5D.",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter — voir la page « Atelier de travail de la pierre naturelle »."
    },
    {
      groupe: "bloc", nom: "Carrières de Maffle (Marbrerie de Soignies)", pays: "BE", lieu: "Maffle (Ath) — showroom et atelier ; siège Soignies",
      site: "https://carrieresmaffle.be/",
      realisations: "https://carrieresmaffle.be/blocs-de-stock-en-pierres-de-france/",
      contact: "info@carrieresmaffle.be · +32 68 28 20 49",
      moyens: "Blocs de stock en Massangis, Euville, Savonnières, Semond et Comblanchien ; débit 6 faces sciées pour confrères ; pierre bleue.",
      pourquoi: "Fournisseur belge des pierres de Bourgogne : permet un devis parallèle Comblanchien / Massangis / Euville sans passer par la France.",
      statut: "à contacter",
      photo: "https://carrieresmaffle.be/wp-content/uploads/2022/10/rocamat-massangis-3.jpg",
      photoCredit: "© Carrières de Maffle — réception de blocs de Massangis (Rocamat)",
      photoLegende: "Blocs bruts de Massangis réceptionnés en carrière : l'échelle des blocs disponibles est le premier point à vérifier."
    },
    {
      groupe: "bloc", nom: "Le Comptoir des Pierres", pays: "FR", lieu: "Comblanchien (Côte-d'Or)",
      site: "https://www.lecomptoirdespierres.com/",
      realisations: "https://www.lecomptoirdespierres.com/fr/batiment/522-bloc-pierre-6-faces-sciees.html",
      moyens: "Blocs 6 faces sciées sur dimensions (Lanvignes, Semond, Massangis, Comblanchien, Corton…) ; tranches jusqu'à ~230 × 140 cm ; finitions adouci, brossé, flammé.",
      pourquoi: "Référence de prix publique : 2 900 € HT/m³ pour Lanvignes et Semond en 6 faces sciées. Atelier au pied de la carrière de Comblanchien.",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter."
    },
    {
      groupe: "bloc", nom: "Les Carrières de Corton / carrières de la Côte", pays: "FR", lieu: "Nuits-Saint-Georges (Côte-d'Or)",
      site: "https://www.lescarrieresdecorton.fr/pierres-de-bourgogne/",
      realisations: "https://www.lescarrieresdecorton.fr/",
      moyens: "Extraction Comblanchien, Corton, Chassagne ; pierres dures de la Côte (porosité 0,5–6 %).",
      pourquoi: "Source directe du Comblanchien prescrit sur le plan V00 ; à interroger sur la faisabilité d'un bloc 2,9 × 2,3 × 0,6 m d'un seul banc.",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter."
    },
    {
      groupe: "usinage", nom: "SNBR", pays: "FR", lieu: "Troyes (Aube)",
      site: "https://www.snbr.fr/",
      realisations: "https://www.snbr.fr/",
      moyens: "Taille de pierre et sculpture avec robots d'usinage ; restauration de monuments historiques (cathédrale de Troyes, etc.).",
      pourquoi: "Second devis usinage français, habitué aux pièces monumentales ; à confronter à Vandekerckhove.",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter."
    },
    {
      groupe: "usinage", nom: "NeoRen — robots sculpteurs", pays: "FR", lieu: "France",
      site: "https://www.neoren.eu/",
      realisations: "https://www.neoren.eu/",
      moyens: "Conception numérique, usinage robotisé 7 axes pour dégrossissage, finitions à la main par sculpteurs.",
      pourquoi: "Alternative robot 7 axes si la géométrie évolue vers plus de sculpture (rampe, bords adoucis).",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter."
    },
    {
      groupe: "usinage", nom: "TorArt (Litix S.r.l.) / Robotor", pays: "IT", lieu: "Via Fantiscritti, Carrare (Toscane)",
      site: "https://www.torart.com",
      realisations: "https://www.torart.com/it-it/stories-1.aspx",
      moyens: "Laboratoire fondé en 2004 dans les carrières de Carrare ; robots multi-axes et logiciel OR-OS (fichier 3D → parcours d'outil automatiques) ; atelier des artistes contemporains — Antony Gormley, Jeff Koons, Cattelan, Penone, Barry X Ball, Zaha Hadid, Amanda Levete, Barber & Osgerby.",
      pourquoi: "Référence mondiale de l'usinage robotisé d'œuvres d'art à partir d'un fichier 3D, avec l'habitude du dialogue artiste ↔ machine que ce projet demande. La distance pénalise le transport (2 × 7–10 t) ; à retenir comme étalon de prix et de méthode, ou comme atelier si la qualité du rendu prime.",
      statut: "à contacter",
      photo: "https://www.3dnatives.com/en/wp-content/uploads/sites/2/2023/10/amore-psiche-min.png",
      photoCredit: "© Laura Veschi / ROBOTOR / TorArt — via 3Dnatives",
      photoLegende: "Réplique de « Amour et Psyché » usinée par ROBOTOR dans un bloc de Carrare de 10 t — le même ordre de grandeur que notre bloc brut."
    },
    {
      groupe: "beton", nom: "Decomo", pays: "BE", lieu: "Mouscron (Hainaut)",
      site: "https://www.decomo.be/",
      realisations: "https://www.decomo.be/",
      moyens: "Béton architectonique préfabriqué (ISO 9001, BENOR) ; finitions lisse, lavé, acidé, sablé, poli ; inserts de pierre naturelle ; éléments sur mesure livrés finis.",
      pourquoi: "Préfabricant belge capable d'une pièce unique en béton couleur sable, avec caisson et châssis noyés. Contre-devis à celui de St-Gall.",
      statut: "à contacter",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter — demander des références de pièces massives (bancs, socles, mobilier urbain)."
    },
    {
      groupe: "pilotage", nom: "Kunstgiesserei St. Gallen AG", pays: "CH", lieu: "Sittertalstrasse 34, CH-9014 St. Gallen",
      site: "https://www.kunstgiesserei.ch/",
      realisations: "https://www.kunstgiesserei.ch/",
      contact: "Eugen Bergmann — Project Management",
      moyens: "Fonderie d'art, construction numérique, pierre reconstituée ; interlocuteur de l'artiste pour le lot bronze + socle.",
      pourquoi: "Seul chiffrage existant pour le socle : 40 kCHF en pierre reconstituée (sept. 2026). À faire détailler : part moule / part coulée.",
      statut: "devis reçu",
      photo: "", photoCredit: "", photoLegende: "Visuel à ajouter."
    }
  ],

  // ---- Prochaines étapes -----------------------------------------------------
  etapes: [
    "Trancher avec Eva : pierre vraie (A/B) ou coulée (C) — choix artistique avant budget.",
    "Vérifier en carrière la faisabilité d'un bloc de 2,3 m de large d'un seul banc ; sinon variante 2 blocs.",
    "Lancer 2 devis bloc (Maffle + carrière bourguignonne) et 2 devis usinage (Vandekerckhove + atelier français).",
    "Demander à St-Gall le détail moule / coulée ; contre-devis Decomo.",
    "Échantillons : Comblanchien sablé, Massangis jaune, Euville, béton sable — à présenter à Eva."
  ],

  // ---- Journal des mises à jour ----------------------------------------------
  journal: [
    { date: "24-09-2026", texte: "Création du dossier : objet, plans V00, comparaison des trois filières, fiches sous-traitants." },
    { date: "24-09-2026", texte: "Fiche TorArt complétée : site officiel torart.com, page Stories (réalisations pour artistes, dont Gormley)." }
  ]
};
