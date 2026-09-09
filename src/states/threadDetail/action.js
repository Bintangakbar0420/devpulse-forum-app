import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'threadDetail/toggleUpVote',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'threadDetail/toggleDownVote',
  TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL: 'threadDetail/toggleNeutralizeVote',
  ROLLBACK_VOTE_THREAD_DETAIL: 'threadDetail/rollbackVote',
  TOGGLE_UPVOTE_COMMENT: 'threadDetail/toggleUpVoteComment',
  TOGGLE_DOWNVOTE_COMMENT: 'threadDetail/toggleDownVoteComment',
  TOGGLE_NEUTRALIZE_VOTE_COMMENT: 'threadDetail/toggleNeutralizeVoteComment',
  ROLLBACK_VOTE_COMMENT: 'threadDetail/rollbackVoteComment',
};

const receiveThreadDetailActionCreator = (threadDetail) => ({
  type: ActionType.RECEIVE_THREAD_DETAIL,
  payload: {
    threadDetail,
  },
});

const clearThreadDetailActionCreator = () => ({
  type: ActionType.CLEAR_THREAD_DETAIL,
});

const addCommentActionCreator = (comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    comment,
  },
});

const toggleUpVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const toggleDownVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const toggleNeutralizeVoteThreadDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL,
  payload: {
    userId,
  },
});

const rollbackVoteThreadDetailActionCreator = ({ upVotesBy, downVotesBy }) => ({
  type: ActionType.ROLLBACK_VOTE_THREAD_DETAIL,
  payload: {
    upVotesBy,
    downVotesBy,
  },
});

const toggleUpVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.TOGGLE_UPVOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const toggleDownVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const toggleNeutralizeVoteCommentActionCreator = ({ commentId, userId }) => ({
  type: ActionType.TOGGLE_NEUTRALIZE_VOTE_COMMENT,
  payload: {
    commentId,
    userId,
  },
});

const rollbackVoteCommentActionCreator = ({ commentId, upVotesBy, downVotesBy }) => ({
  type: ActionType.ROLLBACK_VOTE_COMMENT,
  payload: {
    commentId,
    upVotesBy,
    downVotesBy,
  },
});

const asyncReceiveThreadDetail = (threadId) => {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncAddComment = ({ threadId, content }) => {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return { success: true };
    } catch (error) {
      alert(error.message);
      return { success: false, error: error.message };
    } finally {
      dispatch(hideLoading());
    }
  };
};

const asyncToggleUpVoteThreadDetail = () => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const previousUpVotesBy = [...threadDetail.upVotesBy];
    const previousDownVotesBy = [...threadDetail.downVotesBy];
    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    // Optimistically update
    if (isUpVoted) {
      dispatch(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isUpVoted) {
        await api.neutralizeVoteThread(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(`Gagal memperbarui vote: ${error.message}`);
      dispatch(rollbackVoteThreadDetailActionCreator({
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

const asyncToggleDownVoteThreadDetail = () => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote.');
      return;
    }
    if (!threadDetail) return;

    const previousUpVotesBy = [...threadDetail.upVotesBy];
    const previousDownVotesBy = [...threadDetail.downVotesBy];
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    // Optimistically update
    if (isDownVoted) {
      dispatch(toggleNeutralizeVoteThreadDetailActionCreator(authUser.id));
    } else {
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }

    try {
      if (isDownVoted) {
        await api.neutralizeVoteThread(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch (error) {
      alert(`Gagal memperbarui vote: ${error.message}`);
      dispatch(rollbackVoteThreadDetailActionCreator({
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

const asyncToggleUpVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote komentar.');
      return;
    }
    if (!threadDetail) return;

    const targetComment = threadDetail.comments.find((c) => c.id === commentId);
    if (!targetComment) return;

    const previousUpVotesBy = [...targetComment.upVotesBy];
    const previousDownVotesBy = [...targetComment.downVotesBy];
    const isUpVoted = targetComment.upVotesBy.includes(authUser.id);

    // Optimistically update
    if (isUpVoted) {
      dispatch(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isUpVoted) {
        await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(`Gagal memperbarui vote komentar: ${error.message}`);
      dispatch(rollbackVoteCommentActionCreator({
        commentId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

const asyncToggleDownVoteComment = (commentId) => {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Anda harus login terlebih dahulu untuk memberikan vote komentar.');
      return;
    }
    if (!threadDetail) return;

    const targetComment = threadDetail.comments.find((c) => c.id === commentId);
    if (!targetComment) return;

    const previousUpVotesBy = [...targetComment.upVotesBy];
    const previousDownVotesBy = [...targetComment.downVotesBy];
    const isDownVoted = targetComment.downVotesBy.includes(authUser.id);

    // Optimistically update
    if (isDownVoted) {
      dispatch(toggleNeutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
    } else {
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      if (isDownVoted) {
        await api.neutralizeVoteComment({ threadId: threadDetail.id, commentId });
      } else {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      }
    } catch (error) {
      alert(`Gagal memperbarui vote komentar: ${error.message}`);
      dispatch(rollbackVoteCommentActionCreator({
        commentId,
        upVotesBy: previousUpVotesBy,
        downVotesBy: previousDownVotesBy,
      }));
    }
  };
};

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralizeVoteThreadDetailActionCreator,
  rollbackVoteThreadDetailActionCreator,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralizeVoteCommentActionCreator,
  rollbackVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
};
