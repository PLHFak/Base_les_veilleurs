# -*- coding: utf-8 -*-
"""Les Veilleurs — schémas de la fondation (plan + coupe par variante, schéma des efforts).
Cotes en mètres. Génère docs/png/*.png. Lancer depuis la racine du dépôt : python3 docs/calc/dessins.py"""
import json, math, os
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon, Rectangle, FancyArrowPatch

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
R = json.load(open(os.path.join(ROOT, "docs/calc/resultats.json")))
plt.rcParams.update({"font.family": "serif", "font.serif": ["Liberation Serif", "DejaVu Serif"], "font.size": 10.5,
                     "axes.unicode_minus": False, "hatch.linewidth": 0.5, "hatch.color": "#c9b98e"})
INK, ACC, MUTE, LINE = "#2b2b2b", "#5a7d8c", "#7a7a7a", "#d9d2c3"
SABLE, PIERRE, BETON, CONC, STAB, MORT, ALERTE = "#efe6cf", "#d8cfb8", "#c4c4bf", "#b9ad98", "#ddd3ba", "#8f8a7c", "#9a4a1f"
fr = lambda v, n=2: f"{v:.{n}f}".replace(".", ",")

def cote(ax, p1, p2, txt, off=0.0, side="below", color=INK, fs=9.5):
    """cote horizontale ou verticale entre p1 et p2, décalée de off"""
    (x1, y1), (x2, y2) = p1, p2
    if abs(y1 - y2) < 1e-9:   # horizontale
        y = y1 + off
        ax.annotate("", (x1, y), (x2, y), arrowprops=dict(arrowstyle="<->", color=color, lw=0.8, shrinkA=0, shrinkB=0))
        for x in (x1, x2): ax.plot([x, x], [y1, y], color=color, lw=0.4)
        ax.annotate(txt, ((x1 + x2) / 2, y), (0, 3 if side == "above" else -3), textcoords="offset points", ha="center", va="bottom" if side == "above" else "top", fontsize=fs, color=color)
    else:                      # verticale
        x = x1 + off
        ax.annotate("", (x, y1), (x, y2), arrowprops=dict(arrowstyle="<->", color=color, lw=0.8, shrinkA=0, shrinkB=0))
        for y in (y1, y2): ax.plot([x1, x], [y, y], color=color, lw=0.4)
        ax.annotate(txt, (x, (y1 + y2) / 2), (4 if side == "right" else -4, 0), textcoords="offset points", ha="left" if side == "right" else "right", va="center", fontsize=fs, color=color, rotation=90)

def rep(ax, xy, xytext, txt, ha="left", color=INK, fs=9.5):
    ax.annotate(txt, xy, xytext, fontsize=fs, color=color, ha=ha, va="center",
                arrowprops=dict(arrowstyle="-", color=MUTE, lw=0.6, shrinkA=2, shrinkB=0, relpos=(0 if ha == "left" else 1, 0.5)))
    ax.plot(*xy, "o", ms=2.5, color=MUTE)

def d_contour(n=80):
    a = np.linspace(0, math.pi, n)
    return [(-1.375, 0), (1.375, 0), (1.375, 0.75)] + [(1.375 * math.cos(t), 0.75 + 1.375 * math.sin(t)) for t in a] + [(-1.375, 0.75)]

def plan(ax, titre):
    ax.set_aspect("equal"); ax.axis("off")
    ax.add_patch(Polygon(d_contour(), closed=True, fc=PIERRE, ec=INK, lw=1.3, zorder=5))
    a = np.linspace(0, math.pi, 60)                         # rose des vents (réserve R 860)
    ax.plot([0.86 * math.cos(t) for t in a] + [0.86], [0.752 + 0.86 * math.sin(t) for t in a] + [0.752], color=MUTE, lw=0.6, zorder=6)
    ax.plot([-0.91, 0.91], [0.57, 0.57], color=ACC, lw=3, zorder=7)                                  # écran
    ax.add_patch(Rectangle((-1.115, 0), 2.23, 0.14, fc="none", ec=MUTE, lw=0.6, ls="--", zorder=6))  # niche des cristaux
    ax.text(0, 0.07, "niche des cristaux", ha="center", va="center", fontsize=7.5, color=MUTE, zorder=8)
    ax.text(0, 0.66, "écran", ha="center", va="bottom", fontsize=8, color=ACC, zorder=8)
    ax.text(0, 1.25, "socle Comblanchien\n6,7 t", ha="center", va="center", fontsize=9, color=INK, zorder=10, bbox=dict(fc=PIERRE, ec="none", pad=1.5))
    ax.figure.text(0.02, 0.875, titre, fontsize=11.5, color=ACC)

