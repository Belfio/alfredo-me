import SkipperImg from "@/assets/skipper.png";
import AdriaticImg from "@/assets/bio/adriatic.jpg";
import SailingImg from "@/assets/bio/sailing.jpg";
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
    label: "Craft & Milestones",
    shortLabel: "Craft",
    color: "#18181b",
    softBg: "rgba(24, 24, 27, 0.06)",
  },
  {
    id: "place-1",
    group: "places",
    indexInGroup: 0,
    label: "Home Base",
    shortLabel: "Base",
    color: "#c2410c",
    softBg: "rgba(194, 65, 12, 0.08)",
  },
  {
    id: "place-2",
    group: "places",
    indexInGroup: 1,
    label: "Detours & Stints",
    shortLabel: "Detours",
    color: "#d97706",
    softBg: "rgba(217, 119, 6, 0.08)",
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
    label: "Friends & Pack",
    shortLabel: "Friends",
    color: "#4f46e5",
    softBg: "rgba(79, 70, 229, 0.08)",
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
        title: "Arrived two weeks early",
        detail:
          "Born during a late-summer Adriatic heatwave; reportedly slept straight through an August thunderstorm on night one.",
      },
    ],
    places: [
      {
        lineId: "place-1",
        title: "Ancona & the Marche Coast",
        span: "1988–2006",
        detail:
          "White limestone cliffs under Monte Conero, salt air on winter mornings, and pebble beaches ten minutes from home.",
        photo: {
          src: AdriaticImg,
          alt: "Monte Conero cliffs meeting the Adriatic Sea at sunset",
          caption: "Monte Conero & the Adriatic coast — home base #1",
        },
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Parents & Nonno Cesare",
        span: "1988–",
        detail:
          "Nonno Cesare, a retired marine draftsman, kept brass calipers, naval charts, and fountain pens in every desk drawer.",
      },
    ],
  },
  {
    year: 1994,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Reverse-engineered the family Moka & espresso machine",
        detail:
          "Successfully reassembled 90% of the kitchen espresso maker; carried three leftover brass washers in a pocket tin as good-luck charms.",
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Sibillini Mountains",
        span: "summers '94–'99",
        detail:
          "August weeks in a stone farmhouse at 1,100m with cold spring water, zero TV reception, and Perseid meteor counts.",
      },
    ],
    people: [
      {
        lineId: "people-3",
        title: "Matteo & the Cul-de-sac Time Trials",
        span: "1994–2006",
        detail:
          "Neighborhood bicycle sprints clocked to tenths of a second on a translucent Casio F-91W.",
      },
    ],
  },
  {
    year: 1998,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Linux off magazine CDs & youth regattas",
        detail:
          "Partitioned the family Pentium II to boot Slackware, then won a windy coastal dinghy race mostly by tacking ten seconds earlier than everyone else.",
        photo: {
          src: SailingImg,
          alt: "Small sailboats tacking across choppy coastal water",
          caption: "Coastal regatta season on the Adriatic, late '90s",
        },
      },
    ],
    places: [],
    people: [
      {
        lineId: "people-2",
        title: "Signor Bellini's Radio Bench",
        span: "1998–2003",
        detail:
          "Local hi-fi repairman who paid for Saturday sweeping in spare capacitors and taught how to trace a dead circuit by ear.",
      },
    ],
  },
  {
    year: 2003,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Basement guitar amps & first Pelikan M200",
        detail:
          "Played rhythm guitar in Teorema Zero (four loud gigs, one blown parish-hall fuse) and started keeping engineering notebooks in black fountain-pen ink.",
        photo: {
          src: GuitarImg,
          alt: "Vintage silverface Fender Twin Reverb guitar amplifier",
          caption: "Borrowed silverface combo — louder than any room we played",
        },
      },
    ],
    places: [
      {
        lineId: "place-2",
        title: "Dublin",
        span: "summer 2003",
        detail:
          "Four rainy July weeks meant for English grammar; mostly spent crate-digging second-hand vinyl off Dame Street.",
      },
    ],
    people: [
      {
        lineId: "people-3",
        title: "Lorenzo & Giulia",
        span: "2003–2011",
        detail:
          "Bandmates who spent forty minutes debating setlist transitions for a twenty-five-minute set.",
      },
    ],
  },
  {
    year: 2007,
    activeLines: ["act-1", "place-1", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Biomedical Engineering at Politecnico di Milano",
        detail:
          "Fell headfirst into biosignal processing, muscle electrophysiology, and linear algebra fueled by 80-cent campus espressos.",
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
        title: "Prof. Ferretti's Biosignals Group",
        span: "2008–2012",
        detail:
          "First lab bench where noisy EMG traces started looking like a decodable alphabet.",
      },
      {
        lineId: "people-3",
        title: "Davide (Via Pacini #4)",
        span: "2007–",
        detail:
          "Flatmate who insisted on cooking carbonara at 1:15 a.m. the night before every control-theory exam.",
      },
    ],
  },
  {
    year: 2011,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
    activities: [
      {
        lineId: "act-1",
        title: "Neural signal decoding at Case Western Reserve",
        detail:
          "Visiting research stint writing real-time signal classifiers and surviving Lake Erie blizzards at −18°C.",
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
        title: "Dr. Lindqvist & the Neural Lab Cohort",
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
          "Met over lukewarm cider after a Friday seminar; undefeated Sunday-roast and pub-quiz regulars ever since.",
      },
    ],
  },
  {
    year: 2015,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
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
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
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
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
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
        title: "Umbria Hilltop",
        span: "autumn 2020",
        detail:
          "Two quiet months shipping code from a stone table between olive groves and woodsmoke.",
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Sunday Zooms with Marche",
        span: "2020–2021",
        detail:
          "Synchronised family pasta lunches across time zones, complete with remote critique of sauce viscosity.",
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
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
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
          caption: "Sold-out London nights — turning streaming signals into loud rooms",
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
          "Engineers, promoters, and soundcheck pros turning spreadsheets and models into 500 people singing the chorus back.",
      },
    ],
  },
  {
    year: 2026,
    activeLines: ["act-1", "place-1", "place-2", "people-1", "people-2", "people-3"],
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
        title: "Milan & the Adriatic",
        span: "frequent",
        detail:
          "Still flying south whenever an excuse appears for espresso at the counter and a cold swim under Conero.",
      },
    ],
    people: [
      {
        lineId: "people-1",
        title: "Six lines still running",
        span: "1988 → 2026",
        detail:
          "Family on the coast, builders in the trenches, old friends on speed dial, and a Border Collie waiting by the door.",
      },
    ],
  },
];
