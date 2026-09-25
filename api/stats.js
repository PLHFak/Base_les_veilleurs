// Statistiques d'audience : le code administrateur est vérifié dans la base (lv_stats), jamais dans le navigateur.
const cfg = require("./_cfg");
function readBody(req) {
  return new Promise(r => { let d = ""; req.on("data", c => { d += c; if (d.length > 1024) req.destroy(); }); req.on("end", () => r(d)); req.on("error", () => r("")); });
}
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store"); res.setHeader("Content-Type", "application/json");
  if (req.method !== "POST") { res.statusCode = 405; return res.end("{}"); }
  let b = {}; try { b = JSON.parse(await readBody(req) || "{}"); } catch (e) {}
  if (!cfg.ready()) { res.statusCode = 503; return res.end(JSON.stringify({ error: "non configuré" })); }
  const code = String(b.code || "").slice(0, 40), days = Math.min(Math.max(+b.days || 90, 1), 3660);
  try {
    const r = await fetch(cfg.url + "/rest/v1/rpc/lv_stats", { method: "POST", headers: { apikey: cfg.key, Authorization: "Bearer " + cfg.key, "Content-Type": "application/json" }, body: JSON.stringify({ p_code: code, p_days: days }) });
    const txt = await r.text();
    if (!r.ok) { res.statusCode = 502; return res.end(JSON.stringify({ error: "base", detail: txt.slice(0, 200) })); }
    if (txt === "null" || txt === "") { res.statusCode = 403; return res.end(JSON.stringify({ error: "code" })); }
    res.end(txt);
  } catch (e) { res.statusCode = 502; res.end(JSON.stringify({ error: "réseau" })); }
};
