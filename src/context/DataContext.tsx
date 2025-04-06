import { fetchData } from "@/context/contextUtils";
import React, { createContext, useState, useEffect, ReactNode, FC } from "react";

import obj from "../../public/locales/es.json";

interface DataContextProps {
  data: {};
  language: string;
  changeLanguage: (lang: string) => void; // eslint-disable-line
  t: (value:string) => string; // eslint-disable-line
}

export const DataContext = createContext<DataContextProps>({
  data: obj,
  language: "es",
  changeLanguage: () => {},
  t: () => "",
});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState(obj);
  const [language, setLanguage] = useState<string>("es"); // Idioma predeterminado

  // Función para cargar datos desde un JSON basado en el idioma
  const loadData = async (lang: string) => {
    const jsonData = await fetchData(lang);
    setData(jsonData);
  };

  // Cargar los datos cuando el componente se monta o el idioma cambia
  useEffect(() => {
    loadData(language);
  }, [language]);

  // Función para cambiar el idioma
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
  };

  const t = (attributeName: string) => {
    return data[attributeName as keyof typeof data] ?? attributeName;
  };

  return (
    <DataContext.Provider value={{ data, language, changeLanguage, t }}>
      {children}
    </DataContext.Provider>
  );
};
