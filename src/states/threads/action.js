import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  ADD_THREAD: 'threads/add',
  TOGGLE_UPVOTE_THREAD: 'threads/toggleUpVote',
  TOGGLE_DOWNVOTE_THREAD: 'threads/toggleDownVote',
  TOGGLE_NEUTRALIZE_VOTE_THREAD: 'threads/toggleNeutralizeVote',
  ROLLBACK_VOTE_THREAD: 'threads/rollbackVote',
};

const receiveThreadsActionCreator = (threads) => ({
  type: ActionType.RECEIVE_THREADS,
  payload: {
    threads,
  },
});

const addThreadActionCreator = (thread) => ({
  type: ActionType.ADD_THREAD,
  payload: {
    thread,
  },
});

const toggleUpVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.TOGGLE_UPVOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const toggleDownVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.TOGGLE_DOWNVOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const toggleNeutralizeVoteThreadActionCreator = ({ threadId, userId }) => ({
  type: ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD,
  payload: {
    threadId,
    userId,
  },
});

const rollbackVoteThreadActionCreator = ({ threadId, upVotesBy, downVotesBy }) => ({
  type: ActionType.ROLLBACK_VOTE_THREAD,
  payload: {
    threadId,
    upVotesBy,
    downVotesBy,
  },
});

const asyncAddThread = ({ title, body, category = '' }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return { success: true, threadId: thread.id };
    } catch (error) {
      alert(error.message);
      return { success: false, error: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncToggleUpVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }

    const currentThread = threads.find((t) => t.id === threadId);
    if (!currentThread) return;

    const previousUpVotesBy = [...currentThread.upVotesBy];
    const previousDownVotesBy = [...currentThread.downVotesBy];
    const isUpVoted = currentThread.upVotesBy.includes(authUser.id);

    // Optimistically update
    if (isUpVoted) {
      dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleUpVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isUpVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      alert(`Gagal memperbarui vote: ${error.message}`);
      // Rollback to previous state
      dispatch(rollbackVoteThreadActionCreator({
        threadId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

const asyncToggleDownVoteThread = (threadId) => {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }

    const currentThread = threads.find((t) => t.id === threadId);
    if (!currentThread) return;

    const previousUpVotesBy = [...currentThread.upVotesBy];
    const previousDownVotesBy = [...currentThread.downVotesBy];
    const isDownVoted = currentThread.downVotesBy.includes(authUser.id);

    // Optimistically update
    if (isDownVoted) {
      dispatch(toggleNeutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
    } else {
      dispatch(toggleDownVoteThreadActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      if (isDownVoted) {
        await api.neutralizeVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      alert(`Gagal memperbarui vote: ${error.message}`);
      // Rollback to previous state
      dispatch(rollbackVoteThreadActionCreator({
        threadId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleUpVoteThreadActionCreator,
  toggleDownVoteThreadActionCreator,
  toggleNeutralizeVoteThreadActionCreator,
  rollbackVoteThreadActionCreator,
  asyncAddThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
};
