import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import NftCard from '../cards/nft-card';

export type NftCardsGridProps = {
  items: any;
}

export default function NftCardsGrid({
  items,
}: NftCardsGridProps) {
  const { t } = useTranslation();

  return (
    <div className='nft-cards-container'>
      {items.map((item: any, i: number) =>
        <NftCard
          key={item.id}
          item={item}
          style={{ marginBottom: '75px' } as Properties}
        />,
      )}
    </div>
  );
}
