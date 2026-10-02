# Les Veilleurs — garde-corps (maquette 3D)

Variante de l'écran lenticulaire en vitrage encastré : un sandwich verre / feuille PETG claire de 6 mm / verre, encastré de 350 mm dans le socle en pierre.
Site autonome, avec le même gabarit, le même accès (`?code=EVA`, ou code vérifié par `api/gate`) et la même mesure `?a=CODE` que `monobloc.html`.

- `index.html` — vue 3D interactive (options A : 1 × 1800, B : 3 × 600 ; vues ; encastrement par transparence)
- `docs/garde-corps_A.glb`, `docs/garde-corps_B.glb` — modèles générés depuis les STEP v02 (dépôt Les-veilleurs-analyse-offre, `docs/garde-corps/`)
- `api/` — copies de `_cfg.js` et `gate.js` du site base ; `hit.js` accepte en plus le site `gardecorps`

Déploiement : projet Vercel `les-veilleurs-garde-corps`, avec **Root Directory = `les-veilleurs-garde-corps`**.
Lien pour les fabricants : `https://les-veilleurs-garde-corps.vercel.app/?code=EVA&a=CODE`
