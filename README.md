# La base monobloc — Les Veilleurs

Étude de fabrication du socle monobloc : trois filières, ateliers et fournisseurs, plans, maquette 3D (site statique).

- `data.js` — tout le contenu : objet, filières, ateliers, étapes, documents, journal
- `monobloc.html` — maquette 3D interactive (three.js, modèle `docs/monobloc_v01.glb`)
- `docs/` — plans J. Miceli (PDF, PNG rendus dans `docs/png/`), modèle GLB, châssis de l'écran (`docs/vitrine/`)
- `vercel.json` — déploiement Vercel (preset Other), noindex

Site : https://base-les-veilleurs.vercel.app (déploiement Vercel automatique à chaque push). Lien direct : https://base-les-veilleurs.vercel.app/?code=EVA

## Charte commune aux trois dossiers

Les trois sites (`Base_les_veilleurs`, `Vitrine_lenticulaire`, `Aquarium-K9`) partagent le même gabarit :

- `lv.css` et `lv.js` — styles, barre de titre (liens vers les trois dossiers, onglets de langue), cartouche technique, cartes « Documents ». **Ces deux fichiers doivent rester identiques dans les trois dépôts** : toute modification se recopie dans les deux autres.
- `data.js` — le seul fichier de contenu. Chaque texte est donné dans les quatre langues avec `L("fr","en","nl","de")` ; les schémas et plans restent légendés en français.
- `index.html` — gabarit et rendu des sections propres au dossier (ne porte pas de contenu).
- `build.py` — génère les vignettes (`docs/thumbs/`), les PDF avec cartouche des schémas (`docs/pdf/`), les PNG des plans (`docs/png/`) et `docs/sizes.js`. S'appuie sur `lv_build.py` (commun, identique dans les trois dépôts ; Pillow, reportlab, pdftoppm).

Langue : onglets FR / EN / NL / DE en haut de page, ou `?lang=en` dans le lien ; le choix est mémorisé dans le navigateur.

Accès : code `EVA` (côté client, `lv.js`), ou `?code=EVA` dans le lien. Pages en `noindex`.

