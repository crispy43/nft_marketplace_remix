import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import BlockAdvertising from '~/containers/advertisements/block-advertising';
import MainBestItems from '~/containers/main/main-best-items';
import MainEventItem from '~/containers/main/main-event-item';
import MainIntro from '~/containers/main/main-intro';
import MainQuestions from '~/containers/main/main-questions';
import MainRecommendCreators from '~/containers/main/main-recommend-creators';
import MainRecommendItems from '~/containers/main/main-recommend-items';
import DefaultLayout from '~/layouts/default-layout';
import type { BaseLoaderData } from '~/services/common/loaders.server';
import { loadBaseData } from '~/services/common/loaders.server';

export const loader: LoaderFunction = async ({ request }) => {
  const baseData: BaseLoaderData = await loadBaseData(request);

  const mainNftItems = [
    {
      id: '01',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: true,
    },
    {
      id: '02',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: false,
    },
    {
      id: '03',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: false,
    },
    {
      id: '04',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: false,
    },
    {
      id: '05',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: false,
    },
    {
      id: '06',
      imageUrl: '/images/samples/nft-sample-01.png',
      isLiked: false,
    },
  ];

  return json({
    ...baseData,
    mainNftItems,
  });
};

export default function Main() {
  const { locale, theme, accessToken, mainNftItems } = useLoaderData();
  console.log('accessToken', accessToken);

  return (
    <DefaultLayout
      locale={locale}
      theme={theme}
      showFooter={true}
    >
      <MainIntro />
      <BlockAdvertising />
      <MainBestItems
        items={mainNftItems}
      />
      <MainEventItem
        item={mainNftItems[0]}
      />
      <MainRecommendCreators />
      <MainRecommendItems
        items={mainNftItems}
      />
      <MainQuestions />
    </DefaultLayout>
  );
}
