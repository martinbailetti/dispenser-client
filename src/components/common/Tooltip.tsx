import { tooltip_wait } from "@/config";
import { memo, useEffect } from "react";

const Tooltip = memo(
  ({
    text,
    type,
    elm,
    closeTooltip,
  }: {
    text: string;
    type: string;
    elm: HTMLElement | null;
    closeTooltip: () => void;
  }) => {
    var style = {
      top: "0",
      left: "0",
    };
    if (elm) {
      const rect = elm.getBoundingClientRect();

      style = {
        top: `${rect.top + rect.height + 10}px`,
        left: `${rect.left}px`,
      };
    } else {
      closeTooltip();
    }

    useEffect(() => {
      var to: any = null;
      if (elm) {
        to = setTimeout(closeTooltip, tooltip_wait);
      }

      return () => {
        if (to) {
          clearTimeout(to);
        }
      };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className="tooltip-wrapper" data-testid="tooltip-wrapper" style={style}>
        <div className={`tooltip t-${type}`}>
          <div className="square"></div>
          <div className="ellipse">{text}</div>
        </div>
      </div>
    );
  },
);

Tooltip.displayName = "Tooltip";
export default Tooltip;
