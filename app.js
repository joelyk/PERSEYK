(function () {
  var STORAGE_KEY_NAME = "persyk_user_name";
  var appRoot = document.getElementById("app");
  var userPanel = document.getElementById("user-panel");
  var siteNameNode = document.getElementById("site-name");
  var data = window.PERSYK_DATA || { siteName: "PERSEYK", themes: [] };
  var USE_CASE_CATALOG = {
    1: {
      en: "HD video surveillance on company/campus premises.",
      fr: "Surveillance video HD sur locaux entreprise/campus."
    },
    2: {
      en: "Smartwatch or wearable linked to a smartphone (short range).",
      fr: "Montre connectee ou wearable relie au smartphone (courte portee)."
    },
    3: {
      en: "Nationwide vehicle tracking with mobility and two-way exchange.",
      fr: "Suivi vehicules a l echelle nationale avec mobilite et bidirectionnel."
    },
    4: {
      en: "Home automation with many battery sensors in local network.",
      fr: "Domotique avec nombreux capteurs batterie en reseau local."
    },
    5: {
      en: "Low-value parcel tracking, sparse messages, max autonomy.",
      fr: "Suivi colis faible valeur, messages rares, autonomie maximale."
    },
    6: {
      en: "Bridge/tunnel infrastructure monitoring in harsh environments.",
      fr: "Surveillance d infrastructures ponts/tunnels en environnement difficile."
    },
    7: {
      en: "Mall proximity beacons/promotions toward smartphones.",
      fr: "Balises de proximite en centre commercial vers smartphones."
    },
    8: {
      en: "Sensors in isolated protected natural areas.",
      fr: "Capteurs en zones naturelles protegees et isolees."
    },
    9: {
      en: "Office/campus building automation (lighting, HVAC, occupancy).",
      fr: "Automatisation batiment bureau/campus (eclairage, CVC, occupation)."
    },
    10: {
      en: "Portable medical device with secure monitoring and mobility.",
      fr: "Dispositif medical portable avec suivi securise et mobilite."
    },
    11: {
      en: "Voice-activated home assistant with continuous internet usage.",
      fr: "Assistant vocal domestique avec usage internet permanent."
    },
    12: {
      en: "Rural soil moisture monitoring across large fields.",
      fr: "Suivi humidite des sols en zone rurale sur grandes surfaces."
    },
    13: {
      en: "Intrusion detectors in isolated buildings with one-off alerts.",
      fr: "Detecteurs intrusion en batiments isoles avec alertes ponctuelles."
    },
    14: {
      en: "Automatic meter reading with deep indoor penetration needs.",
      fr: "Releve automatique de compteurs avec forte penetration indoor."
    }
  };

  if (siteNameNode) {
    siteNameNode.textContent = data.siteName || "PERSEYK";
  }

  var initialName = "";
  try {
    initialName = localStorage.getItem(STORAGE_KEY_NAME) || "";
  } catch (_error) {
    initialName = "";
  }

  var state = {
    userName: initialName,
    screen: initialName ? "themes" : "login",
    selectedThemeId: null,
    selectedModuleId: null,
    selectedBlockId: null,
    selectedCaseStudyId: null,
    currentQuestionIndex: 0,
    attemptsUsed: 0,
    selectedWrongOptionIds: [],
    questionResolved: false,
    feedback: null,
    score: 0,
    missedQuestions: [],
    caseAnswerOpen: {}
  };
  var summaryCharts = {
    score: null,
    missed: null
  };
  var caseStudyChart = null;
  var caseStudySchemaGraphs = {};

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function saveName(name) {
    try {
      localStorage.setItem(STORAGE_KEY_NAME, name);
    } catch (_error) {
      return;
    }
  }

  function removeName() {
    try {
      localStorage.removeItem(STORAGE_KEY_NAME);
    } catch (_error) {
      return;
    }
  }

  function clearAutoNextTimer() {
    return;
  }

  function destroySummaryCharts() {
    if (summaryCharts.score) {
      summaryCharts.score.destroy();
      summaryCharts.score = null;
    }
    if (summaryCharts.missed) {
      summaryCharts.missed.destroy();
      summaryCharts.missed = null;
    }
  }

  function destroyCaseStudyChart() {
    if (caseStudyChart) {
      caseStudyChart.destroy();
      caseStudyChart = null;
    }
  }

  function destroyCaseStudySchemaGraphs() {
    Object.keys(caseStudySchemaGraphs).forEach(function (graphKey) {
      if (caseStudySchemaGraphs[graphKey]) {
        caseStudySchemaGraphs[graphKey].destroy();
      }
    });
    caseStudySchemaGraphs = {};
  }

  function findTheme(themeId) {
    return data.themes.find(function (theme) {
      return theme.id === themeId;
    });
  }

  function getCurrentTheme() {
    return findTheme(state.selectedThemeId);
  }

  function getCurrentModule() {
    var theme = getCurrentTheme();
    if (!theme) {
      return null;
    }

    return theme.modules.find(function (module) {
      return module.id === state.selectedModuleId;
    }) || null;
  }

  function getCurrentBlock() {
    var module = getCurrentModule();
    if (!module) {
      return null;
    }

    return module.blocks.find(function (block) {
      return block.id === state.selectedBlockId;
    }) || null;
  }

  function getCurrentCaseStudy() {
    var module = getCurrentModule();
    if (!module || !module.caseStudies) {
      return null;
    }

    return module.caseStudies.find(function (caseStudy) {
      return caseStudy.id === state.selectedCaseStudyId;
    }) || null;
  }

  function getCurrentQuestion() {
    var block = getCurrentBlock();
    if (!block) {
      return null;
    }

    return block.questions[state.currentQuestionIndex] || null;
  }

  function getCorrectOption(question) {
    if (!question) {
      return null;
    }

    return question.options.find(function (option) {
      return option.id === question.correctOptionId;
    }) || null;
  }

  function resetQuestionState() {
    state.attemptsUsed = 0;
    state.selectedWrongOptionIds = [];
    state.questionResolved = false;
    state.feedback = null;
  }

  function resetQuizState() {
    clearAutoNextTimer();
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.missedQuestions = [];
    resetQuestionState();
  }

  function goTo(screen) {
    if (screen !== "quiz") {
      clearAutoNextTimer();
    }
    if (screen !== "summary") {
      destroySummaryCharts();
    }
    if (screen !== "case-study") {
      destroyCaseStudyChart();
      destroyCaseStudySchemaGraphs();
    }
    state.screen = screen;
    render();
  }

  function startBlock(themeId, moduleId, blockId) {
    state.selectedThemeId = themeId;
    state.selectedModuleId = moduleId;
    state.selectedBlockId = blockId;
    resetQuizState();
    goTo("quiz");
  }

  function startCaseStudy(themeId, moduleId, caseStudyId) {
    state.selectedThemeId = themeId;
    state.selectedModuleId = moduleId;
    state.selectedCaseStudyId = caseStudyId;
    state.caseAnswerOpen = {};
    goTo("case-study");
  }

  function recordMissedQuestion(question) {
    var correctOption = getCorrectOption(question);
    var attempts = state.selectedWrongOptionIds.map(function (optionId, index) {
      var option = question.options.find(function (item) {
        return item.id === optionId;
      });
      var fallback = {
        fr: "Cette option est incorrecte pour cette question.",
        en: "This option is incorrect for this question."
      };

      return {
        index: index + 1,
        label: option ? option.label : optionId,
        whyWrong: option && option.whyWrong ? option.whyWrong : fallback
      };
    });

    state.missedQuestions.push({
      questionIndex: state.currentQuestionIndex + 1,
      prompt: question.prompt,
      correctOptionLabel: correctOption ? correctOption.label : "",
      correctNote: question.correctNote || null,
      attempts: attempts
    });
  }

  function buildWrongFeedback(option) {
    if (option && option.whyWrong && option.whyWrong.fr && option.whyWrong.en) {
      return option.whyWrong;
    }

    return {
      fr: "Cette option est incorrecte pour cette question.",
      en: "This option is incorrect for this question."
    };
  }

  function detectUseCaseId(question) {
    if (!question || !question.prompt) {
      return null;
    }

    var combined = ((question.prompt.en || "") + " " + (question.prompt.fr || "")).toLowerCase();
    var patterns = [
      /use case\s*(\d+)/i,
      /cas d usage\s*(\d+)/i,
      /cas\s*(\d+)/i
    ];

    for (var i = 0; i < patterns.length; i += 1) {
      var match = combined.match(patterns[i]);
      if (match && match[1]) {
        return Number(match[1]);
      }
    }

    return null;
  }

  function buildUseCaseContextMarkup(question) {
    var useCaseId = detectUseCaseId(question);
    if (!useCaseId || !USE_CASE_CATALOG[useCaseId]) {
      return "";
    }

    var useCase = USE_CASE_CATALOG[useCaseId];

    return (
      "<section class=\"usecase-card\">" +
      "<p class=\"usecase-title\">Use case " +
      useCaseId +
      "</p>" +
      "<p><span class=\"lang-chip\">EN</span>" +
      escapeHtml(useCase.en) +
      "</p>" +
      "<p><span class=\"lang-chip\">FR</span>" +
      escapeHtml(useCase.fr) +
      "</p>" +
      "</section>"
    );
  }

  function buildResolvedExplanationMarkup(question) {
    if (!question || !state.questionResolved) {
      return "";
    }

    var optionDetailsMarkup = question.options
      .map(function (option) {
        var isCorrect = option.id === question.correctOptionId;
        var frText = "";
        var enText = "";

        if (isCorrect) {
          frText = question.correctNote && question.correctNote.fr
            ? question.correctNote.fr
            : "Ceci est la bonne reponse pour cette question.";
          enText = question.correctNote && question.correctNote.en
            ? question.correctNote.en
            : "This is the correct answer for this question.";
        } else {
          var wrong = buildWrongFeedback(option);
          frText = wrong.fr;
          enText = wrong.en;
        }

        return (
          "<article class=\"missed-item\">" +
          "<h4>" +
          escapeHtml(option.id.toUpperCase()) +
          ". " +
          escapeHtml(option.label) +
          (isCorrect ? " (Correct answer)" : "") +
          "</h4>" +
          "<p><span class=\"lang-chip\">FR</span>" +
          escapeHtml(frText) +
          "</p>" +
          "<p><span class=\"lang-chip\">EN</span>" +
          escapeHtml(enText) +
          "</p>" +
          "</article>"
        );
      })
      .join("");

    return (
      "<section class=\"missed-list\" style=\"margin-top:12px;\">" +
      "<article class=\"missed-item\" style=\"border-color:#c8d9d8;background:#f9fcfc;\">" +
      "<h4>Explications completes / Full explanations</h4>" +
      "<p>Tu peux lire les details puis cliquer sur <strong>Question suivante</strong>.</p>" +
      "</article>" +
      optionDetailsMarkup +
      "</section>"
    );
  }

  function handleOptionSelection(optionId) {
    if (state.screen !== "quiz" || state.questionResolved) {
      return;
    }

    if (state.selectedWrongOptionIds.indexOf(optionId) >= 0) {
      return;
    }

    var question = getCurrentQuestion();
    if (!question) {
      return;
    }

    var selectedOption = question.options.find(function (option) {
      return option.id === optionId;
    });

    if (!selectedOption) {
      return;
    }

    var correctOption = getCorrectOption(question);

    if (optionId === question.correctOptionId) {
      state.score += 1;
      state.questionResolved = true;
      state.feedback = {
        kind: "success",
        fr: "Bonne reponse. Lis les explications puis clique sur Question suivante.",
        en: "Correct answer. Read the explanations, then click Next question.",
        detailFr: question.correctNote ? question.correctNote.fr : "",
        detailEn: question.correctNote ? question.correctNote.en : ""
      };
      render();
      return;
    }

    state.attemptsUsed += 1;
    state.selectedWrongOptionIds.push(optionId);

    var wrongFeedback = buildWrongFeedback(selectedOption);
    var remainingAttempts = 2 - state.attemptsUsed;

    if (remainingAttempts > 0) {
      state.feedback = {
        kind: "error",
        fr: "Ce n est pas ca. " + wrongFeedback.fr + " Il te reste " + remainingAttempts + " tentative.",
        en: "Not this one. " + wrongFeedback.en + " You have " + remainingAttempts + " attempt left."
      };
      render();
      return;
    }

    state.questionResolved = true;
    recordMissedQuestion(question);
    state.feedback = {
      kind: "error",
      fr:
        "Ce n est pas ca. Tu as utilise 2 tentatives. Bonne reponse: " +
        (correctOption ? correctOption.label : "") +
        ". Lis les explications puis clique sur Question suivante.",
      en:
        "Not correct. You used 2 attempts. Correct answer: " +
        (correctOption ? correctOption.label : "") +
        ". Read the explanations, then click Next question.",
      detailFr: question.correctNote ? question.correctNote.fr : "",
      detailEn: question.correctNote ? question.correctNote.en : ""
    };
    render();
  }

  function goToNextQuestion() {
    clearAutoNextTimer();
    var block = getCurrentBlock();
    if (!block) {
      goTo("themes");
      return;
    }

    if (state.currentQuestionIndex < block.questions.length - 1) {
      state.currentQuestionIndex += 1;
      resetQuestionState();
      render();
      return;
    }

    goTo("summary");
  }

  function renderSummaryCharts(total, score, missedQuestions) {
    if (typeof window.Chart === "undefined") {
      return;
    }

    destroySummaryCharts();

    var scoreCanvas = document.getElementById("score-chart");
    var missedCanvas = document.getElementById("missed-chart");

    if (scoreCanvas) {
      summaryCharts.score = new window.Chart(scoreCanvas, {
        type: "doughnut",
        data: {
          labels: ["Correct", "Missed"],
          datasets: [
            {
              data: [score, Math.max(0, total - score)],
              backgroundColor: ["#0f766e", "#d97706"],
              borderWidth: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" }
          }
        }
      });
    }

    if (missedCanvas) {
      var labels = [];
      var values = [];

      if (missedQuestions && missedQuestions.length) {
        missedQuestions.forEach(function (item) {
          labels.push("Q" + item.questionIndex);
          values.push(item.attempts ? item.attempts.length : 0);
        });
      } else {
        labels.push("No missed");
        values.push(0);
      }

      summaryCharts.missed = new window.Chart(missedCanvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Attempts used before fail",
              data: values,
              backgroundColor: "#115e59",
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 2,
              ticks: {
                stepSize: 1
              }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }

  function renderUserPanel() {
    if (!state.userName) {
      userPanel.innerHTML = "";
      return;
    }

    userPanel.innerHTML =
      "<p class=\"welcome\">Hello " +
      escapeHtml(state.userName) +
      ", bienvenue</p>" +
      "<button class=\"btn secondary small\" data-action=\"logout\">Se deconnecter</button>";
  }

  function renderLogin() {
    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<h2 class=\"title\">Connexion locale</h2>" +
      "<p class=\"subtitle\">Entre ton nom pour commencer les QCM sur PERSEYK.</p>" +
      "<p class=\"intro-note\">PERSEYK est une plateforme de QCM et d etudes de cas IoT avec feedback complet FR/EN.</p>" +
      "<p class=\"intro-author\">Auteur: YANKAM Ngueguim Joel Stephane</p>" +
      "<div class=\"spacer-20\"></div>" +
      "<form id=\"login-form\" class=\"login-form\">" +
      "<label class=\"field-label\" for=\"username-input\">Nom</label>" +
      "<input id=\"username-input\" class=\"text-input\" name=\"username\" maxlength=\"40\" required placeholder=\"Ex: Joel\" autocomplete=\"name\">" +
      "<button class=\"btn primary\" type=\"submit\">Entrer</button>" +
      "<p class=\"hint\">Aucune base de donnees: session stockee localement dans ton navigateur.</p>" +
      "</form>" +
      "</section>";
  }

  function renderThemes() {
    var cards = data.themes
      .map(function (theme) {
        return (
          "<article class=\"theme-card\">" +
          "<h3>" +
          escapeHtml(theme.name) +
          "</h3>" +
          "<p class=\"card-meta\">" +
          escapeHtml(theme.summary || "") +
          "</p>" +
          "<p class=\"card-meta\">" +
          theme.modules.length +
          " module(s)</p>" +
          "<button class=\"btn primary\" data-action=\"open-theme\" data-theme-id=\"" +
          escapeHtml(theme.id) +
          "\">Ouvrir le theme</button>" +
          "</article>"
        );
      })
      .join("");

    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<h2 class=\"title\">Themes disponibles</h2>" +
      "<p class=\"subtitle\">Choisis un theme, puis un module, puis un bloc de QCM.</p>" +
      "<div class=\"spacer-20\"></div>" +
      "<div class=\"grid theme-grid\">" +
      cards +
      "</div>" +
      "</section>";
  }

  function renderThemeDetails() {
    var theme = getCurrentTheme();
    if (!theme) {
      goTo("themes");
      return;
    }

    var moduleMarkup = theme.modules
      .map(function (module) {
        var blockMarkup = module.blocks
          .map(function (block) {
            return (
              "<article class=\"block-card\">" +
              "<h4>" +
              escapeHtml(block.name) +
              "</h4>" +
              "<p class=\"card-meta\">" +
              block.questions.length +
              " QCM</p>" +
              "<button class=\"btn primary\" data-action=\"start-block\" data-theme-id=\"" +
              escapeHtml(theme.id) +
              "\" data-module-id=\"" +
              escapeHtml(module.id) +
              "\" data-block-id=\"" +
              escapeHtml(block.id) +
              "\">Commencer</button>" +
              "</article>"
            );
          })
          .join("");

        var caseStudyMarkup = "";
        if (module.caseStudies && module.caseStudies.length) {
          caseStudyMarkup =
            "<div class=\"spacer-20\"></div>" +
            "<h4 class=\"title\" style=\"font-size:18px; margin-bottom:8px;\">Etudes de cas</h4>" +
            "<div class=\"block-list\">" +
            module.caseStudies
              .map(function (caseStudy) {
                return (
                  "<article class=\"block-card\">" +
                  "<h4>" +
                  escapeHtml(caseStudy.title) +
                  "</h4>" +
                  "<p class=\"card-meta\">" +
                  (caseStudy.questions ? caseStudy.questions.length : 0) +
                  " question(s) + correction</p>" +
                  "<button class=\"btn secondary\" data-action=\"open-case-study\" data-theme-id=\"" +
                  escapeHtml(theme.id) +
                  "\" data-module-id=\"" +
                  escapeHtml(module.id) +
                  "\" data-case-study-id=\"" +
                  escapeHtml(caseStudy.id) +
                  "\">Ouvrir l etude de cas</button>" +
                  "</article>"
                );
              })
              .join("") +
            "</div>";
        }

        return (
          "<article class=\"module-card\">" +
          "<h3>" +
          escapeHtml(module.name) +
          "</h3>" +
          "<p class=\"card-meta\">" +
          escapeHtml(module.description || "") +
          "</p>" +
          "<h4 class=\"title\" style=\"font-size:18px; margin-bottom:8px;\">Blocs QCM</h4>" +
          "<div class=\"block-list\">" +
          blockMarkup +
          "</div>" +
          caseStudyMarkup +
          "</article>"
        );
      })
      .join("");

    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<div class=\"btn-row\"><button class=\"btn secondary\" data-action=\"back-to-themes\">Retour themes</button></div>" +
      "<div class=\"spacer-20\"></div>" +
      "<h2 class=\"title\">" +
      escapeHtml(theme.name) +
      "</h2>" +
      "<p class=\"subtitle\">Selectionne un module puis un bloc de QCM.</p>" +
      "<div class=\"spacer-20\"></div>" +
      "<div class=\"module-grid\">" +
      moduleMarkup +
      "</div>" +
      "</section>";
  }

  function renderQuiz() {
    var theme = getCurrentTheme();
    var module = getCurrentModule();
    var block = getCurrentBlock();
    var question = getCurrentQuestion();

    if (!theme || !module || !block || !question) {
      goTo("themes");
      return;
    }

    var totalQuestions = block.questions.length;
    var questionNumber = state.currentQuestionIndex + 1;
    var progress = Math.round(((questionNumber - 1) / totalQuestions) * 100);
    var attemptsLeft = Math.max(0, 2 - state.attemptsUsed);

    var optionsMarkup = question.options
      .map(function (option) {
        var isWrong = state.selectedWrongOptionIds.indexOf(option.id) >= 0;
        var isCorrect = state.questionResolved && option.id === question.correctOptionId;
        var disabled = state.questionResolved || isWrong;
        var className = "option-btn";

        if (isWrong) {
          className += " wrong";
        }
        if (isCorrect) {
          className += " correct";
        }

        return (
          "<button class=\"" +
          className +
          "\" data-action=\"choose-option\" data-option-id=\"" +
          escapeHtml(option.id) +
          "\"" +
          (disabled ? " disabled" : "") +
          ">" +
          "<span class=\"option-key\">" +
          escapeHtml(option.id.toUpperCase()) +
          "</span>" +
          "<span>" +
          escapeHtml(option.label) +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    var feedbackMarkup = "";
    if (state.feedback) {
      feedbackMarkup =
        "<section class=\"feedback " +
        escapeHtml(state.feedback.kind || "error") +
        "\">" +
        "<p><span class=\"lang-chip\">FR</span>" +
        escapeHtml(state.feedback.fr || "") +
        "</p>" +
        "<p><span class=\"lang-chip\">EN</span>" +
        escapeHtml(state.feedback.en || "") +
        "</p>" +
        (state.feedback.detailFr
          ? "<p><span class=\"lang-chip\">FR</span>" + escapeHtml(state.feedback.detailFr) + "</p>"
          : "") +
        (state.feedback.detailEn
          ? "<p><span class=\"lang-chip\">EN</span>" + escapeHtml(state.feedback.detailEn) + "</p>"
          : "") +
        "</section>";
    }

    var resolvedExplanationMarkup = buildResolvedExplanationMarkup(question);
    var useCaseContextMarkup = buildUseCaseContextMarkup(question);

    var nextButtonMarkup = state.questionResolved
      ? "<div class=\"btn-row\" style=\"margin-top: 12px;\"><button class=\"btn primary\" data-action=\"next-question\">Question suivante</button></div>"
      : "";

    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<div class=\"btn-row\"><button class=\"btn secondary\" data-action=\"back-to-theme\">Retour module</button></div>" +
      "<div class=\"spacer-20\"></div>" +
      "<header class=\"quiz-header\">" +
      "<p class=\"kicker\">" +
      escapeHtml(theme.name) +
      " / " +
      escapeHtml(module.name) +
      " / " +
      escapeHtml(block.name) +
      "</p>" +
      "<h2 class=\"title\">Question " +
      questionNumber +
      " sur " +
      totalQuestions +
      "</h2>" +
      "<div class=\"progress-track\"><div class=\"progress-fill\" style=\"width:" +
      progress +
      "%\"></div></div>" +
      "</header>" +
      "<article class=\"question-card\">" +
      "<h3 class=\"question-title\">" +
      escapeHtml(question.prompt.fr || "") +
      "</h3>" +
      "<p class=\"question-subtitle\">" +
      escapeHtml(question.prompt.en || "") +
      "</p>" +
      useCaseContextMarkup +
      "<p class=\"attempt-status\">Tentatives restantes: " +
      attemptsLeft +
      " / 2</p>" +
      "<div class=\"option-grid\">" +
      optionsMarkup +
      "</div>" +
      feedbackMarkup +
      resolvedExplanationMarkup +
      nextButtonMarkup +
      "</article>" +
      "</section>";
  }

  function renderCaseStudyChart(caseStudy) {
    if (typeof window.Chart === "undefined") {
      return;
    }

    destroyCaseStudyChart();

    if (!caseStudy || !caseStudy.chart) {
      return;
    }

    var canvas = document.getElementById("case-study-chart");
    if (!canvas) {
      return;
    }

    caseStudyChart = new window.Chart(canvas, {
      type: caseStudy.chart.type || "bar",
      data: {
        labels: caseStudy.chart.labels || [],
        datasets: [
          {
            label: caseStudy.chart.title || "Case KPI",
            data: caseStudy.chart.data || [],
            backgroundColor: ["#0f766e", "#0f766ebd", "#d97706", "#115e59", "#84a98c"],
            borderRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  function isArchitectureQuestion(question) {
    if (!question || !question.prompt) {
      return false;
    }

    var combined = ((question.prompt.en || "") + " " + (question.prompt.fr || "")).toLowerCase();
    return combined.indexOf("architecture") >= 0 ||
      combined.indexOf("schema") >= 0 ||
      combined.indexOf("diagram") >= 0 ||
      combined.indexOf("ascii") >= 0 ||
      combined.indexOf("topology") >= 0 ||
      combined.indexOf("topologie") >= 0;
  }

  function buildCaseStudySchemaElements(caseStudy) {
    var elements = [];
    var nodes = caseStudy.schemaGraph.nodes || [];
    var edges = caseStudy.schemaGraph.edges || [];

    nodes.forEach(function (node) {
      elements.push({
        data: {
          id: node.id,
          label: node.label
        }
      });
    });

    edges.forEach(function (edge, index) {
      elements.push({
        data: {
          id: edge.id || "e" + index,
          source: edge.source,
          target: edge.target,
          label: edge.label || ""
        }
      });
    });

    return elements;
  }

  function createCaseStudySchemaGraph(container, caseStudy, graphKey) {
    if (typeof window.cytoscape === "undefined" || !container || !caseStudy || !caseStudy.schemaGraph) {
      return;
    }

    caseStudySchemaGraphs[graphKey] = window.cytoscape({
      container: container,
      elements: buildCaseStudySchemaElements(caseStudy),
      style: [
        {
          selector: "node",
          style: {
            "shape": "round-rectangle",
            "width": "label",
            "height": "label",
            "padding": "10px",
            "background-color": "#0f766e",
            "color": "#ffffff",
            "font-size": 11,
            "font-weight": 700,
            "text-wrap": "wrap",
            "text-max-width": 140,
            "label": "data(label)",
            "text-valign": "center",
            "text-halign": "center"
          }
        },
        {
          selector: "edge",
          style: {
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "line-color": "#5b7c81",
            "target-arrow-color": "#5b7c81",
            "width": 2,
            "label": "data(label)",
            "font-size": 9,
            "color": "#3c5357",
            "text-background-color": "#ffffff",
            "text-background-opacity": 1,
            "text-background-padding": "2px"
          }
        }
      ],
      layout: {
        name: (caseStudy.schemaGraph.layout && caseStudy.schemaGraph.layout.name) || "breadthfirst",
        directed: true,
        padding: 20,
        spacingFactor: 1.2
      }
    });
  }

  function renderCaseStudyQuestionSchemas(caseStudy) {
    destroyCaseStudySchemaGraphs();

    if (typeof window.cytoscape === "undefined" || !caseStudy || !caseStudy.schemaGraph) {
      return;
    }

    (caseStudy.questions || []).forEach(function (question) {
      if (!state.caseAnswerOpen[question.id] || !isArchitectureQuestion(question)) {
        return;
      }

      var container = document.getElementById("case-study-schema-graph-" + question.id);
      if (!container) {
        return;
      }

      createCaseStudySchemaGraph(container, caseStudy, question.id);
    });
  }

  function handleSchemaZoom(action, graphId) {
    var graph = caseStudySchemaGraphs[graphId];
    if (!graph) {
      return;
    }

    var currentZoom = graph.zoom();
    var center = { x: graph.width() / 2, y: graph.height() / 2 };

    if (action === "schema-zoom-in") {
      graph.zoom({
        level: Math.min(graph.maxZoom(), currentZoom * 1.2),
        renderedPosition: center
      });
      return;
    }

    if (action === "schema-zoom-out") {
      graph.zoom({
        level: Math.max(graph.minZoom(), currentZoom / 1.2),
        renderedPosition: center
      });
      return;
    }

    if (action === "schema-zoom-reset") {
      graph.fit(undefined, 24);
    }
  }

  function renderCaseStudy() {
    var theme = getCurrentTheme();
    var module = getCurrentModule();
    var caseStudy = getCurrentCaseStudy();

    if (!theme || !module || !caseStudy) {
      goTo("theme");
      return;
    }

    var objectivesEn = (caseStudy.objectives && caseStudy.objectives.en ? caseStudy.objectives.en : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    var objectivesFr = (caseStudy.objectives && caseStudy.objectives.fr ? caseStudy.objectives.fr : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    var constraintsEn = (caseStudy.constraints && caseStudy.constraints.en ? caseStudy.constraints.en : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    var constraintsFr = (caseStudy.constraints && caseStudy.constraints.fr ? caseStudy.constraints.fr : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");

    var questionsMarkup = (caseStudy.questions || [])
      .map(function (question, index) {
        var isOpen = !!state.caseAnswerOpen[question.id];
        var correctionEn = (question.correction && question.correction.en ? question.correction.en : [])
          .map(function (line) {
            return "<li>" + escapeHtml(line) + "</li>";
          })
          .join("");
        var correctionFr = (question.correction && question.correction.fr ? question.correction.fr : [])
          .map(function (line) {
            return "<li>" + escapeHtml(line) + "</li>";
          })
          .join("");
        var showInlineSchema = isOpen && caseStudy.schemaGraph && isArchitectureQuestion(question);
        var inlineSchemaMarkup = showInlineSchema
          ? "<section class=\"inline-schema-block\">" +
            "<h5>Architecture Schema (JS Graph)</h5>" +
            "<div class=\"schema-controls\">" +
            "<button class=\"btn secondary small\" data-action=\"schema-zoom-out\" data-graph-id=\"" + escapeHtml(question.id) + "\">Reduire (-)</button>" +
            "<button class=\"btn secondary small\" data-action=\"schema-zoom-in\" data-graph-id=\"" + escapeHtml(question.id) + "\">Augmenter (+)</button>" +
            "<button class=\"btn secondary small\" data-action=\"schema-zoom-reset\" data-graph-id=\"" + escapeHtml(question.id) + "\">Recentrer</button>" +
            "</div>" +
            "<div class=\"schema-graph-wrap\"><div id=\"case-study-schema-graph-" + escapeHtml(question.id) + "\" class=\"schema-graph-canvas\"></div></div>" +
            (caseStudy.architectureAscii
              ? "<details class=\"schema-ascii-toggle\"><summary>Voir schema ASCII</summary><pre class=\"ascii-diagram\">" +
                escapeHtml(caseStudy.architectureAscii) +
                "</pre></details>"
              : "") +
            "</section>"
          : "";

        return (
          "<article class=\"case-question-card\">" +
          "<h4>Q" +
          (index + 1) +
          " - " +
          escapeHtml(question.prompt.en || "") +
          "</h4>" +
          "<p class=\"case-question-fr\">" +
          escapeHtml(question.prompt.fr || "") +
          "</p>" +
          "<button class=\"btn secondary small\" data-action=\"toggle-case-answer\" data-question-id=\"" +
          escapeHtml(question.id) +
          "\">" +
          (isOpen ? "Masquer correction" : "Voir correction") +
          "</button>" +
          (isOpen
            ? "<div class=\"case-correction\"><p><span class=\"lang-chip\">EN</span></p><ul>" +
              correctionEn +
              "</ul><p><span class=\"lang-chip\">FR</span></p><ul>" +
              correctionFr +
              "</ul>" +
              inlineSchemaMarkup +
              "</div>"
            : "") +
          "</article>"
        );
      })
      .join("");

    var reasoningEn = (caseStudy.reasoning && caseStudy.reasoning.en ? caseStudy.reasoning.en : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");
    var reasoningFr = (caseStudy.reasoning && caseStudy.reasoning.fr ? caseStudy.reasoning.fr : [])
      .map(function (item) {
        return "<li>" + escapeHtml(item) + "</li>";
      })
      .join("");

    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<div class=\"btn-row\"><button class=\"btn secondary\" data-action=\"back-to-theme\">Retour module</button></div>" +
      "<div class=\"spacer-20\"></div>" +
      "<p class=\"kicker\">" +
      escapeHtml(theme.name) +
      " / " +
      escapeHtml(module.name) +
      " / Etude de cas</p>" +
      "<h2 class=\"title\">" +
      escapeHtml(caseStudy.title || "") +
      "</h2>" +
      "<div class=\"spacer-20\"></div>" +
      "<section class=\"case-block\">" +
      "<h3>Context</h3>" +
      "<p><span class=\"lang-chip\">EN</span>" +
      escapeHtml(caseStudy.context && caseStudy.context.en ? caseStudy.context.en : "") +
      "</p>" +
      "<p><span class=\"lang-chip\">FR</span>" +
      escapeHtml(caseStudy.context && caseStudy.context.fr ? caseStudy.context.fr : "") +
      "</p>" +
      "</section>" +
      "<div class=\"case-grid\">" +
      "<section class=\"case-block\"><h3>Objectives</h3><p><span class=\"lang-chip\">EN</span></p><ul>" +
      objectivesEn +
      "</ul><p><span class=\"lang-chip\">FR</span></p><ul>" +
      objectivesFr +
      "</ul></section>" +
      "<section class=\"case-block\"><h3>Constraints</h3><p><span class=\"lang-chip\">EN</span></p><ul>" +
      constraintsEn +
      "</ul><p><span class=\"lang-chip\">FR</span></p><ul>" +
      constraintsFr +
      "</ul></section>" +
      "</div>" +
      "<div class=\"spacer-20\"></div>" +
      "<section class=\"case-block\">" +
      "<h3>Questions & Corrections</h3>" +
      "<p class=\"case-tip\">Pour les questions architecture/schema, ouvre la correction pour afficher le schema JS juste dessous.</p>" +
      "<div class=\"case-question-list\">" +
      questionsMarkup +
      "</div>" +
      "</section>" +
      "<div class=\"spacer-20\"></div>" +
      "<div class=\"case-grid\">" +
      "<section class=\"case-block\"><h3>Reasoning Path</h3><p><span class=\"lang-chip\">EN</span></p><ul>" +
      reasoningEn +
      "</ul><p><span class=\"lang-chip\">FR</span></p><ul>" +
      reasoningFr +
      "</ul></section>" +
      "</div>" +
      "<div class=\"spacer-20\"></div>" +
      "<section class=\"case-block\">" +
      "<h3>Case KPI Chart</h3>" +
      "<div class=\"chart-wrap\"><canvas id=\"case-study-chart\"></canvas></div>" +
      "</section>" +
      "</section>";

    renderCaseStudyQuestionSchemas(caseStudy);
    renderCaseStudyChart(caseStudy);
  }

  function renderSummary() {
    var theme = getCurrentTheme();
    var module = getCurrentModule();
    var block = getCurrentBlock();
    if (!theme || !module || !block) {
      goTo("themes");
      return;
    }

    var total = block.questions.length;
    var missed = state.missedQuestions.length;
    var rate = total ? Math.round((state.score / total) * 100) : 0;

    var missedMarkup = "";
    if (!missed) {
      missedMarkup = "<p class=\"empty-state\">Excellent. Aucun QCM rate dans ce bloc.</p>";
    } else {
      missedMarkup =
        "<div class=\"missed-list\">" +
        state.missedQuestions
          .map(function (item) {
            var attemptMarkup = item.attempts
              .map(function (attempt) {
                return (
                  "<div class=\"attempt-line\">" +
                  "<p><strong>Tentative " +
                  attempt.index +
                  ":</strong> " +
                  escapeHtml(attempt.label) +
                  "</p>" +
                  "<p><span class=\"lang-chip\">FR</span>" +
                  escapeHtml(attempt.whyWrong.fr || "") +
                  "</p>" +
                  "<p><span class=\"lang-chip\">EN</span>" +
                  escapeHtml(attempt.whyWrong.en || "") +
                  "</p>" +
                  "</div>"
                );
              })
              .join("");

            return (
              "<article class=\"missed-item\">" +
              "<h4>QCM " +
              item.questionIndex +
              "</h4>" +
              "<p>" +
              escapeHtml(item.prompt.fr || "") +
              "</p>" +
              "<p>" +
              escapeHtml(item.prompt.en || "") +
              "</p>" +
              "<p><strong>Bonne reponse / Correct answer:</strong> " +
              escapeHtml(item.correctOptionLabel) +
              "</p>" +
              (item.correctNote && item.correctNote.fr
                ? "<p><span class=\"lang-chip\">FR</span>" + escapeHtml(item.correctNote.fr) + "</p>"
                : "") +
              (item.correctNote && item.correctNote.en
                ? "<p><span class=\"lang-chip\">EN</span>" + escapeHtml(item.correctNote.en) + "</p>"
                : "") +
              attemptMarkup +
              "</article>"
            );
          })
          .join("") +
        "</div>";
    }

    appRoot.innerHTML =
      "<section class=\"panel\">" +
      "<h2 class=\"title\">Resultat du bloc</h2>" +
      "<p class=\"subtitle\">" +
      escapeHtml(theme.name) +
      " / " +
      escapeHtml(module.name) +
      " / " +
      escapeHtml(block.name) +
      "</p>" +
      "<div class=\"spacer-20\"></div>" +
      "<section class=\"summary-grid\">" +
      "<article class=\"stat-card\"><h3>Score</h3><p>" +
      state.score +
      " / " +
      total +
      "</p></article>" +
      "<article class=\"stat-card\"><h3>QCM rates</h3><p>" +
      missed +
      "</p></article>" +
      "<article class=\"stat-card\"><h3>Taux de reussite</h3><p>" +
      rate +
      "%</p></article>" +
      "</section>" +
      "<div class=\"spacer-20\"></div>" +
      "<section class=\"chart-grid\">" +
      "<article class=\"chart-card\"><h3>Score Chart</h3><div class=\"chart-wrap\"><canvas id=\"score-chart\"></canvas></div></article>" +
      "<article class=\"chart-card\"><h3>Missed Attempts</h3><div class=\"chart-wrap\"><canvas id=\"missed-chart\"></canvas></div></article>" +
      "</section>" +
      "<div class=\"spacer-20\"></div>" +
      "<h3 class=\"title\" style=\"font-size: 22px;\">Listing des QCM rates</h3>" +
      missedMarkup +
      "<div class=\"spacer-20\"></div>" +
      "<div class=\"btn-row\">" +
      "<button class=\"btn primary\" data-action=\"restart-block\">Rejouer ce bloc</button>" +
      "<button class=\"btn secondary\" data-action=\"back-to-theme\">Retour module</button>" +
      "<button class=\"btn warn\" data-action=\"back-to-themes\">Changer de theme</button>" +
      "</div>" +
      "</section>";

    renderSummaryCharts(total, state.score, state.missedQuestions);
  }

  function render() {
    renderUserPanel();

    if (state.screen === "login") {
      renderLogin();
      return;
    }

    if (state.screen === "themes") {
      renderThemes();
      return;
    }

    if (state.screen === "theme") {
      renderThemeDetails();
      return;
    }

    if (state.screen === "quiz") {
      renderQuiz();
      return;
    }

    if (state.screen === "case-study") {
      renderCaseStudy();
      return;
    }

    if (state.screen === "summary") {
      renderSummary();
      return;
    }

    renderThemes();
  }

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || form.id !== "login-form") {
      return;
    }

    event.preventDefault();
    var input = form.querySelector("input[name='username']");
    var value = input ? input.value.trim() : "";
    if (!value) {
      return;
    }

    state.userName = value;
    saveName(value);
    state.selectedThemeId = null;
    state.selectedModuleId = null;
    state.selectedBlockId = null;
    goTo("themes");
  });

  document.addEventListener("click", function (event) {
    var trigger = event.target.closest("[data-action]");
    if (!trigger) {
      return;
    }

    var action = trigger.getAttribute("data-action");

    if (action === "logout") {
      removeName();
      clearAutoNextTimer();
      state.userName = "";
      state.selectedThemeId = null;
      state.selectedModuleId = null;
      state.selectedBlockId = null;
      state.selectedCaseStudyId = null;
      state.caseAnswerOpen = {};
      resetQuizState();
      goTo("login");
      return;
    }

    if (action === "open-theme") {
      state.selectedThemeId = trigger.getAttribute("data-theme-id");
      state.selectedModuleId = null;
      state.selectedBlockId = null;
      state.selectedCaseStudyId = null;
      state.caseAnswerOpen = {};
      goTo("theme");
      return;
    }

    if (action === "back-to-themes") {
      state.selectedThemeId = null;
      state.selectedModuleId = null;
      state.selectedBlockId = null;
      state.selectedCaseStudyId = null;
      state.caseAnswerOpen = {};
      goTo("themes");
      return;
    }

    if (action === "start-block") {
      startBlock(
        trigger.getAttribute("data-theme-id"),
        trigger.getAttribute("data-module-id"),
        trigger.getAttribute("data-block-id")
      );
      return;
    }

    if (action === "open-case-study") {
      startCaseStudy(
        trigger.getAttribute("data-theme-id"),
        trigger.getAttribute("data-module-id"),
        trigger.getAttribute("data-case-study-id")
      );
      return;
    }

    if (action === "choose-option") {
      handleOptionSelection(trigger.getAttribute("data-option-id"));
      return;
    }

    if (action === "next-question") {
      goToNextQuestion();
      return;
    }

    if (action === "toggle-case-answer") {
      var questionId = trigger.getAttribute("data-question-id");
      if (questionId) {
        state.caseAnswerOpen[questionId] = !state.caseAnswerOpen[questionId];
        renderCaseStudy();
      }
      return;
    }

    if (action === "schema-zoom-in" || action === "schema-zoom-out" || action === "schema-zoom-reset") {
      var graphId = trigger.getAttribute("data-graph-id");
      if (graphId) {
        handleSchemaZoom(action, graphId);
      }
      return;
    }

    if (action === "back-to-theme") {
      resetQuizState();
      state.selectedCaseStudyId = null;
      state.caseAnswerOpen = {};
      goTo("theme");
      return;
    }

    if (action === "restart-block") {
      startBlock(state.selectedThemeId, state.selectedModuleId, state.selectedBlockId);
    }
  });

  render();
})();
