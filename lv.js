// Les Veilleurs — script commun aux trois dossiers (base, vitrine lenticulaire, aquarium K9).
// Fournit : grille d'accès (code EVA, ?code=EVA), barre commune (projet, dossiers frères, langues FR/EN/NL/DE),
// résolution des textes multilingues, cartes « Documents » avec vignette, cartouche technique de pied de page.
// Modifier ici, puis recopier à l'identique dans les trois dépôts.
(function(){
  const LANGS=["fr","en","nl","de"];
  const L=(fr,en,nl,de)=>({fr,en,nl,de});
  window.L=L;

  const UI={
    code:L("Code d'accès","Access code","Toegangscode","Zugangscode"),
    entrer:L("Entrer","Enter","Openen","Öffnen"),
    projet:L("LES VEILLEURS — Beaufort 27","LES VEILLEURS — Beaufort 27","LES VEILLEURS — Beaufort 27","LES VEILLEURS — Beaufort 27"),
    dossiers:L("Dossiers de travail :","Working files:","Werkdossiers:","Arbeitsdossiers:"),
    site_base:L("Base monobloc","Monolithic base","Monoliet sokkel","Monolithischer Sockel"),
    site_vitrine:L("Vitrine lenticulaire","Lenticular showcase","Lenticulaire vitrine","Lentikular-Vitrine"),
    site_aquarium:L("Aquarium K9","K9 aquarium","K9-aquarium","K9-Aquarium"),
    version:L("Version","Version","Versie","Version"),
    schemas_fr:L("Les schémas et plans sont légendés en français.","Drawings and plans are captioned in French.","Tekeningen en plannen zijn in het Frans gelegend.","Zeichnungen und Pläne sind auf Französisch beschriftet."),
    documents:L("Documents","Documents","Documenten","Dokumente"),
    doc_intro:L("Chaque document se télécharge dans son format d'origine ; les schémas existent aussi en PDF avec cartouche et en PNG.","Each document downloads in its original format; drawings are also available as PDF with title block and as PNG.","Elk document is te downloaden in zijn oorspronkelijke formaat; de tekeningen bestaan ook als PDF met cartouche en als PNG.","Jedes Dokument steht im Originalformat zum Download; die Zeichnungen gibt es auch als PDF mit Schriftfeld und als PNG."),
    pages:L("p.","pp.","p.","S."),
    rev:L("rév.","rev.","rev.","Rev."),
    ouvrir:L("Ouvrir","Open","Openen","Öffnen"),
    apercu:L("aperçu","preview","voorbeeld","Vorschau"),
    journal:L("Journal des mises à jour","Change log","Wijzigingslogboek","Änderungsprotokoll"),
    // Cartouche
    c_projet:L("Projet","Project","Project","Projekt"),
    c_artiste:L("Artiste · Maître d'œuvre","Artist · Project lead","Kunstenaar · Bouwheer-ontwerper","Künstlerin · Projektleitung"),
    c_assist:L("Assistant électromécanique","Electromechanical assistant","Elektromechanisch assistent","Elektromechanischer Assistent"),
    c_document:L("Document","Document","Document","Dokument"),
    c_objet:L("Objet","Subject","Onderwerp","Gegenstand"),
    c_num:L("N° document","Document no.","Documentnr.","Dokument-Nr."),
    c_rev:L("Révision","Revision","Revisie","Revision"),
    c_date:L("Date · heure","Date · time","Datum · uur","Datum · Uhrzeit"),
    c_statut:L("Statut","Status","Status","Status"),
    c_enligne:L("En ligne","Online","Online","Online"),
    c_source:L("Source","Source","Bron","Quelle"),
    c_legal:L("© Eva L'Hoest 2026 — Confidentiel. Reproduction, diffusion ou usage hors de cette consultation interdits sans accord écrit de l'artiste. Cotes non contractuelles.",
              "© Eva L'Hoest 2026 — Confidential. Reproduction, distribution or use outside this consultation is prohibited without the artist's written consent. Dimensions not contractual.",
              "© Eva L'Hoest 2026 — Vertrouwelijk. Reproductie, verspreiding of gebruik buiten deze consultatie verboden zonder schriftelijke toestemming van de kunstenaar. Maten niet contractueel.",
              "© Eva L'Hoest 2026 — Vertraulich. Vervielfältigung, Weitergabe oder Verwendung außerhalb dieser Ausschreibung ohne schriftliche Zustimmung der Künstlerin untersagt. Maße unverbindlich."),
    deploiement:L("Site statique, déploiement automatique Vercel à chaque commit ; seul data.js porte le contenu.","Static site, automatic Vercel deployment on every commit; all content lives in data.js.","Statische site, automatische Vercel-deployment bij elke commit; alle inhoud staat in data.js.","Statische Website, automatisches Vercel-Deployment bei jedem Commit; der gesamte Inhalt liegt in data.js."),
    copier:L("Copier le prompt","Copy the prompt","Prompt kopiëren","Prompt kopieren"),
    copie:L("Copié ✓","Copied ✓","Gekopieerd ✓","Kopiert ✓")
  };
  const STATUTS={
    "ESQUISSE":L("ESQUISSE","SKETCH","SCHETS","ENTWURF"),
    "ÉTUDE":L("ÉTUDE","STUDY","STUDIE","STUDIE"),
    "CONSULTATION":L("CONSULTATION","TENDER","CONSULTATIE","AUSSCHREIBUNG"),
    "BON POUR EXÉCUTION":L("BON POUR EXÉCUTION","FOR CONSTRUCTION","GOED VOOR UITVOERING","ZUR AUSFÜHRUNG"),
    "AS BUILT":L("AS BUILT","AS BUILT","AS BUILT","AS BUILT"),
    "HISTORIQUE":L("HISTORIQUE","SUPERSEDED","VERVALLEN","ÜBERHOLT")
  };
  const SITES=[
    {id:"base",url:"https://base-les-veilleurs.vercel.app",n:UI.site_base},
    {id:"vitrine",url:"https://vitrine-lenticulaire.vercel.app",n:UI.site_vitrine},
    {id:"aquarium",url:"https://aquarium-k9.vercel.app",n:UI.site_aquarium}
  ];

  // ---- langue -------------------------------------------------------------
  const qs=new URLSearchParams(location.search);
  let lang=(qs.get("lang")||"").toLowerCase();
  if(!LANGS.includes(lang)){try{lang=localStorage.getItem("lv_lang")||""}catch(e){}}
  if(!LANGS.includes(lang)){const n=(navigator.language||"fr").slice(0,2).toLowerCase();lang=LANGS.includes(n)?n:"fr"}
  const t=v=>{if(v==null)return "";if(typeof v!=="object"||Array.isArray(v))return v;return v[lang]??v.fr??Object.values(v)[0]??""};
  const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const statut=s=>t(STATUTS[s]||s);
  const size=u=>{const S=window.SIZES||{};const b=S[u];if(!b)return "";return b<1e6?Math.max(1,Math.round(b/1e3))+" ko":(b/1e6).toFixed(1).replace(".",",")+" Mo"};

  // ---- grille d'accès -------------------------------------------------------
  function gateInit(){
    const qc=qs.get("code");
    if(qc&&qc.toUpperCase()==="EVA"){sessionStorage.setItem("lv","1");qs.delete("code");history.replaceState(null,"",location.pathname+(qs.toString()?"?"+qs:""))}
    const g=document.getElementById("gate");if(!g)return;
    if(["1","2"].includes(sessionStorage.getItem("lv"))){g.remove();return}
    g.innerHTML=`<form><p>${t(UI.code)}</p><input id="code" type="password" autofocus><button>${t(UI.entrer)}</button></form>`;
    g.querySelector("form").addEventListener("submit",e=>{e.preventDefault();const i=g.querySelector("#code"),v=i.value.trim();
      if(v.toUpperCase()==="EVA"){sessionStorage.setItem("lv","1");g.remove();track("view")}
      else if(v.length>=3){sessionStorage.setItem("lv","2");sessionStorage.setItem("lv_code",v);g.remove();statsInit()}
      else i.value=""});
  }
  const isAdmin=()=>sessionStorage.getItem("lv")==="2";

  // ---- mesure d'audience (même domaine, échec silencieux, jamais pour l'administrateur) ----
  let SID="";try{SID=sessionStorage.getItem("lv_sid")||"";if(!SID){SID=Math.random().toString(36).slice(2,12);sessionStorage.setItem("lv_sid",SID)}}catch(e){}
  let SITE="",T0=Date.now(),viewed=false;
  function track(ev,extra){
    try{
      if(isAdmin()||sessionStorage.getItem("lv")!=="1")return;
      if(ev==="view"){if(viewed)return;viewed=true}
      let ref="";try{ref=document.referrer?new URL(document.referrer).hostname:""}catch(e){}
      if(ref===location.hostname)ref="";
      const body=JSON.stringify(Object.assign({site:SITE,ev,lang,page:location.pathname,sid:SID,ref},extra||{}));
      if(navigator.sendBeacon)navigator.sendBeacon("/api/hit",new Blob([body],{type:"text/plain"}));
      else fetch("/api/hit",{method:"POST",body,keepalive:true}).catch(()=>{});
    }catch(e){}
  }
  addEventListener("pagehide",()=>track("end",{dur:Math.round((Date.now()-T0)/1000)}));
  document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest("a[data-doc]");if(a)track("dl",{doc:a.dataset.doc})});

  // ---- chapitre Fréquentation (administrateur) -------------------------------
  const STAT_SITES={base:"Base",vitrine:"Vitrine",aquarium:"Aquarium"};
  function statsInit(){
    if(!isAdmin())return;
    const nav=document.querySelector("#nav ul");if(nav&&!nav.querySelector('a[href="#stats"]'))nav.insertAdjacentHTML("beforeend",'<li><a href="#stats">Fréquentation</a></li>');
    let sec=document.getElementById("stats");
    if(!sec){sec=document.createElement("section");sec.id="stats";const m=document.querySelector("main");m&&m.appendChild(sec)}
    sec.innerHTML='<h2>Fréquentation <span class="sub">— chapitre administrateur, invisible aux partenaires</span></h2><p class="leg">Chargement…</p>';
    const load=days=>{
      fetch("/api/stats",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({code:sessionStorage.getItem("lv_code"),days})})
        .then(r=>r.json().then(j=>({ok:r.ok,status:r.status,j})))
        .then(({ok,status,j})=>{sec.innerHTML=ok?statsHTML(j,days):`<h2>Fréquentation</h2><p class="note">${status===403?"Code administrateur refusé.":status===503?"Mesure d'audience non configurée (clé Supabase absente).":"Statistiques indisponibles : "+esc(j.detail||j.error||status)}</p>`;
          sec.querySelectorAll("button[data-days]").forEach(b=>b.addEventListener("click",()=>load(+b.dataset.days)))})
        .catch(()=>{sec.innerHTML='<h2>Fréquentation</h2><p class="note">Statistiques inaccessibles.</p>'});
    };
    load(90);
  }
  function bars(rows,label){
    const max=Math.max(1,...rows.map(r=>r.n));
    return `<table class="stats"><tr><th>${label}</th><th></th><th>visites</th></tr>${rows.map(r=>`<tr><td>${esc(STAT_SITES[r.k]||r.k)}</td><td class="bar"><div style="width:${Math.round(100*r.n/max)}%"></div></td><td>${r.n}</td></tr>`).join("")}</table>`;
  }
  function statsHTML(j,days){
    const fmt=d=>{const x=new Date(d);return x.toLocaleDateString("fr-BE",{day:"2-digit",month:"2-digit"})+" "+x.toLocaleTimeString("fr-BE",{hour:"2-digit",minute:"2-digit"})};
    const dur=s=>s==null?"":s<60?s+" s":Math.round(s/60)+" min";
    const byday=j.by_day||[];const maxd=Math.max(1,...byday.map(r=>r.n));
    return `<h2>Fréquentation <span class="sub">— chapitre administrateur, invisible aux partenaires</span></h2>
      <p class="lead">Trois sites confondus, hors visites administrateur. Aucune adresse IP ni cookie : pays et ville seulement.
      <span class="period">${[30,90,365].map(d=>`<button data-days="${d}" class="${d===days?"cur":""}">${d} j</button>`).join("")}</span></p>
      <div class="kv"><div><b>Visites (sessions)</b>${j.sessions}</div><div><b>Pages vues</b>${j.views}</div><div><b>Téléchargements</b>${j.downloads}</div></div>
      <h3>Visites par jour</h3><div class="spark">${byday.map(r=>`<div title="${esc(r.d)} : ${r.n}" style="height:${Math.max(3,Math.round(100*r.n/maxd))}%"></div>`).join("")||'<p class="leg">Aucune visite sur la période.</p>'}</div>
      <div class="vues" style="align-items:start">${bars(j.by_site||[],"Site")}${bars(j.by_lang||[],"Langue")}${bars(j.by_device||[],"Appareil")}</div>
      <h3>Pays et villes</h3>${bars(j.by_country||[],"Lieu")}
      <h3>Documents téléchargés</h3>${(j.docs||[]).length?`<table class="stats"><tr><th>Document</th><th>Site</th><th>Téléch.</th></tr>${j.docs.map(r=>`<tr><td>${esc(r.k)}</td><td>${esc(STAT_SITES[r.site]||r.site)}</td><td>${r.n}</td></tr>`).join("")}</table>`:'<p class="leg">Aucun téléchargement sur la période.</p>'}
      <h3>Dernières visites</h3><div class="scroll"><table class="stats"><tr><th>Date</th><th>Site</th><th>Langue</th><th>Lieu</th><th>Appareil</th><th>Provenance</th><th>Durée</th><th>Pages</th><th>Téléch.</th></tr>
      ${(j.recent||[]).map(r=>`<tr><td>${fmt(r.ts)}</td><td>${esc(STAT_SITES[r.site]||r.site)}</td><td>${esc((r.lang||"").toUpperCase())}</td><td>${esc([r.country,r.city].filter(Boolean).join(" · "))}</td><td>${esc(r.device||"")}</td><td>${esc(r.ref||"lien direct")}</td><td>${dur(r.dur)}</td><td>${r.pages}</td><td>${r.docs||""}</td></tr>`).join("")}</table></div>`;
  }

  // ---- barre commune --------------------------------------------------------
  function topbar(cur){
    const el=document.getElementById("topbar");if(!el)return;
    el.innerHTML=`<div class="wrap"><span class="proj">${t(UI.projet)}</span><span class="sites">${t(UI.dossiers)} ${SITES.map(s=>`<a href="${s.url}${s.id===cur?"":"?code=EVA"}" class="${s.id===cur?"cur":""}">${t(s.n)}</a>`).join("")}</span><span id="langs">${LANGS.map(l=>`<button data-l="${l}" class="${l===lang?"cur":""}">${l.toUpperCase()}</button>`).join("")}</span></div>`;
    el.querySelectorAll("#langs button").forEach(b=>b.addEventListener("click",()=>{track("lang",{lang:b.dataset.l});try{localStorage.setItem("lv_lang",b.dataset.l)}catch(e){}const p=new URLSearchParams(location.search);p.set("lang",b.dataset.l);location.search=p.toString()}));
  }

  // ---- cartes documents -------------------------------------------------------
  function docCard(d){
    const files=(d.files||[]).map(f=>`<a href="${esc(f.u)}" data-doc="${esc((d.id||t(d.titre).slice(0,40))+" ["+f.fmt+"]")}" ${f.ext?'class="ext" target="_blank" rel="noopener"':'download'}>${esc(f.fmt)}${size(f.u)?` · ${size(f.u)}`:""}</a>`).join("");
    const first=(d.files||[])[0];
    const th=d.thumb?`<a href="${esc(first?first.u:d.thumb)}" data-doc="${esc((d.id||t(d.titre).slice(0,40))+" [aperçu]")}" target="_blank" rel="noopener"><img src="${esc(d.thumb)}" alt="${esc(t(d.titre))}" loading="lazy"></a>`:`<span class="fmt">${first&&first.ext?"↗":esc((first&&first.fmt)||"—")}</span>`;
    const meta=[d.id?`<b>${esc(d.id)}</b>`:"",d.rev?`${t(UI.rev)} ${esc(d.rev)}`:"",d.date?esc(d.date):"",d.pages?`${d.pages} ${t(UI.pages)}`:"",d.auteur?esc(t(d.auteur)):""].filter(Boolean).join(" · ");
    return `<div class="doc"><div class="th">${th}</div><div class="body">${d.statut?`<span class="st">${esc(statut(d.statut))}</span>`:""}<div class="t">${esc(t(d.titre))}</div><div class="meta">${meta}</div>${d.note?`<div class="meta">${esc(t(d.note))}</div>`:""}<div class="dl">${files}</div></div></div>`;
  }
  function docs(groups){
    return groups.map(g=>`${g.groupe?`<div class="docgroupe">${esc(t(g.groupe))}</div>`:""}<div class="docs">${g.items.map(docCard).join("")}</div>`).join("");
  }

  // ---- cartouche ------------------------------------------------------------
  function cartouche(D){
    const C=D.cartouche||{};
    return `<div class="cartouche">
      <div><div class="k">${t(UI.c_projet)}</div><div class="v"><b>${t(UI.projet)}</b></div>
        <div class="k">${t(UI.c_artiste)}</div><div class="v">Eva L'Hoest · +32 495 57 92 12 · eva.lhoest@gmail.com</div>
        <div class="k">${t(UI.c_assist)}</div><div class="v">Gioacchino Miceli · +32 497 84 45 10 · gioacchino.miceli@thefaktory.com</div></div>
      <div><div class="k">${t(UI.c_document)}</div><div class="v"><b>${esc(t(D.titre))}</b></div>
        <div class="k">${t(UI.c_objet)}</div><div class="v">${esc(t(C.objet))}</div>
        <div class="k">${t(UI.c_num)} · ${t(UI.c_rev)} · ${t(UI.c_date)}</div><div class="v"><b>${esc(C.num)}</b> · ${t(UI.version).toLowerCase()} ${esc(D.version)} · ${esc(C.genere||D.date)}</div>
        <div class="k">${t(UI.c_enligne)} · ${t(UI.c_source)}</div><div class="v"><a href="${esc(C.url)}">${esc(String(C.url).replace(/^https?:\/\//,""))}</a> · <code>${esc(C.repo)}</code></div></div>
      <div><div class="k">${t(UI.c_statut)}</div><div class="v"><span class="statut">${esc(statut(C.statut))}</span></div>
        <div class="legal">${t(UI.c_legal)}</div>
        <div class="src">${t(UI.deploiement)}</div></div>
    </div>`;
  }

  // ---- init -----------------------------------------------------------------
  function init(D,site,render){
    document.documentElement.lang=lang;SITE=site;
    gateInit();topbar(site);
    document.title=t(D.titre)+" — Les Veilleurs";
    const h=document.getElementById("hdr");
    if(h)h.innerHTML=`<div class="wrap"><h1>${esc(t(D.titre))}</h1><div class="sub">${esc(t(D.sous_titre))} · ${t(UI.version)} ${esc(D.version)} · ${esc(D.date)}</div><div class="avis">${t(UI.schemas_fr)}</div></div>`;
    const nav=document.getElementById("nav");
    if(nav&&D.nav)nav.innerHTML=`<ul>${D.nav.map(n=>`<li><a href="${n.href||("#"+n.id)}">${esc(t(n.label))}</a></li>`).join("")}</ul>`;
    render&&render({t,esc,statut,docs,UI,lang});
    const dsec=document.getElementById("documents");
    if(dsec&&D.documents)dsec.innerHTML=`<h2>${t(UI.documents)}</h2><p class="lead">${t(UI.doc_intro)}</p>${docs(D.documents)}`;
    const j=document.getElementById("journal");
    if(j&&D.journal)j.innerHTML=`<h2>${t(UI.journal)}</h2><ul class="journal">${D.journal.map(x=>`<li><b>${esc(x.d)}</b><div>${esc(t(x.t))}</div></li>`).join("")}</ul>`;
    const f=document.getElementById("foot");
    if(f)f.innerHTML=cartouche(D);
    document.querySelectorAll("button.copy").forEach(b=>b.addEventListener("click",()=>{const s=document.getElementById(b.dataset.src);navigator.clipboard.writeText(s.textContent).then(()=>{b.textContent=t(UI.copie);setTimeout(()=>b.textContent=t(UI.copier),1500)})}));
    document.querySelectorAll("button.copy").forEach(b=>b.textContent=t(UI.copier));
    track("view");statsInit();
  }
  window.LV={LANGS,UI,STATUTS,SITES,lang,t,esc,statut,docs,cartouche,init,size};
})();
