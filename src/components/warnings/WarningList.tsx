import { useAppSelector } from "@/redux/hooks";
import { DeviceInWarningInterface } from "@/types";
import { memo } from "react";

const WarningList = memo(() => {
  const devicesInWarningData = useAppSelector((state) => state.devicesInWarning);

  const showItems = () => {
    return devicesInWarningData.map((warning: DeviceInWarningInterface, index: number) => {
      return (
        <div key={index} className="row warning-item">
          <div className="img-container">
            <img src={`/images/devices/${warning.image}`} alt="Device Warning" />
          </div>
          <div>{warning.msg}</div>
        </div>
      );
    });
  };

  return (
    <div className="warnings-list" data-testid="warnings-list">
      {showItems()}
    </div>
  );
})

WarningList.displayName = "WarningList";
export default WarningList;
