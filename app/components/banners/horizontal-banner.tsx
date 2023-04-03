import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

export type HorizontalBannerProps = {
  imageUrl?: any;
  linkTo?: any;
}

export default function HorizontalBanner({
  imageUrl,
  linkTo,
}: HorizontalBannerProps) {
  const { t } = useTranslation();

  return (
    <img
      src='/images/samples/ads-sample-01.png'
      alt='horizontal advertisement'
      data-no-selection='pointer'
      style={{
        width: '100%',
      } as Properties}
    />
  );
}
