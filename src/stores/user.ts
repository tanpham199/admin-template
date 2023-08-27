import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  uid: string;
  email: string;
  displayName: string | null;
}

interface LoginParams {
  email: string;
  password: string;
}

interface UserState {
  user: UserInfo | null;
  accessToken?: string;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      login: async ({ email, password }) => {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        const accessToken = await user.getIdToken();
        set(() => ({
          accessToken,
          user: { email, displayName: user.displayName, uid: user.uid },
        }));
      },
      logout: () => {
        set({
          user: null,
          accessToken: undefined,
        });
      },
      refreshToken: async () => {
        const { user } = get();
        if (!auth.currentUser || !user) {
          return;
        }
        const accessToken = await auth.currentUser.getIdToken(true);
        set((state) => ({ ...state, accessToken }));
      },
    }),
    {
      name: 'user',
    }
  )
);

export default useUserStore;
