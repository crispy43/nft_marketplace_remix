import type { Properties, Property } from 'csstype';

import { TwoOptionSize } from '~/types/style-types';

export enum PriceTagLogo {
  ETH = '/icons/eth-logo.svg',
  PsuB = '/icons/psub-logo.svg',
}

export type PriceTagProps = {
  size?: TwoOptionSize;
  logo: PriceTagLogo;
  color?: Property.Color;
  price: string;
  style?: Properties;
}

export default function PriceTag({
  size = TwoOptionSize.MD,
  logo,
  color,
  price,
  style,
}: PriceTagProps) {
  return (
    <div
      className='f-r-v-ct'
      style={style}
      data-price-tag={size}
    >
      <img
        src={logo}
        alt='price tag logo'
        style={{ color } as Properties}
      />
      <p style={{ color } as Properties}>
        {price}
      </p>
    </div>
  );
}
