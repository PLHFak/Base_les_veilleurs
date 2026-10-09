# -*- coding: utf-8 -*-
"""Les Veilleurs — note de calcul préliminaire de la fondation (LV-FO-NC-01).
Calcul reproductible : masses (modèle STEP v01 du 29-09-26), vent (NBN EN 1991-1-4 + ANB),
basculement (EQU, NBN EN 1990), glissement et portance (NBN EN 1997-1, approche DA1 belge),
tassement (Schmertmann 1978), quantités et coûts de trois variantes de fondation.
Pré-dimensionnement à faire vérifier et signer par un bureau d'études. Lancer : python3 calcul_fondation.py
"""
import json, math, os
HERE = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(HERE, "step_pieces.json")))   # volumes par pièce, extraits du STEP (mm3)
S = json.load(open(os.path.join(HERE, "step_socle.json")))    # socle : volume (L), encombrement, CG, face d'appui
g = 9.81
R = {}

# ---------------------------------------------------------------- 1. MASSES
def rho(n):                      # masse volumique par nom de pièce (kg/L)
    n = n.lower()
    if "cristal" in n: return 2.51            # K9 (équivalent BK7)
    if "lenticulai" in n: return 1.27          # PETG
    if any(k in n for k in ("epdm", "caoutchouc", "joint_tubu", "ruban", "cale_assise", "cordon")): return 1.2
    if "mousse" in n: return 0.5
    if any(k in n for k in ("cache_clipse", "tube_air", "cadre_posi")): return 1.4
    if ("verre_a" in n or "verre_b" in n or "verre_66" in n or "fond_noir" in n): return 2.5
    return 8.0                                  # inox 316L
m = {"ecran": 0.0, "aquarium": 0.0, "k9": 0.0}
for o in P:
    p = o["path"].split("/"); top = p[1] if len(p) > 1 else p[0]; name = p[-1]
    if top.startswith("base") or top.startswith("vol_"): continue
    kg = o["vol"] / 1e6 * rho(name)
    if "cristal" in name.lower(): m["k9"] += kg
    elif "ecran" in top: m["ecran"] += kg
    else: m["aquarium"] += kg
RHO_PIERRE = 2.70                               # Comblanchien, valeur du plan J. Miceli (fourchette 2,65–2,70)
m["socle"] = S["V"] * RHO_PIERRE
m["figures"] = 150.0                            # 3 x 50 kg (donnée projet, absentes du STEP)
m["rose"] = 100.0                               # rose des vents : hypothèse (50 à 200 kg selon épaisseur du bronze)
M_TOT = sum(m.values())
M_MIN = m["socle"] + m["ecran"] + m["aquarium"]  # cas de chantier : sans cristaux, figures ni rose
W, WMIN = M_TOT * g / 1000, M_MIN * g / 1000    # kN
R["masses_kg"] = {k: round(v, 1) for k, v in m.items()}
R["masse_totale_kg"] = round(M_TOT); R["masse_min_kg"] = round(M_MIN)
R["W_kN"] = round(W, 1); R["Wmin_kN"] = round(WMIN, 1)
R["socle"] = dict(volume_L=round(S["V"], 1), dims_mm=[2750, 2125, 527], aire_appui_m2=round(S["A"], 3),
                  Ix_m4=round(S["Ix"], 3), Iy_m4=round(S["Iy"], 3), cg_y_mm=round(S["cg"][1], 1), centroide_appui_y_mm=round(S["cy"], 1))
# CG global (axe y : face plane à +120 mm, sommet de l'arc à -2005 mm)
ys = [(m["socle"], S["cg"][1]), (m["ecran"], -450), (m["aquarium"] + m["k9"], 50), (m["figures"], -900), (m["rose"], -995)]
YCG = sum(a * b for a, b in ys) / sum(a for a, _ in ys)
BRAS = min(120 - YCG, YCG + 2005) / 1000        # bras de levier minimal du poids (m), arête de la face plane
R["cg_global_y_mm"] = round(YCG); R["bras_min_m"] = round(BRAS, 3)

# ---------------------------------------------------------------- 2. VENT
RHO_A, VB0, Z0, ZE = 1.25, 26.0, 0.003, 1.751   # côte belge (arr. Ostende), catégorie 0, ze = h
def qp(co=1.0):
    kr = 0.19 * (Z0 / 0.05) ** 0.07
    cr = kr * math.log(max(ZE, 1.0) / Z0)
    Iv = 1.0 / math.log(max(ZE, 1.0) / Z0)      # ANB : kI = co -> Iv indépendant de l'orographie
    return (1 + 7 * Iv) * 0.5 * RHO_A * (cr * co * VB0) ** 2
