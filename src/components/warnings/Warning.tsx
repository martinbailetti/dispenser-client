import { useAppSelector } from "@/redux/hooks";
import { useState, useEffect, useRef, memo } from "react";
import WarningList from "./WarningList";
import { show_warning_wait } from "@/config";
import { useTranslation } from "@/context/contextUtils";

const Warning = memo(() => {
  const devicesInWarningData = useAppSelector((state) => state.devicesInWarning);

  const [opened, setOpened] = useState(false);

  const to = useRef<NodeJS.Timeout | null>(null);

  const t = useTranslation();

  useEffect(() => {
    if (devicesInWarningData && devicesInWarningData.length > 0) {
      to.current = setTimeout(() => {
        setOpened(false);
      }, show_warning_wait);
    }
    return () => {
      if (to.current) {
        clearTimeout(to.current);
      }
    };
  }, [devicesInWarningData]);

  if (devicesInWarningData && devicesInWarningData.length > 0) {
    return (
      <>
        <div data-testid="warning-button" className="warning" onClick={() => setOpened(true)}>
          <img src="/images/warning.svg" alt="Device Warning" />
          <small>{devicesInWarningData.length}</small>
        </div>

        {opened && (
          <div data-testid="warning-list" className="warnings" onClick={() => setOpened(false)}>
            <div className="content">
              <div className="close">{t("close")}</div>
              <WarningList />
            </div>
          </div>
        )}
      </>
    );
  } else {
    return null;
  }
});
Warning.displayName = "Warning";
export default Warning;
