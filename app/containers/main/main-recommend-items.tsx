import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import PostCard from '~/components/cards/post-card';
import { ExtendedSize } from '~/types/style-types';

export type MainRecommendItemsProps = {
  items?: any;
}

export default function MainRecommendItems({
  items,
}: MainRecommendItemsProps) {
  const { t } = useTranslation();

  return (
    <div
      className='f-r-h-ct'
      data-offset='expanded'
    >
      <div
        className='f-c-h-ct'
        data-offset='contents'
      >
        <h1
          data-font-size={ExtendedSize.TX}
          style={{ margin: '166px 0 90px' } as Properties}
        >
          <span data-font-weight='400'>
            우리,&nbsp;
          </span>
          <span data-font-weight='700'>
            취향을 공유
          </span>
          <span data-font-weight='400'>
            하는 사이
          </span>
        </h1>
        <div
          className='f-r-h-sb'
          style={{
            width: '1400px',
            marginBottom: '130px',
          } as Properties}
        >
          <PostCard
            item={items[0]}
          />
          <PostCard
            item={items[1]}
          />
          <PostCard
            item={items[2]}
          />
        </div>
      </div>
    </div>
  );
}
