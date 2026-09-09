import PropTypes from 'prop-types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';

function VoteButton({
  upVotesBy = [],
  downVotesBy = [],
  onUpVote,
  onDownVote,
  authUserId,
}) {
  const isUpVoted = authUserId ? upVotesBy.includes(authUserId) : false;
  const isDownVoted = authUserId ? downVotesBy.includes(authUserId) : false;

  return (
    <div className="vote-widget">
      <button
        type="button"
        aria-label="Upvote"
        className={`vote-btn ${isUpVoted ? 'active-up' : ''}`}
        onClick={onUpVote}
        title={isUpVoted ? 'Batal Upvote' : 'Upvote'}
      >
        <FiThumbsUp />
        <span>{upVotesBy.length}</span>
      </button>

      <button
        type="button"
        aria-label="Downvote"
        className={`vote-btn ${isDownVoted ? 'active-down' : ''}`}
        onClick={onDownVote}
        title={isDownVoted ? 'Batal Downvote' : 'Downvote'}
      >
        <FiThumbsDown />
        <span>{downVotesBy.length}</span>
      </button>
    </div>
  );
}

VoteButton.propTypes = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string),
  downVotesBy: PropTypes.arrayOf(PropTypes.string),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  authUserId: PropTypes.string,
};

export default VoteButton;
