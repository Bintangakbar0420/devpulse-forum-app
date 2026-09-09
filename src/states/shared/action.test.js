/**
 * Skenario Pengujian:
 *
 * - asyncPopulateUsersAndThreads thunk
 *  - harus men-dispatch action dan menampilkan/menyembunyikan loading ketika pengambilan data sukses
 *  - harus men-dispatch action dan memanggil alert ketika pengambilan data gagal
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { receiveThreadsActionCreator } from '../threads/action';

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'Dimas Saputra',
    email: 'dimas@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dimas',
  },
];

const fakeThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Bagaimana belajar Redux?',
    body: 'Ceritakan pengalamanmu',
    category: 'redux',
    createdAt: '2026-09-01T07:00:00.000Z',
    ownerId: 'user-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Gagal memuat data dari server');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getAllThreads = api.getAllThreads;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getAllThreads = api._getAllThreads;
    delete api._getAllUsers;
    delete api._getAllThreads;
  });

  it('harus men-dispatch action dan menampilkan/menyembunyikan loading ketika pengambilan data sukses', async () => {
    // arrange
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllThreads = () => Promise.resolve(fakeThreadsResponse);
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadsResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus men-dispatch action dan memanggil alert ketika pengambilan data gagal', async () => {
    // arrange
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllThreads = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
