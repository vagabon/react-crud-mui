export const ObjectUtils = {
  capitalize(name: string) {
    return name?.length > 1 ? name[0].toUpperCase() + name.slice(1) : '';
  },
};
