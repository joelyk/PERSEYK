(function () {
  function makeOption(id, label, whyWrongFr, whyWrongEn) {
    var option = { id: id, label: label };

    if (whyWrongFr || whyWrongEn) {
      option.whyWrong = {
        fr: whyWrongFr || "Cette option est incorrecte pour cette question.",
        en: whyWrongEn || "This option is incorrect for this question."
      };
    }

    return option;
  }

  function makeQuestion(id, promptFr, promptEn, options, correctOptionId, correctNoteFr, correctNoteEn) {
    return {
      id: id,
      prompt: { fr: promptFr, en: promptEn },
      options: options,
      correctOptionId: correctOptionId,
      correctNote: { fr: correctNoteFr, en: correctNoteEn }
    };
  }

  var easyBlock1Questions = [];

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q1",
      "Quel est le role principal d un capteur IoT ?",
      "What is the main purpose of an IoT sensor?",
      [
        makeOption("a", "To store data permanently", "Le stockage est plutot gere par passerelle ou cloud, pas par le capteur.", "Storage is usually handled by gateway or cloud, not by the sensor."),
        makeOption("b", "To collect data from the physical world"),
        makeOption("c", "To route Internet traffic", "Le routage est fait par routeurs/passerelles.", "Routing is done by routers/gateways."),
        makeOption("d", "To compile software", "Compiler du code est une tache de developpement.", "Compiling software is a developer task.")
      ],
      "b",
      "Un capteur mesure un phenomene physique et le transforme en donnees. Exemple: CO2 en ppm dans une salle.",
      "A sensor measures a physical phenomenon and converts it into data. Example: CO2 ppm in a classroom."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q2",
      "Quelle contrainte est la plus liee a un objet IoT sur batterie ?",
      "Which constraint is MOST linked to battery-powered IoT devices?",
      [
        makeOption("a", "Energy consumption"),
        makeOption("b", "Screen resolution", "Beaucoup de capteurs IoT n ont pas d ecran.", "Many IoT sensors have no screen."),
        makeOption("c", "Keyboard layout", "Pas pertinent pour la plupart des capteurs.", "Not relevant for most sensors."),
        makeOption("d", "Audio quality", "Utile surtout pour assistants vocaux.", "Mostly relevant to voice assistants.")
      ],
      "a",
      "Un objet sur batterie doit consommer peu pour durer des mois ou annees.",
      "Battery devices must minimize power to last months or years."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q3",
      "L edge computing sert surtout a :",
      "Edge computing is mainly used to:",
      [
        makeOption("a", "Increase latency", "L edge reduit la latence.", "Edge reduces latency."),
        makeOption("b", "Process data close to the sensors"),
        makeOption("c", "Replace the network", "Le reseau reste necessaire pour synchro/cloud.", "Network is still needed for sync/cloud."),
        makeOption("d", "Make batteries larger", "La taille de batterie est un choix materiel.", "Battery size is a hardware choice.")
      ],
      "b",
      "L edge traite pres de la source pour reagir vite et envoyer moins de donnees.",
      "Edge processes near the source to react fast and send less data."
    )
  );
  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q4",
      "Quelle famille reseau est faite pour longue portee et tres basse consommation ?",
      "Which network family is designed for long range and very low power?",
      [
        makeOption("a", "Wi-Fi", "Wi-Fi consomme plus et a une portee plus courte.", "Wi-Fi is higher power and shorter range."),
        makeOption("b", "BLE", "BLE est plutot tres courte portee.", "BLE is very short range."),
        makeOption("c", "LPWAN"),
        makeOption("d", "USB", "USB est une liaison filaire.", "USB is a wired interface.")
      ],
      "c",
      "LPWAN (LoRaWAN, Sigfox, NB-IoT) vise longue distance + petits messages + autonomie.",
      "LPWAN (LoRaWAN, Sigfox, NB-IoT) targets long range, tiny messages, and long battery life."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q5",
      "Quelle techno convient le mieux a une montre connectee vers smartphone ?",
      "Which is the BEST fit for a smartwatch sending data to a smartphone?",
      [
        makeOption("a", "LoRaWAN", "Pas typique pour montre->telephone; debit faible.", "Not typical for watch-to-phone; low throughput."),
        makeOption("b", "BLE"),
        makeOption("c", "Sigfox", "Reseau operateur, pas appairage direct smartphone.", "Operator network, not direct smartphone pairing."),
        makeOption("d", "ZigBee for kilometers", "ZigBee n est pas natif smartphone ni kilometrique.", "ZigBee is not native on phones and not kilometer-range.")
      ],
      "b",
      "BLE est courte portee, tres basse conso, et compatible smartphone.",
      "BLE is short-range, ultra-low power, and smartphone-compatible."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q6",
      "MQTT est :",
      "MQTT is best described as:",
      [
        makeOption("a", "A radio technology like ZigBee", "ZigBee est radio; MQTT est applicatif.", "ZigBee is radio; MQTT is application layer."),
        makeOption("b", "An application messaging protocol over IP"),
        makeOption("c", "A battery type", "Ce n est pas du materiel.", "It is not hardware."),
        makeOption("d", "A Wi-Fi encryption standard", "Le chiffrement Wi-Fi est WPA2/WPA3.", "Wi-Fi encryption is WPA2/WPA3.")
      ],
      "b",
      "MQTT est un protocole pub/sub sur TCP/IP via broker.",
      "MQTT is a publish/subscribe protocol over TCP/IP via a broker."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q7",
      "Le besoin 'Improve comfort' est :",
      "A requirement 'Improve comfort' is:",
      [
        makeOption("a", "SMART", "Ce besoin n est pas SMART: pas de metrique, seuil, delai.", "Not SMART: no metric, threshold, or time."),
        makeOption("b", "Not measurable -> not SMART"),
        makeOption("c", "A KPI", "Un KPI mesure une perf, ce n est pas le besoin lui-meme.", "A KPI measures performance, not the requirement itself."),
        makeOption("d", "A protocol", "Ce n est pas un protocole.", "This is not a protocol.")
      ],
      "b",
      "Exemple SMART: Alerte si CO2 > 1000 ppm pendant 3 minutes.",
      "SMART example: Alert if CO2 > 1000 ppm for 3 minutes."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q8",
      "Quel KPI mesure le mieux la rapidite d alerte IoT ?",
      "Which KPI best measures IoT alert speed?",
      [
        makeOption("a", "Battery brand", "Aucun lien direct avec la latence d alerte.", "No direct link with alert latency."),
        makeOption("b", "Alert response time (seconds)"),
        makeOption("c", "Sensor color", "La couleur ne mesure pas la performance.", "Color does not measure performance."),
        makeOption("d", "Number of posters in the room", "Sans lien avec le systeme IoT.", "Unrelated to IoT system performance.")
      ],
      "b",
      "La rapidite d alerte se mesure en secondes de delai (latence).",
      "Alert speed is measured by time-to-alert latency."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q9",
      "Les reseaux ZigBee sont typiquement :",
      "ZigBee networks are typically:",
      [
        makeOption("a", "Long-range nationwide", "Cela correspond plutot cellulaire/LPWAN.", "That is more cellular/LPWAN."),
        makeOption("b", "Mesh networks for buildings"),
        makeOption("c", "Satellite-based", "ZigBee n est pas satellite.", "ZigBee is not satellite-based."),
        makeOption("d", "Only for video streaming", "Debit ZigBee trop faible pour video.", "ZigBee throughput is too low for video.")
      ],
      "b",
      "ZigBee est basse conso, courte portee, souvent maillage en batiment.",
      "ZigBee is low-power, short-range, often mesh for building automation."
    )
  );

  easyBlock1Questions.push(
    makeQuestion(
      "iot-c1-eb1-q10",
      "Pourquoi envoyer toutes les donnees au cloud peut etre mauvais ?",
      "Why can sending everything to the Cloud be a bad idea?",
      [
        makeOption("a", "Cloud cannot store data", "Le cloud sait stocker; ce n est pas le probleme principal.", "Cloud can store data; that is not the core issue."),
        makeOption("b", "It increases cost, latency, and privacy risks"),
        makeOption("c", "It always improves battery life", "Plus de transmission consomme plus.", "More transmission usually consumes more power."),
        makeOption("d", "It eliminates network needs", "Le cloud reste accessible via reseau.", "Cloud still requires network access.")
      ],
      "b",
      "Mieux vaut filtrer/agreger en edge pour reduire cout, latence et risques privacy.",
      "Better to filter/aggregate at the edge to reduce cost, latency, and privacy risk."
    )
  );

  var easyBlock2Questions = [];

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q11",
      "Un PAN/WPAN est principalement :",
      "A PAN/WPAN is mainly:",
      [
        makeOption("a", "A personal area network (short range around a user/device)"),
        makeOption("b", "A nationwide operator network", "Cela correspond plutot au cellulaire/LPWAN operateur.", "That is more cellular/operator LPWAN."),
        makeOption("c", "A satellite network", "Ce n est pas du satellite.", "This is not satellite networking."),
        makeOption("d", "A fiber optic backbone", "La fibre est un backbone filaire, pas un PAN.", "Fiber is wired backbone, not PAN.")
      ],
      "a",
      "PAN/WPAN = reseau personnel courte portee (ex: BLE, ZigBee).",
      "PAN/WPAN means short-range personal network (e.g., BLE, ZigBee)."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q12",
      "Pour camera HD temps reel sur secteur/LAN, meilleur choix :",
      "Best technology for HD video cameras, real-time, mains power, existing LAN?",
      [
        makeOption("a", "Wi-Fi or Ethernet (high throughput)"),
        makeOption("b", "Sigfox", "Sigfox est trop faible debit pour video HD.", "Sigfox is too low throughput for HD video."),
        makeOption("c", "LoRaWAN", "LoRaWAN ne supporte pas le streaming HD.", "LoRaWAN cannot handle HD streaming."),
        makeOption("d", "ZigBee", "ZigBee a un debit insuffisant pour HD temps reel.", "ZigBee throughput is insufficient for real-time HD.")
      ],
      "a",
      "La video HD demande haut debit et faible latence: Wi-Fi/Ethernet.",
      "HD video needs high throughput and low latency: Wi-Fi/Ethernet."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q13",
      "Suivi vehicule national mobile et bidirectionnel :",
      "Vehicle tracking across a country (mobile, national coverage, two-way) fits best:",
      [
        makeOption("a", "ZigBee", "ZigBee est courte portee.", "ZigBee is short-range only."),
        makeOption("b", "Cellular (LTE-M / NB-IoT depending needs)"),
        makeOption("c", "BLE", "BLE est proximite.", "BLE is proximity range."),
        makeOption("d", "USB", "USB n est pas un reseau mobile.", "USB is not a mobile network.")
      ],
      "b",
      "Mobilite + couverture nationale orientent vers le cellulaire IoT.",
      "Mobility plus national coverage points to cellular IoT."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q14",
      "Suivi colis faible cout, petits messages, longue portee, autonomie max :",
      "Low-value parcel tracking, tiny messages, very long range, max battery:",
      [
        makeOption("a", "Sigfox or LoRaWAN (LPWAN)"),
        makeOption("b", "Wi-Fi", "Wi-Fi n est pas ideal pour longue portee + autonomie.", "Wi-Fi is not ideal for long range + maximum battery."),
        makeOption("c", "BLE", "BLE trop courte portee.", "BLE is too short-range."),
        makeOption("d", "HDMI", "HDMI n est pas une techno reseau IoT.", "HDMI is not an IoT networking tech.")
      ],
      "a",
      "LPWAN est concu pour petits messages longue distance a tres faible conso.",
      "LPWAN is built for tiny long-range messages with very low power use."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q15",
      "En IoT, topologie en etoile veut dire :",
      "In IoT, a star topology means:",
      [
        makeOption("a", "Devices form a mesh and relay each other", "Ceci decrit un maillage.", "This describes mesh topology."),
        makeOption("b", "Devices connect to a central node (gateway/AP)"),
        makeOption("c", "Devices have no central coordination", "En etoile il y a un point central.", "Star topology has a central point."),
        makeOption("d", "Only wired links are allowed", "L etoile peut etre filaire ou sans fil.", "Star can be wired or wireless.")
      ],
      "b",
      "Etoile = tous les noeuds vers un point central (AP/gateway).",
      "Star means all nodes connect to a central point (AP/gateway)."
    )
  );
  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q16",
      "La mobilite des noeuds signifie :",
      "Node mobility in an IoT network means:",
      [
        makeOption("a", "Nodes never move", "C est l inverse de mobilite.", "That is the opposite of mobility."),
        makeOption("b", "Nodes can change position while staying connected"),
        makeOption("c", "Nodes are always sleeping", "Sleep = energie, pas mobilite.", "Sleep mode is energy management, not mobility."),
        makeOption("d", "Nodes are encrypted", "Chiffrement = securite, pas mobilite.", "Encryption is security, not mobility.")
      ],
      "b",
      "Mobilite = objets qui se deplacent tout en gardant la connectivite.",
      "Mobility means devices can move while maintaining connectivity."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q17",
      "Quelle phrase est vraie sur LPWAN ?",
      "Which is TRUE about LPWAN?",
      [
        makeOption("a", "High throughput, short range", "LPWAN privilegie portee/autonomie, pas haut debit.", "LPWAN prioritizes range/battery, not high throughput."),
        makeOption("b", "Low power, long range, low throughput"),
        makeOption("c", "Only indoor use", "LPWAN est souvent utilise en exterieur.", "LPWAN is often used outdoors."),
        makeOption("d", "Mainly for HD video", "LPWAN est trop faible debit pour HD video.", "LPWAN is too low throughput for HD video.")
      ],
      "b",
      "LPWAN sacrifie le debit pour gagner en portee et en autonomie.",
      "LPWAN trades throughput for range and battery life."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q18",
      "Beacons promo vers smartphones dans un mall: meilleur choix ?",
      "A mall wants beacons for promotions to smartphones. Best choice:",
      [
        makeOption("a", "BLE beacons"),
        makeOption("b", "LoRaWAN", "LoRaWAN n est pas fait pour marketing de proximite smartphone.", "LoRaWAN is not designed for smartphone proximity marketing."),
        makeOption("c", "Sigfox", "Sigfox n est pas destine a l interaction locale smartphone.", "Sigfox is not meant for local smartphone interaction."),
        makeOption("d", "ZigBee mesh in the city", "ZigBee n est pas natif smartphone.", "ZigBee is not native on smartphones.")
      ],
      "a",
      "BLE beacons sont peu couteux, proches, et compatibles smartphones.",
      "BLE beacons are low-cost, short-range, and smartphone-compatible."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q19",
      "Batiment avec beaucoup de capteurs + mesh + communications frequentes :",
      "A building needs many sensors + mesh + frequent communication. Best fit:",
      [
        makeOption("a", "ZigBee"),
        makeOption("b", "Sigfox", "Sigfox est plutot pour peu de messages.", "Sigfox is aimed at low message rates."),
        makeOption("c", "NB-IoT only", "Possible mais moins naturel pour mesh/local dense et parfois plus couteux.", "Possible but less natural for dense local mesh and can be costlier."),
        makeOption("d", "Satellite", "Surdimensionne pour ce cas indoor.", "Overkill for this indoor use case.")
      ],
      "a",
      "ZigBee mesh convient aux reseaux denses indoor basse conso.",
      "ZigBee mesh fits dense indoor low-power networks."
    )
  );

  easyBlock2Questions.push(
    makeQuestion(
      "iot-c1-eb2-q20",
      "Bonne strategie d optimisation a la source :",
      "Which is a good source optimization strategy?",
      [
        makeOption("a", "Increase sampling rate to maximum", "Augmente volume, bruit et consommation.", "Increases volume, noise, and power."),
        makeOption("b", "Send raw data continuously", "Augmente trafic et cout.", "Increases traffic and cost."),
        makeOption("c", "Event-based sending + local aggregation"),
        makeOption("d", "Disable filtering to keep all noise", "Garde le bruit et surcharge le systeme.", "Keeps noise and overloads the system.")
      ],
      "c",
      "Envoyer seulement l utile (evenements + agregats) reduit trafic, cout et energie.",
      "Sending only useful events and aggregates reduces traffic, cost, and energy."
    )
  );

  var mediumBlock1Questions = [];

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q21",
      "Quel cas d usage correspond le mieux a LoRaWAN ?",
      "Which use case BEST matches LoRaWAN?",
      [
        makeOption("a", "Real-time HD camera stream", "LoRaWAN est faible debit.", "LoRaWAN is low throughput."),
        makeOption("b", "Soil moisture sensors over several hectares, years of battery"),
        makeOption("c", "Smartwatch to smartphone", "Ce cas est plutot BLE.", "This use case is typically BLE."),
        makeOption("d", "Voice assistant at home", "Un assistant vocal utilise plutot Wi-Fi.", "Voice assistants usually rely on Wi-Fi.")
      ],
      "b",
      "LoRaWAN est ideal pour longue portee, faible debit, autonomie multi-annees.",
      "LoRaWAN is ideal for long range, low data rate, and multi-year battery life."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q22",
      "Fuite de gaz: alerte < 2 s et doit marcher sans Internet. Meilleure architecture :",
      "A gas leak detector needs alert < 2 seconds and must work if Internet fails. Best architecture:",
      [
        makeOption("a", "Cloud-only", "Une panne Internet peut casser l alerte.", "Internet outage can break alerting."),
        makeOption("b", "Edge-only or Hybrid with local alerting"),
        makeOption("c", "LPWAN cloud-only", "Latence et dependance reseau peu adaptees a un cas critique.", "Latency and network dependence are poor fit for critical safety."),
        makeOption("d", "No processing architecture", "Une alerte exige de la logique de traitement.", "Alerting requires processing logic.")
      ],
      "b",
      "Pour securite critique, il faut traitement local (edge). Le cloud peut rester pour historique.",
      "For safety-critical response, local edge processing is required. Cloud can still keep logs."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q23",
      "En analyse de besoin, ordre correct :",
      "In requirement analysis, the correct order is:",
      [
        makeOption("a", "Choose technology first, then define problem", "Commencer par la techno mene souvent a des erreurs de cadrage.", "Starting with technology often causes scope/design errors."),
        makeOption("b", "Define needs -> derive constraints -> choose technology"),
        makeOption("c", "Build prototype -> then think about constraints", "On risque de refaire tout le systeme.", "You risk major rework."),
        makeOption("d", "Choose cheapest protocol always", "Le moins cher peut echouer sur latence/securite.", "Cheapest can fail latency/security needs.")
      ],
      "b",
      "La bonne methode: besoin SMART -> contraintes -> techno/architecture.",
      "Correct method: SMART needs -> constraints -> technology/architecture."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q24",
      "Contrainte qui impacte le plus le choix Wi-Fi vs LPWAN :",
      "Which constraint most impacts the choice between Wi-Fi and LPWAN?",
      [
        makeOption("a", "Device color", "Pas une contrainte technique reseau.", "Not a technical networking constraint."),
        makeOption("b", "Data volume / throughput needed"),
        makeOption("c", "Keyboard layout", "Sans lien avec choix reseau IoT.", "Unrelated to IoT network selection."),
        makeOption("d", "Office decoration", "Sans impact technique.", "No technical impact.")
      ],
      "b",
      "Wi-Fi pour haut debit; LPWAN pour petits messages. Le volume de donnees decide.",
      "Wi-Fi for high throughput; LPWAN for small payloads. Data volume is decisive."
    )
  );
  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q25",
      "Capteurs de pont en environnement difficile, longue batterie, reseau operateur :",
      "For bridge sensors in harsh environments + long battery + operator network, best fit:",
      [
        makeOption("a", "ZigBee", "Courte portee, requerrait beaucoup de passerelles locales.", "Short range, would require many local gateways."),
        makeOption("b", "Sigfox or NB-IoT (operator LPWAN/cellular IoT)"),
        makeOption("c", "BLE", "BLE est proximite, pas couverture operateur large.", "BLE is proximity, not wide operator coverage."),
        makeOption("d", "HDMI", "HDMI n est pas un reseau IoT.", "HDMI is not an IoT network.")
      ],
      "b",
      "Sigfox/NB-IoT conviennent a peu de messages, longue autonomie, couverture operateur.",
      "Sigfox/NB-IoT fit low message volume, long battery, and operator coverage."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q26",
      "L interoperabilite signifie surtout :",
      "Interoperability mainly means:",
      [
        makeOption("a", "Devices can run the same video game", "Ce n est pas la definition IoT.", "This is not the IoT definition."),
        makeOption("b", "Devices from different vendors can work together"),
        makeOption("c", "Devices have the same battery", "Meme batterie ne veut pas dire compatibilite systeme.", "Same battery does not mean system compatibility."),
        makeOption("d", "Devices are all made in one country", "Le pays de fabrication n est pas l interoperabilite.", "Manufacturing country is not interoperability.")
      ],
      "b",
      "Interop = compatibilite multi-fournisseurs via protocoles, API et formats communs.",
      "Interoperability = cross-vendor compatibility through common protocols, APIs, and data formats."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q27",
      "Bonne raison d utiliser une topologie mesh :",
      "Which is a good reason to use a mesh topology?",
      [
        makeOption("a", "To increase data rate to video levels", "Le mesh n augmente pas le debit au niveau video HD.", "Mesh does not create HD-video throughput."),
        makeOption("b", "To extend coverage and reliability indoors"),
        makeOption("c", "To avoid any gateway", "Il faut souvent quand meme un coordinateur/passerelle.", "You still usually need a coordinator/gateway."),
        makeOption("d", "To replace security", "La securite est un sujet distinct.", "Security is a separate concern.")
      ],
      "b",
      "Le mesh permet le relais entre noeuds pour mieux couvrir les batiments.",
      "Mesh allows node relaying to improve indoor coverage and resilience."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q28",
      "Selon ETSI EN 303 645 (base), quel choix est le plus aligne ?",
      "In ETSI EN 303 645 baseline thinking, which is MOST aligned?",
      [
        makeOption("a", "Default password admin/admin is fine", "Les identifiants faibles par defaut sont une faille classique.", "Weak default credentials are a classic vulnerability."),
        makeOption("b", "Secure software updates + unique credentials"),
        makeOption("c", "No authentication needed if campus is trusted", "Un reseau de confiance ne supprime pas l authentification.", "Trusted network does not remove authentication needs."),
        makeOption("d", "Store all passwords in plain text", "Stockage en clair = insecurise.", "Plain-text password storage is insecure.")
      ],
      "b",
      "La base securite IoT inclut MAJ securisees et identifiants uniques/non faibles.",
      "Baseline IoT security includes secure updates and unique non-weak credentials."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q29",
      "Quelle affirmation sur LPWAN est correcte ?",
      "Which statement about LTN/LPWAN is correct?",
      [
        makeOption("a", "They are designed for high-frequency video", "LPWAN n est pas fait pour video haute frequence.", "LPWAN is not designed for high-frequency video."),
        makeOption("b", "They trade throughput for range and battery life"),
        makeOption("c", "They require a mesh inside each classroom", "LoRaWAN est souvent etoile (star-of-stars), pas maillage obligatoire.", "LoRaWAN is often star-of-stars, not mandatory mesh."),
        makeOption("d", "They only work with USB cables", "LPWAN est radio sans fil.", "LPWAN is wireless radio.")
      ],
      "b",
      "LPWAN accepte faible debit pour gagner en portee et autonomie.",
      "LPWAN accepts low throughput to gain long range and battery life."
    )
  );

  mediumBlock1Questions.push(
    makeQuestion(
      "iot-c1-mb1-q30",
      "Meilleur choix: domotique locale dense, capteurs batterie, pas besoin Internet direct",
      "Best match: Home automation with many battery sensors, local comms, dense network, no direct Internet required",
      [
        makeOption("a", "ZigBee"),
        makeOption("b", "Wi-Fi", "Le Wi-Fi consomme plus, autonomie capteurs plus faible.", "Wi-Fi usually consumes more, reducing battery life."),
        makeOption("c", "LTE", "LTE implique abonnement operateur inutile si besoin local.", "LTE implies operator subscription unnecessary for local-only use."),
        makeOption("d", "Satellite", "Surdimensionne pour domotique locale.", "Overkill for local home automation.")
      ],
      "a",
      "ZigBee est adapte aux reseaux denses indoor basse conso avec coordination locale.",
      "ZigBee fits dense low-power indoor networks with local coordination."
    )
  );

  var mediumBlock2Questions = [];

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q31",
      "Pourquoi un LPWAN prive pour des capteurs en zone naturelle isolee (cas 8) ?",
      "For use case 8 (natural area sensors), why private LPWAN?",
      [
        makeOption("a", "Isolated deployment, no operator network needed"),
        makeOption("b", "High data exchanges", "Un LPWAN envoie peu de messages, pas des flux massifs.", "LPWAN is for sparse low-rate messages, not high data exchanges."),
        makeOption("c", "Mains power availability", "En zone isolee, l alimentation secteur est rarement disponible.", "In isolated areas, mains power is rarely available."),
        makeOption("d", "Short range focus", "Ces zones demandent plutot une portee longue.", "These scenarios usually require long-range communication.")
      ],
      "a",
      "Le LPWAN prive (ex: LoRaWAN) est ideal en zone sans infrastructure operateur, avec peu de messages et forte autonomie.",
      "Private LPWAN (e.g., LoRaWAN) is ideal in areas without operator infrastructure, with sparse messages and long battery life."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q32",
      "Cloud vs Edge pour une salle de classe surchauffee :",
      "Compare Cloud vs. Edge for IoT in an overheated classroom.",
      [
        makeOption("a", "Edge for low latency local processing, Cloud for storage"),
        makeOption("b", "Cloud for all processing", "Le cloud seul augmente la latence pour le controle temps reel.", "Cloud-only processing increases latency for real-time control."),
        makeOption("c", "Edge ignores data", "L edge traite localement; il n ignore pas les donnees.", "Edge does local processing; it does not ignore data."),
        makeOption("d", "Both same latency", "Le traitement edge est generalement plus rapide localement.", "Edge usually provides lower local latency than cloud.")
      ],
      "a",
      "L edge gere les reactions immediates (AC/chauffage), le cloud conserve l historique et les analyses globales.",
      "Edge handles immediate control actions, while cloud stores history and long-term analytics."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q33",
      "Topologie adaptee au cas 9 (automatisation batiment de bureaux) :",
      "Identify topology for use case 9 (office building automation).",
      [
        makeOption("a", "Mesh for distributed sensors across rooms"),
        makeOption("b", "Point-to-point only", "Point-to-point ne passe pas a l echelle pour de nombreux capteurs.", "Point-to-point does not scale for many distributed sensors."),
        makeOption("c", "Star with no resilience", "Une etoile pure reste plus sensible a un point unique de panne.", "A pure star is more exposed to a single point of failure."),
        makeOption("d", "Linear chain", "La chaine lineaire est moins robuste/flexible en batiment.", "Linear chain topology is less robust/flexible in buildings.")
      ],
      "a",
      "Le maillage permet le relais entre pieces/etages et ameliore la robustesse face aux obstacles.",
      "Mesh enables relays across rooms/floors and improves resilience against obstacles."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q34",
      "Contraintes pour un pont instrumente (cas 6) :",
      "What constraints for implementing IoT in challenging environments like bridges (use case 6)?",
      [
        makeOption("a", "Long battery, operator network, fixed objects"),
        makeOption("b", "Mobile, high data", "Les capteurs de pont sont fixes et transmettent peu de donnees.", "Bridge sensors are fixed and usually send low data volumes."),
        makeOption("c", "Short battery ok", "Une faible autonomie augmente fortement la maintenance.", "Short battery life dramatically increases maintenance."),
        makeOption("d", "No network needed", "Il faut un reseau pour remonter alertes et mesures.", "A network is required to report alerts and measurements.")
      ],
      "a",
      "Le cas pont exige autonomie longue, objets fixes et transmission fiable sur reseau adapte aux environnements difficiles.",
      "Bridge monitoring needs long autonomy, fixed nodes, and reliable transmission over suitable networks."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q35",
      "Protocole adapte au cas 13 (detecteurs d intrusion) :",
      "Select protocol for use case 13 (intrusion detectors).",
      [
        makeOption("a", "Sigfox for one-off alerts, low power"),
        makeOption("b", "Wi-Fi for high speed", "Le Wi-Fi consomme plus et exige une infrastructure locale.", "Wi-Fi consumes more power and requires local infrastructure."),
        makeOption("c", "BLE for mobility", "BLE est courte portee et peu adapte aux alertes isolees longue distance.", "BLE is short-range and not ideal for isolated long-range alerting."),
        makeOption("d", "LTE-M for video", "Le cas est de l alerte ponctuelle, pas du flux video.", "This use case is sparse alerting, not video streaming.")
      ],
      "a",
      "Pour des alertes rares, Sigfox offre tres basse consommation et bonne couverture selon la zone.",
      "For sparse alerts, Sigfox offers very low power operation and useful coverage depending on area."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q36",
      "Difference LPWAN operateur vs prive :",
      "Explain operator vs. private status in LPWAN.",
      [
        makeOption("a", "Operator: managed service, private: self-deployed"),
        makeOption("b", "Both same management", "Le mode operateur et le mode prive n offrent pas le meme niveau de controle.", "Operator and private modes do not provide the same control model."),
        makeOption("c", "Operator private only", "Un reseau operateur n est pas un reseau prive auto-heberge.", "An operator network is not a self-hosted private network."),
        makeOption("d", "Private requires operator", "Un reseau prive peut etre deploye sans operateur telecom.", "A private network can be deployed without a telecom operator.")
      ],
      "a",
      "Operateur: abonnement et service gere. Prive: maitrise locale de l infra et des passerelles.",
      "Operator model is subscription/managed service. Private model gives local control of infrastructure and gateways."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q37",
      "Pourquoi Wi-Fi pour le cas 11 (assistant vocal maison) ?",
      "For use case 11 (home assistant), why Wi-Fi?",
      [
        makeOption("a", "Permanent internet, significant data, low latency"),
        makeOption("b", "Low power priority", "Ces assistants sont souvent branches sur secteur, pas sur batterie stricte.", "These assistants are usually mains-powered, not battery-constrained."),
        makeOption("c", "No internet needed", "La plupart des fonctions vocales reposent sur des services en ligne.", "Most voice assistant functions rely on internet services."),
        makeOption("d", "Long range rural", "Le contexte est local domestique, pas une couverture rurale kilometrique.", "This is a local home context, not kilometer-scale rural coverage.")
      ],
      "a",
      "Le Wi-Fi apporte le debit et la connectivite continue necessaires a la voix, au cloud et aux integrations domotiques.",
      "Wi-Fi provides continuous connectivity and throughput required for voice, cloud processing, and home integrations."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q38",
      "KPIs pertinents pour une salle vide/surchauffee :",
      "Assess KPIs for IoT deployment in an empty classroom.",
      [
        makeOption("a", "Energy efficiency, occupancy detection accuracy, response time"),
        makeOption("b", "Only data volume", "Le volume seul ne mesure pas la qualite de la regulation thermique.", "Data volume alone does not measure thermal control performance."),
        makeOption("c", "No KPIs needed", "Sans KPI, impossible d evaluer objectivement le resultat.", "Without KPIs, you cannot objectively evaluate outcomes."),
        makeOption("d", "Focus on cost only", "Le cout est important mais doit etre complete par des indicateurs de performance.", "Cost matters but must be complemented by performance indicators.")
      ],
      "a",
      "Ces KPIs mesurent la valeur reelle: economie d energie, qualite de detection, vitesse de reaction.",
      "These KPIs capture real value: energy savings, detection quality, and control response speed."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q39",
      "Pourquoi BLE pour le cas 2 (smartwatch) ?",
      "Why BLE for use case 2 (smartwatch)?",
      [
        makeOption("a", "Very low power, short-range to smartphone"),
        makeOption("b", "Long range needed", "Le scenario montre-smartphone est de proximite, pas longue portee.", "Watch-to-phone communication is proximity-based, not long range."),
        makeOption("c", "High latency ok", "L usage wearable prefere des retours rapides.", "Wearable scenarios prefer fast feedback."),
        makeOption("d", "Dense network", "Le lien principal est personnel 1-a-1 avec le telephone.", "The primary link is personal one-to-one with the phone.")
      ],
      "a",
      "BLE optimise autonomie et liaison courte portee, parfaitement adapte aux wearables.",
      "BLE optimizes battery life and short-range links, making it ideal for wearables."
    )
  );

  mediumBlock2Questions.push(
    makeQuestion(
      "iot-c1-mb2-q40",
      "Quelle paire correspond a des technologies LPWAN classiques ?",
      "Classify technologies by range: Which is LPWAN?",
      [
        makeOption("a", "LoRaWAN, Sigfox"),
        makeOption("b", "Zigbee, BLE", "Zigbee/BLE sont plutot des technos courte portee (PAN).", "Zigbee/BLE are typically short-range PAN technologies."),
        makeOption("c", "Wi-Fi", "Le Wi-Fi est WLAN local, pas LPWAN.", "Wi-Fi is a local WLAN, not LPWAN."),
        makeOption("d", "LTE-M, NB-IoT", "Ce sont des variantes cellulaires IoT, pas la paire LPWAN non cellulaire visee ici.", "These are cellular IoT variants, not the non-cellular LPWAN pair targeted here.")
      ],
      "a",
      "LoRaWAN et Sigfox sont les references LPWAN non cellulaires pour faible debit et longue portee.",
      "LoRaWAN and Sigfox are classic non-cellular LPWAN technologies for low throughput and long range."
    )
  );

  var difficultBlock1Questions = [];

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q41",
      "Cas 1 video HD: quel choix protocole + contraintes/KPIs est pertinent ?",
      "For use case 1 (HD video), justify protocol and assess constraints vs. KPIs.",
      [
        makeOption("a", "Wi-Fi or LTE for broadband/low latency, constraints: power/infrastructure, KPIs: uptime >99%, latency <100ms"),
        makeOption("b", "LPWAN for video", "LPWAN ne supporte pas la bande passante video HD.", "LPWAN cannot support HD video bandwidth."),
        makeOption("c", "BLE, no power issue", "BLE est trop limite en debit/portee pour surveillance HD.", "BLE is too limited in throughput/range for HD surveillance."),
        makeOption("d", "Sigfox, high range", "Sigfox est fait pour petits messages, pas pour flux video.", "Sigfox is built for sparse small messages, not video streams.")
      ],
      "a",
      "La video HD exige haut debit et faible latence; il faut aussi cadrer les KPIs d uptime et latence.",
      "HD video requires high throughput and low latency, with clear uptime and latency KPIs."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q42",
      "Cas 3 suivi vehicule: choix techno/topologie correct ?",
      "Analyze requirements and select topology/protocol for use case 3 (vehicle tracking).",
      [
        makeOption("a", "Cellular (LTE-M), star with mobility support, requirements: national coverage, two-way"),
        makeOption("b", "PAN, mesh", "PAN mesh ne convient pas a la mobilite nationale.", "PAN mesh is not suitable for nationwide mobility."),
        makeOption("c", "WLAN, point-to-point", "WLAN est local et pas adapte aux handovers longue distance.", "WLAN is local and not suited for long-distance handovers."),
        makeOption("d", "LPWAN private, fixed", "Le cas implique mobilite et echanges bidirectionnels frequents.", "The use case requires mobility and regular two-way communication.")
      ],
      "a",
      "LTE-M est adapte a la mobilite, couverture large et communications bidirectionnelles.",
      "LTE-M fits mobility, wide coverage, and two-way communication needs."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q43",
      "Diagnostic campus: defis et architecture recommandee ?",
      "For campus diagnostic, describe challenges and propose architecture note.",
      [
        makeOption("a", "Challenges: interference, power, security; architecture: Edge for local, LTN for remote sensors"),
        makeOption("b", "No challenges, all cloud", "Le tout-cloud ignore les contraintes terrain et la latence locale.", "All-cloud ignores field constraints and local latency."),
        makeOption("c", "Only fog, ignore constraints", "Le fog seul ne remplace pas l analyse complete des contraintes.", "Fog alone does not replace full constraints analysis."),
        makeOption("d", "PAN everywhere, no assessment", "Un reseau unique sans diagnostic n est pas defensable techniquement.", "A one-size-fits-all network without assessment is not technically sound.")
      ],
      "a",
      "Un mix edge + reseau adapte par zone est plus robuste qu une architecture uniforme.",
      "A mixed edge plus context-aware network strategy is more robust than a single uniform architecture."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q44",
      "Cas 12 (humidite sol en ferme): meilleur choix ?",
      "Match protocol to use case 12 (farmer soil moisture) and justify vs. constraints.",
      [
        makeOption("a", "LoRaWAN, long range rural, low data, battery years; constraints: no infrastructure"),
        makeOption("b", "Wi-Fi, high power", "Wi-Fi consomme plus et ne couvre pas facilement des hectares.", "Wi-Fi consumes more and does not easily cover large fields."),
        makeOption("c", "BLE, short range", "BLE est trop court pour une ferme etendue.", "BLE range is too short for wide farm deployments."),
        makeOption("d", "NB-IoT, but operator dependent", "Possible selon couverture, mais la question vise l autonomie d un reseau prive rural.", "Possible with coverage, but this question targets private rural network autonomy.")
      ],
      "a",
      "LoRaWAN prive repond bien a l isolement rural, faible debit et autonomie longue.",
      "Private LoRaWAN fits rural isolation, low data rates, and long battery life."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q45",
      "Cas 6 pont: besoins et positionnement LTN ?",
      "Analyze specific needs for use case 6 (bridge sensors) and position LTN.",
      [
        makeOption("a", "Fixed, harsh env, long battery; LTN for low throughput alerts"),
        makeOption("b", "Mobile, high throughput", "Le scenario pont est fixe avec peu de donnees.", "Bridge scenario is fixed with low data throughput."),
        makeOption("c", "Short range PAN", "La portee PAN est souvent insuffisante pour ce type d ouvrage.", "PAN range is often insufficient for this type of infrastructure."),
        makeOption("d", "Cloud only, no edge", "Une logique locale peut etre necessaire pour filtrer/agir rapidement.", "Local logic may still be needed for filtering/fast reactions.")
      ],
      "a",
      "LTN/LPWAN convient aux alertes ponctuelles a faible debit avec forte autonomie.",
      "LTN/LPWAN suits sparse low-throughput alerts with long battery autonomy."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q46",
      "Cas 4 maison: pourquoi Zigbee plutot que Wi-Fi ?",
      "For use case 4 (home sensors), justify Zigbee over Wi-Fi in table format.",
      [
        makeOption("a", "Zigbee: mesh, low power, dense; Wi-Fi: higher data but power drain"),
        makeOption("b", "Wi-Fi better for all", "Wi-Fi est souvent moins favorable pour capteurs batterie en grand nombre.", "Wi-Fi is often less suitable for many battery sensors."),
        makeOption("c", "Zigbee no interoperability", "Zigbee est justement tres utilise pour l interoperabilite domotique.", "Zigbee is widely used for home automation interoperability."),
        makeOption("d", "Both same power", "La consommation Wi-Fi est en general plus elevee.", "Wi-Fi power consumption is generally higher.")
      ],
      "a",
      "Zigbee est mieux adapte aux capteurs nombreux sur batterie grace au maillage et a la faible conso.",
      "Zigbee is better for dense battery sensor networks thanks to mesh and low power."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q47",
      "Etude de faisabilite pour salle de classe surchauffee :",
      "Conduct feasibility study for IoT in campus overheated classroom.",
      [
        makeOption("a", "Observe temp, model with sensors; constraints: Wi-Fi avail, power; architecture: Edge/LTN"),
        makeOption("b", "Ignore observations", "Sans observation terrain, le modele est fragile.", "Without field observation, the model is weak."),
        makeOption("c", "Use only cellular, no assessment", "Choisir une techno sans evaluation des contraintes n est pas rigoureux.", "Choosing technology without constraints assessment is not rigorous."),
        makeOption("d", "Assume no constraints", "Tout deploiement a des contraintes reelles (energie, couverture, securite).", "Every deployment has real constraints (power, coverage, security).")
      ],
      "a",
      "La faisabilite exige d observer, mesurer puis aligner architecture et KPI sur le terrain.",
      "Feasibility requires observing, measuring, then aligning architecture and KPIs to field constraints."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q48",
      "Associer protocoles aux cas 5 et 13 :",
      "Match and justify protocols for use cases 5 and 13.",
      [
        makeOption("a", "Both Sigfox: low data, long range, alerts; justify autonomy in isolation"),
        makeOption("b", "Wi-Fi for both", "Wi-Fi consomme plus et depend d une infra locale stable.", "Wi-Fi consumes more power and depends on local stable infrastructure."),
        makeOption("c", "Zigbee for long distance", "Zigbee n est pas une techno longue distance.", "Zigbee is not a long-range technology."),
        makeOption("d", "LTE for low power", "LTE-M peut etre pertinent mais souvent plus energivore que Sigfox pour alertes rares.", "LTE-M can be relevant but is often more power-hungry than Sigfox for sparse alerts.")
      ],
      "a",
      "Pour messages rares en zones isolees, Sigfox reste un choix coherent pour autonomie et cout.",
      "For sparse messages in isolated areas, Sigfox is a coherent choice for autonomy and cost."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q49",
      "IoE vs IoT dans un campus: quelle affirmation est juste ?",
      "Explain IoE extension of IoT and constraints in campus context.",
      [
        makeOption("a", "IoE includes people/energy; constraints: integration, privacy"),
        makeOption("b", "IoE same as IoT", "IoE elargit le perimetre au-dela des seuls objets.", "IoE extends scope beyond only connected objects."),
        makeOption("c", "No constraints in IoE", "L IoE ajoute meme des contraintes d ethique et de gouvernance.", "IoE adds constraints such as ethics and governance."),
        makeOption("d", "IoE ignores networks", "Les reseaux restent centraux dans IoE.", "Networks remain central in IoE.")
      ],
      "a",
      "IoE inclut objets, personnes, processus et donnees; la vie privee et l integration deviennent critiques.",
      "IoE includes things, people, processes, and data; privacy and integration become critical."
    )
  );

  difficultBlock1Questions.push(
    makeQuestion(
      "iot-c1-db1-q50",
      "Positionner le fog dans une architecture campus multi-cas :",
      "Position Fog in architecture for multi-use case campus project.",
      [
        makeOption("a", "Fog aggregates edge data before cloud, for optimization"),
        makeOption("b", "Fog replaces edge", "Le fog complete l edge; il ne le remplace pas.", "Fog complements edge; it does not replace it."),
        makeOption("c", "No fog needed", "Le fog peut reduire bande passante et latence intermediaire.", "Fog can reduce bandwidth usage and intermediate latency."),
        makeOption("d", "Fog for all processing", "Le cloud reste utile pour stockage massif et analytique globale.", "Cloud is still useful for long-term storage and global analytics.")
      ],
      "a",
      "Le fog sert d etage intermediaire pour agreger/filtrer avant cloud.",
      "Fog acts as an intermediate layer to aggregate/filter before cloud."
    )
  );

  var difficultBlock2Questions = [];

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q51",
      "Cas 9: justifier maillage + Zigbee avec table exigences/contraintes/KPI :",
      "For use case 9, justify mesh topology and Zigbee, with requirements table.",
      [
        makeOption("a", "Mesh for resilience in multi-rooms, Zigbee interoperable low power; table: freq comm - mesh - reliability >98%"),
        makeOption("b", "Star Wi-Fi only", "Etoile Wi-Fi seule est moins resiliente et plus energivore pour capteurs batterie.", "Star Wi-Fi only is less resilient and more power-hungry for battery sensors."),
        makeOption("c", "Point-to-point BLE", "Point-to-point BLE n est pas adapte a un reseau multi-pieces dense.", "Point-to-point BLE is not suited for dense multi-room networks."),
        makeOption("d", "No topology", "Le choix de topologie est fondamental en architecture IoT.", "Topology selection is fundamental in IoT architecture.")
      ],
      "a",
      "Le maillage Zigbee maintient la couverture et la continuite meme si certains noeuds deviennent indisponibles.",
      "Zigbee mesh maintains coverage and continuity even when some nodes become unavailable."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q52",
      "Cas 10 medical mobile: technologie adaptee ?",
      "Analyze constraints and select technology for use case 10 (medical device).",
      [
        makeOption("a", "NB-IoT or LTE-M for mobility/reliability/security; constraints: data secure, consistent"),
        makeOption("b", "Sigfox, low security", "Sigfox est limite pour certains besoins bidirectionnels critiques du medical.", "Sigfox is limited for some critical bidirectional medical needs."),
        makeOption("c", "Zigbee, no mobility", "Zigbee ne couvre pas la mobilite large d un patient en deplacement.", "Zigbee does not provide wide-area mobility for moving patients."),
        makeOption("d", "Wi-Fi, fixed", "Le Wi-Fi seul est local et moins adapte a la continuite en mouvement.", "Wi-Fi alone is local and less suited to continuity while moving.")
      ],
      "a",
      "Le medical mobile exige connectivite fiable, securisee et continue; LTE-M/NB-IoT repondent mieux a ce cadre.",
      "Mobile medical monitoring requires reliable, secure, continuous connectivity; LTE-M/NB-IoT fit this need better."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q53",
      "Fiche de defis IoT pour zone de pause bruyante :",
      "Describe fact sheet for IoT challenges in chosen campus area (noisy break).",
      [
        makeOption("a", "Challenges: noise interference, power, privacy; constraints: dense users, Wi-Fi"),
        makeOption("b", "No challenges", "Des contraintes existent toujours en environnement reel.", "Real deployments always face constraints."),
        makeOption("c", "Only security", "Les contraintes sont multiples: interference, energie, precision, etc.", "Constraints are broader: interference, energy, accuracy, etc."),
        makeOption("d", "Ignore power", "L autonomie reste une variable cle de durabilite.", "Power autonomy remains a key sustainability variable.")
      ],
      "a",
      "Une fiche fiable doit couvrir interference, alimentation, vie privee et qualite de mesure.",
      "A solid fact sheet must cover interference, power, privacy, and measurement quality."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q54",
      "Associer protocoles aux cas 7 et 11 :",
      "Match protocol to use case 7 and 11, compare advantages.",
      [
        makeOption("a", "BLE for 7 (proximity), Wi-Fi for 11 (internet); BLE low cost, Wi-Fi data exchange"),
        makeOption("b", "Both LoRaWAN", "LoRaWAN n est pas optimal pour promotions de proximite ni assistant vocal.", "LoRaWAN is not optimal for proximity promos or voice assistants."),
        makeOption("c", "Sigfox for both", "Sigfox est trop limite en debit pour audio/interactions riches.", "Sigfox is too limited in throughput for voice/rich interactions."),
        makeOption("d", "NB-IoT for proximity", "La proximite smartphone en mall est mieux servie par BLE.", "Smartphone proximity in malls is better served by BLE.")
      ],
      "a",
      "BLE est ideal pour interactions proches; Wi-Fi convient au trafic voix/cloud de l assistant.",
      "BLE is ideal for close-range interactions; Wi-Fi suits the assistant's voice/cloud traffic."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q55",
      "Cas 14 releve compteur: positionner LPWAN cellulaire :",
      "Perform assessment for deployment in use case 14, position cellular LPWAN.",
      [
        makeOption("a", "NB-IoT for penetration/low power; assess: building constraints, KPIs data accuracy"),
        makeOption("b", "BLE for meters", "BLE n offre pas la penetration/couverture necessaire a l echelle batiment.", "BLE does not provide required penetration/coverage at building scale."),
        makeOption("c", "Zigbee national", "Zigbee n est pas une techno nationale operateur.", "Zigbee is not a nationwide operator technology."),
        makeOption("d", "Wi-Fi low power", "Wi-Fi n est pas le meilleur choix batterie pour compteurs isoles.", "Wi-Fi is not the best battery choice for isolated meters.")
      ],
      "a",
      "NB-IoT est adapte aux compteurs fixes grace a sa penetration indoor et sa consommation maitrisee.",
      "NB-IoT suits fixed metering thanks to strong indoor penetration and controlled power usage."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q56",
      "Classifier les familles reseau pour un projet campus :",
      "Explain network families and classify for campus project.",
      [
        makeOption("a", "PAN local low power, LPWAN wide low, WLAN medium high, Cellular wide mod; classify per area"),
        makeOption("b", "All PAN", "PAN seul ne couvre pas les besoins outdoor/campus et mobilite.", "PAN alone cannot cover outdoor/campus and mobility needs."),
        makeOption("c", "No classification", "La classification est necessaire pour un choix rationnel des technos.", "Classification is required for rational technology selection."),
        makeOption("d", "Cellular only", "Le tout-cellulaire est couteux et pas optimal pour tous les cas locaux.", "All-cellular is costly and not optimal for every local scenario.")
      ],
      "a",
      "Le bon choix depend de la zone et du besoin: proximite, portee, debit, energie, mobilite.",
      "Correct selection depends on area and need: proximity, range, throughput, power, and mobility."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q57",
      "Comparer les cas 2 et 10 :",
      "For use case 2 and 10, compare technologies and justify choices.",
      [
        makeOption("a", "BLE for 2 (personal low power), LTE-M for 10 (medical mobility secure); compare: BLE short vs. LTE wide"),
        makeOption("b", "Both BLE", "BLE n est pas adapte a la mobilite large du medical distant.", "BLE is not suitable for wide-area mobility in remote medical monitoring."),
        makeOption("c", "Both Sigfox", "Sigfox peut etre trop limite pour besoin medical bidirectionnel continu.", "Sigfox can be too limited for continuous bidirectional medical needs."),
        makeOption("d", "Wi-Fi for medical", "Wi-Fi seul est local et ne garantit pas la mobilite externe.", "Wi-Fi alone is local and does not guarantee external mobility.")
      ],
      "a",
      "BLE convient a la proximite montre-telephone, alors que LTE-M sert la connectivite medicale mobile securisee.",
      "BLE fits watch-to-phone proximity, while LTE-M supports secure mobile medical connectivity."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q58",
      "Resume protocolaire cas 1, 3, 5 :",
      "Create summary table for protocols and associate to use cases 1,3,5.",
      [
        makeOption("a", "Table: Protocol - Range - Power - Use; Wi-Fi 1, LTE-M 3, Sigfox 5; associate per needs"),
        makeOption("b", "No table", "La table est utile pour comparer objectivement les compromis.", "A table is useful to compare trade-offs objectively."),
        makeOption("c", "All LoRaWAN", "Tous les cas n ont pas les memes contraintes debit/mobilite.", "Not all use cases share the same throughput/mobility constraints."),
        makeOption("d", "Ignore association", "Associer techno et besoin est la base de la conception IoT.", "Mapping technology to need is core to IoT design.")
      ],
      "a",
      "Associer chaque protocole a ses contraintes permet une architecture defendable.",
      "Mapping each protocol to constraints produces a defensible architecture."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q59",
      "Defis globaux IoT/IoE :",
      "Assess IoT/IoE infrastructure challenges in global context with examples.",
      [
        makeOption("a", "Scalability, security, interoperability; examples: campus to city scale, hacks like Mirai"),
        makeOption("b", "No global challenges", "Les defis existent a toutes echelles, du campus a la ville.", "Challenges exist at all scales, from campus to city."),
        makeOption("c", "Only power", "La puissance n est qu une partie; securite et interop sont majeures.", "Power is only one part; security and interoperability are major."),
        makeOption("d", "Ignore scalability", "Sans scalabilite, un POC reussi peut echouer en deploiement reel.", "Without scalability, a successful POC can fail in real deployment.")
      ],
      "a",
      "Un systeme IoT robuste doit traiter croissance, securite et compatibilite multi-fournisseurs.",
      "A robust IoT system must address growth, security, and cross-vendor compatibility."
    )
  );

  difficultBlock2Questions.push(
    makeQuestion(
      "iot-c1-db2-q60",
      "Architecture globale multi-cas recommandee :",
      "For all use cases, propose a hybrid architecture and justify technical choices.",
      [
        makeOption("a", "Hybrid Cloud/Edge/Fog with LTN/LPWAN where low power, short-range high data; justify per constraints like mobility/power"),
        makeOption("b", "All cloud", "Tout-cloud augmente latence et trafic pour des cas locaux temps reel.", "All-cloud increases latency and traffic for local real-time cases."),
        makeOption("c", "No hybrid", "Une approche unique s adapte mal a des cas d usage heterogenes.", "A single approach poorly fits heterogeneous use cases."),
        makeOption("d", "Only PAN", "PAN seul ne couvre ni longue portee ni mobilite nationale.", "PAN alone cannot cover long range or nationwide mobility.")
      ],
      "a",
      "Un modele hybride combine reactivite locale (edge), agregation (fog) et analyse/stockage global (cloud).",
      "A hybrid model combines local responsiveness (edge), aggregation (fog), and global analytics/storage (cloud)."
    )
  );

  var mediumBlock2SetBQuestions = [];

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q31",
      "En IoT, une topologie point-to-point signifie :",
      "In IoT, a point-to-point topology means:",
      [
        makeOption("a", "Many devices talk to one gateway", "C est une topologie en etoile.", "That is star topology."),
        makeOption("b", "Two devices communicate directly with each other"),
        makeOption("c", "Devices relay data for others (mesh)", "C est une topologie maillee.", "That is mesh topology."),
        makeOption("d", "Communication only happens through the Cloud", "Topologie = structure reseau ; cloud = lieu de traitement.", "Topology describes network structure; cloud is processing location.")
      ],
      "b",
      "Point-to-point est un lien direct entre deux noeuds (A <-> B). Exemple: un capteur envoie directement a un recepteur sans relais.",
      "Point-to-point is a direct link between two nodes (A <-> B). Example: one sensor node sending directly to one receiver without relays."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q32",
      "Pour une zone naturelle protegee (isolee), peu de messages/jour, tres faible conso, longue portee, meilleur protocole :",
      "For a protected natural area (isolated), few messages/day, very low power, long range, best protocol is:",
      [
        makeOption("a", "Wi-Fi", "Wi-Fi necessite une infrastructure proche et consomme plus.", "Wi-Fi needs nearby infrastructure and consumes more power."),
        makeOption("b", "BLE", "BLE est tres courte portee.", "BLE is very short range."),
        makeOption("c", "LoRaWAN (LPWAN)"),
        makeOption("d", "ZigBee only", "ZigBee est plutot portee batiment ; il faudrait trop de passerelles.", "ZigBee is building-range; you'd need many gateways.")
      ],
      "c",
      "LoRaWAN convient aux deployments isoles: longue portee, faible conso, peu de messages/jour. Exemple: capteur niveau d eau envoyant 10 messages/jour.",
      "LoRaWAN fits isolated deployments: long range, low power, few messages/day. Example: water level sensor sending 10 messages/day."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q33",
      "Un agriculteur a des capteurs sur plusieurs hectares loin de toute infrastructure reseau. Meilleur choix :",
      "A farmer has sensors across several hectares far from any network infrastructure. Best choice:",
      [
        makeOption("a", "ZigBee mesh", "ZigBee maille demanderait de nombreux relais et garde une portee limitee.", "ZigBee mesh needs many repeaters and still has limited range."),
        makeOption("b", "LoRaWAN private network (gateway on-site)"),
        makeOption("c", "Wi-Fi", "Wi-Fi est trop court en portee et trop energivore.", "Wi-Fi range is too short and power too high."),
        makeOption("d", "NFC", "NFC fonctionne a quelques centimetres, pas sur des hectares.", "NFC is centimeters, not hectares.")
      ],
      "b",
      "Sans infrastructure existante, on peut deployer une gateway LoRaWAN privee sur site; capteurs longue portee et tres faible consommation.",
      "If there is no infrastructure, you can deploy a private LoRaWAN gateway on-site; sensors connect long-range with very low power."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q34",
      "Quel KPI mesure le mieux la charge reseau d un systeme IoT ?",
      "Which KPI best measures network load in an IoT system?",
      [
        makeOption("a", "Messages per day"),
        makeOption("b", "Screen size", "Aucun lien avec la charge reseau.", "Not related to network load."),
        makeOption("c", "Room temperature", "La temperature est une donnee mesuree, pas la charge reseau.", "Temperature is measured data, not network load."),
        makeOption("d", "Device color", "Aucun lien avec la charge reseau.", "Not related to network load.")
      ],
      "a",
      "Messages/jour (ou packets/jour) reflete directement le trafic genere par le systeme.",
      "Messages/day (or packets/day) directly reflects how much traffic your system generates."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q35",
      "Dans une architecture hybride Edge + Cloud, quelle tache appartient surtout a l Edge ?",
      "In a hybrid Edge + Cloud architecture, which task belongs MOST to the Edge?",
      [
        makeOption("a", "Long-term historical dashboards for 2 years", "Le stockage long terme est typiquement Cloud.", "Long-term storage is typically Cloud."),
        makeOption("b", "Global ML training on millions of records", "L entrainement ML massif se fait surtout dans le Cloud.", "Global scale ML training is usually Cloud-side."),
        makeOption("c", "Immediate threshold detection and local alert"),
        makeOption("d", "Public website hosting", "Heberger un site public n est pas une tache edge IoT.", "Public website hosting is not an IoT edge task.")
      ],
      "c",
      "L Edge sert aux decisions locales a faible latence. Exemple: alerte fuite de gaz en 2 secondes meme si Internet tombe.",
      "Edge is for low-latency local decisions. Example: gas leak alert in 2 seconds even if Internet fails."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q36",
      "Quelle affirmation Wi-Fi vs ZigBee est la plus correcte ?",
      "Which statement about Wi-Fi vs ZigBee is MOST accurate?",
      [
        makeOption("a", "ZigBee is higher throughput than Wi-Fi", "Le debit Wi-Fi est largement superieur.", "Wi-Fi throughput is much higher."),
        makeOption("b", "Wi-Fi typically consumes less power than ZigBee", "Wi-Fi consomme en general plus d energie.", "Wi-Fi usually consumes more power."),
        makeOption("c", "ZigBee is suitable for low-power indoor sensor networks"),
        makeOption("d", "Wi-Fi cannot be used in buildings", "Wi-Fi est tres courant en batiment.", "Wi-Fi is common in buildings.")
      ],
      "c",
      "ZigBee est concu pour faible conso et nombreux petits messages capteurs en interieur (souvent en maillage).",
      "ZigBee is designed for low power and many small indoor sensor messages (often mesh)."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q37",
      "Une ville installe des capteurs sur ponts/tunnels, environnement difficile, longue batterie, reseau operateur. Le plus adapte :",
      "A city installs sensors on bridges and tunnels, harsh environment, long battery, operator network. Most suitable:",
      [
        makeOption("a", "NB-IoT (operator cellular IoT)"),
        makeOption("b", "BLE", "BLE a une portee trop courte.", "BLE range is too short."),
        makeOption("c", "ZigBee without gateways", "ZigBee exigerait beaucoup de passerelles locales et n est pas un large reseau operateur.", "ZigBee would require many local gateways and is not operator wide-area."),
        makeOption("d", "USB serial", "Ce n est pas un reseau radio.", "Not a wireless network.")
      ],
      "a",
      "NB-IoT est operateur, bonne couverture et penetration indoor, avec autonomie longue pour petits volumes de donnees.",
      "NB-IoT is operator-based, offers good coverage and deep indoor penetration, with long battery life for small data."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q38",
      "Quelle exigence est la plus SMART ?",
      "Which requirement is the MOST SMART?",
      [
        makeOption("a", "Make the campus better.", "Trop vague.", "Too vague."),
        makeOption("b", "Monitor CO2.", "Pas de seuil ni condition mesurable.", "Not threshold-based or fully measurable."),
        makeOption("c", "Trigger an alert if CO2 > 1000 ppm for 3 minutes in Room 204 during class hours."),
        makeOption("d", "Use LoRaWAN everywhere.", "Un choix techno n est pas un besoin metier.", "Technology choice is not a requirement; it is a solution decision.")
      ],
      "c",
      "Cette exigence est specifique (seuil, salle, contexte), mesurable (ppm, minutes) et cadree temporellement.",
      "It is specific (threshold, room, condition), measurable (ppm, minutes), and time-scoped."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q39",
      "Dans la table Requirements -> Constraints -> KPIs, quel exemple est une contrainte correcte ?",
      "In the Requirements -> Constraints -> KPIs table, a correct constraint example is:",
      [
        makeOption("a", "Use ZigBee.", "C est un choix technologique, pas une contrainte.", "That is a technology decision, not a constraint."),
        makeOption("b", "Battery must last at least 2 years."),
        makeOption("c", "Topic name: campus/room1/temp.", "C est un detail d implementation.", "That is an implementation detail."),
        makeOption("d", "CO2 sensor brand: X.", "La marque n est pas une contrainte sauf exigence explicite.", "Brand is not a constraint unless explicitly imposed.")
      ],
      "b",
      "Batterie >= 2 ans est une contrainte de deploiement qui impacte echantillonnage, radio et architecture.",
      "Battery >= 2 years is a deployment constraint affecting sampling, network, and architecture choices."
    )
  );

  mediumBlock2SetBQuestions.push(
    makeQuestion(
      "iot-c1-mb2b-q40",
      "Meilleure raison pour laquelle LPWAN n est pas ideal pour alertes d urgence indoor temps reel :",
      "Which is the BEST reason LPWAN is NOT ideal for indoor real-time emergency alerts?",
      [
        makeOption("a", "LPWAN is too high bandwidth", "LPWAN est au contraire faible debit.", "LPWAN is low bandwidth, not high."),
        makeOption("b", "LPWAN typically has higher latency / lower throughput than needed"),
        makeOption("c", "LPWAN requires HDMI cables", "Faux, LPWAN est radio sans fil.", "False, LPWAN is wireless."),
        makeOption("d", "LPWAN only works underwater", "Ce n est pas vrai.", "Not true.")
      ],
      "b",
      "Pour des alertes critiques (<2 s), il faut faible latence et forte fiabilite indoor; ZigBee/Wi-Fi + Edge est souvent plus adapte. LPWAN est optimise pour messages petits et peu frequents.",
      "Critical alerts (<2s) need low latency and reliable indoor connectivity; ZigBee/Wi-Fi + Edge is usually better. LPWAN is optimized for small, infrequent messages."
    )
  );

  var hardBlock1SetBQuestions = [];

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q41",
      "Cas: detecteurs d intrusion en batiments isoles, pas d Internet, alertes ponctuelles, tres faible conso. Meilleur choix :",
      "Use case: Intrusion detectors in isolated buildings, no Internet, one-off alerts, very low power. Best match:",
      [
        makeOption("a", "BLE", "BLE est courte portee et suppose un smartphone proche.", "BLE is short range and needs a nearby phone."),
        makeOption("b", "Sigfox (or LPWAN with operator coverage)"),
        makeOption("c", "Wi-Fi", "Wi-Fi demande de l infrastructure et consomme plus.", "Wi-Fi needs infrastructure and more power."),
        makeOption("d", "ZigBee without any gateway/device", "ZigBee requiert coordinateur/passerelle pour remontee des donnees.", "ZigBee needs a coordinator/gateway for data collection.")
      ],
      "b",
      "Alertes courtes, faible frequence et tres basse conso en site isole correspondent bien a Sigfox/LPWAN operateur.",
      "One-off small alerts with very low power in isolated sites fit Sigfox/operator LPWAN."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q42",
      "Cas: releve automatique de compteurs, penetration indoor profonde, peu de donnees, tres faible conso. Meilleur choix :",
      "Use case: Automatic meter reading in buildings, deep indoor penetration, low data, very low power. Best choice:",
      [
        makeOption("a", "NB-IoT"),
        makeOption("b", "BLE", "BLE est courte portee et exige collecte locale.", "BLE requires short range and local collection."),
        makeOption("c", "HDMI", "HDMI n est pas un reseau de communication IoT.", "HDMI is not an IoT communication network."),
        makeOption("d", "High-speed Wi-Fi 6E", "C est surdimensionne et energivore pour ce cas.", "This is overkill and power-hungry for this use case.")
      ],
      "a",
      "NB-IoT est concu pour penetration indoor et releves faible debit longue autonomie via reseau operateur.",
      "NB-IoT is designed for deep indoor reach and low-rate metering with long battery life via operator network."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q43",
      "Dans LoRaWAN, la topologie courante est :",
      "In LoRaWAN, the common topology is best described as:",
      [
        makeOption("a", "Pure mesh between sensors", "LoRaWAN n est pas maillage cote capteurs.", "LoRaWAN is not mesh at the sensor layer."),
        makeOption("b", "Star-of-stars (end devices to gateways to network server)"),
        makeOption("c", "Point-to-point only", "LoRaWAN n est pas limite a un lien unique A-B.", "LoRaWAN is not only one-to-one point-to-point."),
        makeOption("d", "Ring topology", "La topologie anneau n est pas typique en LPWAN IoT.", "Ring topology is not typical in IoT LPWAN.")
      ],
      "b",
      "LoRaWAN relie les objets a une ou plusieurs gateways (etoile), puis gateways vers serveur reseau (autre etoile).",
      "LoRaWAN uses star at device-to-gateway level, then another star toward the network server."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q44",
      "Quel design ameliore le plus l autonomie batterie d un capteur IoT ?",
      "Which design most improves battery life in an IoT sensor node?",
      [
        makeOption("a", "Stream continuously at maximum rate", "Le flux continu augmente le temps radio et la consommation.", "Continuous streaming increases radio-on time and power draw."),
        makeOption("b", "Use event-driven messages + sleep mode"),
        makeOption("c", "Increase transmit power always", "Augmenter la puissance d emission vide plus vite la batterie.", "Higher transmit power drains battery faster."),
        makeOption("d", "Encrypt each packet twice with custom crypto", "La securite est importante mais double crypto custom ajoute du cout CPU et n est pas une bonne pratique.", "Security is needed, but double custom crypto adds CPU cost and is not best practice.")
      ],
      "b",
      "Sleep mode reduit la conso au repos et l envoi evenementiel reduit le nombre de transmissions.",
      "Sleep mode cuts idle consumption, and event-driven messaging reduces transmissions."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q45",
      "Projet avec communication bidirectionnelle et suivi vehicules temps reel. Meilleur choix :",
      "A project requires two-way communication and real-time vehicle tracking. Best option:",
      [
        makeOption("a", "Sigfox", "Sigfox a des limitations de downlink et n est pas ideal pour tracking temps reel.", "Sigfox has limited downlink and is not ideal for real-time tracking."),
        makeOption("b", "LTE-M"),
        makeOption("c", "ZigBee", "Portee trop courte.", "Short-range only."),
        makeOption("d", "BLE", "Portee trop courte.", "Short-range only.")
      ],
      "b",
      "LTE-M supporte mobilite, bidirectionnel et de meilleurs compromis debit/latence pour suivi en mouvement.",
      "LTE-M supports mobility, two-way communication, and better throughput/latency trade-offs for moving assets."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q46",
      "Si tu choisis Cloud-only pour une alerte indoor critique (<2 s), plus grand risque :",
      "You choose Cloud-only for a safety-critical indoor alarm (<2 seconds). What is the BIGGEST risk?",
      [
        makeOption("a", "Too much local storage", "Ce n est pas le principal risque ici.", "Not the main risk in this case."),
        makeOption("b", "Internet outage or latency breaks alert timing"),
        makeOption("c", "Too many ZigBee routers", "Sans lien direct avec le choix cloud-only.", "Unrelated to choosing cloud-only."),
        makeOption("d", "Sensor becomes more accurate", "L architecture ne rend pas le capteur plus precis.", "Architecture does not inherently improve sensor accuracy.")
      ],
      "b",
      "Le cloud-only depend du reseau Internet; panne ou latence peuvent retarder/casser l alerte.",
      "Cloud-only depends on Internet; outage or high latency can delay or break alert timing."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q47",
      "Quel appariement de couches est le plus correct ?",
      "Which pairing is MOST correct (layering)?",
      [
        makeOption("a", "ZigBee = application protocol, MQTT = radio protocol", "Roles inverses et incorrects.", "Roles are inverted and incorrect."),
        makeOption("b", "ZigBee = radio/link technology, MQTT = application messaging protocol"),
        makeOption("c", "ZigBee = database, MQTT = power supply", "Definitions incorrectes.", "Incorrect definitions."),
        makeOption("d", "ZigBee = encryption, MQTT = antenna", "Definitions incorrectes.", "Incorrect definitions.")
      ],
      "b",
      "ZigBee gere la couche radio/lien locale; MQTT gere les messages applicatifs sur IP via broker.",
      "ZigBee handles local wireless/linking, while MQTT handles application messaging over IP via a broker."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q48",
      "Pour un assistant vocal domestique (fort trafic, faible latence), meilleur reseau :",
      "For voice-activated home assistant with high data and low latency, best network is:",
      [
        makeOption("a", "Sigfox", "LPWAN trop faible debit.", "LPWAN too low throughput."),
        makeOption("b", "LoRaWAN", "LPWAN trop faible debit.", "LPWAN too low throughput."),
        makeOption("c", "Wi-Fi"),
        makeOption("d", "NFC", "NFC fonctionne a tres courte distance (centimetres).", "NFC works at centimeter-range distances.")
      ],
      "c",
      "Les assistants vocaux ont besoin d Internet continu et d echanges importants; Wi-Fi est la solution domestique standard.",
      "Voice assistants need continuous internet and significant data exchange; Wi-Fi is the typical home solution."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q49",
      "Pourquoi le maillage aide dans un deploiement dense indoor multi-pieces ?",
      "A dense indoor sensor deployment needs high reliability across multiple rooms. Why does mesh help?",
      [
        makeOption("a", "It reduces sensor accuracy", "La precision du capteur n est pas definie par la topologie reseau.", "Sensor accuracy is not determined by network topology."),
        makeOption("b", "It allows multi-hop routing around obstacles"),
        makeOption("c", "It makes LPWAN faster", "Le maillage ne sert pas a accelerer LPWAN.", "Mesh is not meant to speed up LPWAN."),
        makeOption("d", "It removes need for any power", "Le reseau a toujours besoin d energie; certains relais consomment plus.", "Power is still required; relay nodes may consume more.")
      ],
      "b",
      "Le mesh permet des relais multi-sauts pour contourner murs/interferences et etendre la couverture.",
      "Mesh enables multi-hop relays to bypass walls/interference and extend coverage."
    )
  );

  hardBlock1SetBQuestions.push(
    makeQuestion(
      "iot-c1-hb1b-q50",
      "Quelle justification Constraints -> Technology est correcte ?",
      "A correct Constraints -> Technology justification is:",
      [
        makeOption("a", "We chose LoRaWAN because it is trendy.", "La popularite n est pas une contrainte d ingenierie.", "Trendiness is not an engineering constraint."),
        makeOption("b", "We chose Wi-Fi because data is tiny and sensors must last 5 years on battery.", "Wi-Fi n est generalement pas ideal pour 5 ans sur batterie.", "Wi-Fi is usually not ideal for 5-year battery sensors."),
        makeOption("c", "We chose LoRaWAN because range is kilometers and messages are few per day."),
        makeOption("d", "We chose ZigBee because we need national coverage.", "ZigBee est local batiment, pas couverture nationale.", "ZigBee is local building-scale, not nationwide.")
      ],
      "c",
      "LoRaWAN correspond bien aux contraintes longue portee + faible volume de messages + autonomie batterie.",
      "LoRaWAN matches long-range + low message volume + battery autonomy constraints."
    )
  );

  var mediumDifficultBlock2026Questions = [];

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q61",
      "Selon des rapports 2025-2026, quelle technologie LPWAN a atteint environ 125 millions de terminaux deployes avec ~25% de CAGR ?",
      "According to recent 2025-2026 reports, which LPWAN technology has reached approximately 125 million deployed end devices globally and achieved a 25% CAGR?",
      [
        makeOption("a", "Sigfox", "Sigfox reste plus niche et moins deploie que LoRaWAN, surtout pour cas tres limites et souvent unidirectionnels.", "Sigfox remains more niche and less deployed than LoRaWAN, often for narrower one-way alert use cases."),
        makeOption("b", "LoRaWAN"),
        makeOption("c", "NB-IoT", "NB-IoT peut dominer certains scenarios cellulaires, mais ici la reference globale de deploiement LPWAN citee est LoRaWAN.", "NB-IoT can lead in some cellular scenarios, but the specific LPWAN deployment reference here points to LoRaWAN."),
        makeOption("d", "LTE-M", "LTE-M est tres utile pour mobilite, mais moins massif que LoRaWAN sur le parc capteurs statiques tres basse conso.", "LTE-M is strong for mobility, but less massive than LoRaWAN for large fleets of low-power static sensors.")
      ],
      "b",
      "LoRaWAN a fortement scale en 2025 avec environ 125M d appareils deployes, pousse par sa flexibilite public/prive, sa faible conso, et son usage massif en utilities, agriculture et smart cities. Sur un campus, il couvre de grands espaces avec capteurs batterie et maintenance reduite.",
      "LoRaWAN scaled massively in 2025 with about 125M deployed devices, driven by public/private flexibility, low power usage, and broad utility/agri/smart-city adoption. On campus, it supports long-range battery sensors over large areas with minimal maintenance."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q62",
      "Dans un campus energie intelligent (tendances 2025), quelle approche hybride est la plus recommandee pour equilibrer video haut debit et capteurs ultra basse conso ?",
      "In a smart campus energy management use case (2025 trends), which hybrid connectivity approach is increasingly recommended for balancing high-bandwidth needs (e.g., video) and ultra-low-power sensors?",
      [
        makeOption("a", "Pure 5G everywhere", "Le tout-5G est couteux et trop energivore pour des milliers de petits capteurs batterie.", "Pure 5G is costly and power-hungry for massive fleets of battery-powered low-data sensors."),
        makeOption("b", "Mixed LPWAN (LoRaWAN private) + Wi-Fi/5G for high-data zones"),
        makeOption("c", "Only NB-IoT for all devices", "NB-IoT est pertinent sur certains cas, mais moins flexible/couteux qu un mix prive LoRaWAN + reseaux haut debit locaux.", "NB-IoT is useful in some cases, but often less flexible/cost-optimized than private LoRaWAN plus local high-throughput networks."),
        makeOption("d", "Sigfox + satellite only", "Cette combinaison est trop limitee pour pilotage bidirectionnel riche et usages campus heterogenes.", "This combination is too limited for rich bidirectional control and heterogeneous campus workloads.")
      ],
      "b",
      "Le mix LoRaWAN prive + Wi-Fi/5G est devenu un standard pragmatique: LoRaWAN pour capteurs longue portee basse conso, Wi-Fi/5G pour flux video et interactions temps reel.",
      "A private LoRaWAN + Wi-Fi/5G mix is now a pragmatic standard: LoRaWAN for long-range low-power sensors, Wi-Fi/5G for video and real-time interactive workloads."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q63",
      "Quelle avancee recente LoRaWAN (2025-2026) renforce fortement le monitoring campus-edge ou remote ?",
      "What recent advancement in LoRaWAN (reported in 2025-2026) significantly improves its role in remote or campus-edge monitoring?",
      [
        makeOption("a", "Support for non-terrestrial networks (NTN/satellite) integration"),
        makeOption("b", "Increase to 1 Gbps data rates", "LoRaWAN reste un protocole bas debit; 1 Gbps ne correspond pas a son objectif.", "LoRaWAN remains low-throughput; 1 Gbps is not aligned with its design goals."),
        makeOption("c", "Mandatory 5G compatibility", "LoRaWAN est independant et ne depend pas d une compatibilite 5G obligatoire.", "LoRaWAN is independent and does not require mandatory 5G compatibility."),
        makeOption("d", "Removal of private network option", "Au contraire, les reseaux prives restent un avantage cle de LoRaWAN.", "On the contrary, private networking remains a core LoRaWAN strength.")
      ],
      "a",
      "L integration NTN/satellite etend la couverture de LoRaWAN dans les zones sans infra terrestre, utile pour stations meteo, zones vertes et capteurs peripheriques de campus.",
      "NTN/satellite integration extends LoRaWAN coverage to areas without terrestrial infrastructure, useful for weather stations, green zones, and campus-edge sensors."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q64",
      "En 2025 sur campus intelligent, quelle famille domine les connexions IoT haut debit (classes connectees, video) ?",
      "In a 2025 smart campus context, which technology family is projected to dominate IoT connections for high-throughput applications like smart classrooms with video?",
      [
        makeOption("a", "LPWAN (LoRaWAN/Sigfox)", "LPWAN est optimise pour faible debit et grande autonomie, pas video haut debit.", "LPWAN is optimized for low throughput and long battery life, not high-bandwidth video."),
        makeOption("b", "Wi-Fi IoT + Bluetooth IoT"),
        makeOption("c", "NB-IoT only", "NB-IoT cible surtout petits volumes capteurs, pas usages multimedia de salle.", "NB-IoT is mainly for low-rate sensor data, not classroom multimedia workloads."),
        makeOption("d", "Satellite IoT", "Le satellite est plus niche, plus couteux et souvent moins adapte a un campus dense.", "Satellite is more niche, costlier, and often less suitable for dense campus deployments.")
      ],
      "b",
      "Wi-Fi et Bluetooth dominent largement les connexions IoT campus: Wi-Fi pour debit/interactivite, BLE pour proximite/wearables basse conso.",
      "Wi-Fi and Bluetooth dominate campus IoT connectivity: Wi-Fi for throughput/interactivity, BLE for low-power proximity and wearables."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q65",
      "Pourquoi LoRaWAN prive est de plus en plus prefere a NB-IoT operateur pour capteurs indoor/outdoor denses en 2026 ?",
      "For a university smart building deployment in 2026, why is private LoRaWAN increasingly preferred over operator-dependent LPWAN like NB-IoT for dense indoor/outdoor sensors?",
      [
        makeOption("a", "Full control, no subscription fees, better interoperability with satellite/NTN"),
        makeOption("b", "Higher data rates than 5G", "LoRaWAN n est pas concu pour depasser les debits 5G.", "LoRaWAN is not designed to exceed 5G throughput."),
        makeOption("c", "Mandatory mains power", "LoRaWAN est justement pense pour des objets batterie longue duree.", "LoRaWAN is specifically intended for long-life battery devices."),
        makeOption("d", "Limited to one message per day", "LoRaWAN est configurable et pas limite a un seul message journalier.", "LoRaWAN is configurable and not limited to one message per day.")
      ],
      "a",
      "Le prive LoRaWAN donne controle complet, cout operationnel faible (pas d abonnement par capteur), et integration plus simple avec extensions NTN/hybrides.",
      "Private LoRaWAN gives full control, lower recurring cost (no per-device operator subscription), and easier integration with NTN/hybrid extensions."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q66",
      "Quelle tendance 2025-2026 pousse LPWAN vers une logique 'LPLAN' en entreprise/campus ?",
      "Which 2025-2026 trend shifts LPWAN toward 'LPLAN' (Low-Power Local-Area Networks) in enterprise/campus settings?",
      [
        makeOption("a", "Rise of private networks replacing wide-area operator models"),
        makeOption("b", "Decline of all low-power tech", "Le marche low-power IoT est en croissance, pas en declin.", "Low-power IoT is growing, not declining."),
        makeOption("c", "Mandatory global satellite only", "Le satellite complete les reseaux terrestres, il ne les remplace pas totalement.", "Satellite complements terrestrial networks; it does not fully replace them."),
        makeOption("d", "Increase in high-power 5G", "Le passage LPLAN vise justement faible puissance et controle local.", "The LPLAN shift is specifically about low power and local control.")
      ],
      "a",
      "Les organisations deploient davantage de reseaux prives basse conso pour maitriser cout, latence, souverainete et fiabilite locale.",
      "Organizations increasingly deploy private low-power networks to control cost, latency, sovereignty, and local reliability."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q67",
      "Pour suivi d occupation campus 2025, quelle combinaison protocolaire est la plus adaptee (proximite en salle + alertes outdoor longue portee) ?",
      "In smart campus occupancy tracking (2025 use case), which protocol combination best supports both proximity detection in rooms and wide-area outdoor alerts?",
      [
        makeOption("a", "BLE for indoor proximity + LoRaWAN for outdoor long-range"),
        makeOption("b", "Wi-Fi only everywhere", "Wi-Fi partout augmente conso/cout pour badges batterie et capteurs outdoor.", "Wi-Fi everywhere raises power/cost for battery badges and outdoor low-data sensors."),
        makeOption("c", "NB-IoT for both", "NB-IoT n est pas ideal pour proximite fine en salle a courte distance.", "NB-IoT is not ideal for fine-grained in-room short-range proximity detection."),
        makeOption("d", "Sigfox indoor", "Sigfox n est pas adapte a des scenarios indoor denses et interactifs.", "Sigfox is not suited to dense interactive indoor scenarios.")
      ],
      "a",
      "BLE gere la presence de proximite en salle, LoRaWAN agrege et remonte les alertes/indicateurs outdoor longue portee.",
      "BLE handles in-room proximity presence, while LoRaWAN carries long-range outdoor alerts and aggregated indicators."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q68",
      "Contrainte batiment universitaire multi-etages en 2026: pourquoi envisager Wi-Fi HaLow (802.11ah) plutot que Wi-Fi classique ?",
      "Analyze a constraint for deploying IoT sensors in a multi-story university building in 2026: why might Wi-Fi HaLow (802.11ah) be considered over classic Wi-Fi?",
      [
        makeOption("a", "Better range and penetration at sub-1 GHz for deep indoor coverage"),
        makeOption("b", "Much higher data rates than 5G", "HaLow n est pas plus rapide que 5G; il vise couverture/efficacite energetique.", "HaLow is not faster than 5G; it targets range/energy efficiency."),
        makeOption("c", "Ultra-low power like Sigfox", "HaLow est basse conso, mais pas au niveau ultra-bas debit de Sigfox.", "HaLow is low power, but not at Sigfox ultra-low profile."),
        makeOption("d", "No need for any power", "Aucun systeme radio ne fonctionne sans energie.", "No radio system works without power.")
      ],
      "a",
      "Wi-Fi HaLow en sub-1 GHz ameliore portee et penetration murale pour sous-sols, cages d ascenseur et etages avec moins d APs.",
      "Sub-1 GHz Wi-Fi HaLow improves range and wall penetration for basements, elevator shafts, and multi-floor coverage with fewer APs."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q69",
      "Pourquoi edge computing + LPWAN prive est un moteur KPI cle pour campus durables (2025-2026) ?",
      "Justify why edge computing combined with private LPWAN is a key KPI driver for sustainable smart campuses in 2025-2026.",
      [
        makeOption("a", "Reduces latency/energy use by local processing, minimizes cloud data transfer"),
        makeOption("b", "Increases global latency", "L edge reduit la latence en traitant au plus pres des capteurs.", "Edge decreases latency by processing near sensors."),
        makeOption("c", "Requires constant 5G", "Un LPWAN prive fonctionne sans dependance constante au reseau 5G.", "Private LPWAN does not require constant 5G dependence."),
        makeOption("d", "Eliminates all sensors", "Les capteurs restent indispensables; edge/LPWAN optimise leur exploitation.", "Sensors remain essential; edge/LPWAN optimizes their operation.")
      ],
      "a",
      "Le traitement local edge permet actions rapides et envoi d agregats seulement via LPWAN, ce qui reduit conso, trafic et cout cloud.",
      "Local edge processing enables fast actions and LPWAN uplink of aggregates only, reducing energy use, bandwidth, and cloud cost."
    )
  );

  mediumDifficultBlock2026Questions.push(
    makeQuestion(
      "iot-c1-md26-q70",
      "Mission diagnostic campus type CESI 2026: quelle architecture colle a l optimisation a la source (events + edge) pour couloir surpeuple ?",
      "For a CESI-like campus diagnostic mission in 2026, which architecture best fits source optimization (events, edge) for an overcrowded hallway?",
      [
        makeOption("a", "Edge + private LoRaWAN: process events locally, send KPIs only"),
        makeOption("b", "Full cloud with NB-IoT", "Le full cloud ajoute latence/bande passante sur un cas local temps reel.", "Full cloud adds latency/bandwidth overhead for local real-time corridor control."),
        makeOption("c", "Pure BLE mesh", "BLE seul peut limiter la couverture pour remontee globale a l echelle campus.", "Pure BLE mesh can limit large-scale campus-wide uplink coverage."),
        makeOption("d", "Satellite direct to devices", "Le satellite est surdimensionne et couteux pour un couloir local.", "Satellite direct is overkill and costly for a local hallway.")
      ],
      "a",
      "Edge detecte les pics en temps reel (action locale), LoRaWAN prive remonte seulement des KPIs agreges pour pilotage durable et faible cout.",
      "Edge detects peaks in real time (local action), while private LoRaWAN sends only aggregated KPIs for sustainable low-cost control."
    )
  );

  window.PERSYK_DATA = {
    siteName: "PERSEYK",
    themes: [
      {
        id: "iot",
        name: "IoT",
        summary: "Internet of Things",
        modules: [
          {
            id: "iot-cours-1",
            name: "Cours 1 - Foundations",
            description: "Easy Block 1-2, Medium Block 1-2 (+ Set B), Medium-Difficult 2026, Difficult Block 1-2 (+ Set B) (90 QCM).",
            blocks: [
              {
                id: "iot-cours-1-easy-block-1",
                name: "Easy Block 1 - 10 QCM",
                questions: easyBlock1Questions
              },
              {
                id: "iot-cours-1-easy-block-2",
                name: "Easy Block 2 - 10 QCM",
                questions: easyBlock2Questions
              },
              {
                id: "iot-cours-1-medium-block-1",
                name: "Medium Block 1 - 10 QCM",
                questions: mediumBlock1Questions
              },
              {
                id: "iot-cours-1-medium-block-2",
                name: "Medium Block 2 - 10 QCM",
                questions: mediumBlock2Questions
              },
              {
                id: "iot-cours-1-medium-block-2-set-b",
                name: "Medium Block 2 - Set B - 10 QCM",
                questions: mediumBlock2SetBQuestions
              },
              {
                id: "iot-cours-1-medium-difficult-2026",
                name: "Medium-Difficult Block 2026 - 10 QCM",
                questions: mediumDifficultBlock2026Questions
              },
              {
                id: "iot-cours-1-difficult-block-1",
                name: "Difficult Block 1 - 10 QCM",
                questions: difficultBlock1Questions
              },
              {
                id: "iot-cours-1-hard-block-1-set-b",
                name: "Hard Block 1 - Set B - 10 QCM",
                questions: hardBlock1SetBQuestions
              },
              {
                id: "iot-cours-1-difficult-block-2",
                name: "Difficult Block 2 - 10 QCM",
                questions: difficultBlock2Questions
              }
            ]
          }
        ]
      }
    ]
  };
})();

