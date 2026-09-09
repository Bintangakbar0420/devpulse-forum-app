import PropTypes from 'prop-types';
import { FiMessageCircle } from 'react-icons/fi';
import CommentItem from './CommentItem';

function CommentList({
  comments = [],
  authUserId,
  onUpVoteComment,
  onDownVoteComment,
}) {
  if (!comments || comments.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FiMessageCircle />
        </div>
        <p>Belum ada tanggapan pada diskusi ini. Jadilah yang pertama berkomentar!</p>
      </div>
    );
  }

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUserId={authUserId}
          onUpVote={onUpVoteComment}
          onDownVote={onDownVoteComment}
        />
      ))}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
  authUserId: PropTypes.string,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
};

export default CommentList;
