import devicesInWarningReducer, { setDevicesInWarning } from "@/slices/devicesInWarningSlice";

describe("devicesInWarningSlice", () => {
  describe("setDevicesInWarning", () => {
    it("should set the devices in warning state", () => {
      const initialState: never[] | undefined = [];
      const devices = ["device1", "device2", "device3"];
      const action = setDevicesInWarning(devices);
      const newState = devicesInWarningReducer(initialState, action);
      expect(newState).toEqual(devices);
    });
  });
});
