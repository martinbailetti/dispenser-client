import Layout from "@/components/Layout";
import { ItemInterface } from "@/types";
import { getItems } from "@/slices/itemsSlice";
import { useEffect, useState } from "react";

import HeaderContainer from "@/components/common/HeaderContainer";
import LanguageSelector from "@/components/common/LanguageSelector";
import ItemDetail from "@/components/index/ItemDetail";
import ItemList from "@/components/index/ItemList";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import useInactivityDetector from "@/hooks/useInactivityDetector";
import Warning from "@/components/warnings/Warning";
import VideoIntro from "@/components/index/VideoIntro";
import WalkAnimation from "@/components/common/WalkAnimation";
import FooterContainer from "@/components/common/FooterContainer";
import Disclaimer from "@/components/index/Disclaimer";
import { setShowDisclaimer, setWaitDisclaimer } from "@/slices/appSlice";
import { sendActionToMachine } from "@/bridge";
/**
 *
 * Index page component. Shows list of items available for selection.
 */
const Home = () => {
  const [status, setStatus] = useState("READY");

  const dispatch = useAppDispatch();

  const [detailOpened, setDetailOpened] = useState<ItemInterface | null>(null);

  const itemsData = useAppSelector((state) => state.itemsData);

  const appData = useAppSelector((state) => state.appData);

  const configData = useAppSelector((state) => state.configData);
  const customerDataBalance = useAppSelector((state) => state.customerData.balance);

  useInactivityDetector(configData.default_inactivity_time, setDetailOpened);


  useEffect(() => {
    sendActionToMachine("setPage", { page: "home" });
  }, []);

  useEffect(() => {
    if (configData && configData.initialized && itemsData.items.length === 0) {
      dispatch(getItems());
    }
  }, [dispatch, configData, itemsData.items]);



  useEffect(() => {

    let timeout = null;
    if (configData && configData.initialized && itemsData.items.length > 0 && configData.accepted_disclaimer_timeout > 0 && appData.wait_disclaimer && customerDataBalance == 0) {
      timeout = setTimeout(() => {

        dispatch(setWaitDisclaimer(false));
        dispatch(setShowDisclaimer(true));
        sendActionToMachine("disclaimerAccepted", { accepted: false });


      }, configData.accepted_disclaimer_timeout * 1000);
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };

  }, [dispatch, configData, itemsData.items, configData.accepted_disclaimer_timeout, appData.wait_disclaimer, customerDataBalance]);


  return (
    <Layout pageTitle="Dispenser" description="Dispenser description">
      {configData.initialized && status == "READY" && itemsData.items.length > 0 && (
        <section className="items-page">
          {(!appData.pending ||
            !appData.pending_video ||
            !configData.has_claim_video ||
            customerDataBalance > 0) && (
              <>
                <HeaderContainer
                  startProcessing={() => setStatus("PROCESSING")}
                  detailOpened={detailOpened !== null}
                />
                {itemsData.items.length > 0 && itemsData.loading === "idle" && <LanguageSelector />}
                {detailOpened === null &&
                  itemsData.items.length > 0 &&
                  itemsData.loading === "idle" && (
                    <ItemList openDetailClick={(data) => setDetailOpened(data)} />
                  )}
                <Warning />
                <FooterContainer />
                {configData.show_disclaimer && appData.show_disclaimer && <Disclaimer />}
              </>
            )}

          {appData.pending &&
            appData.pending_video &&
            customerDataBalance == 0 &&
            configData.has_claim_video && <VideoIntro />}
        </section>
      )}
      {(itemsData.items.length == 0 ||
        !configData.initialized ||
        itemsData.loading === "pending" ||
        status == "PROCESSING") && <WalkAnimation />}
      {detailOpened !== null && (
        <ItemDetail closeClick={() => setDetailOpened(null)} {...detailOpened} />
      )}
    </Layout>
  );
};
export default Home;
