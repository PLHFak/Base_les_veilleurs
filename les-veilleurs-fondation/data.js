// La fondation — données du site.
// Seul ce fichier porte le texte ; index.html, lv.css et lv.js suivent la charte commune aux dossiers Les Veilleurs.
// Les tableaux chiffrés (vent, sol, coûts) sont construits par index.html à partir de docs/calc/resultats.js,
// lui-même produit par docs/calc/calcul_fondation.py : aucun chiffre de calcul n'est recopié à la main.
// Chaque texte se donne avec L("fr", "en", "nl", "de") ; en v0.1 seul le français est rédigé (les autres langues retombent sur le français).
// Dans les textes : **gras** et [libellé](https://lien) sont interprétés.
const L = (fr, en, nl, de) => ({fr, en, nl, de});

window.DATA = {
  version: "0.1",
  date: "04-10-2026",
  titre: L("La fondation"),
  sous_titre: L("Les Veilleurs · Eva L'Hoest · Beaufort 27 — note préliminaire : poids, vent, sable de dune, trois fondations chiffrées"),
  cartouche: {
    num: "LV-FO-WEB-01", statut: "ÉTUDE", genere: "09-10-2026 16:00",
    objet: L("Fondation superficielle du socle monobloc sur dune à Westende — pré-dimensionnement à faire vérifier et signer par un bureau d'études"),
    url: "https://base-les-veilleurs.vercel.app/les-veilleurs-fondation/", repo: "github.com/PLHFak/Base_les_veilleurs · les-veilleurs-fondation/"
  },
  nav: [
    {id:"synthese", label:L("En bref")},
    {id:"oeuvre", label:L("Poids de l'œuvre")},
    {id:"site", label:L("Site et sol")},
    {id:"vent", label:L("Vent")},
    {id:"sol", label:L("Portance et tassement")},
    {id:"variantes", label:L("Trois fondations")},
    {id:"couts", label:L("Comparaison et coût")},
    {id:"retours", label:L("Retours d'expérience")},
    {id:"verifier", label:L("À faire vérifier")},
    {id:"documents", label:L("Documents")},
    {id:"journal", label:L("Journal")}
  ],

  // ------------------------------------------------------------------ 1. EN BREF
  synthese: {
    titre: L("En bref"),
    lead: L("L'œuvre pèse 7,5 tonnes et repose sur 5 m² de sable. Elle tient au vent par son seul poids, sans ancrage, et charge le sol à peu près comme une personne debout."),
    kv: [
      [L("Poids total"), L("≈ 7,5 t (73 kN), dont 6,7 t pour le socle")],
      [L("Pression sur le sable"), L("15 kPa en moyenne, 26 kPa en pointe sous vent extrême")],
      [L("Tassement attendu à 15 ans"), L("1 à 2,5 mm — pente induite inférieure à 0,1 %, pour 1 % accepté")],
      [L("Vent de calcul"), L("220 km/h en rafale (enveloppe) ; l'Eurocode donne 135 à 200 km/h selon le relief")],
      [L("Sécurité sous ce vent"), L("2,7 au basculement · 1,3 au glissement · 1,5 à 1,9 à la portance sur sable lâche")],
      [L("Fondation proposée"), L("Variante A : fouille de 45 cm, lit de concassé et chape stabilisée, ≈ 2 600 € HTVA, un jour de chantier")]
    ],
    points_t: L("Ce que montre le calcul"),
    points: [
      L("**Le poids seul n'est pas le sujet.** Sous la seule charge de l'œuvre, un sable de dune même lâche garde une marge de 3, et le tassement prévu est dix fois inférieur au seuil de 1 % que le projet accepte."),
      L("**C'est le vent extrême qui consomme la marge.** À 220 km/h sur un sable lâche, la sécurité à la portance descend entre 1,5 et 1,9 ; elle remonte entre 2,2 et 2,8 sur un sable moyennement dense. Un sondage suffit à savoir dans quel cas on se trouve."),
      L("**Le risque réel est le sable qui s'en va sous un bord**, par le vent ou par la mer. C'est la seule cause que nous ayons trouvée pour les bunkers qui ont basculé sur les dunes de la mer du Nord et de l'Atlantique."),
      L("**La fondation sert donc à trois choses** : offrir une assise plane et compactée, répartir la charge, protéger le pourtour contre le déchaussement. Trois variantes sont dessinées et chiffrées, de 2 600 à 4 500 € HTVA."),
      L("**Deux questions ne relèvent pas du calcul** : l'altitude exacte du point d'implantation par rapport au niveau de tempête (≈ +7,0 m TAW), et l'autorisation du gestionnaire de la digue et de la dune.")
    ],
    statut: L("Cette note est un pré-dimensionnement établi par l'équipe de l'artiste, avec l'aide d'outils d'intelligence artificielle, pour ouvrir la discussion avec le curateur puis le service technique. Les valeurs de sol sont des valeurs types, pas des mesures du site. Elle doit être vérifiée, complétée et signée par un bureau d'études avant toute exécution.")
  },

  // ------------------------------------------------------------------ 2. POIDS
  oeuvre: {
    titre: L("Poids de l'œuvre"), sous: L("modèle 3D du 29-09-26 et plan « base mono bloc V00 »"),
    lead: L("Les masses sont calculées pièce par pièce à partir du modèle 3D de l'ensemble. Le socle représente 90 % du total ; tout le reste pèse moins de 800 kg."),
    lignes: [
      {k:L("Socle en Comblanchien massif, 2 750 × 2 125 × 527 mm"), s:L("modèle 3D : 2 490 litres × 2,70"), m:"socle"},
      {k:L("Écran lenticulaire : deux verres feuilletés, feuille lenticulaire, châssis inox"), s:L("modèle 3D"), m:"ecran"},
      {k:L("Caisson des cristaux vide : inox, vitre, fond"), s:L("modèle 3D"), m:"aquarium"},
      {k:L("33 blocs de cristal K9 de 200 × 100 × 100 mm"), s:L("33 × 2 litres × 2,51"), m:"k9"},
      {k:L("Trois figures en bronze"), s:L("donnée de projet, 3 × 50 kg"), m:"figures"},
      {k:L("Rose des vents"), s:L("hypothèse ; 50 à 200 kg selon l'épaisseur"), m:"rose"}
    ],
    total: L("Total en service"), mini: L("Cas minimal retenu pour la stabilité (socle, écran et caisson vide)"),
    cols: [L("Élément"), L("Source"), L("Masse")],
    kv: [
      [L("Surface d'appui"), L("5,02 m² (forme en D)")],
      [L("Centre de gravité"), L("à 0,94 m de la face plane, à 3 mm du centre de la surface d'appui : charge centrée")],
      [L("Hauteur hors sol"), L("0,53 m pour le socle, 1,75 m au sommet de l'écran")]
    ],
    comprendre_t: L("Comprendre : d'où viennent ces chiffres"),
    comprendre: [
      L("Le fichier 3D de l'ensemble (format STEP, 288 pièces) a été lu pièce par pièce ; chaque volume est multiplié par la masse volumique de son matériau : 2,70 pour le Comblanchien, 2,5 pour le verre, 2,51 pour le cristal K9, 8,0 pour l'inox, 1,27 pour le PETG."),
      L("Le plan du socle annonce 6 720 kg : c'est, à 3 kg près, le volume du modèle multiplié par 2,70. Selon le banc de carrière, le Comblanchien pèse de 2,65 à 2,70 t/m³, soit un socle de 6 600 à 6 720 kg."),
      L("Les cristaux : les blocs du modèle mesurent 200 × 100 × 100 mm, soit 5 kg pièce et 166 kg pour les 33."),
      L("Les trois figures et la rose des vents ne sont pas dans le modèle ; leurs masses sont des hypothèses. Elles pèsent 3 % du total et ne changent aucune conclusion."),
      L("Point ouvert, sans effet sur la fondation : la niche dessinée dans le socle (2 230 × 300 mm) est plus petite que le caisson des cristaux (2 324 × 453 mm). L'agrandir retire environ 150 kg de pierre.")
    ]
  },

  // ------------------------------------------------------------------ 3. SITE ET SOL
  site: {
    titre: L("Site et sol"), sous: L("dune de Westende, côté digue"),
    lead: L("Aucun sondage n'a été fait à l'emplacement. Les valeurs ci-dessous viennent d'études publiées sur la côte belge et du guide belge d'application de l'Eurocode 7 ; le calcul est mené avec l'hypothèse la plus défavorable."),
    kv: [
      [L("Sable"), L("sable éolien fin, quartzeux, bien trié, sans limon ; grain médian de 0,17 à 0,21 mm sur la plage de Westende")],
      [L("Frottement interne retenu"), L("27° (sable lâche) à 32° (sable dense), valeurs caractéristiques du guide belge")],
      [L("Poids volumique"), L("16 à 18 kN/m³ hors nappe")],
      [L("Nappe"), L("prise à 2 m sous la surface ; variation saisonnière de 0,4 à 0,7 m")],
      [L("Gel"), L("un sable propre n'est pas gélif ; à confirmer par une granulométrie (moins de 10 % de fines)")],
      [L("Drainage"), L("aucun n'est nécessaire : sable et concassé laissent passer l'eau")]
    ],
    dune_t: L("Une dune probablement récente"),
    dune: L("La digue de Westende a été reconstruite de 2021 à 2023, avec une bande de dune plantée d'oyats côté mer. Si l'œuvre prend place sur cette bande, le sol est un remblai récent recouvert de sable apporté par le vent, donc peu compact en surface. C'est pourquoi le calcul retient l'hypothèse « sable lâche » pour le premier mètre, et que le fond de fouille est compacté dans les trois variantes."),
    niveaux_t: L("Les niveaux de la mer, en mètres TAW"),
    niveaux_cols: [L("Repère"), L("Niveau"), L("Source")],
    niveaux: [
      [L("Niveau moyen de la mer"), "+2,4", L("Nieuwpoort et Ostende, 2001–2010")],
      [L("Haute mer de vive-eau"), "+4,7 à +4,9", L("Ostende et Nieuwpoort")],
      [L("Tempête de 1953 à Ostende"), "+6,66", L("niveau observé")],
      [L("Tempête centennale"), "≈ +6,5", L("études de sécurité côtière")],
      [L("Tempête millénaire"), "≈ +7,0", L("Masterplan Kustveiligheid")],
      [L("Pied de dune (plan de référence du suivi côtier)"), "+6,9", L("suivi morphologique de la côte")]
    ],
    alerte: L("**À lever avant tout : l'altitude du point d'implantation.** « Environ 4 m au-dessus de la mer » correspond à +6,4 m TAW si l'on compte depuis le niveau moyen, c'est-à-dire sous le niveau des tempêtes centennale et millénaire. Sur 15 ans, la probabilité de rencontrer une tempête centennale est de 14 %, une tempête millénaire de 1,5 %. Aucune fondation superficielle ne protège d'une érosion du front de dune : la parade est le choix de l'emplacement, le plus haut et le plus près de la digue possible, à fixer sur un relevé de géomètre."),
    comprendre_t: L("Comprendre : qui autorise les travaux sur la dune"),
    comprendre: [
      L("La plage et la digue relèvent du domaine public flamand, géré par l'agence MDK, afdeling Kust. Le règlement de la côte (arrêté royal du 4 août 1981, article 28) interdit tout travail sur la plage sans autorisation particulière."),
      L("L'arrêté du 29 mars 2002 prévoit un permis domanial précaire et révocable pour l'usage de l'ouvrage de défense côtière ; son article 22 en dispense les activités culturelles temporaires et les constructions communales d'intérêt général."),
      L("Le décret Dunes du 14 juillet 1993 interdit de bâtir en zone de dune protégée, sauf pour la conservation de la nature ou la défense côtière. Nous n'avons pas vérifié si la bande concernée est classée."),
      L("Un permis d'environnement (omgevingsvergunning) et une évaluation Natura 2000 peuvent aussi être demandés. Nous n'avons trouvé aucune trace publique de la manière dont les œuvres précédentes de Beaufort ont été autorisées : Westtoer et la commune le savent.")
    ]
  },

  // ------------------------------------------------------------------ 4. VENT
  vent: {
    titre: L("Vent"), sous: L("basculement et glissement"),
    lead: L("Le vent pousse surtout sur l'écran, à plus d'un mètre de haut. Trois niveaux de vent sont calculés ; le dimensionnement retient le plus fort, déjà utilisé pour l'étude de l'écran."),
    cols: [L("Hypothèse de vent"), L("Pression de pointe"), L("Rafale équivalente"), L("Poussée"), L("Sécurité au basculement"), L("Sécurité au glissement"), L("Pression au sol en service, mini à maxi")],
    noms: {plat: L("Eurocode, côte belge, terrain plat"), crete: L("Eurocode, en crête de dune raide"), env: L("Enveloppe de projet, retenue")},
    lecture_t: L("Lecture."),
    lecture: L("Les rapports intègrent les coefficients de sécurité de l'Eurocode : un rapport supérieur à 1 signifie que la vérification est satisfaite. Sous le vent le plus fort, l'œuvre garde une marge de 2,7 au basculement. Sous les charges de service, la pression au sol reste partout positive ; avec les coefficients de sécurité, un bord se décharge entièrement sous les deux vents les plus forts, ce que le calcul de portance prend en compte en réduisant la largeur d'appui."),
    glissement: L("Le rapport de 1,3 au glissement ne compte que le frottement de la pierre sur son lit de mortier, avec un coefficient de 0,5, valeur usuelle à confirmer. L'adhérence du mortier constitue une réserve supplémentaire, non chiffrée ici."),
    schema: {src:"docs/png/LV-FO-SCH-01_efforts_vent.png", leg:L("Efforts du vent sous l'enveloppe de 220 km/h — schéma LV-FO-SCH-01")},
    comprendre_t: L("Comprendre : les hypothèses du calcul au vent"),
    comprendre: [
      L("**Vitesse de référence** : 26 m/s, valeur de l'annexe nationale belge pour l'arrondissement d'Ostende. Catégorie de terrain 0 (bord de mer), hauteur de référence 1,75 m. Aucune réduction pour la durée de vie de 15 ans : pour une œuvre en espace public, garder la valeur cinquantennale est le choix défendable."),
      L("**Relief** : en crête d'un talus raide, l'Eurocode majore la vitesse moyenne jusqu'à 1,5 fois, ce qui multiplie la pression par 2,25. L'enveloppe de 220 km/h (2,33 kPa) dépasse de 4 % la pression obtenue avec la majoration maximale prévue par l'Eurocode (1,6, soit 2,24 kPa). Le profil réel de la dune donnera une valeur intermédiaire."),
      L("**Coefficient de force** : 1,8 sur toutes les surfaces, valeur des panneaux isolés, prudente pour le socle. Surfaces : écran et cadre 2,23 m² à 1,14 m de haut, face du socle 1,45 m² à 0,26 m, trois figures 0,6 m² à 0,98 m (hypothèse)."),
      L("**Combinaisons** : basculement en équilibre statique, poids × 0,9 et vent × 1,5. Glissement selon l'approche de calcul 1 prescrite en Belgique : vent × 1,5 d'une part, vent × 1,1 avec frottement divisé par 1,25 d'autre part. Le poids pris en compte est le poids minimal, sans cristaux ni figures."),
      L("**Direction** : le cas calculé est le vent perpendiculaire à l'écran, soufflant vers la face plane, où le bras de levier du poids est le plus court (0,94 m). Le vent parallèle à l'écran, qui ne voit que le flanc du socle, n'est pas dimensionnant.")
    ]
  },

  // ------------------------------------------------------------------ 5. PORTANCE ET TASSEMENT
  sol: {
    titre: L("Portance et tassement"),
    lead: L("Le projet accepte que l'œuvre penche de 1 % en dix à quinze ans, soit 21 mm de dénivelée d'un bord à l'autre. Le tassement calculé ne dépasse pas 2,4 mm. La portance du sable est suffisante, avec une marge qui dépend surtout de sa compacité."),
    cols_t: [L("Variante"), L("Pression nette ajoutée au sol"), L("Tassement à 15 ans, sable dense à lâche"), L("Pente induite, sable lâche")],
    portance_t: L("Sécurité à la portance et au glissement, sur sable lâche"),
    cols_p: [L("Variante"), L("Portance, poids seul"), L("Portance, vent extrême"), L("Portance, vent extrême et nappe à l'assise"), L("Glissement de la fondation sur le sable")],
    lecture_t: L("Lecture."),
    lecture: L("Un rapport supérieur à 1 signifie que la vérification de l'Eurocode est satisfaite, coefficients de sécurité compris. Sous le poids seul, la marge est de 3. Sous le vent d'enveloppe, elle reste de 1,5 à 1,9 avec la nappe à 2 m. Si l'on suppose en plus que la nappe remonte jusqu'à l'assise, la variante B passe sous 1 et les variantes A et C descendent à 1,2. Sur un sable moyennement dense, ces trois dernières valeurs deviennent 1,9, 1,4 et 1,8."),
    sondage: L("Ce tableau ne compte aucune aide du sable qui entoure la fondation, puisqu'il peut partir. Il montre que la compacité du sable est la donnée qui manque : un sondage décide si l'on est dans le cas « lâche » ou « moyen »."),
    risque_t: L("Ce qui ferait réellement pencher l'œuvre"),
    risque: L("Un tassement uniforme du sable sous la charge ne peut pas produire 1 % de pente. Une perte de sable sous un bord le peut. Nous avons calculé le cas où l'appui disparaît sur 50 cm le long de la face plane : la pression en pointe passe de 15 à environ 40 kPa et l'arrière commence à se décharger. Le centre de gravité reste à 0,44 m à l'intérieur de l'appui, donc l'œuvre ne bascule pas, mais elle s'incline en suivant le sable qui part. La réponse est constructive — protéger le pourtour — et d'entretien : surveiller et recharger en sable."),
    comprendre_t: L("Comprendre : les méthodes de calcul"),
    comprendre: [
      L("**Tassement** : méthode de Schmertmann (1978), module du sable égal à 2,5 fois la résistance de pointe au pénétromètre, fluage sur 15 ans inclus (facteur 1,44). Trois profils de sol sont testés, de 2 à 8 MPa de résistance de pointe dans le premier mètre. La pente induite suppose, par convention prudente, que 75 % du tassement se produit d'un seul côté."),
      L("**Ce que le calcul de tassement ne voit pas** : un sable très lâche peut se serrer brutalement sous l'effet de vibrations ou d'une saturation. C'est la raison du compactage du fond de fouille, et une raison de plus pour le sondage."),
      L("**Portance** : formule de l'Eurocode 7 (annexe D) en conditions drainées, avec la charge inclinée et excentrée par le vent. Approche de calcul 1 belge : frottement du sol divisé par 1,25 et vent × 1,1, ou charges majorées de 1,35 et 1,5 ; le tableau donne la plus faible des deux. L'encastrement de la fondation n'est pas compté."),
      L("**Nappe** : prise à 2 m sous la surface, comme le prévoit le projet ; le cas « nappe à l'assise » représente une submersion ou une saturation exceptionnelle simultanée au vent extrême."),
      L("**Glissement de la fondation sur le sable** : frottement pris aux deux tiers de l'angle du sable pour le géotextile et les dalles, à l'angle entier pour le béton coulé en place. La butée du sable n'est pas comptée."),
      L("**Limite** : sans sondage, la compacité réelle du sable n'est pas connue. Un ou deux essais au pénétromètre (600 à 1 000 €) remplaceraient ces hypothèses par des mesures.")
    ]
  },

  // ------------------------------------------------------------------ 6. TROIS FONDATIONS
  variantes: {
    titre: L("Trois fondations"), sous: L("plans et coupes"), legende: L("plan et coupe, schéma"),
    lead: L("Dans les trois cas, le socle est posé au niveau du sable sur 3 cm de mortier, sans être enterré : la niche des cristaux commence à 8 cm de sa base. Le fond de fouille est compacté à la plaque vibrante."),
    items: [
      {id:"A", court:L("A — Concassé"), reco:L("Proposée"),
       titre:L("Variante A — Lit de concassé et chape stabilisée"),
       schema:"docs/png/LV-FO-SCH-02_variante_A.png",
       texte:L("Une fouille de 45 cm, un géotextile, 30 cm de concassé compacté en deux couches, puis 12 cm de sable stabilisé au ciment sous le socle. L'anneau de concassé qui déborde de 30 cm est recouvert de sable et replanté d'oyats : rien n'est visible."),
       kv:[[L("Fouille"), L("3,35 × 2,75 m, profondeur 0,45 m, ≈ 5 m³")], [L("Matériaux"), L("2,8 m³ de concassé, 1,1 m³ de sable stabilisé")], [L("Chantier"), L("1 jour, pose du socle possible le lendemain")]],
       plus:L("La moins chère, invisible, sans béton coulé sur la dune. Le concassé draine et suit la forme en D sans coffrage."),
       moins:L("Le bord n'est pas rigide : si le sable part sur plus de 30 cm, le lit se défait. En fin de vie, environ 8 tonnes de matériaux sont à reprendre à la mini-pelle.")},
      {id:"B", court:L("B — Dalles"), reco:L("Réversible"),
       titre:L("Variante B — Dalles béton préfabriquées"),
       schema:"docs/png/LV-FO-SCH-03_variante_B.png",
       texte:L("Deux dalles industrielles de 2,00 × 2,00 × 0,16 m, posées côte à côte sur un lit de réglage de 12 cm. Elles arrivent et repartent à la grue, la même que celle du socle."),
       kv:[[L("Fouille"), L("4,40 × 2,40 m, profondeur 0,31 m, ≈ 4 m³")], [L("Matériaux"), L("2 dalles de 1,5 t, 1,3 m³ de sable stabilisé")], [L("Chantier"), L("1 jour, pose du socle dans la foulée")]],
       plus:L("Entièrement démontable, dalles réutilisables, aucun temps de prise, aucun béton coulé sur la dune."),
       moins:L("Les dalles dépassent de 62 cm de part et d'autre du socle, sous 3 cm de sable seulement : elles apparaîtront après un coup de vent. Le joint passe sous l'axe du socle : chaque dalle est chargée près de son bord et peut pivoter indépendamment de l'autre. C'est aussi la variante dont la portance est la plus juste sous vent extrême.")},
      {id:"C", court:L("C — Radier"), reco:L("La plus robuste"),
       titre:L("Variante C — Radier en béton armé"),
       schema:"docs/png/LV-FO-SCH-04_variante_C.png",
       texte:L("Un radier coulé en place de 20 cm, armé de deux nappes de treillis, avec une bêche périphérique qui descend à 58 cm pour empêcher le sable de filer sous le bord."),
       kv:[[L("Fouille"), L("2,95 × 2,33 m, radier à 0,28 m, bêche à 0,58 m")], [L("Matériaux"), L("2,2 m³ de béton C30/37, classe d'environnement ES2 (air marin, gel)")], [L("Chantier"), L("2 jours, puis 7 jours de durcissement avant la pose du socle")]],
       plus:L("La meilleure tenue au déchaussement et la solution la plus familière pour un bureau d'études."),
       moins:L("Béton pompé depuis la digue, 5,5 tonnes de béton armé à démolir en fin de vie, coût le plus élevé. Les angles du radier dépassent derrière l'arc du socle.")}
    ],
    plus_t: L("Pour"), moins_t: L("Limites"),
    ecartees_t: L("Comprendre : les solutions écartées"),
    ecartees: [
      L("**Pose directe sur le sable** : la couche de surface est meuble et rien ne protège le bord. L'économie, que nous estimons à 1 500 €, se paie d'un risque de déchaussement dès le premier hiver."),
      L("**Pieux vissés ou micropieux** : ils reportent la charge en profondeur, ce dont l'œuvre n'a pas besoin à 15 kPa. Leur seul intérêt serait de résister à une érosion du front de dune, sujet qui se traite par le choix de l'emplacement. Coût estimé par nous : 5 000 à 10 000 €."),
      L("**Enterrer le socle de 10 à 15 cm** : impossible sans noyer la niche des cristaux, dont le bas se trouve à 8 cm de la base.")
    ]
  },

  // ------------------------------------------------------------------ 7. COMPARAISON ET COÛT
  couts: {
    titre: L("Comparaison et coût"), sous: L("euros hors TVA, prix 2025–2026"),
    lead: L("La variante A est la moins chère. L'écart avec B est de 800 € ; C coûte environ 70 % de plus et laisse du béton à démolir."),
    cols: [L("Critère"), L("A — Concassé"), L("B — Dalles"), L("C — Radier")],
    lignes: [
      [L("Profondeur de fouille"), "0,45 m", "0,31 m", L("0,28 m, bêche à 0,58 m")],
      [L("Durée du chantier"), L("1 jour"), L("1 jour"), L("2 jours et 7 jours d'attente")],
      [L("Béton coulé sur la dune"), L("non"), L("non"), L("oui, 2,2 m³")],
      [L("Aspect autour du socle"), L("invisible"), L("dalles affleurantes"), L("angles du radier affleurants")],
      [L("Tenue si le sable part sous un bord"), L("moyenne"), L("moyenne"), L("bonne")],
      [L("Portance sous vent extrême, sable lâche"), "1,8", "1,5", "1,9"],
      [L("Dépose en fin de vie (notre estimation)"), "≈ 900 €", "≈ 500 €", "≈ 1 800 €"]
    ],
    total: L("Coût de la fondation, aléas de 15 % compris"),
    detail_t: L("Comprendre : le détail des coûts par variante"),
    detail_cols: [L("Poste"), L("Montant")],
    soustotal: L("Sous-total"), aleas: L("Aléas 15 %"), arrondi: L("Total arrondi"),
    hors_t: L("Hors fondation, quelle que soit la variante"),
    hors_cols: [L("Poste"), L("Ordre de grandeur"), L("Remarque")],
    hors: [
      [L("Sondages au pénétromètre, 1 à 2 essais à 10 m"), "600 à 1 000 €", L("remplace les hypothèses de sol par des mesures")],
      [L("Note de stabilité signée par un ingénieur"), "600 à 1 200 €", L("notre estimation, pour une petite fondation")],
      [L("Grue pour poser le socle"), "2 000 à 3 000 €", L("8,5 t au crochet : classe 100 à 130 t à 20 m de portée, 160 à 200 t à 30 m")],
      [L("Plaques de roulage, quelques jours"), "≈ 100 à 300 €", L("selon la distance entre la digue et l'emplacement")]
    ],
    sources: L("Les prix unitaires viennent de tarifs publiés en Belgique et aux Pays-Bas en 2025 et 2026 (location de machines, centrales à béton, dalles, grues). La main-d'œuvre, le coffrage, le transport des dalles et les déposes sont nos estimations. Un devis d'entrepreneur local reste nécessaire : sur un chantier aussi petit, les frais de déplacement pèsent plus que les quantités.")
  },

  // ------------------------------------------------------------------ 8. RETOURS D'EXPÉRIENCE
  retours: {
    titre: L("Retours d'expérience"), sous: L("ouvrages militaires et œuvres sur le sable"),
    lead: L("Des centaines de bunkers du Mur de l'Atlantique reposent depuis quatre-vingts ans sur le même sable. Ceux qui ont basculé l'ont fait parce que le sable est parti dessous, pas parce qu'il s'est tassé."),
    items: [
      {t:L("Comment les bunkers étaient fondés"),
       p:L("Le sol était nivelé, la dalle coulée directement dessus, puis l'ouvrage bétonné d'un seul tenant. Les ouvrages permanents avaient une dalle de 80 cm et des murs de 2 m ; les ouvrages de campagne une dalle de 20 à 40 cm. Aucune fondation profonde."),
       src:[["bunkerpictures.nl", "https://www.bunkerpictures.nl/sources/description-the-german-bunker-constructions/"]]},
      {t:L("Ceux qui sont restés en place"),
       p:L("Le domaine de Raversyde, à Ostende, conserve plus de soixante ouvrages dans les dunes, parmi les mieux préservés du Mur. D'importants vestiges subsistent aussi à Westende et Lombardsijde. Aucune source ne donne toutefois de mesure de leur aplomb."),
       src:[["raversyde.be", "https://www.raversyde.be/en/atlantikwall/atlantikwall-raversyde"], ["VLIZ, De Grote Rede 24", "https://www.vliz.be/docs/groterede/gr24_atlantikwall.pdf"]]},
      {t:L("Ceux qui ont basculé : l'érosion"),
       p:L("À Løkken (Danemark), la mer a repris 90 m de côte depuis 1945 et la plupart des bunkers ont glissé au bas de la falaise de sable. À Leffrinckoucke, près de Dunkerque, le bunker de la dune Dewulf a commencé à pencher pendant la tempête Xaver puis s'est effondré quand la tempête Egon a érodé le front de dune. Au Cap Ferret, un blockhaus a été emporté en janvier 2026 par l'érosion du pied de dune. Nous n'avons trouvé aucun cas attribué à un tassement sous la charge."),
       src:[["atlantvolden.dk", "https://atlantvolden.dk/en/locations/loekken-nord"], ["geodunes.fr", "https://www.geodunes.fr/tempete-egon-erosion-massive-sur-lest-dunkerquois/"], ["bougerabordeaux.com", "https://www.bougerabordeaux.com/actu/le-blockhaus-de-la-pointe-du-cap-ferret-emporte-par-lerosion-du-littoral/"]]},
      {t:L("Un cas dû au vent, et sa réparation"),
       p:L("Sur l'île de Texel, le bunker du Loodsmansduin menaçait de pencher fortement au début des années 1990, ce que la source attribue au vent. Il a été remis de niveau en chassant le sable à l'air comprimé ; il repose aujourd'hui 50 cm plus bas. La leçon vaut pour l'œuvre : une pente se corrige, à condition de la surveiller."),
       src:[["npduinenvantexel.nl", "https://www.npduinenvantexel.nl/42921/bunkers"]]},
      {t:L("Ce que fait le vent autour d'un obstacle"),
       p:L("Des essais de terrain sur une plage montrent que le sable se creuse au pied des faces exposées, surtout aux angles, et se dépose juste devant l'obstacle et en deux traînées derrière lui. Pour l'œuvre, cela désigne les deux angles de la face plane et le pied de l'arc comme points à surveiller, et annonce un ensablement à l'arrière."),
       src:[["Poppema et al., Geomorphology 2022", "https://www.sciencedirect.com/science/article/pii/S0169555X22000071"]]},
      {t:L("Les œuvres posées sur le sable"),
       p:L("Les figures en fonte d'Antony Gormley à Crosby (650 kg) sont fixées sur des pieux d'un mètre ; certaines s'enfonçaient et ont reçu des socles plus profonds. Pour Beaufort 21, l'œuvre de Rosa Barba, sur la plage, est enfilée sur des tubes battus à 13 m. Ces deux cas se situent dans la zone des marées, sur sable saturé : le contexte est plus sévère que le nôtre. Nous n'avons trouvé aucune information publiée sur la fondation des œuvres de Beaufort placées en dune."),
       src:[["sefton.gov.uk", "https://sefton.gov.uk/around-sefton/another-place-by-antony-gormley/general-information"], ["antonygormley.com", "https://www.antonygormley.com/news/reinstallation-of-another-place-crosby-beach"], ["beton.febe.be", "https://beton.febe.be/2022/06/29/pillage-of-the-sea-iconisch-kunstwerk-uit-beton-en-jute-trotseert-eb-en-vloed-nieuwe-perspectieven-voor-organische-architectuur/"]]}
    ],
    sources_t: L("Sources des données de site et de norme"),
    sources_note: L("Pages consultées le 4 octobre 2026. Les annexes nationales belges ont été lues dans des copies et des guides en ligne, non dans les normes NBN originales : les valeurs sont à contrôler sur les textes officiels."),
    sources: [
      [L("Vent : annexe nationale belge à l'EN 1991-1-4, fiche Buildwise"), "https://www.buildwise.be/media/5mzdt0am/nbn-en-1991-1-4.pdf"],
      [L("Coefficients partiels : annexe nationale belge à l'EN 1990, fiche Buildwise"), "https://www.buildwise.be/media/lnwgdz3y/nbn-en-1990.pdf"],
      [L("Sol : directives belges pour l'application de l'Eurocode 7, 2022"), "https://www.buildwise.be/media/emtdka1a/na-ec-7-beschoeiingen-2022-final-fr.pdf"],
      [L("Béton : fiches d'aide à la spécification, NBN B 15-001"), "https://www.buildwise.be/media/dbdhbsg0/an_fiches_aide_a_la_specification_des_betons-1.pdf"],
      [L("Sable des plages de Westende à Bredene, VLIZ"), "https://www.vliz.be/projects/beachsup/documents/Eindrapport.pdf"],
      [L("Niveaux de marée à Nieuwpoort et Ostende, VLIZ"), "https://www.vliz.be/imisdocs/publications/46/296346.pdf"],
      [L("Masterplan Kustveiligheid, agence MDK"), "https://www.agentschapmdk.be/nl/bijlage/6a7c1e36-5dee-4262-ba1c-45fad85df931/brochure-masterplan-kustveiligheid-web"],
      [L("Reconstruction de la digue de Westende, VRT, 2021"), "https://www.vrt.be/vrtnws/nl/2021/01/18/werken-westende-duizendjarige-storm/"],
      [L("Règlement de la côte et permis domanial, VLIZ"), "https://www.vliz.be/imisdocs/publications/375143.pdf"],
      [L("Décret Dunes de 1993, VLIZ"), "https://www.vliz.be/imisdocs/publications/ocrd/140182.pdf"]
    ]
  },

  // ------------------------------------------------------------------ 9. À FAIRE VÉRIFIER
  verifier: {
    titre: L("À faire vérifier"), sous: L("par le bureau d'études et les autorités"),
    lead: L("Huit points, par ordre d'importance. Les trois premiers peuvent changer la conception ; les autres l'affinent."),
    items: [
      L("**Altitude et position exacte** : relevé de géomètre en mètres TAW, distance à la digue. C'est le point qui décide si l'emplacement est exposé à l'érosion de tempête."),
      L("**Autorisations** : agence MDK afdeling Kust pour le domaine public, commune de Middelkerke, statut de la bande au regard du décret Dunes. Demander aussi la préférence du gestionnaire entre fouille de 45 cm (A) et fondation démontable (B)."),
      L("**Sondages** : un ou deux essais au pénétromètre à 10 m et une granulométrie du sable. C'est la compacité mesurée qui fixe la marge de portance sous vent extrême, et la granulométrie qui confirme l'absence de sensibilité au gel."),
      L("**Vent de calcul** : coefficient de relief d'après le profil réel de la dune. L'enveloppe de 220 km/h couvre tous les cas ; une valeur plus basse ne changerait pas la fondation."),
      L("**Données de l'œuvre à figer** : surface au vent et position des trois figures, masse de la rose des vents, niche du socle recalée sur le caisson des cristaux."),
      L("**Levage** : charge admissible de la digue pour une grue de 100 à 200 tonnes, portée réelle, points d'élingage du socle."),
      L("**Liaison socle-fondation** : confirmer le coefficient de frottement de 0,5 retenu entre la pierre, le mortier et la chape stabilisée, ou ajouter deux goujons inox pour une butée positive au glissement."),
      L("**Surveillance proposée** : trois repères de nivellement sur le socle, lecture annuelle et après chaque tempête, rechargement en sable aux angles, seuil d'intervention à 0,5 % de pente. Une remise à niveau reste possible en relevant le socle à la grue.")
    ]
  },

  // ------------------------------------------------------------------ DOCUMENTS
  documents: [
    {groupe: L("Schémas de la fondation"), items: [
      {id:"LV-FO-SCH-01", rev:"A", date:"04-10-26", statut:"ESQUISSE", thumb:"docs/thumbs/LV-FO-SCH-01.jpg",
       titre:L("Efforts du vent sur l'œuvre : basculement, glissement, pression au sol"),
       files:[{fmt:"PDF", u:"docs/pdf/LV-FO-SCH-01_efforts_vent.pdf"}, {fmt:"PNG", u:"docs/png/LV-FO-SCH-01_efforts_vent.png"}]},
      {id:"LV-FO-SCH-02", rev:"A", date:"04-10-26", statut:"ESQUISSE", thumb:"docs/thumbs/LV-FO-SCH-02.jpg",
       titre:L("Variante A — lit de concassé et chape stabilisée : plan et coupe"),
       files:[{fmt:"PDF", u:"docs/pdf/LV-FO-SCH-02_variante_A.pdf"}, {fmt:"PNG", u:"docs/png/LV-FO-SCH-02_variante_A.png"}]},
      {id:"LV-FO-SCH-03", rev:"A", date:"04-10-26", statut:"ESQUISSE", thumb:"docs/thumbs/LV-FO-SCH-03.jpg",
       titre:L("Variante B — dalles béton préfabriquées : plan et coupe"),
       files:[{fmt:"PDF", u:"docs/pdf/LV-FO-SCH-03_variante_B.pdf"}, {fmt:"PNG", u:"docs/png/LV-FO-SCH-03_variante_B.png"}]},
      {id:"LV-FO-SCH-04", rev:"A", date:"04-10-26", statut:"ESQUISSE", thumb:"docs/thumbs/LV-FO-SCH-04.jpg",
       titre:L("Variante C — radier en béton armé avec bêche : plan et coupe"),
       files:[{fmt:"PDF", u:"docs/pdf/LV-FO-SCH-04_variante_C.pdf"}, {fmt:"PNG", u:"docs/png/LV-FO-SCH-04_variante_C.png"}]}
    ]},
    {groupe: L("Note de calcul, pour le bureau d'études"), items: [
      {id:"LV-FO-NC-01", rev:"A", date:"04-10-26", statut:"ÉTUDE",
       titre:L("Calcul reproductible : masses, vent, basculement, glissement, portance, tassement, coûts"),
       note:L("Script Python commenté et ses résultats ; toutes les hypothèses sont en tête de fichier."),
       files:[{fmt:"PY", u:"docs/calc/calcul_fondation.py"}, {fmt:"JSON", u:"docs/calc/resultats.json"}]},
      {id:"LV-FO-NC-02", rev:"A", date:"04-10-26", statut:"ÉTUDE",
       titre:L("Volumes des 288 pièces du modèle 3D, données d'entrée du calcul des masses"),
       files:[{fmt:"JSON", u:"docs/calc/step_pieces.json"}]}
    ]},
    {groupe: L("Données d'entrée"), items: [
      {id:"LV-BA-PL-00", rev:"V00", date:"22-09-26", statut:"ESQUISSE", thumb:"docs/thumbs/base_V00.jpg",
       titre:L("Plan du socle monobloc, Comblanchien, 6 720 kg"), auteur:L("J. Miceli"),
       files:[{fmt:"PDF", u:"docs/base_mono_bloc_V00.pdf"}]},
      {titre:L("Dossier de la base monobloc : filières, ateliers, maquette 3D"),
       files:[{fmt:"base-les-veilleurs.vercel.app", u:"https://base-les-veilleurs.vercel.app/?code=EVA", ext:true}]}
    ]}
  ],

  journal: [
    {d:"04-10-26", t:L("v0.1 — création du dossier : masses recalculées sur le modèle 3D du 29-09-26, vent selon l'Eurocode et enveloppe de 220 km/h, portance et tassement sur sable de dune, trois variantes de fondation dessinées et chiffrées, retours d'expérience, points à faire vérifier. Version française ; les autres langues suivront après validation du contenu.")}
  ]
};
