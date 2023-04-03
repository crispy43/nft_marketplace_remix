import clsx from 'clsx';
import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import { Size } from '~/types/style-types';

export default function CompanyFooter() {
  const { t } = useTranslation();

  return (
    <div
      className='f-r-h-ct'
      data-offset='footer'
      data-border-line='top'
    >
      <div
        className={clsx(['f-r-h-sb'])}
        data-offset='contents'
        style={{
          alignItems: 'flex-end',
          paddingBottom: '33px',
        } as Properties}
      >
        <div>
          <img
            src='/images/psub-box-logo-compact-red.svg'
            alt='psub logo'
            style={{ marginBottom: '22px' } as Properties}
          />
          <p data-font-size={Size.ES}>
            © COPYRIGHT 2022 PsuB. ALL RIGHTS RESERVED.
          </p>
        </div>
        <div className='f-r-h-sb'>
          <p data-font-size={Size.SM}>
            법적고지
          </p>
          <div
            style={{ height: '16px', margin: '0 25px' } as Properties}
            data-border-line='right'
          />
          <p data-font-size={Size.SM}>
            개인정보처리방침
          </p>
          <div
            style={{ height: '16px', margin: '0 25px' } as Properties}
            data-border-line='right'
          />
          <p data-font-size={Size.SM}>
            이용약관
          </p>
        </div>
      </div>
    </div>
  );
}
