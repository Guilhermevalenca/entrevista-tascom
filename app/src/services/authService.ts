import type { IUser } from '@/interfaces/IUser.ts';
import axiosPlugin from '@/plugin/axiosPlugin.ts';
import useUserStore from '@/stores/useUserStore.ts';

export default new (class AuthService {
  async login(user: Partial<IUser>) {
    try {
      const { data } = await axiosPlugin.post('/auth/login', user);

      if (data.access_token) {
        const token = String(data.access_token);
        axiosPlugin.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async logout() {
    localStorage.removeItem('token');
    useUserStore().resetData();
  }

  async refreshToken() {
    try {
      const { data } = await axiosPlugin.post('/auth/refresh-token');
      axiosPlugin.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      localStorage.setItem('token', data.access_token);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
})();
