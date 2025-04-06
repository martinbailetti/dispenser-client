import { useAppSelector } from "@/redux/hooks";
import LanguageSelector from "@/components/common/LanguageSelector";
import PrizeShowWinner from "./PrizeShowWinner";
import PrizeShowLooser from "./PrizeShowLooser";
import PrizeShowAlreadyClaimed from "./PrizeShowAlreadyClaimed";
import { memo } from "react";
/**
 *
 * Prize result display component
 */
const PrizeShow = memo(() => {
  const prizeDataWinPrize= useAppSelector((state) => state.prizeData.winPrize);
  const prizeDataAlreadyClaimed = useAppSelector((state) => state.prizeData.already_claimed);

  return (
    <section className="check-prize page" data-testid="prize-show">
      <LanguageSelector />
      <div className="container">
        {prizeDataWinPrize > 0 && !prizeDataAlreadyClaimed && <PrizeShowWinner />}
        {prizeDataAlreadyClaimed && <PrizeShowAlreadyClaimed />}
        {prizeDataWinPrize == 0 && !prizeDataAlreadyClaimed && <PrizeShowLooser />}
      </div>
    </section>
  );
});

PrizeShow.displayName = "PrizeShow";
export default PrizeShow;
