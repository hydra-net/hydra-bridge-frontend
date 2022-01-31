import { Suspense, useEffect, useState } from "react";
import Layout from "../common/components/Layout";
import { Routes, Route } from "react-router-dom";
import { defaultTheme } from "./theme/theme";
import { lazyWithPreload } from "../helpers/lazy";
import { routes } from "../routes";
import Fallback from "./Fallback";
import { getAllChains } from "../api/commonService";
import { ChainResponseDto } from "../common/dtos";

const Home = lazyWithPreload(
  () => import(/* webpackChunkName: 'LandingModule' */ "../modules/Home/Home")
);

const Page404 = lazyWithPreload(
  () =>
    import(/* webpackChunkName: 'LandingModule' */ "../modules/Page404/Page404")
);

const Shell = () => {
  const [chains, setChains] = useState<ChainResponseDto[]>([]);

  useEffect(() => {
    async function getChains() {
      const res = await getAllChains();
      if (res && res.success) {
        setChains(res.result);
      }
    }
    getChains();
  }, []);

  return (
    <>
      <Layout theme={defaultTheme}>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path={routes.home} element={<Home chains={chains} />} />
            <Route path={routes.page404} element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
      </Layout>
    </>
  );
};

export default Shell;
