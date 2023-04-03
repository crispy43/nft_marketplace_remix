import type { Properties } from 'csstype';

import { TwoOptionSize } from '~/types/style-types';

export type OutlineButtonProps = {
  size?: TwoOptionSize;
  label: string;
  onClick?: () => void;
  style?: Properties;
}

export default function OutlineButton({
  size = TwoOptionSize.MD,
  label,
  onClick,
  style,
}: OutlineButtonProps) {
  return (
    <button
      className='outline-button'
      data-button={size}
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
