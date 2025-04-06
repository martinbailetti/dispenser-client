import "../../styles/main.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { DataProvider } from "@/context/DataContext";
import { useEffect } from "react";
import { sendActionToMachine } from "@/bridge";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    sendActionToMachine("init");
  }, []);
  return (
    <DataProvider>
      <Provider store={store}>
        {" "}
        {/* Envuelve el componente con Provider */}
        <Component {...pageProps} />
      </Provider>
    </DataProvider>
  );
};
export default App;
