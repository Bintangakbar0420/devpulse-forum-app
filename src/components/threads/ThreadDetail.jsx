import PropTypes from 'prop-types';
import { FiClock, FiShare2 } from 'react-icons/fi';
import Avatar from '../common/Avatar';
import CategoryBadge from '../common/CategoryBadge';
import VoteButton from '../common/VoteButton';
import { postedAt, formatFullDate } from '../../utils/dateHelper';
import { sanitizeHtml } from '../../utils/sanitize';

function ThreadDetail({
  id: _id,
  title,
  body,
  category,
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
  const fullDate = formatFullDate(createdAt);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Tautan thread berhasil disalin ke clipboard!');
    }
  };

  return (
    <article className="detail-thread-card">
      <header className="detail-header">
        <div style={{ marginBottom: '14px' }}>
          {category && <CategoryBadge category={category} />}
        </div>

        <h1 className="detail-title">{title}</h1>

        <div className="detail-author-row">
          <div className="detail-author-info">
            <Avatar image={authorAvatar} name={authorName} size={48} />
            <div>
              <div className="detail-author-name">{authorName}</div>
              <div className="detail-author-date" title={fullDate}>
                <FiClock style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                Dibuat {timeAgo} ({fullDate})
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleShare}
            title="Bagikan Tautan"
          >
            <FiShare2 />
            <span>Bagikan</span>
          </button>
        </div>
      </header>

      {/* Render HTML content securely using DOMPurify */}
      <div
        className="detail-body"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(body) }}
      />

      <footer className="detail-footer">
        <VoteButton
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
          authUserId={authUserId}
        />
      </footer>
    </article>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
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

export default ThreadDetail;
