import { create } from "zustand";

const stateFromLocalStorage = () => {
  return (
    JSON.parse(localStorage.getItem("agnks")) || {
      user: null,
      usersData: [],
      rol: null,
      isAuthReady: false,
      stationId: null,
    }
  );
};

const persistMiddleware = (config) => (set, get, api) =>
  config(
    (args) => {
      set(args);
      localStorage.setItem("agnks", JSON.stringify(get()));
    },
    get,
    api
  );

const useAppStore = create(
  persistMiddleware((set) => ({
    ...stateFromLocalStorage(),
    setUser: (user) => set(() => ({ user })),
    setStationId: (stationId) => set(() => ({ stationId })),
    setIsAuthReady: (isReady) => set(() => ({ isAuthReady: isReady })),
    setRol: (rol) => set(() => ({ rol })),
  }))
);

export { useAppStore };
