import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  email: string;
  accessToken: string;
}

interface SetUserInfoPArams {
  email: string;
  password: string;
}

interface UserState {
  user: UserInfo | null;
  login: (params: SetUserInfoPArams) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      login: async ({ email, password }) => {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        const accessToken = await userInfo.user.getIdToken();
        set((state) => ({ ...state, user: { accessToken, email } }));
      },
      logout: () => {
        set({
          user: null,
        });
      },
    }),
    {
      name: 'user',
    }
  )
);

export default useUserStore;
