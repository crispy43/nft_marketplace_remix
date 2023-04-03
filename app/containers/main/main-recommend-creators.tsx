import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import FocusableCarousel from '~/components/carousels/focusable-carousel';
import InlineProfile from '~/components/profiles/inline-profile';
import { ExtendedSize, TwoOptionSize } from '~/types/style-types';

export type MainRecommendCreatorsProps = {
  prop?: any;
}

export default function MainRecommendCreators({
  prop,
}: MainRecommendCreatorsProps) {
  const { t } = useTranslation();

  return (
    <div
      className='f-c-h-ct'
      data-offset='expanded'
    >
      <h1
        data-font-size={ExtendedSize.TX}
        style={{ margin: '91px 0 130px' } as Properties}
      >
        <span data-font-weight='400'>
          여기,&nbsp;
        </span>
        <span data-font-weight='700'>
          숨겨둔 보석
        </span>
        <span data-font-weight='400'>
          을 찾아서
        </span>
      </h1>
      <div
        className='f-r-h-sb'
        style={{ width: '100%' }}
      >
        <div
          style={{
            width: '35%',
            height: '600px',
            background: 'black',
            flexShrink: '0',
            zIndex: '20',
            margin: '30px 150px 0 0',
          } as Properties}
        >
          <div
            className='f-r'
            style={{
              justifyContent: 'flex-end',
              width: '500px',
              height: '600px',
              padding: '0 50px',
            } as Properties}
          >
            <InlineProfile
              size={TwoOptionSize.MD}
              imageUrl='/images/samples/header-profile.png'
              name='바로나'
            />
          </div>
        </div>
        <FocusableCarousel
          items={Array(10).fill({}).map((_, i) => {return {
            id: `${i + 1}`,
            imageUrl: '/images/samples/nft-sample-01.png',
          };})}
          style={{ zIndex: '10' } as Properties}
        />
      </div>
    </div>
  );
}
