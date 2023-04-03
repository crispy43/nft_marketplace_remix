import type { ReactNode } from 'react';

import CompanyFooter from '~/containers/footers/company-footer';
import SearchHeader from '~/containers/headers/search-header';
import type { Theme } from '~/types/common-types';

export type DefaultLayoutProps = {
  children: ReactNode;
  locale: string;
  theme: Theme | null;
  showSearchBar?: boolean;
  showFooter?: boolean;
}

export default function DefaultLayout({
  children,
  locale,
  theme,
  showSearchBar,
  showFooter,
}: DefaultLayoutProps) {
  return (
    <div>
      <SearchHeader
        locale={locale}
        theme={theme}
        showSearchBar={showSearchBar}
      />
      {children}
      {showFooter && <CompanyFooter />}
    </div>
  );
}
