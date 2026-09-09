/**
 * Skenario Pengujian:
 *
 * - asyncAddThread thunk
 *  - harus men-dispatch action dan menambah thread baru ketika pembuatan thread berhasil
 *  - harus memanggil alert dan menyembunyikan loading ketika pembuatan thread gagal
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread,
  addThreadActionCreator,
} from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Baru',
  body: 'Isi thread baru',
  category: 'react',
  createdAt: '2026-09-01T07:00:00.000Z',
  ownerId: 'user-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Gagal membuat thread');

describe('asyncAddThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('harus men-dispatch action dan menambah thread baru ketika pembuatan thread berhasil', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result.success).toBe(true);
    expect(result.threadId).toBe('thread-1');
  });

  it('harus memanggil alert dan menyembunyikan loading ketika pembuatan thread gagal', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result.success).toBe(false);
  });
});
