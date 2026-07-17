/**
 * Czech UI dictionary — the source of truth for the site's interface strings.
 *
 * The object is intentionally declared without `as const` so every value widens
 * to `string` / `string[]`. `Dictionary` is derived from it, which means the
 * English and German dictionaries are checked against this exact key structure.
 *
 * Editorial domain data (rooms, menu, pricing, contact...) lives in the content
 * modules next to this folder, not here.
 */
export const cs = {
  siteName: "Hotel Klika",
  restaurantName: "Klika Kitchen & Coffee",
  tagline: "Hotel a restaurace v srdci Českých Budějovic",

  a11y: {
    skipToContent: "Přejít k obsahu",
    mainNavigation: "Hlavní navigace",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    languageSwitcher: "Volba jazyka",
    chooseLanguage: "Zvolit jazyk",
    currentLanguage: "Aktuální jazyk",
    breadcrumb: "Drobečková navigace",
    home: "Úvod",
    previous: "Předchozí",
    next: "Další",
    close: "Zavřít",
    loading: "Načítání",
    slideOf: "Položka {current} z {total}",
    imageOf: "Obrázek {current} z {total}",
    pauseSlider: "Pozastavit automatické přepínání",
    playSlider: "Spustit automatické přepínání",
    goToSlide: "Přejít na položku {index}",
    scrollDown: "Posunout dolů",
    placeholderImage: "Zástupný obrázek — finální fotografie bude doplněna",
    openInNewTab: "Otevře se v novém okně",
    required: "povinné",
  },

  actions: {
    bookStay: "Rezervovat pobyt",
    bookTable: "Rezervovat stůl",
    explore: "Prozkoumat Kliku",
    viewAll: "Zobrazit vše",
    detail: "Detail",
    showMore: "Zobrazit více",
    showLess: "Zobrazit méně",
    callReception: "Zavolat na recepci",
    callRestaurant: "Zavolat do restaurace",
    sendEmail: "Napsat e-mail",
    whatsApp: "Kontaktovat přes WhatsApp",
    navigate: "Navigovat",
    openMap: "Otevřít mapu",
    back: "Zpět",
    continue: "Pokračovat",
    submit: "Odeslat",
    fullDailyMenu: "Celé denní menu",
    fullMenu: "Kompletní jídelní lístek",
    drinksMenu: "Nápojový lístek",
    wholeGallery: "Celá galerie",
    hotelDetail: "Více o hotelu",
    restaurantDetail: "Více o restauraci",
    allRooms: "Všechny pokoje",
    pricing: "Ceník",
    location: "Jak se k nám dostanete",
    contactUs: "Kontaktujte nás",
    startOver: "Začít znovu",
    editSelection: "Upravit výběr",
  },

  hero: {
    headline: "Hotel a restaurace v srdci Českých Budějovic",
    subheadline: "Historické centrum, klid u řeky a moderní jihočeská kuchyně.",
    handwritten: "Nakoukněte k nám",
    features: [
      "3 minuty od náměstí",
      "Soukromé parkování",
      "Snídaně v ceně",
      "Restaurace u řeky",
    ],
    videoFallback:
      "Video se nepodařilo načíst. Zobrazujeme úvodní fotografii.",
  },

  bookingBar: {
    title: "Rezervace pobytu",
    arrival: "Příjezd",
    departure: "Odjezd",
    guests: "Počet hostů",
    guest: "host",
    guestsFew: "hosté",
    guestsMany: "hostů",
    submit: "Pokračovat",
    nights: "nocí",
    night: "noc",
    nightsFew: "noci",
  },

  validation: {
    summaryTitle: "Zkontrolujte prosím zadané údaje",
    required: "Toto pole je povinné",
    arrivalInPast: "Datum příjezdu nemůže být v minulosti",
    departureBeforeArrival: "Datum odjezdu musí být po datu příjezdu",
    invalidDate: "Zadejte platné datum",
    dateInPast: "Datum nemůže být v minulosti",
    minGuests: "Zadejte alespoň 1 hosta",
    maxGuests: "Pro větší skupiny nás prosím kontaktujte přímo",
    invalidEmail: "Zadejte platnou e-mailovou adresu",
    invalidPhone: "Zadejte platné telefonní číslo",
    selectRoom: "Vyberte prosím kategorii pokoje",
    selectTime: "Vyberte prosím čas",
  },

  dailyMenu: {
    eyebrow: "Dnešní doporučení",
    title: "Denní menu",
    subtitle: "Vaříme každý den čerstvě, podle toho, co má právě sezónu.",
    servedFrom: "Podáváme v pracovní dny od 11:00 do 14:00",
    categories: {
      soup: "Polévky",
      main: "Hlavní jídla",
      dessert: "Dezerty",
    },
    allergensLabel: "Alergeny",
    allergenLegend: "Legenda alergenů",
    allergenNote:
      "Čísla u jídel označují alergeny podle evropského značení, nikoliv cenu.",
    empty: "Denní menu pro dnešek zatím nebylo zveřejněno.",
    emptyHint: "Zavolejte nám prosím, rádi vám řekneme, co dnes vaříme.",
    demoNotice:
      "Ukázková data — denní menu bude napojeno na administraci.",
    dietary: {
      vegetarian: "Vegetariánské",
      vegan: "Veganské",
      "gluten-free": "Bez lepku",
    },
  },

  split: {
    eyebrow: "Dva světy, jedna adresa",
    hotelTitle: "Hotel Klika",
    hotelText:
      "Rodinný hotel v historickém centru. Klid u Malše, soukromé parkování a snídaně, po které se nikam nespěchá.",
    hotelNote: "Útulné spaní",
    restaurantTitle: "Klika Kitchen & Coffee",
    restaurantText:
      "Moderní jihočeská kuchyně od mladší generace Kliků. Vaříme podle sezóny, ze surovin od lidí, které známe jménem.",
    restaurantNote: "Přímo od místních farmářů",
  },

  numbers: {
    eyebrow: "Hotel v číslech",
    title: "Rodinný hotel v historickém centru, ale mimo ruch hlavních ulic.",
  },

  rooms: {
    eyebrow: "Ubytování",
    title: "Pokoje a apartmány",
    subtitle:
      "Od úsporného jednolůžkového pokoje po apartmán s vlastní saunou a výhledem na Sokolský ostrov.",
    capacity: "Kapacita",
    upToGuests: "až {count} hosté",
    features: "Vybavení",
    from: "od",
    perNight: "za noc",
    priceOnRequest: "Cena na vyžádání",
    seasonalException:
      "Neplatí v době veletrhů a silvestra — cena na vyžádání.",
  },

  zones: {
    eyebrow: "Kde budete sedět",
    title: "Tři místa, tři nálady",
    subtitle:
      "Vyberte si podle počasí i nálady. Zóny lze rezervovat, ale nezaručujeme konkrétní stůl.",
    seats: "míst",
    seatsLabel: "Kapacita",
    seasonal: "Sezónní provoz",
  },

  producers: {
    eyebrow: "Suroviny",
    title: "Vaříme podle sezóny a spolupracujeme s jihočeskými farmáři a malými dodavateli.",
    note: "Přímo od místních farmářů",
  },

  family: {
    eyebrow: "S dětmi",
    title: "Rodiny jsou u nás doma",
    subtitle:
      "Zahrádka s pískovištěm a houpačkou, dětské židličky uvnitř i venku a sezónní jídla pro nejmenší.",
    items: [
      "3 dětské židličky",
      "Přebalovací pult",
      "Pastelky a omalovánky",
      "Venkovní dětský koutek",
      "Pískoviště",
      "Houpačka",
      "Hračky",
      "Posezení pro rodiče na dohled",
      "Sezónní dětská jídla",
    ],
  },

  locationPreview: {
    eyebrow: "Kde nás najdete",
    title: "Historické centrum, přesto v klidu",
    walkingDistance: "Pěší vzdálenosti",
    mapPlaceholderTitle: "Interaktivní mapa",
    mapPlaceholderText:
      "Mapa se načte po kliknutí, aby nezdržovala načtení stránky.",
    loadMap: "Načíst mapu",
    mapAttribution: "Mapová data © Google",
    openInMaps: "Otevřít v mapách",
    gps: "GPS",
    address: "Adresa",
  },

  gallery: {
    eyebrow: "Galerie",
    title: "Nakoukněte k nám",
    subtitle: "Hotel, pokoje, restaurace, jídlo, zahrádka a okolí.",
    categories: {
      all: "Vše",
      hotel: "Hotel",
      rooms: "Pokoje",
      restaurant: "Restaurace",
      food: "Jídlo",
      garden: "Zahrádka",
      surroundings: "Okolí",
    },
    empty: "V této kategorii zatím nejsou žádné fotografie.",
    emptyHint: "Vyberte prosím jinou kategorii.",
    filterLabel: "Filtrovat podle kategorie",
    openImage: "Otevřít obrázek",
    lightboxLabel: "Prohlížeč fotografií",
  },

  finalCta: {
    eyebrow: "Těšíme se na vás",
    hotelTitle: "Zůstaňte na noc",
    hotelText: "Klidný pokoj tři minuty od náměstí, snídaně v ceně.",
    restaurantTitle: "Přijďte na večeři",
    restaurantText: "Sezónní menu, výhled na řeku a zahrádka na slunci.",
  },

  hotelPage: {
    eyebrow: "Hotel Klika",
    title: "Rodinný hotel u Piaristického náměstí",
    intro:
      "Hotel Klika stojí v historickém centru Českých Budějovic, kousek od Sokolského ostrova a soutoku Vltavy a Malše. Jsme v klidné části centra — na náměstí dojdete pěšky za tři minuty, ruch hlavních ulic ale zůstane za rohem.",
    handwritten: "Tady se dobře spí",
    areasTitle: "Kde budete bydlet",
    areasSubtitle:
      "Ubytování je rozdělené do čtyř budov. Recepce je pro všechny společná.",
    servicesTitle: "Služby recepce",
    servicesSubtitle: "Recepce je otevřená denně od 07:00 do 22:00.",
    breakfastTitle: "Snídaně",
    breakfastSubtitle: "Podáváme v restauraci od 07:00 do 10:00, formou bufetu.",
    parkingTitle: "Parkování, kola a motorky",
    childrenTitle: "Děti a domácí mazlíčci",
    offersTitle: "Speciální nabídky",
    offersNote:
      "Přesné podmínky prosím ověřte na recepci — nabídky nelze uplatnit automaticky.",
    pricingTitle: "Ceník",
    pricingTeaser: "Ceny platné od 24. 3. 2026 do 31. 12. 2026, snídaně v ceně.",
    galleryTitle: "Hotel na fotografiích",
    bookingTitle: "Zarezervujte si pobyt",
    bookingText:
      "Vyberte si termín a kategorii pokoje. Dostupnost potvrdí recepce.",
  },

  roomsPage: {
    eyebrow: "Ubytování",
    title: "Pokoje a apartmány",
    intro:
      "Každý pokoj má vlastní koupelnu, televizi, telefon a připojení k internetu. K dispozici je dětská postýlka.",
    allCategories: "Všechny kategorie",
  },

  pricingPage: {
    eyebrow: "Ceník",
    title: "Ceny ubytování",
    validity: "Ceník platný od {from} do {to}",
    perNight: "za noc",
    perDay: "za den",
    perPersonDay: "za osobu a den",
    perPerson: "za osobu",
    perStay: "za pobyt",
    includedTitle: "V ceně pokoje je zahrnuto",
    included: ["Snídaně", "DPH", "Wi-Fi", "Služby recepce"],
    notIncludedTitle: "V ceně není zahrnuto",
    notIncluded: ["Parkování", "Městský poplatek z pobytu"],
    extrasTitle: "Příplatky a poplatky",
    exceptionNote:
      "Ceny označené hvězdičkou neplatí v době veletrhů a silvestra. Tyto termíny oceňujeme individuálně na vyžádání.",
    singleRoomTitle: "K jednolůžkovému pokoji „limited“",
    singleRoomText:
      "Pokoj má vlastní koupelnu, televizi i připojení k internetu, jeho rozměry jsou ale minimální. Hodí se hlavně na kratší pobyt nebo jednu noc.",
    touristFeeNote: "Městský poplatek z pobytu pro rok 2026.",
    askReception: "Cenu na míru rádi potvrdíme na recepci.",
  },

  hotelBooking: {
    eyebrow: "Rezervace pobytu",
    title: "Vyberte si pobyt",
    steps: {
      dates: "Termín a hosté",
      room: "Výběr pokoje",
      "room-detail": "Detail pokoje",
      guest: "Vaše údaje",
      summary: "Shrnutí",
      contact: "Kontakt na recepci",
    },
    stepOf: "Krok {current} z {total}",
    progressLabel: "Průběh rezervace",
    datesTitle: "Kdy k nám přijedete?",
    roomTitle: "Která kategorie vám sedí?",
    roomDetailTitle: "Vybraný pokoj",
    guestTitle: "Kam vám můžeme napsat?",
    summaryTitle: "Shrnutí vašeho výběru",
    contactTitle: "Poslední krok: ozvěte se recepci",
    firstName: "Jméno",
    lastName: "Příjmení",
    email: "E-mail",
    phone: "Telefon",
    note: "Poznámka",
    notePlaceholder: "Např. pozdější příjezd, dětská postýlka, pes…",
    selectedRoom: "Vybraný pokoj",
    stay: "Termín",
    guestCount: "Počet hostů",
    estimateTitle: "Orientační cena",
    estimateNote:
      "Orientační součet za ubytování. Nezahrnuje parkování ani městský poplatek. Konečnou cenu potvrdí recepce.",
    notConfirmed: "Toto je předběžný výběr pobytu. Dostupnost pokoje musí potvrdit recepce.",
    contactText:
      "Zkopírujte si prosím shrnutí nebo se rovnou ozvěte — recepce vám termín ověří a rezervaci dokončí.",
    copySummary: "Zkopírovat shrnutí",
    copied: "Zkopírováno",
    storageUnavailable:
      "Prohlížeč neumožňuje uložit rozpracovanou rezervaci. Vyplněné údaje se po zavření stránky ztratí.",
    noRoomSelected: "Zatím nemáte vybraný pokoj.",
  },

  restaurantPage: {
    eyebrow: "Klika Kitchen & Coffee",
    title: "Moderní jihočeská kuchyně u řeky",
    intro:
      "Restauraci vede od konce roku 2016 mladší generace Kliků. Vaříme ze sezónních surovin od malých jihočeských farmářů a dodavatelů. V interiéru najdete i část původní městské hradby ze 14. století.",
    handwritten: "Dnešní doporučení",
    reopened: "Po velké rekonstrukci interiéru jsme otevřeli 14. února 2025.",
    jimeJih: "Zakládající člen sdružení Jíme Jih",
    principlesTitle: "Jak vaříme",
    principles: [
      "Sezónní suroviny od místních farmářů",
      "Žádný palmový olej",
      "Žádné umělé zvýrazňovače chuti",
      "Žádné polotovary",
      "Stálý lístek měníme přibližně jednou za měsíc",
      "Šetrné obaly a třídění odpadu",
    ],
    menuTeaser: "Stálý lístek",
    menuTeaserText:
      "Lístek měníme zhruba každý měsíc podle toho, co je právě čerstvé.",
    drinksTitle: "Nápoje",
    drinksSubtitle:
      "Budvar, nepasterizovaná ležáky z malých pivovarů, domácí limonády a káva.",
    drinksNote: "Kompletní nápojový lístek najdete u nás na stole.",
    drinksPending: "Nápojový lístek připravujeme.",
    instagramText: "Co se u nás právě děje, najdete na Instagramu.",
    followInstagram: "Sledovat @klikakitchen",
    bookingTitle: "Rezervace stolu",
    bookingText: "Napište nám termín a my se vám ozveme zpět.",
  },

  menuPage: {
    eyebrow: "Jídelní lístek",
    title: "Stálé menu",
    intro:
      "Lístek měníme přibližně jednou za měsíc podle sezóny. Ceny jsou uvedené v korunách včetně DPH.",
    categories: {
      soups: "Polévky",
      "small-dishes": "Malá jídla",
      "main-courses": "Hlavní chody",
      "side-dishes": "Přílohy",
      children: "Dětem",
      desserts: "Dezerty",
    },
    jumpTo: "Přejít na kategorii",
    glutenFreeOption: "Lze připravit bez lepku",
  },

  dailyMenuPage: {
    eyebrow: "Denní menu",
    title: "Co dnes vaříme",
    intro:
      "Denní menu se mění každý den. Aktuální nabídku najdete níže.",
  },

  restaurantBooking: {
    eyebrow: "Rezervace stolu",
    title: "Rezervujte si stůl",
    intro:
      "Vyplňte prosím formulář. Rezervaci potvrdíme telefonicky nebo e-mailem.",
    date: "Datum",
    time: "Čas",
    guests: "Počet hostů",
    zone: "Preferovaná zóna",
    name: "Jméno a příjmení",
    phone: "Telefon",
    email: "E-mail",
    note: "Poznámka",
    notePlaceholder: "Např. dětská židlička, oslava, alergie…",
    zones: {
      any: "Jakákoliv zóna",
      restaurant: "Restaurace",
      conservatory: "Skleník",
      garden: "Zahrádka",
    },
    zoneHint: "Zónu se snažíme vyhovět, ale nemůžeme ji zaručit.",
    submit: "Odeslat poptávku",
    summaryTitle: "Shrnutí poptávky",
    notConfirmed:
      "Vaše poptávka ještě nebyla potvrzena. Pro dokončení rezervace kontaktujte restauraci.",
    contactText: "Ozvěte se nám prosím, ať vám stůl podržíme.",
    newRequest: "Nová poptávka",
    openingNote: "Otevřeno denně 10:30–22:00.",
  },

  catering: {
    eyebrow: "Akce a catering",
    title: "Oslavy, svatby a firemní akce",
    intro:
      "Postaráme se o rodinné oslavy, svatby, soukromé i firemní akce. Menu i rozpočet plánujeme vždy individuálně.",
    capacityTitle: "Kapacita",
    capacityText: "Akce pořádáme přibližně do 50 osob.",
    offerTitle: "Co nabízíme",
    offer: [
      "Rodinné oslavy",
      "Svatby",
      "Soukromé akce",
      "Firemní večírky",
      "Rauty",
      "Menší catering mimo restauraci",
      "Individuální plánování podle akce a rozpočtu",
    ],
    vouchersTitle: "Dárkové poukazy",
    vouchersText:
      "Tištěné poukazy si můžete vyzvednout přímo v restauraci.",
    vouchersNote:
      "Elektronické poukazy připravujeme — zatím je prosím řešte s obsluhou.",
    voucherValue: "Poukaz v hodnotě",
    contactTitle: "Pojďme to naplánovat",
    contactText:
      "Napište nám, co máte v plánu, a my se ozveme s návrhem.",
  },

  locationPage: {
    eyebrow: "Lokalita",
    title: "Jak se k nám dostanete",
    intro:
      "Jsme v historickém centru Českých Budějovic, přímo u Piaristického náměstí a kousek od řeky Malše.",
    highlightsTitle: "V okolí",
    travelTitle: "Doprava",
    travelSubtitle: "Vyberte si, jak cestujete.",
    tipsTitle: "Tipy na výlet",
    tipsSubtitle: "Co stojí za to vidět v okolí.",
    addressTitle: "Adresa",
    gpsTitle: "GPS souřadnice",
    scheduleWarning:
      "Jízdní řády a linky se mění — aktuální spojení si prosím ověřte u dopravce.",
  },

  contactPage: {
    eyebrow: "Kontakt",
    title: "Ozvěte se nám",
    hotelTitle: "Hotel Klika",
    restaurantTitle: "Klika Kitchen & Coffee",
    reception: "Recepce",
    mobile: "Mobil",
    phone: "Telefon",
    email: "E-mail",
    whatsApp: "WhatsApp",
    hoursTitle: "Otevírací doba",
    checkInTitle: "Check-in a check-out",
    checkIn: "Check-in",
    checkOut: "Check-out",
    afterHoursNotice:
      "V případě potřeby ubytování mimo tuto dobu kontaktujte prosím recepci na +420 774 328 555 nebo hotel@hotelklika.cz.",
    socialTitle: "Sledujte nás",
    billingTitle: "Fakturační údaje",
    billingToggle: "Zobrazit fakturační údaje",
    companyId: "IČ",
    vatId: "DIČ",
    addressTitle: "Adresa",
  },

  privacy: {
    eyebrow: "Právní informace",
    title: "Ochrana osobních údajů",
    intro:
      "Tato stránka je připravena pro finální znění zásad ochrany osobních údajů.",
    placeholderTitle: "Text připravujeme",
    placeholderText:
      "Závazné znění zásad ochrany osobních údajů dodá provozovatel. Do té doby vám rádi zodpovíme jakýkoliv dotaz k osobním údajům na e-mailu hotel@hotelklika.cz.",
    contactTitle: "Máte dotaz k osobním údajům?",
    operatorsTitle: "Provozovatelé",
  },

  footer: {
    statement:
      "Rodinný hotel a restaurace v historickém centru Českých Budějovic. Od roku 2002.",
    navigationTitle: "Navigace",
    hotelTitle: "Hotel",
    restaurantTitle: "Restaurace",
    hoursTitle: "Otevírací doba",
    addressTitle: "Adresa",
    billingToggle: "Fakturační údaje",
    privacy: "Ochrana osobních údajů",
    rights: "Všechna práva vyhrazena.",
    backToTop: "Nahoru",
  },

  notFound: {
    code: "404",
    title: "Tudy cesta nevede",
    text: "Stránka, kterou hledáte, tu není. Možná se přestěhovala — nebo jste zabloudili cestou na zahrádku.",
    handwritten: "Zpátky na Kliku",
    home: "Zpět na úvod",
    suggestions: "Kam dál",
  },

  error: {
    title: "Něco se pokazilo",
    text: "Stránku se nepodařilo načíst. Zkuste to prosím znovu.",
    retry: "Zkusit znovu",
  },

  demo: {
    label: "Ukázková data",
    imagePlaceholder: "Zástupný obrázek",
  },
};

/** Structural contract every other language dictionary must satisfy. */
export type Dictionary = typeof cs;
