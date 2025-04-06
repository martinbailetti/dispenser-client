import { useRouter } from "next/router";
import { useTranslation } from "@/context/contextUtils";
import { playAudio } from "@/utils/audio";
import version from "../../../public/version.json";
import { useAppSelector } from "@/redux/hooks";
import { memo, useRef } from "react";
import { show_info_wait } from "@/config";

const FooterContainer = memo(() => {
  const router = useRouter();

  const appData = useAppSelector((state) => state.appData);
  const configData = useAppSelector((state) => state.configData);
  const versionRef = useRef<HTMLDivElement>(null);

  const t = useTranslation();

  const navigate = (path: string) => {
    if (path !== router.pathname) {
      playAudio("click");
      router.push(path);
    }
  };

  return (
    <footer className="footer" data-testid="footer">
      <h1>
        <img data-testid="logo" src="./images/logo.png" alt="Dispenser" onClick={() => navigate("/")} />
      </h1>
      <nav>
        <ul>
          <li>
            <div data-testid="index" className="menu menu-home " onClick={() => navigate("/")}>
              <img src="./images/home.png" alt="Home" />
              <span className={router.pathname == "/" ? "active" : ""}>{t("home")}</span>
            </div>
          </li>
          <li>
            <div data-testid="howto" className="menu menu-prizes" onClick={() => navigate("/howto")}>
              <img src="./images/redeem.png" alt="Redeeem" />
              <span className={router.pathname == "/howto" ? "active" : ""}>
                {t("how_to_line_1")}
                <br />
                {t("how_to_line_2")}
              </span>
            </div>
          </li>
        </ul>
      </nav>

      {configData.show_internet_connection &&
        <div className="icons" data-testid="connection-icons">
          <img alt="connected" src="images/icon_connected.png" className={appData.connected ? 'icon-connected' : 'icon-connected hide'} />
          <img alt="disconnected" src="images/icon_disconnected.png" className={!appData.connected ? 'icon-disconnected' : 'icon-disconnected hide'} />
        </div>
      }

      <div className="info">
        <div className="content"
          data-testid="info"
          ref={versionRef}
          onClick={() => {
            versionRef.current?.classList.add("show");
            setTimeout(() => versionRef.current?.classList.remove("show"), show_info_wait);
          }}
        >
          <div className="version">{configData.machine_name} | {configData.machine_id}</div>
          <div className="version">version: {version.version}</div>
          <div className="version">{configData.kiosk_token}</div>
          <div className="version">{configData.app_version}</div>
        </div>
      </div>
    </footer>
  );
});
FooterContainer.displayName = "FooterContainer";
export default FooterContainer;
