//Color pallate
type theme = {
  GRAY_TONES: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  PRIMARY: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  SECONDARY: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  SUCCESS: {
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    1000: string;
  };
  WARNING: string;
  ERROR: string;
  SHADES: {
    WHITE: string;
    BLACK: string;
  };
};

export const lightTheme: theme = {
  GRAY_TONES: {
    100: '#F6F4F5',
    200: '#D9D3D6',
    300: '#BAB5B8',
    400: '#9B979A',
    500: '#7D787A',
    600: '#635F61',
    700: '#524E50',
    800: '#3E3C3E',
    900: '#2A2829',
    1000: '#151415',
  },
  PRIMARY: {
    100: '#EAC1C1',
    200: '#E6B4B4',
    300: '#E0A4A4',
    400: '#DA9191',
    500: '#D27A7A',
    600: '#C85E5E',
    700: '#BC3C3C',
    800: '#AE1313',
    900: '#9E1111',
    1000: '#900F0F',
  },
  SECONDARY: {
    100: '#FFEEBB',
    200: '#FFEAAD',
    300: '#FFE69C',
    400: '#FFE187',
    500: '#FFDB6E',
    600: '#FFD350',
    700: '#FFCA2C',
    800: '#FFBF00',
    900: '#E8AE00',
    1000: '#D39E00',
  },
  SUCCESS: {
    100: '#D8EBAD',
    200: '#C1E582',
    300: '#91D121',
    400: '#638F17',
    500: '#527613',
    600: '#44610F',
    700: '#38500D',
    800: '#2E420B',
    900: '#263709',
    1000: '#233208',
  },
  WARNING: '#FF8A00',
  ERROR: '#dd0426',
  SHADES: {
    WHITE: '#FFFFFF',
    BLACK: '#000000',
  },
};

export const darkTheme: theme = {
  GRAY_TONES: {
    100: '#0B090A',
    200: '#211C1E',
    300: '#353133',
    400: '#494648',
    500: '#726E70',
    600: '#A09C9E',
    700: '#B2AEB0',
    800: '#C3C1C3',
    900: '#D7D5D6',
    1000: '#EBEAEB',
  },
  PRIMARY: {
    100: '#3D1515',
    200: '#4D1919',
    300: '#5B1F1F',
    400: '#6F2525',
    500: '#852E2E',
    600: '#A03737',
    700: '#C34141',
    800: '#EC5151',
    900: '#EF6262',
    1000: '#F07070',
  },
  SECONDARY: {
    100: '#423200',
    200: '#523D00',
    300: '#614900',
    400: '#7A5C00',
    500: '#8F6B00',
    600: '#AD8200',
    700: '#D19D00',
    800: '#FFBF00',
    900: '#FFC61A',
    1000: '#FFCB2E',
  },
  SUCCESS: {
    100: '#3F5214',
    200: '#5A7F1A',
    300: '#9EDF30',
    400: '#BBE76E',
    500: '#C7EC89',
    600: '#D3F09E',
    700: '#DBF2B0',
    800: '#E0F4BE',
    900: '#E4F6C6',
    1000: '#E9F7CF',
  },
  WARNING: '#FF8800',
  ERROR: '#FB2343',
  SHADES: {
    //this does not make sense, but it has to be inversed for the theme
    WHITE: '#000000',
    BLACK: '#FFFFFF',
  },
};
