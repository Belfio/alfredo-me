import SkipperImg from "@/assets/skipper.png";
import CagliariImg from "@/assets/bio/cagliari.jpg";
import OlivettiImg from "@/assets/bio/olivetti.jpg";
import Mac93Img from "@/assets/bio/mac93.jpg";
import ModemImg from "@/assets/bio/modem.jpg";
import GuitarImg from "@/assets/bio/guitar.jpg";
import MilanImg from "@/assets/bio/milan.jpg";
import LabImg from "@/assets/bio/lab.jpg";
import LondonImg from "@/assets/bio/london.jpg";
import PcbImg from "@/assets/bio/pcb.jpg";
import ShenzhenImg from "@/assets/bio/shenzhen.jpg";
import AlpsImg from "@/assets/bio/alps.jpg";
import GigImg from "@/assets/bio/gig.jpg";

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
    label: "Activities & Craft",
    shortLabel: "Craft",
    color: "#1c1917",
    softBg: "rgba(28, 25, 23, 0.06)",
  },
  {
    id: "place-1",
    group: "places",
    indexInGroup: 0,
    label: "Home Base",
    shortLabel: "Base",
    color: "#b45309",
    softBg: "rgba(180, 83, 9, 0.08)",
  },
  {
    id: "place-2",
    group: "places",
    indexInGroup: 1,
    label: "Courts & Stints",
    shortLabel: "Stints",
    color: "#c2410c",
    softBg: "rgba(194, 65, 12, 0.08)",
  },
  {
    id: "people-1",
    group: "people",
    indexInGroup: 0,
    label: "Family & Roots",
    shortLabel: "Roots",
    color: "#0f766e",
    softBg: "rgba(15, 118, 110, 0.08)",
  },
  {
    id: "people-2",
    group: "people",
    indexInGroup: 1,
    label: "Mentors & Builders",
    shortLabel: "Builders",
    color: "#0369a1",
    softBg: "rgba(3, 105, 161, 0.08)",
  },
  {
    id: "people-3",
    group: "people",
    indexInGroup: 2,
    label: "Friends & Crew",
    shortLabel: "Crew",
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
  year: number;
  endYear?: number;
  activeLines: LineId[];
  activities: BioEntry[];
  places: BioEntry[];
  people: BioEntry[];
};

