/**
 * Barney's Place — central website content.
 *
 * Edit this file to change school details, copy and gallery items. Components
 * never hard-code school information; they read it from here.
 *
 * Statuses (see ./types.ts): "verified" items were supplied by the owners;
 * "proposed" items are sample copy for the owner preview and are hidden from
 * the public build until changed to "approved".
 *
 * Do NOT add fees, age groups, opening hours, staff names, a registration
 * number, testimonials or statistics unless the owners have supplied them.
 */
import type {
  Address,
  DayStep,
  GalleryItem,
  LearningArea,
  OptionalChannels,
  PageMeta,
  Phone,
  Pillar,
  Question,
  SchoolValue,
  TextBlock,
  Governed,
} from "./types";

/* ------------------------------------------------------------------ */
/* Verified school details (supplied by the owners)                    */
/* ------------------------------------------------------------------ */

export const school = {
  name: "Barney’s Place",
  /** Plain-apostrophe version for metadata, structured data and file names. */
  plainName: "Barney's Place",
  type: "Early Childhood Development (ECD) Centre",
  shortType: "ECD Centre",
  address: {
    stand: "Stand No. 3103",
    suburb: "Aerodrome Medium",
    town: "Bindura",
    country: "Zimbabwe",
    countryCode: "ZW",
  } satisfies Address,
  phones: [
    { display: "0773 690 316", e164: "+263773690316" },
    { display: "0776 631 541", e164: "+263776631541" },
  ] satisfies Phone[],
  registration: {
    status: "verified",
    statement: "Registered with the Ministry of Primary and Secondary Education, Zimbabwe.",
  },
  /** Not supplied yet — every channel stays hidden while undefined. */
  channels: {} satisfies OptionalChannels,
  /** Neutral, factual one-liner used in metadata and when proposed copy is hidden. */
  factualSummary:
    "Barney’s Place is an Early Childhood Development (ECD) Centre at Stand No. 3103, Aerodrome Medium, Bindura, Zimbabwe.",
} as const;

export const fullAddress = `${school.address.stand}, ${school.address.suburb}, ${school.address.town}, ${school.address.country}`;

/** Google Maps location search for the supplied address (no invented coordinates). */
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${school.plainName}, ${fullAddress}`,
)}`;

/* ------------------------------------------------------------------ */
/* Navigation and page metadata                                         */
/* ------------------------------------------------------------------ */

export const pages = {
  home: {
    path: "/",
    label: "Home",
    title: "Barney's Place | ECD Centre in Aerodrome, Bindura",
    description:
      "Barney’s Place is an Early Childhood Development (ECD) Centre in Aerodrome Medium, Bindura, Zimbabwe. Call 0773 690 316 or 0776 631 541.",
  },
  about: {
    path: "/about/",
    label: "About Us",
    title: "About Us",
    description:
      "Get to know Barney’s Place, an Early Childhood Development Centre in Aerodrome Medium, Bindura — our approach, values and what families can expect.",
  },
  learning: {
    path: "/learning-journey/",
    label: "Learning Journey",
    title: "Learning Journey",
    description:
      "How young children learn through play at Barney’s Place in Bindura: language, early numeracy, creativity, movement, friendship and nature.",
  },
  admissions: {
    path: "/admissions/",
    label: "Admissions",
    title: "Admissions",
    description:
      "Enquire about a place at Barney’s Place ECD Centre, Aerodrome, Bindura. Call 0773 690 316 or 0776 631 541 to ask about places, fees and documents.",
  },
  gallery: {
    path: "/gallery/",
    label: "Gallery",
    title: "Gallery",
    description: "A window into everyday learning and play at Barney’s Place ECD Centre in Aerodrome, Bindura.",
  },
  contact: {
    path: "/contact/",
    label: "Contact",
    title: "Contact",
    description:
      "Contact Barney’s Place ECD Centre at Stand No. 3103, Aerodrome Medium, Bindura, Zimbabwe. Call 0773 690 316 or 0776 631 541.",
  },
} satisfies Record<string, PageMeta>;

