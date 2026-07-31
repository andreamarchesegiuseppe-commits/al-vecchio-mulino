const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('mobile-menu-open', open);
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const menuViewer = document.getElementById('menuViewer');
const menuOpenButtons = document.querySelectorAll('[data-open-menu]');
const menuCloseButton = document.querySelector('[data-close-menu]');

function openPhotographicMenu() {
  if (!menuViewer) return;
  menuViewer.classList.add('open');
  menuViewer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  menuCloseButton?.focus();
}

function closePhotographicMenu() {
  if (!menuViewer) return;
  menuViewer.classList.remove('open');
  menuViewer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  menuOpenButtons[0]?.focus();
}

menuOpenButtons.forEach(button => button.addEventListener('click', openPhotographicMenu));
menuCloseButton?.addEventListener('click', closePhotographicMenu);
menuViewer?.addEventListener('click', event => {
  if (event.target === menuViewer) closePhotographicMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav?.classList.contains('open')) {
    nav.classList.remove('open');
    document.body.classList.remove('mobile-menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle?.focus();
  }
  if (event.key === 'Escape' && menuViewer?.classList.contains('open')) closePhotographicMenu();
});

const languageSelect = document.getElementById('languageSelect');
const originalText = new WeakMap();
const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');

const translations = {
  en: {
    'Il ristorante': 'The restaurant', 'Estate e inverno': 'Summer & winter', 'Contatti': 'Contact',
    'Prenota': 'Book', 'Chiama ora': 'Call now', 'Ristorante · Beaulard': 'Restaurant · Beaulard', 'La montagna': 'The mountains',
    'si mette a tavola.': 'come to the table.', "Cucina tipica piemontese, natura e accoglienza nel cuore dell'Alta Val di Susa.": 'Traditional Piedmontese cuisine, nature and hospitality in the heart of the Upper Susa Valley.',
    'Chiama per prenotare': 'Call to book', 'Scopri il menu': 'Discover the menu', 'Il Vecchio Mulino': 'The Old Mill',
    'Tradizione piemontese in un luogo autentico.': 'Piedmontese tradition in an authentic setting.',
    'Nel cuore di Beaulard, Vëilh Mourin è un ristorante di montagna dove fermarsi, respirare e riscoprire i sapori del territorio.': 'In the heart of Beaulard, Vëilh Mourin is a mountain restaurant where you can slow down, breathe and rediscover local flavours.',
    "Legno, pietra, una sala calda e un grande spazio all'aperto: il posto giusto per un pranzo in famiglia, una cena tra amici o una pausa dopo una giornata sui sentieri o sulla neve.": 'Wood, stone, a warm dining room and generous outdoor space: the perfect place for a family lunch, dinner with friends or a break after a day on the trails or in the snow.',
    'Scopri dove siamo': 'Find us', 'Cucina tipica di montagna': 'Traditional mountain cuisine', 'Il nostro menu.': 'Our menu.',
    'Specialità piemontesi, selvaggina e sapori del territorio. Piatti e prezzi corrispondono al menu 2026.': 'Piedmontese specialities, game and local flavours. Dishes and prices match our 2026 menu.',
    'Antipasti': 'Starters', 'Primi': 'First courses', 'Secondi': 'Main courses', 'Le bistecche': 'Steaks', 'Bevande': 'Drinks', 'Vino della casa': 'House wine',
    'Tagliere misto di salumi e formaggi': 'Mixed cured meat and cheese board', 'Vitello tonnato della tradizione piemontese': 'Traditional Piedmontese veal with tuna sauce',
    'Battuta di Fassona piemontese': 'Piedmontese Fassona beef tartare', 'Bruschetta della casa': 'House bruschetta',
    'Polenta concia': 'Polenta with melted cheese', 'Tagliolini al ragù di Fassona piemontese': 'Tagliolini with Piedmontese Fassona ragù',
    'Chicche al mirtillo': 'Blueberry gnocchi', 'Tagliatelle al farro e rosmarino': 'Spelt and rosemary tagliatelle',
    'Agnolotti al brasato alla Cavour': 'Agnolotti with Cavour-style braised beef', 'Tagliata di Fassona piemontese': 'Sliced Piedmontese Fassona beef',
    'Stinco di maiale tirolese affumicato CBT': 'Slow-cooked smoked Tyrolean pork knuckle', 'Tomahawk di cinghiale alla griglia': 'Grilled wild-boar tomahawk',
    'Polenta e cervo in civet': 'Polenta with venison civet', 'Polenta concia e cervo': 'Cheese polenta with venison',
    'Tometta paglierina gratinata al forno': 'Oven-gratinated Paglierina cheese', 'Con patate al forno.': 'With roasted potatoes.',
    'Con verdure grigliate e patate al forno.': 'With grilled vegetables and roasted potatoes.', 'Con miele e noci. Allergeni: 7, 8.': 'With honey and walnuts. Allergens: 7, 8.',
    'Naturale o gasata.': 'Still or sparkling.', 'Bibite': 'Soft drinks', 'Piccola / media.': 'Small / medium.', 'Birra giraffa': 'Beer tower', 'Massimo 3,5 L.': 'Maximum 3.5 L.',
    '1/4 litro': '1/4 litre', '1/2 litro': '1/2 litre', '1 litro': '1 litre', 'Coperto:': 'Cover charge:', 'Allergeni:': 'Allergens:',
    'per eventuali chiarimenti rivolgersi al personale.': 'please ask our staff for further information.',
    'È possibile trovare proiettili nella selvaggina, in quanto la carne servita è cacciata.': 'Game meat may contain shot, as it comes from hunted animals.',
    '* Prodotto congelato · ** Prodotto abbattuto': '* Frozen product · ** Blast-chilled product', 'Menu fotografico': 'Photo menu', 'Scarica il PDF': 'Download PDF',
    'Estate': 'Summer', "Pranzi all'aperto, verde e aria di montagna.": 'Outdoor dining, greenery and mountain air.',
    'Terrazza, prato e spazi per vivere Beaulard con calma. Ideale per famiglie, escursionisti e gruppi di amici.': 'A terrace, lawn and space to enjoy Beaulard at your own pace. Ideal for families, hikers and groups of friends.',
    'Inverno': 'Winter', 'Fuori la neve, dentro il calore della tavola.': 'Snow outside, the warmth of the table within.',
    'Piatti sostanziosi, atmosfera accogliente e il piacere di fermarsi dopo una giornata sugli sci o tra i boschi.': 'Hearty dishes, a welcoming atmosphere and the pleasure of stopping after a day skiing or walking in the woods.',
    'Il luogo': 'The place', 'Un angolo di montagna': 'A mountain retreat', "da vivere tutto l'anno.": 'to enjoy all year round.',
    'Prenotazioni per telefono o WhatsApp': 'Bookings by phone or WhatsApp', 'Ti aspettiamo': 'We look forward to seeing you', 'a Beaulard.': 'in Beaulard.',
    'Pranzo 11:00–15:00 · Cena 18:00–22:00': 'Lunch 11:00–15:00 · Dinner 18:00–22:00', 'Scrivici su WhatsApp': 'Message us on WhatsApp',
    'Apri su Google Maps': 'Open in Google Maps', 'Seguici su Instagram': 'Follow us on Instagram', 'Chiama': 'Call', 'Apri PDF': 'Open PDF', 'Scarica': 'Download',
    'Chi siamo': 'About us', 'Territorio': 'The area', 'Una storia che scorre insieme alla montagna.': 'A story that flows with the mountains.',
    "Molto prima che diventasse un luogo d'incontro, lungo questo sentiero il rumore dell'acqua accompagnava il lavoro dell'antico mulino di Beaulard. Qui gli abitanti delle borgate portavano cereali e segale, trasformando i frutti della montagna in farina per le famiglie della valle.": 'Long before it became a meeting place, the sound of water accompanied the work of Beaulard’s old mill along this path. Villagers brought grain and rye here, turning the fruits of the mountains into flour for the families of the valley.',
    'Con il passare del tempo il mulino ha smesso di lavorare, ma non ha perso la sua anima. La pietra, il legno e il legame con il territorio sono stati custoditi e reinterpretati, dando vita a un luogo dedicato all\'ospitalità e alla cucina piemontese.': 'Over time the mill stopped working, but never lost its soul. Stone, wood and its bond with the land were preserved and reimagined, creating a place devoted to hospitality and Piedmontese cuisine.',
    'Oggi Vëilh Mourin continua quella storia attraverso piatti sinceri, ingredienti del territorio e un\'accoglienza familiare. Un vecchio mulino che non macina più grano, ma continua a riunire le persone intorno alla tavola.': 'Today Vëilh Mourin carries that story forward through honest dishes, local ingredients and warm hospitality. An old mill that no longer grinds grain, yet still brings people together around the table.',
    'La nostra filosofia è semplice: rispettare la montagna, raccontarla attraverso la cucina e far sentire ogni ospite a casa.': 'Our philosophy is simple: respect the mountains, tell their story through food and make every guest feel at home.',
    'Scopri il territorio': 'Discover the area', 'Parti da qui.': 'Start from here.', 'La montagna ti aspetta.': 'The mountains are waiting.',
    "Vëilh Mourin è il punto ideale per iniziare una passeggiata, raggiungerci durante un'escursione o fermarsi a tavola dopo un giro in bici tra boschi e borgate.": 'Vëilh Mourin is the ideal starting point for a walk, a stop during a hike or a meal after cycling through forests and alpine villages.',
    'A piedi': 'On foot', 'Facile': 'Easy', 'Intermedio': 'Intermediate', 'Impegnativo': 'Challenging', 'Esperti': 'Expert',
    'Anello Beaulard – Puy Beaulard': 'Beaulard – Puy Beaulard loop', 'Rifugio Guido Rey': 'Guido Rey mountain hut', 'Sentiero Balcone della Valsusa': 'Susa Valley Balcony Trail',
    'Un itinerario ad anello tra boschi e antiche borgate, con partenza e ritorno a Beaulard.': 'A circular route through woods and old hamlets, starting and finishing in Beaulard.',
    "Da Château Beaulard si sale tra larici e panorami alpini fino al rifugio, ai piedi della Grand'Hoche.": 'From Château Beaulard, climb among larches and alpine views to the hut at the foot of Grand’Hoche.',
    "Il grande itinerario dell'Alta Valle attraversa boschi, alpeggi e borgate, raggiungendo Château Beaulard nelle tappe 5 e 6.": 'This major Upper Valley trail crosses woods, alpine pastures and hamlets, reaching Château Beaulard on stages 5 and 6.',
    'Un anello tra la Dora, strade forestali e borgate alpine, pensato per chi vuole scoprire la valle in sella.': 'A loop along the Dora, forest roads and alpine villages for discovering the valley by bike.',
    'Durata': 'Duration', 'Dislivello': 'Elevation', 'Difficoltà': 'Difficulty', 'Salita': 'Ascent', 'Distanza': 'Distance', 'Scopri il percorso': 'View route',
    'Tempi e difficoltà sono indicativi. Prima di partire verifica sempre condizioni meteo, stato dei sentieri e apertura dei percorsi.': 'Times and difficulty are indicative. Always check the weather, trail conditions and route status before setting out.',
    'Cosa dicono di noi': 'What our guests say', 'La parola ai nostri ospiti.': 'In our guests’ words.', 'Oltre 400 recensioni': 'Over 400 reviews',
    'Sapori autentici': 'Authentic flavours', 'Un luogo speciale': 'A special place', 'Accoglienza familiare': 'A warm welcome',
    'Gli ospiti apprezzano la cucina piemontese, la polenta, la selvaggina e i piatti generosi legati alla tradizione di montagna.': 'Guests appreciate the Piedmontese cuisine, polenta, game and generous dishes rooted in mountain tradition.',
    "Il verde, il legno e l'atmosfera tranquilla rendono Vëilh Mourin una sosta piacevole in ogni stagione.": 'Greenery, wood and a peaceful atmosphere make Vëilh Mourin a delightful stop in every season.',
    "La cordialità dello staff e l'ambiente informale fanno sentire a casa famiglie, escursionisti e gruppi di amici.": 'The friendly staff and relaxed setting make families, hikers and groups of friends feel at home.',
    'Leggi tutte le recensioni': 'Read all reviews', 'Lascia una recensione': 'Write a review', 'Valutazione indicativa verificata a luglio 2026. Fonte: Google.': 'Indicative rating verified in July 2026. Source: Google.'
  },
  fr: {
    'Il ristorante': 'Le restaurant', 'Estate e inverno': 'Été et hiver', 'Contatti': 'Contact', 'Prenota': 'Réserver', 'Chiama ora': 'Appeler maintenant',
    'Ristorante · Beaulard': 'Restaurant · Beaulard', 'La montagna': 'La montagne', 'si mette a tavola.': "s'invite à table.",
    "Cucina tipica piemontese, natura e accoglienza nel cuore dell'Alta Val di Susa.": "Cuisine piémontaise, nature et accueil au cœur de la Haute Vallée de Suse.",
    'Chiama per prenotare': 'Appelez pour réserver', 'Scopri il menu': 'Découvrir le menu', 'Il Vecchio Mulino': 'Le Vieux Moulin',
    'Tradizione piemontese in un luogo autentico.': 'La tradition piémontaise dans un lieu authentique.',
    'Nel cuore di Beaulard, Vëilh Mourin è un ristorante di montagna dove fermarsi, respirare e riscoprire i sapori del territorio.': "Au cœur de Beaulard, Vëilh Mourin est un restaurant de montagne où faire une pause, respirer et redécouvrir les saveurs locales.",
    "Legno, pietra, una sala calda e un grande spazio all'aperto: il posto giusto per un pranzo in famiglia, una cena tra amici o una pausa dopo una giornata sui sentieri o sulla neve.": "Bois, pierre, salle chaleureuse et grand espace extérieur : le lieu idéal pour un déjeuner en famille, un dîner entre amis ou une pause après une journée sur les sentiers ou dans la neige.",
    'Scopri dove siamo': 'Nous trouver', 'Cucina tipica di montagna': 'Cuisine traditionnelle de montagne', 'Il nostro menu.': 'Notre menu.',
    'Specialità piemontesi, selvaggina e sapori del territorio. Piatti e prezzi corrispondono al menu 2026.': 'Spécialités piémontaises, gibier et saveurs locales. Les plats et les prix correspondent au menu 2026.',
    'Antipasti': 'Entrées', 'Primi': 'Premiers plats', 'Secondi': 'Plats principaux', 'Le bistecche': 'Les steaks', 'Bevande': 'Boissons', 'Vino della casa': 'Vin de la maison',
    'Tagliere misto di salumi e formaggi': 'Planche mixte de charcuteries et fromages', 'Vitello tonnato della tradizione piemontese': 'Vitello tonnato traditionnel piémontais',
    'Battuta di Fassona piemontese': 'Tartare de bœuf Fassona piémontais', 'Bruschetta della casa': 'Bruschetta maison',
    'Polenta concia': 'Polenta au fromage fondu', 'Tagliolini al ragù di Fassona piemontese': 'Tagliolini au ragù de Fassona piémontaise',
    'Chicche al mirtillo': 'Gnocchis aux myrtilles', 'Tagliatelle al farro e rosmarino': 'Tagliatelles à l’épeautre et au romarin',
    'Agnolotti al brasato alla Cavour': 'Agnolotti au bœuf braisé façon Cavour', 'Tagliata di Fassona piemontese': 'Émincé de bœuf Fassona piémontais',
    'Stinco di maiale tirolese affumicato CBT': 'Jarret de porc tyrolien fumé, cuisson lente', 'Tomahawk di cinghiale alla griglia': 'Tomahawk de sanglier grillé',
    'Polenta e cervo in civet': 'Polenta et civet de cerf', 'Polenta concia e cervo': 'Polenta au fromage et cerf',
    'Tometta paglierina gratinata al forno': 'Tometta Paglierina gratinée au four', 'Con patate al forno.': 'Avec pommes de terre au four.',
    'Con verdure grigliate e patate al forno.': 'Avec légumes grillés et pommes de terre au four.', 'Con miele e noci. Allergeni: 7, 8.': 'Avec miel et noix. Allergènes : 7, 8.',
    'Naturale o gasata.': 'Plate ou gazeuse.', 'Bibite': 'Boissons sans alcool', 'Piccola / media.': 'Petite / moyenne.', 'Birra giraffa': 'Girafe de bière', 'Massimo 3,5 L.': 'Maximum 3,5 L.',
    '1/4 litro': '1/4 litre', '1/2 litro': '1/2 litre', '1 litro': '1 litre', 'Coperto:': 'Couvert :', 'Allergeni:': 'Allergènes :',
    'per eventuali chiarimenti rivolgersi al personale.': "pour toute précision, veuillez vous adresser au personnel.",
    'È possibile trovare proiettili nella selvaggina, in quanto la carne servita è cacciata.': 'Le gibier peut contenir des plombs, car la viande servie provient de la chasse.',
    '* Prodotto congelato · ** Prodotto abbattuto': '* Produit congelé · ** Produit refroidi rapidement', 'Menu fotografico': 'Menu en photos', 'Scarica il PDF': 'Télécharger le PDF',
    'Estate': 'Été', "Pranzi all'aperto, verde e aria di montagna.": 'Déjeuners en plein air, verdure et air de la montagne.',
    'Terrazza, prato e spazi per vivere Beaulard con calma. Ideale per famiglie, escursionisti e gruppi di amici.': 'Terrasse, pelouse et espaces pour profiter tranquillement de Beaulard. Idéal pour les familles, les randonneurs et les groupes d’amis.',
    'Inverno': 'Hiver', 'Fuori la neve, dentro il calore della tavola.': 'La neige dehors, la chaleur de la table à l’intérieur.',
    'Piatti sostanziosi, atmosfera accogliente e il piacere di fermarsi dopo una giornata sugli sci o tra i boschi.': 'Des plats généreux, une ambiance accueillante et le plaisir d’une pause après une journée de ski ou en forêt.',
    'Il luogo': 'Le lieu', 'Un angolo di montagna': 'Un coin de montagne', "da vivere tutto l'anno.": 'à vivre toute l’année.',
    'Prenotazioni per telefono o WhatsApp': 'Réservations par téléphone ou WhatsApp', 'Ti aspettiamo': 'Nous vous attendons', 'a Beaulard.': 'à Beaulard.',
    'Pranzo 11:00–15:00 · Cena 18:00–22:00': 'Déjeuner 11:00–15:00 · Dîner 18:00–22:00', 'Scrivici su WhatsApp': 'Écrivez-nous sur WhatsApp',
    'Apri su Google Maps': 'Ouvrir dans Google Maps', 'Seguici su Instagram': 'Suivez-nous sur Instagram', 'Chiama': 'Appeler', 'Apri PDF': 'Ouvrir le PDF', 'Scarica': 'Télécharger',
    'Chi siamo': 'Qui sommes-nous', 'Territorio': 'Territoire', 'Una storia che scorre insieme alla montagna.': 'Une histoire qui coule avec la montagne.',
    "Molto prima che diventasse un luogo d'incontro, lungo questo sentiero il rumore dell'acqua accompagnava il lavoro dell'antico mulino di Beaulard. Qui gli abitanti delle borgate portavano cereali e segale, trasformando i frutti della montagna in farina per le famiglie della valle.": 'Bien avant de devenir un lieu de rencontre, le bruit de l’eau accompagnait le travail de l’ancien moulin de Beaulard. Les habitants y apportaient céréales et seigle pour produire la farine des familles de la vallée.',
    'Con il passare del tempo il mulino ha smesso di lavorare, ma non ha perso la sua anima. La pietra, il legno e il legame con il territorio sono stati custoditi e reinterpretati, dando vita a un luogo dedicato all\'ospitalità e alla cucina piemontese.': 'Avec le temps, le moulin a cessé son activité sans perdre son âme. La pierre, le bois et le lien au territoire ont été préservés et réinterprétés pour créer un lieu dédié à l’accueil et à la cuisine piémontaise.',
    'Oggi Vëilh Mourin continua quella storia attraverso piatti sinceri, ingredienti del territorio e un\'accoglienza familiare. Un vecchio mulino che non macina più grano, ma continua a riunire le persone intorno alla tavola.': 'Aujourd’hui, Vëilh Mourin poursuit cette histoire avec des plats sincères, des produits locaux et un accueil familial. Un vieux moulin qui ne moud plus le grain, mais rassemble encore les gens autour de la table.',
    'La nostra filosofia è semplice: rispettare la montagna, raccontarla attraverso la cucina e far sentire ogni ospite a casa.': 'Notre philosophie est simple : respecter la montagne, la raconter par la cuisine et faire en sorte que chacun se sente chez soi.',
    'Scopri il territorio': 'Découvrez le territoire', 'Parti da qui.': 'Partez d’ici.', 'La montagna ti aspetta.': 'La montagne vous attend.',
    "Vëilh Mourin è il punto ideale per iniziare una passeggiata, raggiungerci durante un'escursione o fermarsi a tavola dopo un giro in bici tra boschi e borgate.": 'Vëilh Mourin est le point idéal pour commencer une promenade, faire étape pendant une randonnée ou déjeuner après une sortie à vélo entre bois et hameaux.',
    'A piedi': 'À pied', 'Facile': 'Facile', 'Intermedio': 'Intermédiaire', 'Impegnativo': 'Exigeant', 'Esperti': 'Experts',
    'Anello Beaulard – Puy Beaulard': 'Boucle Beaulard – Puy Beaulard', 'Rifugio Guido Rey': 'Refuge Guido Rey', 'Sentiero Balcone della Valsusa': 'Sentier balcon du Val de Suse',
    'Un itinerario ad anello tra boschi e antiche borgate, con partenza e ritorno a Beaulard.': 'Une boucle entre forêts et anciens hameaux, au départ et à l’arrivée de Beaulard.',
    "Da Château Beaulard si sale tra larici e panorami alpini fino al rifugio, ai piedi della Grand'Hoche.": 'Depuis Château Beaulard, la montée traverse les mélèzes et les paysages alpins jusqu’au refuge, au pied de la Grand’Hoche.',
    "Il grande itinerario dell'Alta Valle attraversa boschi, alpeggi e borgate, raggiungendo Château Beaulard nelle tappe 5 e 6.": 'Le grand itinéraire de la Haute Vallée traverse forêts, alpages et hameaux et rejoint Château Beaulard aux étapes 5 et 6.',
    'Un anello tra la Dora, strade forestali e borgate alpine, pensato per chi vuole scoprire la valle in sella.': 'Une boucle entre la Dora, les pistes forestières et les hameaux alpins pour découvrir la vallée à vélo.',
    'Durata': 'Durée', 'Dislivello': 'Dénivelé', 'Difficoltà': 'Difficulté', 'Salita': 'Montée', 'Distanza': 'Distance', 'Scopri il percorso': 'Voir le parcours',
    'Tempi e difficoltà sono indicativi. Prima di partire verifica sempre condizioni meteo, stato dei sentieri e apertura dei percorsi.': 'Les durées et difficultés sont indicatives. Vérifiez toujours la météo, l’état des sentiers et l’ouverture des parcours avant de partir.',
    'Cosa dicono di noi': 'Ce que disent nos clients', 'La parola ai nostri ospiti.': 'La parole à nos clients.', 'Oltre 400 recensioni': 'Plus de 400 avis',
    'Sapori autentici': 'Saveurs authentiques', 'Un luogo speciale': 'Un lieu unique', 'Accoglienza familiare': 'Accueil familial',
    'Gli ospiti apprezzano la cucina piemontese, la polenta, la selvaggina e i piatti generosi legati alla tradizione di montagna.': 'Les clients apprécient la cuisine piémontaise, la polenta, le gibier et les plats généreux issus de la tradition montagnarde.',
    "Il verde, il legno e l'atmosfera tranquilla rendono Vëilh Mourin una sosta piacevole in ogni stagione.": 'La verdure, le bois et l’atmosphère paisible font de Vëilh Mourin une halte agréable en toute saison.',
    "La cordialità dello staff e l'ambiente informale fanno sentire a casa famiglie, escursionisti e gruppi di amici.": 'La gentillesse de l’équipe et l’ambiance décontractée mettent à l’aise familles, randonneurs et groupes d’amis.',
    'Leggi tutte le recensioni': 'Lire tous les avis', 'Lascia una recensione': 'Laisser un avis', 'Valutazione indicativa verificata a luglio 2026. Fonte: Google.': 'Note indicative vérifiée en juillet 2026. Source : Google.'
  },
  de: {
    'Il ristorante': 'Das Restaurant', 'Estate e inverno': 'Sommer & Winter', 'Contatti': 'Kontakt', 'Prenota': 'Reservieren', 'Chiama ora': 'Jetzt anrufen',
    'Ristorante · Beaulard': 'Restaurant · Beaulard', 'La montagna': 'Die Berge', 'si mette a tavola.': 'kommen auf den Tisch.',
    "Cucina tipica piemontese, natura e accoglienza nel cuore dell'Alta Val di Susa.": 'Traditionelle piemontesische Küche, Natur und Gastfreundschaft im Herzen des oberen Susatals.',
    'Chiama per prenotare': 'Zur Reservierung anrufen', 'Scopri il menu': 'Speisekarte entdecken', 'Il Vecchio Mulino': 'Die alte Mühle',
    'Tradizione piemontese in un luogo autentico.': 'Piemontesische Tradition an einem authentischen Ort.',
    'Nel cuore di Beaulard, Vëilh Mourin è un ristorante di montagna dove fermarsi, respirare e riscoprire i sapori del territorio.': 'Im Herzen von Beaulard lädt das Bergrestaurant Vëilh Mourin dazu ein, innezuhalten, durchzuatmen und die Aromen der Region neu zu entdecken.',
    "Legno, pietra, una sala calda e un grande spazio all'aperto: il posto giusto per un pranzo in famiglia, una cena tra amici o una pausa dopo una giornata sui sentieri o sulla neve.": 'Holz, Stein, ein gemütlicher Gastraum und viel Platz im Freien: der ideale Ort für ein Familienessen, ein Abendessen mit Freunden oder eine Pause nach einem Tag auf den Wanderwegen oder im Schnee.',
    'Scopri dove siamo': 'So finden Sie uns', 'Cucina tipica di montagna': 'Traditionelle Bergküche', 'Il nostro menu.': 'Unsere Speisekarte.',
    'Specialità piemontesi, selvaggina e sapori del territorio. Piatti e prezzi corrispondono al menu 2026.': 'Piemontesische Spezialitäten, Wildgerichte und regionale Aromen. Gerichte und Preise entsprechen der Speisekarte 2026.',
    'Antipasti': 'Vorspeisen', 'Primi': 'Erste Gänge', 'Secondi': 'Hauptgerichte', 'Le bistecche': 'Steaks', 'Bevande': 'Getränke', 'Vino della casa': 'Hauswein',
    'Tagliere misto di salumi e formaggi': 'Gemischte Wurst- und Käseplatte', 'Vitello tonnato della tradizione piemontese': 'Traditionelles piemontesisches Vitello tonnato',
    'Battuta di Fassona piemontese': 'Tatar vom piemontesischen Fassona-Rind', 'Bruschetta della casa': 'Bruschetta des Hauses',
    'Polenta concia': 'Polenta mit geschmolzenem Käse', 'Tagliolini al ragù di Fassona piemontese': 'Tagliolini mit Ragù vom piemontesischen Fassona-Rind',
    'Chicche al mirtillo': 'Heidelbeer-Gnocchi', 'Tagliatelle al farro e rosmarino': 'Dinkel-Rosmarin-Tagliatelle',
    'Agnolotti al brasato alla Cavour': 'Agnolotti mit geschmortem Rind nach Cavour-Art', 'Tagliata di Fassona piemontese': 'Aufgeschnittenes piemontesisches Fassona-Rind',
    'Stinco di maiale tirolese affumicato CBT': 'Langsam gegarte, geräucherte Tiroler Schweinshaxe', 'Tomahawk di cinghiale alla griglia': 'Gegrilltes Wildschwein-Tomahawk',
    'Polenta e cervo in civet': 'Polenta mit Hirschragout', 'Polenta concia e cervo': 'Käsepolenta mit Hirsch',
    'Tometta paglierina gratinata al forno': 'Im Ofen gratinierter Paglierina-Käse', 'Con patate al forno.': 'Mit Ofenkartoffeln.',
    'Con verdure grigliate e patate al forno.': 'Mit gegrilltem Gemüse und Ofenkartoffeln.', 'Con miele e noci. Allergeni: 7, 8.': 'Mit Honig und Walnüssen. Allergene: 7, 8.',
    'Naturale o gasata.': 'Still oder mit Kohlensäure.', 'Bibite': 'Erfrischungsgetränke', 'Piccola / media.': 'Klein / mittel.', 'Birra giraffa': 'Biersäule', 'Massimo 3,5 L.': 'Maximal 3,5 L.',
    '1/4 litro': '1/4 Liter', '1/2 litro': '1/2 Liter', '1 litro': '1 Liter', 'Coperto:': 'Gedeck:', 'Allergeni:': 'Allergene:',
    'per eventuali chiarimenti rivolgersi al personale.': 'für weitere Informationen wenden Sie sich bitte an unser Personal.',
    'È possibile trovare proiettili nella selvaggina, in quanto la carne servita è cacciata.': 'Das Wildfleisch kann Schrot enthalten, da es von gejagten Tieren stammt.',
    '* Prodotto congelato · ** Prodotto abbattuto': '* Tiefkühlprodukt · ** Schockgekühltes Produkt', 'Menu fotografico': 'Speisekarte als Bilder', 'Scarica il PDF': 'PDF herunterladen',
    'Estate': 'Sommer', "Pranzi all'aperto, verde e aria di montagna.": 'Essen im Freien, Natur und Bergluft.',
    'Terrazza, prato e spazi per vivere Beaulard con calma. Ideale per famiglie, escursionisti e gruppi di amici.': 'Terrasse, Wiese und viel Platz, um Beaulard in Ruhe zu genießen. Ideal für Familien, Wanderer und Freundesgruppen.',
    'Inverno': 'Winter', 'Fuori la neve, dentro il calore della tavola.': 'Draußen Schnee, drinnen die Wärme des gedeckten Tisches.',
    'Piatti sostanziosi, atmosfera accogliente e il piacere di fermarsi dopo una giornata sugli sci o tra i boschi.': 'Herzhafte Gerichte, gemütliche Atmosphäre und eine erholsame Pause nach einem Tag auf Skiern oder im Wald.',
    'Il luogo': 'Der Ort', 'Un angolo di montagna': 'Ein Rückzugsort in den Bergen', "da vivere tutto l'anno.": 'für das ganze Jahr.',
    'Prenotazioni per telefono o WhatsApp': 'Reservierungen per Telefon oder WhatsApp', 'Ti aspettiamo': 'Wir freuen uns auf Sie', 'a Beaulard.': 'in Beaulard.',
    'Pranzo 11:00–15:00 · Cena 18:00–22:00': 'Mittagessen 11:00–15:00 · Abendessen 18:00–22:00', 'Scrivici su WhatsApp': 'Über WhatsApp schreiben',
    'Apri su Google Maps': 'In Google Maps öffnen', 'Seguici su Instagram': 'Folgen Sie uns auf Instagram', 'Chiama': 'Anrufen', 'Apri PDF': 'PDF öffnen', 'Scarica': 'Herunterladen',
    'Chi siamo': 'Über uns', 'Territorio': 'Die Region', 'Una storia che scorre insieme alla montagna.': 'Eine Geschichte, die mit den Bergen fließt.',
    "Molto prima che diventasse un luogo d'incontro, lungo questo sentiero il rumore dell'acqua accompagnava il lavoro dell'antico mulino di Beaulard. Qui gli abitanti delle borgate portavano cereali e segale, trasformando i frutti della montagna in farina per le famiglie della valle.": 'Lange bevor dieser Ort zum Treffpunkt wurde, begleitete das Rauschen des Wassers die Arbeit der alten Mühle von Beaulard. Die Bewohner brachten Getreide und Roggen hierher, um Mehl für die Familien des Tals zu mahlen.',
    'Con il passare del tempo il mulino ha smesso di lavorare, ma non ha perso la sua anima. La pietra, il legno e il legame con il territorio sono stati custoditi e reinterpretati, dando vita a un luogo dedicato all\'ospitalità e alla cucina piemontese.': 'Mit der Zeit stellte die Mühle ihre Arbeit ein, verlor aber nie ihre Seele. Stein, Holz und die Verbindung zur Region wurden bewahrt und neu interpretiert – als Ort der Gastfreundschaft und piemontesischen Küche.',
    'Oggi Vëilh Mourin continua quella storia attraverso piatti sinceri, ingredienti del territorio e un\'accoglienza familiare. Un vecchio mulino che non macina più grano, ma continua a riunire le persone intorno alla tavola.': 'Heute führt Vëilh Mourin diese Geschichte mit ehrlichen Gerichten, regionalen Zutaten und herzlicher Gastfreundschaft fort. Eine alte Mühle, die kein Korn mehr mahlt, aber weiterhin Menschen am Tisch zusammenbringt.',
    'La nostra filosofia è semplice: rispettare la montagna, raccontarla attraverso la cucina e far sentire ogni ospite a casa.': 'Unsere Philosophie ist einfach: die Berge achten, ihre Geschichte durch die Küche erzählen und jeden Gast wie zu Hause fühlen lassen.',
    'Scopri il territorio': 'Entdecken Sie die Region', 'Parti da qui.': 'Starten Sie hier.', 'La montagna ti aspetta.': 'Die Berge warten.',
    "Vëilh Mourin è il punto ideale per iniziare una passeggiata, raggiungerci durante un'escursione o fermarsi a tavola dopo un giro in bici tra boschi e borgate.": 'Vëilh Mourin ist der ideale Ausgangspunkt für einen Spaziergang, eine Einkehr während einer Wanderung oder eine Mahlzeit nach einer Radtour durch Wälder und Bergdörfer.',
    'A piedi': 'Zu Fuß', 'Facile': 'Leicht', 'Intermedio': 'Mittel', 'Impegnativo': 'Anspruchsvoll', 'Esperti': 'Experten',
    'Anello Beaulard – Puy Beaulard': 'Rundweg Beaulard – Puy Beaulard', 'Rifugio Guido Rey': 'Guido-Rey-Hütte', 'Sentiero Balcone della Valsusa': 'Valsusa-Panoramaweg',
    'Un itinerario ad anello tra boschi e antiche borgate, con partenza e ritorno a Beaulard.': 'Ein Rundweg durch Wälder und alte Weiler mit Start und Ziel in Beaulard.',
    "Da Château Beaulard si sale tra larici e panorami alpini fino al rifugio, ai piedi della Grand'Hoche.": 'Von Château Beaulard führt der Weg durch Lärchenwälder und alpine Landschaften zur Hütte am Fuß der Grand’Hoche.',
    "Il grande itinerario dell'Alta Valle attraversa boschi, alpeggi e borgate, raggiungendo Château Beaulard nelle tappe 5 e 6.": 'Der große Höhenweg durchquert Wälder, Almen und Weiler und erreicht Château Beaulard auf den Etappen 5 und 6.',
    'Un anello tra la Dora, strade forestali e borgate alpine, pensato per chi vuole scoprire la valle in sella.': 'Eine Runde entlang der Dora, über Forstwege und durch Bergdörfer, um das Tal mit dem Rad zu entdecken.',
    'Durata': 'Dauer', 'Dislivello': 'Höhenmeter', 'Difficoltà': 'Schwierigkeit', 'Salita': 'Aufstieg', 'Distanza': 'Distanz', 'Scopri il percorso': 'Route ansehen',
    'Tempi e difficoltà sono indicativi. Prima di partire verifica sempre condizioni meteo, stato dei sentieri e apertura dei percorsi.': 'Zeiten und Schwierigkeitsgrade sind Richtwerte. Prüfen Sie vor dem Start immer Wetter, Wegzustand und Streckenöffnung.',
    'Cosa dicono di noi': 'Was unsere Gäste sagen', 'La parola ai nostri ospiti.': 'Unsere Gäste haben das Wort.', 'Oltre 400 recensioni': 'Über 400 Bewertungen',
    'Sapori autentici': 'Authentische Aromen', 'Un luogo speciale': 'Ein besonderer Ort', 'Accoglienza familiare': 'Herzliche Gastfreundschaft',
    'Gli ospiti apprezzano la cucina piemontese, la polenta, la selvaggina e i piatti generosi legati alla tradizione di montagna.': 'Die Gäste schätzen die piemontesische Küche, Polenta, Wildgerichte und großzügige Speisen aus der Bergtradition.',
    "Il verde, il legno e l'atmosfera tranquilla rendono Vëilh Mourin una sosta piacevole in ogni stagione.": 'Natur, Holz und die ruhige Atmosphäre machen Vëilh Mourin zu jeder Jahreszeit zu einem angenehmen Ziel.',
    "La cordialità dello staff e l'ambiente informale fanno sentire a casa famiglie, escursionisti e gruppi di amici.": 'Das freundliche Team und die entspannte Atmosphäre sorgen dafür, dass sich Familien, Wanderer und Freundesgruppen wie zu Hause fühlen.',
    'Leggi tutte le recensioni': 'Alle Bewertungen lesen', 'Lascia una recensione': 'Bewertung schreiben', 'Valutazione indicativa verificata a luglio 2026. Fonte: Google.': 'Ungefähre Bewertung, geprüft im Juli 2026. Quelle: Google.'
  }
};

