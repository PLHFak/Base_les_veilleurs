# Génère vignettes (docs/thumbs), PNG des plans (docs/png) et docs/sizes.js. Lancer depuis la racine du dépôt.
# lv_build.py est commun aux trois dépôts (identique).
from lv_build import thumb, pdf_to_png, sizes, now_be
for pdf, out, th in [("docs/base_mono_bloc_V00.pdf","base_mono_bloc_V00","base_V00"),("docs/base_cplt_260922.pdf","base_cplt_260922","base_cplt"),("docs/base_cplt_courbe_260922.pdf","base_cplt_courbe_260922","base_courbe")]:
    pdf_to_png(pdf, f"docs/png/{out}.png")
    thumb(pdf, f"docs/thumbs/{th}.jpg")
thumb("img/rendu_260924.jpeg", "docs/thumbs/rendu.jpg")
thumb("docs/vitrine/ecran_v01_U80x40.png", "docs/thumbs/chassis_v01.jpg")
thumb("docs/vitrine/ecran_v00_vues.png", "docs/thumbs/step_v00.jpg")
S = sizes(".")
print(len(S), "fichiers mesurés ·", now_be())
