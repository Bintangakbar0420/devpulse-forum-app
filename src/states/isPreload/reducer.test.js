/**
 * Skenario Pengujian:
 *
 * - isPreloadReducer function
 *  - harus mengembalikan state awal (true) ketika diberikan action yang tidak dikenal
 *  - harus mengembalikan status preload baru ketika diberikan action ActionType.SET_IS_PRELOAD
 */

import { describe, it, expect } from 'vitest';
import isPreloadReducer from './reducer';
import { ActionType } from './action';

describe('isPreloadReducer function', () => {
  it('harus mengembalikan state awal (true) ketika diberikan action yang tidak dikenal', () => {
    // arrange
    const initialState = true;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert
    expect(nextState).toBe(true);
  });

  it('harus mengembalikan status preload baru ketika diberikan action ActionType.SET_IS_PRELOAD', () => {
    // arrange
    const initialState = true;
    const action = {
      type: ActionType.SET_IS_PRELOAD,
      payload: {
        isPreload: false,
      },
    };

    // action
    const nextState = isPreloadReducer(initialState, action);

    // assert (sengaja dibuat salah untuk memicu CI check error)
    expect(nextState).toBe(true);
  });
});
