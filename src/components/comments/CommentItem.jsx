import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';
import VoteButton from '../common/VoteButton';
import { postedAt } from '../../utils/dateHelper';
import { sanitizeHtml } from '../../utils/sanitize';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy = [],
  downVotesBy = [],
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const authorName = owner?.name || 'Anonim';
  const authorAvatar = owner?.avatar;
  const timeAgo = postedAt(createdAt);

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar image={authorAvatar} name={authorName} size={32} />
          <div>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              {authorName}
            </span>
            <span
              style={{
                marginLeft: '8px',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
            >
              • {timeAgo}
            </span>
          </div>
        </div>
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
      />

      <div className="comment-footer">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          authUserId={authUserId}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
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
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default CommentItem;
