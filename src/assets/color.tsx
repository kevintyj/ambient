import { darkMode } from "../components/shared/darkModeToggle";

const BaseColorScaleDark: Record<string, Record<string, string>> = {
  "NEUTRAL": {
    "00": "#1b1d1c",
    "01": "#262727",
    "02": "#414342",
    "03": "#585a59",
    "04": "#747776",
    "05": "#a0a2a1",
    "06": "#abadac",
    "07": "#b2b4b3",
    "08": "#c9cbca",
    "09": "#eff1f0",
  },
  "OCEAN": {
    "100": "#171c24",
    "200": "#172336",
    "300": "#152a46",
    "400": "#143355",
    "500": "#0a64ae",
    "600": "#0679d2",
    "700": "#1893f6",
    "800": "#4caafa",
    "900": "#72bcfb",
    "1000": "#c2e2fd"
  },
  "BLUE": {
    "100": "#181923",
    "200": "#171a33",
    "300": "#171b42",
    "400": "#16204f",
    "500": "#1235a1",
    "600": "#1b41c1",
    "700": "#2b50e2",
    "800": "#5670e5",
    "900": "#788bea",
    "1000": "#c5cdf6"
  },
  "INDIGO": {
    "100": "#171721",
    "200": "#15152e",
    "300": "#14133b",
    "400": "#1a1147",
    "500": "#2d088e",
    "600": "#3b05aa",
    "700": "#4c0cc7",
    "800": "#6e3cd0",
    "900": "#8960d7",
    "1000": "#ccbaee"
  },
  "VIOLET": {
    "100": "#1a1721",
    "200": "#1d162f",
    "300": "#21143b",
    "400": "#291747",
    "500": "#4a1d8b",
    "600": "#5a24a6",
    "700": "#6d2fc2",
    "800": "#8756cb",
    "900": "#9d75d4",
    "1000": "#d5c3ec"
  },
  "CRIMSON": {
    "100": "#21171d",
    "200": "#2f1521",
    "300": "#3d1327",
    "400": "#4c172f",
    "500": "#9e285a",
    "600": "#bf346d",
    "700": "#e14785",
    "800": "#ea6c9e",
    "900": "#f189b2",
    "1000": "#f9ccde"
  },
  "WINE": {
    "100": "#1d1719",
    "200": "#251517",
    "300": "#2e1316",
    "400": "#371118",
    "500": "#6d0721",
    "600": "#840928",
    "700": "#9d1635",
    "800": "#af4259",
    "900": "#bf6577",
    "1000": "#e3bcc4"
  },
  "RED": {
    "100": "#1f1719",
    "200": "#2a1517",
    "300": "#351315",
    "400": "#411116",
    "500": "#870819",
    "600": "#a30f21",
    "700": "#c31f2e",
    "800": "#d04b56",
    "900": "#db6f75",
    "1000": "#efc1c3"
  },
  "SUN": {
    "100": "#211719",
    "200": "#2f1517",
    "300": "#3e1316",
    "400": "#4c1517",
    "500": "#a3201b",
    "600": "#c62c23",
    "700": "#ea3e33",
    "800": "#f1655c",
    "900": "#f6837b",
    "1000": "#fbcac6"
  },
  "ORANGE": {
    "100": "#221a19",
    "200": "#341c16",
    "300": "#442114",
    "400": "#532813",
    "500": "#b04e08",
    "600": "#d56004",
    "700": "#fb7912",
    "800": "#fd9644",
    "900": "#fead6a",
    "1000": "#fedbbf"
  },
  "YELLOW": {
    "100": "#211f19",
    "200": "#322916",
    "300": "#413414",
    "400": "#504013",
    "500": "#ab8508",
    "600": "#cfa306",
    "700": "#f8c51a",
    "800": "#fcd756",
    "900": "#fde484",
    "1000": "#fef3ca"
  },
  "SAPLING": {
    "100": "#1d1f19",
    "200": "#242b16",
    "300": "#2c3614",
    "400": "#364218",
    "500": "#6d8925",
    "600": "#84a82e",
    "700": "#a2c940",
    "800": "#bad76f",
    "900": "#cde492",
    "1000": "#e9f3d0"
  },
  "GREEN": {
    "100": "#171d1b",
    "200": "#15261a",
    "300": "#132f1b",
    "400": "#113920",
    "500": "#077233",
    "600": "#048b3f",
    "700": "#0da750",
    "800": "#45ba75",
    "900": "#6fca92",
    "1000": "#c1e8d0"
  },
  "AURORA": {
    "100": "#171f1f",
    "200": "#152b28",
    "300": "#133730",
    "400": "#12433a",
    "500": "#1c8b74",
    "600": "#28a98d",
    "700": "#3bcbab",
    "800": "#6cd9c0",
    "900": "#90e4d1",
    "1000": "#cff3eb"
  },
  "CYAN": {
    "100": "#171f22",
    "200": "#152a30",
    "300": "#13363d",
    "400": "#11414a",
    "500": "#078899",
    "600": "#04a6b9",
    "700": "#09c8de",
    "800": "#4ed7e9",
    "900": "#7ce4f1",
    "1000": "#c6f3f9"
  }
}

