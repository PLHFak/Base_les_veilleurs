// Configuration de la mesure d'audience (identique dans les trois dépôts).
// L'URL et la clé « anon » Supabase sont publiques par conception : la lecture des statistiques
// n'est possible qu'avec le code administrateur, vérifié dans la base (fonction lv_stats).
// Les variables d'environnement Vercel, si elles existent, ont priorité.
module.exports = {
  url: process.env.SUPABASE_URL || "https://rlbhgxedmpxsllsqcnhy.supabase.co",
  key: process.env.SUPABASE_ANON_KEY || "sb_publishable_KnZ4S0YkI7Yux0ZtytgJxg_4qY1spdW",
  ready() { return this.url.startsWith("https://") && !this.key.startsWith("__"); }
};
