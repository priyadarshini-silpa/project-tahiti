import { useRouter } from 'next/router';

import ActivityIndicator from '../../components/shared/ActivityIndicator';
import BrowseSquiggle from '../../screens/admin_v2/Squiggle';
import Custom500 from '../500';

import { parseCookies } from 'nookies';
import { getApolloLink, GraphClient } from '../../config/ApolloClient';
import listSquiggles from '../../graphql/queries/squiggle/listSquiggles';
import Head from 'next/head';

const browseSquiggle = ({ squiggles, isError, error }) => {
  const { isFallback } = useRouter();
  console.log(squiggles);
  if (isError) return <Custom500 error={error} />;
  console.log(isFallback);
  console.log(!isFallback && squiggles);

  return (
    <>
      <Head>
        <title>Browse</title>
        <meta name='title' content='Squiggles | Monday Morning ' />
      </Head>
      {!isFallback && squiggles ? (
        <BrowseSquiggle squiggles={squiggles}/>
      ) : (
        <ActivityIndicator size={150} />
      )}
    </>
  );
};

export default browseSquiggle;

export async function getServerSideProps(context) {
  try {
    const cookies = parseCookies(context);
    GraphClient.setLink(getApolloLink(cookies.firebaseToken));

    const {
      data: { listSquiggles: squiggles },
    } = await GraphClient.query({
      query: listSquiggles,
      variables: { limit: 20, offset: 0, onlyPublished: false },
    });

    return {
      props: { squiggles },
    };
  } catch (error) {
    return {
      props: { isError: true, error: error.message },
    };
  }
}
