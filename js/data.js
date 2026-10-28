/*
 * Tout le contenu du portfolio, en français et en anglais.
 *
 * Un texte traduit s'écrit { fr: '…', en: '…' }. Un texte identique dans les deux langues peut rester une simple
 * chaîne. Dans les paragraphes, **mot** met le mot en valeur.
 *
 * Un champ vide ('' ou []) masque l'élément correspondant sur le site.
 */
window.PORTFOLIO = {
  profil: {
    nom: 'Louai Entamene',
    email: 'l.entamene@gmail.com',
    github: 'https://github.com/13Louai',
    linkedin: '', // ex. 'https://www.linkedin.com/in/…'
    cv: '', // ex. 'assets/cv-louai-entamene.pdf'
    photo: '', // ex. 'assets/photo.jpg' — sans photo, les initiales s'affichent

    recherche: {
      fr: 'Recherche une alternance en développement logiciel',
      en: 'Looking for a software development apprenticeship',
    },

    // Phrases tapées dans le terminal de l'accueil, après « > ».
    phrases: {
      fr: ['développeur logiciel.', 'je construis des SaaS.', 'je code des agents autonomes.', 'futur ingénieur logiciel.'],
      en: ['a software developer.', 'building SaaS products.', 'coding autonomous agents.', 'a future software engineer.'],
    },

    accroche: {
      fr: 'Développeur passionné par les logiciels qui règlent de vrais problèmes, de l’architecture et la base de données jusqu’à l’interface. Mon objectif : devenir ingénieur logiciel, en alternance.',
      en: 'Developer driven by software that solves real problems, from architecture and databases all the way to the interface. My goal: becoming a software engineer through an apprenticeship.',
    },

    bio: {
      fr: [
        'Je conçois des applications complètes avec **TypeScript, Next.js et PostgreSQL** : cahier des charges, architecture, base de données, interface, puis tests en conditions réelles.',
        'Je recherche une **alternance en développement logiciel**, dans une équipe où livrer du code utile et apprendre les pratiques d’ingénierie à grande échelle : revue de code, tests, intégration continue.',
      ],
      en: [
        'I build complete applications with **TypeScript, Next.js and PostgreSQL**: requirements, architecture, database, interface, then real-world testing.',
        'I’m looking for a **software development apprenticeship** in a team where I can ship useful code and learn engineering practices at scale: code review, testing, continuous integration.',
      ],
    },
  },

  // Les trois encadrés de « À propos ».
  chiffres: [
    { valeur: '175/175', label: { fr: 'blocs posés juste par mon bot', en: 'blocks placed right by my bot' } },
    { valeur: '4', label: { fr: 'formats de plans lus', en: 'blueprint formats parsed' } },
    { valeur: '1', label: { fr: 'commande pour lancer Reflo', en: 'command to run Reflo' } },
  ],

  // Formation et expériences, du plus récent au plus ancien. La section reste masquée tant que la liste est vide.
  parcours: [
    // {
    //   periode: '2024 — 2026',
    //   titre: { fr: 'Intitulé du diplôme', en: 'Degree title' },
    //   lieu: 'Établissement, ville',
    //   sousTitre: { fr: 'Spécialité, mention…', en: 'Major, honours…' },
    //   texte: { fr: 'Une phrase sur ce que tu y as appris.', en: 'One sentence about what you learned.' },
    // },
  ],

  // Icônes : nom « slug » du site simpleicons.org (laisser vide s'il n'y en a pas).
  competences: [
    {
      groupe: { fr: 'Langages', en: 'Languages' },
      outils: [
        { nom: 'TypeScript', icone: 'typescript' },
        { nom: 'JavaScript', icone: 'javascript' },
        { nom: 'Java', icone: 'openjdk' },
        { nom: 'Python', icone: 'python' },
      ],
    },
    {
      groupe: { fr: 'Front-end', en: 'Front-end' },
      outils: [
        { nom: 'React', icone: 'react' },
        { nom: 'Next.js', icone: 'nextdotjs' },
        { nom: 'Tailwind CSS', icone: 'tailwindcss' },
        { nom: 'HTML5', icone: 'html5' },
        { nom: 'CSS', icone: 'css3' },
      ],
    },
    {
      groupe: { fr: 'Back-end', en: 'Back-end' },
      outils: [
        { nom: 'Node.js', icone: 'nodedotjs' },
        { nom: 'Stripe', icone: 'stripe' },
        { nom: 'API Claude', icone: 'claude' },
      ],
    },
    {
      groupe: { fr: 'Bases de données', en: 'Databases' },
      outils: [
        { nom: 'PostgreSQL', icone: 'postgresql' },
        { nom: 'Drizzle ORM', icone: 'drizzle' },
        { nom: 'Supabase', icone: 'supabase' },
      ],
    },
    {
      groupe: { fr: 'Outils', en: 'Tools' },
      outils: [
        { nom: 'Git', icone: 'git' },
        { nom: 'GitHub', icone: 'github' },
        { nom: 'Docker', icone: 'docker' },
        { nom: 'Gradle', icone: 'gradle' },
      ],
    },
  ],

  /*
   * Projets. Pour en ajouter un, copier un bloc et changer les valeurs.
   *   image       capture d'écran, ex. 'assets/projet.png' ; sinon `couverture` ('reflo', 'minecraft')
   *               ou, à défaut, une couverture neutre avec le nom du projet
   *   liens       [{ label: { fr, en }, url }] ; vide = code privé, le site propose une démo par e-mail
   */
  projets: [
    {
      id: 'reflo',
      nom: 'Reflo',
      couverture: 'reflo',
      image: '',
      statut: { fr: 'En développement', en: 'In development' },
      resume: { fr: 'SaaS de relance automatique de devis', en: 'Automated quote follow-up SaaS' },
      description: {
        fr: 'Beaucoup de devis envoyés par les artisans restent sans réponse, faute de temps pour relancer. Reflo récupère le devis au moment de l’envoi, relance le client selon une cadence configurée, lui permet de répondre en un clic et arrête la séquence dès qu’il répond.',
        en: 'Many quotes sent by tradespeople never get an answer because nobody has time to follow up. Reflo captures the quote as it is sent, follows up with the client on a configurable schedule, lets them reply in one click, and stops the sequence as soon as they answer.',
      },
      points: {
        fr: [
          'Lecture des devis PDF et des e-mails entrants (IMAP)',
          'Relances par e-mail et notifications push',
          'Schéma PostgreSQL versionné par migrations (Drizzle ORM)',
          'Paiements avec Stripe',
          'Lancement en une commande : base dans Docker, migrations et données de test',
        ],
        en: [
          'Parses PDF quotes and incoming emails (IMAP)',
          'Follow-ups by email and push notifications',
          'PostgreSQL schema versioned with migrations (Drizzle ORM)',
          'Payments with Stripe',
          'One-command setup: database in Docker, migrations and seed data',
        ],
      },
      stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Docker', 'Stripe', 'Claude API'],
      liens: [],
    },
    {
      id: 'bot-batisseur',
      nom: { fr: 'Bot bâtisseur Minecraft', en: 'Minecraft Builder Bot' },
      couverture: 'minecraft',
      image: '',
      statut: { fr: 'Fonctionnel', en: 'Working' },
      resume: {
        fr: 'Agent autonome qui construit des plans en survie',
        en: 'Autonomous agent that builds blueprints in survival mode',
      },
      description: {
        fr: 'Un bot qui rejoint un monde Minecraft comme un vrai joueur et construit seul un plan en mode survie, bloc par bloc, en allant chercher ses matériaux dans les coffres. Tout tourne en local, sans API payante.',
        en: 'A bot that joins a Minecraft world like a real player and builds a blueprint on its own in survival mode, block by block, fetching its materials from chests. Everything runs locally, with no paid API.',
      },
      points: {
        fr: [
          'Lit quatre formats de plans : .schem, .litematic, .nbt et .schematic',
          'Oriente chaque bloc correctement et retient ses erreurs',
          'Reprend un chantier interrompu, même après un redémarrage',
          'Mod Fabric en Java pour le piloter en jeu, avec aperçu 3D du plan',
          'Validé en conditions réelles : 175 blocs sur 175 corrects',
        ],
        en: [
          'Parses four blueprint formats: .schem, .litematic, .nbt and .schematic',
          'Orients every block correctly and learns from its mistakes',
          'Resumes an interrupted build, even after a restart',
          'Java Fabric mod to control it in-game, with a 3D blueprint preview',
          'Field-tested: 175 out of 175 blocks correct',
        ],
      },
      stack: ['Node.js', 'JavaScript', 'Mineflayer', 'Pathfinding', 'Java', 'Fabric'],
      liens: [],
    },
  ],
};
