/**
 * Skenario Pengujian:
 *
 * - threadDetailReducer function
 *  - harus mengembalikan state awal ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan detail thread ketika diberikan action ActionType.RECEIVE_THREAD_DETAIL
 *  - harus mengembalikan null ketika diberikan action ActionType.CLEAR_THREAD_DETAIL
 *  - harus menambahkan komentar baru ketika diberikan action ActionType.ADD_COMMENT
 *  - harus mengupdate vote komentar ketika diberikan action ActionType.TOGGLE_UPVOTE_COMMENT
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';
import { ActionType } from './action';

describe('threadDetailReducer function', () => {
  it('harus mengembalikan state awal ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan detail thread ketika diberikan action ActionType.RECEIVE_THREAD_DETAIL', () => {
    // arrange
    const initialState = null;
    const threadDetail = {
      id: 'thread-1',
      title: 'Judul Thread',
      body: 'Isi detail thread',
      createdAt: '2026-09-01T07:00:00.000Z',
      owner: {
        id: 'user-1',
        name: 'Dimas',
        avatar: 'https://ui-avatars.com/api/?name=Dimas',
      },
      category: 'general',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.RECEIVE_THREAD_DETAIL,
      payload: {
        threadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(threadDetail);
  });

  it('harus mengembalikan null ketika diberikan action ActionType.CLEAR_THREAD_DETAIL', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Judul Thread',
      body: 'Isi detail thread',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.CLEAR_THREAD_DETAIL,
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('harus menambahkan komentar baru ketika diberikan action ActionType.ADD_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Judul Thread',
      body: 'Isi detail thread',
      comments: [],
      upVotesBy: [],
      downVotesBy: [],
    };
    const newComment = {
      id: 'comment-1',
      content: 'Komentar pertama',
      createdAt: '2026-09-01T08:00:00.000Z',
      owner: {
        id: 'user-2',
        name: 'Alex',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.ADD_COMMENT,
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments).toEqual([newComment]);
  });

  it('harus mengupdate vote komentar ketika diberikan action ActionType.TOGGLE_UPVOTE_COMMENT', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Judul Thread',
      body: 'Isi detail thread',
      comments: [
        {
          id: 'comment-1',
          content: 'Komentar pertama',
          createdAt: '2026-09-01T08:00:00.000Z',
          owner: { id: 'user-2', name: 'Alex' },
          upVotesBy: [],
          downVotesBy: ['user-3'],
        },
      ],
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: ActionType.TOGGLE_UPVOTE_COMMENT,
      payload: {
        commentId: 'comment-1',
        userId: 'user-3',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toContain('user-3');
    expect(nextState.comments[0].downVotesBy).not.toContain('user-3');
  });
});
