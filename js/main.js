/*
 * Rendu du portfolio à partir de js/data.js, en français ou en anglais.
 * Changer de langue reconstruit la page ; la langue choisie est retenue et reprise par ?lang=en dans l'adresse.
 */
(function () {
  'use strict';

  const D = window.PORTFOLIO;
  const P = D.profil;
  const root = document.documentElement;
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const ICONES_CDN = 'https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/';

  // --- Textes de l'interface -----------------------------------------------------------------------

  const UI = {
    fr: {
      titrePage: 'Louai Entamene — Développeur logiciel',
      skip: 'Aller aux projets',
      nav: { accueil: 'Accueil', apropos: 'À propos', parcours: 'Parcours', competences: 'Compétences', projets: 'Projets', contact: 'Contact' },
      menu: 'Menu',
      langue: 'Switch to English',
      themeSombre: 'Passer en thème sombre',
      themeClair: 'Passer en thème clair',
      salut: 'Salut, je m’appelle',
      statut: 'terminal_status : actif',
      voirProjets: 'Voir mes projets',
      voirCv: 'Voir mon CV',
      apropos: ['Qui je suis', 'À propos', ''],
      parcours: ['Mon chemin', 'Parcours', 'Formation et expériences.'],
      competences: ['Ma stack', 'Compétences', 'Les outils avec lesquels je conçois mes projets.'],
      projets: ['Mes réalisations', 'Projets clés', 'Deux projets menés de l’idée jusqu’au produit qui fonctionne.'],
      contact: [
        'On en parle ?',
        'Contact',
        'Je recherche une alternance en développement logiciel. Pour une offre, une candidature en école ou un échange sur un projet, écrivez-moi : je réponds rapidement.',
      ],
      photo: 'Photo de Louai Entamene',
      prive: 'Code privé',
      demo: 'Demander une démo',
      sujetDemo: (nom) => `Démo de ${nom}`,
      sujetContact: 'Alternance — prise de contact',
      voirProjet: 'Voir le projet',
      mailTitre: 'Envoyez-moi un e-mail',
      mailTexte: 'Le meilleur moyen de me joindre. Je réponds rapidement.',
      ecrire: 'Écrire',
      copier: 'Copier l’adresse e-mail',
      copie: 'Adresse copiée !',
      droits: 'Tous droits réservés.',
      reflo: {
        devis: 'DEVIS #041',
        montant: '1 240 €',
        etapes: [
          ['J+0', 'Devis envoyé', '✓'],
          ['J+3', 'Relance 1', '✓'],
          ['J+7', 'Relance 2', '✓'],
          ['J+8', 'Client : « Accepté »', 'STOP'],
        ],
      },
    },
    en: {
      titrePage: 'Louai Entamene — Software developer',
      skip: 'Skip to projects',
      nav: { accueil: 'Home', apropos: 'About', parcours: 'Journey', competences: 'Skills', projets: 'Projects', contact: 'Contact' },
      menu: 'Menu',
      langue: 'Passer en français',
      themeSombre: 'Switch to dark theme',
      themeClair: 'Switch to light theme',
      salut: 'Hi, my name is',
      statut: 'terminal_status: active',
      voirProjets: 'View my projects',
      voirCv: 'View my resume',
      apropos: ['Who I am', 'About me', ''],
      parcours: ['My path', 'Journey', 'Education and experience.'],
      competences: ['My stack', 'Skills', 'The tools I build my projects with.'],
      projets: ['My work', 'Key projects', 'Two projects taken from idea to working product.'],
      contact: [
        'Get in touch',
        'Contact',
        'I’m looking for a software development apprenticeship. Whether it’s a job offer, a school application or a project you want to discuss, drop me a line: I reply quickly.',
      ],
      photo: 'Photo of Louai Entamene',
      prive: 'Private code',
      demo: 'Request a demo',
      sujetDemo: (nom) => `${nom} demo`,
      sujetContact: 'Apprenticeship — getting in touch',
      voirProjet: 'View project',
      mailTitre: 'Send me an email',
      mailTexte: 'The best way to reach me. I reply quickly.',
      ecrire: 'Say hello',
      copier: 'Copy email address',
      copie: 'Address copied!',
      droits: 'All rights reserved.',
      reflo: {
        devis: 'QUOTE #041',
        montant: '€1,240',
        etapes: [
          ['Day 0', 'Quote sent', '✓'],
          ['Day 3', 'Follow-up 1', '✓'],
          ['Day 7', 'Follow-up 2', '✓'],
          ['Day 8', 'Client: “Accepted”', 'STOP'],
        ],
      },
    },
  };

  const TRACES = {
    github: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1"/><path d="m3 7 9 6 9-6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="1"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
    ext: '<path d="M7 17 17 7M8 7h9v9"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    arrow: '<path d="m9 6 6 6-6 6"/>',
  };
  const svg = (nom) => `<svg viewBox="0 0 24 24" aria-hidden="true">${TRACES[nom]}</svg>`;

  // --- Outils ------------------------------------------------------------------------------------------

  const store = {
    get(k) {
      try { return localStorage.getItem(k); } catch (e) { return null; }
    },
    set(k, v) {
      try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ }
    },
  };

  let langue = root.lang === 'en' ? 'en' : 'fr';
  const ui = () => UI[langue];
  // Un texte de data.js : chaîne simple, ou { fr, en }.
  const t = (v) => (v == null ? '' : typeof v === 'object' && !Array.isArray(v) ? v[langue] ?? v.fr : v);

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const enrichi = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  const mailto = (sujet) => `mailto:${P.email}?subject=${encodeURIComponent(sujet)}`;
  const initiales = P.nom.split(' ').map((m) => m[0]).join('');
  const [prenom, ...reste] = P.nom.split(' ');

  let timers = [];
  const plus_tard = (fn, ms) => timers.push(setTimeout(fn, ms));
  let observateurs = [];

  // --- Sections -------------------------------------------------------------------------------------------

  const tete = ([kicker, titre, sous], id) => `<header class="sec-head reveal">
      ${kicker ? `<span class="tag tag-dark">${esc(kicker)}</span>` : ''}
      <h2 id="${id}-t">${esc(titre)}</h2>
      ${sous ? `<p>${esc(sous)}</p>` : ''}
    </header>`;

  function sectionAccueil() {
    const u = ui();
    return `<section class="hero" id="accueil" aria-labelledby="nom">
      <div class="wrap">
        <div class="window box reveal">
          <div class="win-bar" aria-hidden="true">
            <span class="win-dots"><i></i><i></i><i></i></span>
            <span class="win-title">${esc(P.nom.toUpperCase().replace(/ /g, '_'))}.EXE</span>
            <span class="win-tag">${langue.toUpperCase()}</span>
          </div>
          <div class="win-body">
            <span class="tag">${esc(u.salut)}</span>
            <h1 class="name" id="nom"><span class="u">${esc(prenom)}</span> ${esc(reste.join(' '))}<span class="dot">.</span></h1>
            <div class="term box-sm">
              <p class="term-status"><i aria-hidden="true"></i>${esc(u.statut)}</p>
              <p class="term-line">&gt; <span id="typed">${esc(t(P.phrases)[0])}</span><span class="caret" aria-hidden="true"></span></p>
            </div>
            ${P.recherche ? `<p class="seeking"><i aria-hidden="true"></i>${esc(t(P.recherche))}</p>` : ''}
            <p class="lead">${enrichi(t(P.accroche))}</p>
            <div class="actions">
              <a class="btn" href="#projets">${esc(u.voirProjets)}</a>
              ${P.cv ? `<a class="btn btn-dashed" href="${esc(P.cv)}" target="_blank" rel="noopener">${svg('file')}${esc(u.voirCv)}</a>` : ''}
            </div>
            <ul class="socials">
              <li><a class="icon-btn" href="${esc(P.github)}" target="_blank" rel="noopener" aria-label="GitHub">${svg('github')}</a></li>
              ${P.linkedin ? `<li><a class="icon-btn" href="${esc(P.linkedin)}" target="_blank" rel="noopener" aria-label="LinkedIn">${svg('linkedin')}</a></li>` : ''}
              <li><a class="icon-btn" href="${mailto(u.sujetContact)}" aria-label="E-mail">${svg('mail')}</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>`;
  }

  function sectionAPropos() {
    const u = ui();
    const portrait = P.photo
      ? `<img src="${esc(P.photo)}" alt="${esc(u.photo)}">`
      : `<div class="monogram" aria-hidden="true"><span>${esc(initiales)}<i>_</i></span></div>`;
    return `<section class="sec" id="apropos" aria-labelledby="apropos-t">
      <div class="wrap">
        ${tete(u.apropos, 'apropos')}
        <div class="about">
          <div class="box about-card reveal">
            ${t(P.bio).map((p) => `<p>${enrichi(p)}</p>`).join('')}
            ${D.chiffres.length ? `<hr class="rule">
            <ul class="facts">${D.chiffres
              .map((c) => `<li class="box-sm"><b>${esc(c.valeur)}</b><span>${esc(t(c.label))}</span></li>`)
              .join('')}</ul>` : ''}
          </div>
          <figure class="photo box reveal">${portrait}</figure>
        </div>
      </div>
    </section>`;
  }

  function sectionParcours() {
    if (!D.parcours.length) return '';
    return `<section class="sec" id="parcours" aria-labelledby="parcours-t">
      <div class="wrap">
        ${tete(ui().parcours, 'parcours')}
        <ol class="timeline">${D.parcours
          .map(
            (e) => `<li class="tl-item box reveal">
              <div class="tl-top">
                <h3>${esc(t(e.titre))}</h3>
                <span class="tag">${esc(e.periode)}</span>
              </div>
              ${e.lieu ? `<span class="tl-place">${esc(t(e.lieu))}</span>` : ''}
              ${e.sousTitre ? `<p class="tl-sub">${esc(t(e.sousTitre))}</p>` : ''}
              ${e.texte ? `<hr class="rule-dashed"><p>${enrichi(t(e.texte))}</p>` : ''}
            </li>`
          )
          .join('')}</ol>
      </div>
    </section>`;
  }

  function sectionCompetences() {
    const icone = (o) =>
      o.icone
        ? `<img src="${ICONES_CDN}${encodeURIComponent(o.icone)}.svg" alt="" width="16" height="16" loading="lazy">`
        : `<span class="chip-letter" aria-hidden="true">${esc(o.nom[0])}</span>`;
    return `<section class="sec" id="competences" aria-labelledby="competences-t">
      <div class="wrap">
        ${tete(ui().competences, 'competences')}
        <div class="skills">${D.competences
          .map(
            (g) => `<div class="skill-row reveal">
              <h3 class="tag tag-dark">${esc(t(g.groupe))}</h3>
              <ul class="chips">${g.outils.map((o) => `<li class="chip">${icone(o)}${esc(o.nom)}</li>`).join('')}</ul>
            </div>`
          )
          .join('')}</div>
      </div>
    </section>`;
  }

  // Couvertures dessinées en HTML quand le projet n'a pas de capture d'écran.
  const MAISON = [
    '................',
    '......rrrr......',
    '.....rrrrrr.....',
    '....rrrrrrrr....',
    '...rrrrrrrrrr...',
    '....wwwwwwww....',
    '....wggwwwdw....',
    '....wggwwwdw....',
    '....wwwwwwdw....',
    'GGGGGGGGGGGGGGGG',
  ];
  const BLOCS = { r: '#8b3a2b', w: '#c8995a', g: '#a7d8f0', d: '#6b4423', G: '#5fa04e' };

  function couverture(p) {
    if (p.image) return `<img src="${esc(p.image)}" alt="" loading="lazy">`;
    if (p.couverture === 'reflo') {
      const r = ui().reflo;
      return `<div class="cv-reflo" data-anim="reflo" aria-hidden="true">
        <div class="mock">
          <p class="mock-head"><span>${esc(r.devis)}</span><span>${esc(r.montant)}</span></p>
          <ol class="mock-steps">${r.etapes
            .map(([quand, quoi, etat], i) => `<li class="${i === r.etapes.length - 1 ? 'win' : ''}"><span>${esc(quand)}</span>${esc(quoi)}<b>${esc(etat)}</b></li>`)
            .join('')}</ol>
        </div>
      </div>`;
    }
    if (p.couverture === 'minecraft') {
      const cases = MAISON.map((ligne) =>
        [...ligne].map((c) => (c === '.' ? '<i></i>' : `<i class="b" style="--c: ${BLOCS[c]}"></i>`)).join('')
      ).join('');
      return `<div class="cv-mc" data-anim="mc" aria-hidden="true">
        <div class="mc-grid">${cases}</div>
        <p class="mc-badge">BUILD 175/175 <b>✓</b></p>
      </div>`;
    }
    return `<p class="cover-name" aria-hidden="true">${esc(t(p.nom))}</p>`;
  }

  function sectionProjets() {
    const u = ui();
    const statut = (p) => {
      const s = t(p.statut);
      return s ? `<span class="state${/fonctionnel|working|termin|done|en ligne|live/i.test(s) ? ' is-ok' : ''}">${esc(s)}</span>` : '';
    };
    const actions = (p) =>
      p.liens.length
        ? p.liens.map((l) => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(t(l.label) || u.voirProjet)}${svg('ext')}</a>`).join('')
        : `<span class="private">${svg('lock')}${esc(u.prive)}</span>
           <a class="btn btn-dashed" href="${mailto(u.sujetDemo(t(p.nom)))}">${esc(u.demo)}${svg('arrow')}</a>`;
    return `<section class="sec" id="projets" aria-labelledby="projets-t">
      <div class="wrap">
        ${tete(u.projets, 'projets')}
        <div class="projects">${D.projets
          .map(
            (p) => `<article class="project box reveal" aria-labelledby="p-${p.id}">
              <div class="cover">
                ${couverture(p)}
                ${p.liens.length ? `<a class="icon-btn cover-link" href="${esc(p.liens[0].url)}" target="_blank" rel="noopener" aria-label="${esc(u.voirProjet)} ${esc(t(p.nom))}">${svg('ext')}</a>` : ''}
              </div>
              <div class="project-body">
                <div class="project-top">
                  <h3 id="p-${p.id}">${esc(t(p.nom))}</h3>
                  ${statut(p)}
                </div>
                <p class="resume">${esc(t(p.resume))}</p>
                <p class="desc">${enrichi(t(p.description))}</p>
                ${t(p.points).length ? `<ul class="points">${t(p.points).map((x) => `<li>${enrichi(x)}</li>`).join('')}</ul>` : ''}
                <hr class="rule-dashed">
                <ul class="stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
                <div class="project-actions">${actions(p)}</div>
              </div>
            </article>`
          )
          .join('')}</div>
      </div>
    </section>`;
  }

  function sectionContact() {
    const u = ui();
    const sans = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    return `<section class="sec" id="contact" aria-labelledby="contact-t">
      <div class="wrap">
        ${tete(u.contact, 'contact')}
        <div class="contact">
          <div class="box mail-card reveal">
            <span class="mail-icon" aria-hidden="true">${svg('mail')}</span>
            <h3>${esc(u.mailTitre)}</h3>
            <p>${esc(u.mailTexte)}</p>
            <a class="btn" href="${mailto(u.sujetContact)}">${esc(u.ecrire)}${svg('arrow')}</a>
          </div>
          <div class="box shell reveal">
            <p class="shell-head">&gt;_ LE_TERMINAL</p>
            <hr class="rule">
            <p class="shell-cmd"><b>➜</b> ~ cat contact.txt</p>
            <div class="shell-mail">
              <a href="${mailto(u.sujetContact)}">${esc(P.email)}</a>
              <button class="copy-btn" type="button" data-copier aria-label="${esc(u.copier)}" title="${esc(u.copier)}">${svg('copy')}</button>
            </div>
            <hr class="rule-dashed">
            <p class="shell-links">
              <a href="${esc(P.github)}" target="_blank" rel="noopener">${svg('github')}${esc(sans(P.github))}</a>
              ${P.linkedin ? `<a href="${esc(P.linkedin)}" target="_blank" rel="noopener">${svg('linkedin')}${esc(sans(P.linkedin))}</a>` : ''}
              ${P.cv ? `<a href="${esc(P.cv)}" target="_blank" rel="noopener">${svg('file')}CV.pdf</a>` : ''}
            </p>
          </div>
        </div>
      </div>
    </section>`;
  }

  // --- Rendu complet -----------------------------------------------------------------------------------

  const SECTIONS = ['accueil', 'apropos', 'parcours', 'competences', 'projets', 'contact'];

  function rendre() {
    const u = ui();
    timers.forEach(clearTimeout);
    timers = [];
    observateurs.forEach((o) => o.disconnect());
    observateurs = [];

    root.lang = langue;
    document.title = u.titrePage;
    $('#skip').textContent = u.skip;

    $('#menu').setAttribute('aria-label', u.menu);
    $('#menu').innerHTML = SECTIONS.filter((id) => id !== 'parcours' || D.parcours.length)
      .map((id) => `<a href="#${id}">${esc(u.nav[id])}</a>`)
      .join('');
    $('#burger').setAttribute('aria-label', u.menu);
    $('#lang-btn').setAttribute('aria-label', u.langue);
    majBoutonTheme();

    $('#app').innerHTML =
      sectionAccueil() + sectionAPropos() + sectionParcours() + sectionCompetences() + sectionProjets() + sectionContact();
    $('#foot').innerHTML = `© ${new Date().getFullYear()} ${esc(P.nom)}. ${esc(u.droits)}`;

    machineAEcrire();
    suivreSections();
    apparitions();
  }

  function machineAEcrire() {
    const el = $('#typed');
    const phrases = t(P.phrases);
    if (!el || reduceMotion.matches || phrases.length < 2) return;
    let i = 0;
    let n = phrases[0].length;
    let efface = false;
    const pas = () => {
      n += efface ? -1 : 1;
      el.textContent = phrases[i].slice(0, n);
      let delai = efface ? 30 : 60;
      if (!efface && n === phrases[i].length) {
        efface = true;
        delai = 2000;
      } else if (efface && n === 0) {
        efface = false;
        i = (i + 1) % phrases.length;
        delai = 350;
      }
      plus_tard(pas, delai);
    };
    efface = true;
    plus_tard(pas, 2000);
  }

  // Lien du menu actif selon la section à l'écran.
  function suivreSections() {
    const liens = $$('#menu a');
    const activer = (id) => liens.forEach((a) => a.classList.toggle('is-active', a.hash === `#${id}`));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && activer(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    $$('#app > section').forEach((s) => io.observe(s));
    observateurs.push(io);
  }

  function apparitions() {
    const els = $$('.reveal');
    const anims = $$('[data-anim]');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      anims.forEach((el) => animer(el, true));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }),
      { rootMargin: '0px 0px -8% 0px' }
    );
    els.forEach((el) => io.observe(el));

    const ioAnim = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          animer(e.target, false);
          ioAnim.unobserve(e.target);
        }),
      { threshold: 0.4 }
    );
    anims.forEach((el) => ioAnim.observe(el));
    observateurs.push(io, ioAnim);
  }

  // Les couvertures s'animent une fois à l'écran : la maison se construit, la séquence de relance défile.
  function animer(el, direct) {
    if (el.dataset.anim === 'mc') {
      // Ordre de construction : de bas en haut, de gauche à droite, comme le bot.
      const largeur = MAISON[0].length;
      const ordre = $$('i', el)
        .map((b, i) => ({ b, ligne: Math.floor(i / largeur), col: i % largeur }))
        .filter((x) => x.b.classList.contains('b'))
        .sort((x, y) => y.ligne - x.ligne || x.col - y.col)
        .map((x) => x.b);
      if (direct) ordre.forEach((b) => b.classList.add('on'));
      else ordre.forEach((b, k) => plus_tard(() => b.classList.add('on'), 300 + k * 22));
    }
    if (el.dataset.anim === 'reflo') {
      const etapes = $$('li', el);
      if (direct) etapes.forEach((li) => li.classList.add('on'));
      else etapes.forEach((li, k) => plus_tard(() => li.classList.add('on'), 300 + k * 550));
    }
  }

  // --- Interactions --------------------------------------------------------------------------------------

  function majBoutonTheme() {
    const sombre = root.dataset.theme === 'dark';
    $('#theme-btn').setAttribute('aria-label', sombre ? ui().themeClair : ui().themeSombre);
    $('meta[name="theme-color"]').content = sombre ? '#15120f' : '#f6f1e7';
  }

  function changerLangue() {
    langue = langue === 'fr' ? 'en' : 'fr';
    store.set('lang', langue);
    const url = new URL(location.href);
    url.searchParams.set('lang', langue);
    history.replaceState(null, '', url);
    const y = window.scrollY;
    rendre();
    window.scrollTo({ top: y, behavior: 'instant' });
    $$('.reveal').forEach((el) => el.classList.add('in'));
    $$('[data-anim]').forEach((el) => animer(el, true));
  }

  let toastTimer = 0;
  function toast(texte) {
    const el = $('#toast');
    el.textContent = texte;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 2000);
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
    toast(ui().copie);
  }

  function initEvenements() {
    $('#lang-btn').addEventListener('click', changerLangue);
    $('#theme-btn').addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      store.set('theme', root.dataset.theme);
      majBoutonTheme();
    });

    const menu = $('#menu');
    const burger = $('#burger');
    const fermerMenu = () => {
      menu.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    };
    burger.addEventListener('click', () => {
      const ouvert = menu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', ouvert);
    });
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) fermerMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') fermerMenu();
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#menu, #burger')) fermerMenu();
    });

    $('#app').addEventListener('click', (e) => {
      if (e.target.closest('[data-copier]')) copierEmail();
    });
  }

  rendre();
  initEvenements();
})();
