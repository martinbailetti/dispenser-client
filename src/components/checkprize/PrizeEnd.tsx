import { useAppDispatch } from "@/redux/hooks";
import { prize_end_message_wait } from "@/config";
import { useTranslation } from "@/context/contextUtils";
import { reset } from "@/slices/prizeSlice";
import { pauseSong } from "@/utils/song";
import { useRouter } from "next/router";
import { memo, useEffect } from "react";
import { sendActionToMachine } from "@/bridge";
/**
 *
 * Prize dispense end component.
 * Shows a message to the user that the prize has been dispensed.
 */
const PrizeEnd = memo(() => {
  const router = useRouter();

  const t = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(reset());
      pauseSong();
      //sendActionToMachine("setPage", { page: "home" });
      router.push("/");
    }, prize_end_message_wait);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, router]);

  return (
    <div className="dispense-end" data-testid="dispense-end" onClick={() => {
      sendActionToMachine("log", {message: "prize dispensed click"});
      dispatch(reset());
      pauseSong();
      //sendActionToMachine("setPage", { page: "home" });
      router.push("/");
    }}>
      <div className="dispense-end-content">
        <div className="logo">
          <img alt="Dispenser" src="images/logo_big.png" />
        </div>

        <div className="text">{t("take_prize")}</div>
      </div>
    </div>
  );
})
PrizeEnd.displayName = "PrizeEnd";
export default PrizeEnd;
