/**
 * Skenario Pengujian:
 *
 * - asyncSetAuthUser thunk
 *  - harus men-dispatch action, menyimpan token, dan mengambil profil pengguna ketika login berhasil
 *  - harus memanggil alert dan menyembunyikan loading ketika login gagal
 *
 * - asyncUnsetAuthUser thunk
 *  - harus men-dispatch unsetAuthUserActionCreator dan menghapus access token
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeToken = 'fake-token-jwt-secret';
const fakeUserResponse = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://ui-avatars.com/api/?name=John',
};

const fakeErrorResponse = new Error('Email atau password salah');

describe('asyncSetAuthUser and asyncUnsetAuthUser thunks', () => {
  beforeEach(() => {
    api._login = api.login;
    api._putAccessToken = api.putAccessToken;
    api._getOwnProfile = api.getOwnProfile;
    api._removeAccessToken = api.removeAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.putAccessToken = api._putAccessToken;
    api.getOwnProfile = api._getOwnProfile;
    api.removeAccessToken = api._removeAccessToken;
    delete api._login;
    delete api._putAccessToken;
    delete api._getOwnProfile;
    delete api._removeAccessToken;
  });

  it('harus men-dispatch action, menyimpan token, dan mengambil profil pengguna ketika login berhasil', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeToken);
    api.putAccessToken = vi.fn();
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);
    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result.success).toBe(true);
  });

  it('harus memanggil alert dan menyembunyikan loading ketika login gagal', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'wrong@example.com',
      password: 'wrongpassword',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result.success).toBe(false);
  });

  it('harus men-dispatch unsetAuthUserActionCreator dan menghapus access token saat logout', () => {
    // arrange
    api.removeAccessToken = vi.fn();
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.removeAccessToken).toHaveBeenCalled();
  });
});