export const BIO_CHAPTERS: BioChapter[] = [
  {
    year: 1988,
    activeLines: ["act-1", "place-1", "people-1"],
    activities: [
      {
        lineId: "act-1",
        title: "Born in Cagliari",
        detail:
          "Day one on the southern coast of Sardinia — bright Mediterranean light, warm maestrale wind off the gulf, and salt air in every room.",
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "Cagliari · Sardinia",
        span: "1988–2006",
        detail:
          "Sun-bleached limestone bastions, pink flamingos in the lagoons, and the long curve of Poetto beach under Sella del Diavolo.",
        photo: {
          src: CagliariImg,
          alt: "Aerial view of Poetto beach and bay in Cagliari, Sardinia",
          caption: "Golfo degli Angeli & Poetto, Cagliari — line #1 starts here",
        },
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Parents & Sardinian Family",
        span: "1988–",
        detail:
          "Big Sunday lunches that stretched past four o'clock, shelves full of tools and manuals, and patience for a kid who took everything apart.",
      },
    ],
  },
  {
    year: 1992,
    activeLines: ["act-1", "place-1", "people-1"],
    activities: [
      {
        lineId: "act-1",
        title: "Olivetti computer games at home",
        detail:
          "Age four, kneeling on a dining chair in front of the family Olivetti CRT, memorising floppy-disk boot commands just to launch DOS games.",
        photo: {
          src: OlivettiImg,
          alt: "Vintage Olivetti M24 personal computer with CRT monitor and keyboard",
          caption: "Beige Olivetti iron — first glowing phosphor screen at home",
        },
      },
    ],
    places: [],
    people: [],
  },
  {
    year: 1993,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Macintosh at five & starting basketball",
        detail:
          "Moved to a compact Apple Macintosh with its startup chime and one-button mouse, and laced up sneakers for minibasket the same year.",
        photo: {
          src: Mac93Img,
          alt: "Compact Apple Macintosh Classic computer with keyboard and mouse",
          caption: "1993 Macintosh on the desk — System 7 icons & happy Mac",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Cagliari Basketball Courts",
        span: "1993–2005",
        detail:
          "Echoing neighbourhood parquet and sun-baked outdoor hoops three afternoons a week.",
      },
    ],
    people: [
      {
        lineId: "people-3",
        title: "Davide, Giacomo & Pasquale",
        span: "1993–",
        detail:
          "Met on the basketball court at five years old — teammates from minibasket drills to endless summer afternoons and decades beyond.",
      },
    ],
  },
  {
    year: 1997,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Carmageddon & 54k dial-up internet",
        detail:
          "Afternoon mayhem in Carmageddon followed by the unmistakable screech-and-hiss of a 54k modem handshake tying up the house phone line.",
        link: { label: "play /carmageddon", href: "/carmageddon" },
        photo: {
          src: ModemImg,
          alt: "Analog 56k dial-up modem with red status LEDs",
          caption: "Blinking carrier LEDs — 'don't pick up the phone!'",
        },
      },
    ],
    places: [],
    people: [],
  },
  {
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
          "A dedicated tower in my bedroom at eleven: teaching myself pointers, loops, and C compilers from scratch while babysitting 4 KB/s MP3 queues on Napster and WinMX.",
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Late-Night IRC & C Tutorials",
        span: "1999–2004",
        detail:
          "Plain-text guides, Italian coding forums, and strangers debugging segfaults over dial-up past midnight.",
      },
    ],
  },
  {
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
          "Crawling through UNATCO air ducts and memorising four-digit keypads in Deus Ex while falling headfirst into music and blasting raw three-chord punk off burned Verbatim CD-Rs.",
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-3",
        title: "Sharpie CD-R Swaps",
        span: "2001–2005",
        detail:
          "Trading scratched punk mixes and game ISOs in backpack pockets with Davide, Giacomo, and Pasquale.",
      },
    ],
  },
  {
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
        title: "Metal music & loud amplifiers",
        detail:
          "Graduated from three chords to palm-muted metal riffs, double-kick records, and garage rehearsal amps turned up just past polite.",
        photo: {
          src: GuitarImg,
          alt: "Vintage silverface guitar combo amplifier",
          caption: "High-gain riffs & ringing ears after rehearsal",
        },
      },
    ],
    places: [],
    people: [],
  },
  {
    year: 2007,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Biomedical Engineering at Politecnico di Milano",
        detail:
          "Packed bags across the Tyrrhenian Sea for biosignal processing, muscle electrophysiology, and linear algebra fueled by 80-cent campus espressos.",
        link: { label: "polimi.it", href: "https://www.polimi.it/" },
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "Milan · Città Studi",
        span: "2007–2012",
        detail:
          "Winter fog, rattling yellow ATM 1500 trams down Via Pacini, and courtyard study marathons.",
        photo: {
          src: MilanImg,
          alt: "Historic yellow ATM Class 1500 tram on a Milan street",
          caption: "Line 19/33 rattle through Milan — alarm clock & commute",
        },
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "Prof. Ferretti's Biosignals Bench",
        span: "2008–2012",
        detail:
          "First lab bench where noisy EMG traces started looking like a decodable alphabet.",
      },
      {
        lineId: "people-3",
        title: "Marco & the Città Studi Flat",
        span: "2007–2012",
        detail:
          "Flatmates who insisted on cooking pasta at 1:15 a.m. the night before every control-theory exam.",
      },
    ],
  },
  {
    year: 2011,
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
        title: "Neural signal decoding at Case Western Reserve",
        detail:
          "Visiting research stint writing real-time biosignal classifiers and surviving Lake Erie blizzards at −18°C.",
        link: { label: "case.edu", href: "https://case.edu/" },
        photo: {
          src: LabImg,
          alt: "Tektronix analog oscilloscope displaying a clean waveform",
          caption: "Late-night bench trace, biomedical instrumentation lab",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Cleveland, Ohio",
        span: "2011–2012",
        detail:
          "Lake-effect snowbanks along Euclid Avenue, 24-hour diners, and quiet Sunday afternoons at the Cleveland Museum of Art.",
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "Dr. Lindqvist & Neural Lab Cohort",
        span: "2011–2014",
        detail:
          "Three researchers from three time zones sharing one oscilloscope and a two-liter thermos of filter coffee.",
      },
    ],
  },
  {
    year: 2013,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Imperial College London",
        detail:
          "Crossed the Channel for bioengineering & software; traded MATLAB scripts for C++, Python, and wearable sensor prototypes.",
        link: { label: "imperial.ac.uk", href: "https://www.imperial.ac.uk/" },
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "London · South Kensington to East London",
        span: "2013–2026",
        detail:
          "Arrived with two suitcases, a soldering iron, and naive optimism about British drizzle; stayed for thirteen years and counting.",
        photo: {
          src: LondonImg,
          alt: "South Kensington street in London with red double-decker bus",
          caption: "Exhibition Road & South Kensington — first London postcode",
        },
      },
    ],
    people: [
      {
        lineId: "people-3",
        title: "Samir & Claire",
        span: "2013–",
        detail:
          "Met over lukewarm cider after a Friday seminar; undefeated Sunday-roast and gig regulars ever since.",
      },
    ],
  },
  {
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
        title: "Flicktek & two gesture-recognition patents",
        detail:
          "Built biometric wrist sensors decoding finger micro-gestures from tendon biomechanics; backed by SOSV and awarded patents WO2015033327 & US11281301.",
        link: {
          label: "Patent US11281301",
          href: "https://patents.google.com/patent/US11281301B2/en",
        },
        photo: {
          src: PcbImg,
          alt: "Close-up of copper traces on a printed circuit board",
          caption: "Rev-4 sensor flex-PCB traces between firmware spins",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Shenzhen · Huaqiangbei",
        span: "2015–2016",
        detail:
          "Living ten minutes from ten-story electronics markets, turning schematic edits at breakfast into soldered boards by dinner.",
        photo: {
          src: ShenzhenImg,
          alt: "Huaqiangbei electronics district skyline in Shenzhen",
          caption: "Huaqiangbei — hardware speedrun capital of the world",
        },
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "SOSV Cohort & Master Chen",
        span: "2015–2017",
        detail:
          "Hardware founders running on oolong tea, plus a DFM tooling veteran who could spot a cold solder joint from three meters away.",
      },
    ],
  },
  {
    year: 2018,
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
        title: "Betterspace — enterprise mental wellbeing",
        detail:
          "Architected and scaled an employee wellbeing marketplace adopted by Accenture and global enterprises, taking it all the way from zero to exit.",
        link: { label: "betterspace.uk", href: "https://www.betterspace.uk/" },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Dolomites & Chamonix",
        span: "autumns '18–'19",
        detail:
          "High-ridge scrambles between product releases — best debugging happens above 2,400m with phone on airplane mode.",
        photo: {
          src: AlpsImg,
          alt: "Limestone peaks of the Dolomites rising above an alpine valley",
          caption: "Alta Via limestone ridges — annual head-clearing ritual",
        },
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "Betterspace Founding Crew",
        span: "2018–2022",
        detail:
          "Small Shoreditch room, giant whiteboard, and an agreement that nobody booked meetings before 10:30 a.m.",
      },
    ],
  },
  {
    year: 2020,
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
        title: "78%-hydration sourdough, Solana Rust & essays",
        detail:
          "Kept a fiercely active rye starter named Ohm, crossed 1900 rapid chess at 2 a.m., and began publishing notes on AI products and on-chain systems.",
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Sardinia Remote Autumn",
        span: "autumn 2020",
        detail:
          "Two quiet months shipping code near the sea in October light after lockdown lifted.",
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Sunday Video Lunches with Cagliari",
        span: "2020–2021",
        detail:
          "Synchronised family pasta lunches across time zones, complete with remote critique of malloreddus ridges.",
      },
    ],
  },
  {
    year: 2022,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Betterspace exit & early LLM pipelines",
        detail:
          "Closed the acquisition chapter, built green-lending software (GL1) for banks, and hacked on document-extraction agents before chat wrappers were everywhere.",
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-3",
        title: "Skipper joins the pack",
        span: "2022–",
        detail:
          "Border Collie, chief walk scheduler, and undefeated interceptor of airborne tennis balls across Hackney marshes.",
        photo: {
          src: SkipperImg,
          alt: "Ink and watercolor portrait of Skipper the Border Collie",
          caption: "Skipper — VP of Dawn Patrols & Morale",
          aspect: "portrait",
        },
      },
    ],
  },
  {
    year: 2024,
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
        title: "CTO at Gotobeat — AI-powered live music operator",
        detail:
          "Building demand-prediction models and promoter tooling to scout tour-ready artists, price rooms, and pack grassroots venues across the UK and Europe.",
        link: { label: "gotobeat.com", href: "https://gotobeat.com/tech" },
        photo: {
          src: GigImg,
          alt: "Sold-out marquee at Brixton Academy music venue in London",
          caption:
            "Sold-out London nights — from Napster MP3s and metal gigs to packing real venues",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Tokyo & Lisbon",
        span: "2024",
        detail:
          "Two weeks studying eight-seat vinyl kissaten in Shibuya followed by hills and cortados in Príncipe Real.",
      },
    ],
    people: [
      {
        lineId: "people-2",
        title: "Gotobeat Team, Bookers & Touring Bands",
        span: "2024–",
        detail:
          "Engineers, promoters, and soundcheck pros turning models into 500 people shouting the chorus back.",
      },
    ],
  },
  {
    year: 2026,
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
        title: "Pegasus Lab & fleets of coding agents",
        detail:
          "Prototyping bio-integrated sportswear (EMG + NIRS + closed-loop recovery) on weekends while running multi-agent engineering workflows and live tours by day.",
        link: { label: "Pegasus note", href: "/project/pegasus" },
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "London",
        span: "present",
        detail: "Home studio, morning park laps with Skipper, late gig curfews.",
      },
      {
        lineId: "place-2",
        title: "Cagliari & Milan",
        span: "frequent",
        detail:
          "Flying south whenever an excuse appears for espresso at the counter and a swim off Poetto.",
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Six lines still running",
        span: "1988 → 2026",
        detail:
          "Family in Sardinia, Davide, Giacomo & Pasquale since '93, builders in the trenches, and a Border Collie waiting by the door.",
      },
    ],
  },
];