function translatePage(language) {
  const dictionary = translations[language] || {};
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const source = originalText.get(node);
    const value = source.trim();
    if (!value) continue;
    const translated = dictionary[value] || value;
    node.nodeValue = source.replace(value, translated);
  }

  document.documentElement.lang = language;
  languageSelect.value = language;
  document.title = language === 'en'
    ? 'Vëilh Mourin | Traditional Piedmontese restaurant in Beaulard'
    : language === 'fr'
      ? 'Vëilh Mourin | Restaurant piémontais traditionnel à Beaulard'
      : language === 'de'
        ? 'Vëilh Mourin | Traditionelles piemontesisches Restaurant in Beaulard'
        : 'Vëilh Mourin | Ristorante tipico piemontese a Beaulard';

  const messages = {
    it: 'Buongiorno, vorrei prenotare un tavolo.',
    en: 'Hello, I would like to book a table.',
    fr: 'Bonjour, je voudrais réserver une table.',
    de: 'Guten Tag, ich möchte gerne einen Tisch reservieren.'
  };
  whatsappLinks.forEach(link => {
    link.href = `https://wa.me/390122851669?text=${encodeURIComponent(messages[language])}`;
  });
  localStorage.setItem('vm-language', language);
}

languageSelect?.addEventListener('change', event => translatePage(event.target.value));
translatePage(localStorage.getItem('vm-language') || 'it');