export type PageKey = keyof typeof pages;

export const navOrder: PageKey[] = ["home", "about", "learning", "admissions", "gallery", "contact"];

/* ------------------------------------------------------------------ */
/* Home                                                                 */
/* ------------------------------------------------------------------ */

export const hero = {
  status: "proposed",
  lineOne: "Little Steps.",
  lineTwo: "Big Discoveries.",
  intro:
    "Every curious question begins a new adventure. At Barney’s Place, we’re passionate about helping young minds discover, explore and grow.",
  /** Shown instead while the proposed hero is unapproved and demo mode is off. */
  fallback: {
    heading: "Barney’s Place",
    intro: "An Early Childhood Development Centre in Aerodrome Medium, Bindura. Call us to find out more.",
  },
} as const satisfies Governed & Record<string, unknown>;

export const homeIntro: TextBlock & { headingParts: { text: string; tone?: "berry" | "magenta" | "leaf" }[] } = {
  status: "proposed",
  eyebrow: "Welcome to Barney’s Place",
  heading: "A bright, caring place in Aerodrome Medium where little learners play, explore and grow — ready for the big steps ahead.",
  /** The same sentence, split so key words can be coloured. */
  headingParts: [
    { text: "A bright, caring place in " },
    { text: "Aerodrome Medium", tone: "leaf" },
    { text: " where little learners " },
    { text: "play", tone: "berry" },
    { text: ", " },
    { text: "explore", tone: "magenta" },
    { text: " and " },
    { text: "grow", tone: "leaf" },
    { text: " — ready for the big steps ahead." },
  ],
  body: [
    "Barney’s Place is an Early Childhood Development centre in Bindura. Our days are filled with stories, songs, building, painting and outdoor discovery, guided by adults who know every child by name.",
  ],
};

export const philosophy: Governed & { eyebrow: string; heading: string; headingAccent: string; intro: string; pillars: Pillar[] } = {
  status: "proposed",
  eyebrow: "Our philosophy",
  heading: "Rooted in care.",
  headingAccent: "Growing through discovery.",
  intro:
    "Like a seedling, every child grows at their own pace. We give them warmth, light and room to reach — and celebrate each new leaf along the way.",
  pillars: [
    {
      title: "Care comes first",
      body: "Children learn best when they feel safe, known and loved. Warm routines and patient adults help every child settle, trust and belong.",
    },
    {
      title: "Discovery every day",
      body: "Hands-on play and gentle guidance turn everyday curiosity — “why?”, “how?”, “what if?” — into real understanding.",
    },
    {
      title: "Ready for what’s next",
      body: "Early language, number sense and social skills give children a confident, joyful start to the school journey ahead.",
    },
  ],
};

export const enquiryCta: TextBlock = {
  status: "proposed",
  eyebrow: "For parents & guardians",
  heading: "Thinking about Barney’s Place for your child?",
  body: [
    "We’d love to hear from you. Call to ask about places, fees and starting dates — or send an enquiry and we’ll guide you through the next steps.",
  ],
};

/* ------------------------------------------------------------------ */
/* Learning                                                             */
/* ------------------------------------------------------------------ */

