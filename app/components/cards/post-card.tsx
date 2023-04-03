/* eslint-disable react/jsx-indent */
import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { TwoOptionSize } from '~/types/style-types';

import OutlineButton from '../buttons/outline-button';
import AnimatedPlaceholder from '../placeholders/animated-placeholder';
import InlineProfile from '../profiles/inline-profile';

export type PostCardProps = {
  item: any;
  style?: Properties;
}

export default function PostCard({
  item,
  style,
}: PostCardProps) {
  const { t } = useTranslation();
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={clsx(['f-c', 'post-card'])}
      data-post-card
      style={style}
    >
      <LazyLoadImage
        key={item.imageUrl}
        src={item.imageUrl}
        alt={item.id}
        beforeLoad={() => setIsLoaded(true)}
        width={400}
        height={400}
        placeholder={<AnimatedPlaceholder />}
      />
      {isLoaded
        ? <div className='pose-card-info'>
            <div
              className='post-card-tag'
              data-border-line='bottom'
            >
              <InlineProfile
                size={TwoOptionSize.SM}
                imageUrl='/images/samples/header-profile.png'
                name='honggildong'
                style={{ flex: '1' } as Properties}
              />
              <OutlineButton
                label='팔로우'
                size={TwoOptionSize.SM}
              />
            </div>
            <div className='post-card-desc'>
              <p>
                힙한 고양이에용
              </p>
            </div>
          </div>
        : <AnimatedPlaceholder />}
    </div>
  );
}
