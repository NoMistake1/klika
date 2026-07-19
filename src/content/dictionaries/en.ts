import type { Dictionary } from "./cs";

/**
 * English UI dictionary. Typed against the Czech dictionary, so a missing or
 * misspelled key fails type checking rather than falling back silently.
 * Names, prices, addresses, phone numbers and times are never translated.
 */
export const en: Dictionary = {
  siteName: "Hotel Klika",
  restaurantName: "Klika Kitchen & Coffee",
  tagline: "Hotel and restaurant in the heart of České Budějovice",

  a11y: {
    skipToContent: "Skip to content",
    mainNavigation: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Language selection",
    chooseLanguage: "Choose language",
    currentLanguage: "Current language",
    breadcrumb: "Breadcrumb",
    home: "Home",
    previous: "Previous",
    next: "Next",
    close: "Close",
    loading: "Loading",
    slideOf: "Item {current} of {total}",
    imageOf: "Image {current} of {total}",
    pauseSlider: "Pause automatic rotation",
    playSlider: "Resume automatic rotation",
    goToSlide: "Go to item {index}",
    scrollDown: "Scroll down",
    placeholderImage: "Placeholder image — the final photograph will follow",
    openInNewTab: "Opens in a new window",
    required: "required",
  },

  actions: {
    bookStay: "Book a stay",
    bookTable: "Book a table",
    explore: "Explore Klika",
    viewAll: "View all",
    detail: "Details",
    showMore: "Show more",
    showLess: "Show less",
    callReception: "Call reception",
    callRestaurant: "Call the restaurant",
    sendEmail: "Send an email",
    whatsApp: "Contact us on WhatsApp",
    navigate: "Get directions",
    openMap: "Open map",
    back: "Back",
    continue: "Continue",
    submit: "Send",
    fullDailyMenu: "Full daily menu",
    fullMenu: "Full à la carte menu",
    drinksMenu: "Drinks menu",
    wholeGallery: "Full gallery",
    hotelDetail: "More about the hotel",
    restaurantDetail: "More about the restaurant",
    allRooms: "All rooms",
    pricing: "Prices",
    location: "How to find us",
    contactUs: "Contact us",
    startOver: "Start over",
    editSelection: "Edit selection",
  },

  hero: {
    headline: "Hotel and restaurant in the heart of České Budějovice",
    subheadline:
      "A historic centre, riverside calm and modern South Bohemian cooking.",
    handwritten: "Come and see us",
    features: [
      "3 minutes from the square",
      "Private parking",
      "Breakfast included",
      "Restaurant by the river",
    ],
    videoFallback: "The video could not be loaded. Showing the opening photograph.",
  },

  bookingBar: {
    title: "Book your stay",
    arrival: "Arrival",
    departure: "Departure",
    guests: "Guests",
    guest: "guest",
    guestsFew: "guests",
    guestsMany: "guests",
    submit: "Continue",
    nights: "nights",
    night: "night",
    nightsFew: "nights",
  },

  validation: {
    summaryTitle: "Please check the details you entered",
    required: "This field is required",
    arrivalInPast: "The arrival date cannot be in the past",
    departureBeforeArrival: "The departure date must be after the arrival date",
    invalidDate: "Enter a valid date",
    dateInPast: "The date cannot be in the past",
    minGuests: "Enter at least 1 guest",
    maxGuests: "For larger groups, please contact us directly",
    invalidEmail: "Enter a valid email address",
    invalidPhone: "Enter a valid phone number",
    selectRoom: "Please select a room category",
    selectTime: "Please select a time",
  },

  dailyMenu: {
    eyebrow: "Today's recommendation",
    title: "Daily menu",
    subtitle: "We cook fresh every day, guided by what is in season.",
    servedFrom: "Served on weekdays from 11:00 to 14:00",
    categories: {
      soup: "Soups",
      main: "Main dishes",
      dessert: "Desserts",
    },
    allergensLabel: "Allergens",
    allergenLegend: "Allergen legend",
    allergenNote:
      "The numbers next to each dish are EU allergen codes, not the price.",
    empty: "Today's daily menu has not been published yet.",
    emptyHint: "Give us a call and we will gladly tell you what is cooking.",
    demoNotice: "Demo data — the daily menu will be connected to an admin panel.",
    dietary: {
      vegetarian: "Vegetarian",
      vegan: "Vegan",
      "gluten-free": "Gluten-free",
    },
  },

  foodCollage: {
    eyebrow: "Today's picks",
    title: "Taste Klika",
    text: "Seasonal South Bohemian cooking, local ingredients and dishes you'll want to come back to.",
    note: "In season, done right",
  },

  split: {
    eyebrow: "Two worlds, one address",
    hotelTitle: "Hotel Klika",
    hotelText:
      "A family hotel in the historic centre. Quiet by the Malše, private parking and a breakfast worth lingering over.",
    hotelNote: "Cosy sleep",
    restaurantTitle: "Klika Kitchen & Coffee",
    restaurantText:
      "Modern South Bohemian cooking from the younger Klika generation. We cook with the season, from producers we know by name.",
    restaurantNote: "We cook with love",
  },

  numbers: {
    eyebrow: "The hotel in numbers",
    title:
      "A family hotel in the historic centre, yet away from the bustle of the main streets.",
  },

  rooms: {
    eyebrow: "Accommodation",
    title: "Rooms and apartments",
    subtitle:
      "From a compact single room to an apartment with its own sauna and a view of Sokolský ostrov.",
    capacity: "Capacity",
    upToGuests: "up to {count} guests",
    features: "Amenities",
    from: "from",
    perNight: "per night",
    priceOnRequest: "Price on request",
    seasonalException:
      "Does not apply during trade fairs and New Year's Eve — price on request.",
  },

  zones: {
    eyebrow: "Where you will sit",
    title: "Three spaces, three moods",
    subtitle:
      "Choose by the weather or the mood. Zones can be requested, but a specific table cannot be guaranteed.",
    seats: "seats",
    seatsLabel: "Capacity",
    seasonal: "Seasonal opening",
  },

  producers: {
    eyebrow: "Ingredients",
    title:
      "We cook with the season and work with South Bohemian farmers and small suppliers.",
    note: "Straight from local farmers",
  },

  family: {
    eyebrow: "With children",
    title: "Families are at home here",
    subtitle:
      "A garden with a sandbox and a swing, child seats indoors and out, and seasonal dishes for the youngest guests.",
    items: [
      "3 child seats",
      "Changing table",
      "Crayons and colouring pages",
      "Outdoor children's area",
      "Sandbox",
      "Swing",
      "Toys",
      "Seating for parents within sight",
      "Seasonal children's dishes",
    ],
  },

  locationPreview: {
    eyebrow: "Where to find us",
    title: "In the historic centre, yet peaceful",
    walkingDistance: "Walking distances",
    mapPlaceholderTitle: "Interactive map",
    mapPlaceholderText:
      "The map loads on click so it does not slow the page down.",
    loadMap: "Load map",
    mapAttribution: "Map data © Google",
    openInMaps: "Open in maps",
    gps: "GPS",
    address: "Address",
  },

  gallery: {
    eyebrow: "Gallery",
    title: "Come and see us",
    subtitle: "The hotel, rooms, restaurant, food, garden and surroundings.",
    categories: {
      all: "All",
      hotel: "Hotel",
      rooms: "Rooms",
      restaurant: "Restaurant",
      food: "Food",
      garden: "Garden",
      surroundings: "Surroundings",
    },
    empty: "There are no photographs in this category yet.",
    emptyHint: "Please choose another category.",
    filterLabel: "Filter by category",
    openImage: "Open image",
    lightboxLabel: "Photo viewer",
  },

  finalCta: {
    eyebrow: "We look forward to seeing you",
    hotelTitle: "Stay the night",
    hotelText: "A quiet room three minutes from the square, breakfast included.",
    restaurantTitle: "Come for dinner",
    restaurantText:
      "A seasonal menu, a view of the river and a garden in the sun.",
  },

  hotelPage: {
    eyebrow: "Hotel Klika",
    title: "A family hotel by Piaristické náměstí",
    intro:
      "Hotel Klika stands in the historic centre of České Budějovice, a short walk from Sokolský ostrov and the confluence of the Vltava and the Malše. We are in a quiet part of the centre — the main square is three minutes away on foot, while the bustle of the main streets stays around the corner.",
    handwritten: "You sleep well here",
    areasTitle: "Where you will stay",
    areasSubtitle:
      "The accommodation is spread across four buildings, all served by one reception.",
    servicesTitle: "Reception services",
    servicesSubtitle: "Reception is open daily from 07:00 to 22:00.",
    breakfastTitle: "Breakfast",
    breakfastSubtitle:
      "Served in the restaurant from 07:00 to 10:00, buffet style.",
    parkingTitle: "Parking, bicycles and motorcycles",
    childrenTitle: "Children and pets",
    offersTitle: "Special offers",
    offersNote:
      "Please confirm the exact conditions with reception — the offers cannot be applied automatically.",
    pricingTitle: "Prices",
    pricingTeaser:
      "Rates valid from 24 March 2026 to 31 December 2026, breakfast included.",
    galleryTitle: "The hotel in photographs",
    bookingTitle: "Book your stay",
    bookingText:
      "Choose your dates and a room category. Reception will confirm availability.",
  },

  roomsPage: {
    eyebrow: "Accommodation",
    title: "Rooms and apartments",
    intro:
      "Every room has its own bathroom, a television, a phone and an internet connection. A baby cot is available.",
    allCategories: "All categories",
  },

  pricingPage: {
    eyebrow: "Prices",
    title: "Accommodation rates",
    validity: "Rates valid from {from} to {to}",
    perNight: "per night",
    perDay: "per day",
    perPersonDay: "per person per day",
    perPerson: "per person",
    perStay: "per stay",
    includedTitle: "Included in the room rate",
    included: ["Breakfast", "VAT", "Wi-Fi", "Reception services"],
    notIncludedTitle: "Not included in the rate",
    notIncluded: ["Parking", "City tourist fee"],
    extrasTitle: "Extras and fees",
    exceptionNote:
      "Rates marked with an asterisk do not apply during trade fairs and New Year's Eve. Those dates are priced individually on request.",
    singleRoomTitle: "About the “limited” single room",
    singleRoomText:
      "The room has its own bathroom, a television and an internet connection, but its dimensions are minimal. It is mainly suitable for short stays or one-night accommodation.",
    touristFeeNote: "City tourist fee for 2026.",
    askReception: "Reception will gladly confirm a rate for your dates.",
  },

  hotelBooking: {
    eyebrow: "Book a stay",
    title: "Choose your stay",
    steps: {
      dates: "Dates and guests",
      room: "Room selection",
      "room-detail": "Room details",
      guest: "Your details",
      summary: "Summary",
      contact: "Contact reception",
    },
    stepOf: "Step {current} of {total}",
    progressLabel: "Booking progress",
    datesTitle: "When are you arriving?",
    roomTitle: "Which category suits you?",
    roomDetailTitle: "Selected room",
    guestTitle: "Where can we reach you?",
    summaryTitle: "Summary of your selection",
    contactTitle: "Last step: get in touch with reception",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    note: "Note",
    notePlaceholder: "E.g. late arrival, baby cot, a dog…",
    selectedRoom: "Selected room",
    stay: "Dates",
    guestCount: "Guests",
    estimateTitle: "Indicative price",
    estimateNote:
      "An indicative total for accommodation. It excludes parking and the city tourist fee. Reception confirms the final price.",
    notConfirmed:
      "This is a preliminary selection. Room availability must be confirmed by reception.",
    contactText:
      "Copy the summary or simply get in touch — reception will check your dates and complete the booking.",
    copySummary: "Copy summary",
    copied: "Copied",
    storageUnavailable:
      "Your browser cannot store the booking draft. Details will be lost when you close the page.",
    noRoomSelected: "You have not selected a room yet.",
  },

  restaurantPage: {
    eyebrow: "Klika Kitchen & Coffee",
    title: "Modern South Bohemian cooking by the river",
    intro:
      "The restaurant has been run by the younger Klika generation since late 2016. We cook with seasonal ingredients from small South Bohemian farmers and suppliers. Part of the original 14th-century city wall runs through the interior.",
    handwritten: "Today's recommendation",
    heroLede: "We cook with the season, from producers we know by name.",
    collageEyebrow: "Seasonal kitchen",
    collageTitle: "Every plate has its story",
    collageTags: ["Seasonal kitchen", "Local ingredients", "Every plate has its story"],
    menuNavEyebrow: "The menu",
    menuNavTitle: "What are you in the mood for?",
    menuNavText:
      "The daily menu changes every day, the à la carte roughly once a month.",
    dailyCard: "Today's daily menu",
    permanentCard: "The à la carte menu",
    reopened:
      "We reopened after a major interior renovation on 14 February 2025.",
    jimeJih: "Founding member of the Jíme Jih association",
    principlesTitle: "How we cook",
    principles: [
      "Seasonal ingredients from local farmers",
      "No palm oil",
      "No artificial flavour enhancers",
      "No ready-made convenience food",
      "The à la carte menu changes roughly once a month",
      "Environmentally conscious packaging and recycling",
    ],
    menuTeaser: "À la carte menu",
    menuTeaserText:
      "We change the menu about every month, following what is freshest.",
    drinksTitle: "Drinks",
    drinksSubtitle:
      "Budvar, unpasteurized lagers from small breweries, homemade lemonades and coffee.",
    drinksNote: "You will find the full drinks list on your table.",
    instagramText: "See what is happening right now on Instagram.",
    followInstagram: "Follow @klikakitchen",
    bookingTitle: "Table booking",
    bookingText: "Send us your preferred date and we will get back to you.",
  },

  menuPage: {
    eyebrow: "Menu",
    title: "À la carte menu",
    intro:
      "We change the menu roughly once a month with the season. All prices are in Czech crowns and include VAT.",
    categories: {
      soups: "Soups",
      "small-dishes": "Small dishes",
      "main-courses": "Main courses",
      "side-dishes": "Side dishes",
      children: "For children",
      desserts: "Desserts",
    },
    jumpTo: "Jump to category",
    glutenFreeOption: "Can be prepared gluten-free",
  },

  dailyMenuPage: {
    eyebrow: "Daily menu",
    title: "What we are cooking today",
    intro: "The daily menu changes every day. Today's offer is below.",
  },

  restaurantBooking: {
    eyebrow: "Table booking",
    title: "Book a table",
    intro:
      "Please fill in the form. We will confirm your booking by phone or email.",
    date: "Date",
    time: "Time",
    guests: "Guests",
    zone: "Preferred zone",
    name: "Full name",
    phone: "Phone",
    email: "Email",
    note: "Note",
    notePlaceholder: "E.g. child seat, a celebration, allergies…",
    zones: {
      any: "Any available zone",
      restaurant: "Restaurant",
      conservatory: "Conservatory",
      garden: "Garden",
    },
    zoneHint: "We do our best to accommodate your zone, but cannot guarantee it.",
    submit: "Send request",
    summaryTitle: "Request summary",
    notConfirmed:
      "Your request has not been confirmed yet. To complete the booking, please contact the restaurant.",
    contactText: "Get in touch and we will hold the table for you.",
    newRequest: "New request",
    openingNote: "Open daily 10:30–22:00.",
  },

  catering: {
    eyebrow: "Events and catering",
    title: "Celebrations, weddings and company events",
    intro:
      "We take care of family celebrations, weddings, private and company events. The menu and the budget are always planned individually.",
    capacityTitle: "Capacity",
    capacityText: "We host events for approximately up to 50 people.",
    offerTitle: "What we offer",
    offer: [
      "Family celebrations",
      "Weddings",
      "Private events",
      "Company parties",
      "Buffets",
      "Smaller off-site catering",
      "Individual planning based on the event and budget",
    ],
    vouchersTitle: "Gift vouchers",
    vouchersText: "Printed vouchers can be collected directly at the restaurant.",
    vouchersNote:
      "Electronic vouchers are in preparation — for now, please arrange them with our staff.",
    voucherValue: "Voucher worth",
    contactTitle: "Let's plan it together",
    contactText: "Tell us what you have in mind and we will come back with a proposal.",
  },

  locationPage: {
    eyebrow: "Location",
    title: "How to find us",
    intro:
      "We are in the historic centre of České Budějovice, right by Piaristické náměstí and a short walk from the Malše river.",
    highlightsTitle: "In the neighbourhood",
    travelTitle: "Getting here",
    travelSubtitle: "Choose how you are travelling.",
    tipsTitle: "Trip ideas",
    tipsSubtitle: "Worth seeing in the area.",
    addressTitle: "Address",
    gpsTitle: "GPS coordinates",
    scheduleWarning:
      "Timetables and lines change — please verify current connections with the carrier.",
  },

  contactPage: {
    eyebrow: "Contact",
    title: "Get in touch",
    hotelTitle: "Hotel Klika",
    restaurantTitle: "Klika Kitchen & Coffee",
    reception: "Reception",
    mobile: "Mobile",
    phone: "Phone",
    email: "Email",
    whatsApp: "WhatsApp",
    hoursTitle: "Opening hours",
    checkInTitle: "Check-in and check-out",
    checkIn: "Check-in",
    checkOut: "Check-out",
    afterHoursNotice:
      "If you need accommodation outside these hours, please contact reception at +420 774 328 555 or hotel@hotelklika.cz.",
    socialTitle: "Follow us",
    billingTitle: "Billing information",
    billingToggle: "Show billing information",
    companyId: "Company ID",
    vatId: "VAT ID",
    addressTitle: "Address",
  },

  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    intro: "This page is prepared for the final privacy policy wording.",
    placeholderTitle: "Text in preparation",
    placeholderText:
      "The binding privacy policy will be supplied by the operator. Until then, we are happy to answer any question about personal data at hotel@hotelklika.cz.",
    contactTitle: "A question about your personal data?",
    operatorsTitle: "Operators",
  },

  footer: {
    statement:
      "A family hotel and restaurant in the historic centre of České Budějovice. Since 2002.",
    navigationTitle: "Navigation",
    hotelTitle: "Hotel",
    restaurantTitle: "Restaurant",
    hoursTitle: "Opening hours",
    addressTitle: "Address",
    billingToggle: "Billing information",
    privacy: "Privacy policy",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  notFound: {
    code: "404",
    title: "This way leads nowhere",
    text: "The page you are looking for is not here. It may have moved — or you took a wrong turn on the way to the garden.",
    handwritten: "Back to Klika",
    home: "Back to the homepage",
    suggestions: "Where to next",
  },

  error: {
    title: "Something went wrong",
    text: "The page could not be loaded. Please try again.",
    retry: "Try again",
  },

  demo: {
    label: "Demo data",
    imagePlaceholder: "Placeholder image",
  },
};
