import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import useChains from "../common/hooks/useChains";
import Layout from "../common/components/Layout";
import Fallback from "./Fallback";
import { StyledUserNotifyToastContainer } from "../common/components/Molecules/BrandToast/styles";

import "../i18n/I18nConfig";
import { lazyWithPreload } from "../helpers/lazy";
import { routes } from "../routes";
import { legacyTheme } from "./theme/legacyTheme";

const Home = lazyWithPreload(
  () => import(/* webpackChunkName: 'LandingModule' */ "../modules/Home/Home")
);

const Page404 = lazyWithPreload(
  () =>
    import(/* webpackChunkName: 'LandingModule' */ "../modules/Page404/Page404")
);

const Shell = () => {
  const { chains } = useChains();

  return (
    <>
      <Layout theme={legacyTheme}>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path={routes.home} element={<Home chains={chains} />} />
            <Route path={routes.page404} element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <StyledUserNotifyToastContainer
            containerId={"user__notify"}
            toastClassName={"toast"}
          />
        </Suspense>
      </Layout>
    </>
  );
};

export default Shell;