def socle_coupe(ax, z0=0.0, label=True):
    """coupe selon l'axe de symétrie : face plane (niche) à s = 0, sommet de l'arc à s = 2,125"""
    pts = [(0, z0), (2.125, z0), (2.125, z0 + 0.527), (0, z0 + 0.527), (0, z0 + 0.38), (0.14, z0 + 0.38), (0.14, z0 + 0.08), (0, z0 + 0.08)]
    ax.add_patch(Polygon(pts, closed=True, fc=PIERRE, ec=INK, lw=1.3, zorder=5))
    ax.add_patch(Rectangle((0.53, z0 + 0.02), 0.08, 1.731, fc="#ffffff", ec=ACC, lw=1.1, zorder=6))   # écran (montant encastré)
    ax.add_patch(Rectangle((0.53, z0 + 0.02), 0.08, 0.507, fc="#ffffff", ec=ACC, lw=0.6, ls=":", zorder=6))
    ax.text(0.57, z0 + 1.80, "écran", ha="center", va="bottom", fontsize=8.5, color=ACC)
    if label: ax.text(1.25, z0 + 0.27, "socle 6,7 t", ha="center", va="center", fontsize=9.5, color=INK, zorder=7)
    ax.text(0.07, z0 + 0.23, "niche", ha="center", va="center", fontsize=7, color=MUTE, rotation=90, zorder=7)

def sol(ax, x0, x1, zbas, fouille):
    """sable en place, avec la fouille (liste de points) laissée vide"""
    ax.add_patch(Polygon([(x0, 0), (fouille[0][0], 0)] + fouille[1:-1] + [(fouille[-1][0], 0), (x1, 0), (x1, zbas), (x0, zbas)], closed=True, fc=SABLE, ec="none", zorder=1))
    ax.add_patch(Polygon([(x0, 0), (fouille[0][0], 0)] + fouille[1:-1] + [(fouille[-1][0], 0), (x1, 0), (x1, zbas), (x0, zbas)], closed=True, fc="none", ec="#c9b98e", lw=0, hatch="....", zorder=1))
    ax.plot([x0, fouille[0][0]], [0, 0], color=INK, lw=0.9, zorder=3); ax.plot([fouille[-1][0], x1], [0, 0], color=INK, lw=0.9, zorder=3)
    ax.text(x0 + 0.05, zbas + 0.07, "sable de dune en place, fond de fouille compacté", ha="left", va="bottom", fontsize=8.5, color="#8a7a50", style="italic")

def cadre_coupe(ax, titre, x0=-1.25, x1=4.45, z0=-1.0, z1=2.0):
    ax.set_aspect("equal"); ax.axis("off"); ax.set_xlim(x0, x1); ax.set_ylim(z0, z1)
    ax.figure.text(0.42, 0.875, titre, fontsize=11.5, color=ACC)
    ax.text(x1 - 0.03, 0.04, "± 0,00 niveau du sable", fontsize=8.5, color=INK, va="bottom", ha="right")
    ax.annotate("nappe ≈ −2,0 m", (x1 - 0.45, z0 + 0.02), (x1 - 0.45, z0 + 0.33), fontsize=8.5, color=ACC, ha="center",
                arrowprops=dict(arrowstyle="->", color=ACC, lw=0.8))

