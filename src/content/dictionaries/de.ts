import type { Dictionary } from "./cs";

/**
 * German UI dictionary. Typed against the Czech dictionary, so a missing or
 * misspelled key fails type checking rather than falling back silently.
 * Names, prices, addresses, phone numbers and times are never translated.
 */
export const de: Dictionary = {
  siteName: "Hotel Klika",
  restaurantName: "Klika Kitchen & Coffee",
  tagline: "Hotel und Restaurant im Herzen von České Budějovice",

  a11y: {
    skipToContent: "Zum Inhalt springen",
    mainNavigation: "Hauptnavigation",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    languageSwitcher: "Sprachauswahl",
    chooseLanguage: "Sprache wählen",
    currentLanguage: "Aktuelle Sprache",
    breadcrumb: "Brotkrumennavigation",
    home: "Startseite",
    previous: "Zurück",
    next: "Weiter",
    close: "Schließen",
    loading: "Wird geladen",
    slideOf: "Element {current} von {total}",
    imageOf: "Bild {current} von {total}",
    pauseSlider: "Automatischen Wechsel pausieren",
    playSlider: "Automatischen Wechsel fortsetzen",
    goToSlide: "Zu Element {index} springen",
    scrollDown: "Nach unten scrollen",
    placeholderImage: "Platzhalterbild — das finale Foto folgt",
    openInNewTab: "Wird in einem neuen Fenster geöffnet",
    required: "Pflichtfeld",
  },

  actions: {
    bookStay: "Aufenthalt buchen",
    bookTable: "Tisch reservieren",
    explore: "Klika entdecken",
    viewAll: "Alle ansehen",
    detail: "Details",
    showMore: "Mehr anzeigen",
    showLess: "Weniger anzeigen",
    callReception: "Rezeption anrufen",
    callRestaurant: "Restaurant anrufen",
    sendEmail: "E-Mail schreiben",
    whatsApp: "Über WhatsApp kontaktieren",
    navigate: "Route berechnen",
    openMap: "Karte öffnen",
    back: "Zurück",
    continue: "Weiter",
    submit: "Absenden",
    fullDailyMenu: "Ganzes Tagesmenü",
    fullMenu: "Komplette Speisekarte",
    drinksMenu: "Getränkekarte",
    wholeGallery: "Ganze Galerie",
    hotelDetail: "Mehr über das Hotel",
    restaurantDetail: "Mehr über das Restaurant",
    allRooms: "Alle Zimmer",
    pricing: "Preise",
    location: "So finden Sie uns",
    contactUs: "Kontaktieren Sie uns",
    startOver: "Neu beginnen",
    editSelection: "Auswahl ändern",
  },

  hero: {
    headline: "Hotel und Restaurant im Herzen von České Budějovice",
    subheadline:
      "Historisches Zentrum, Ruhe am Fluss und moderne südböhmische Küche.",
    handwritten: "Schauen Sie bei uns vorbei",
    features: [
      "3 Minuten vom Hauptplatz",
      "Privatparkplatz",
      "Frühstück inklusive",
      "Restaurant am Fluss",
    ],
    videoFallback:
      "Das Video konnte nicht geladen werden. Wir zeigen das Titelbild.",
  },

  bookingBar: {
    title: "Aufenthalt buchen",
    arrival: "Anreise",
    departure: "Abreise",
    guests: "Anzahl der Gäste",
    guest: "Gast",
    guestsFew: "Gäste",
    guestsMany: "Gäste",
    submit: "Weiter",
    nights: "Nächte",
    night: "Nacht",
    nightsFew: "Nächte",
  },

  validation: {
    summaryTitle: "Bitte überprüfen Sie Ihre Eingaben",
    required: "Dieses Feld ist ein Pflichtfeld",
    arrivalInPast: "Das Anreisedatum darf nicht in der Vergangenheit liegen",
    departureBeforeArrival: "Das Abreisedatum muss nach dem Anreisedatum liegen",
    invalidDate: "Geben Sie ein gültiges Datum ein",
    dateInPast: "Das Datum darf nicht in der Vergangenheit liegen",
    minGuests: "Geben Sie mindestens 1 Gast an",
    maxGuests: "Für größere Gruppen kontaktieren Sie uns bitte direkt",
    invalidEmail: "Geben Sie eine gültige E-Mail-Adresse ein",
    invalidPhone: "Geben Sie eine gültige Telefonnummer ein",
    selectRoom: "Bitte wählen Sie eine Zimmerkategorie",
    selectTime: "Bitte wählen Sie eine Uhrzeit",
  },

  dailyMenu: {
    eyebrow: "Empfehlung des Tages",
    title: "Tagesmenü",
    subtitle: "Wir kochen täglich frisch — mit dem, was gerade Saison hat.",
    servedFrom: "Wir servieren werktags von 11:00 bis 14:00",
    categories: {
      soup: "Suppen",
      main: "Hauptgerichte",
      dessert: "Desserts",
    },
    allergensLabel: "Allergene",
    allergenLegend: "Allergen-Legende",
    allergenNote:
      "Die Zahlen bei den Gerichten sind EU-Allergenkennzeichnungen, keine Preise.",
    empty: "Das heutige Tagesmenü wurde noch nicht veröffentlicht.",
    emptyHint: "Rufen Sie uns an — wir sagen Ihnen gerne, was heute auf dem Herd steht.",
    demoNotice:
      "Beispieldaten — das Tagesmenü wird an ein Administrationssystem angebunden.",
    dietary: {
      vegetarian: "Vegetarisch",
      vegan: "Vegan",
      "gluten-free": "Glutenfrei",
    },
  },

  split: {
    eyebrow: "Zwei Welten, eine Adresse",
    hotelTitle: "Hotel Klika",
    hotelText:
      "Ein Familienhotel im historischen Zentrum. Ruhe an der Malše, Privatparkplatz und ein Frühstück, bei dem man gerne sitzen bleibt.",
    hotelNote: "Gemütlich schlafen",
    restaurantTitle: "Klika Kitchen & Coffee",
    restaurantText:
      "Moderne südböhmische Küche der jüngeren Klika-Generation. Wir kochen saisonal, mit Zutaten von Erzeugern, die wir beim Namen kennen.",
    restaurantNote: "Wir kochen mit Liebe",
  },

  numbers: {
    eyebrow: "Das Hotel in Zahlen",
    title:
      "Ein Familienhotel im historischen Zentrum — und doch abseits des Trubels der Hauptstraßen.",
  },

  rooms: {
    eyebrow: "Unterkunft",
    title: "Zimmer und Apartments",
    subtitle:
      "Vom kompakten Einzelzimmer bis zum Apartment mit eigener Sauna und Blick auf die Insel Sokolský ostrov.",
    capacity: "Kapazität",
    upToGuests: "bis zu {count} Gäste",
    features: "Ausstattung",
    from: "ab",
    perNight: "pro Nacht",
    priceOnRequest: "Preis auf Anfrage",
    seasonalException:
      "Gilt nicht während Messen und an Silvester — Preis auf Anfrage.",
  },

  zones: {
    eyebrow: "Wo Sie sitzen",
    title: "Drei Orte, drei Stimmungen",
    subtitle:
      "Wählen Sie nach Wetter und Laune. Zonen können angefragt, ein bestimmter Tisch aber nicht garantiert werden.",
    seats: "Plätze",
    seatsLabel: "Kapazität",
    seasonal: "Saisonbetrieb",
  },

  producers: {
    eyebrow: "Zutaten",
    title:
      "Wir kochen saisonal und arbeiten mit südböhmischen Bauern und kleinen Lieferanten zusammen.",
    note: "Direkt von lokalen Bauern",
  },

  family: {
    eyebrow: "Mit Kindern",
    title: "Familien sind bei uns zu Hause",
    subtitle:
      "Ein Garten mit Sandkasten und Schaukel, Kinderstühle drinnen wie draußen und saisonale Gerichte für die Kleinsten.",
    items: [
      "3 Kinderstühle",
      "Wickeltisch",
      "Buntstifte und Malvorlagen",
      "Kinderbereich im Freien",
      "Sandkasten",
      "Schaukel",
      "Spielzeug",
      "Sitzplätze für Eltern in Sichtweite",
      "Saisonale Kindergerichte",
    ],
  },

  locationPreview: {
    eyebrow: "Wo Sie uns finden",
    title: "Im historischen Zentrum und trotzdem ruhig",
    walkingDistance: "Entfernungen zu Fuß",
    mapPlaceholderTitle: "Interaktive Karte",
    mapPlaceholderText:
      "Die Karte lädt erst nach dem Klick, damit die Seite schnell bleibt.",
    loadMap: "Karte laden",
    mapAttribution: "Kartendaten © Google",
    openInMaps: "In Karten öffnen",
    gps: "GPS",
    address: "Adresse",
  },

  gallery: {
    eyebrow: "Galerie",
    title: "Schauen Sie bei uns vorbei",
    subtitle: "Hotel, Zimmer, Restaurant, Essen, Garten und Umgebung.",
    categories: {
      all: "Alle",
      hotel: "Hotel",
      rooms: "Zimmer",
      restaurant: "Restaurant",
      food: "Essen",
      garden: "Garten",
      surroundings: "Umgebung",
    },
    empty: "In dieser Kategorie gibt es noch keine Fotos.",
    emptyHint: "Bitte wählen Sie eine andere Kategorie.",
    filterLabel: "Nach Kategorie filtern",
    openImage: "Bild öffnen",
    lightboxLabel: "Fotoansicht",
  },

  finalCta: {
    eyebrow: "Wir freuen uns auf Sie",
    hotelTitle: "Bleiben Sie über Nacht",
    hotelText:
      "Ein ruhiges Zimmer drei Minuten vom Hauptplatz, Frühstück inklusive.",
    restaurantTitle: "Kommen Sie zum Abendessen",
    restaurantText: "Saisonale Karte, Blick auf den Fluss und Garten in der Sonne.",
  },

  hotelPage: {
    eyebrow: "Hotel Klika",
    title: "Ein Familienhotel am Piaristické náměstí",
    intro:
      "Das Hotel Klika liegt im historischen Zentrum von České Budějovice, nur wenige Schritte von der Insel Sokolský ostrov und dem Zusammenfluss von Vltava und Malše entfernt. Wir befinden uns in einem ruhigen Teil des Zentrums — zum Hauptplatz sind es drei Minuten zu Fuß, der Trubel der Hauptstraßen bleibt jedoch um die Ecke.",
    handwritten: "Hier schläft man gut",
    areasTitle: "Wo Sie wohnen",
    areasSubtitle:
      "Die Unterkunft verteilt sich auf vier Gebäude mit einer gemeinsamen Rezeption.",
    servicesTitle: "Service der Rezeption",
    servicesSubtitle: "Die Rezeption ist täglich von 07:00 bis 22:00 geöffnet.",
    breakfastTitle: "Frühstück",
    breakfastSubtitle:
      "Wir servieren im Restaurant von 07:00 bis 10:00 als Buffet.",
    parkingTitle: "Parken, Fahrräder und Motorräder",
    childrenTitle: "Kinder und Haustiere",
    offersTitle: "Sonderangebote",
    offersNote:
      "Bitte bestätigen Sie die genauen Bedingungen an der Rezeption — die Angebote gelten nicht automatisch.",
    pricingTitle: "Preise",
    pricingTeaser:
      "Preise gültig vom 24. 3. 2026 bis 31. 12. 2026, Frühstück inklusive.",
    galleryTitle: "Das Hotel in Fotos",
    bookingTitle: "Buchen Sie Ihren Aufenthalt",
    bookingText:
      "Wählen Sie Termin und Zimmerkategorie. Die Verfügbarkeit bestätigt die Rezeption.",
  },

  roomsPage: {
    eyebrow: "Unterkunft",
    title: "Zimmer und Apartments",
    intro:
      "Jedes Zimmer verfügt über ein eigenes Bad, Fernseher, Telefon und Internetanschluss. Ein Kinderbett steht zur Verfügung.",
    allCategories: "Alle Kategorien",
  },

  pricingPage: {
    eyebrow: "Preise",
    title: "Übernachtungspreise",
    validity: "Preisliste gültig vom {from} bis {to}",
    perNight: "pro Nacht",
    perDay: "pro Tag",
    perPersonDay: "pro Person und Tag",
    perPerson: "pro Person",
    perStay: "pro Aufenthalt",
    includedTitle: "Im Zimmerpreis enthalten",
    included: ["Frühstück", "MwSt.", "WLAN", "Service der Rezeption"],
    notIncludedTitle: "Nicht im Preis enthalten",
    notIncluded: ["Parken", "Kurtaxe"],
    extrasTitle: "Zuschläge und Gebühren",
    exceptionNote:
      "Mit Sternchen gekennzeichnete Preise gelten nicht während Messen und an Silvester. Diese Termine kalkulieren wir individuell auf Anfrage.",
    singleRoomTitle: "Zum Einzelzimmer „limited“",
    singleRoomText:
      "Das Zimmer verfügt über ein eigenes Bad, einen Fernseher und einen Internetanschluss, seine Abmessungen sind jedoch minimal. Es eignet sich vor allem für kurze Aufenthalte oder eine Übernachtung.",
    touristFeeNote: "Kurtaxe der Stadt für das Jahr 2026.",
    askReception: "Die Rezeption bestätigt Ihnen gerne den Preis für Ihren Termin.",
  },

  hotelBooking: {
    eyebrow: "Aufenthalt buchen",
    title: "Wählen Sie Ihren Aufenthalt",
    steps: {
      dates: "Termin und Gäste",
      room: "Zimmerauswahl",
      "room-detail": "Zimmerdetails",
      guest: "Ihre Daten",
      summary: "Zusammenfassung",
      contact: "Kontakt zur Rezeption",
    },
    stepOf: "Schritt {current} von {total}",
    progressLabel: "Fortschritt der Buchung",
    datesTitle: "Wann kommen Sie zu uns?",
    roomTitle: "Welche Kategorie passt zu Ihnen?",
    roomDetailTitle: "Ausgewähltes Zimmer",
    guestTitle: "Wie erreichen wir Sie?",
    summaryTitle: "Zusammenfassung Ihrer Auswahl",
    contactTitle: "Letzter Schritt: Melden Sie sich bei der Rezeption",
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    note: "Anmerkung",
    notePlaceholder: "Z. B. späte Anreise, Kinderbett, Hund…",
    selectedRoom: "Ausgewähltes Zimmer",
    stay: "Termin",
    guestCount: "Anzahl der Gäste",
    estimateTitle: "Richtpreis",
    estimateNote:
      "Unverbindliche Summe für die Übernachtung. Parken und Kurtaxe sind nicht enthalten. Den Endpreis bestätigt die Rezeption.",
    notConfirmed:
      "Dies ist eine unverbindliche Auswahl. Die Verfügbarkeit des Zimmers muss die Rezeption bestätigen.",
    contactText:
      "Kopieren Sie die Zusammenfassung oder melden Sie sich direkt — die Rezeption prüft den Termin und schließt die Buchung ab.",
    copySummary: "Zusammenfassung kopieren",
    copied: "Kopiert",
    storageUnavailable:
      "Ihr Browser kann den Buchungsentwurf nicht speichern. Die Angaben gehen beim Schließen der Seite verloren.",
    noRoomSelected: "Sie haben noch kein Zimmer ausgewählt.",
  },

  restaurantPage: {
    eyebrow: "Klika Kitchen & Coffee",
    title: "Moderne südböhmische Küche am Fluss",
    intro:
      "Das Restaurant führt seit Ende 2016 die jüngere Klika-Generation. Wir kochen mit saisonalen Zutaten von kleinen südböhmischen Bauern und Lieferanten. Im Innenraum finden Sie auch einen Teil der ursprünglichen Stadtmauer aus dem 14. Jahrhundert.",
    handwritten: "Empfehlung des Tages",
    heroLede: "Wir kochen saisonal, mit Zutaten von Erzeugern, die wir beim Namen kennen.",
    collageEyebrow: "Saisonale Küche",
    collageTitle: "Jeder Teller hat seine Geschichte",
    collageTags: ["Saisonale Küche", "Regionale Zutaten", "Jeder Teller hat seine Geschichte"],
    menuNavEyebrow: "Die Speisekarte",
    menuNavTitle: "Worauf haben Sie Appetit?",
    menuNavText:
      "Das Tagesmenü wechselt täglich, die Speisekarte etwa einmal im Monat.",
    dailyCard: "Heutiges Tagesmenü",
    permanentCard: "Die Speisekarte",
    reopened:
      "Nach einer umfassenden Renovierung des Innenraums haben wir am 14. Februar 2025 wiedereröffnet.",
    jimeJih: "Gründungsmitglied der Vereinigung Jíme Jih",
    principlesTitle: "Wie wir kochen",
    principles: [
      "Saisonale Zutaten von lokalen Bauern",
      "Kein Palmöl",
      "Keine künstlichen Geschmacksverstärker",
      "Keine Fertigprodukte",
      "Die Speisekarte wechselt etwa einmal im Monat",
      "Umweltbewusste Verpackungen und Mülltrennung",
    ],
    menuTeaser: "Speisekarte",
    menuTeaserText:
      "Wir ändern die Karte etwa monatlich — je nachdem, was gerade frisch ist.",
    drinksTitle: "Getränke",
    drinksSubtitle:
      "Budvar, unpasteurisierte Lager aus kleinen Brauereien, hausgemachte Limonaden und Kaffee.",
    drinksNote: "Die komplette Getränkekarte finden Sie bei uns am Tisch.",
    instagramText: "Was bei uns gerade los ist, sehen Sie auf Instagram.",
    followInstagram: "@klikakitchen folgen",
    bookingTitle: "Tischreservierung",
    bookingText: "Schreiben Sie uns Ihren Wunschtermin — wir melden uns zurück.",
  },

  menuPage: {
    eyebrow: "Speisekarte",
    title: "Ständige Speisekarte",
    intro:
      "Wir ändern die Karte etwa einmal im Monat je nach Saison. Alle Preise verstehen sich in tschechischen Kronen inklusive MwSt.",
    categories: {
      soups: "Suppen",
      "small-dishes": "Kleine Gerichte",
      "main-courses": "Hauptgerichte",
      "side-dishes": "Beilagen",
      children: "Für Kinder",
      desserts: "Desserts",
    },
    jumpTo: "Zur Kategorie springen",
    glutenFreeOption: "Glutenfrei zubereitbar",
  },

  dailyMenuPage: {
    eyebrow: "Tagesmenü",
    title: "Was wir heute kochen",
    intro: "Das Tagesmenü wechselt täglich. Das heutige Angebot finden Sie unten.",
  },

  restaurantBooking: {
    eyebrow: "Tischreservierung",
    title: "Reservieren Sie einen Tisch",
    intro:
      "Bitte füllen Sie das Formular aus. Wir bestätigen Ihre Reservierung telefonisch oder per E-Mail.",
    date: "Datum",
    time: "Uhrzeit",
    guests: "Anzahl der Gäste",
    zone: "Bevorzugte Zone",
    name: "Vor- und Nachname",
    phone: "Telefon",
    email: "E-Mail",
    note: "Anmerkung",
    notePlaceholder: "Z. B. Kinderstuhl, Feier, Allergien…",
    zones: {
      any: "Beliebige Zone",
      restaurant: "Restaurant",
      conservatory: "Wintergarten",
      garden: "Garten",
    },
    zoneHint:
      "Wir bemühen uns um Ihre Wunschzone, können sie aber nicht garantieren.",
    submit: "Anfrage senden",
    summaryTitle: "Zusammenfassung der Anfrage",
    notConfirmed:
      "Ihre Anfrage ist noch nicht bestätigt. Bitte kontaktieren Sie das Restaurant, um die Reservierung abzuschließen.",
    contactText: "Melden Sie sich bitte, damit wir Ihnen den Tisch reservieren.",
    newRequest: "Neue Anfrage",
    openingNote: "Täglich von 10:30 bis 22:00 geöffnet.",
  },

  catering: {
    eyebrow: "Veranstaltungen und Catering",
    title: "Feiern, Hochzeiten und Firmenevents",
    intro:
      "Wir kümmern uns um Familienfeiern, Hochzeiten, private und geschäftliche Veranstaltungen. Menü und Budget planen wir immer individuell.",
    capacityTitle: "Kapazität",
    capacityText: "Wir richten Veranstaltungen für etwa bis zu 50 Personen aus.",
    offerTitle: "Was wir anbieten",
    offer: [
      "Familienfeiern",
      "Hochzeiten",
      "Private Veranstaltungen",
      "Firmenfeiern",
      "Buffets",
      "Kleineres Catering außer Haus",
      "Individuelle Planung nach Anlass und Budget",
    ],
    vouchersTitle: "Geschenkgutscheine",
    vouchersText: "Gedruckte Gutscheine erhalten Sie direkt im Restaurant.",
    vouchersNote:
      "Elektronische Gutscheine sind in Vorbereitung — bitte wenden Sie sich vorerst an unser Personal.",
    voucherValue: "Gutschein im Wert von",
    contactTitle: "Planen wir es gemeinsam",
    contactText:
      "Schreiben Sie uns, was Sie vorhaben, und wir melden uns mit einem Vorschlag.",
  },

  locationPage: {
    eyebrow: "Lage",
    title: "So finden Sie uns",
    intro:
      "Wir liegen im historischen Zentrum von České Budějovice, direkt am Piaristické náměstí und nur wenige Schritte vom Fluss Malše entfernt.",
    highlightsTitle: "In der Umgebung",
    travelTitle: "Anreise",
    travelSubtitle: "Wählen Sie, wie Sie reisen.",
    tipsTitle: "Ausflugstipps",
    tipsSubtitle: "Was sich in der Umgebung lohnt.",
    addressTitle: "Adresse",
    gpsTitle: "GPS-Koordinaten",
    scheduleWarning:
      "Fahrpläne und Linien ändern sich — bitte prüfen Sie aktuelle Verbindungen beim Verkehrsbetrieb.",
  },

  contactPage: {
    eyebrow: "Kontakt",
    title: "Melden Sie sich bei uns",
    hotelTitle: "Hotel Klika",
    restaurantTitle: "Klika Kitchen & Coffee",
    reception: "Rezeption",
    mobile: "Mobil",
    phone: "Telefon",
    email: "E-Mail",
    whatsApp: "WhatsApp",
    hoursTitle: "Öffnungszeiten",
    checkInTitle: "Check-in und Check-out",
    checkIn: "Check-in",
    checkOut: "Check-out",
    afterHoursNotice:
      "Falls Sie eine Unterkunft außerhalb dieser Zeiten benötigen, kontaktieren Sie bitte die Rezeption unter +420 774 328 555 oder hotel@hotelklika.cz.",
    socialTitle: "Folgen Sie uns",
    billingTitle: "Rechnungsdaten",
    billingToggle: "Rechnungsdaten anzeigen",
    companyId: "IČ",
    vatId: "DIČ",
    addressTitle: "Adresse",
  },

  privacy: {
    eyebrow: "Rechtliches",
    title: "Datenschutz",
    intro:
      "Diese Seite ist für die endgültige Fassung der Datenschutzerklärung vorbereitet.",
    placeholderTitle: "Text in Vorbereitung",
    placeholderText:
      "Die verbindliche Datenschutzerklärung stellt der Betreiber bereit. Bis dahin beantworten wir Ihre Fragen zum Datenschutz gerne unter hotel@hotelklika.cz.",
    contactTitle: "Fragen zu Ihren personenbezogenen Daten?",
    operatorsTitle: "Betreiber",
  },

  footer: {
    statement:
      "Familienhotel und Restaurant im historischen Zentrum von České Budějovice. Seit 2002.",
    navigationTitle: "Navigation",
    hotelTitle: "Hotel",
    restaurantTitle: "Restaurant",
    hoursTitle: "Öffnungszeiten",
    addressTitle: "Adresse",
    billingToggle: "Rechnungsdaten",
    privacy: "Datenschutz",
    rights: "Alle Rechte vorbehalten.",
    backToTop: "Nach oben",
  },

  notFound: {
    code: "404",
    title: "Hier geht es nicht weiter",
    text: "Die gesuchte Seite gibt es nicht. Vielleicht ist sie umgezogen — oder Sie haben sich auf dem Weg in den Garten verlaufen.",
    handwritten: "Zurück zu Klika",
    home: "Zurück zur Startseite",
    suggestions: "Wohin als Nächstes",
  },

  error: {
    title: "Etwas ist schiefgelaufen",
    text: "Die Seite konnte nicht geladen werden. Bitte versuchen Sie es erneut.",
    retry: "Erneut versuchen",
  },

  demo: {
    label: "Beispieldaten",
    imagePlaceholder: "Platzhalterbild",
  },
};
