import configReducer, { setConfig } from "@/slices/configSlice";

import configData from "../../mocks/redux_json/configData.json";

describe("configSlice", () => {
  describe("reducer", () => {
    it("should set the config and mark it as initialized", () => {
      const initialState = {...configData, initialized: false};
      const newConfig = {...configData, initialized: true};
      const action = setConfig(newConfig);
      const newState = configReducer(initialState, action);

      expect(newState).toEqual(newConfig);
    });
  });
});
