import { PaletteColorOptions, PaletteOptions, ThemeOptions } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { JSONObject } from '../../../dto/api/ApiDto';
import { ObjectUtils } from '../../../utils/object/ObjectUtils';
import { StorageUtils } from '../../../utils/storage/StorageUtils';

interface ICustomPalette extends PaletteOptions {
  google: PaletteColorOptions;
  facebook: PaletteColorOptions;
}

interface ICustomTheme extends ThemeOptions {
  palette: ICustomPalette;
}

export type ITheme = ICustomTheme;

export interface IPaletteDto {
  primary: string;
  secondary: string;
  info: string;
  success: string;
  error: string;
  google: string;
  facebook: string;
}

export type ModeType = 'light' | 'dark';

export const useTheme = (palette: JSONObject, darkMode?: ModeType) => {
  const [mode, setMode] = useState<ModeType>(darkMode ?? 'light');
  const [theme, setTheme] = useState<ITheme>();

  const showTheme = useCallback(
    (mode: ModeType) => {
      const suffixe = mode === 'dark' ? '-dark' : '';
      setTheme({
        palette: {
          mode: mode,
          primary: {
            main: ObjectUtils.getDtoString(palette, 'primary' + suffixe),
          },
          secondary: {
            main: ObjectUtils.getDtoString(palette, 'secondary' + suffixe),
          },
          info: {
            main: ObjectUtils.getDtoString(palette, 'info' + suffixe),
          },
          success: {
            main: ObjectUtils.getDtoString(palette, 'success' + suffixe),
          },
          error: {
            main: ObjectUtils.getDtoString(palette, 'error' + suffixe),
          },
          google: {
            main: ObjectUtils.getDtoString(palette, 'google'),
          },
          facebook: {
            main: ObjectUtils.getDtoString(palette, 'facebook'),
          },
        },
      });
    },
    [palette],
  );

  useEffect(() => {
    let storageMode = StorageUtils.getMode();
    if (!storageMode || (storageMode !== 'light' && storageMode !== 'dark')) {
      const darkBrowser = window.matchMedia('(prefers-color-scheme: dark)');
      storageMode = darkBrowser?.matches ? 'dark' : 'light';
    }
    setMode(storageMode as ModeType);
  }, []);

  useEffect(() => {
    showTheme(mode);
  }, [showTheme, mode]);

  const switchTheme = useCallback(
    (newMode: ModeType) => () => {
      const newModeAsync = newMode === 'light' ? 'dark' : 'light';
      StorageUtils.setMode(newModeAsync);
      setMode(newModeAsync);
    },
    [],
  );

  return { mode, theme, switchTheme };
};
