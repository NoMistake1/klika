import type { LocalizedText, TravelOption, TripTip } from "@/types";

/* ==========================================================================
   Location content.
   Route numbers and stop names come from the supplied material. No timetable,
   departure time or fare is stated anywhere — those change and are not
   verifiable, so the UI points guests at the carrier instead.
   ========================================================================== */

export interface LocationHighlight {
  readonly id: string;
  readonly text: LocalizedText;
}

export const locationHighlights: readonly LocationHighlight[] = [
  {
    id: "centre",
    text: {
      cs: "Historické centrum města",
      en: "The historic city centre",
      de: "Historisches Stadtzentrum",
    },
  },
  {
    id: "piaristicke",
    text: {
      cs: "Přímo vedle Piaristického náměstí",
      en: "Directly next to Piaristické náměstí",
      de: "Direkt neben dem Piaristické náměstí",
    },
  },
  {
    id: "church",
    text: {
      cs: "Kousek od klášterního kostela Obětování Panny Marie",
      en: "A short walk from the Monastery Church of the Presentation of the Virgin Mary",
      de: "Unweit der Klosterkirche Mariä Opferung",
    },
  },
  {
    id: "solnice",
    text: { cs: "V sousedství Solnice", en: "Next to the Solnice", de: "In der Nachbarschaft der Solnice" },
  },
  {
    id: "sokolsky",
    text: {
      cs: "Blízko Sokolského ostrova",
      en: "Close to Sokolský ostrov",
      de: "In der Nähe der Insel Sokolský ostrov",
    },
  },
  {
    id: "confluence",
    text: {
      cs: "U soutoku Malše a Vltavy",
      en: "By the confluence of the Malše and the Vltava",
      de: "Am Zusammenfluss von Malše und Vltava",
    },
  },
  {
    id: "leisure",
    text: {
      cs: "V okolí plavecký bazén, parky, cyklostezky, sportoviště a řeka",
      en: "A swimming pool, parks, cycling paths, sports areas and the river nearby",
      de: "In der Umgebung Schwimmbad, Parks, Radwege, Sportanlagen und der Fluss",
    },
  },
];

/** Walking times published by the hotel. */
export const walkingDistances: readonly LocationHighlight[] = [
  {
    id: "square",
    text: {
      cs: "3 minuty pěšky na náměstí Přemysla Otakara II.",
      en: "3 minutes on foot to Přemysl Otakar II Square",
      de: "3 Minuten zu Fuß zum Platz Přemysl Otakar II.",
    },
  },
  {
    id: "station",
    text: {
      cs: "20 minut pěšky na vlakové a autobusové nádraží",
      en: "20 minutes on foot to the train and bus station",
      de: "20 Minuten zu Fuß zum Bahnhof und Busbahnhof",
    },
  },
  {
    id: "stop",
    text: {
      cs: "5 minut pěšky na nejbližší zastávku MHD",
      en: "5 minutes on foot to the nearest public transport stop",
      de: "5 Minuten zu Fuß zur nächsten Haltestelle",
    },
  },
];

