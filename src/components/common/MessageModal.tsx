import { useAppSelector } from "@/redux/hooks";
import { sendActionToMachine } from "@/bridge";
import { useTranslation } from "@/context/contextUtils";
import { memo, useCallback, useEffect, useRef, useState } from "react";

export const MessageModal = memo(() => {
  const appData = useAppSelector((state) => state.appData);
  const to = useRef<NodeJS.Timeout | null>(null);

  const [processing, setProcessing] = useState(false);

  const t = useTranslation();
  const closeModal = useCallback(() => {
    if (processing) {
      return;
    }
    sendActionToMachine("log", {message: `close modal message`});
    setProcessing(true);
    sendActionToMachine("closeMessage").then(() => {
      console.log("sendActionToMachine closeMessage");
      if (to.current) {
        clearTimeout(to.current);
      }
    });
  }, [processing]);
  useEffect(() => {
    if (appData.message && appData.message.timeout > 0) {
      to.current = setTimeout(closeModal, appData.message.timeout * 1000);
    }

    return () => {
      if (to.current) {
        clearTimeout(to.current);
      }
    };
  }, [appData.message, closeModal]);

  return (
    <div
      data-testid="message-modal"
      className={`message-modal ${appData.message?.position} ${appData.message?.type} ${!appData.message?.hide_background ? "background" : ""}`}
    >
      <div className="container">
        <p className="text" dangerouslySetInnerHTML={{ __html: appData.message ? appData.message.message : "EMPTY MESSAGE" }}></p>


        {appData.message && appData.message.submessage && <span className="subtext">{appData.message.submessage}</span>}
        {appData.message && appData.message.dismissible && (
          <button data-testid="modal-close" className="button" onClick={closeModal}>
            {t("close")}
          </button>
        )}
      </div>
    </div>
  );
});

MessageModal.displayName = "MessageModal";
export default MessageModal;
