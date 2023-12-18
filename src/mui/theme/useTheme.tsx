import { PaletteColorOptions, Theme, createTheme } from '@mui/material';

interface CustomPalette {
  primary: PaletteColorOptions;
  google: PaletteColorOptions;
  facebook: PaletteColorOptions;
}

interface Palette extends CustomPalette {}
interface PaletteOptions extends CustomPalette {}

export type ITheme = Theme | { palette: Palette | PaletteOptions; typography: { htmlFontSize: number } };

export const useTheme = (newTheme: Theme) => {
  const theme = createTheme(newTheme);

  return { theme };
};
