import prizeReducer, {
  setPrize,
  setProcessing,
  setEnableCollect,
  reset,
} from "@/slices/prizeSlice";

describe("prizeSlice", () => {
  let initialState = {
    winPrize: 0,
    available_money: false,
    status: "PROCESSING",
    enable_collect: false,
    type: "",
    remainingMoneyToDispense: 0,
    quantity: 0,
    imageUrl: "",
    title: "",
    already_claimed: false,
  };

  it("should handle setPrize", () => {
    const payload = {
      winPrize: 100,
      available_money: true,
    };
    const nextState = prizeReducer(initialState, setPrize(payload));
    expect(nextState).toEqual({
      winPrize: 100,
      available_money: true,
      status: "READY",
      enable_collect: false,
      type: "",
      remainingMoneyToDispense: 0,
      quantity: 0,
      imageUrl: "",
      title: "",
      already_claimed: false,
    });
  });

  it("should handle setProcessing", () => {
    const nextState = prizeReducer(initialState, setProcessing());
    expect(nextState).toEqual({
      winPrize: 0,
      available_money: false,
      status: "PROCESSING",
      enable_collect: false,
      type: "",
      remainingMoneyToDispense: 0,
      quantity: 0,
      imageUrl: "",
      title: "",
      already_claimed: false,
    });
  });

  it("should handle setEnableCollect", () => {
    const nextState = prizeReducer(initialState, setEnableCollect(true));
    expect(nextState).toEqual({
      winPrize: 0,
      available_money: false,
      status: "PROCESSING",
      enable_collect: true,
      type: "",
      remainingMoneyToDispense: 0,
      quantity: 0,
      imageUrl: "",
      title: "",
      already_claimed: false,
    });
  });

  it("should handle reset", () => {
    const nextState = prizeReducer(initialState, reset());
    expect(nextState).toEqual({
      winPrize: 0,
      available_money: false,
      status: "PROCESSING",
      enable_collect: false,
      type: "",
      remainingMoneyToDispense: 0,
      quantity: 0,
      imageUrl: "",
      title: "",
      already_claimed: false,
    });
  });
});
