/* eslint-disable react/jsx-indent */
import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { TwoOptionSize } from '~/types/style-types';

import AnimatedPlaceholder from '../placeholders/animated-placeholder';
import InlineProfile from '../profiles/inline-profile';
import PriceTag, { PriceTagLogo } from '../tags/price-tag';

export type NftCardProps = {
  item: any;
  style?: Properties;
}

export default function NftCard({
  item,
  style,
}: NftCardProps) {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={clsx(['f-c', 'nft-card'])}
      data-nft-card
      style={style}
    >
      <LazyLoadImage
        key={item.imageUrl}
        src={item.imageUrl}
        alt={item.id}
        beforeLoad={() => setIsLoaded(true)}
        width={500}
        height={500}
        placeholder={<AnimatedPlaceholder />}
      />

      {isLoaded
        ? <>
            <div className='nft-card-like'>
              {item.isLiked !== undefined && (item.isLiked
                ? <img
                    src='/icons/like-red.svg'
                    alt='liked icon'
                    icon-button={TwoOptionSize.MD}
                  />
                : <img
                    src='/icons/like-white.svg'
                    alt="don't liked icon"
                    icon-button={TwoOptionSize.MD}
                  />
              )}
            </div>
            <div className='nft-card-tag'>
              <InlineProfile
                size={TwoOptionSize.SM}
                imageUrl='/images/samples/header-profile.png'
                name='honggildong'
                style={{ flex: '1' } as Properties}
              />
              <PriceTag
                size={TwoOptionSize.SM}
                logo={PriceTagLogo.ETH}
                price='100'
              />
            </div>
          </>
        : <AnimatedPlaceholder />}
    </div>
  );
}
