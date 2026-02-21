# PERSEYK 🚀

Plateforme web d'apprentissage IoT en HTML/CSS/JavaScript natif (sans backend), avec:

- modules thematiques
- blocs de QCM progressifs
- feedback bilingue (FR + EN)
- scoring et recapitulatif des erreurs
- etudes de cas avec corrections
- visualisations graphiques (Chart.js + Cytoscape.js)

Le projet reste simple a deployer (fichiers statiques) et simple a enrichir avec de nouveaux contenus.

👤 **Auteur:** YANKAM Ngueguim Joel Stephane

---

## 1) 🎯 Objectif pedagogique

PERSEYK organise l'apprentissage en:

- Theme (ex: IoT)
- Module (ex: Cours 1)
- Blocs (Easy, Medium, Hard...)

Chaque question est explicative:

- mauvaise reponse: explication FR + EN de l'erreur
- bonne reponse: explication FR + EN de la solution
- passage manuel a la question suivante (pas de saut automatique)

---

## 2) 📌 Etat actuel du contenu

Version actuelle:

- Theme: IoT
- Module: Cours 1 - Foundations
- Blocs QCM: 10
- Total QCM: 100
- Etudes de cas: 5

---

## 3) ⚙️ Fonctionnalites principales

### 🔐 Auth locale (sans backend)

- saisie du nom utilisateur
- stockage local via localStorage
- message d'accueil personnalise

### 🧠 Parcours QCM

- affichage question FR + EN
- options A/B/C/D
- 2 tentatives maximum par question
- feedback immediat apres clic
- detail complet des explications (bonne et mauvaises options)
- bouton "Question suivante" visible seulement quand la question est resolue

### 📊 Resultat de fin de bloc

- score total
- nombre de QCM rates
- listing detaille des erreurs
- bonne reponse + explication pour chaque question ratee

### 🧪 Etudes de cas

Chaque case study contient:

- contexte FR + EN
- objectifs
- contraintes
- questions + corrections FR + EN
- chemin de raisonnement
- schema architecture (ASCII + graphe JS)
- graphique KPI

### 📈 Graphiques JS

- Chart.js pour les KPI
- Cytoscape.js pour les schemas d'architecture

---

## 4) 🧱 Stack technique

- Frontend: HTML5, CSS3, JavaScript vanilla
- Data: data.js (objet JS global)
- Graphiques KPI: Chart.js (CDN)
- Graphe architecture: Cytoscape.js (CDN)
- Backend: aucun

---

## 5) 🗂️ Structure des fichiers

```txt
Perseyk/
|- index.html      # structure de page + scripts
|- styles.css      # design et responsive
|- app.js          # logique UI, quiz, score, case studies
|- data.js         # contenu pedagogique (QCM + case studies)
`- README.md       # documentation du projet
```

---

## 6) 🏗️ Architecture logique

Flux utilisateur:

1. Login local (nom)
2. Choix theme
3. Choix module
4. Choix bloc QCM ou etude de cas
5. Execution
6. Resume / score

Etat applicatif principal (dans app.js):

- screen
- selectedThemeId
- selectedModuleId
- selectedBlockId
- currentQuestionIndex
- attemptsUsed
- score
- missedQuestions

---

## 7) 📚 Regles metier QCM

### Tentatives

- max 2 essais par question
- apres 1 erreur: il reste 1 tentative
- apres 2 erreurs: question cloturee, bonne reponse affichee

### Progression

- pas de passage automatique
- action utilisateur obligatoire via bouton suivant

### Feedback bilingue

Chaque question contient:

- correctNote.fr / correctNote.en
- whyWrong.fr / whyWrong.en pour les mauvaises options

---

## 8) 🧾 Modele de donnees (data.js)

Hierarchie:

```txt
themes[]
  `- modules[]
      |- blocks[]
      |   `- questions[]
      `- caseStudies[]
```

### Exemple minimal d'une question

```js
{
  id: "iot-c1-eb1-q1",
  prompt: {
    fr: "Quel est le role principal d un capteur IoT ?",
    en: "What is the main purpose of an IoT sensor?"
  },
  options: [
    {
      id: "a",
      label: "To store data permanently",
      whyWrong: {
        fr: "Le stockage est plutot gere par passerelle ou cloud.",
        en: "Storage is usually handled by gateway or cloud."
      }
    },
    { id: "b", label: "To collect data from the physical world" }
  ],
  correctOptionId: "b",
  correctNote: {
    fr: "Un capteur mesure un phenomene physique et le transforme en donnees.",
    en: "A sensor measures a physical phenomenon and converts it into data."
  }
}
```

### Exemple minimal d'une etude de cas

```js
{
  id: "iot-c1-case-x",
  title: "Case Study ...",
  context: { en: "...", fr: "..." },
  objectives: { en: ["..."], fr: ["..."] },
  constraints: { en: ["..."], fr: ["..."] },
  questions: [
    {
      id: "iot-c1-casex-q1",
      prompt: { en: "...", fr: "..." },
      correction: { en: ["..."], fr: ["..."] }
    }
  ],
  architectureAscii: "...",
  schemaGraph: {
    layout: { name: "breadthfirst" },
    nodes: [{ id: "n1", label: "..." }],
    edges: [{ source: "n1", target: "n2", label: "..." }]
  },
  chart: {
    type: "bar",
    title: "Case KPI",
    labels: ["..."],
    data: [10]
  }
}
```

---

## 9) 🛰️ Graphiques et schemas

### Chart.js

- rendu KPI dans les etudes de cas
- utilise dans renderCaseStudyChart()

### Cytoscape.js

- rendu schema architecture dans les etudes de cas
- utilise dans renderCaseStudySchema()
- alimente par schemaGraph dans data.js

---

## 10) ▶️ Execution locale

Projet statique, plusieurs options:

1. Ouvrir index.html dans le navigateur
2. Utiliser un serveur local (recommande):
   - VS Code Live Server
   - npx serve .
   - python -m http.server

---

## 11) ➕ Ajouter de nouveaux contenus

### Ajouter un bloc QCM

1. Creer un tableau de questions dans data.js
2. Ajouter le bloc dans modules[].blocks
3. Verifier:
   - id unique
   - prompts FR/EN presents
   - explications FR/EN completes

### Ajouter une etude de cas

1. Ajouter l'objet dans caseStudiesCours1
2. Completer context/objectives/constraints/questions
3. Ajouter chart + schemaGraph si necessaire
4. Verifier affichage:
   - toggle correction
   - graphe Cytoscape
   - chart Chart.js

### Verification rapide JS

```bash
node --check data.js
node --check app.js
```

---

## 12) 🎨 Qualite et design

- interface responsive desktop/mobile
- rendu bilingue FR/EN
- progression explicite (pas de saut automatique)
- design lisible et oriente apprentissage

---

## 13) 🛣️ Roadmap possible

- multi-themes supplementaires
- export resultat PDF/CSV
- mode examen chronometre
- filtres de difficulte
- analytics pedagogiques avances
- mode hors-ligne (PWA)

---

## 14) 👤 Auteur

**YANKAM Ngueguim Joel Stephane**  
Concepteur et realisateur du projet **PERSEYK**.
