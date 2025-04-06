import React, { memo, useCallback, useContext, useState } from "react";
import { DataContext } from "@/context/DataContext";
import { playAudio } from "@/utils/audio";
import { useAppSelector } from "@/redux/hooks";
import { sendActionToMachine } from "@/bridge";

const LanguageSelector = memo(() => {
  const { language, changeLanguage } = useContext(DataContext);
  const [opened, setOpened] = useState(false);

  const configData = useAppSelector((state) => state.configData);

  const index = configData.available_languages.findIndex((elm) => elm === language);

  const paintFlags = useCallback(() => {
    const setLanguage = (lang: string) => {
      playAudio("click");
      sendActionToMachine("setLanguage", lang).then((response) => {
        if (response.success === true) {
          changeLanguage(lang);
        } else {
          console.log("setLanguage -> Error", response);
        }
      });
    };
    if (configData.available_languages) {
      const filteredLanguages = [...configData.available_languages];
      const languageIndex = filteredLanguages.findIndex((lang) => lang === language);
      if (languageIndex !== -1) {
        filteredLanguages.splice(languageIndex, 1);
      }

      return filteredLanguages.map((lang, index: number) => {
        return (
          <img
            key={index}
            src={`/images/flags/${lang}.png`}
            alt={lang}
            width={50}
            height={32}
            onClick={(event) => {
              event.stopPropagation();
              sendActionToMachine("log", {message: `change language to ${lang}`});
              setLanguage(lang);
              setOpened(false);
            }}
          />
        );
      });
    }
  }, [language, setOpened, changeLanguage, configData.available_languages]);

  const close = () => {
    window.removeEventListener("click", close);
    setOpened(false);
  };
  const openSelector = (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    event.stopPropagation();
    playAudio("click");
    if (opened) {
      close();
    } else {
      setOpened(true);
      window.addEventListener("click", close);
    }
  };

  return (
    <div className="language-selector" data-testid="language-selector">
      {index >= 0 && (
        <>
          <div className="selected">
            <img
              data-testid="language-selector-icon"
              key={index}
              src={`/images/flags/${configData.available_languages[index]}.png`}
              alt={configData.available_languages[index]}
              width={50}
              height={32}
              onClick={openSelector}
            />
          </div>
          {opened && (
            <div data-testid="language-list" className="list">
              {paintFlags()}
            </div>
          )}
        </>
      )}
    </div>
  );
});

LanguageSelector.displayName = "LanguageSelector";
export default LanguageSelector;
