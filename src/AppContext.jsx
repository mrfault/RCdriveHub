import { createContext, useContext } from 'react';

export const AppContext = createContext({
  musicPlaying: false,
  toggleMusic: () => {},
  openLightbox: () => {},
});

export const useApp = () => useContext(AppContext);
