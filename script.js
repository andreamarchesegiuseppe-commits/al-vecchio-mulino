const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
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
    'Apri su Google Maps': 'Open in Google Maps', 'Seguici su Instagram': 'Follow us on Instagram', 'Chiama': 'Call', 'Apri PDF': 'Open PDF', 'Scarica': 'Download'
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
    'Apri su Google Maps': 'Ouvrir dans Google Maps', 'Seguici su Instagram': 'Suivez-nous sur Instagram', 'Chiama': 'Appeler', 'Apri PDF': 'Ouvrir le PDF', 'Scarica': 'Télécharger'
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
    'Apri su Google Maps': 'In Google Maps öffnen', 'Seguici su Instagram': 'Folgen Sie uns auf Instagram', 'Chiama': 'Anrufen', 'Apri PDF': 'PDF öffnen', 'Scarica': 'Herunterladen'
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
