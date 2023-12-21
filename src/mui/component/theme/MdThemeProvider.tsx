import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { ITheme, useTheme } from './useTheme';

interface IMdThemeProviderProps {
  theme: ITheme;
  children: ReactNode;
}

const MdThemeProvider: React.FC<IMdThemeProviderProps> = (props) => {
  const { theme } = useTheme(props.theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default MdThemeProvider;
