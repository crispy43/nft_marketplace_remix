import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OutlineButton from '~/components/buttons/outline-button';
import AnimatedPlaceholder from '~/components/placeholders/animated-placeholder';
import InlineProfile from '~/components/profiles/inline-profile';
import PriceTag, { PriceTagLogo } from '~/components/tags/price-tag';
import { ExtendedSize, Size, TwoOptionSize } from '~/types/style-types';

export type MainEventItemProps = {
  item?: any;
}

export default function MainEventItem({
  item,
}: MainEventItemProps) {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(['f-r-h-ct', 'main-event-item-container'])}
      data-view='device-with-header'
    >
      <div data-contents>
        <div
          className='f-r-ct'
          style={{ marginTop: '140px' } as Properties}
        >
          <div
            className='f-c-v-sa'
            style={{
              height: '500px',
              marginRight: '90px',
            } as Properties}
          >
            <div>
              <h1
                data-font-size={ExtendedSize.TX}
                style={{ marginBottom: '36px' } as Properties}
              >
                <span data-font-weight='700'>
                  지금, 이 순간
                </span>
                <span data-font-weight='400'>
                  은 어때요?
                </span>
              </h1>
              <p
                data-font-size={Size.XL}
                data-body-text='2'
                style={{ lineHeight: '48px' } as Properties}
              >
                내 이름이 귀여워인가?
                <br />
                왜 다들 기여워라고 부르는건뎅?
              </p>
            </div>
            <div>
              <InlineProfile
                name='바로나'
                imageUrl='/images/samples/header-profile.png'
                size={TwoOptionSize.MD}
              />
              <div className={clsx(['f-r-h-sb', 'main-event-item-tag'])}>
                <div>
                  <label data-font-size={Size.MD}>
                    현재가
                  </label>
                  <PriceTag
                    size={TwoOptionSize.SM}
                    logo={PriceTagLogo.PsuB}
                    price='0.58'
                    style={{ margin: '23px 0 10px' } as Properties}
                  />
                  <p
                    data-font-size={Size.SM}
                    data-text-theme='sub-price'
                  >
                    $1,001.27
                  </p>
                </div>
                <div>
                  <label data-font-size={Size.MD}>
                    판매 종료까지
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='single-image-card'>
            <LazyLoadImage
              key={item.imageUrl}
              src={item.imageUrl}
              alt={item.id}
              beforeLoad={() => undefined}
              width={500}
              height={500}
              placeholder={<AnimatedPlaceholder />}
            />
          </div>
        </div>

        <div
          className='f-r-h-ct'
          style={{ marginTop: '80px' } as Properties}
        >
          <OutlineButton label='구매하기' />
        </div>
      </div>
    </div>
  );
}
