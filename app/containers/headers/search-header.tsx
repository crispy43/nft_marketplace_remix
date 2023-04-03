import { Link } from '@remix-run/react';
import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import { useTheme } from '~/hooks/theme-provider';
import { Theme } from '~/types/common-types';
import { TwoOptionSize } from '~/types/style-types';

import UnderlineSearchInput from '../../components/forms/underline-search-input';

export type SearchHeaderProps = {
  locale: string;
  theme: Theme | null;
  showSearchBar?: boolean;
}

export default function SearchHeader({
  locale,
  theme,
  showSearchBar = false,
}: SearchHeaderProps) {
  const { t } = useTranslation();
  const [, setTheme] = useTheme();

  return (
    <div
      className={clsx(['f-r-ct', 'sticky-header', 'glassmorphism'])}
      data-offset='header'
      data-border-line='bottom'
    >
      <div
        className='f-r-h-sb'
        data-offset='contents'
      >
        {/* 좌측 로고, 검색바 */}
        <div className='f-r-v-ct'>
          <Link to='/main'>
            {theme == Theme.LIGHT
              ? <img
                  src='/images/psub-box-logo-red.svg'
                  alt='psub box logo'
                />
              : <img
                  src='/images/psub-box-logo-white.svg'
                  alt='psub box logo'
                />
            }
          </Link>
          {showSearchBar && <UnderlineSearchInput />}
        </div>

        {/* 우측 메뉴, 프로필 */}
        <div
          className={clsx(['f-r-v-ct', 'f-jc-sb'])}
          style={{ width: '510px' } as Properties}
        >
          <Link to='#'>
            <p data-font-weight='400'>둘러보기</p>
          </Link>
          <Link to='#'>
            <p data-font-weight='400'>피드</p>
          </Link>
          <Link to='#'>
            <p
              data-font-weight='700'
              style={{ color: 'var(--color-blue)' } as Properties}
            >
              업로드
            </p>
          </Link>
          <Link to='#'>
            {theme == Theme.LIGHT
              ? locale == 'en'
                ? <img
                    src='/icons/locale-kor-black.svg'
                    alt='locale korean'
                    data-icon-button
                    onClick={() => console.log('change to ko locale')}
                  />
                : <img
                    src='/icons/locale-eng-black.svg'
                    alt='locale english'
                    data-icon-button
                    onClick={() => console.log('change to en locale')}
                  />
              : locale == 'en'
                ? <img
                    src='/icons/locale-kor-white.svg'
                    alt='locale korean'
                    data-icon-button
                    onClick={() => console.log('change to ko locale')}
                  />
                : <img
                    src='/icons/locale-eng-white.svg'
                    alt='locale english'
                    data-icon-button
                    onClick={() => console.log('change to en locale')}
                  />
            }
          </Link>
          <Link to='/connect'>
            <img
              src='/images/samples/header-profile.png'
              alt='sample profile'
            />
          </Link>
          {theme == 'light'
            ? <img
                src='/icons/theme-dark.svg'
                alt='dark theme'
                data-icon-button={TwoOptionSize.SM}
                onClick={() => setTheme(Theme.DARK)}
              />
            : <img
                src='/icons/theme-light.svg'
                alt='light theme'
                data-icon-button={TwoOptionSize.SM}
                onClick={() => setTheme(Theme.LIGHT)}
              />
          }
        </div>
      </div>
    </div>
  );
}
