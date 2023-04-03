import type { Properties } from 'csstype';
import { useTranslation } from 'react-i18next';

import OutlineButton from '~/components/buttons/outline-button';
import ToggleContent from '~/components/buttons/toggle-content';
import { ExtendedSize } from '~/types/style-types';

export type MainQuestionsProps = {
  prop?: any;
}

export default function MainQuestions({
  prop,
}: MainQuestionsProps) {
  const { t } = useTranslation();

  return (
    <div
      className='f-r-h-ct'
      data-offset='expanded'
    >
      <div
        className='f-c-h-ct'
        data-offset='contents'
      >
        <h1 data-font-size={ExtendedSize.TX}>
          <span data-font-weight='700'>
            무엇이&nbsp;
          </span>
          <span data-font-weight='400'>
            궁금하세요?
          </span>
        </h1>
        <div
          style={{
            width: '1340px',
            margin: '106px 0 96px',
          } as Properties}
        >
          <ToggleContent
            title='title01'
          >
            <p>
              contentcontentcontentcontentcontentcontent
            </p>
          </ToggleContent>
          <ToggleContent
            title='title02'
          >
            <p>
              contentcontentcontentcontentcontentcontent
            </p>
          </ToggleContent>
          <ToggleContent
            title='title03'
          >
            <p>
              contentcontentcontentcontentcontentcontent
            </p>
          </ToggleContent>
          <ToggleContent
            title='title04'
          >
            <p>
              contentcontentcontentcontentcontentcontent
            </p>
          </ToggleContent>
        </div>
        <div style={{ marginBottom: '134px' } as Properties}>
          <OutlineButton
            label='더 보기'
          />
        </div> 
      </div>
    </div>
  );
}
