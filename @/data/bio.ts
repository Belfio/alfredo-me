import CagliariImg from "@/assets/bio/cagliari.jpg";
import OlivettiImg from "@/assets/bio/olivetti.jpg";
import Mac93Img from "@/assets/bio/mac93.jpg";
import ModemImg from "@/assets/bio/modem.jpg";
import GuitarImg from "@/assets/bio/guitar.jpg";
import ValenciaImg from "@/assets/bio/valencia.jpg";
import LabImg from "@/assets/bio/lab.jpg";
import MilanImg from "@/assets/bio/milan.jpg";
import LondonImg from "@/assets/bio/london.jpg";
import PcbImg from "@/assets/bio/pcb.jpg";
import ShenzhenImg from "@/assets/bio/shenzhen.jpg";
import GigImg from "@/assets/bio/gig.jpg";
import SkipperImg from "@/assets/skipper.png";

export type LineGroup = "activities" | "places" | "people";

export type LineId =
  | "act-1"
  | "place-1"
  | "place-2"
  | "people-1"
  | "people-2"
  | "people-3";

export type BioLineMeta = {
  id: LineId;
  group: LineGroup;
  indexInGroup: number;
  label: string;
  shortLabel: string;
  color: string;
  softBg: string;
};

export const BIO_LINES: BioLineMeta[] = [
  {
    id: "act-1",
    group: "activities",
    indexInGroup: 0,
    label: "Activities & Achievements",
    shortLabel: "Craft",
    color: "#1c1917",
    softBg: "rgba(28, 25, 23, 0.06)",
  },
  {
    id: "place-1",
    group: "places",
    indexInGroup: 0,
    label: "Home Base",
    shortLabel: "Home",
    color: "#b45309",
    softBg: "rgba(180, 83, 9, 0.08)",
  },
  {
    id: "place-2",
    group: "places",
    indexInGroup: 1,
    label: "Exchanges & Stints",
    shortLabel: "Stints",
    color: "#c2410c",
    softBg: "rgba(194, 65, 12, 0.08)",
  },
  {
    id: "people-1",
    group: "people",
    indexInGroup: 0,
    label: "Family & Partners",
    shortLabel: "Family",
    color: "#0f766e",
    softBg: "rgba(15, 118, 110, 0.08)",
  },
  {
    id: "people-2",
    group: "people",
    indexInGroup: 1,
    label: "Cohorts & Teams",
    shortLabel: "Teams",
    color: "#0369a1",
    softBg: "rgba(3, 105, 161, 0.08)",
  },
  {
    id: "people-3",
    group: "people",
    indexInGroup: 2,
    label: "Lifelong Friends",
    shortLabel: "Friends",
    color: "#4338ca",
    softBg: "rgba(67, 56, 202, 0.08)",
  },
];

export type BioPhoto = {
  src: string;
  alt: string;
  caption: string;
  aspect?: "landscape" | "portrait";
};

export type BioEntry = {
  lineId: LineId;
  title: string;
  span?: string;
  detail: string;
  link?: { label: string; href: string };
  photo?: BioPhoto;
};

export type BioChapter = {
  id: string;
  year: number;
  yearLabel?: string;
  activeLines: LineId[];
  activities: BioEntry[];
  places: BioEntry[];
  people: BioEntry[];
};

