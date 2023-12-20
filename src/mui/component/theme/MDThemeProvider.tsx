import { CssBaseline, Theme, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import { ITheme, useTheme } from './useTheme';

interface IMDThemeProviderProps {
  theme: ITheme;
  children: ReactNode;
}

const MDThemeProvider: React.FC<IMDThemeProviderProps> = (props) => {
  const { theme } = useTheme(props.theme as Theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  );
};

export default MDThemeProvider;