CAS = [("plat", "Eurocode, terrain plat (co = 1,0)", qp(1.0)),
       ("crete", "Eurocode, crête de dune (co = 1,5)", qp(1.5)),
       ("env", "Enveloppe de projet 220 km/h", 0.5 * RHO_A * (220 / 3.6) ** 2)]
R["qp_co_max_1_6_Pa"] = round(qp(1.6))
CF = 1.8                                        # panneau / mur isolé, valeur enveloppe (EN 1991-1-4 §7.4)
SURF = [("Écran et cadre", 1.82 * (1.751 - 0.528), (1.751 + 0.528) / 2),
        ("Face du socle", 2.75 * 0.528, 0.264),
        ("3 figures (hypothèse)", 0.60, 0.528 + 0.45)]
R["surfaces"] = [dict(nom=n, aire_m2=round(a, 3), z_m=round(z, 3)) for n, a, z in SURF]
MU = 0.5                                        # frottement pierre / mortier, adhérence négligée
R["vent"] = {}
for key, nom, q in CAS:
    F = sum(q * CF * a for _, a, _ in SURF) / 1000
    M = sum(q * CF * a * z for _, a, z in SURF) / 1000
    Mstb = 0.9 * WMIN * BRAS                    # EQU : gamma_G,inf = 0,9 ; gamma_Q = 1,5
    A, Ix = S["A"], S["Ix"]
    v = max(S["cy"] + 2005, 120 - S["cy"]) / 1000   # distance centroïde–bord la plus grande : enveloppe des deux sens de vent
    sig_elu_min = 0.9 * WMIN / A - 1.5 * M * v / Ix  # ELU (0,9 G ; 1,5 Q) : négatif = décollement partiel du bord
    R["vent"][key] = dict(nom=nom, qp_Pa=round(q), rafale_kmh=round(math.sqrt(2 * q / RHO_A) * 3.6),
        F_kN=round(F, 1), M_kNm=round(M, 1), Md_kNm=round(1.5 * M, 1), Mstb_kNm=round(Mstb, 1),
        ratio_basculement=round(Mstb / (1.5 * M), 1),
        gliss_DA1_1=round(WMIN * MU / (1.5 * F), 2), gliss_DA1_2=round(WMIN * MU / 1.25 / (1.1 * F), 2),
        mu_requis=round(1.5 * F / WMIN, 2),
        sigma_moy_kPa=round(W / A, 1), sigma_max_kPa=round(W / A + M * v / Ix, 1), sigma_min_kPa=round(W / A - M * v / Ix, 1),
        sigma_min_ELU_kPa=round(sig_elu_min, 1), excentricite_mm=round(M / W * 1000))
F_ENV, M_ENV = R["vent"]["env"]["F_kN"], R["vent"]["env"]["M_kNm"]

# ---------------------------------------------------------------- 3. VARIANTES
PERIM = math.pi * 1.375 + 2 * 0.75 + 2.75       # périmètre du D (m)
GAM_SABLE, GAM_DEJ, NAPPE = 16.0, 9.0, 2.0      # poids volumique du sable hors nappe, déjaugé ; profondeur de la nappe (m)
def aire_decalee(d): return S["A"] + PERIM * d + math.pi * d * d
VAR = {
 "A": dict(nom="Lit de concassé et chape stabilisée", D=0.45, emprise=(3.35, 2.75),
           couches=[("mortier de pose", 0.03, 21), ("sable stabilisé 150 kg/m³", 0.12, 20), ("concassé 0/32 compacté", 0.30, 20)],
           A_sol=aire_decalee(0.45 / 2), B=2.125 + 0.45, L=aire_decalee(0.45 / 2) / (2.125 + 0.45), extra=0.0, poids_fond=3.35 * 2.75 * (0.12 * 20 + 0.30 * 20) + S["A"] * 0.03 * 21, delta=2 / 3),
 "B": dict(nom="Dalles béton préfabriquées", D=0.31, emprise=(4.40, 2.40),
           couches=[("mortier de pose", 0.03, 21), ("2 dalles 2,00 × 2,00 × 0,16", 0.16, 24), ("lit de réglage stabilisé", 0.12, 20)],
           A_sol=aire_decalee(0.28 / 2), B=2.0, L=2.75 + 0.28, extra=0.0, poids_fond=2 * 1.50 * g + 4.4 * 2.4 * 0.12 * 20 + S["A"] * 0.03 * 21, delta=2 / 3),
 "C": dict(nom="Radier en béton armé", D=0.28, emprise=(2.95, 2.33),
           couches=[("mortier de pose", 0.03, 21), ("radier C30/37 armé", 0.20, 25), ("béton de propreté", 0.05, 23)],
           A_sol=2.95 * 2.33, B=2.33, L=2.95, extra=10.56 * 0.25 * 0.30 * (25 - GAM_SABLE), poids_fond=2.95 * 2.33 * (0.20 * 25 + 0.05 * 23) + 10.56 * 0.25 * 0.30 * 25 + S["A"] * 0.03 * 21, delta=1.0),
}
def portance(phi_deg, B, L, D, H, V, Mm, nappe):
    """EN 1997-1 annexe D, conditions drainées, c' = 0. Rapport résistance / charge verticale.
    L'encastrement n'est PAS compté (q = 0) : le sable qui recouvre le pourtour peut partir.
    nappe : profondeur de la nappe sous la surface (m) ; poids volumique interpolé si elle est à moins de B sous l'assise."""
    e = Mm / V; Bp = B - 2 * e; A = Bp * L
    dw = max(0.0, nappe - D); gam = GAM_DEJ + min(1.0, dw / B) * (GAM_SABLE - GAM_DEJ)
    t = math.tan(math.radians(phi_deg)); Nq = math.exp(math.pi * t) * math.tan(math.radians(45 + phi_deg / 2)) ** 2; Ng = 2 * (Nq - 1) * t
    sg = 1 - 0.3 * Bp / L
    mm = (2 + Bp / L) / (1 + Bp / L); ig = (1 - H / V) ** (mm + 1)
    return A * 0.5 * gam * Bp * Ng * sg * ig / V
