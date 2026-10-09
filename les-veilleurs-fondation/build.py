# Génère les schémas (docs/png), leurs PDF avec cartouche (docs/pdf), les vignettes (docs/thumbs) et docs/sizes.js.
# Lancer depuis la racine du dépôt. lv_build.py est commun aux dépôts Les Veilleurs (identique).
import subprocess, sys
from lv_build import thumb, stamp_pdf, sizes, now_be
subprocess.run([sys.executable, "docs/calc/calcul_fondation.py"], check=True, stdout=subprocess.DEVNULL)
subprocess.run([sys.executable, "docs/calc/dessins.py"], check=True)
URL = "base-les-veilleurs.vercel.app/les-veilleurs-fondation/"
DOCS = [("LV-FO-SCH-01", "efforts_vent", "Efforts du vent sur l'œuvre", "Basculement, glissement et pression au sol sous le vent d'enveloppe"),
        ("LV-FO-SCH-02", "variante_A", "Fondation — variante A", "Lit de concassé et chape stabilisée : plan et coupe"),
        ("LV-FO-SCH-03", "variante_B", "Fondation — variante B", "Dalles béton préfabriquées : plan et coupe"),
        ("LV-FO-SCH-04", "variante_C", "Fondation — variante C", "Radier en béton armé avec bêche : plan et coupe")]
date = now_be()
for num, f, titre, objet in DOCS:
    png = f"docs/png/{num}_{f}.png"
    stamp_pdf(png, f"docs/pdf/{num}_{f}.pdf", dict(titre=titre, num=num, rev="A", statut="ESQUISSE", date=date, objet=objet, url=URL))
    thumb(png, f"docs/thumbs/{num}.jpg")
thumb("docs/base_mono_bloc_V00.pdf", "docs/thumbs/base_V00.jpg")
S = sizes(".")
print(len(S), "fichiers mesurés ·", date)
