import { auth } from '@/firebase';
import httpRequest from '@/httpRequest';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserInfo {
  email: string;
  fullName: string;
}

interface SetUserInfoPArams {
  email: string;
  password: string;
}

interface UserState {
  user: UserInfo | null;
  accessToken?: string;
  login: (params: SetUserInfoPArams) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      login: async ({ email, password }) => {
        const userInfo = await signInWithEmailAndPassword(auth, email, password);
        const accessToken = await userInfo.user.getIdToken();
        set((state) => ({ ...state, accessToken }));
        const { data } = await httpRequest.get<UserInfo>('/admin/v1/me');
        set((state) => ({ ...state, user: { email, fullName: data.fullName } }));
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
