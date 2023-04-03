import { useTranslation } from 'react-i18next';

import HorizontalBanner from '~/components/banners/horizontal-banner';

export type BlockAdvertisingProps = {
  imageUrl?: any;
  linkTo?: any;
}

export default function BlockAdvertising({
  imageUrl,
  linkTo,
}: BlockAdvertisingProps) {
  const { t } = useTranslation();

  return (
    <div
      data-offset='block-ads'
      className='f-r-ct'
    >
      <div data-offset='contents'>
        <HorizontalBanner />
      </div>
    </div>
  );
}
