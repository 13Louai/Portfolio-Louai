/*
 * Le portfolio en forme d'éditeur de code.
 * Chaque section est un « fichier » : on l'ouvre dans un onglet depuis l'explorateur, la palette (Ctrl+P),
 * le terminal ou un lien. L'adresse suit le fichier ouvert (#/projets/reflo) : on peut partager un lien direct.
 * Tout le contenu vient de js/data.js et js/activite.js.
 */
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  const ACTIVITE = window.ACTIVITE || [];
  const P = D.profil;
  const root = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 767px)');

  const CATEGORIES = {
    web: { nom: 'Web', c: 'var(--syn-type)' },
    mobile: { nom: 'Mobile', c: 'var(--syn-string)' },
    ia: { nom: 'IA et automatisation', c: 'var(--syn-keyword)' },
    jeux: { nom: 'Jeux', c: 'var(--syn-fn)' },
    apprentissage: { nom: 'Apprentissage', c: 'var(--syn-comment)' },
  };
  const COULEUR_LANGAGE = {
    TypeScript: 'var(--syn-type)',
    JavaScript: 'var(--syn-fn)',
    Java: 'var(--syn-string)',
    'Lua / Luau': 'var(--syn-keyword)',
    Python: 'var(--accent)',
    'HTML / CSS': 'var(--syn-num)',
  };
  const MOIS = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];

  const TRACES = {
    chev: '<path d="m6 9 6 6 6-6"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    atom: '<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
    code: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    download: '<path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14"/>',
    ext: '<path d="M7 17 17 7M8 7h9v9"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  };
  const svg = (nom) => `<svg viewBox="0 0 24 24" aria-hidden="true">${TRACES[nom]}</svg>`;

  const ICONES_FICHIER = {
    tsx: `<span class="fi fi-tsx">${svg('atom')}</span>`,
    ts: '<span class="fi fi-ts">TS</span>',
    md: '<span class="fi fi-md">M↓</span>',
    json: '<span class="fi fi-json">{}</span>',
    yml: '<span class="fi fi-yml">!</span>',
    pdf: '<span class="fi fi-pdf">PDF</span>',
    info: `<span class="fi fi-info">${svg('info')}</span>`,
    folder: `<span class="fi fi-folder">${svg('folder')}</span>`,
  };

  const store = {
    get(k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    set(k, v) {
      try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ }
    },
  };

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const sansAccents = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const mailto = (sujet) => `mailto:${P.email}?subject=${encodeURIComponent(sujet)}`;
  const pluriel = (n, mot) => `${n} ${mot}${n > 1 ? 's' : ''}`;
  const majuscule = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const [prenom, ...reste] = P.nom.split(' ');
  const nomFamille = reste.join(' ');

  // Dates « AAAA-MM-JJ » manipulées en UTC pour éviter les décalages de fuseau.
  const JOUR = 86400000;
  const versDate = (iso) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10));
  const versIso = (t) => new Date(t).toISOString().slice(0, 10);
  const jourSemaine = (t) => (new Date(t).getUTCDay() + 6) % 7; // lundi = 0
  const lundi = (t) => t - jourSemaine(t) * JOUR;
  const dateLongue = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  const dateCourte = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', timeZone: 'UTC' });
  const moisAn = (iso) => `${MOIS[+iso.slice(5, 7) - 1]} ${iso.slice(0, 4)}`;

  // --- Chiffres calculés depuis l'historique git ---------------------------------------------------

  const parProjet = {};
  ACTIVITE.forEach(([date, id, n]) => {
    const s = (parProjet[id] = parProjet[id] || { commits: 0, debut: date, fin: date });
    s.commits += n;
    if (date < s.debut) s.debut = date;
    if (date > s.fin) s.fin = date;
  });
  const totalCommits = ACTIVITE.reduce((n, c) => n + c[2], 0);
  const premierCommit = ACTIVITE.length ? ACTIVITE[0][0] : null;
  const commitsDe = (id) => (parProjet[id] ? parProjet[id].commits : 0);

  // Par langage : nombre de projets et de commits, trié par commits (le temps réellement passé).
  const parLangage = {};
  D.projets.forEach((p) =>
    p.langages.forEach((l) => {
      const s = (parLangage[l] = parLangage[l] || { projets: 0, commits: 0 });
      s.projets++;
      s.commits += commitsDe(p.id);
    })
  );
  const langages = Object.entries(parLangage).sort(
    (a, b) => b[1].commits - a[1].commits || b[1].projets - a[1].projets || a[0].localeCompare(b[0])
  );

  const domaines = Object.keys(CATEGORIES).filter(
    (c) => c !== 'apprentissage' && D.projets.some((p) => p.categories.includes(c))
  );

  function periode(id) {
    const s = parProjet[id];
    if (!s) return '—';
    const [a, b] = [s.debut, s.fin].map((d) => ({ m: MOIS[+d.slice(5, 7) - 1], y: d.slice(0, 4) }));
    if (a.y !== b.y) return majuscule(`${a.m} ${a.y} – ${b.m} ${b.y}`);
    if (a.m === b.m) return majuscule(`${a.m} ${a.y}`);
    return majuscule(`${a.m} – ${b.m} ${a.y}`);
  }

  function classeStatut(statut) {
    if (/fonctionnel|jouable|termin|en ligne|livr/i.test(statut)) return 'is-ok';
    if (/développement|en cours/i.test(statut)) return 'is-wip';
    return '';
  }

  // --- Les fichiers du portfolio ----------------------------------------------------------------------

  const fichiers = [
    { id: 'accueil', nom: 'accueil.tsx', type: 'tsx', langue: 'TypeScript React', vue: vueAccueil },
    { id: 'a-propos', nom: 'a-propos.md', type: 'md', langue: 'Markdown', vue: vueAPropos },
    { id: 'projets', nom: 'index.ts', type: 'ts', langue: 'TypeScript', dossier: 'projets', vue: vueProjets },
    ...D.projets.map((p) => ({
      id: `projets/${p.id}`,
      nom: `${p.id}.md`,
      type: 'md',
      langue: 'Markdown',
      dossier: 'projets',
      projet: p,
      vue: () => vueProjet(p),
    })),
    { id: 'competences', nom: 'competences.json', type: 'json', langue: 'JSON', vue: vueCompetences },
    ...(D.parcours.length ? [{ id: 'parcours', nom: 'parcours.ts', type: 'ts', langue: 'TypeScript', vue: vueParcours }] : []),
    { id: 'contact', nom: 'contact.yml', type: 'yml', langue: 'YAML', vue: vueContact },
    { id: 'readme', nom: 'README.md', type: 'info', langue: 'Markdown', vue: vueReadme },
  ];
  const parId = Object.fromEntries(fichiers.map((f) => [f.id, f]));
  const cheminDe = (f) => (f.dossier ? `${f.dossier}/${f.nom}` : f.nom);

  const state = {
    ouverts: [],
    actif: null,
    vue: 'explorer',
    timers: [],
  };

  // --- Explorateur, onglets, fil d'Ariane ----------------------------------------------------------

  function renderArbre() {
    const ligne = (f, profondeur) =>
      `<li><a class="tree-item" href="#/${f.id}" data-id="${f.id}" style="--depth: ${profondeur}">
        <span class="chev-space"></span>${ICONES_FICHIER[f.type]}<span class="tree-name">${esc(f.nom)}</span></a></li>`;
    let html = '';
    let dossierFait = false;
    fichiers.forEach((f) => {
      if (!f.dossier) {
        html += ligne(f, 0);
        return;
      }
      if (dossierFait) return;
      dossierFait = true;
      const contenu = fichiers.filter((x) => x.dossier === f.dossier);
      html += `<li>
        <button class="tree-item" type="button" aria-expanded="true" data-dossier="${f.dossier}" style="--depth: 0">
          ${svg('chev').replace('<svg', '<svg class="chev"')}${ICONES_FICHIER.folder}<span class="tree-name">${f.dossier}</span>
        </button>
        <ul>${contenu.map((x) => ligne(x, 1)).join('')}</ul>
      </li>`;
    });
    if (P.cv) {
      html += `<li><a class="tree-item" href="${esc(P.cv)}" download style="--depth: 0">
        <span class="chev-space"></span>${ICONES_FICHIER.pdf}<span class="tree-name">CV_${esc(P.nom.replace(/ /g, '_'))}.pdf</span></a></li>`;
    }
    const arbre = $('#tree');
    arbre.innerHTML = html;
    arbre.addEventListener('click', (e) => {
      const b = e.target.closest('[data-dossier]');
      if (!b) return;
      const ouvert = b.getAttribute('aria-expanded') === 'true';
      b.setAttribute('aria-expanded', !ouvert);
      b.nextElementSibling.hidden = ouvert;
    });
  }

  function marquerArbre() {
    $$('#tree [data-id]').forEach((a) => {
      const actif = a.dataset.id === state.actif;
      a.classList.toggle('is-active', actif);
      if (actif) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    $$('#git-list [data-id]').forEach((b) => b.classList.toggle('is-active', b.dataset.id === state.actif));
  }

  function renderOnglets() {
    $('#tabs').innerHTML = state.ouverts
      .map((id) => {
        const f = parId[id];
        return `<div class="tab${id === state.actif ? ' is-active' : ''}">
          <a class="tab-link" href="#/${id}"${id === state.actif ? ' aria-current="page"' : ''}>${ICONES_FICHIER[f.type]}<span>${esc(f.nom)}</span></a>
          <button type="button" class="tab-close" data-fermer="${id}" aria-label="Fermer ${esc(f.nom)}">${svg('close')}</button>
        </div>`;
      })
      .join('');
    const actif = $('#tabs .tab.is-active');
    if (actif) actif.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  function renderBarres(f) {
    const parties = ['louai-entamene', ...(f.dossier ? [f.dossier] : [])];
    $('#crumbs').innerHTML =
      parties.map((p) => `<span>${p}</span><span class="sep">›</span>`).join('') +
      `${ICONES_FICHIER[f.type]}<b>${esc(f.nom)}</b>`;
    $('#mobile-path').textContent = `~/${cheminDe(f).replace(/\.\w+$/, '')}`;
    $('#sb-lang').textContent = f.langue;
    document.title = f.id === 'accueil' ? `${P.nom} — ${P.titre}` : `${f.nom} — ${P.nom}`;
  }

  // --- Ouvrir et fermer des fichiers ----------------------------------------------------------------

  function idDepuisAdresse() {
    const id = decodeURIComponent(location.hash.replace(/^#\/?/, ''));
    return parId[id] ? id : null;
  }

  function ouvrir(id, opts = {}) {
    const f = parId[id] || parId.accueil;
    if (!state.ouverts.includes(f.id)) state.ouverts.push(f.id);
    const dejaAffiche = state.actif === f.id && !opts.forcer;
    state.actif = f.id;
    const adresse = `#/${f.id}`;
    if (location.hash !== adresse) history[opts.remplacer ? 'replaceState' : 'pushState'](null, '', adresse);

    renderOnglets();
    marquerArbre();
    renderBarres(f);
    fermerTiroir();
    if (!dejaAffiche) {
      nettoyer();
      const contenu = $('#contenu');
      const vue = f.vue();
      contenu.innerHTML = vue.html;
      contenu.scrollTop = 0;
      if (vue.init) vue.init(contenu);
    }
    if (opts.focus) $('#contenu').focus({ preventScroll: true });
  }

  function fermer(id) {
    const i = state.ouverts.indexOf(id);
    if (i < 0) return;
    state.ouverts.splice(i, 1);
    if (state.actif !== id) {
      renderOnglets();
      return;
    }
    const suivant = state.ouverts[i] || state.ouverts[i - 1];
    if (suivant) {
      ouvrir(suivant);
      return;
    }
    state.actif = null;
    history.pushState(null, '', '#/');
    nettoyer();
    renderOnglets();
    marquerArbre();
    $('#crumbs').innerHTML = '';
    $('#mobile-path').textContent = '~';
    $('#sb-lang').textContent = '';
    $('#contenu').innerHTML = vueVide();
  }

  function nettoyer() {
    state.timers.forEach((t) => clearTimeout(t));
    state.timers = [];
  }

  // --- Vues -------------------------------------------------------------------------------------------

  function vueAccueil() {
    const faits = [
      [D.projets.length, 'Projets'],
      [totalCommits, 'Commits'],
      [langages.length, 'Langages'],
      [domaines.length, 'Domaines'],
    ];
    const recherche = `${esc(P.recherche)}${P.disponibilite ? ` · dès ${esc(P.disponibilite)}` : ''}`;
    const reflo = commitsDe('reflo');
    const html = `<div class="page">
      <p class="cmt">// bonjour le monde — bienvenue sur mon portfolio</p>
      <h1 class="hero-name"><span>${esc(prenom)}</span><span class="accent">${esc(nomFamille)}</span></h1>
      <ul class="roles">
        <li style="--c: var(--syn-type)">${esc(P.titre)}</li>
        <li style="--c: var(--syn-keyword)">Futur ingénieur logiciel</li>
        <li style="--c: var(--syn-fn)">Web · Mobile · IA</li>
        <li class="role-alt" style="--c: var(--ok)">${recherche}</li>
      </ul>
      <p class="typed" aria-hidden="true"><span class="p">&gt;</span> <span id="typed"></span><span class="caret"></span></p>
      <p class="hero-text">
        Je conçois des applications complètes, du cahier des charges au produit qui fonctionne&nbsp;:
        un <b class="t">SaaS</b> de relance de devis${reflo ? ` (${reflo} commits)` : ''}, une <b class="s">application iPhone</b>,
        des <b class="k">bots autonomes</b> et des <b class="f">jeux multijoueurs</b>.
        Mon objectif&nbsp;: devenir <b>ingénieur logiciel</b>, en alternance.
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="#/projets">${svg('code')}Voir les projets</a>
        <a class="btn" href="#/a-propos">${svg('user')}À propos</a>
        <a class="btn" href="#/contact">${svg('mail')}Contact</a>
        ${P.cv ? `<a class="btn" href="${esc(P.cv)}" download>${svg('download')}CV (PDF)</a>` : ''}
      </div>
      <dl class="stats">${faits.map(([n, k]) => `<div><dd>${n}</dd><dt>${k}</dt></div>`).join('')}</dl>
      ${ACTIVITE.length ? panneauActivite() : ''}
      <ul class="socials">${liensSociaux()}</ul>
    </div>`;
    return {
      html,
      init(el) {
        if (ACTIVITE.length) initActivite(el);
        machineAEcrire();
      },
    };
  }

  function liensSociaux() {
    return [
      `<li><a href="${esc(P.github)}" target="_blank" rel="noopener">${svg('github')}GitHub</a></li>`,
      `<li><a href="${mailto('Alternance — prise de contact')}">${svg('mail')}E-mail</a></li>`,
      P.linkedin ? `<li><a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${svg('linkedin')}LinkedIn</a></li>` : '',
      P.cv ? `<li><a href="${esc(P.cv)}" download>${svg('download')}CV</a></li>` : '',
    ].join('');
  }

  function machineAEcrire() {
    const el = $('#typed');
    const phrases = [
      'Je construis des SaaS de bout en bout.',
      'Je code des bots qui travaillent seuls.',
      'Je développe des applications mobiles.',
      'Je crée des jeux multijoueurs.',
    ];
    if (reduceMotion.matches) {
      el.textContent = phrases[0];
      return;
    }
    let i = 0;
    let n = 0;
    let efface = false;
    const pas = () => {
      const phrase = phrases[i];
      n += efface ? -1 : 1;
      el.textContent = phrase.slice(0, n);
      let delai = efface ? 28 : 55;
      if (!efface && n === phrase.length) {
        efface = true;
        delai = 1800;
      } else if (efface && n === 0) {
        efface = false;
        i = (i + 1) % phrases.length;
        delai = 300;
      }
      state.timers.push(setTimeout(pas, delai));
    };
    pas();
  }

  function panneauActivite() {
    return `<div class="panel heat-panel">
      <div class="heat-top">
        <p class="heat-cmd"><span class="p">$</span>git log --all --author="${esc(prenom)}"</p>
        <div class="legend" aria-hidden="true"><span>Moins</span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>Plus</span></div>
      </div>
      <p class="heat-sum" id="heat-sum"></p>
      <div class="heat-scroll"><div class="heat" id="heat" role="img"></div></div>
      <div class="heat-tip" id="heat-tip" hidden></div>
    </div>`;
  }

  function initActivite(el) {
    const jours = new Map();
    ACTIVITE.forEach(([date, id, n]) => {
      const j = jours.get(date) || { total: 0, projets: [] };
      j.total += n;
      j.projets.push([id, n]);
      jours.set(date, j);
    });

    // 53 semaines, du lundi au dimanche, qui se terminent avec le dernier commit.
    const dernier = versDate(ACTIVITE[ACTIVITE.length - 1][0]);
    const fin = dernier + (6 - jourSemaine(dernier)) * JOUR;
    const debut = fin - (53 * 7 - 1) * JOUR;
    const semaines = 53;
    const niveau = (n) => (n === 0 ? 0 : n < 3 ? 1 : n < 7 ? 2 : n < 15 ? 3 : 4);

    let cases = '';
    let moisPrecedent = -1;
    const etiquettes = [];
    for (let t = debut, i = 0; t <= fin; t += JOUR, i++) {
      const iso = versIso(t);
      const j = jours.get(iso);
      cases += t > dernier ? '<i class="is-out"></i>' : `<i class="l${niveau(j ? j.total : 0)}" data-d="${iso}"></i>`;
      if (i % 7 === 0) {
        const m = new Date(t).getUTCMonth();
        if (m !== moisPrecedent) etiquettes.push([i / 7, MOIS[m]]);
        moisPrecedent = m;
      }
    }
    // La première étiquette chevaucherait la suivante si le mois est presque fini.
    if (etiquettes.length > 1 && etiquettes[1][0] - etiquettes[0][0] < 3) etiquettes.shift();

    const heat = $('#heat', el);
    heat.style.setProperty('--weeks', semaines);
    heat.innerHTML = `
      <div class="heat-months">${etiquettes.map(([w, m]) => `<span style="left: ${(w / semaines) * 100}%">${m}</span>`).join('')}</div>
      <div class="heat-days" aria-hidden="true"><span>lun</span><span></span><span>mer</span><span></span><span>ven</span><span></span><span></span></div>
      <div class="heat-grid">${cases}</div>`;

    const parMois = {};
    jours.forEach((j, iso) => (parMois[iso.slice(0, 7)] = (parMois[iso.slice(0, 7)] || 0) + j.total));
    const [moisMax] = Object.entries(parMois).sort((a, b) => b[1] - a[1])[0];
    const resume = `${pluriel(totalCommits, 'commit')} sur ${pluriel(Object.keys(parProjet).length, 'dépôt')} · ${pluriel(jours.size, 'jour')} actifs · mois le plus chargé : ${moisAn(moisMax + '-01')}`;
    $('#heat-sum', el).textContent = resume;
    heat.setAttribute('aria-label', `Commits par jour sur un an. ${resume}.`);

    const defile = $('.heat-scroll', el);
    defile.scrollLeft = defile.scrollWidth;

    const tip = $('#heat-tip', el);
    const panneau = $('.heat-panel', el);
    const nomProjet = Object.fromEntries(D.projets.map((p) => [p.id, p.nom]));
    let survol = null;
    const montrer = (cell) => {
      if (survol) survol.classList.remove('is-hover');
      survol = cell;
      cell.classList.add('is-hover');
      const iso = cell.dataset.d;
      const j = jours.get(iso);
      const quand = dateLongue.format(versDate(iso));
      tip.innerHTML = j
        ? `<b>${pluriel(j.total, 'commit')}</b> le ${quand}<span>${j.projets
            .slice()
            .sort((a, b) => b[1] - a[1])
            .map(([id, n]) => `${esc(nomProjet[id] || id)} (${n})`)
            .join(' · ')}</span>`
        : `Aucun commit le ${quand}`;
      tip.hidden = false;
      const c = cell.getBoundingClientRect();
      const r = panneau.getBoundingClientRect();
      const demi = tip.offsetWidth / 2;
      tip.style.left = `${Math.min(Math.max(c.left - r.left + c.width / 2, demi + 8), r.width - demi - 8)}px`;
      tip.style.top = `${c.top - r.top}px`;
    };
    const cacher = () => {
      tip.hidden = true;
      if (survol) survol.classList.remove('is-hover');
      survol = null;
    };
    const grille = $('.heat-grid', heat);
    grille.addEventListener('mouseover', (e) => {
      const cell = e.target.closest('i[data-d]');
      if (cell) montrer(cell);
    });
    grille.addEventListener('click', (e) => {
      const cell = e.target.closest('i[data-d]');
      if (cell) montrer(cell);
    });
    grille.addEventListener('mouseleave', cacher);
    defile.addEventListener('scroll', cacher, { passive: true });
  }

  function vueAPropos() {
    const reflo = commitsDe('reflo');
    const infos = [
      ['Disponibilité', P.disponibilite],
      ['Rythme', P.rythme],
      ['Lieu', P.localisation],
    ].filter(([, v]) => v);
    const methode = [
      [
        'Spécifier avant de coder',
        'Je pose le périmètre et les choix techniques par écrit avant la première ligne de code.',
        'Cahier des charges de SportApp, game design document d’Aura Battles.',
      ],
      [
        'Tester en conditions réelles',
        'Un projet n’est fini que lorsqu’il marche hors de l’environnement idéal.',
        'Bot bâtisseur validé sur un vrai serveur : 175 blocs sur 175, avec arrêt, reprise et matériaux manquants.',
      ],
      [
        'Rendre le projet facile à lancer',
        'N’importe qui doit pouvoir cloner le dépôt et démarrer sans aide.',
        'Reflo démarre en une commande : base PostgreSQL dans Docker, migrations et données de test.',
      ],
      [
        'Documenter ses choix',
        'J’explique l’installation, l’utilisation et le pourquoi des décisions importantes.',
        'README détaillé pour chaque projet phare, design system documenté pour Speed Meca.',
      ],
    ];
    const html = `<div class="page md">
      <p class="cmt">&lt;!-- a-propos.md --&gt;</p>
      <h1 class="page-title">À propos</h1>
      <p class="code-line"><span class="p">#</span> ${esc(P.nom)} · ${esc(P.titre.toLowerCase())}</p>

      <h2><span class="p">##</span>Qui je suis</h2>
      <p>
        Je développe des projets complets, seul, de l’idée jusqu’au produit qui tourne.
        ${premierCommit ? `Depuis ${moisAn(premierCommit)}&nbsp;:` : 'Parmi eux&nbsp;:'} un SaaS de relance de devis${reflo ? ` (${reflo} commits)` : ''},
        un bot Minecraft qui construit seul en survie, une application iPhone, des sites pour un garage et une maison
        d’hôtes, et plusieurs jeux multijoueurs.
      </p>
      <p>
        Ce qui me plaît&nbsp;: comprendre un problème réel, choisir une architecture adaptée, puis aller au bout,
        tests en conditions réelles et documentation compris.
      </p>

      <h2><span class="p">##</span>Ce que je recherche</h2>
      <p>
        Une alternance en développement logiciel, dans une équipe où livrer du code utile et apprendre les pratiques
        d’ingénierie à plus grande échelle&nbsp;: revue de code, tests, intégration continue. Mon objectif&nbsp;: devenir
        ingénieur logiciel.
      </p>
      ${infos.length ? `<dl class="meta-grid">${infos.map(([k, v]) => `<div><dt>${k}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>` : ''}

      <h2><span class="p">##</span>Ma façon de travailler</h2>
      <ol class="method">${methode
        .map(
          ([titre, texte, preuve], i) => `<li>
            <h3><span class="n">${String(i + 1).padStart(2, '0')}</span>${titre}</h3>
            <p>${texte}</p>
            <p class="proof"><span class="cmt">// exemple :</span> ${preuve}</p>
          </li>`
        )
        .join('')}</ol>

      <div class="actions">
        <a class="btn btn-primary" href="#/contact">${svg('mail')}Me contacter</a>
        <a class="btn" href="#/projets">${svg('code')}Voir les projets</a>
      </div>
    </div>`;
    return { html };
  }

  function carteProjet(p, grande) {
    const cat = CATEGORIES[p.categories[0]];
    const n = commitsDe(p.id);
    return `<a class="pcard" href="#/projets/${p.id}" data-cats="${p.categories.join(' ')}" style="--c: ${cat.c}">
      <div class="pcard-top">
        <span class="kicker">${p.categories.map((c) => CATEGORIES[c].nom).join(' · ')}</span>
        <span class="state ${classeStatut(p.statut)}">${esc(p.statut)}</span>
      </div>
      <div>
        <h3>${esc(p.nom)}</h3>
        <p class="pcard-sub">${esc(p.resume)}</p>
      </div>
      ${grande ? `<p class="pcard-desc">${esc(p.description)}</p>` : ''}
      <ul class="chips">${p.stack.slice(0, grande ? 8 : 4).map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
      <div class="pcard-foot">
        <span>${n ? pluriel(n, 'commit') : ''}${n ? ' · ' : ''}${esc(periode(p.id))}</span>
        <span class="pcard-open">${esc(p.id)}.md →</span>
      </div>
    </a>`;
  }

  function vueProjets() {
    const vedettes = D.projets.filter((p) => p.vedette);
    const autres = D.projets.filter((p) => !p.vedette);
    const cats = ['tous', ...Object.keys(CATEGORIES).filter((c) => D.projets.some((p) => p.categories.includes(c)))];
    const html = `<div class="page">
      <p class="cmt">// projets/index.ts — ce que j’ai conçu et développé</p>
      <h1 class="page-title">Projets</h1>
      <p class="code-line"><span class="k">export const</span> projets <span class="p">=</span> [...<span class="t">phares</span>, ...<span class="t">autres</span>]; <span class="cmt">// ${pluriel(D.projets.length, 'projet')}</span></p>
      <div class="filters" role="group" aria-label="Filtrer par domaine">${cats
        .map((c) => {
          const n = c === 'tous' ? D.projets.length : D.projets.filter((p) => p.categories.includes(c)).length;
          return `<button type="button" class="filter" data-f="${c}" aria-pressed="${c === 'tous'}">${c === 'tous' ? 'Tous' : CATEGORIES[c].nom}<span>${n}</span></button>`;
        })
        .join('')}</div>
      <p class="sub" data-groupe="vedettes">// projets phares</p>
      <div class="cards cards-lg" data-liste="vedettes">${vedettes.map((p) => carteProjet(p, true)).join('')}</div>
      <p class="sub" data-groupe="autres">// autres projets</p>
      <div class="cards cards-sm" data-liste="autres">${autres.map((p) => carteProjet(p, false)).join('')}</div>
      <p class="sub" id="aucun" hidden>// aucun projet dans cette catégorie</p>
    </div>`;
    return {
      html,
      init(el) {
        $('.filters', el).addEventListener('click', (e) => {
          const b = e.target.closest('.filter');
          if (!b) return;
          const f = b.dataset.f;
          $$('.filter', el).forEach((x) => x.setAttribute('aria-pressed', x === b));
          let total = 0;
          ['vedettes', 'autres'].forEach((g) => {
            let n = 0;
            $$(`[data-liste="${g}"] .pcard`, el).forEach((c) => {
              c.hidden = !(f === 'tous' || c.dataset.cats.split(' ').includes(f));
              if (!c.hidden) n++;
            });
            $(`[data-groupe="${g}"]`, el).hidden = n === 0;
            $(`[data-liste="${g}"]`, el).hidden = n === 0;
            total += n;
          });
          $('#aucun', el).hidden = total > 0;
        });
      },
    };
  }

  // Commits d'un projet regroupés par jour (projet court) ou par semaine (projet de plus de six semaines).
  function historiqueDe(id) {
    const lignes = ACTIVITE.filter((c) => c[1] === id);
    if (!lignes.length) return null;
    const premier = versDate(lignes[0][0]);
    const dernier = versDate(lignes[lignes.length - 1][0]);
    const parJour = dernier - premier <= 42 * JOUR;
    const pas = parJour ? JOUR : 7 * JOUR;
    const debut = parJour ? premier : lundi(premier);
    const fin = parJour ? dernier : lundi(dernier);
    const barres = new Array(Math.round((fin - debut) / pas) + 1).fill(0);
    lignes.forEach(([d, , n]) => {
      const t = parJour ? versDate(d) : lundi(versDate(d));
      barres[Math.round((t - debut) / pas)] += n;
    });
    return { barres, debut, pas, parJour, fin: parJour ? fin : fin + 6 * JOUR };
  }

  function boutonsProjet(p) {
    if (p.liens.length) {
      return p.liens
        .map((l) => `<a class="btn btn-primary" href="${esc(l.url)}" target="_blank" rel="noopener">${svg('github')}${esc(l.label)}${svg('ext')}</a>`)
        .join('');
    }
    return `<span class="private">${svg('lock')}Code privé</span>
      <a class="btn" href="${mailto(`Démo de ${p.nom}`)}">${svg('mail')}Demander une démo</a>`;
  }

  function vueProjet(p) {
    const i = D.projets.indexOf(p);
    const prec = D.projets[(i - 1 + D.projets.length) % D.projets.length];
    const suiv = D.projets[(i + 1) % D.projets.length];
    const cat = CATEGORIES[p.categories[0]];
    const h = historiqueDe(p.id);
    let historique = '';
    if (h) {
      const max = Math.max(...h.barres);
      const unite = h.parJour ? 'jour' : 'semaine';
      historique = `<h2><span class="p">##</span>Historique</h2>
        <div class="weeks" role="img" aria-label="${pluriel(commitsDe(p.id), 'commit')} répartis sur ${pluriel(h.barres.length, unite)}">
          ${h.barres
            .map((n, k) => {
              const quand = dateCourte.format(h.debut + k * h.pas);
              return `<i class="${n ? '' : 'is-zero'}" style="--h: ${n ? n / max : 0}" title="${h.parJour ? quand : `Semaine du ${quand}`} : ${pluriel(n, 'commit')}"></i>`;
            })
            .join('')}
        </div>
        <p class="weeks-axis"><span>${dateCourte.format(h.debut)}</span><span>commits par ${unite}</span><span>${dateCourte.format(h.fin)}</span></p>`;
    }
    const html = `<div class="page md">
      <a class="back" href="#/projets">← projets/index.ts</a>
      <p class="cmt">&lt;!-- projets/${esc(p.id)}.md --&gt;</p>
      <p class="kicker" style="--c: ${cat.c}; margin-top: 18px">${p.categories.map((c) => CATEGORIES[c].nom).join(' · ')}</p>
      <h1 class="page-title">${esc(p.nom)}</h1>
      <p class="lead">${esc(p.resume)}</p>
      <dl class="meta-grid">
        <div><dt>Statut</dt><dd><span class="state ${classeStatut(p.statut)}">${esc(p.statut)}</span></dd></div>
        <div><dt>Période</dt><dd>${esc(periode(p.id))}</dd></div>
        <div><dt>Commits</dt><dd>${commitsDe(p.id) || '—'}</dd></div>
        <div><dt>Langages</dt><dd>${p.langages.map(esc).join(', ')}</dd></div>
      </dl>

      <h2><span class="p">##</span>Le projet</h2>
      <p>${esc(p.description)}</p>
      ${p.points.length ? `<h2><span class="p">##</span>Points clés</h2><ul class="md-list">${p.points.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : ''}
      <h2><span class="p">##</span>Stack</h2>
      <ul class="chips">${p.stack.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      ${historique}
      <div class="actions">${boutonsProjet(p)}</div>

      <nav class="pager" aria-label="Autres projets">
        <a href="#/projets/${prec.id}"><span>← précédent</span>${esc(prec.nom)}</a>
        <a class="next" href="#/projets/${suiv.id}"><span>suivant →</span>${esc(suiv.nom)}</a>
      </nav>
    </div>`;
    return { html };
  }

  function vueCompetences() {
    const max = Math.max(1, langages[0][1].commits);
    const html = `<div class="page">
      <p class="cmt">// competences.json — calculées depuis mes dépôts git, pas estimées</p>
      <h1 class="page-title">Compétences</h1>
      <p class="code-line">{ <span class="s">"source"</span>: <span class="s">"git log"</span>, <span class="s">"depots"</span>: <span class="n">${Object.keys(parProjet).length}</span>, <span class="s">"commits"</span>: <span class="n">${totalCommits}</span> }</p>
      <div class="skills">
        <section>
          <h2 class="grp">Langages</h2>
          <ul class="bars">${langages
            .map(
              ([nom, s]) => `<li style="--c: ${COULEUR_LANGAGE[nom] || 'var(--accent)'}">
                <span>${esc(nom)}</span>
                <span class="bar" aria-hidden="true"><i style="--p: ${Math.max(0.03, s.commits / max)}"></i></span>
                <span class="val">${pluriel(s.commits, 'commit')}</span>
              </li>`
            )
            .join('')}</ul>
          <p class="note">// barre = nombre de commits ; ${langages.map(([n, s]) => `${n} : ${pluriel(s.projets, 'projet')}`).join(', ')}.</p>
        </section>
        <section>
          <h2 class="grp">Frameworks et outils</h2>
          <div class="tool-groups">${D.competences
            .map((g) => `<div><h3>${esc(g.domaine)}</h3><ul class="chips">${g.outils.map((o) => `<li>${esc(o)}</li>`).join('')}</ul></div>`)
            .join('')}</div>
        </section>
      </div>
    </div>`;
    return { html };
  }

  function vueParcours() {
    const html = `<div class="page">
      <p class="cmt">// parcours.ts — formation et expériences</p>
      <h1 class="page-title">Parcours</h1>
      <ol class="timeline">${D.parcours
        .map(
          (e) => `<li>
            <span class="tl-period">${esc(e.periode)}</span>
            <span class="tl-title">${esc(e.titre)}</span>
            ${e.lieu ? `<span>${esc(e.lieu)}</span>` : ''}
            ${e.details ? `<span class="tl-details">${esc(e.details)}</span>` : ''}
          </li>`
        )
        .join('')}</ol>
    </div>`;
    return { html };
  }

  function vueContact() {
    const lignes = [
      ['email', `<a class="s" href="${mailto('Alternance — prise de contact')}">"${esc(P.email)}"</a><button type="button" class="copy" data-copier>copier</button>`],
      ['github', `<a class="s" href="${esc(P.github)}" target="_blank" rel="noopener">"${esc(P.github.replace(/^https?:\/\//, ''))}"</a>`],
      P.linkedin && ['linkedin', `<a class="s" href="${esc(P.linkedin)}" target="_blank" rel="noopener">"${esc(P.linkedin.replace(/^https?:\/\/(www\.)?/, ''))}"</a>`],
      P.cv && ['cv', `<a class="s" href="${esc(P.cv)}" download>"${esc(P.cv)}"</a>`],
      ['statut', `<span class="s">"${esc(P.recherche.toLowerCase())}"</span>`],
      P.disponibilite && ['disponibilite', `<span class="s">"${esc(P.disponibilite)}"</span>`],
      P.rythme && ['rythme', `<span class="s">"${esc(P.rythme)}"</span>`],
      P.localisation && ['localisation', `<span class="s">"${esc(P.localisation)}"</span>`],
      ['reponse', '<span class="s">"rapide, par e-mail"</span>'],
    ].filter(Boolean);
    const html = `<div class="page">
      <p class="cmt"># contact.yml — écrivez-moi</p>
      <h1 class="page-title">Contact</h1>
      <p class="lead">Je recherche une alternance en développement logiciel. Pour une offre, une candidature en école ou un échange sur un projet, écrivez-moi&nbsp;: je réponds rapidement.</p>
      <div class="panel yaml">${lignes
        .map(([k, v], i) => `<div class="yl"><span class="ln">${i + 1}</span><span class="t">${k}</span><span class="p">:</span>&nbsp;${v}</div>`)
        .join('')}</div>
      <div class="actions">
        <a class="btn btn-primary" href="${mailto('Alternance — prise de contact')}">${svg('mail')}Envoyer un e-mail</a>
        <button type="button" class="btn" data-copier>Copier l’adresse</button>
        <a class="btn" href="${esc(P.github)}" target="_blank" rel="noopener">${svg('github')}GitHub</a>
        ${P.linkedin ? `<a class="btn" href="${esc(P.linkedin)}" target="_blank" rel="noopener">${svg('linkedin')}LinkedIn</a>` : ''}
      </div>
    </div>`;
    return { html };
  }

  function vueReadme() {
    const raccourcis = [
      [['Ctrl', 'P'], 'Chercher un fichier ou une commande'],
      [['Ctrl', 'J'], 'Ouvrir ou fermer le terminal'],
      [['Échap'], 'Fermer la palette ou le menu'],
    ];
    const html = `<div class="page md">
      <p class="cmt">&lt;!-- README.md --&gt;</p>
      <h1 class="page-title">README</h1>
      <p class="code-line"><span class="p">#</span> louai-entamene/portfolio</p>

      <p style="margin-top: 20px">Ce site est lui-même un projet&nbsp;: une interface d’éditeur de code, écrite à la main en HTML, CSS et JavaScript, sans framework ni étape de build.</p>

      <h2><span class="p">##</span>Sous le capot</h2>
      <ul class="md-list">
        <li>Tout le contenu vient d’un seul fichier de données&nbsp;; les pages, l’explorateur et la palette en sont générés.</li>
        <li>Le graphique d’activité, les périodes et les compétences sont calculés à partir de l’historique git de mes ${pluriel(Object.keys(parProjet).length, 'dépôt')}, avec un script Node.</li>
        <li>Chaque fichier a sa propre adresse (<span class="s">#/projets/reflo</span>)&nbsp;: les liens se partagent et le bouton retour fonctionne.</li>
        <li>Thème clair et sombre, navigation au clavier, adapté au téléphone, animations coupées si le système le demande.</li>
      </ul>

      <h2><span class="p">##</span>Raccourcis</h2>
      <dl class="kbd-table">${raccourcis
        .map(([touches, texte]) => `<dt>${touches.map((t) => `<kbd>${t}</kbd>`).join('')}</dt><dd>${texte}</dd>`)
        .join('')}</dl>

      <h2><span class="p">##</span>Terminal</h2>
      <p>Tapez <span class="s">aide</span> dans le terminal pour la liste des commandes&nbsp;: <span class="s">projets</span>, <span class="s">ouvrir reflo</span>, <span class="s">git log</span>, <span class="s">contact</span>…</p>
      <div class="actions"><button type="button" class="btn" data-terminal>${svg('code')}Ouvrir le terminal</button></div>
    </div>`;
    return { html };
  }

  function vueVide() {
    return `<div class="empty-editor">
      <p class="big" aria-hidden="true">&lt;/&gt;</p>
      <dl class="kbd-table">
        <dt><kbd>Ctrl</kbd><kbd>P</kbd></dt><dd>Ouvrir un fichier</dd>
        <dt><kbd>Ctrl</kbd><kbd>J</kbd></dt><dd>Terminal</dd>
      </dl>
      <a class="btn" href="#/accueil">${ICONES_FICHIER.tsx}accueil.tsx</a>
    </div>`;
  }

  // --- Barre latérale : vues, tiroir mobile, contrôle de code source --------------------------------

  function renderGit() {
    $('#git-badge').textContent = Object.keys(parProjet).length || '';
    $('#git-head').textContent = `main · ${pluriel(totalCommits, 'commit')}`;
    $('#git-list').innerHTML = D.projets
      .filter((p) => parProjet[p.id])
      .sort((a, b) => parProjet[b.id].fin.localeCompare(parProjet[a.id].fin))
      .map(
        (p) => `<li><a class="git-item" href="#/projets/${p.id}" data-id="projets/${p.id}">
          <span class="git-name">${esc(p.nom)}</span>
          <span class="git-count">+${parProjet[p.id].commits}</span>
          <span class="git-date">dernier commit : ${dateLongue.format(versDate(parProjet[p.id].fin))}</span>
        </a></li>`
      )
      .join('');
  }

  function montrerVue(vue) {
    state.vue = vue;
    $('#vue-explorer').hidden = vue !== 'explorer';
    $('#vue-git').hidden = vue !== 'git';
    $$('.activitybar [data-vue]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.vue === vue));
  }

  function basculerVue(vue) {
    const wb = $('.workbench');
    if (mobile.matches) {
      montrerVue(vue);
      ouvrirTiroir();
      return;
    }
    if (state.vue === vue && !wb.classList.contains('no-sidebar')) {
      wb.classList.add('no-sidebar');
      $$('.activitybar [data-vue]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      return;
    }
    wb.classList.remove('no-sidebar');
    montrerVue(vue);
  }

  function ouvrirTiroir() {
    $('#sidebar').classList.add('is-open');
    $('#scrim').hidden = false;
    $('#burger').setAttribute('aria-expanded', 'true');
    const actif = $('#sidebar .is-active') || $('#sidebar .tree-item');
    if (actif) actif.focus({ preventScroll: true });
  }

  function fermerTiroir() {
    if (!$('#sidebar').classList.contains('is-open')) return;
    $('#sidebar').classList.remove('is-open');
    $('#scrim').hidden = true;
    $('#burger').setAttribute('aria-expanded', 'false');
  }

  // --- Thème, copie, notifications ------------------------------------------------------------------

  function majTheme() {
    const sombre = root.dataset.theme === 'dark';
    $('#sb-theme').textContent = sombre ? 'Louai Dark' : 'Louai Light';
    $$('.theme-toggle').forEach((b) => b.setAttribute('aria-label', sombre ? 'Passer au thème clair' : 'Passer au thème sombre'));
    $('meta[name="theme-color"]').content = sombre ? '#141417' : '#e7e7ea';
  }

  function basculerTheme() {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    store.set('theme', root.dataset.theme);
    majTheme();
  }

  let toastTimer = 0;
  function toast(texte) {
    const t = $('#toast');
    t.textContent = texte;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (t.hidden = true), 2200);
  }

  async function copierEmail() {
    try {
      await navigator.clipboard.writeText(P.email);
    } catch (e) {
      const champ = document.createElement('textarea');
      champ.value = P.email;
      document.body.append(champ);
      champ.select();
      document.execCommand('copy');
      champ.remove();
    }
    toast(`Adresse copiée : ${P.email}`);
  }

  // --- Palette de commandes -------------------------------------------------------------------------

  const commandes = [
    { nom: 'Basculer le thème clair / sombre', action: basculerTheme },
    { nom: 'Ouvrir le terminal', action: () => terminal(true) },
    { nom: 'Copier mon adresse e-mail', action: copierEmail },
    { nom: 'M’écrire un e-mail', action: () => (location.href = mailto('Alternance — prise de contact')) },
    { nom: 'Ouvrir mon GitHub', action: () => window.open(P.github, '_blank', 'noopener') },
    P.cv && { nom: 'Télécharger mon CV', action: () => window.open(P.cv, '_blank', 'noopener') },
    { nom: 'Fermer tous les onglets', action: () => [...state.ouverts].forEach(fermer) },
  ].filter(Boolean);

  const palette = { items: [], sel: 0, retour: null };

  function ouvrirPalette(texte = '') {
    palette.retour = document.activeElement;
    $('#palette').hidden = false;
    const champ = $('#palette-in');
    champ.value = texte;
    filtrerPalette();
    champ.focus();
  }

  function fermerPalette(rendreFocus = true) {
    if ($('#palette').hidden) return;
    $('#palette').hidden = true;
    if (rendreFocus && palette.retour && palette.retour.focus) palette.retour.focus();
  }

  function filtrerPalette() {
    const brut = $('#palette-in').value;
    const modeCommande = brut.trim().startsWith('>');
    const q = sansAccents(brut.replace(/^\s*>/, '').trim());
    const correspond = (texte) => !q || sansAccents(texte).includes(q);
    const items = [];
    if (!modeCommande) {
      fichiers.forEach((f) => {
        const indice = f.projet ? f.projet.nom : f.dossier || '';
        if (correspond(`${cheminDe(f)} ${indice}`)) items.push({ type: f.type, nom: f.nom, indice, ouvrir: f.id });
      });
    }
    commandes.forEach((c) => {
      if (modeCommande || q ? correspond(c.nom) : true) items.push({ commande: c, nom: `> ${c.nom}`, indice: 'commande' });
    });
    palette.items = items;
    palette.sel = 0;
    renderPalette();
  }

  function renderPalette() {
    const liste = $('#palette-list');
    if (!palette.items.length) {
      liste.innerHTML = '<li class="p-empty" role="option" aria-disabled="true">Aucun résultat</li>';
      $('#palette-in').removeAttribute('aria-activedescendant');
      return;
    }
    liste.innerHTML = palette.items
      .map(
        (it, i) => `<li id="pal-${i}" role="option" data-i="${i}" aria-selected="${i === palette.sel}">
          ${it.type ? ICONES_FICHIER[it.type] : `<span class="fi">${svg('code')}</span>`}
          <span>${esc(it.nom)}</span><span class="p-hint">${esc(it.indice)}</span>
        </li>`
      )
      .join('');
    $('#palette-in').setAttribute('aria-activedescendant', `pal-${palette.sel}`);
    const sel = $(`#pal-${palette.sel}`);
    if (sel) sel.scrollIntoView({ block: 'nearest' });
  }

  function lancerPalette(i) {
    const it = palette.items[i];
    if (!it) return;
    fermerPalette(false);
    if (it.ouvrir) ouvrir(it.ouvrir, { focus: true });
    else it.commande.action();
  }

  function initPalette() {
    const champ = $('#palette-in');
    champ.addEventListener('input', filtrerPalette);
    champ.addEventListener('keydown', (e) => {
      const n = palette.items.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!n) return;
        palette.sel = (palette.sel + (e.key === 'ArrowDown' ? 1 : -1) + n) % n;
        renderPalette();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        lancerPalette(palette.sel);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        fermerPalette();
      } else if (e.key === 'Tab') {
        e.preventDefault();
      }
    });
    $('#palette-list').addEventListener('click', (e) => {
      const li = e.target.closest('[data-i]');
      if (li) lancerPalette(+li.dataset.i);
    });
    $('#palette').addEventListener('mousedown', (e) => {
      if (e.target.id === 'palette') fermerPalette();
    });
  }

  // --- Terminal -------------------------------------------------------------------------------------------

  const term = { pret: false, historique: [], pos: 0 };

  function ecrire(html, classe = '') {
    $('#term-out').insertAdjacentHTML('beforeend', `<p${classe ? ` class="${classe}"` : ''}>${html}</p>`);
    const corps = $('#term-body');
    corps.scrollTop = corps.scrollHeight;
  }

  function terminal(ouvert) {
    const t = $('#terminal');
    const montrer = ouvert === undefined ? t.hidden : ouvert;
    t.hidden = !montrer;
    $('#act-terminal').setAttribute('aria-pressed', montrer);
    if (!montrer) return;
    if (!term.pret) {
      term.pret = true;
      ecrire(`Portfolio de ${esc(P.nom)} — tapez <span class="s">aide</span> pour voir les commandes.`, 't-dim');
    }
    $('#term-in').focus();
  }

  function trouverFichier(q) {
    const cible = sansAccents(q.replace(/^\.?\/?/, ''));
    if (!cible) return null;
    return (
      fichiers.find((f) => sansAccents(cheminDe(f)) === cible || sansAccents(f.nom) === cible || f.id === cible) ||
      fichiers.find((f) => sansAccents(`${cheminDe(f)} ${f.projet ? f.projet.nom : ''}`).includes(cible))
    );
  }

  const COMMANDES_TERMINAL = {
    aide() {
      [
        ['whoami', 'qui je suis'],
        ['ls', 'lister les fichiers'],
        ['ouvrir <nom>', 'ouvrir un fichier, ex. « ouvrir reflo »'],
        ['projets', 'tous les projets et leurs commits'],
        ['git log', 'les derniers jours de travail'],
        ['contact', 'me joindre'],
        ['theme', 'basculer clair / sombre'],
        ['clear', 'vider le terminal'],
      ].forEach(([c, d]) => ecrire(`  <span class="f">${esc(c.padEnd(14))}</span><span class="t-dim">${d}</span>`));
    },
    whoami() {
      ecrire(`${esc(P.nom)} — ${esc(P.titre.toLowerCase())}. ${esc(P.recherche)}.`);
    },
    ls() {
      const racine = fichiers.filter((f) => !f.dossier).map((f) => f.nom);
      ecrire([...racine.slice(0, 2), '<span class="t">projets/</span>', ...racine.slice(2)].join('   '));
    },
    ouvrir(args) {
      const f = trouverFichier(args.join(' '));
      if (!f) {
        ecrire(`fichier introuvable : ${esc(args.join(' ') || '(vide)')}`, 't-err');
        return;
      }
      ecrire(`ouverture de ${esc(cheminDe(f))}`, 't-dim');
      ouvrir(f.id);
    },
    projets() {
      D.projets.forEach((p) =>
        ecrire(`  <span class="t">${esc(p.nom.padEnd(26))}</span>${String(commitsDe(p.id)).padStart(4)} commits   <span class="t-dim">${esc(p.statut)}</span>`)
      );
    },
    git(args) {
      if (args[0] !== 'log') {
        ecrire('usage : git log', 't-err');
        return;
      }
      ACTIVITE.slice(-8)
        .reverse()
        .forEach(([d, id, n]) => ecrire(`<span class="f">${d}</span>  ${esc(id.padEnd(14))} ${pluriel(n, 'commit')}`));
    },
    contact() {
      ecrire(`e-mail  <a href="${mailto('Alternance — prise de contact')}">${esc(P.email)}</a>`);
      ecrire(`github  <a href="${esc(P.github)}" target="_blank" rel="noopener">${esc(P.github)}</a>`);
      if (P.linkedin) ecrire(`linkedin  <a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${esc(P.linkedin)}</a>`);
    },
    theme() {
      basculerTheme();
      ecrire(`thème : ${root.dataset.theme === 'dark' ? 'Louai Dark' : 'Louai Light'}`, 't-dim');
    },
    clear() {
      $('#term-out').innerHTML = '';
    },
    sudo() {
      ecrire('permission refusée : ce portfolio est en lecture seule.', 't-err');
    },
  };
  const ALIAS = { help: 'aide', open: 'ouvrir', cat: 'ouvrir', cd: 'ouvrir', code: 'ouvrir', effacer: 'clear', cls: 'clear', thème: 'theme' };

  function initTerminal() {
    const form = $('#term-form');
    const champ = $('#term-in');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ligne = champ.value.trim();
      champ.value = '';
      ecrire(`<span class="t-user">louai@portfolio</span>:<span class="t-path">~</span>$ ${esc(ligne)}`, 't-cmd');
      if (!ligne) return;
      term.historique.push(ligne);
      term.pos = term.historique.length;
      const [brut, ...args] = ligne.split(/\s+/);
      const nom = ALIAS[brut.toLowerCase()] || brut.toLowerCase();
      if (COMMANDES_TERMINAL[nom]) COMMANDES_TERMINAL[nom](args);
      else ecrire(`commande introuvable : ${esc(brut)} — tapez « aide »`, 't-err');
    });
    champ.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
      e.preventDefault();
      term.pos = Math.min(Math.max(term.pos + (e.key === 'ArrowUp' ? -1 : 1), 0), term.historique.length);
      champ.value = term.historique[term.pos] || '';
    });
    $('#term-body').addEventListener('click', (e) => {
      if (!e.target.closest('a') && !window.getSelection().toString()) champ.focus();
    });
    $('#term-close').addEventListener('click', () => terminal(false));
  }

  // --- Événements globaux --------------------------------------------------------------------------------

  function initEvenements() {
    // Onglets : fermer d'un clic sur la croix ou d'un clic du milieu.
    $('#tabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-fermer]');
      if (b) fermer(b.dataset.fermer);
    });
    $('#tabs').addEventListener('auxclick', (e) => {
      const tab = e.target.closest('.tab');
      if (e.button === 1 && tab) {
        e.preventDefault();
        fermer($('[data-fermer]', tab).dataset.fermer);
      }
    });

    $$('.activitybar [data-vue]').forEach((b) => b.addEventListener('click', () => basculerVue(b.dataset.vue)));
    $('#act-search').addEventListener('click', () => ouvrirPalette());
    $('#act-terminal').addEventListener('click', () => terminal());
    $('#search-btn').addEventListener('click', () => ouvrirPalette());
    $('#search-btn-m').addEventListener('click', () => ouvrirPalette());
    $('#sb-git').addEventListener('click', () => {
      if (mobile.matches) basculerVue('git');
      else {
        $('.workbench').classList.remove('no-sidebar');
        montrerVue('git');
      }
    });
    $('#sb-term').addEventListener('click', () => terminal());
    $$('.theme-toggle').forEach((b) => b.addEventListener('click', basculerTheme));
    $('#burger').addEventListener('click', () => ($('#sidebar').classList.contains('is-open') ? fermerTiroir() : ouvrirTiroir()));
    $('#scrim').addEventListener('click', fermerTiroir);

    // Boutons placés dans les pages.
    $('#contenu').addEventListener('click', (e) => {
      if (e.target.closest('[data-copier]')) copierEmail();
      if (e.target.closest('[data-terminal]')) terminal(true);
    });

    const suivreAdresse = () => {
      const id = idDepuisAdresse();
      if (id && id !== state.actif) ouvrir(id);
    };
    window.addEventListener('hashchange', suivreAdresse);
    window.addEventListener('popstate', suivreAdresse);

    document.addEventListener('keydown', (e) => {
      const mod = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();
      if (mod && (k === 'p' || k === 'k')) {
        e.preventDefault();
        ouvrirPalette();
      } else if (mod && (k === 'j' || e.key === '`')) {
        e.preventDefault();
        terminal();
      } else if (e.key === 'Escape') {
        fermerTiroir();
      }
    });

    mobile.addEventListener('change', fermerTiroir);
  }

  function horloge() {
    const maj = () => {
      $('#sb-clock').textContent = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    };
    maj();
    setInterval(maj, 20000);
  }

  // --- Démarrage -------------------------------------------------------------------------------------------

  renderArbre();
  renderGit();
  majTheme();
  horloge();
  initPalette();
  initTerminal();
  initEvenements();
  if (window.innerWidth < 1000 && !mobile.matches) $('.workbench').classList.add('no-sidebar');

  // L'accueil reste ouvert en premier onglet, même quand on arrive par un lien direct.
  const depart = idDepuisAdresse();
  ouvrir('accueil', { remplacer: true });
  if (depart && depart !== 'accueil') ouvrir(depart, { remplacer: true });
})();
