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
   *   video       démo en .mp4, affichée en haut de la page du projet à la place de la couverture
   *   etude       la page détaillée du projet (projet.html?p=<id>) : chaque partie vide est simplement masquée
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
      video: '', // ex. 'assets/reflo-demo.mp4' — affichée en haut de la page du projet
      etude: {
        role: { fr: 'Projet personnel', en: 'Personal project' },
        type: { fr: 'SaaS web', en: 'Web SaaS' },
        probleme: {
          fr: 'Un artisan envoie des devis toute la semaine. Une bonne partie reste sans réponse, et il n’a ni le temps ni l’envie de rappeler chaque client. Résultat : des chantiers perdus simplement faute de relance.',
          en: 'A tradesperson sends quotes all week long. Many never get an answer, and there is no time to chase every client. The result: jobs lost simply because nobody followed up.',
        },
        solution: {
          fr: 'Reflo s’intercale au moment de l’envoi : l’artisan met une adresse de collecte en copie cachée, et le devis est lu automatiquement. Le moteur planifie ensuite les relances dans une fenêtre horaire choisie. Le client répond en un clic depuis un portail, la séquence s’arrête, et l’artisan est prévenu sur son téléphone.',
          en: 'Reflo steps in when the quote is sent: the tradesperson adds a collection address in BCC, and the quote is read automatically. The engine then schedules follow-ups within a chosen time window. The client replies in one click from a portal, the sequence stops, and the tradesperson gets a notification on their phone.',
        },
        architecture: [
          { titre: { fr: 'Collecte', en: 'Collection' }, texte: { fr: 'Boîte dédiée relevée en IMAP toutes les 5 minutes ; l’expéditeur est vérifié par SPF et DKIM.', en: 'Dedicated mailbox polled over IMAP every 5 minutes; the sender is verified with SPF and DKIM.' } },
          { titre: { fr: 'Lecture', en: 'Parsing' }, texte: { fr: 'Un modèle de langage extrait les champs du devis PDF.', en: 'A language model extracts the fields of the PDF quote.' } },
          { titre: { fr: 'Données', en: 'Data' }, texte: { fr: 'PostgreSQL, schéma TypeScript versionné par migrations Drizzle.', en: 'PostgreSQL, TypeScript schema versioned with Drizzle migrations.' } },
          { titre: { fr: 'Moteur', en: 'Engine' }, texte: { fr: 'Un worker appelé chaque minute envoie les relances dues.', en: 'A worker called every minute sends the follow-ups that are due.' } },
          { titre: { fr: 'Portail', en: 'Portal' }, texte: { fr: 'Le client consulte le devis et répond en un clic.', en: 'The client views the quote and replies in one click.' } },
          { titre: { fr: 'Alerte', en: 'Alert' }, texte: { fr: 'L’artisan reçoit une notification push dès la réponse.', en: 'The tradesperson gets a push notification as soon as the client replies.' } },
        ],
        choix: [
          {
            titre: { fr: 'Le schéma comme source de vérité', en: 'The schema as the source of truth' },
            texte: {
              fr: 'Les migrations SQL sont générées depuis le schéma TypeScript et versionnées : la base se reconstruit à l’identique depuis zéro, en local comme en production.',
              en: 'SQL migrations are generated from the TypeScript schema and versioned: the database rebuilds identically from scratch, locally and in production.',
            },
          },
          {
            titre: { fr: 'Un passage chaque minute', en: 'A run every minute' },
            texte: {
              fr: 'L’intervalle du worker est la précision du produit : une relance prévue à 19 h 49 doit partir à 19 h 49. Un cycle à vide ne coûte qu’une lecture sur un index posé exactement sur le statut et la date prévue.',
              en: 'The worker interval is the product’s precision: a follow-up due at 7:49 pm must go out at 7:49 pm. An idle run only costs one read on an index built on exactly the status and due date.',
            },
          },
          {
            titre: { fr: 'Mesurer l’IA au lieu de l’espérer', en: 'Measuring the AI instead of hoping' },
            texte: {
              fr: 'Un script d’évaluation fait tourner la vraie chaîne de lecture sur un jeu de vrais devis et donne un taux de réussite par champ : chaque réglage du prompt se mesure.',
              en: 'An evaluation script runs the real parsing pipeline on a set of real quotes and reports a success rate per field: every prompt change is measured.',
            },
          },
          {
            titre: { fr: 'La sécurité dès la conception', en: 'Security by design' },
            texte: {
              fr: 'Mots de passe en argon2id, identifiants SMTP chiffrés en AES-256-GCM, CSP à nonce, plafonds de débit conservés en base, et cloisonnement des données par compte prouvé par des tests.',
              en: 'Argon2id passwords, SMTP credentials encrypted with AES-256-GCM, nonce-based CSP, rate limits stored in the database, and per-account data isolation proven by tests.',
            },
          },
        ],
        defis: [
          {
            titre: { fr: 'Ne jamais envoyer deux fois la même relance', en: 'Never sending the same follow-up twice' },
            probleme: {
              fr: 'Deux cycles du moteur peuvent tourner en même temps, par exemple pendant un déploiement.',
              en: 'Two engine runs can overlap, for example during a deployment.',
            },
            solution: {
              fr: 'Un verrou PostgreSQL FOR UPDATE SKIP LOCKED : chaque relance n’est prise que par un seul cycle. Un test lance deux cycles en parallèle pour le prouver.',
              en: 'A PostgreSQL FOR UPDATE SKIP LOCKED lock: each follow-up is picked up by a single run. A test runs two cycles in parallel to prove it.',
            },
          },
          {
            titre: { fr: 'Des relances classées en indésirables', en: 'Follow-ups landing in spam' },
            probleme: {
              fr: 'Un message parfaitement authentifié (SPF, DKIM et DMARC valides) partait quand même en spam chez Outlook : PDF joint, montant en euros et deux domaines différents, c’est le profil d’une fraude à la facture.',
              en: 'A fully authenticated message (valid SPF, DKIM and DMARC) still went to spam in Outlook: an attached PDF, an amount in euros and two different domains match the profile of invoice fraud.',
            },
            solution: {
              fr: 'Le devis n’est plus joint mais consultable sur le portail, et les réponses passent par une adresse de relais signée sur le domaine du produit.',
              en: 'The quote is no longer attached but viewable on the portal, and replies go through a signed relay address on the product’s own domain.',
            },
          },
          {
            titre: { fr: 'Des plafonds de débit faussés par un proxy', en: 'Rate limits skewed by a proxy' },
            probleme: {
              fr: 'Derrière Cloudflare, tous les visiteurs semblent avoir la même adresse IP : dix échecs de connexion venus de n’importe qui bloqueraient tout le monde.',
              en: 'Behind Cloudflare, every visitor seems to share the same IP address: ten failed logins from anyone would lock everyone out.',
            },
            solution: {
              fr: 'L’adresse réelle est lue dans X-Forwarded-For en comptant les relais de confiance depuis la droite, seule partie que le client ne peut pas falsifier.',
              en: 'The real address is read from X-Forwarded-For by counting trusted proxies from the right, the only part the client cannot forge.',
            },
          },
        ],
        chiffres: [
          { valeur: '34', label: { fr: 'fichiers de tests automatisés', en: 'automated test files' } },
          { valeur: '1 min', label: { fr: 'de précision sur l’envoi', en: 'sending precision' } },
          { valeur: '1', label: { fr: 'commande pour tout lancer', en: 'command to run everything' } },
        ],
        suite: {
          fr: [
            'Mise en production : nom de domaine, DNS (SPF et DKIM) et sauvegardes testées',
            'Jeu d’évaluation sur dix vrais devis pour chiffrer la qualité de lecture',
            'Tests avec de vrais artisans, puis ouverture des inscriptions payantes',
          ],
          en: [
            'Production launch: domain name, DNS (SPF and DKIM) and tested backups',
            'Evaluation set of ten real quotes to measure parsing quality',
            'Testing with real tradespeople, then opening paid sign-ups',
          ],
        },
        // Ce que ce projet t'a appris, avec tes mots : s'affiche dans une section dédiée dès que la liste n'est pas vide.
        apprentissages: { fr: [], en: [] },
      },
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
      video: '', // ex. 'assets/bot-batisseur.mp4'
      etude: {
        role: { fr: 'Projet personnel', en: 'Personal project' },
        type: { fr: 'Agent autonome', en: 'Autonomous agent' },
        probleme: {
          fr: 'Construire une grande structure dans Minecraft en survie, ce sont des heures de travail répétitif : aller chercher les matériaux, puis poser des milliers de blocs dans le bon ordre et dans le bon sens. Je voulais un bot capable de le faire seul, comme un vrai joueur, à partir de n’importe quel plan.',
          en: 'Building a large structure in Minecraft survival mode takes hours of repetitive work: fetching materials, then placing thousands of blocks in the right order and the right orientation. I wanted a bot that could do it on its own, like a real player, from any blueprint.',
        },
        solution: {
          fr: 'Le bot se connecte au serveur comme un joueur, lit le plan, prépare la liste des matériaux, va les chercher dans les coffres et construit couche par couche. Une couche d’IA lui permet de comprendre ce qu’il construit, d’observer son environnement et de discuter avec les joueurs grâce à un modèle de langage qui tourne en local.',
          en: 'The bot joins the server like a player, reads the blueprint, works out the materials list, fetches them from chests and builds layer by layer. An AI layer lets it understand what it is building, observe its surroundings and chat with players through a language model running locally.',
        },
        architecture: [
          { titre: { fr: 'Plans', en: 'Blueprints' }, texte: { fr: 'Quatre formats convertis en une même Structure commune.', en: 'Four formats converted into one shared Structure.' } },
          { titre: { fr: 'Préparation', en: 'Planning' }, texte: { fr: 'Chaque bloc devient une tâche ; les blocs impossibles en survie sont signalés.', en: 'Every block becomes a task; blocks impossible in survival are flagged.' } },
          { titre: { fr: 'Chantier', en: 'Building' }, texte: { fr: 'Dégagement, puis couche par couche en prenant le bloc faisable le plus proche.', en: 'Clearing, then layer by layer, always taking the closest placeable block.' } },
          { titre: { fr: 'Orientation', en: 'Orientation' }, texte: { fr: 'Règles par famille de blocs : face cliquée, point cliqué, direction du regard.', en: 'Rules per block family: clicked face, clicked point, look direction.' } },
          { titre: { fr: 'Vérification', en: 'Verification' }, texte: { fr: 'Tout bloc cassé ou déréglé repart en chantier, puis les échafaudages sont retirés.', en: 'Any broken or altered block is queued again, then scaffolding is removed.' } },
          { titre: { fr: 'Pilotage', en: 'Control' }, texte: { fr: 'Chat, menu en jeu, ou mod Fabric en Java relié au bot par une API locale.', en: 'Chat, in-game menu, or a Java Fabric mod talking to the bot through a local API.' } },
        ],
        choix: [
          {
            titre: { fr: 'Une Structure commune pour tous les formats', en: 'One shared Structure for every format' },
            texte: {
              fr: 'Chaque lecteur de format produit le même objet : le bot ne connaît qu’un seul format. Un futur générateur (image vers plan, texte vers plan) n’aura qu’à produire une Structure.',
              en: 'Every format reader outputs the same object, so the bot only knows one format. A future generator (image to blueprint, text to blueprint) only has to produce a Structure.',
            },
          },
          {
            titre: { fr: 'Une logique testable sans le jeu', en: 'Logic testable without the game' },
            texte: {
              fr: 'Les règles d’orientation et le contenu des menus sont séparés de la connexion au serveur : on les teste sans lancer Minecraft.',
              en: 'Orientation rules and menu contents are kept apart from the server connection, so they are tested without launching Minecraft.',
            },
          },
          {
            titre: { fr: 'Tout en local, sans API payante', en: 'Fully local, no paid API' },
            texte: {
              fr: 'Le modèle de langage (Llama 3.1 8B via Ollama) tourne sur le PC du joueur : aucun coût par message, aucune donnée envoyée ailleurs.',
              en: 'The language model (Llama 3.1 8B via Ollama) runs on the player’s PC: no cost per message, no data sent anywhere else.',
            },
          },
          {
            titre: { fr: 'Une API limitée à la machine', en: 'An API bound to the machine' },
            texte: {
              fr: 'Le mod Fabric pilote le bot par une API HTTP qui n’écoute que sur 127.0.0.1 : rien n’est exposé sur le réseau.',
              en: 'The Fabric mod drives the bot through an HTTP API listening on 127.0.0.1 only: nothing is exposed on the network.',
            },
          },
        ],
        defis: [
          {
            titre: { fr: 'Poser chaque bloc dans le bon sens', en: 'Placing every block the right way' },
            probleme: {
              fr: 'En survie, on ne choisit pas l’orientation d’un bloc : le serveur la déduit de la face cliquée, du point cliqué et de la direction du regard.',
              en: 'In survival mode you cannot pick a block’s orientation: the server infers it from the clicked face, the clicked point and the look direction.',
            },
            solution: {
              fr: 'Une table de règles par famille (escaliers, dalles, portes, trappes, bûches…) et une vérification après chaque pose. Une erreur d’orientation devient une règle retenue pour la suite.',
              en: 'A rule table per block family (stairs, slabs, doors, trapdoors, logs…) and a check after every placement. An orientation mistake becomes a rule remembered for next time.',
            },
          },
          {
            titre: { fr: 'Ne pas s’enfermer dans sa construction', en: 'Not walling itself in' },
            probleme: {
              fr: 'En fermant les murs d’une pièce, le bot pouvait se retrouver piégé à l’intérieur, ou multiplier les allers-retours.',
              en: 'While closing a room’s walls, the bot could end up trapped inside, or keep going back and forth.',
            },
            solution: {
              fr: 'Il casse un bloc pour sortir puis le repose, et l’ordre des tâches est revu pour limiter les déplacements inutiles.',
              en: 'It breaks a block to get out and puts it back, and the task order was reworked to cut needless trips.',
            },
          },
          {
            titre: { fr: 'Reprendre un chantier interrompu', en: 'Resuming an interrupted build' },
            probleme: {
              fr: 'Un redémarrage du bot ou du serveur au milieu d’un grand plan ne doit pas tout faire recommencer.',
              en: 'A bot or server restart in the middle of a large blueprint must not start everything over.',
            },
            solution: {
              fr: 'Au démarrage, il compare le monde au plan : les blocs déjà corrects sont sautés, seuls les manquants ou faux repartent en chantier.',
              en: 'On startup it compares the world with the blueprint: blocks already correct are skipped, only missing or wrong ones are queued.',
            },
          },
        ],
        chiffres: [
          { valeur: '175/175', label: { fr: 'blocs corrects en test réel', en: 'blocks correct in a real test' } },
          { valeur: '125', label: { fr: 'tests automatisés', en: 'automated tests' } },
          { valeur: '4', label: { fr: 'formats de plans lus', en: 'blueprint formats parsed' } },
        ],
        suite: {
          fr: [
            'Fabriquer et miner lui-même ses matériaux',
            'Reproduire le contenu des blocs : coffres remplis, texte des panneaux',
            'Gérer l’eau et la lave, et se défendre contre les monstres',
          ],
          en: [
            'Crafting and mining its own materials',
            'Reproducing block contents: filled chests, sign text',
            'Handling water and lava, and fighting off mobs',
          ],
        },
        // Ce que ce projet t'a appris, avec tes mots : s'affiche dans une section dédiée dès que la liste n'est pas vide.
        apprentissages: { fr: [], en: [] },
      },
    },
  ],
};
