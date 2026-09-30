// Contrôle d'accès : le code saisi est vérifié dans la base (lv_gate_ao), jamais dans le navigateur.
// Réponse : { role: "admin" | "team" } ou 403. Les liens ?code=EVA des partenaires ne passent pas par ici.
const cfg = require("./_cfg");
function readBody(req) {
  return new Promise(r => { let d = ""; req.on("data", c => { d += c; if (d.length > 1024) req.destroy(); }); req.on("end", () => r(d)); req.on("error", () => r("")); });
}
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store"); res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") { res.statusCode = 405; return res.end("{}"); }
  let b = {}; try { b = JSON.parse(await readBody(req) || "{}"); } catch (e) {}
  if (!cfg.ready()) { res.statusCode = 503; return res.end(JSON.stringify({ error: "non configuré" })); }
  const code = String(b.code || "").slice(0, 40);
  if (code.length < 3) { res.statusCode = 403; return res.end(JSON.stringify({ error: "code" })); }
  try {
    const r = await fetch(cfg.url + "/rest/v1/rpc/lv_gate_ao", { method: "POST", headers: { apikey: cfg.key, Authorization: "Bearer " + cfg.key, "Content-Type": "application/json" }, body: JSON.stringify({ p_code: code }) });
    const txt = (await r.text()).trim().replace(/^"|"$/g, "");
    if (!r.ok) { res.statusCode = 502; return res.end(JSON.stringify({ error: "base" })); }
    if (txt !== "admin" && txt !== "team") { res.statusCode = 403; return res.end(JSON.stringify({ error: "code" })); }
    res.end(JSON.stringify({ role: txt }));
  } catch (e) { res.statusCode = 502; res.end(JSON.stringify({ error: "réseau" })); }
};
