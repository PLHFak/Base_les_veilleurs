"""Outils de construction communs aux trois dépôts :
- thumb(src, out) : vignette (PDF page 1 ou image) 360 px de large, JPEG
- pdf_to_png(pdf, out, dpi) : rendu PNG de la page 1 d'un plan PDF
- stamp_pdf(img, out_pdf, meta) : schéma PNG/JPEG posé sur une page A4 avec titre et cartouche technique
- sizes(root, out) : docs/sizes.js = tailles des fichiers pour l'affichage
"""
import os, json, subprocess, datetime
from PIL import Image
from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, black, white

ACC = HexColor("#5a7d8c"); MUTE = HexColor("#7a7a7a"); LINE = HexColor("#d9d2c3"); INK = HexColor("#2b2b2b")
LEGAL = ("© Eva L'Hoest 2026 — Confidentiel. Reproduction, diffusion ou usage hors de cette consultation "
         "interdits sans accord écrit de l'artiste. Cotes non contractuelles.")

def thumb(src, out, width=360):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    if src.lower().endswith(".pdf"):
        tmp = out + ".tmp"
        subprocess.run(["pdftoppm", "-r", "40", "-f", "1", "-l", "1", "-png", "-singlefile", src, tmp], check=True)
        im = Image.open(tmp + ".png"); os.remove(tmp + ".png")
    else:
        im = Image.open(src)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255)); bg.paste(im.convert("RGBA"), mask=im.convert("RGBA").split()[3]); im = bg
    else:
        im = im.convert("RGB")
    r = width / im.width
    im = im.resize((width, max(1, int(im.height * r))), Image.LANCZOS)
    im.save(out, "JPEG", quality=82, optimize=True)
    return out

def pdf_to_png(pdf, out, dpi=150):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    tmp = out[:-4]
    subprocess.run(["pdftoppm", "-r", str(dpi), "-f", "1", "-l", "1", "-png", "-singlefile", pdf, tmp], check=True)
    return out

def _wrap(c, text, font, size, maxw):
    words = text.split(); lines = []; cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, font, size) <= maxw: cur = test
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def stamp_pdf(img, out_pdf, meta):
    """meta : dict(titre, num, rev, statut, date, objet, url)"""
    os.makedirs(os.path.dirname(out_pdf), exist_ok=True)
    im = Image.open(img)
    if im.mode in ("RGBA", "LA", "P"):
        bg = Image.new("RGB", im.size, (255, 255, 255)); bg.paste(im.convert("RGBA"), mask=im.convert("RGBA").split()[3]); im = bg
    else:
        im = im.convert("RGB")
    tmp = out_pdf + ".jpg"; im.save(tmp, "JPEG", quality=90)
    ps = landscape(A4) if im.width >= im.height * 0.9 else A4
    W, H = ps
    c = canvas.Canvas(out_pdf, pagesize=ps)
    c.setAuthor("Eva L'Hoest"); c.setTitle(meta["titre"]); c.setSubject(meta.get("objet", ""))
    m = 36; cart_h = 86; top = 46
    # titre
    c.setFillColor(INK); c.setFont("Helvetica-Bold", 12); c.drawString(m, H - m + 6, "Les Veilleurs — " + meta["titre"])
    c.setFillColor(MUTE); c.setFont("Helvetica", 8.5)
    c.drawString(m, H - m - 7, f"{meta['num']} · rév. {meta['rev']} · {meta['date']} · {meta['statut']} · schéma légendé en français")
    # image
    aw = W - 2 * m; ah = H - m - top - cart_h - 14
    r = min(aw / im.width, ah / im.height); iw, ih = im.width * r, im.height * r
    x = m + (aw - iw) / 2; y = m + cart_h + 10 + (ah - ih) / 2
    c.drawImage(tmp, x, y, iw, ih)
    # cartouche 3 colonnes
    y0 = m; cols = [0.33, 0.40, 0.27]; xs = [m]
    for f in cols: xs.append(xs[-1] + aw * f)
    c.setStrokeColor(black); c.setLineWidth(0.8); c.rect(m, y0, aw, cart_h)
    for xx in xs[1:-1]: c.line(xx, y0, xx, y0 + cart_h)
    def k(x, y, s): c.setFillColor(MUTE); c.setFont("Helvetica", 5.5); c.drawString(x, y, s.upper())
    def v(x, y, s, bold=False, sz=8): c.setFillColor(INK); c.setFont("Helvetica-Bold" if bold else "Helvetica", sz); c.drawString(x, y, s)
    p = 7; yt = y0 + cart_h - 12
    # col 1
    x1 = xs[0] + p
    k(x1, yt + 3, "Projet"); v(x1, yt - 7, "LES VEILLEURS — Beaufort 27", True, 9)
    k(x1, yt - 20, "Artiste · Maître d'œuvre"); v(x1, yt - 30, "Eva L'Hoest · +32 495 57 92 12 · eva.lhoest@gmail.com", sz=7.2)
    k(x1, yt - 43, "Assistant électromécanique"); v(x1, yt - 53, "Gioacchino Miceli · +32 497 84 45 10 · gioacchino.miceli@thefaktory.com", sz=7.2)
    # col 2
    x2 = xs[1] + p
    k(x2, yt + 3, "Document"); v(x2, yt - 7, meta["titre"], True, 8.5)
    k(x2, yt - 20, "Objet"); v(x2, yt - 30, meta.get("objet", ""), sz=7.2)
    k(x2, yt - 43, "N° document · révision · date · heure"); v(x2, yt - 53, f"{meta['num']} · rév. {meta['rev']} · {meta['date']}", True, 7.5)
    if meta.get("url"): k(x2, yt - 64, "En ligne"); v(x2, yt - 73, meta["url"], sz=7)
    # col 3
    x3 = xs[2] + p
    k(x3, yt + 3, "Statut"); c.setStrokeColor(ACC); c.setFillColor(ACC); c.setFont("Helvetica-Bold", 8)
    sw = c.stringWidth(meta["statut"], "Helvetica-Bold", 8) + 10; c.rect(x3, yt - 11, sw, 12); c.drawString(x3 + 5, yt - 8, meta["statut"])
    c.setFillColor(MUTE); c.setFont("Helvetica", 5.6)
    for i, ln in enumerate(_wrap(c, LEGAL, "Helvetica", 5.6, xs[3] - x3 - p)): c.drawString(x3, yt - 24 - i * 7, ln)
    c.setFillColor(MUTE); c.setFont("Helvetica", 6); c.drawRightString(xs[3] - p, y0 + 5, "1 / 1")
    c.showPage(); c.save(); os.remove(tmp)
    return out_pdf

def sizes(root, out="docs/sizes.js"):
    S = {}
    for dp, dn, fn in os.walk(root):
        if ".git" in dp or "node_modules" in dp: continue
        for f in fn:
            p = os.path.relpath(os.path.join(dp, f), root)
            if p.split("/")[0] in ("docs", "img"): S[p] = os.path.getsize(os.path.join(dp, f))
    with open(os.path.join(root, out), "w") as fh:
        fh.write("// tailles des fichiers (généré) — utilisé par lv.js pour l'affichage des téléchargements\nwindow.SIZES=" + json.dumps(S, indent=0, sort_keys=True) + ";\n")
    return S

def now_be():
    try:
        import zoneinfo; tz = zoneinfo.ZoneInfo("Europe/Brussels")
        return datetime.datetime.now(tz).strftime("%d-%m-%Y %H:%M")
    except Exception:
        return datetime.datetime.now().strftime("%d-%m-%Y %H:%M")