export const learningAreas: LearningArea[] = [
  {
    status: "proposed",
    id: "language",
    title: "Language and storytelling",
    shortTitle: "Language & storytelling",
    icon: "story",
    accent: "berry",
    summary: "Stories, songs and conversations that grow vocabulary — and a lifelong love of books.",
    example: "A story circle under a tree, action rhymes, naming everyday objects and playing with first letter sounds.",
    description:
      "From first words to favourite stories, children build the listening, speaking and early reading skills that open every door.",
    youMightSee: [
      "Story circles and picture books",
      "Songs, rhymes and finger plays",
      "Naming, describing and lots of conversation",
      "First letter sounds and early mark-making",
    ],
    howItHelps: "A rich vocabulary and a love of books support confident communication in the years ahead.",
  },
  {
    status: "proposed",
    id: "numeracy",
    title: "Early numeracy and problem-solving",
    shortTitle: "Early numeracy & problem-solving",
    icon: "numbers",
    accent: "sun",
    summary: "Counting, sorting and puzzles that make numbers feel like a game.",
    example: "Counting bottle tops, sorting leaves by size, matching shapes and building patterns with blocks.",
    description:
      "Numbers become friendly through counting games, sorting, measuring and puzzles that make children think.",
    youMightSee: [
      "Counting objects during play",
      "Sorting by colour, shape and size",
      "Spotting and making simple patterns",
      "Puzzles and building challenges",
    ],
    howItHelps: "Early number sense and problem-solving help children meet new challenges calmly and with curiosity.",
  },
  {
    status: "proposed",
    id: "creative",
    title: "Creative expression and art",
    shortTitle: "Creative expression & art",
    icon: "art",
    accent: "magenta",
    summary: "Painting, drawing, music and making — every child’s ideas are welcome.",
    example: "Finger painting, leaf prints, clay modelling, drumming and singing together.",
    description: "Children express feelings and ideas through paint, clay, music, dance and pretend play.",
    youMightSee: [
      "Painting, collage and clay",
      "Singing, drumming and dancing",
      "Dressing up and role play",
      "Making with recycled materials",
    ],
    howItHelps: "Creative play builds fine-motor control, imagination and the confidence to share ideas.",
  },
  {
    status: "proposed",
    id: "movement",
    title: "Play, movement and exploration",
    shortTitle: "Play, movement & exploration",
    icon: "play",
    accent: "leaf",
    summary: "Running, climbing, balancing and active games for strong, confident bodies.",
    example: "Hopscotch, ball games, balancing on a line and dancing to music.",
    description: "Active play builds strong bodies, coordination and the courage to try new things.",
    youMightSee: [
      "Running, jumping and balancing",
      "Throwing, catching and kicking balls",
      "Simple obstacle courses",
      "Movement and action songs",
    ],
    howItHelps: "Physical confidence supports concentration, wellbeing and healthy habits.",
  },
  {
    status: "proposed",
    id: "social",
    title: "Social interaction and cooperation",
    shortTitle: "Social interaction & cooperation",
    icon: "friends",
    accent: "teal",
    summary: "Sharing, taking turns and making friends, with caring adults close by.",
    example: "Building a tower together, helping a friend tidy up and greeting each other at morning circle.",
    description:
      "Children learn to share, take turns, express feelings and make friends, with caring adults guiding them.",
    youMightSee: [
      "Group games and circle time",
      "Helping with small classroom jobs",
      "Naming and talking about feelings",
      "Building and creating together",
    ],
    howItHelps: "Social skills help children feel secure and ready to learn alongside others.",
  },
  {
    status: "proposed",
    id: "nature",
    title: "Nature and discovery",
    shortTitle: "Nature & discovery",
    icon: "nature",
    accent: "charcoal",
    summary: "Seeds, leaves, insects and weather — the outdoors becomes a classroom full of questions.",
    example: "Planting bean seeds, watching ants with a magnifier, collecting leaves and talking about the rain.",
    description:
      "The natural world is full of questions: why do leaves fall, where do ants go, what makes a seed grow?",
    youMightSee: [
      "Planting and watering seeds",
      "Nature walks and collecting treasures",
      "Looking closely with magnifiers",
      "Talking about weather and seasons",
    ],
    howItHelps: "Exploring nature builds observation skills, wonder and care for the world around us.",
  },
];

export const learningPage = {
  status: "proposed",
  heading: "Learning through play, one little step at a time.",
  intro:
    "Young children learn by doing — touching, building, asking, singing and trying again. Here is how play becomes learning at Barney’s Place.",
  areasHeading: "What your child explores with us",
  areasIntro: "Choose an area to see what it looks like day to day, and how it helps your child grow.",
} as const satisfies Governed & Record<string, unknown>;

/**
 * Illustrative sample routine for discussion with the owners.
 * Deliberately has no times — it is not a confirmed timetable.
 */
