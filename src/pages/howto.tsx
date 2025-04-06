import Layout from "@/components/Layout";
import { useTranslation } from "@/context/contextUtils";

import LanguageSelector from "@/components/common/LanguageSelector";
import useInactivityDetector from "@/hooks/useInactivityDetector";
import { useAppSelector } from "@/redux/hooks";
import HeaderContainer from "@/components/common/HeaderContainer";
import FooterContainer from "@/components/common/FooterContainer";
/**
 *
 * "How To" page component.
 */
const HowTo = () => {
  const t = useTranslation();

  const configData = useAppSelector((state) => state.configData);
  useInactivityDetector(configData.default_inactivity_time, ()=>null);
  return (
    <Layout pageTitle="Dispenser" description="Dispenser description">
      <section className="howto page">
        <HeaderContainer startProcessing={() => {}} detailOpened={true} />
        <LanguageSelector />

        <div className="container" >
          <div className="content">
            <div className="title">{t("how_to_redeem")}</div>
            <div
              className="text-1 text"
              dangerouslySetInnerHTML={{ __html: t("how_to_redeem_text_1") }}
            ></div>
            <h1 dangerouslySetInnerHTML={{ __html: t("how_to_redeem_text_2") }}></h1>
          </div>
        </div>

        <FooterContainer />
      </section>
      <img src="images/hand.png" alt="Dispenser" className="floating-hand" />
    </Layout>
  );
}

export default HowTo;
