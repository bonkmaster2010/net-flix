import { create } from "zustand";
import { persist } from "zustand/middleware";

interface loginIF {
  username: string;
  password: string;
  email: string;
  pfp: string | null;
  isLoggedIn: boolean;

  setPfp: (pfp: any) => void; // ✅ Added this
  setUserName: (name: any) => void;
  setLoggedIn: () => void;
  setLogin: (username: string, password: string, email: string) => void;
  logout: () => void;
}

const useLogin = create<loginIF>()(
  persist(
    (set) => ({
      username: "",
      password: "",
      email: "",
      pfp: null,
      isLoggedIn: false,

      setPfp: (pfp: any) => set({ pfp }), 
      setUserName: (name: any) => set({ username: name }),
      setLoggedIn: () => set({ isLoggedIn: true }),
      setLogin: (username: string, password: string, email: string) =>
        set({ username, password, email }),

      logout: () => set({ username: "", password: "", email: "", isLoggedIn: false, pfp: null }),
    }),
    {
      name: "login-storage",
    }
  )
);

export default useLogin;