def portance_cas(phi, V_, N, H, Mm, nappe):
    """plus faible des deux combinaisons de l'approche de calcul 1 belge"""
    phid = math.degrees(math.atan(math.tan(math.radians(phi)) / 1.25))
    r2 = portance(phid, V_["B"], V_["L"], V_["D"], 1.1 * H, N, 1.1 * Mm, nappe)             # DA1/2 : Q x 1,1 ; tan(phi) / 1,25
    r1 = portance(phi, V_["B"], V_["L"], V_["D"], 1.5 * H, 1.35 * N, 1.5 * Mm, nappe)        # DA1/1 : G x 1,35 ; Q x 1,5
    return min(r1, r2)
def schmertmann(dq, B, D, qc, t_ans=15):
    """Tassement (mm) d'une semelle quasi carrée. qc : liste (profondeur max sous la surface en m, qc en MPa)."""
    sv0 = GAM_SABLE * D; svp = GAM_SABLE * (D + B / 2)
    Izp = 0.5 + 0.1 * math.sqrt(dq / svp)
    C1 = max(0.5, 1 - 0.5 * sv0 / dq); C2 = 1 + 0.2 * math.log10(t_ans / 0.1)
    n = 200; dz = 2 * B / n; s = 0.0
    for i in range(n):
        z = (i + 0.5) * dz
        Iz = 0.1 + (Izp - 0.1) * z / (B / 2) if z <= B / 2 else Izp * (2 * B - z) / (1.5 * B)
        prof = D + z; q = next((v for lim, v in qc if prof <= lim), qc[-1][1])
        s += Iz / (2.5 * q * 1000) * dz          # E = 2,5 qc (kPa)
    return C1 * C2 * dq * s * 1000
SOLS = {"lache": ("Sable lâche (hypothèse basse)", [(1, 2), (3, 4), (99, 8)], 27),
        "moyen": ("Sable moyennement dense", [(1, 4), (3, 8), (99, 12)], 30),
        "dense": ("Sable dense", [(1, 8), (3, 12), (99, 15)], 32)}
R["variantes"] = {}
for k, V_ in VAR.items():
    Wf = V_["poids_fond"]; N = W + Wf; Nmin = WMIN + Wf; D = V_["D"]
    q_brut = (W + V_["extra"]) / V_["A_sol"] + sum(e * gm for _, e, gm in V_["couches"])
    q_net = q_brut - GAM_SABLE * D
    Mf = M_ENV + F_ENV * D                        # moment au niveau de l'assise
    out = dict(nom=V_["nom"], profondeur_m=D, emprise_m=V_["emprise"], poids_fondation_kN=round(Wf, 1),
               q_brut_kPa=round(q_brut, 1), q_net_kPa=round(q_net, 1), sols={})
    for sk, (snom, qc, phi) in SOLS.items():
        tdel = math.tan(math.radians(phi * V_["delta"]))
        s = schmertmann(max(q_net, 1.0), V_["B"], D, qc)
        out["sols"][sk] = dict(nom=snom, phi=phi,
            portance_poids_seul=round(portance_cas(phi, V_, N, 0.0, 0.0, NAPPE), 1),          # sans vent, nappe à 2 m
            portance_projet=round(portance_cas(phi, V_, N, F_ENV, Mf, NAPPE), 1),            # vent d'enveloppe, nappe à 2 m
            portance_extreme=round(portance_cas(phi, V_, N, F_ENV, Mf, D), 1),               # vent d'enveloppe, nappe remontée à l'assise
            glissement_DA1_2=round(Nmin * tdel / 1.25 / (1.1 * F_ENV), 1), glissement_DA1_1=round(Nmin * tdel / (1.5 * F_ENV), 1),
            tassement_15ans_mm=round(s, 1), differentiel_mm=round(0.75 * s, 1), pente_pct=round(0.75 * s / (2125) * 100, 2))
    R["variantes"][k] = out
