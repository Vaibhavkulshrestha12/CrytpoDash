import { create } from 'zustand';

interface CryptoState {
  coins: any[];
  loading: boolean;
  error: string | null;
  favorites: string[];
  setCoins: (coins: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  toggleFavorite: (coinId: string) => void;
}

export const useCryptoStore = create<CryptoState>((set) => ({
  coins: [],
  loading: false,
  error: null,
  favorites: [],
  setCoins: (coins) => set({ coins }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  toggleFavorite: (coinId) =>
    set((state) => ({
      favorites: state.favorites.includes(coinId)
        ? state.favorites.filter((id) => id !== coinId)
        : [...state.favorites, coinId],
    })),
}));