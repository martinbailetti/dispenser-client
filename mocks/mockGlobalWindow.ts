const { location } = window;
global.window = Object.create(window);
Object.defineProperty(window, "location", {
  value: {
    ...location,
  },
});


export {};
