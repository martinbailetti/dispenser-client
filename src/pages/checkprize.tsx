import Layout from "@/components/Layout";

import { useAppSelector } from "@/redux/hooks";
import PrizeDispense from "@/components/checkprize/PrizeDispense";
import PrizeEnd from "@/components/checkprize/PrizeEnd";
import PrizeShow from "@/components/checkprize/PrizeShow";
import WalkAnimation from "@/components/common/WalkAnimation";
import { useEffect } from "react";
import { sendActionToMachine } from "@/bridge";

const CheckPrize = () => {
  const prizeDataStatus = useAppSelector((state) => state.prizeData.status);


  useEffect(() => {
    sendActionToMachine("setPage", { page: "validation" });
  }, []);
  return (
    <Layout pageTitle="Dispenser" description="Dispenser description" data-testid="layout">
      {prizeDataStatus == "READY" && <PrizeShow />}
      {prizeDataStatus == "PROCESSING" && <WalkAnimation />}
      {prizeDataStatus == "DISPENSING" && <PrizeDispense />}
      {prizeDataStatus == "ENDED" && <PrizeEnd />}
    </Layout>
  );
};
export default CheckPrize;
