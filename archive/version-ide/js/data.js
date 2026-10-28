/*
 * Tout le contenu du portfolio est ici : le reste de la page se met à jour tout seul.
 *
 * Champs vides ('') : la ligne correspondante est masquée sur le site.
 *
 * Projets :
 *   vedette     true = grande fiche dans « Projets phares », sinon ligne dans « Autres projets »
 *   categories  'web' | 'mobile' | 'ia' | 'jeux' | 'apprentissage' — la première sert d'étiquette
 *   dossier     nom du dossier du projet à côté de ce dépôt ; sert à `node outils/activite.mjs`
 *               pour compter les commits et calculer la période
 *   liens       laisser vide pour un dépôt privé : le site propose alors une démo par e-mail
 */
window.PORTFOLIO = {
  profil: {
    nom: 'Louai Entamene',
    titre: 'Développeur logiciel',
    recherche: 'Recherche une alternance en développement logiciel',
    disponibilite: '', // ex. 'Septembre 2027'
    rythme: '', // ex. '3 semaines en entreprise / 1 semaine à l’école'
    localisation: '', // ex. 'Lyon et alentours'
    email: 'l.entamene@gmail.com',
    github: 'https://github.com/13Louai',
    linkedin: '', // ex. 'https://www.linkedin.com/in/…'
    cv: '', // ex. 'assets/cv-louai-entamene.pdf'
    emailsGit: ['l.entamene@gmail.com'],
  },

  // Les langages sont comptés automatiquement depuis les projets ; ici, les outils regroupés par domaine.
  competences: [
    { domaine: 'Web', outils: ['Next.js', 'React', 'Tailwind CSS', 'HTML / CSS'] },
    { domaine: 'Back-end et données', outils: ['Node.js', 'PostgreSQL', 'Drizzle ORM', 'Supabase', 'Stripe', 'API REST'] },
    { domaine: 'Mobile', outils: ['Expo', 'React Native', 'TanStack Query'] },
    { domaine: 'IA et automatisation', outils: ['API Claude', 'OpenCV', 'Mineflayer', 'FFmpeg'] },
    { domaine: 'Outils', outils: ['Git', 'Docker', 'Maven', 'Rojo'] },
  ],

  // Formation et expériences, du plus récent au plus ancien. Section masquée tant qu'elle est vide.
  parcours: [
    // { periode: '2025 – 2026', titre: 'Intitulé du diplôme', lieu: 'Établissement, ville', details: 'Option, mention…' },
  ],

  projets: [
    {
      id: 'reflo',
      nom: 'Reflo',
      resume: 'SaaS de relance automatique de devis',
      vedette: true,
      dossier: 'devisappLouai',
      categories: ['web', 'ia'],
      statut: 'En développement',
      langages: ['TypeScript'],
      stack: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Docker', 'Stripe', 'API Claude'],
      description:
        'Une grande partie des devis envoyés par les artisans reste sans réponse, faute de temps pour relancer. Reflo récupère le devis au moment de l’envoi, relance le client selon une cadence configurée, lui permet de répondre en un clic et arrête la séquence dès qu’une réponse arrive.',
      points: [
        'Lecture des devis PDF et des e-mails entrants (IMAP), envoi des relances par e-mail et notifications push',
        'Base PostgreSQL versionnée par migrations avec Drizzle ORM',
        'Paiements intégrés avec Stripe',
        'Environnement de développement en une commande : base dans Docker, migrations et données de test',
      ],
      liens: [],
    },
    {
      id: 'ia-minecraft',
      nom: 'Bot bâtisseur Minecraft',
      resume: 'Agent autonome qui construit des plans en survie',
      vedette: true,
      dossier: 'iaMinecraft',
      categories: ['ia', 'jeux'],
      statut: 'Fonctionnel',
      langages: ['JavaScript', 'Java'],
      stack: ['Node.js', 'Mineflayer', 'Pathfinding', 'Java', 'Fabric', 'Datapack'],
      description:
        'Un bot qui rejoint un monde Minecraft comme un joueur et construit seul un plan en mode survie, bloc par bloc, en allant chercher les matériaux dans les coffres. Il tourne entièrement en local, sans API payante.',
      points: [
        'Lecture de quatre formats de plans : .schem, .litematic, .nbt et .schematic',
        'Orientation correcte des blocs, avec apprentissage des erreurs d’orientation',
        'Reprise d’un chantier interrompu, même après un redémarrage',
        'Mod Fabric en Java pour piloter le bot en jeu, avec aperçu 3D du plan',
        'Validé en conditions réelles : 175 blocs sur 175 corrects',
      ],
      liens: [],
    },
    {
      id: 'speed-meca',
      nom: 'Speed Meca',
      resume: 'Site d’un garage avec devis et prise de rendez-vous',
      vedette: true,
      dossier: 'SpeedMecha',
      categories: ['web'],
      statut: 'En développement',
      langages: ['TypeScript'],
      stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API Google Agenda'],
      description:
        'Le site du garage Speed Meca : présentation des prestations, devis en ligne calculé automatiquement et prise de rendez-vous synchronisée avec l’agenda Google de l’atelier.',
      points: [
        'Devis calculé automatiquement à partir des prestations choisies',
        'Rendez-vous synchronisés avec Google Agenda',
        'Back-office pour l’atelier, avis clients, pages légales et sitemap',
        'Design system documenté : jetons de couleur, composants, thème clair et sombre',
      ],
      liens: [],
    },
    {
      id: 'sportapp',
      nom: 'SportApp',
      resume: 'Application iPhone de sport et de nutrition',
      vedette: true,
      dossier: 'SportApp-Louai',
      categories: ['mobile'],
      statut: 'En développement',
      langages: ['TypeScript'],
      stack: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'TanStack Query'],
      description:
        'Une application tout-en-un pour le sport et la nutrition : suivi des calories, carnet d’entraînement, suivi du corps et informations de la salle, adaptée au régime alimentaire de chacun.',
      points: [
        'Cahier des charges rédigé avant le développement : périmètre, plateformes, choix techniques',
        'Authentification et données avec Supabase (PostgreSQL)',
        'Pensée pour fonctionner hors ligne, avec synchronisation au retour du réseau',
        'Objectif : publication sur l’App Store',
      ],
      liens: [],
    },
    {
      id: 'zoo-heist',
      nom: 'Zoo Heist',
      resume: 'Jeu multijoueur Roblox',
      dossier: 'Firstrobloxgame',
      categories: ['jeux'],
      statut: 'Jouable',
      langages: ['Lua / Luau'],
      stack: ['Luau', 'Roblox Studio', 'Rojo', 'DataStore'],
      description:
        'Jeu multijoueur de collection d’animaux : achat, revenus passifs, vol entre joueurs et défense du zoo. Les 29 animaux 3D sont construits et animés entièrement par script.',
      points: ['Logique serveur et client séparées, synchronisées par Rojo', 'Sauvegarde des joueurs avec DataStore'],
      liens: [],
    },
    {
      id: 'aura-battles',
      nom: 'Aura Battles',
      resume: 'Jeu multijoueur Roblox, en conception',
      dossier: 'Robloxgames',
      categories: ['jeux'],
      statut: 'En conception',
      langages: ['Lua / Luau'],
      stack: ['Luau', 'Roblox Studio', 'Rojo'],
      description:
        'Jeu où les joueurs affrontent des boss pour gagner des emotes, puis s’affrontent sur scène sous le vote des autres joueurs.',
      points: ['Game design document complet avant le code : boucle de jeu, économie, raretés'],
      liens: [],
    },
    {
      id: 'bot-echecs',
      nom: 'Assistant d’échecs',
      resume: 'Vision par ordinateur et moteur Stockfish',
      dossier: 'bot-chess',
      categories: ['ia'],
      statut: 'Prototype',
      langages: ['Python'],
      stack: ['Python', 'OpenCV', 'mss', 'Stockfish'],
      description:
        'Capture l’écran, reconnaît l’échiquier avec OpenCV, le traduit en position FEN et demande le meilleur coup au moteur Stockfish.',
      points: [],
      liens: [],
    },
    {
      id: 'bot-twitch',
      nom: 'BotTwitch',
      resume: 'Récupération et montage automatiques de clips',
      dossier: 'BotTwitch',
      categories: ['ia'],
      statut: 'Prototype',
      langages: ['Java'],
      stack: ['Java', 'Maven', 'Twitch4J', 'FFmpeg'],
      description:
        'Récupère les derniers clips d’une chaîne via l’API Helix de Twitch, les télécharge puis les retravaille automatiquement avec FFmpeg.',
      points: [],
      liens: [],
    },
    {
      id: 'irisynes',
      nom: 'Les Irisynes',
      resume: 'Site vitrine d’une maison d’hôtes',
      dossier: 'Website Irvynes',
      categories: ['web'],
      statut: 'En développement',
      langages: ['HTML / CSS', 'JavaScript'],
      stack: ['HTML', 'CSS', 'JavaScript'],
      description:
        'Site de six pages pour une maison d’hôtes près d’Aix-les-Bains : chambres, table d’hôtes, lieu, région et réservation. Écrit sans framework.',
      points: [],
      liens: [],
    },
    {
      id: 'jjk-rp',
      nom: 'JJK RP',
      resume: 'Mode de jeu pour nanos world',
      dossier: 'Nanosworld',
      categories: ['jeux'],
      statut: 'En développement',
      langages: ['Lua / Luau'],
      stack: ['Lua', 'nanos world'],
      description:
        'Mode de jeu roleplay : sélection du personnage, combat, sorts et inventaire, avec un code séparé entre client et serveur.',
      points: [],
      liens: [],
    },
    {
      id: 'python30',
      nom: '30 Days of Python',
      resume: 'Défi d’apprentissage quotidien',
      dossier: '30Daysofpython',
      categories: ['apprentissage'],
      statut: 'En cours · jour 7 / 30',
      langages: ['Python'],
      stack: ['Python'],
      description: 'Un sujet et ses exercices chaque jour pour approfondir Python, jusqu’à la programmation orientée objet.',
      points: [],
      liens: [{ label: 'Code sur GitHub', url: 'https://github.com/13Louai/30Daysofpython' }],
    },
    {
      id: 'gmod',
      nom: 'Gamemode Garry’s Mod',
      resume: 'Premier projet en Lua',
      dossier: 'gamemode',
      categories: ['jeux'],
      statut: 'Prototype',
      langages: ['Lua / Luau'],
      stack: ['Lua', 'Garry’s Mod'],
      description: 'Un premier mode de jeu construit sur le sandbox de Garry’s Mod, avec fichiers client, serveur et partagés.',
      points: [],
      liens: [],
    },
  ],
};
