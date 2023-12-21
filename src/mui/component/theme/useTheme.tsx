import { PaletteColorOptions, PaletteOptions, ThemeOptions, createTheme } from '@mui/material';

interface ICustomPalette extends PaletteOptions {
  google: PaletteColorOptions;
  facebook: PaletteColorOptions;
}

interface ICustomTheme extends ThemeOptions {
  palette: ICustomPalette;
}

export type ITheme = ICustomTheme;

export const useTheme = (newTheme: ITheme) => {
  const theme = createTheme(newTheme);

  return { theme };
};
