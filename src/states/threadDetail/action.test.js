/**
 * Skenario Pengujian:
 *
 * - asyncReceiveThreadDetail thunk
 *  - harus mengosongkan state lama dan men-dispatch receiveThreadDetailActionCreator ketika sukses
 *  - harus memanggil alert ketika pengambilan detail thread gagal
 *
 * - asyncAddComment thunk
 *  - harus men-dispatch addCommentActionCreator ketika pembuatan komentar berhasil
 */

import {
  describe, it, expect, vi, beforeEach, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
} from './action';

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Isi detail thread',
  category: 'redux',
  createdAt: '2026-09-01T07:00:00.000Z',
  owner: { id: 'user-1', name: 'Dimas' },
  comments: [],
  upVotesBy: [],
  downVotesBy: [],
};

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'Komentar pertama',
  createdAt: '2026-09-01T08:00:00.000Z',
  owner: { id: 'user-2', name: 'Alex' },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Gagal memuat rincian thread');

describe('asyncReceiveThreadDetail and asyncAddComment thunks', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    api.createComment = api._createComment;
    delete api._getThreadDetail;
    delete api._createComment;
  });

  it('harus mengosongkan state lama dan men-dispatch receiveThreadDetailActionCreator ketika sukses', async () => {
    // arrange
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus memanggil alert ketika pengambilan detail thread gagal', async () => {
    // arrange
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('harus men-dispatch addCommentActionCreator ketika pembuatan komentar berhasil', async () => {
    // arrange
    api.createComment = () => Promise.resolve(fakeCommentResponse);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddComment({
      threadId: 'thread-1',
      content: 'Komentar pertama',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result.success).toBe(true);
  });
});
