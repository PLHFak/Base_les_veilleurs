// Configuration de la mesure d'audience (identique dans les trois dépôts).
// L'URL et la clé « anon » Supabase sont publiques par conception : la lecture des statistiques
// n'est possible qu'avec le code administrateur, vérifié dans la base (fonction lv_stats).
// Les variables d'environnement Vercel, si elles existent, ont priorité.
module.exports = {
  url: process.env.SUPABASE_URL || "__SUPABASE_URL__",
  key: process.env.SUPABASE_ANON_KEY || "__SUPABASE_ANON_KEY__",
  ready() { return this.url.startsWith("https://") && !this.key.startsWith("__"); }
};
