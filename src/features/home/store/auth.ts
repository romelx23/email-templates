import apiClient from "@/api/apiClient";
import { create } from "zustand";

interface IUser {
  name: string;
  role: string;
  email: string;
  picture: string;
  status: boolean;
  amount: number;
}

interface AuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
  renew: () => Promise<boolean>;
  updateAmount: (amount: number) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user: IUser) => set({ isAuthenticated: true, user }),
  logout: () => {
    localStorage.removeItem("x-token");
    set({ isAuthenticated: false, user: null });
  },
  renew: async () => {
    try {
      const response = await apiClient.post(
        "/auth/renew",
        {
          token: localStorage.getItem("x-token"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify({ token: localStorage.getItem("x-token") }),
        }
      );

      if (!response.data) {
        throw new Error("Failed to log in with Google");
      }

      const data = await response.data;
      console.log("Login successful:", data);

      localStorage.setItem("x-token", data.access_token);

      set({
        isAuthenticated: true,
        user: {
          ...data.user,
          amount: data.credits.amount,
        },
      });

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },
  updateAmount: (amount) => {
    set((state) => ({
      user: {
        ...state.user!,
        amount,
      },
    }));
  },
}));

export default useAuthStore;
