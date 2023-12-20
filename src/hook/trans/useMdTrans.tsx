import { Trans, useTranslation } from 'react-i18next';

const Mdtrans = Trans;

export const useMdTrans = () => {
  const { t } = useTranslation();

  return { t };
};

export default Mdtrans;