def fig_variante(k):
    fig, (a1, a2) = plt.subplots(1, 2, figsize=(13.2, 6.6), gridspec_kw=dict(width_ratios=[1, 1.5]))
    v = R["variantes"][k]; c = R["couts"][k]
    if k == "A":
        plan(a1, "Plan — emprise de la fouille 3,35 × 2,75 m")
        a1.add_patch(Rectangle((-1.675, -0.30), 3.35, 2.75, fc=CONC, ec=INK, lw=0.9, ls="--", alpha=0.55, zorder=2))
        a1.add_patch(Polygon([(x * 1.07, 0.75 + (y - 0.75) * 1.07 if y > 0.75 else y - 0.10) for x, y in d_contour()], closed=True, fc=STAB, ec=MUTE, lw=0.6, zorder=3))
        rep(a1, (-1.55, 2.25), (-2.25, 2.85), "anneau de concassé, recouvert\nde 15 cm de sable", ha="left")
        rep(a1, (-1.42, 0.3), (-2.25, -0.95), "chape stabilisée sous le socle (débord 10 cm)", ha="left")
        cote(a1, (-1.675, -0.30), (1.675, -0.30), "3,35", off=-0.28); cote(a1, (1.675, -0.30), (1.675, 2.45), "2,75", off=0.30, side="right")
        cote(a1, (-1.375, 2.45), (1.375, 2.45), "socle 2,75", off=0.22, side="above")
        a1.set_xlim(-2.3, 2.4); a1.set_ylim(-1.15, 3.15)
        cadre_coupe(a2, "Coupe sur l'axe — profondeur 0,45 m")
        f = [(-0.36, 0), (-0.30, -0.45), (2.425, -0.45), (2.485, 0)]
        sol(a2, -1.25, 4.45, -1.0, [f[0]] + f + [f[-1]])
        a2.add_patch(Polygon([(-0.30, -0.45), (2.425, -0.45), (2.445, -0.15), (-0.32, -0.15)], closed=True, fc=CONC, ec=INK, lw=0.7, hatch="ooo", zorder=2))
        a2.add_patch(Polygon([(-0.32, -0.15), (-0.34, 0), (-0.13, 0), (-0.10, -0.03), (-0.10, -0.15)], closed=True, fc=SABLE, ec="none", hatch="....", zorder=2))
        a2.add_patch(Polygon([(2.445, -0.15), (2.465, 0), (2.255, 0), (2.225, -0.03), (2.225, -0.15)], closed=True, fc=SABLE, ec="none", hatch="....", zorder=2))
        a2.plot([-0.34, -0.13], [0, 0], color=INK, lw=0.9, zorder=3); a2.plot([2.255, 2.465], [0, 0], color=INK, lw=0.9, zorder=3)
        a2.add_patch(Polygon([(-0.10, -0.15), (2.225, -0.15), (2.225, -0.03), (-0.10, -0.03)], closed=True, fc=STAB, ec=INK, lw=0.7, zorder=3))
        a2.add_patch(Rectangle((0, -0.03), 2.125, 0.03, fc=MORT, ec=INK, lw=0.5, zorder=4))
        a2.plot([-0.37, -0.31, 2.435, 2.495], [-0.02, -0.46, -0.46, -0.02], color=ACC, lw=1.4, ls=(0, (5, 2)), zorder=4)
        socle_coupe(a2)
        rep(a2, (2.10, -0.015), (2.75, 0.75), "mortier de pose, 3 cm")
        rep(a2, (2.19, -0.09), (2.75, 0.52), "sable stabilisé 150 kg/m³, 12 cm")
        rep(a2, (2.34, -0.07), (2.75, 0.29), "sable remis et oyats, 15 cm")
        rep(a2, (2.40, -0.30), (2.75, -0.30), "concassé 0/32 compacté\nen deux couches, 30 cm")
        rep(a2, (1.0, -0.46), (1.0, -0.74), "géotextile 200 g/m² en fond et sur les flancs", ha="center", color=ACC)
        cote(a2, (-0.30, -0.45), (-0.30, 0), "0,45", off=-0.45, side="left"); cote(a2, (-0.30, -0.45), (0, -0.45), "0,30", off=-0.16)
        cote(a2, (0, 0), (2.125, 0), "2,125", off=0.95, side="above"); cote(a2, (0, 0), (0, 0.527), "0,527", off=-0.22, side="left")
    if k == "B":
        plan(a1, "Plan — deux dalles 2,00 × 2,00 m")
        a1.add_patch(Rectangle((-2.2, -0.2), 4.4, 2.4, fc=STAB, ec=MUTE, lw=0.7, ls="--", alpha=0.7, zorder=2))
        for x in (-2.0, 0.0): a1.add_patch(Rectangle((x, 0), 2.0, 2.0, fc=BETON, ec=INK, lw=1.0, zorder=3))
        a1.plot([0, 0], [0, 2.0], color=INK, lw=1.6, zorder=9, ls=(0, (2, 2)))
        rep(a1, (0, 0.35), (0.3, -0.45), "joint entre dalles,\nsous l'axe du socle")
        rep(a1, (0.25, 2.07), (0.55, 2.75), "le sommet de l'arc dépasse\nde 12,5 cm (2 % de l'appui)")
        rep(a1, (-1.7, 1.7), (-2.5, 2.75), "dalle 2,00 × 2,00 × 0,16\n1,5 t pièce", ha="left")
        cote(a1, (-2.0, 0), (2.0, 0), "4,00", off=-0.95); cote(a1, (2.0, 0), (2.0, 2.0), "2,00", off=0.42, side="right")
        a1.set_xlim(-2.6, 2.75); a1.set_ylim(-1.5, 3.4)
        cadre_coupe(a2, "Coupe sur l'axe — profondeur 0,31 m")
        f = [(-0.24, 0), (-0.20, -0.31), (2.20, -0.31), (2.24, 0)]
        sol(a2, -1.25, 4.45, -1.0, [f[0]] + f + [f[-1]])
        a2.add_patch(Polygon([(-0.20, -0.31), (2.20, -0.31), (2.21, -0.19), (-0.21, -0.19)], closed=True, fc=STAB, ec=INK, lw=0.7, zorder=2))
        a2.add_patch(Polygon([(-0.21, -0.19), (-0.235, 0), (0, 0), (0, -0.19)], closed=True, fc=SABLE, ec="none", hatch="....", zorder=2))
        a2.add_patch(Polygon([(2.21, -0.19), (2.235, 0), (2.125, 0), (2.125, -0.03), (2.0, -0.03), (2.0, -0.19)], closed=True, fc=SABLE, ec="none", hatch="....", zorder=2))
        a2.plot([-0.235, 0], [0, 0], color=INK, lw=0.9, zorder=3); a2.plot([2.125, 2.235], [0, 0], color=INK, lw=0.9, zorder=3)
        a2.add_patch(Rectangle((0, -0.19), 2.0, 0.16, fc=BETON, ec=INK, lw=1.0, zorder=3))
        a2.add_patch(Rectangle((0, -0.03), 2.0, 0.03, fc=MORT, ec=INK, lw=0.5, zorder=4))
        a2.plot([-0.25, -0.21, 2.21, 2.25], [-0.02, -0.32, -0.32, -0.02], color=ACC, lw=1.4, ls=(0, (5, 2)), zorder=4)
        socle_coupe(a2)
        rep(a2, (1.97, -0.015), (2.75, 0.75), "mortier de pose, 3 cm")
        rep(a2, (2.06, -0.01), (2.75, 0.52), "porte-à-faux du sommet de l'arc, 12,5 cm")
        rep(a2, (1.99, -0.11), (2.75, 0.29), "dalle préfabriquée armée, 16 cm")
        rep(a2, (2.19, -0.25), (2.75, -0.30), "lit de réglage en sable\nstabilisé compacté, 12 cm")
        rep(a2, (1.0, -0.32), (1.0, -0.62), "géotextile 200 g/m² en fond et sur les flancs", ha="center", color=ACC)
        cote(a2, (-0.20, -0.31), (-0.20, 0), "0,31", off=-0.55, side="left")
        cote(a2, (0, 0), (2.0, 0), "dalle 2,00", off=0.95, side="above"); cote(a2, (0, 0), (0, 0.527), "0,527", off=-0.22, side="left")
    if k == "C":
        plan(a1, "Plan — radier 2,95 × 2,33 m avec bêche")
        a1.add_patch(Rectangle((-1.475, -0.10), 2.95, 2.325, fc=BETON, ec=INK, lw=1.0, zorder=2))
        a1.add_patch(Rectangle((-1.225, 0.15), 2.45, 1.825, fc="none", ec=ALERTE, lw=0.9, ls="--", zorder=9))
        rep(a1, (1.3, 2.1), (0.45, 2.85), "angles du radier apparents derrière\nl'arc (à couvrir de sable)")
        rep(a1, (-1.225, 1.9), (-2.25, 2.85), "bêche périphérique 25 × 30 cm\nsous le radier", ha="left", color=ALERTE)
        cote(a1, (-1.475, -0.10), (1.475, -0.10), "2,95", off=-0.30); cote(a1, (1.475, -0.10), (1.475, 2.225), "2,33", off=0.30, side="right")
        a1.set_xlim(-2.3, 2.4); a1.set_ylim(-1.15, 3.15)
        cadre_coupe(a2, "Coupe sur l'axe — radier à −0,28 m, bêche à −0,58 m")
        f = [(-0.14, 0), (-0.10, -0.28), (-0.10, -0.58), (0.15, -0.58), (0.15, -0.28), (1.975, -0.28), (1.975, -0.58), (2.225, -0.58), (2.225, -0.28), (2.265, 0)]
        sol(a2, -1.25, 4.45, -1.0, [f[0]] + f + [f[-1]])
        a2.add_patch(Polygon([(-0.10, -0.03), (2.225, -0.03), (2.225, -0.58), (1.975, -0.58), (1.975, -0.23), (0.15, -0.23), (0.15, -0.58), (-0.10, -0.58)], closed=True, fc=BETON, ec=INK, lw=1.0, zorder=3))
        a2.add_patch(Rectangle((0.15, -0.28), 1.825, 0.05, fc="#dedad0", ec=INK, lw=0.5, zorder=3))
        for zz in (-0.075, -0.185): a2.plot([-0.05, 2.175], [zz, zz], color=ALERTE, lw=1.0, ls=(0, (1, 1.5)), zorder=4)
        a2.add_patch(Polygon([(-0.10, -0.03), (-0.135, 0), (0, 0), (0, -0.03)], closed=True, fc=SABLE, ec="none", zorder=2))
        a2.add_patch(Rectangle((0, -0.03), 2.125, 0.03, fc=MORT, ec=INK, lw=0.5, zorder=4))
        socle_coupe(a2)
        rep(a2, (2.10, -0.015), (2.75, 0.75), "mortier de pose, 3 cm")
        rep(a2, (2.20, -0.10), (2.75, 0.47), "radier C30/37 de 20 cm, treillis\n150 × 150 × 8 en deux nappes")
        rep(a2, (2.20, -0.45), (2.75, -0.40), "bêche 25 × 30 cm\ncontre le déchaussement")
        rep(a2, (1.0, -0.255), (1.05, -0.70), "béton de propreté 5 cm sur sable compacté", ha="center")
        cote(a2, (-0.10, -0.58), (-0.10, 0), "0,58", off=-0.60, side="left"); cote(a2, (-0.10, -0.03), (2.225, -0.03), "2,33", off=0.98, side="above")
        cote(a2, (0, 0), (0, 0.527), "0,527", off=-0.22, side="left")
    s = v["sols"]["lache"]
    fig.suptitle(f"Variante {k} — {v['nom']}", fontsize=14.5, color=INK, x=0.02, ha="left", y=0.975)
    cout = f"{c['total']:,}".replace(",", " ")
    fig.text(0.02, 0.025, f"Pression nette au sol {fr(v['q_net_kPa'],1)} kPa · tassement à 15 ans {fr(v['sols']['dense']['tassement_15ans_mm'],1)} à {fr(s['tassement_15ans_mm'],1)} mm · "
             f"pente induite ≤ {fr(s['pente_pct'],2)} % (seuil accepté 1 %) · portance sous vent extrême {fr(s['portance_projet'],1)} (sable lâche) · coût estimé ≈ {cout} € HTVA",
             fontsize=9.5, color=MUTE)
    fig.text(0.98, 0.955, "Cotes en mètres · esquisse à faire vérifier par un bureau d'études", fontsize=8.5, color=MUTE, ha="right")
    fig.subplots_adjust(left=0.01, right=0.99, top=0.86, bottom=0.07, wspace=0.0)
    fig.savefig(os.path.join(ROOT, f"docs/png/LV-FO-SCH-0{'ABC'.index(k)+2}_variante_{k}.png"), dpi=170, facecolor="white"); plt.close(fig)

