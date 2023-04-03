import { useTranslation } from 'react-i18next';

import { Size } from '~/types/style-types';

export default function UnderlineSearchInput() {
  const { t } = useTranslation();

  return (
    <div
      className='underline-search-input'
      flex-box='vertical-center'
      border-line='bottom'
    >
      <img
        src='/icons/search.svg'
        alt='search icon'
      />
      <input
        type='text'
        className='underline-search-input'
        placeholder='Search...'
        font-size={Size.SM}
      />
    </div>
  );
}
