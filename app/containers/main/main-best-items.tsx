import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import OutlineButton from '~/components/buttons/outline-button';

import NftCardsGrid from '../../components/grids/nft-cards-grid';

export type MainBestItemsProps = {
  items: any;
}

export default function MainBestItems({
  items,
}: MainBestItemsProps) {
  const { t } = useTranslation();

  return (
    <div
      className='f-r-h-ct'
      data-offset='expanded'
    >
      <div data-offset='card-gird'>
        <div
          className='f-r-h-ct'
          style={{
            marginBottom: '48px',
          } as Properties}
        >
          <h1>
            오늘, 최고의 댕댕이
          </h1>
        </div>
        <NftCardsGrid items={items} />
        <div
          className='f-r-h-ct'
          style={{
            margin: '100px 0 195px',
          } as Properties}
        >
          <OutlineButton
            label='더 보기'
          />
        </div>
      </div>
    </div>
  );
}
