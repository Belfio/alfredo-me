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

export type LineId = "activities" | "places" | "people";

export type BioLineMeta = {
  id: LineId;
  label: string;
  color: string;
};

export const BIO_LINES: BioLineMeta[] = [
  {
    id: "activities",
    label: "Activities & Achievements",
    color: "#1c1917",
  },
  {
    id: "places",
    label: "Places",
    color: "#b45309",
  },
  {
    id: "people",
    label: "People",
    color: "#0f766e",
  },
];

export type TextSegment = string | { text: string; href: string };

export type BioPhoto = {
  src: string;
  alt: string;
  aspect?: "landscape" | "portrait";
};

export type BioStopItem = {
  lineId: LineId;
  segments: TextSegment[];
};

export type BioStop = {
  id: string;
  year: string;
  items: BioStopItem[];
  photo?: BioPhoto;
};

// Reverse chronological: 2026 (now) back to 1988
export const BIO_STOPS: BioStop[] = [
  {
    id: "2026",
    year: "2026",
    items: [
      {
        lineId: "people",
        segments: [
          "Got married — ",
          { text: "alfandtrin.com", href: "https://alfandtrin.com" },
        ],
      },
    ],
  },
  {
    id: "2024",
    year: "2024",
    items: [
      {
        lineId: "activities",
        segments: [
          "Joined ",
          { text: "Gotobeat", href: "https://gotobeat.com" },
          " as CTO to create the operating system of live music",
        ],
      },
    ],
    photo: {
      src: GigImg,
      alt: "Sold-out marquee at Brixton Academy music venue in London",
    },
  },
  {
    id: "2022",
    year: "2022",
    items: [
      {
        lineId: "activities",
        segments: [
          "Sold ",
          { text: "Betterspace", href: "https://www.betterspace.uk/" },
          ", travelled & worked on ",
          { text: "AI projects", href: "/#projects" },
        ],
      },
    ],
    photo: {
      src: SkipperImg,
      alt: "Watercolor portrait of Alfredo wearing a skipper cap",
      aspect: "portrait",
    },
  },
  {
    id: "2020",
    year: "2020",
    items: [
      {
        lineId: "people",
        segments: ["Trinity (future wife)"],
      },
    ],
  },
  {
    id: "2019",
    year: "2019",
    items: [
      {
        lineId: "people",
        segments: ["Broke up with Carla"],
      },
    ],
  },
  {
    id: "2017",
    year: "2017",
    items: [
      {
        lineId: "activities",
        segments: [
          { text: "Zinc", href: "https://www.zinc.vc/" },
          " & ",
          { text: "Betterspace", href: "https://www.betterspace.uk/" },
        ],
      },
    ],
  },
  {
    id: "2016",
    year: "2016",
    items: [
      {
        lineId: "activities",
        segments: [
          "Shipped 2,000 units of Clip · closed down ",
          {
            text: "Flicktek",
            href: "https://patents.google.com/patent/US11281301B2/en",
          },
        ],
      },
    ],
  },
  {
    id: "2015",
    year: "2015",
    items: [
      {
        lineId: "activities",
        segments: [
          { text: "HAX", href: "https://hax.co/" },
          " & ",
          { text: "SOSV", href: "https://sosv.com/" },
        ],
      },
      {
        lineId: "places",
        segments: [
          {
            text: "Shenzhen, China",
            href: "https://en.wikipedia.org/wiki/Shenzhen",
          },
        ],
      },
    ],
    photo: {
      src: ShenzhenImg,
      alt: "Huaqiangbei electronics district skyline in Shenzhen",
    },
  },
  {
    id: "2013",
    year: "2013",
    items: [
      {
        lineId: "activities",
        segments: [
          "Graduation & ",
          {
            text: "Flicktek",
            href: "https://patents.google.com/patent/US11281301B2/en",
          },
        ],
      },
    ],
    photo: {
      src: PcbImg,
      alt: "Close-up of copper traces on a printed circuit board",
    },
  },
  {
    id: "2012",
    year: "2012",
    items: [
      {
        lineId: "activities",
        segments: [
          {
            text: "Imperial College London",
            href: "https://www.imperial.ac.uk/",
          },
        ],
      },
      {
        lineId: "places",
        segments: [
          { text: "London, UK", href: "https://en.wikipedia.org/wiki/London" },
        ],
      },
    ],
    photo: {
      src: LondonImg,
      alt: "Imperial College Queen's Tower and red bus in South Kensington, London",
    },
  },
  {
    id: "2011",
    year: "2011",
    items: [
      {
        lineId: "activities",
        segments: [
          { text: "Politecnico di Milano", href: "https://www.polimi.it/" },
          " — M.Sc in Biomedical Engineering and Electronics",
        ],
      },
      {
        lineId: "places",
        segments: [
          "Lived in ",
          { text: "Milano", href: "https://en.wikipedia.org/wiki/Milan" },
        ],
      },
      {
        lineId: "people",
        segments: ["Second girlfriend, Carla"],
      },
    ],
    photo: {
      src: MilanImg,
      alt: "Historic yellow ATM Class 1500 tram on a Milan street",
    },
  },
  {
    id: "2010-usa",
    year: "2010",
    items: [
      {
        lineId: "activities",
        segments: [
          {
            text: "Case Western Reserve University",
            href: "https://case.edu/",
          },
          " — research & data science",
        ],
      },
      {
        lineId: "places",
        segments: [
          {
            text: "Cleveland, USA",
            href: "https://en.wikipedia.org/wiki/Cleveland",
          },
        ],
      },
    ],
    photo: {
      src: LabImg,
      alt: "Tektronix analog oscilloscope displaying a clean waveform",
    },
  },
  {
    id: "2010-valencia",
    year: "2010",
    items: [
      {
        lineId: "activities",
        segments: ["Erasmus — top 5% on my course"],
      },
      {
        lineId: "places",
        segments: [
          {
            text: "Valencia, Spain",
            href: "https://en.wikipedia.org/wiki/Valencia",
          },
        ],
      },
      {
        lineId: "people",
        segments: ["Broke up with Francesca"],
      },
    ],
    photo: {
      src: ValenciaImg,
      alt: "Malvarrosa beach promenade and palms in Valencia, Spain",
    },
  },
  {
    id: "2007",
    year: "2007",
    items: [
      {
        lineId: "activities",
        segments: [
          "Biomedical Engineering at ",
          { text: "University of Cagliari", href: "https://www.unica.it/" },
          " (because of ",
          {
            text: "Deus Ex",
            href: "https://en.wikipedia.org/wiki/Deus_Ex_(video_game)",
          },
          ") — 1st out of 1,000+ on entrance test",
        ],
      },
    ],
  },
  {
    id: "2002",
    year: "2002",
    items: [
      {
        lineId: "activities",
        segments: ["Metal music"],
      },
      {
        lineId: "people",
        segments: ["First girlfriend, Francesca"],
      },
    ],
    photo: {
      src: GuitarImg,
      alt: "Vintage silverface guitar combo amplifier",
    },
  },
  {
    id: "2001",
    year: "2001",
    items: [
      {
        lineId: "activities",
        segments: [
          {
            text: "Deus Ex",
            href: "https://en.wikipedia.org/wiki/Deus_Ex_(video_game)",
          },
          ", music & punk",
        ],
      },
      {
        lineId: "people",
        segments: ["Friends — Daniele & Giovanni"],
      },
    ],
  },
  {
    id: "1999",
    year: "1999",
    items: [
      {
        lineId: "activities",
        segments: [
          "My first computer — self-taught C, ",
          { text: "Napster", href: "https://en.wikipedia.org/wiki/Napster" },
          " & ",
          { text: "WinMX", href: "https://en.wikipedia.org/wiki/WinMX" },
        ],
      },
    ],
  },
  {
    id: "1997",
    year: "1997",
    items: [
      {
        lineId: "activities",
        segments: [
          { text: "Carmageddon", href: "/carmageddon" },
          " & 54k internet",
        ],
      },
    ],
    photo: {
      src: ModemImg,
      alt: "Analog 56k dial-up modem with red status LEDs",
    },
  },
  {
    id: "1993",
    year: "1993",
    items: [
      {
        lineId: "activities",
        segments: [
          {
            text: "Mac",
            href: "https://en.wikipedia.org/wiki/Macintosh_Classic",
          },
          " computer & basketball",
        ],
      },
      {
        lineId: "people",
        segments: ["Met Davide, Giacomo & Pasquale"],
      },
    ],
    photo: {
      src: Mac93Img,
      alt: "Compact Apple Macintosh Classic computer with keyboard and mouse",
    },
  },
  {
    id: "1992",
    year: "1992",
    items: [
      {
        lineId: "activities",
        segments: [
          { text: "Olivetti", href: "https://en.wikipedia.org/wiki/Olivetti" },
          " computer games at home",
        ],
      },
    ],
    photo: {
      src: OlivettiImg,
      alt: "Vintage Olivetti personal computer with CRT monitor and keyboard",
    },
  },
  {
    id: "1988",
    year: "1988",
    items: [
      {
        lineId: "places",
        segments: [
          "Born in ",
          {
            text: "Cagliari, Sardinia",
            href: "https://en.wikipedia.org/wiki/Cagliari",
          },
        ],
      },
    ],
    photo: {
      src: CagliariImg,
      alt: "Aerial view of Poetto beach and bay in Cagliari, Sardinia",
    },
  },
];
