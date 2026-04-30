export const questions = [
  {
    id: 1,
    texte: "Quel article du Code général des impôts précise que la TVA s'applique aux livraisons de biens et aux prestations de services effectuées à titre onéreux par un assujetti agissant en tant que tel ?",
    reponses: ["Article 245", "Article 256", "Article 259", "Article 210"],
    bonneReponse: 1,
    categorie: "TVA"
  },
  {
    id: 2,
    texte: "Dans quels cas une indemnité n'est-elle pas soumise à la TVA ?",
    reponses: [
      "Quand elle est une contrepartie d'un service",
      "Quand elle vise exclusivement à réparer un préjudice",
      "Quand elle est versée à un fournisseur",
      "Quand elle est liée à un contrat de prestation"
    ],
    bonneReponse: 1,
    categorie: "TVA"
  },
  {
    id: 3,
    texte: "Pour une indemnité de concours, quelle mention doit figurer sur la facture ?",
    reponses: [
      "Opération taxable à la TVA",
      "Indemnité forfaitaire compensatoire – opération hors champ de la TVA selon l'article 256 du CGI",
      "TVA incluse",
      "Service individualisé"
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 4,
    texte: "Le montant de l'indemnité de concours versée à un candidat non retenu est :",
    reponses: ["HT uniquement", "TTC uniquement", "HT = TTC (pas de TVA)", "TVA à 20%"],
    bonneReponse: 2,
    categorie: "TVA"
  },
  {
    id: 5,
    texte: "Quelle est la méthode obligatoire de facturation pour les contrats migrés avec clients groupe ?",
    reponses: [
      "Facturation au temps passé",
      "Milestone Based Invoice (facturation au jalon)",
      "Facturation forfaitaire",
      "Facturation à la tâche"
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 6,
    texte: "La méthode de constatation de revenu à appliquer sur les contrats migrés est :",
    reponses: [
      "Revenu basé sur le temps",
      "Revenu basé sur le montant",
      "Revenu basé sur la tâche",
      "Revenu basé sur le forfait"
    ],
    bonneReponse: 1,
    categorie: "Contrats"
  },
  {
    id: 7,
    texte: "Pour les BU du périmètre Bâtiments, le rattachement des lignes de contrat doit se faire :",
    reponses: [
      "Directement au projet",
      "Au niveau tâche",
      "Au niveau sous-tâche",
      "Au niveau BU (Business Unit)"
    ],
    bonneReponse: 1,
    categorie: "EARTH"
  },
  {
    id: 8,
    texte: "Dans EARTH, un Department (Service) correspond à :",
    reponses: [
      "Business Line uniquement",
      "Service Line + Cost Center/CPC (Cost Profit Center) + Business Unit",
      "Cost Center uniquement",
      "Business Unit uniquement"
    ],
    bonneReponse: 1,
    categorie: "EARTH"
  },
  {
    id: 9,
    texte: "Quel est le principe fiscal concernant les indemnités versées aux candidats non retenus dans le cadre de marchés publics ?",
    reponses: [
      "Elles sont soumises à la TVA",
      "Elles sont exemptées de TVA (opération hors champ de la TVA)",
      "Elles sont soumises à la taxe sur les salaires",
      "Elles sont soumises à la taxe d'apprentissage"
    ],
    bonneReponse: 1,
    categorie: "TVA"
  },
  {
    id: 10,
    texte: "Quelle mention doit obligatoirement figurer sur la facture d'une indemnité forfaitaire compensatoire versée à un candidat évincé ?",
    reponses: [
      "\"TVA à 20%\"",
      "\"Indemnité forfaitaire compensatoire – opération hors champ de la TVA selon l'article 256 du CGI\"",
      "\"Montant hors taxes\"",
      "\"Facture émise au nom du pouvoir adjudicateur\""
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 11,
    texte: "Le processus de création d'un projet dans EARTH nécessite obligatoirement :",
    reponses: ["Un contrat", "Un forecast", "Un numéro CRM", "Une WBS"],
    bonneReponse: 0,
    categorie: "EARTH"
  },
  {
    id: 12,
    texte: "Lors d'une prise de commande en cours de projet, le CP (Chef de projet) doit transmettre au PCO (Pôle cash) :",
    reponses: [
      "Un mail avec le numéro de projet et le fichier preuve",
      "Un rapport d'analyse",
      "Une demande de reversement",
      "Un contrat signé"
    ],
    bonneReponse: 0,
    categorie: "Processus PCO"
  },
  {
    id: 13,
    texte: "La facturation au jalon est obligatoire pour :",
    reponses: [
      "Tous les projets",
      "Les projets Bâtiments uniquement",
      "Les projets Conseil uniquement",
      "Les projets en gré à gré"
    ],
    bonneReponse: 0,
    categorie: "Facturation"
  },
  {
    id: 14,
    texte: "Si une erreur de facturation est détectée, le PCO (Pôle cash) doit :",
    reponses: [
      "Modifier la facture",
      "Faire un avoir puis une nouvelle facture",
      "Ignorer l'erreur",
      "Demander au client de corriger"
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 15,
    texte: "Le lettrage complet d'un règlement nécessite :",
    reponses: [
      "L'identification du projet et de la facture",
      "La validation du client",
      "Le rattachement à la BU (Business Unit)",
      "La saisie dans Oracle uniquement"
    ],
    bonneReponse: 0,
    categorie: "Processus PCO"
  },
  {
    id: 16,
    texte: "En cas d'écart de règlement positif, il faut vérifier :",
    reponses: [
      "Qu'il n'y a pas d'autres règlements pour le même projet/client",
      "Que la TVA est appliquée",
      "Que le contrat est signé",
      "Que le forecast est à jour"
    ],
    bonneReponse: 0,
    categorie: "Processus PCO"
  },
  {
    id: 17,
    texte: "Lors de la création d'un projet dans EARTH, quel élément est indispensable pour éviter un risque de perte financière ?",
    reponses: ["Un contrat", "Un forecast", "Un numéro de projet", "Une WBS"],
    bonneReponse: 0,
    categorie: "EARTH"
  },
  {
    id: 18,
    texte: "La nomenclature d'un department/service dans EARTH HCM inclut :",
    reponses: [
      "SL (Service Line), CPC/CC (Cost Profit Center/Cost Center), BU (Business Unit)",
      "BU (Business Unit) uniquement",
      "SL (Service Line) uniquement",
      "CC (Cost Center) uniquement"
    ],
    bonneReponse: 0,
    categorie: "EARTH"
  },
  {
    id: 19,
    texte: "Un avenant de régularisation de prestations antérieures à 2025 sans nouvelle prestation peut être refacturé :",
    reponses: [
      "En cost+fee uniquement",
      "Selon les anciennes modalités (forfait)",
      "Avec TVA",
      "En milestone"
    ],
    bonneReponse: 1,
    categorie: "Contrats"
  },
  {
    id: 20,
    texte: "Pour un avenant de régularisation avec nouvelles prestations, les prestations futures sont gérées :",
    reponses: ["En forfait", "En cost+fee", "En milestone", "En HT uniquement"],
    bonneReponse: 1,
    categorie: "Contrats"
  },
  {
    id: 21,
    texte: "La règle du Cost+ est obligatoire si la régularisation concerne :",
    reponses: [
      "Deux CPC (Cost Profit Center) de deux SL (Service Line) différentes",
      "La même SL (Service Line) et la même entité sociale",
      "Deux BU (Business Unit) différentes",
      "Deux projets terminés"
    ],
    bonneReponse: 1,
    categorie: "Contrats"
  },
  {
    id: 22,
    texte: "Les factures de sous-traitants à paiement direct doivent être :",
    reponses: [
      "Envoyées au CSP fournisseurs et au CP (Chef de projet)",
      "Envoyées uniquement au client",
      "Envoyées à la BU (Business Unit)",
      "Envoyées à la RH"
    ],
    bonneReponse: 0,
    categorie: "Facturation"
  },
  {
    id: 23,
    texte: "Pour les BU du périmètre Conseil, le rattachement des lignes de contrat se fait :",
    reponses: [
      "Toujours au projet",
      "Toujours à la tâche",
      "Au cas par cas selon consigne du contrôleur de gestion",
      "Toujours à la BU (Business Unit)"
    ],
    bonneReponse: 2,
    categorie: "EARTH"
  },
  {
    id: 24,
    texte: "En cas de reversement à faire, il faut :",
    reponses: [
      "Faire un mail à la trésorerie avec les factures concernées en pièce jointe",
      "Faire une régul sans vérifier les partenaires",
      "Ne rien faire",
      "Envoyer la facture au client"
    ],
    bonneReponse: 0,
    categorie: "Processus PCO"
  },
  {
    id: 25,
    texte: "Pour identifier un règlement sans information, il faut :",
    reponses: [
      "Appeler la banque",
      "Ignorer le règlement",
      "Demander au client de payer à nouveau",
      "Faire une régul directement"
    ],
    bonneReponse: 0,
    categorie: "Processus PCO"
  },
  {
    id: 26,
    texte: "Dans le processus de facturation, quel acteur est responsable de la création des jalons de facturation ?",
    reponses: [
      "RO (Responsable offre)",
      "PO (Pôle offre)",
      "CP (Chef de projet)",
      "DT (Directeur de territoire)"
    ],
    bonneReponse: 2,
    categorie: "Processus PCO"
  },
  {
    id: 27,
    texte: "En cas de prise de commande en cours de projet, quel document doit être transmis par le CP au PCO ?",
    reponses: [
      "Un rapport d'analyse",
      "Un fichier preuve (avenant signé, notification TO, bon de commande, etc.)",
      "Un contrat signé",
      "Une lettre d'engagement"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 28,
    texte: "Dans EARTH, quel élément est toujours inclus dans la nomenclature d'un department/service ?",
    reponses: [
      "Service Line uniquement",
      "Cost Center ou CPC (Cost Profit Center) et Business Unit",
      "Business Unit uniquement",
      "Cost Center uniquement"
    ],
    bonneReponse: 1,
    categorie: "EARTH"
  },
  {
    id: 29,
    texte: "Pour un projet en gré à gré, quel acteur doit demander un numéro CRM avant d'envoyer l'offre ?",
    reponses: [
      "PO (Pôle offre)",
      "RO (Responsable offre)",
      "CP (Chef de projet)",
      "DT (Directeur de territoire)"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 30,
    texte: "Qui est responsable de la transmission du CST/CCT aux partenaires lors de la phase offre ?",
    reponses: [
      "PO (Pôle offre)",
      "RO (Responsable offre)",
      "CP (Chef de projet)",
      "Ater (Assistante de territoire)"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 31,
    texte: "Lors de la prise de commande d'un AO classique, quel document doit être transmis au PCO par le CP ?",
    reponses: [
      "Contrat signé",
      "Fichier de demande d'ouverture de projet",
      "Rapport d'analyse",
      "Lettre d'engagement"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 32,
    texte: "Dans le cas d'une prise de commande en cours de projet, quel élément doit être joint au mail envoyé au PCO ?",
    reponses: [
      "Lien vers le réseau",
      "Fichier preuve en pièce jointe",
      "Rapport d'analyse",
      "Contrat signé"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 33,
    texte: "Qui archive sur le réseau les factures et preuves de dépôt reçues par mail ?",
    reponses: [
      "PO (Pôle offre)",
      "CP (Chef de projet)",
      "Ater (Assistante de territoire)",
      "PCO (Pôle cash)"
    ],
    bonneReponse: 2,
    categorie: "Processus PCO"
  },
  {
    id: 34,
    texte: "Quelle méthode de facturation est obligatoire pour tous les projets ?",
    reponses: [
      "Facturation au temps passé",
      "Facturation au jalon",
      "Facturation forfaitaire",
      "Facturation à la tâche"
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 35,
    texte: "Si une validation et rectification est demandée sur une facture, que doit faire le PCO ?",
    reponses: [
      "Modifier la facture",
      "Faire un avoir puis une nouvelle facture",
      "Ignorer la demande",
      "Envoyer la facture au client"
    ],
    bonneReponse: 1,
    categorie: "Facturation"
  },
  {
    id: 36,
    texte: "En cas d'écart de règlement positif, que doit-on vérifier en premier ?",
    reponses: [
      "Le montant de la TVA",
      "L'existence d'autres règlements pour le même projet/client",
      "La date de facturation",
      "Le code client"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 37,
    texte: "Pour identifier un règlement sans information, quelle action est recommandée ?",
    reponses: [
      "Faire une régul directement",
      "Appeler la banque",
      "Ignorer le règlement",
      "Demander au client de payer à nouveau"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 38,
    texte: "Les factures de sous-traitants à paiement direct doivent indiquer dans la colonne M :",
    reponses: [
      "Le nom du STPD, le montant concerné, le numéro de sa facture",
      "La date de facturation",
      "Le code client",
      "Le numéro de projet"
    ],
    bonneReponse: 0,
    categorie: "Facturation"
  },
  {
    id: 39,
    texte: "En cas de client public demandant un remboursement, que doit-on obtenir ?",
    reponses: [
      "Un écrit du client",
      "Un ordre de reversement",
      "Un nouveau contrat",
      "Une facture"
    ],
    bonneReponse: 1,
    categorie: "Processus PCO"
  },
  {
    id: 40,
    texte: "Si un salarié change de poste dans EARTH HCM, que se passe-t-il ?",
    reponses: [
      "Il garde le même service",
      "Il est rattaché à un nouveau service (le poste détermine le service)",
      "Il est rattaché à plusieurs services",
      "Il perd son accès"
    ],
    bonneReponse: 1,
    categorie: "RH / EARTH"
  }
];

export const CONFIG = {
  tempsTotal: 1200,
  pointsParBonneReponse: 1,
  topN: 10
};
