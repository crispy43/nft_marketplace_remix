import clsx from 'clsx';
import type { Properties } from 'csstype';
import type { ReactNode } from 'react';
import { useState } from 'react';

import { useTheme } from '~/hooks/theme-provider';
import { Theme } from '~/types/common-types';
import { Size } from '~/types/style-types';

export type ToggleContentProps = {
  children: ReactNode;
  title: string;
  isExpanded?: boolean;
  initShow?: boolean;
  style?: Properties;
}

export default function ToggleContent({
  children,
  title,
  isExpanded = true,
  initShow = false,
  style,
}: ToggleContentProps) {
  const [isShow, setIsShow] = useState(initShow);
  const [theme] = useTheme();

  return (
    <div
      className='toggle-content'
      data-offset={isExpanded && 'expanded'}
      data-toggle-border-color={isShow}
      style={style}
    >
      <div className='f-r-h-sb'>
        <div className={clsx(['f-r-h-ct', 'toggle-content-label'])}>
          <label
            data-font-size={Size.MD}
            data-font-weight='700'
            onClick={() => setIsShow(!isShow)}
          >
            {title}
          </label>
        </div>
        <img
          src={theme === Theme.LIGHT
            ? isShow
              ? '/icons/arrow-up-black.svg' : '/icons/arrow-down-silver.svg'
            : isShow
              ? '/icons/arrow-up-white.svg' : '/icons/arrow-down-gray.svg'}
          alt='arrow-up'
          data-no-selection='pointer'
          onClick={() => setIsShow(!isShow)}
        />
      </div>
      <div
        className='toggle-content-children'
        data-is-show={isShow}
      >
        {children}
      </div>
    </div>
  );
}