R["critere_1pct_mm"] = round(0.01 * 2125, 1)

# scénario de déchaussement : appui perdu sur une bande de 0,50 m le long de la face plane, forme en D réelle, sans vent
def dechaussement(bande=0.5, n=600):
    pts = []; h = 2.125 / n
    for i in range(n):
        y = (i + 0.5) * h                       # distance à la face plane
        if y < bande: continue
        half = 1.375 if y <= 0.75 else math.sqrt(max(0.0, 1.375 ** 2 - (y - 0.75) ** 2))
        pts.append((y, 2 * half * h))
    A = sum(a for _, a in pts); yc = sum(y * a for y, a in pts) / A; I = sum((y - yc) ** 2 * a for y, a in pts)
    ycg = (120 - YCG) / 1000; e = yc - ycg       # la charge est côté face plane par rapport au nouvel appui
    return dict(aire_m2=round(A, 2), excentricite_m=round(e, 2), sigma_max_kPa=round(W / A + W * e * (yc - bande) / I, 1),
                sigma_min_kPa=round(W / A - W * e * (2.125 - yc) / I, 1), marge_cg_m=round(ycg - bande, 2))
R["dechaussement_050m"] = dechaussement()
# probabilité de rencontrer la tempête de période de retour T en n années
R["proba_tempete_15ans_pct"] = {T: round((1 - (1 - 1 / T) ** 15) * 100, 1) for T in (100, 1000)}

# ---------------------------------------------------------------- 4. COÛTS (EUR HTVA, prix publiés 2025-2026 + estimations)
COMMUN = [("Mini-pelle 3,5 t avec opérateur, 1 jour", 800), ("Amenée et repli de la machine", 120), ("Plaque vibrante 150 kg, 1 jour", 60),
          ("Géotextile non tissé 200 g/m², 15 m²", 40), ("Mortier de pose, 12 sacs de 25 kg", 60)]
COUTS = {
 "A": COMMUN + [("Dumper chenillé 800 kg, 1 jour", 130), ("Concassé 0/32, 6 t livrées", 200), ("Sable stabilisé, 1,1 m³ livré (petite charge)", 150), ("Main-d'œuvre, 2 ouvriers × 1 jour", 720)],
 "B": COMMUN + [("Dumper chenillé 800 kg, 1 jour", 130), ("Lit de réglage stabilisé, 1,3 m³ livré", 160), ("2 dalles neuves 2,00 × 2,00 × 0,16 m", 345), ("Transport des dalles (3,0 t)", 250), ("Pose des dalles à la grue (1 h supplémentaire)", 230), ("Main-d'œuvre, 2 ouvriers × 1 jour", 720)],
 "C": COMMUN + [("Béton C30/37, 2,3 m³ livrés (petite charge)", 500), ("Pompe à béton, forfait", 355), ("Treillis 150 × 150 × 8 en deux nappes, armatures de bêche", 210), ("Coffrage de rive, forfait", 250), ("Béton de propreté et film", 60), ("Main-d'œuvre, 2 ouvriers × 2 jours", 1440)],
}
ALEAS = 0.15
R["couts"] = {}
for k, lignes in COUTS.items():
    st = sum(v for _, v in lignes)
    R["couts"][k] = dict(lignes=lignes, sous_total=st, aleas=round(st * ALEAS), total=int(round(st * (1 + ALEAS), -2)))
R["quantites"] = {"A": dict(fouille_m3=round(3.35 * 2.75 * 0.45 * 1.2, 1), concasse_m3=round(3.35 * 2.75 * 0.30, 1), stabilise_m3=round(3.35 * 2.75 * 0.12, 1)),
                  "B": dict(fouille_m3=round(4.4 * 2.4 * 0.31 * 1.2, 1), stabilise_m3=round(4.4 * 2.4 * 0.12, 1), dalles=2),
                  "C": dict(fouille_m3=round((2.95 + 0.6) * (2.33 + 0.6) * 0.28 * 1.2 + 10.56 * 0.25 * 0.30, 1), beton_m3=round(2.95 * 2.33 * 0.20 + 10.56 * 0.25 * 0.30, 1))}
json.dump(R, open(os.path.join(HERE, "resultats.json"), "w"), ensure_ascii=False, indent=1)
open(os.path.join(HERE, "resultats.js"), "w").write("// Résultats de calcul_fondation.py (généré) — lus par index.html pour les tableaux chiffrés\nwindow.RES=" + json.dumps(R, ensure_ascii=False) + ";\n")
if __name__ == "__main__":
    print(json.dumps(R, ensure_ascii=False, indent=1))
