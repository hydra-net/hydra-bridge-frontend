import { Suspense } from 'react';
import Layout from '../common/components/Layout';
import { Routes, Route } from 'react-router-dom';
import { defaultTheme } from './theme/theme';
import { lazyWithPreload } from '../helpers/lazy';
import { routes } from '../routes';
import Fallback from './Fallback';
import useChains from '../common/hooks/useChains';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// translations
import '../i18n/I18nConfig'

const Home = lazyWithPreload(
  () => import(/* webpackChunkName: 'LandingModule' */ '../modules/Home/Home')
);

const Page404 = lazyWithPreload(
  () =>
    import(/* webpackChunkName: 'LandingModule' */ '../modules/Page404/Page404')
);

const Shell = () => {
  const { chains } = useChains();

  return (
    <>
      <Layout theme={defaultTheme}>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path={routes.home} element={<Home chains={chains} />} />
            <Route path={routes.page404} element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <ToastContainer />
        </Suspense>
      </Layout>
    </>
  );
};

export default Shell;
