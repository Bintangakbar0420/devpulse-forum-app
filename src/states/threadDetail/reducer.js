import { ActionType } from './action';

const threadDetailReducer = (threadDetail = null, action = {}) => {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.CLEAR_THREAD_DETAIL:
    return null;
  case ActionType.ADD_COMMENT:
    return {
      ...threadDetail,
      comments: [action.payload.comment, ...threadDetail.comments],
    };
  case ActionType.TOGGLE_UPVOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId)
        ? threadDetail.upVotesBy
        : [...threadDetail.upVotesBy, action.payload.userId],
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId)
        ? threadDetail.downVotesBy
        : [...threadDetail.downVotesBy, action.payload.userId],
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.TOGGLE_NEUTRALIZE_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: threadDetail.upVotesBy.filter((id) => id !== action.payload.userId),
      downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.userId),
    };
  case ActionType.ROLLBACK_VOTE_THREAD_DETAIL:
    return {
      ...threadDetail,
      upVotesBy: action.payload.upVotesBy,
      downVotesBy: action.payload.downVotesBy,
    };
  case ActionType.TOGGLE_UPVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy
              : [...comment.upVotesBy, action.payload.userId],
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.TOGGLE_DOWNVOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy
              : [...comment.downVotesBy, action.payload.userId],
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.TOGGLE_NEUTRALIZE_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.filter((id) => id !== action.payload.userId),
            downVotesBy: comment.downVotesBy.filter((id) => id !== action.payload.userId),
          };
        }
        return comment;
      }),
    };
  case ActionType.ROLLBACK_VOTE_COMMENT:
    return {
      ...threadDetail,
      comments: threadDetail.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: action.payload.upVotesBy,
            downVotesBy: action.payload.downVotesBy,
          };
        }
        return comment;
      }),
    };
  default:
    return threadDetail;
  }
};

export default threadDetailReducer;
