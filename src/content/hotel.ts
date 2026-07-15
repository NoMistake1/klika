import type {
  AccommodationArea,
  HotelService,
  HotelStat,
  PricingPeriod,
  PricingRow,
  Room,
  SpecialOffer,
} from "@/types";

/* ==========================================================================
   Hotel Klika content.
   Every number here comes from the supplied source material. Nothing is
   inferred: where the source is silent (a capacity, a price unit) the value is
   null and the UI renders nothing rather than a guess.
   See README.md -> "Content verification required".
   ========================================================================== */

export const hotelStats: readonly HotelStat[] = [
  {
    id: "beds",
    value: "85",
    label: { cs: "lůžek", en: "beds", de: "Betten" },
  },
  {
    id: "rooms",
    value: "26",
    label: { cs: "pokojů", en: "rooms", de: "Zimmer" },
  },
  {
    id: "apartments",
    value: "9",
    label: { cs: "apartmánů", en: "apartments", de: "Apartments" },
  },
  {
    id: "walk",
    value: "3",
    label: {
      cs: "minuty od náměstí",
      en: "minutes from the square",
      de: "Minuten vom Hauptplatz",
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Rooms                                                                      */
/* -------------------------------------------------------------------------- */

export const rooms: readonly Room[] = [
  {
    id: "single-limited",
    name: {
      cs: "Jednolůžkový pokoj limited",
      en: "Limited single room",
      de: "Einzelzimmer limited",
    },
    description: {
      cs: "Kompaktní pokoj s vlastní koupelnou. Rozměry jsou minimální — hodí se hlavně na jednu noc nebo kratší pobyt.",
      en: "A compact room with its own bathroom. Its dimensions are minimal — best suited to one night or a short stay.",
      de: "Ein kompaktes Zimmer mit eigenem Bad. Die Abmessungen sind minimal — ideal für eine Nacht oder einen kurzen Aufenthalt.",
    },
    capacity: 1,
    features: {
      cs: ["Vlastní koupelna", "Televize", "Připojení k internetu", "Telefon"],
      en: ["Private bathroom", "Television", "Internet connection", "Phone"],
      de: ["Eigenes Bad", "Fernseher", "Internetanschluss", "Telefon"],
    },
    priceCzk: null,
    hasSeasonalException: false,
    image: {
      src: "/images/rooms/single-limited.png",
      alt: {
        cs: "Zástupný obrázek jednolůžkového pokoje limited",
        en: "Placeholder image of the limited single room",
        de: "Platzhalterbild des Einzelzimmers limited",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
  {
    id: "double",
    name: {
      cs: "Dvoulůžkový pokoj",
      en: "Double room",
      de: "Doppelzimmer",
    },
    description: {
      cs: "Nekuřácký pokoj v hlavní budově s výhledem do ulice nebo na Solnici. K dispozici je výtah.",
      en: "A non-smoking room in the main building with a street or Solnice-side view. An elevator is available.",
      de: "Ein Nichtraucherzimmer im Hauptgebäude mit Blick auf die Straße oder die Solnice. Ein Aufzug ist vorhanden.",
    },
    capacity: 2,
    features: {
      cs: ["Vlastní koupelna", "Televize", "Wi-Fi", "Výtah v budově", "Nekuřácký"],
      en: ["Private bathroom", "Television", "Wi-Fi", "Elevator in the building", "Non-smoking"],
      de: ["Eigenes Bad", "Fernseher", "WLAN", "Aufzug im Gebäude", "Nichtraucher"],
    },
    priceCzk: 2200,
    hasSeasonalException: true,
    image: {
      src: "/images/rooms/double.png",
      alt: {
        cs: "Zástupný obrázek dvoulůžkového pokoje",
        en: "Placeholder image of the double room",
        de: "Platzhalterbild des Doppelzimmers",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
  {
    id: "triple",
    name: {
      cs: "Třílůžkový pokoj",
      en: "Triple room",
      de: "Dreibettzimmer",
    },
    description: {
      cs: "Prostornější nekuřácký pokoj pro tři hosty. Na vyžádání přidáme dětskou postýlku.",
      en: "A roomier non-smoking room for three guests. A baby cot can be added on request.",
      de: "Ein geräumigeres Nichtraucherzimmer für drei Gäste. Auf Wunsch stellen wir ein Kinderbett dazu.",
    },
    capacity: 3,
    features: {
      cs: ["Vlastní koupelna", "Televize", "Wi-Fi", "Dětská postýlka na vyžádání", "Nekuřácký"],
      en: ["Private bathroom", "Television", "Wi-Fi", "Baby cot on request", "Non-smoking"],
      de: ["Eigenes Bad", "Fernseher", "WLAN", "Kinderbett auf Anfrage", "Nichtraucher"],
    },
    priceCzk: 3100,
    hasSeasonalException: true,
    image: {
      src: "/images/rooms/triple.png",
      alt: {
        cs: "Zástupný obrázek třílůžkového pokoje",
        en: "Placeholder image of the triple room",
        de: "Platzhalterbild des Dreibettzimmers",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
  {
    id: "apartment-sauna",
    name: {
      cs: "Dvoulůžkový apartmán se saunou",
      en: "Double apartment with sauna",
      de: "Doppelapartment mit Sauna",
    },
    description: {
      cs: "Apartmán s vlastní saunou a výhledem na Sokolský ostrov a Malši. Nejklidnější místo v hotelu.",
      en: "An apartment with its own sauna and a view of Sokolský ostrov and the Malše. The quietest spot in the hotel.",
      de: "Ein Apartment mit eigener Sauna und Blick auf die Insel Sokolský ostrov und die Malše. Der ruhigste Ort im Hotel.",
    },
    capacity: 2,
    features: {
      cs: [
        "Vlastní sauna",
        "Výhled na Sokolský ostrov a Malši",
        "Vlastní koupelna",
        "Televize",
        "Wi-Fi",
      ],
      en: [
        "Private sauna",
        "View of Sokolský ostrov and the Malše",
        "Private bathroom",
        "Television",
        "Wi-Fi",
      ],
      de: [
        "Eigene Sauna",
        "Blick auf Sokolský ostrov und die Malše",
        "Eigenes Bad",
        "Fernseher",
        "WLAN",
      ],
    },
    priceCzk: 3600,
    hasSeasonalException: true,
    image: {
      src: "/images/rooms/apartment-sauna.png",
      alt: {
        cs: "Zástupný obrázek dvoulůžkového apartmánu se saunou",
        en: "Placeholder image of the double apartment with sauna",
        de: "Platzhalterbild des Doppelapartments mit Sauna",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
  {
    id: "apartment-four",
    name: {
      cs: "Čtyřlůžkový apartmán",
      en: "Four-person apartment",
      de: "Vierbettapartment",
    },
    description: {
      cs: "Apartmán v historickém domě z konce 19. století s výhledem na řeku nebo Piaristické náměstí.",
      en: "An apartment in a late 19th-century historical building with a view of the river or Piaristické náměstí.",
      de: "Ein Apartment in einem historischen Haus vom Ende des 19. Jahrhunderts mit Blick auf den Fluss oder das Piaristické náměstí.",
    },
    capacity: 4,
    features: {
      cs: [
        "Výhled na řeku nebo Piaristické náměstí",
        "Historický dům",
        "Vlastní koupelna",
        "Televize",
        "Wi-Fi",
      ],
      en: [
        "River or Piaristické náměstí view",
        "Historical building",
        "Private bathroom",
        "Television",
        "Wi-Fi",
      ],
      de: [
        "Blick auf den Fluss oder das Piaristické náměstí",
        "Historisches Haus",
        "Eigenes Bad",
        "Fernseher",
        "WLAN",
      ],
    },
    priceCzk: 4500,
    hasSeasonalException: true,
    image: {
      src: "/images/rooms/apartment-four.png",
      alt: {
        cs: "Zástupný obrázek čtyřlůžkového apartmánu",
        en: "Placeholder image of the four-person apartment",
        de: "Platzhalterbild des Vierbettapartments",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
  {
    id: "apartment-long-stay",
    name: {
      cs: "Apartmány pro delší pobyty",
      en: "Apartments for longer stays",
      de: "Apartments für längere Aufenthalte",
    },
    description: {
      cs: "Moderní apartmány asi 50 metrů od recepce. Vhodné pro delší pobyty a práci na dálku.",
      en: "Modern apartments about 50 metres from reception. Suitable for longer stays and remote work.",
      de: "Moderne Apartments etwa 50 Meter von der Rezeption entfernt. Geeignet für längere Aufenthalte und Remote-Arbeit.",
    },
    // The source does not state a bed count for this category.
    capacity: null,
    features: {
      cs: ["50 metrů od recepce", "Vhodné pro delší pobyty", "Vlastní koupelna", "Wi-Fi"],
      en: ["50 metres from reception", "Suited to longer stays", "Private bathroom", "Wi-Fi"],
      de: [
        "50 Meter von der Rezeption",
        "Für längere Aufenthalte geeignet",
        "Eigenes Bad",
        "WLAN",
      ],
    },
    // Rate for this category is not published in the supplied price list.
    priceCzk: null,
    hasSeasonalException: false,
    image: {
      src: "/images/rooms/apartment-long-stay.png",
      alt: {
        cs: "Zástupný obrázek apartmánu pro delší pobyty",
        en: "Placeholder image of an apartment for longer stays",
        de: "Platzhalterbild eines Apartments für längere Aufenthalte",
      },
      width: 1600,
      height: 1200,
      isPlaceholder: true,
    },
  },
];

export function getRoomById(id: string): Room | undefined {
  return rooms.find((room) => room.id === id);
}

/* -------------------------------------------------------------------------- */
/* Pricing                                                                    */
/* -------------------------------------------------------------------------- */

export const pricingPeriod: PricingPeriod = {
  validFrom: "2026-03-24",
  validTo: "2026-12-31",
};

export const pricingRows: readonly PricingRow[] = [
  {
    id: "single-limited",
    label: {
      cs: "Jednolůžkový pokoj limited",
      en: "Limited single room",
      de: "Einzelzimmer limited",
    },
    priceCzk: null,
    unit: "night",
    hasSeasonalException: false,
  },
  {
    id: "double-single-use",
    label: {
      cs: "Dvoulůžkový pokoj obsazený jednou osobou",
      en: "Double room occupied by one person",
      de: "Doppelzimmer mit einer Person belegt",
    },
    priceCzk: 1600,
    unit: "night",
    hasSeasonalException: true,
  },
  {
    id: "double",
    label: { cs: "Dvoulůžkový pokoj", en: "Double room", de: "Doppelzimmer" },
    priceCzk: 2200,
    unit: "night",
    hasSeasonalException: true,
  },
  {
    id: "triple",
    label: { cs: "Třílůžkový pokoj", en: "Triple room", de: "Dreibettzimmer" },
    priceCzk: 3100,
    unit: "night",
    hasSeasonalException: true,
  },
  {
    id: "apartment-sauna",
    label: {
      cs: "Dvoulůžkový apartmán se saunou",
      en: "Double apartment with sauna",
      de: "Doppelapartment mit Sauna",
    },
    priceCzk: 3600,
    unit: "night",
    hasSeasonalException: true,
  },
  {
    id: "apartment-four",
    label: {
      cs: "Čtyřlůžkový apartmán",
      en: "Four-person apartment",
      de: "Vierbettapartment",
    },
    priceCzk: 4500,
    unit: "night",
    hasSeasonalException: true,
  },
  {
    id: "extra-person",
    label: {
      cs: "Každá další osoba",
      en: "Each additional person",
      de: "Jede weitere Person",
    },
    priceCzk: 800,
    // The source price list states no unit for this item.
    unit: null,
    hasSeasonalException: false,
  },
  {
    id: "dog",
    label: { cs: "Pes na pokoji", en: "Dog in room", de: "Hund im Zimmer" },
    priceCzk: 500,
    unit: null,
    hasSeasonalException: false,
  },
  {
    id: "parking",
    label: { cs: "Parkování", en: "Parking", de: "Parken" },
    priceCzk: 300,
    unit: null,
    hasSeasonalException: false,
  },
  {
    id: "bicycle-rental",
    label: { cs: "Půjčovné kola", en: "Bicycle rental", de: "Fahrradverleih" },
    note: {
      cs: "Nutná rezervace předem",
      en: "Advance reservation required",
      de: "Vorherige Reservierung erforderlich",
    },
    priceCzk: 590,
    unit: "day",
    hasSeasonalException: false,
  },
  {
    id: "tourist-fee",
    label: {
      cs: "Městský poplatek z pobytu",
      en: "City tourist fee",
      de: "Kurtaxe der Stadt",
    },
    note: { cs: "Pro rok 2026", en: "For 2026", de: "Für das Jahr 2026" },
    priceCzk: 50,
    unit: "person-day",
    hasSeasonalException: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Buildings                                                                  */
/* -------------------------------------------------------------------------- */

export const accommodationAreas: readonly AccommodationArea[] = [
  {
    id: "main-building",
    name: {
      cs: "Hlavní budova z roku 2002",
      en: "Main building from 2002",
      de: "Hauptgebäude von 2002",
    },
    description: {
      cs: "Třípatrová budova s recepcí a výtahem. Najdete tu i apartmán s vlastní saunou.",
      en: "A three-floor building with the reception and an elevator. It also holds the apartment with a private sauna.",
      de: "Ein dreistöckiges Gebäude mit Rezeption und Aufzug. Hier befindet sich auch das Apartment mit eigener Sauna.",
    },
    details: {
      cs: [
        "Dvoulůžkové a třílůžkové nekuřácké pokoje",
        "Výhled do ulice nebo na Solnici",
        "Výtah",
        "Dvoulůžkový apartmán s vlastní saunou",
        "Výhled na Sokolský ostrov a Malši",
      ],
      en: [
        "Double and triple non-smoking rooms",
        "Street or Solnice-side views",
        "Elevator",
        "Double apartment with a private sauna",
        "View of Sokolský ostrov and the Malše",
      ],
      de: [
        "Doppel- und Dreibettzimmer für Nichtraucher",
        "Blick auf die Straße oder die Solnice",
        "Aufzug",
        "Doppelapartment mit eigener Sauna",
        "Blick auf Sokolský ostrov und die Malše",
      ],
    },
  },
  {
    id: "historical-buildings",
    name: {
      cs: "Historické domy z konce 19. století",
      en: "Historical buildings from the late 19th century",
      de: "Historische Häuser vom Ende des 19. Jahrhunderts",
    },
    description: {
      cs: "Původní měšťanské domy hned vedle hlavní budovy, s výhledem na řeku nebo Piaristické náměstí.",
      en: "Original town houses right next to the main building, with river or Piaristické náměstí views.",
      de: "Ursprüngliche Bürgerhäuser direkt neben dem Hauptgebäude, mit Blick auf den Fluss oder das Piaristické náměstí.",
    },
    details: {
      cs: ["6 pokojů", "2 čtyřlůžkové apartmány", "Výhled na řeku nebo Piaristické náměstí"],
      en: ["6 rooms", "2 four-person apartments", "River or Piaristické náměstí views"],
      de: ["6 Zimmer", "2 Vierbettapartments", "Blick auf den Fluss oder das Piaristické náměstí"],
    },
  },
  {
    id: "apartments-nearby",
    name: {
      cs: "Budova 50 metrů od recepce",
      en: "Building 50 metres from reception",
      de: "Gebäude 50 Meter von der Rezeption",
    },
    description: {
      cs: "Moderní apartmány pár kroků od hlavní budovy, vhodné pro delší pobyty.",
      en: "Modern apartments a few steps from the main building, suited to longer stays.",
      de: "Moderne Apartments wenige Schritte vom Hauptgebäude, für längere Aufenthalte geeignet.",
    },
    details: {
      cs: ["5 moderních apartmánů", "Vhodné pro delší pobyty", "Přibližně 50 metrů od recepce"],
      en: ["5 modern apartments", "Suited to longer stays", "About 50 metres from reception"],
      de: [
        "5 moderne Apartments",
        "Für längere Aufenthalte geeignet",
        "Etwa 50 Meter von der Rezeption",
      ],
    },
  },
  {
    id: "apartments-remote",
    name: {
      cs: "Apartmány 200 metrů od hotelu",
      en: "Apartments 200 metres away",
      de: "Apartments 200 Meter entfernt",
    },
    description: {
      cs: "Apartmány u Masných krámů a U Tří sedláků. Hotel je spravuje od roku 2022.",
      en: "Apartments near Masné krámy and U Tří sedláků, managed by the hotel since 2022.",
      de: "Apartments bei den Masné krámy und U Tří sedláků. Das Hotel verwaltet sie seit 2022.",
    },
    details: {
      cs: [
        "3 apartmány",
        "Blízko Masných krámů a U Tří sedláků",
        "Ve správě hotelu od roku 2022",
        "Přibližně 200 metrů od recepce",
      ],
      en: [
        "3 apartments",
        "Near Masné krámy and U Tří sedláků",
        "Managed by the hotel since 2022",
        "About 200 metres from reception",
      ],
      de: [
        "3 Apartments",
        "In der Nähe der Masné krámy und U Tří sedláků",
        "Seit 2022 vom Hotel verwaltet",
        "Etwa 200 Meter von der Rezeption",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Services and facilities                                                    */
/* -------------------------------------------------------------------------- */

export const receptionServices: readonly HotelService[] = [
  {
    id: "taxi",
    label: { cs: "Objednání taxi", en: "Taxi ordering", de: "Taxi-Bestellung" },
    icon: "Car",
  },
  {
    id: "tickets",
    label: {
      cs: "Pomoc se vstupenkami",
      en: "Cultural ticket assistance",
      de: "Hilfe bei Eintrittskarten",
    },
    icon: "Ticket",
  },
  {
    id: "orientation",
    label: {
      cs: "Orientace ve městě a mapa",
      en: "City orientation and map",
      de: "Orientierung in der Stadt und Karte",
    },
    icon: "Map",
  },
  {
    id: "hairdryer",
    label: {
      cs: "Zapůjčení fénu",
      en: "Hair dryer rental",
      de: "Föhn-Verleih",
    },
    icon: "Scissors",
  },
  {
    id: "luggage",
    label: { cs: "Úschova zavazadel", en: "Luggage storage", de: "Gepäckaufbewahrung" },
    icon: "Luggage",
  },
  {
    id: "safe",
    label: { cs: "Trezor", en: "Safe", de: "Safe" },
    icon: "Lock",
  },
  {
    id: "wake-up",
    label: { cs: "Buzení", en: "Wake-up service", de: "Weckdienst" },
    icon: "AlarmClock",
  },
  {
    id: "room-service",
    label: { cs: "Room service", en: "Room service", de: "Zimmerservice" },
    icon: "ConciergeBell",
  },
  {
    id: "printing",
    label: { cs: "Tisk a kopírování", en: "Printing and copying", de: "Drucken und Kopieren" },
    icon: "Printer",
  },
];

export const breakfastFacts = {
  hours: "07:00–10:00",
  items: {
    cs: [
      "Formou bufetu",
      "Nápoje ke snídani neomezeně",
      "Teplá míchaná vajíčka",
      "Párky",
      "Čerstvé pečivo z místní pekárny",
    ],
    en: [
      "Buffet style",
      "Unlimited breakfast drinks",
      "Warm scrambled eggs",
      "Sausages",
      "Fresh rolls from a local bakery",
    ],
    de: [
      "Als Buffet",
      "Frühstücksgetränke unbegrenzt",
      "Warme Rühreier",
      "Würstchen",
      "Frisches Gebäck aus einer lokalen Bäckerei",
    ],
  },
};

export const parkingFacts = {
  cs: [
    "Soukromé hotelové parkoviště",
    "Garáž pro auta, motorky a kola",
    "Kolo si u nás můžete i půjčit — rezervujte předem",
  ],
  en: [
    "Private hotel parking",
    "Garage for cars, motorcycles and bicycles",
    "Bicycles can also be rented — reserve in advance",
  ],
  de: [
    "Privater Hotelparkplatz",
    "Garage für Autos, Motorräder und Fahrräder",
    "Fahrräder können Sie auch mieten — bitte vorab reservieren",
  ],
};

export const childrenAndPetsFacts = {
  cs: [
    "Dětská postýlka na vyžádání",
    "Děti do 3 let zdarma",
    "Domácí mazlíčci za poplatek",
  ],
  en: [
    "Baby cot available on request",
    "Children under 3 stay free",
    "Pets are allowed for a fee",
  ],
  de: [
    "Kinderbett auf Anfrage",
    "Kinder unter 3 Jahren kostenlos",
    "Haustiere gegen Gebühr erlaubt",
  ],
};

export const hotelFacilities = {
  cs: [
    "Wi-Fi v celém hotelu",
    "Vlastní koupelna v každém pokoji",
    "Televize, telefon a připojení k internetu",
    "Výtah v hlavní budově",
    "Soukromé parkování a garáž",
  ],
  en: [
    "Wi-Fi throughout the hotel",
    "A private bathroom in every room",
    "Television, phone and internet connection",
    "Elevator in the main building",
    "Private parking and a garage",
  ],
  de: [
    "WLAN im gesamten Hotel",
    "Eigenes Bad in jedem Zimmer",
    "Fernseher, Telefon und Internetanschluss",
    "Aufzug im Hauptgebäude",
    "Privatparkplatz und Garage",
  ],
};

/* -------------------------------------------------------------------------- */
/* Special offers                                                             */
/* -------------------------------------------------------------------------- */

export const specialOffers: readonly SpecialOffer[] = [
  {
    id: "cash-discount",
    title: {
      cs: "5 % při platbě hotově",
      en: "5% for cash payment",
      de: "5 % bei Barzahlung",
    },
    description: {
      cs: "Sleva 5 % při platbě hotově po příjezdu.",
      en: "A 5% discount when paying in cash on arrival.",
      de: "5 % Rabatt bei Barzahlung nach der Ankunft.",
    },
    conditions: {
      cs: "Pouze s příslušným tištěným kuponem.",
      en: "Only with the relevant printed coupon.",
      de: "Nur mit dem entsprechenden gedruckten Coupon.",
    },
  },
  {
    id: "direct-booking",
    title: {
      cs: "10 % při přímé rezervaci na 3 a více nocí",
      en: "10% for direct bookings of 3+ nights",
      de: "10 % bei Direktbuchung ab 3 Nächten",
    },
    description: {
      cs: "Sleva 10 % při přímé rezervaci pobytu na tři a více nocí.",
      en: "A 10% discount for direct bookings of three or more nights.",
      de: "10 % Rabatt bei Direktbuchung von drei oder mehr Nächten.",
    },
    conditions: {
      cs: "Pouze s příslušným kuponem.",
      en: "Only with the relevant coupon.",
      de: "Nur mit dem entsprechenden Coupon.",
    },
  },
];
