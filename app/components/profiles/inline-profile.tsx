import type { Properties } from 'csstype';
import { Link } from 'react-router-dom';

import { TwoOptionSize } from '~/types/style-types';

export type InlineProfileProps = {
  size?: TwoOptionSize;
  imageUrl: string;
  name: string;
  linkTo?: string;
  style?: Properties;
}

export default function InlineProfile({
  size = TwoOptionSize.MD, 
  imageUrl,
  name,
  linkTo,
  style,
}: InlineProfileProps) {
  return (
    <Link
      to={linkTo ?? '#'}
      data-diabled-link={!linkTo}
      className='inline-profile'
      style={style}
    >
      <div
        className='f-r-v-ct'
        data-inline-profile={size}
      >
        <div>
          <img
            src={imageUrl}
            alt={name}
          />
        </div>
        <div className='inline-profile-name'>
          <p>
            {name}
          </p>
        </div>
      </div>
    </Link>
  );
}