export const BIO_CHAPTERS: BioChapter[] = [
  {
    id: "1988",
    year: 1988,
    activeLines: ["act-1", "place-1", "people-1"],
    activities: [
      {
        lineId: "act-1",
        title: "Born in Cagliari",
        detail:
          "Day one on the southern coast of Sardinia — Mediterranean light, maestrale wind off the gulf, and salt air.",
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "Cagliari · Sardinia",
        span: "1988–2010",
        detail:
          "Limestone bastions, Poetto beach under Sella del Diavolo, and home base from childhood through university.",
        photo: {
          src: CagliariImg,
          alt: "Aerial view of Poetto beach and bay in Cagliari, Sardinia",
          caption: "Golfo degli Angeli & Poetto, Cagliari — where line #1 starts",
        },
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Family in Cagliari",
        span: "1988–",
        detail:
          "Sardinian roots, long Sunday lunches, and endless patience for a kid taking household electronics apart.",
      },
    ],
  },
  {
    id: "1992",
    year: 1992,
    activeLines: ["act-1", "place-1", "people-1"],
    activities: [
      {
        lineId: "act-1",
        title: "Olivetti computer games at home",
        detail:
          "Age four in front of the family Olivetti CRT, memorising floppy-disk commands just to boot games.",
        photo: {
          src: OlivettiImg,
          alt: "Vintage Olivetti personal computer with CRT monitor and keyboard",
          caption: "Beige Olivetti iron — first glowing screen at home",
        },
      },
    ],
    places: [],
    people: [],
  },
  {
    id: "1993",
    year: 1993,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Mac computer at five & starting basketball",
        detail:
          "Switched to an Apple Macintosh with its startup chime and one-button mouse, and started minibasket the same year.",
        photo: {
          src: Mac93Img,
          alt: "Compact Apple Macintosh Classic computer with keyboard and mouse",
          caption: "1993 Macintosh — five years old, System 7 & happy Mac",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Cagliari Basketball Courts",
        span: "1993–2006",
        detail:
          "Neighbourhood gyms and outdoor hoops week after week growing up.",
      },
    ],
    people: [
      {
        lineId: "people-3",
        title: "Davide, Giacomo & Pasquale",
        span: "1993–",
        detail:
          "Met playing basketball at five years old — teammates and lifelong friends ever since.",
      },
    ],
  },
  {
    id: "1997",
    year: 1997,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Carmageddon & 54k internet",
        detail:
          "Afternoon chaos in Carmageddon and the screech-and-hiss of a 54k dial-up modem tying up the house phone line.",
        link: { label: "play /carmageddon", href: "/carmageddon" },
        photo: {
          src: ModemImg,
          alt: "Analog 56k dial-up modem with red status LEDs",
          caption: "54k carrier LEDs — 'don't pick up the phone!'",
        },
      },
    ],
    places: [],
    people: [],
  },
  {
    id: "1999",
    year: 1999,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "My first computer — self-taught C, Napster & WinMX",
        detail:
          "Finally my own machine at eleven: teaching myself C from scratch while nursing overnight MP3 queues on Napster and WinMX.",
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Early C Forums & P2P Underground",
        span: "1999–2003",
        detail:
          "Plain-text C tutorials, compiler errors solved with strangers online, and dial-up file-sharing chatrooms.",
      },
    ],
  },
  {
    id: "2001",
    year: 2001,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Deus Ex, music & punk",
        detail:
          "Obsessed with nano-augmentations and conspiracies in Deus Ex — a rabbit hole that planted the seed for biomedical engineering — alongside loud punk records.",
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-3",
        title: "Daniele & Giovanni",
        span: "2001–",
        detail:
          "New close crew bonded over punk records, burned CDs, and late nights talking music and games.",
      },
    ],
  },
  {
    id: "2002",
    year: 2002,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Metal music",
        detail:
          "Moved from three-chord punk into heavy riffs, fast double-kick albums, and cranked guitar amps.",
        photo: {
          src: GuitarImg,
          alt: "Vintage silverface guitar combo amplifier",
          caption: "High-gain riffs & loud rehearsal rooms",
        },
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-1",
        title: "Francesca — first girlfriend",
        span: "2002–2010",
        detail:
          "Teenage years through university — eight formative years growing up together.",
      },
    ],
  },
  {
    id: "2007",
    year: 2007,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "University — Biomedical Engineering (#1 out of 1,000+)",
        detail:
          "Chose Biomedical Engineering directly because of Deus Ex, and ranked 1st overall out of more than 1,000 candidates on the entrance test.",
      },
    ],
    places: [],
    people: [],
  },
  {
    id: "2010-valencia",
    year: 2010,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Erasmus in Valencia & top 5% of course",
        detail:
          "Spanish exchange semester in Valencia while finishing in the top 5% of my Biomedical Engineering cohort.",
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Valencia · Spain",
        span: "2010",
        detail:
          "Erasmus life between campus labs, warm Mediterranean nights, and Malvarrosa beach.",
        photo: {
          src: ValenciaImg,
          alt: "Malvarrosa beach promenade and palms in Valencia, Spain",
          caption: "Valencia — Erasmus sunshine & turning-point year",
        },
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "End of first relationship",
        span: "2010",
        detail:
          "Closed an eight-year chapter with Francesca during a year of big transitions abroad.",
      },
    ],
  },
  {
    id: "2010-usa",
    year: 2010,
    yearLabel: "2010 · US",
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Case Western Reserve University — research & data science",
        detail:
          "Crossed the Atlantic for biomedical research and data science — writing signal-processing and machine-learning pipelines on real clinical datasets.",
        link: { label: "case.edu", href: "https://case.edu/" },
        photo: {
          src: LabImg,
          alt: "Tektronix analog oscilloscope displaying a clean waveform",
          caption: "Research bench & first deep dive into data science",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Cleveland, Ohio · USA",
        span: "2010–2011",
        detail:
          "Case Western campus along Euclid Avenue and Lake Erie winters.",
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "Case Western Research Lab",
        span: "2010–2011",
        detail:
          "Researchers and engineers working at the intersection of biosignals and data.",
      },
    ],
  },
  {
    id: "2011",
    year: 2011,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Politecnico di Milano — Electronics",
        detail:
          "Focused on hardware, analog/digital electronics, and instrumentation at Polimi.",
        link: { label: "polimi.it", href: "https://www.polimi.it/" },
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "Milano",
        span: "2011–2012",
        detail:
          "Lived in Milan — yellow trams rattling through Città Studi, espresso bars, and late lab evenings.",
        photo: {
          src: MilanImg,
          alt: "Historic yellow ATM Class 1500 tram on a Milan street",
          caption: "Living in Milano — Polimi & Città Studi",
        },
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Carla — second girlfriend",
        span: "2011–2019",
        detail:
          "Started an eight-year relationship in Milan that carried across the move to London.",
      },
    ],
  },
  {
    id: "2012",
    year: 2012,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Imperial College London",
        detail:
          "Moved to South Kensington to complete postgraduate biomedical engineering & software work at Imperial.",
        link: { label: "imperial.ac.uk", href: "https://www.imperial.ac.uk/" },
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "London · UK",
        span: "2012–",
        detail:
          "Landed at Exhibition Road with suitcases and a soldering iron; London became long-term home base.",
        photo: {
          src: LondonImg,
          alt: "Imperial College Queen's Tower and red bus in South Kensington, London",
          caption: "South Kensington — arriving at Imperial & London in 2012",
        },
      },
    ],
    people: [],
  },
  {
    id: "2013",
    year: 2013,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Graduation & founded Flicktek",
        detail:
          "Graduated and went straight into building Flicktek — biometric wrist wearables decoding finger gestures from tendon movement, leading to two granted patents.",
        link: {
          label: "Patent US11281301",
          href: "https://patents.google.com/patent/US11281301B2/en",
        },
        photo: {
          src: PcbImg,
          alt: "Close-up of copper traces on a printed circuit board",
          caption: "Early sensor PCB prototypes right out of university",
        },
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Flicktek Co-Founders & Hardware Engineers",
        span: "2013–2016",
        detail:
          "First startup trenches turning research sensors into wearable hardware.",
      },
    ],
  },
  {
    id: "2015",
    year: 2015,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "HAX Accelerator & SOSV in China",
        detail:
          "Joined HAX (backed by SOSV) to take Flicktek from prototype boards to manufacturable consumer hardware at Shenzhen speed.",
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Shenzhen · China",
        span: "2015–2016",
        detail:
          "Huaqiangbei component towers, factory floors, and morning schematics turned into PCBs by evening.",
        photo: {
          src: ShenzhenImg,
          alt: "Huaqiangbei electronics district skyline in Shenzhen",
          caption: "Shenzhen & HAX — hardware manufacturing speedrun",
        },
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "HAX & SOSV Cohort",
        span: "2015–2016",
        detail:
          "Hardware founders and mentors living inside factories and shipping against impossible deadlines.",
      },
    ],
  },
  {
    id: "2016",
    year: 2016,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Shipped 2,000 units of Clip — closed down Flicktek",
        detail:
          "Got 2,000 gesture-control Clip units off the assembly line and into backers' hands before winding Flicktek down — the hardest, sharpest education in hardware.",
      },
    ],
    places: [],
    people: [],
  },
  {
    id: "2017",
    year: 2017,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Zinc & co-founding Betterspace",
        detail:
          "Joined the Zinc venture builder in London and launched Betterspace — an enterprise mental-wellbeing platform used by Accenture and major employers.",
        link: { label: "betterspace.uk", href: "https://www.betterspace.uk/" },
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Zinc Cohort & Betterspace Team",
        span: "2017–2022",
        detail:
          "Founders, clinicians, and engineers building B2B wellbeing software from zero to acquisition.",
      },
    ],
  },
  {
    id: "2019",
    year: 2019,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [],
    places: [],
    people: [
      {
        lineId: "people-1",
        title: "Broke up with Carla",
        span: "2019",
        detail:
          "Parted ways after eight years together between Milan and London.",
      },
    ],
  },
  {
    id: "2020",
    year: 2020,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [],
    places: [],
    people: [
      {
        lineId: "people-1",
        title: "Met my new girlfriend — and future wife",
        span: "2020–",
        detail:
          "Started a new chapter together in 2020 that led all the way to getting married in 2026.",
      },
    ],
  },
  {
    id: "2022",
    year: 2022,
    activeLines: [
      "act-1",
      "place-1",
      "place-2",
      "people-1",
      "people-2",
      "people-3",
    ],
    activities: [
      {
        lineId: "act-1",
        title: "Sold Betterspace, travelled & built AI projects",
        detail:
          "Completed the Betterspace exit, took proper time out on the road, and went deep building hands-on AI products, medical/document extraction pipelines, and essays.",
        link: { label: "projects", href: "/#projects" },
        photo: {
          src: SkipperImg,
          alt: "Watercolor portrait of Alfredo wearing a skipper cap",
          caption: "Post-exit breather — travelling & hacking on AI",
          aspect: "portrait",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Post-Exit Travels",
        span: "2022–2023",
        detail:
          "Months living out of a backpack across new cities before diving back into code.",
      },
    ],
    people: [],
  },
  {
    id: "2024",
    year: 2024,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Joined Gotobeat as CTO",
        detail:
          "Full circle back to punk & metal roots: leading engineering and AI demand prediction for an operator putting on hundreds of live shows across the UK and Europe.",
        link: { label: "gotobeat.com", href: "https://gotobeat.com/tech" },
        photo: {
          src: GigImg,
          alt: "Sold-out marquee at Brixton Academy music venue in London",
          caption:
            "From burned CD-Rs in 2001 to packing live music rooms at Gotobeat",
        },
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Gotobeat Team, Promoters & Artists",
        span: "2024–",
        detail:
          "Engineers and bookers turning data models into packed grassroots venues.",
      },
    ],
  },
  {
    id: "2026",
    year: 2026,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Got married",
        detail:
          "Thirty-eight years from Cagliari to London — celebrating our wedding while shipping live music tech and weekend bio-hardware experiments.",
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "London & Sardinia",
        span: "2026",
        detail:
          "Home in London with deep roots always pulling back to Cagliari.",
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Married — six years on from 2020",
        span: "2026–",
        detail:
          "Surrounded by family from Sardinia, friends since five-year-old basketball and teenage punk bands, and everyone met along the way.",
      },
    ],
  },
];