export const dayOfDiscoveries: DayStep[] = [
  {
    status: "proposed",
    title: "Welcome and connect",
    summary: "Warm greetings at the gate, a calm settling-in activity and a moment for every child to feel seen.",
    description:
      "Children arrive, are greeted warmly and settle in with a calm activity. A morning circle helps everyone feel part of the group.",
    askAtHome: "Who did you say good morning to today?",
  },
  {
    status: "proposed",
    title: "Explore and play",
    summary: "Blocks, puzzles, pretend play and outdoor discovery, with teachers who watch, listen and gently guide.",
    description:
      "Free-choice play indoors and out — blocks, puzzles, pretend play and sand. Teachers observe, join in and gently extend ideas.",
    askAtHome: "What did you build or make today?",
  },
  {
    status: "proposed",
    title: "Discover stories and numbers",
    summary: "Story circles, songs, letter sounds, counting games and simple patterns.",
    description:
      "Small-group time for stories, songs, letter sounds, counting and patterns — short, playful and hands-on.",
    askAtHome: "What was today’s story about?",
  },
  {
    status: "proposed",
    title: "Create, move and imagine",
    summary: "Painting, music, movement and imaginative play to express big ideas.",
    description: "Painting, music, dance and outdoor games build creativity, coordination and confidence.",
    askAtHome: "Can you show me a move you learned?",
  },
  {
    status: "proposed",
    title: "Reflect and prepare to go home",
    summary: "A calm close: sharing favourite moments, tidying up together and getting ready for family.",
    description:
      "A calm close: sharing favourite moments, tidying up together and getting ready to go home to family.",
    askAtHome: "What was the best part of your day?",
  },
];

