import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiMessageSquare, FiClock } from 'react-icons/fi';
import Avatar from '../common/Avatar';
import CategoryBadge from '../common/CategoryBadge';
import VoteButton from '../common/VoteButton';
import { postedAt } from '../../utils/dateHelper';
import { stripHtml } from '../../utils/sanitize';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUserId,
  onUpVote,
  onDownVote,
  onCategoryClick,
}) {
  const authorName = user?.name || 'Anonim';
  const authorAvatar = user?.avatar;
  const timeAgo = postedAt(createdAt);
  const excerpt = stripHtml(body, 140);

  return (
    <article className="thread-item">
      <div className="thread-vote-column">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          onUpVote={() => onUpVote(id)}
          onDownVote={() => onDownVote(id)}
          authUserId={authUserId}
        />
      </div>

      <div className="thread-main-column">
        <div className="thread-header-meta">
          <div className="thread-author">
            <Avatar image={authorAvatar} name={authorName} size={26} />
            <span>{authorName}</span>
          </div>
          <span className="thread-time" title={createdAt}>
            <FiClock style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            {timeAgo}
          </span>
          {category && (
            <CategoryBadge
              category={category}
              onClick={onCategoryClick ? () => onCategoryClick(category) : undefined}
            />
          )}
        </div>

        <h3 className="thread-title">
          <Link to={`/threads/${id}`}>{title}</Link>
        </h3>

        <p className="thread-excerpt">{excerpt}</p>

        <div className="thread-footer">
          <Link to={`/threads/${id}`} className="thread-stat">
            <FiMessageSquare />
            <span>{totalComments} Komentar</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    avatar: PropTypes.string,
  }),
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
};

export default ThreadItem;
