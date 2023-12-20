export const WindowUtils = {
  getEnv: (name: string) => {
    return (window['ENV' as keyof Window]?.[name as keyof Window] as unknown as string) ?? 'NOT_FOUND';
  },
};