const BaseColorScaleLight: Record<string, Record<string, string>> = {
  "NEUTRAL": {
    "00": "#f3f5f3",
    "01": "#eff1f0",
    "02": "#d0d2d1",
    "03": "#c2c5c4",
    "04": "#9b9d9c",
    "05": "#747776",
    "06": "#585a59",
    "07": "#414342",
    "08": "#262727",
    "09": "#1b1d1c",
  },
  "OCEAN": {
    "00": "#f3fcff",
    "01": "#e4f6fe",
    "02": "#cfeafd",
    "03": "#badefd",
    "04": "#68b7fa",
    "05": "#4eabfa",
    "06": "#1893f6",
    "07": "#036abe",
    "08": "#06488d",
    "09": "#03284e",
  },
  "BLUE": {
    "00": "#f2f3fc",
    "01": "#e3e6f9",
    "02": "#d0d5f6",
    "03": "#bdc6f5",
    "04": "#7085ea",
    "05": "#5872e6",
    "06": "#2b50e2",
    "07": "#0c35af",
    "08": "#0b1f82",
    "09": "#061148",
  },
  "INDIGO": {
    "00": "#f4eefa",
    "01": "#e7dcf6",
    "02": "#d6c5f2",
    "03": "#c5b1ec",
    "04": "#8357d7",
    "05": "#6f3ed0",
    "06": "#4c0cc7",
    "07": "#2b0199",
    "08": "#130070",
    "09": "#0a003d",
  },
  "VIOLET": {
    "00": "#f6f1fb",
    "01": "#ece1f6",
    "02": "#ddcdf2",
    "03": "#cfbbeb",
    "04": "#996dd4",
    "05": "#8958cc",
    "06": "#6d2fc2",
    "07": "#4d1996",
    "08": "#320b6f",
    "09": "#1c063d",
  },
  "CRIMSON": {
    "00": "#fdf5fa",
    "01": "#fce8f2",
    "02": "#fad7e6",
    "03": "#f9c5d9",
    "04": "#f082ad",
    "05": "#ea6e9f",
    "06": "#e14785",
    "07": "#ac265e",
    "08": "#7d0d3c",
    "09": "#450721",
  },
  "WINE": {
    "00": "#faeff1",
    "01": "#f4dde1",
    "02": "#ebc7ce",
    "03": "#e0b3bc",
    "04": "#bc5d71",
    "05": "#b0445b",
    "06": "#9d1635",
    "07": "#75001d",
    "08": "#52000c",
    "09": "#2d0007",
  },
  "RED": {
    "00": "#fcf1f1",
    "01": "#f8e0e0",
    "02": "#f5cbcd",
    "03": "#eeb8bb",
    "04": "#d9666d",
    "05": "#d04d58",
    "06": "#c31f2e",
    "07": "#920114",
    "08": "#660007",
    "09": "#380004",
  },
  "SUN": {
    "00": "#fef4f2",
    "01": "#fde7e3",
    "02": "#fbd4d0",
    "03": "#fbc2be",
    "04": "#f67c73",
    "05": "#f1675e",
    "06": "#ea3e33",
    "07": "#b21c16",
    "08": "#7f0808",
    "09": "#460405",
  },
  "ORANGE": {
    "00": "#fffaf2",
    "01": "#fff2e1",
    "02": "#fee5cb",
    "03": "#fed7b6",
    "04": "#fda660",
    "05": "#fd9746",
    "06": "#fb7912",
    "07": "#c15100",
    "08": "#8e3100",
    "09": "#4e1b00",
  },
  "YELLOW": {
    "00": "#fffef8",
    "01": "#fffcec",
    "02": "#fefad9",
    "03": "#fef2c3",
    "04": "#fde177",
    "05": "#fcd758",
    "06": "#f8c51a",
    "07": "#bb9000",
    "08": "#866400",
    "09": "#4a3700",
  },
  "SAPLING": {
    "00": "#fdfef8",
    "01": "#f9fced",
    "02": "#f2f9dd",
    "03": "#e7f2ca",
    "04": "#c8e188",
    "05": "#bbd870",
    "06": "#a2c940",
    "07": "#749521",
    "08": "#4e690b",
    "09": "#2b3a06",
  },
  "GREEN": {
    "00": "#f3fbf6",
    "01": "#e3f7ea",
    "02": "#cef0da",
    "03": "#b8e5ca",
    "04": "#64c68b",
    "05": "#47bb77",
    "06": "#0da750",
    "07": "#007a32",
    "08": "#00561c",
    "09": "#002f0f",
  },
  "AURORA": {
    "00": "#f8fefd",
    "01": "#edfbfa",
    "02": "#dcf9f3",
    "03": "#c9f3e9",
    "04": "#86e3cd",
    "05": "#6edac1",
    "06": "#3bcbab",
    "07": "#18967c",
    "08": "#026a55",
    "09": "#013a2f",
  },
  "CYAN": {
    "00": "#f6fefe",
    "01": "#e9fcfd",
    "02": "#d6f9fb",
    "03": "#bff2f9",
    "04": "#70e1f0",
    "05": "#50d8e9",
    "06": "#09c8de",
    "07": "#0093a6",
    "08": "#006776",
    "09": "#003941",
  }
}

export const colors = () => darkMode() ? BaseColorScaleDark : BaseColorScaleLight;
export const colorsArr = () => Object.values(darkMode() ? BaseColorScaleDark : BaseColorScaleLight).map((obj) => {return Object.values(obj)});
