import axiosPlugin from '@/plugin/axiosPlugin.ts';
import useUserStore from '@/stores/useUserStore.ts';
import type { IUser } from '@/interfaces/IUser.ts';
import authService from '@/services/authService.ts'

export default new (class UserService {
  async register(user: IUser) {
    // throw new Error('Method not implemented.');
    return axiosPlugin.post('/users', user);
  }

  async profile() {
    // throw new Error('Method not implemented.');
    const { data } = await axiosPlugin.get('/auth/profile');
    useUserStore().setUser(data);
    console.log(useUserStore().user);
  }

  async basicUpdate(user: { name: string; email: string }) {
    return axiosPlugin.put('/users/edit/basic', user);
  }

  async passwordUpdate(user: {
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
  }) {
    return axiosPlugin.put('/users/edit/password', user);
  }

  async delete(password: string) {
    // throw new Error('Method not implemented.');
    return axiosPlugin.delete('/users', { data: { password } });
  }

  async uploadPicture(file: string | File) {
    await axiosPlugin.post(
      '/users/profile-picture',
      {
        file,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    await authService.refreshToken();
  }
})();