export const travelOptions: readonly TravelOption[] = [
  {
    id: "car",
    label: { cs: "Auto", en: "Car", de: "Auto" },
    icon: "Car",
    summary: {
      cs: "České Budějovice leží na trase E55 mezi Prahou a Lincem. Zaparkujete přímo u hotelu.",
      en: "České Budějovice lies on route E55 between Prague and Linz. You can park directly at the hotel.",
      de: "České Budějovice liegt an der Route E55 zwischen Prag und Linz. Sie parken direkt am Hotel.",
    },
    details: {
      cs: [
        "Sjeďte k centru města, příjezd je možný z Husovy ulice",
        "Odbočte u Dlouhého mostu — hotel je značený jako Hotel Klika",
        "K dispozici je soukromé parkoviště",
        "Průjezd Hroznovou nebo Radniční ulicí je časově omezený a jen pro vozidla do 3,5 tuny",
      ],
      en: [
        "Head for the city centre; access is possible from Husova street",
        "Turn near Dlouhý most — the hotel is signposted as Hotel Klika",
        "Private parking is available",
        "Alternate access via Hroznová or Radniční street is time-restricted and for vehicles up to 3.5 tonnes",
      ],
      de: [
        "Fahren Sie Richtung Stadtzentrum; die Zufahrt ist von der Husova-Straße möglich",
        "Biegen Sie bei der Dlouhý most ab — das Hotel ist als Hotel Klika ausgeschildert",
        "Ein privater Parkplatz steht zur Verfügung",
        "Die Zufahrt über die Straßen Hroznová oder Radniční ist zeitlich beschränkt und nur für Fahrzeuge bis 3,5 Tonnen",
      ],
    },
  },
  {
    id: "motorcycle",
    label: { cs: "Motorka", en: "Motorcycle", de: "Motorrad" },
    icon: "Car",
    summary: {
      cs: "Stejná trasa jako autem. Motorku zaparkujete v uzamčené garáži.",
      en: "The same route as by car. Your motorcycle goes into a locked garage.",
      de: "Dieselbe Route wie mit dem Auto. Ihr Motorrad stellen Sie in der abschließbaren Garage ab.",
    },
    details: {
      cs: [
        "Trasa E55 mezi Prahou a Lincem",
        "Příjezd z Husovy ulice, odbočka u Dlouhého mostu",
        "Garáž pro motorky přímo u hotelu",
      ],
      en: [
        "Route E55 between Prague and Linz",
        "Access from Husova street, turning near Dlouhý most",
        "Motorcycle garage right at the hotel",
      ],
      de: [
        "Route E55 zwischen Prag und Linz",
        "Zufahrt von der Husova-Straße, Abzweigung bei der Dlouhý most",
        "Motorradgarage direkt am Hotel",
      ],
    },
  },
  {
    id: "bicycle",
    label: { cs: "Jízdní kolo", en: "Bicycle", de: "Fahrrad" },
    icon: "Bike",
    summary: {
      cs: "Jsme na mezinárodní cyklotrase 12 a městské cyklotrase A, přímo u Zátkova nábřeží.",
      en: "We sit on international cycle route 12 and city cycle route A, right by Zátkovo nábřeží.",
      de: "Wir liegen an der internationalen Radroute 12 und der städtischen Radroute A, direkt am Zátkovo nábřeží.",
    },
    details: {
      cs: [
        "Mezinárodní cyklotrasa 12",
        "Městská cyklotrasa A",
        "Podél Zátkova nábřeží a Sokolského ostrova",
        "Uzamčená garáž pro kola",
        "Základní nářadí bývá k dispozici",
      ],
      en: [
        "International cycle route 12",
        "City cycle route A",
        "Along Zátkovo nábřeží and Sokolský ostrov",
        "Secure bicycle garage",
        "Basic tools are usually available",
      ],
      de: [
        "Internationale Radroute 12",
        "Städtische Radroute A",
        "Entlang des Zátkovo nábřeží und der Insel Sokolský ostrov",
        "Abschließbare Fahrradgarage",
        "Grundwerkzeug ist in der Regel vorhanden",
      ],
    },
  },
  {
    id: "train",
    label: { cs: "Vlak", en: "Train", de: "Zug" },
    icon: "Train",
    summary: {
      cs: "Z hlavního nádraží k nám dojdete pěšky asi za 20 minut.",
      en: "From the main station it is about a 20-minute walk.",
      de: "Vom Hauptbahnhof sind es etwa 20 Minuten zu Fuß.",
    },
    details: {
      cs: [
        "Hlavní nádraží je přibližně 20 minut pěšky",
        "Cesta vede přes Lannovu třídu, náměstí a Piaristické náměstí",
        "Případně využijte MHD nebo taxi",
      ],
      en: [
        "The main station is approximately 20 minutes on foot",
        "The route runs via Lannova třída, the main square and Piaristické náměstí",
        "Public transport or a taxi is an alternative",
      ],
      de: [
        "Der Hauptbahnhof ist etwa 20 Minuten zu Fuß entfernt",
        "Der Weg führt über die Lannova třída, den Hauptplatz und das Piaristické náměstí",
        "Alternativ nutzen Sie den Nahverkehr oder ein Taxi",
      ],
    },
  },
  {
    id: "bus",
    label: { cs: "Autobus", en: "Bus", de: "Bus" },
    icon: "Bus",
    summary: {
      cs: "Autobusové nádraží je nad Mercury Centrem, asi 20 minut pěšky.",
      en: "The bus station is above Mercury Center, about 20 minutes on foot.",
      de: "Der Busbahnhof liegt über dem Mercury Center, etwa 20 Minuten zu Fuß.",
    },
    details: {
      cs: [
        "Autobusové nádraží nad Mercury Centrem",
        "Přibližně 20 minut pěšky",
        "Možné je i MHD nebo taxi",
      ],
      en: [
        "Bus station above Mercury Center",
        "Approximately 20 minutes on foot",
        "Public transport or a taxi also works",
      ],
      de: [
        "Busbahnhof über dem Mercury Center",
        "Etwa 20 Minuten zu Fuß",
        "Auch Nahverkehr oder Taxi sind möglich",
      ],
    },
  },
  {
    id: "public-transport",
    label: { cs: "MHD", en: "Public transport", de: "Nahverkehr" },
    icon: "Bus",
    summary: {
      cs: "Nejbližší zastávka U Zelené ratolesti je asi 5 minut pěšky.",
      en: "The nearest stop, U Zelené ratolesti, is about 5 minutes on foot.",
      de: "Die nächste Haltestelle U Zelené ratolesti ist etwa 5 Minuten zu Fuß entfernt.",
    },
    details: {
      cs: [
        "Nejbližší zastávka: U Zelené ratolesti",
        "Přibližně 5 minut pěšky",
        "V dodaných podkladech jsou uvedené linky 1, 3, 14 a 21",
        "Aktuální jízdní řády si prosím ověřte u dopravce",
      ],
      en: [
        "Nearest stop: U Zelené ratolesti",
        "Approximately 5 minutes on foot",
        "The supplied material mentions lines 1, 3, 14 and 21",
        "Please verify current timetables with the carrier",
      ],
      de: [
        "Nächste Haltestelle: U Zelené ratolesti",
        "Etwa 5 Minuten zu Fuß",
        "In den Unterlagen werden die Linien 1, 3, 14 und 21 genannt",
        "Bitte prüfen Sie aktuelle Fahrpläne beim Verkehrsbetrieb",
      ],
    },
  },
  {
    id: "taxi",
    label: { cs: "Taxi", en: "Taxi", de: "Taxi" },
    icon: "Car",
    summary: {
      cs: "Taxi vám rádi objednáme na recepci.",
      en: "Reception will gladly order a taxi for you.",
      de: "Die Rezeption bestellt Ihnen gerne ein Taxi.",
    },
    details: {
      cs: [
        "Taxi objednáme na recepci",
        "Z nádraží je jízda krátká — jedeme do centra",
        "Ceny se liší podle dopravce, ověřte si je předem",
      ],
      en: [
        "Reception can order a taxi",
        "The ride from the station is short — we are in the centre",
        "Fares vary by operator, please check them in advance",
      ],
      de: [
        "Die Rezeption bestellt ein Taxi",
        "Die Fahrt vom Bahnhof ist kurz — wir liegen im Zentrum",
        "Die Preise unterscheiden sich je nach Anbieter, bitte vorab erfragen",
      ],
    },
  },
  {
    id: "plane",
    label: { cs: "Letadlo", en: "Plane", de: "Flugzeug" },
    icon: "Plane",
    summary: {
      cs: "Nejblíže jsou letiště Praha, Linec a České Budějovice v Plané.",
      en: "The closest airports are Prague, Linz and České Budějovice in Planá.",
      de: "Die nächsten Flughäfen sind Prag, Linz und České Budějovice in Planá.",
    },
    details: {
      cs: [
        "Letiště Praha",
        "Letiště Linec",
        "Letiště České Budějovice v Plané",
        "Na poslední úsek cesty doporučujeme taxi nebo transfer",
      ],
      en: [
        "Prague Airport",
        "Linz Airport",
        "České Budějovice Airport in Planá",
        "For the final leg we recommend a taxi or a shuttle",
      ],
      de: [
        "Flughafen Prag",
        "Flughafen Linz",
        "Flughafen České Budějovice in Planá",
        "Für die letzte Etappe empfehlen wir Taxi oder Transfer",
      ],
    },
  },
  {
    id: "walking",
    label: { cs: "Pěšky", en: "Walking", de: "Zu Fuß" },
    icon: "Footprints",
    summary: {
      cs: "Z náměstí Přemysla Otakara II. jste u nás za tři minuty.",
      en: "From Přemysl Otakar II Square you reach us in three minutes.",
      de: "Vom Platz Přemysl Otakar II. sind Sie in drei Minuten bei uns.",
    },
    details: {
      cs: [
        "3 minuty z náměstí Přemysla Otakara II.",
        "Od Piaristického náměstí jen pár kroků",
        "20 minut z vlakového i autobusového nádraží",
      ],
      en: [
        "3 minutes from Přemysl Otakar II Square",
        "Just a few steps from Piaristické náměstí",
        "20 minutes from both the train and the bus station",
      ],
      de: [
        "3 Minuten vom Platz Přemysl Otakar II.",
        "Nur wenige Schritte vom Piaristické náměstí",
        "20 Minuten vom Bahnhof und vom Busbahnhof",
      ],
    },
  },
];

