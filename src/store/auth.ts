import { Account, AuthStore } from '@/types/Auth.type';
import {create} from 'zustand';

const persistToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key: string, defaultValue: any) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : defaultValue;
};

const useAuthStore = create<AuthStore>((set) => ({
  token: loadFromLocalStorage('token', ''), 
  account: loadFromLocalStorage('account', {}),

  setToken: (token: string) => {
    set({ token });
    persistToLocalStorage('token', token); 
  },

  setAccount: (account: Account) => {
    set({ account });
    persistToLocalStorage('account', account);
  },

  clearAuth: () => {
    set({ token: '', account: null });
    localStorage.removeItem('token');
    localStorage.removeItem('account');
  },
}));

export default useAuthStore;