def fig_efforts():
    e = R["vent"]["env"]; qcf = e["qp_Pa"] * 1.8 / 1000
    fig, ax = plt.subplots(figsize=(13.2, 6.8)); ax.set_aspect("equal"); ax.axis("off"); ax.set_xlim(-2.6, 5.6); ax.set_ylim(-0.7, 2.3)
    ax.add_patch(Rectangle((-2.6, -0.75), 8.2, 0.75, fc=SABLE, ec="none", hatch="....")); ax.plot([-2.6, 5.6], [0, 0], color=INK, lw=0.9)
    socle_coupe(ax, label=False)
    for i, s_ in enumerate((1.25, 1.5, 1.75)):                                   # figures (hypothèse)
        ax.add_patch(Rectangle((s_, 0.527), 0.10, 0.9, fc="#b08d57", ec=INK, lw=0.6, zorder=6))
    ax.text(1.55, 1.47, "3 figures (hypothèse 0,6 m²)", ha="center", fontsize=8.5, color=MUTE)
    F = [(s["aire_m2"] * qcf, s["z_m"], s["nom"]) for s in R["surfaces"]]
    x0 = [0.61, 2.125, 1.85]
    for (f, z, nom), xs in zip(F, x0):
        L = 0.11 * f + 0.35
        ax.add_patch(FancyArrowPatch((xs + L + 0.9, z), (xs + 0.02, z), arrowstyle="-|>", mutation_scale=16, color=ACC, lw=2.2, zorder=9))
        ax.text(xs + L + 0.95, z, f"{nom} : {fr(f,1)} kN à {fr(z,2)} m", va="center", fontsize=9.5, color=ACC)
    ax.text(5.5, 2.15, f"VENT — enveloppe {e['rafale_kmh']} km/h\nqp = {fr(e['qp_Pa']/1000,2)} kPa · cf = 1,8", ha="right", va="top", fontsize=11, color=ACC)
    ax.add_patch(FancyArrowPatch((R["bras_min_m"], 0.47), (R["bras_min_m"], 0.01), arrowstyle="-|>", mutation_scale=18, color=INK, lw=2.4, zorder=9))
    ax.text(R["bras_min_m"] + 0.07, 0.27, f"poids {fr(R['Wmin_kN'],1)} à {fr(R['W_kN'],1)} kN", fontsize=9.5, color=INK, va="center", zorder=9)
    ax.plot(0, 0, "o", ms=9, mfc=ALERTE, mec="white", zorder=10)
    ax.annotate("arête de basculement\n(pied de la face plane)", (0, 0), (-2.5, 0.75), fontsize=9.5, color=ALERTE, va="center",
                arrowprops=dict(arrowstyle="-", color=ALERTE, lw=0.8))
    cote(ax, (0, 0), (R["bras_min_m"], 0), f"bras {fr(R['bras_min_m'],2)}", off=-0.22)
    ax.add_patch(FancyArrowPatch((2.6, -0.33), (1.4, -0.33), arrowstyle="-|>", mutation_scale=14, color=MUTE, lw=1.6))
    ax.text(2.7, -0.33, bbox=dict(fc="#fbf9f4", ec="none", pad=2), s=f"frottement mobilisé : {fr(1.5*e['F_kN'],1)} kN à l'ELU (µ requis {fr(e['mu_requis'],2)}, µ admis 0,5)", va="center", fontsize=9.5, color=INK)
    txt = (f"Renversement (EQU) : moment du vent 1,5 × {fr(e['M_kNm'],1)} = {fr(e['Md_kNm'],1)} kN·m\n"
           f"moment stabilisant 0,9 × {fr(R['Wmin_kN'],1)} × {fr(R['bras_min_m'],2)} = {fr(e['Mstb_kNm'],1)} kN·m  →  rapport {fr(e['ratio_basculement'],1)}\n"
           f"Glissement pierre sur mortier : rapport {fr(e['gliss_DA1_1'],2)} (DA1/1) et {fr(e['gliss_DA1_2'],2)} (DA1/2)\n"
           f"Pression sous le socle : {fr(e['sigma_min_kPa'],1)} à {fr(e['sigma_max_kPa'],1)} kPa (moyenne {fr(e['sigma_moy_kPa'],1)}) en service, selon le sens du vent")
    ax.text(-2.5, 2.25, txt, fontsize=10, color=INK, va="top", linespacing=1.5, bbox=dict(fc="#fbf9f4", ec=LINE, boxstyle="square,pad=0.6"))
    fig.suptitle("Efforts du vent sur l'œuvre — vent perpendiculaire à l'écran, soufflant vers la face plane", fontsize=14, color=INK, x=0.02, ha="left", y=0.975)
    fig.text(0.98, 0.025, "Cotes en mètres · esquisse à faire vérifier par un bureau d'études", fontsize=8.5, color=MUTE, ha="right")
    fig.subplots_adjust(left=0.02, right=0.98, top=0.93, bottom=0.05)
    fig.savefig(os.path.join(ROOT, "docs/png/LV-FO-SCH-01_efforts_vent.png"), dpi=170, facecolor="white"); plt.close(fig)

if __name__ == "__main__":
    fig_efforts()
    for k in "ABC": fig_variante(k)
    print("schémas générés")
