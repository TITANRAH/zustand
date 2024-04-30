import { StateCreator, create } from "zustand";
import { AuthStatus, User } from "../../interfaces";
import { AuthService } from "../../services/auth.service";
import { persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  loginUser: (email: string, password: string) => Promise<void>;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: "unauthorized",
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: "authorized", token, user });
      console.log("cayo en el try ", user);
    } catch (error) {
      console.log("cayo en el catch ", error);

      set({ status: "unauthorized", token: undefined, user: undefined });
    }
  },
});

export const useAuthStore = create<AuthState>()(
  persist(storeApi, {
    name: "auth-storage",
  })
);
