import { Trans, useTranslation } from 'react-i18next';

const MDtrans = Trans;

export const useMdTrans = () => {
  const { t } = useTranslation();

  return { t };
};

export default MDtrans;
