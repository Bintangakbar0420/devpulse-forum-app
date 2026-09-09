/**
 * Skenario Pengujian:
 *
 * - threadsReducer function
 *  - harus mengembalikan state awal ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan daftar threads ketika diberikan action ActionType.RECEIVE_THREADS
 *  - harus menambahkan thread baru ke daftar threads ketika diberikan action ActionType.ADD_THREAD
 *  - harus memodifikasi upVotesBy dan menghapus dari downVotesBy ketika diberikan action ActionType.TOGGLE_UPVOTE_THREAD
 *  - harus memodifikasi downVotesBy dan menghapus dari upVotesBy ketika diberikan action ActionType.TOGGLE_DOWNVOTE_THREAD
 *  - harus menghapus vote dari upVotesBy dan downVotesBy ketika diberikan action ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducer function', () => {
  it('harus mengembalikan state awal ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('harus mengembalikan daftar threads ketika diberikan action ActionType.RECEIVE_THREADS', () => {
    // arrange
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah isi thread pertama',
            category: 'general',
            createdAt: '2026-09-01T07:00:00.000Z',
            ownerId: 'user-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('harus menambahkan thread baru ke daftar threads ketika diberikan action ActionType.ADD_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini isi thread pertama',
        category: 'general',
        createdAt: '2026-09-01T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const newThread = {
      id: 'thread-2',
      title: 'Thread Kedua',
      body: 'Ini isi thread kedua',
      category: 'redux',
      createdAt: '2026-09-02T07:00:00.000Z',
      ownerId: 'user-2',
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };
    const action = {
      type: ActionType.ADD_THREAD,
      payload: {
        thread: newThread,
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([newThread, ...initialState]);
  });

  it('harus memodifikasi upVotesBy dan menghapus dari downVotesBy ketika diberikan action ActionType.TOGGLE_UPVOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread',
        category: 'general',
        createdAt: '2026-09-01T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: [],
        downVotesBy: ['user-2'],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_UPVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).toContain('user-2');
    expect(nextState[0].downVotesBy).not.toContain('user-2');
  });

  it('harus memodifikasi downVotesBy dan menghapus dari upVotesBy ketika diberikan action ActionType.TOGGLE_DOWNVOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread',
        category: 'general',
        createdAt: '2026-09-01T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_DOWNVOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].downVotesBy).toContain('user-2');
    expect(nextState[0].upVotesBy).not.toContain('user-2');
  });

  it('harus menghapus vote dari upVotesBy dan downVotesBy ketika diberikan action ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Isi thread',
        category: 'general',
        createdAt: '2026-09-01T07:00:00.000Z',
        ownerId: 'user-1',
        upVotesBy: ['user-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];
    const action = {
      type: ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD,
      payload: {
        threadId: 'thread-1',
        userId: 'user-2',
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState[0].upVotesBy).not.toContain('user-2');
    expect(nextState[0].downVotesBy).not.toContain('user-2');
  });
});
