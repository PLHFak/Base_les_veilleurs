# La fondation — Les Veilleurs

Note préliminaire de fondation du socle monobloc sur la dune de Westende : masses, vent, portance et tassement, trois variantes dessinées et chiffrées, retours d'expérience, points à faire vérifier. Pré-dimensionnement à faire vérifier et signer par un bureau d'études.

- `data.js` — tout le texte (FR en v0.1 ; structure L("fr","en","nl","de") prête pour les traductions)
- `index.html` — gabarit ; les tableaux chiffrés sont construits depuis `docs/calc/resultats.js`
- `docs/calc/calcul_fondation.py` — note de calcul reproductible (masses depuis le STEP v01 du 29-09-26, vent NBN EN 1991-1-4 + ANB, EQU, DA1 belge, Schmertmann, coûts) → `resultats.json` / `resultats.js`
- `docs/calc/dessins.py` — schémas LV-FO-SCH-01 à 04 (`docs/png`), PDF avec cartouche (`docs/pdf`) via `build.py`
- `lv.css`, `lv.js`, `lv_build.py` — identiques à la charte commune ; `api/` — copies du site base (`hit.js` accepte en plus le site `fondation`)

Reconstruire : `python3 build.py` depuis ce dossier.

En ligne : https://base-les-veilleurs.vercel.app/les-veilleurs-fondation/?code=EVA
Projet Vercel autonome possible (comme `les-veilleurs-garde-corps`) : Root Directory = `les-veilleurs-fondation`.