export const homeLearningTips: Governed & { heading: string; tips: { title: string; body: string; accent: "berry" | "sun" | "leaf" }[] } = {
  status: "proposed",
  heading: "Little ways to keep discovering at home",
  tips: [
    {
      title: "Read together",
      body: "Ten minutes with a picture book — pointing, guessing what happens next and talking about the pictures — builds language every day.",
      accent: "berry",
    },
    {
      title: "Count everyday things",
      body: "Count stairs, cups or oranges at the market. Sorting laundry by colour is maths too!",
      accent: "sun",
    },
    {
      title: "Explore outdoors",
      body: "Look for insects, collect leaves or watch the clouds. Ask “What do you notice?” and listen to the answer.",
      accent: "leaf",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* About                                                                */
/* ------------------------------------------------------------------ */

export const about = {
  hero: {
    status: "proposed",
    heading: "A little place for growing big hearts.",
    highlight: "growing",
    intro:
      "Barney’s Place is an Early Childhood Development centre in Aerodrome Medium, Bindura. We believe the early years are precious — a time to feel safe, to wonder, and to discover how much fun learning can be.",
  },
  whoWeAre: {
    status: "proposed",
    eyebrow: "Who we are",
    heading: "Where every child is welcomed by name",
    body: [
      "Our centre is a place where young children can play, learn and grow with confidence. Through stories, songs, creative play and outdoor discovery, we nurture the whole child — their curiosity, their friendships and their sense of “I can”.",
      "We see parents and guardians as partners. When families and teachers talk openly and work together, children feel secure — and that is when the best learning happens.",
    ],
  } satisfies TextBlock,
  mission: {
    status: "proposed",
    text: "To create a caring and stimulating environment where young learners build confidence, develop foundational skills and discover the joy of learning.",
  },
  vision: {
    status: "proposed",
    text: "To nurture curious, confident and compassionate children who are excited to explore the world around them.",
  },
  promises: {
    status: "proposed",
    heading: "What you can expect from us",
    items: [
      { title: "A warm welcome", body: "Children and families greeted by name, every day." },
      { title: "Learning through play", body: "Purposeful, hands-on activities suited to young children." },
      { title: "Open communication", body: "Easy conversations about your child’s day and progress." },
      { title: "A caring environment", body: "Attentive adults and a space where children feel at home." },
    ],
  },
  /**
   * The owners' own story. Leave `text` empty until they supply it — the
   * page then shows a placeholder in demo mode and nothing in the public build.
   */
  story: {
    status: "proposed",
    text: [] as string[],
  },
} as const;

export const values: SchoolValue[] = [
  {
    status: "proposed",
    name: "Care",
    icon: "care",
    accent: "berry",
    meaning: "Every child is known, welcomed and kept safe, so they feel secure enough to explore.",
    inPractice: "A warm greeting every morning, patient comforting and gentle, consistent routines.",
  },
  {
    status: "proposed",
    name: "Curiosity",
    icon: "curiosity",
    accent: "sun",
    meaning: "Questions are celebrated. We follow children’s wonder and turn it into discovery.",
    inPractice: "“I wonder…” questions at story time, exploring objects up close and trying ideas out.",
  },
  {
    status: "proposed",
    name: "Creativity",
    icon: "creativity",
    accent: "magenta",
    meaning: "Paint, music, building and pretend play give every idea a place to grow.",
    inPractice: "Open-ended art materials, dressing up, making music and building with recycled objects.",
  },
  {
    status: "proposed",
    name: "Confidence",
    icon: "confidence",
    accent: "leaf",
    meaning: "Small successes, noticed and encouraged, help children believe “I can do it!”",
    inPractice: "Praising effort, small classroom jobs and time to try again without hurry.",
  },
  {
    status: "proposed",
    name: "Respect",
    icon: "respect",
    accent: "teal",
    meaning: "We learn to listen, take turns and value one another’s feelings and differences.",
    inPractice: "Taking turns to speak at circle time, kind words and naming our feelings.",
  },
  {
    status: "proposed",
    name: "Community",
    icon: "community",
    accent: "charcoal",
    meaning: "Families and teachers work together as partners in every child’s early years.",
    inPractice: "Friendly conversations at drop-off and pick-up, sharing children’s work and celebrating together.",
  },
];

/* ------------------------------------------------------------------ */
/* Admissions                                                           */
/* ------------------------------------------------------------------ */

export const admissions = {
  hero: {
    status: "proposed",
    heading: "Your Child’s Next Little Adventure Starts Here.",
    intro:
      "Choosing an early learning centre is a big decision. We’re here to make it simple — talk to us, ask every question you have, and we’ll guide you through each step.",
    fallbackHeading: "Admissions enquiries",
    fallbackIntro: "To ask about a place for your child, please call the school.",
  },
  steps: [
    {
      title: "Contact the school",
      body: "Call the school on either number, or use the enquiry options on this page. Tell us a little about your child.",
    },
    {
      title: "Discuss requirements",
      body: "Talk through age eligibility, available places, fees and the documents you’ll need — and arrange a visit if you’d like one.",
    },
    {
      title: "Confirm next steps",
      body: "The school confirms what happens next, from completing enrolment to your child’s very first day.",
    },
  ],
  /** Answers stay undefined until the owners confirm them. */
  questions: [
    {
      question: "Which ages do you welcome?",
      whyItMatters: "Age guidelines help you plan when your child can start and which group they would join.",
      accent: "berry",
    },
    {
      question: "Are places currently available?",
      whyItMatters: "Availability can change during the year, so it is worth asking early.",
      accent: "sun",
    },
    {
      question: "What are the fees, and how are they paid?",
      whyItMatters: "Knowing the fees, what they include and how payment works helps your family plan ahead.",
      accent: "magenta",
    },
    {
      question: "Which documents will we need to enrol?",
      whyItMatters:
        "Having documents ready, such as a birth certificate or health records, makes enrolment smoother.",
      accent: "leaf",
    },
    {
      question: "How do you help new children settle in?",
      whyItMatters: "Every child adjusts differently. Ask how the first days are handled and how you will be kept informed.",
      accent: "teal",
    },
    {
      question: "Can we visit before enrolling?",
      whyItMatters: "Seeing the centre and meeting the team helps you and your child feel confident.",
      accent: "charcoal",
    },
  ] satisfies Question[],
} as const;

export const enquiryTopics = [
  "Places for my child",
  "Age eligibility",
  "Fees",
  "Required documents",
  "Arranging a visit",
  "Something else",
] as const;

export type EnquiryTopic = (typeof enquiryTopics)[number];

/* ------------------------------------------------------------------ */
/* Gallery                                                              */
/* ------------------------------------------------------------------ */

export const galleryCategories = [
  { id: "learning", label: "Learning in Action", accent: "berry" },
  { id: "creative", label: "Creative Moments", accent: "magenta" },
  { id: "play", label: "Play and Discovery", accent: "sun" },
  { id: "environment", label: "Our Environment", accent: "leaf" },
] as const;

/**
 * Gallery items. To add an authorised photograph, put the file in
 * /public/gallery/ and add an item with kind "photo" (see types.ts).
 * Photo items must have consentConfirmed: true and status "approved"
 * to appear in the public build.
 */
export const gallery: GalleryItem[] = [
  { id: "story-circle", status: "proposed", kind: "illustration", illustration: "story", background: "var(--berry-tint)", title: "Story circle", category: "learning", caption: "Original illustration representing story time.", shape: "tall" },
  { id: "counting", status: "proposed", kind: "illustration", illustration: "numbers", background: "var(--sun-tint)", title: "Counting together", category: "learning", caption: "Original illustration representing early numeracy." },
  { id: "classroom-learning", status: "proposed", kind: "placeholder", title: "Learning in the classroom", category: "learning", caption: "Placeholder — awaiting an authorised photograph.", suggestion: "Suggested: children engaged in a small-group activity (with parental consent).", shape: "wide" },
  { id: "painting", status: "proposed", kind: "illustration", illustration: "art", background: "var(--magenta-tint)", title: "Painting time", category: "creative", caption: "Original illustration representing creative art.", shape: "wide" },
  { id: "pip", status: "proposed", kind: "illustration", illustration: "pip", background: "var(--leaf-tint)", title: "Meet Pip (proposed mascot)", category: "creative", caption: "Original character artwork — a proposed mascot awaiting owner approval.", shape: "tall" },
  { id: "artwork", status: "proposed", kind: "placeholder", title: "Children’s artwork", category: "creative", caption: "Placeholder — awaiting an authorised photograph.", suggestion: "Suggested: a display of children’s paintings or crafts (no faces needed)." },
  { id: "outdoor-games", status: "proposed", kind: "illustration", illustration: "play", background: "var(--sun-tint)", title: "Outdoor games", category: "play", caption: "Original illustration representing active play." },
  { id: "friends", status: "proposed", kind: "illustration", illustration: "friends", background: "var(--teal-tint)", title: "Making friends", category: "play", caption: "Original illustration representing friendship and cooperation.", shape: "tall" },
  { id: "play-area", status: "proposed", kind: "placeholder", title: "Play area", category: "play", caption: "Placeholder — awaiting an authorised photograph.", suggestion: "Suggested: the outdoor play space, photographed when empty or with consent.", shape: "wide" },
  { id: "growing", status: "proposed", kind: "illustration", illustration: "nature", background: "var(--leaf-tint)", title: "Growing things", category: "environment", caption: "Original illustration representing nature and discovery." },
  { id: "entrance", status: "proposed", kind: "placeholder", title: "Our entrance", category: "environment", caption: "Placeholder — awaiting an authorised photograph.", suggestion: "Suggested: the school gate and signage at Stand No. 3103.", shape: "tall" },
  { id: "classroom-space", status: "proposed", kind: "placeholder", title: "Classroom space", category: "environment", caption: "Placeholder — awaiting an authorised photograph.", suggestion: "Suggested: a tidy, well-lit classroom before the children arrive.", shape: "wide" },
];

/* ------------------------------------------------------------------ */
/* Contact                                                              */
/* ------------------------------------------------------------------ */

export const contact = {
  heading: "We’d love to hear from you.",
  intro:
    "Questions about places, fees or what a day looks like? Give us a call — a friendly voice is the quickest way to find out more.",
  readyList: [
    "Your child’s name and age",
    "When you’d like your child to start",
    "Any questions about fees, places or documents",
    "Anything special we should know about your child",
  ],
} as const;
