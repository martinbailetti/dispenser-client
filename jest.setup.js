import "@testing-library/jest-dom";
import "./mocks/mockGlobalWindow";
import mockRouter from "next-router-mock";

import mockItems from "./mocks/mockItems.json";

import configInitializedData from "./mocks/redux_json/configInitializedData.json";

mockRouter.push = jest.fn();

jest.mock("next/router", () => require("next-router-mock"));

window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.play = jest.fn();

beforeEach(() => {
  window.bridge_actionFromWeb = jest.fn(() =>
    JSON.stringify({
      success: true,
    }),
  );

  window.bridge_actionFromWeb = jest.fn((param) => {
    const obj = JSON.parse(param);

    switch (obj.action) {
      case "init":
        return JSON.stringify(configInitializedData);
        break;
      case "getItems":
        return JSON.stringify(mockItems);
        break;
      case "buy":
        return JSON.stringify({
          success: true,
        });
        break;
      case "pay":
        return JSON.stringify({
          success: true,
        });
        break;
      case "collect":
        return JSON.stringify({
          success: true,
        });
        break;
      case "prizeToBalance":
        return JSON.stringify({
          success: true,
        });
        break;
      case "closeMessage":
        return JSON.stringify({
          success: true,
        });
        break;
      default: {
        return {
          error: "Action not found",
        };
      }
    }
  });
});

afterEach(() => {
  window.bridge_actionFromWeb = undefined;
});