/* -------------------------------------------------------------------------- */
/* Trip tips                                                                  */
/* -------------------------------------------------------------------------- */

export const tripTips: readonly TripTip[] = [
  {
    id: "hluboka",
    name: "Hluboká nad Vltavou",
    description: {
      cs: "Novogotický zámek nad řekou.",
      en: "A neo-Gothic chateau above the river.",
      de: "Ein neugotisches Schloss über dem Fluss.",
    },
    image: {
      src: "/images/location/hluboka.png",
      alt: {
        cs: "Zástupný obrázek — Hluboká nad Vltavou",
        en: "Placeholder image — Hluboká nad Vltavou",
        de: "Platzhalterbild — Hluboká nad Vltavou",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
  },
  {
    id: "holasovice",
    name: "Holašovice",
    description: {
      cs: "Vesnice na seznamu UNESCO.",
      en: "A village on the UNESCO list.",
      de: "Ein Dorf auf der UNESCO-Liste.",
    },
    image: {
      src: "/images/location/holasovice.png",
      alt: {
        cs: "Zástupný obrázek — Holašovice",
        en: "Placeholder image — Holašovice",
        de: "Platzhalterbild — Holašovice",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
  },
  {
    id: "klet",
    name: "Kleť",
    description: {
      cs: "Nejvyšší hora Blanského lesa s rozhlednou.",
      en: "The highest peak of the Blanský les with a lookout tower.",
      de: "Der höchste Berg des Blanský les mit Aussichtsturm.",
    },
    image: {
      src: "/images/location/klet.png",
      alt: {
        cs: "Zástupný obrázek — Kleť",
        en: "Placeholder image — Kleť",
        de: "Platzhalterbild — Kleť",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
  },
  {
    id: "cesky-krumlov",
    name: "Český Krumlov",
    description: {
      cs: "Historické město v meandru Vltavy.",
      en: "A historic town in a bend of the Vltava.",
      de: "Eine historische Stadt in einer Schleife der Vltava.",
    },
    image: {
      src: "/images/location/cesky-krumlov.png",
      alt: {
        cs: "Zástupný obrázek — Český Krumlov",
        en: "Placeholder image — Český Krumlov",
        de: "Platzhalterbild — Český Krumlov",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
  },
  {
    id: "trebon",
    name: "Třeboň",
    description: {
      cs: "Rybníky, hráze a lázeňské město.",
      en: "Fishponds, dams and a spa town.",
      de: "Teiche, Dämme und eine Kurstadt.",
    },
    image: {
      src: "/images/location/trebon.png",
      alt: {
        cs: "Zástupný obrázek — Třeboň",
        en: "Placeholder image — Třeboň",
        de: "Platzhalterbild — Třeboň",
      },
      width: 1200,
      height: 1500,
      isPlaceholder: true,
    },
  },
];
