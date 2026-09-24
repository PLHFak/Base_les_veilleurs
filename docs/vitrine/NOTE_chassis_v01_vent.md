# Châssis vitrine lenticulaire — v01 et prise au vent (25-09-2026)

Transfert depuis le fil « base monobloc ». Fichiers dans ce dossier :
- `ecran_v00_100x40x3.stp` — STEP de Jacky (Inventor, 24-09-26) : tube 100×40×3, hors tout 1 890, montants 1 728 dont 528 traversants.
- `ecran_v00_vues.png` — filaire du STEP en 3 vues.
- `ecran_v01_U80x40.png` / `.stl` — châssis adapté : U 80×40×5 inox 316L, hors tout 1 820 × 1 220, verre 1 800 × 1 200, montants 1 720 dont 500 encastrés (réservation borgne 50×110×500, entraxe 1 780 — plan V00 à mettre à jour, 1 720 actuel).

## Profil
| Profil | W (cm³) | kg/m | Dispo |
|---|---|---|---|
| U 80×40×4 plié 316L | 14,7 | 4,8 | pliage sur mesure |
| **U 80×40×5 soudé laser 316L** | 17,7 | 5,9 | sur mesure, retenu |
| UPN 80 inox (80×45×6/8) | 26,5 | 8,6 | catalogue, plus lourd |

## Vent 220 km/h (61 m/s, q = 2,3 kPa, cf = 1,8 panneau isolé)
- Effort écran 9,6 kN à 0,66 m → 6,4 kNm ; par montant 4,8 kN / 3,2 kNm.
- Contraintes : U 4 mm 216 MPa (limite) ; U 5 mm 180 MPa (OK, 20 % de marge) ; UPN 80 120 MPa ; tube 100×40×3 162 MPa. Flèche en tête 7 mm (U 5 mm).
- Encastrement 500 mm : pression sur pierre ≈ 1,7 MPa, négligeable pour du Comblanchien.
- Bloc 6,7 t : renversement 12,5 kNm vs 62 kNm stabilisant → sécurité 5 ; glissement 33 kN vs 14 kN. Tient par sa masse.
- Verre : 55.2 recuit ≈ 23 MPa (limite) → prévoir feuilleté trempé (66.2 trempé ≈ 16 MPa).
- Prédimensionnement à confirmer par le bureau d'ossature.
