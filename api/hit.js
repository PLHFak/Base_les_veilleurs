// Réception des mesures d'audience (même domaine que le site : aucun appel vers un tiers depuis le navigateur).
// Aucune adresse IP n'est stockée ; pays et ville viennent des en-têtes Vercel.
const cfg = require("./_cfg");
const SITES = ["base", "vitrine", "aquarium"], EVENTS = ["view", "lang", "dl", "end"];
function readBody(req) {
  return new Promise(r => { let d = ""; req.on("data", c => { d += c; if (d.length > 4096) req.destroy(); }); req.on("end", () => r(d)); req.on("error", () => r("")); });
}
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") { res.statusCode = 204; return res.end(); }
  let b = {}; try { b = JSON.parse(await readBody(req) || "{}"); } catch (e) {}
  const s = v => String(v ?? "").slice(0, 120);
  const ua = String(req.headers["user-agent"] || "");
  const row = {
    site: SITES.includes(b.site) ? b.site : "autre",
    ev: EVENTS.includes(b.ev) ? b.ev : "view",
    lang: /^[a-z]{2}$/.test(b.lang || "") ? b.lang : null,
    page: s(b.page) || "/",
    doc: s(b.doc) || null,
    sid: /^[a-z0-9]{6,20}$/.test(b.sid || "") ? b.sid : null,
    dur: Number.isFinite(+b.dur) ? Math.min(Math.round(+b.dur), 86400) : null,
    ref: s(b.ref) || null,
    country: s(req.headers["x-vercel-ip-country"]) || null,
    city: (() => { try { return decodeURIComponent(s(req.headers["x-vercel-ip-city"])) || null; } catch (e) { return null; } })(),
    device: /Mobi|Android|iPhone|iPad/i.test(ua) ? "mobile" : "desktop"
  };
  res.statusCode = 204;
  if (!cfg.ready()) return res.end();
  try {
    await fetch(cfg.url + "/rest/v1/lv_hits", { method: "POST", headers: { apikey: cfg.key, Authorization: "Bearer " + cfg.key, "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(row) });
  } catch (e) {}
  res.end();
};
