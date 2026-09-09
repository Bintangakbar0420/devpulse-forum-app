import PropTypes from 'prop-types';
import { FiInbox } from 'react-icons/fi';
import ThreadItem from './ThreadItem';

function ThreadList({
  threads = [],
  users = [],
  authUserId,
  onUpVote,
  onDownVote,
  onCategoryClick,
}) {
  if (!threads || threads.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <FiInbox />
        </div>
        <h3>Belum Ada Diskusi</h3>
        <p>Tidak ada thread yang sesuai dengan kriteria filter saat ini.</p>
      </div>
    );
  }

  return (
    <div className="threads-list">
      {threads.map((thread) => {
        const user = users.find((u) => u.id === thread.ownerId);
        return (
          <ThreadItem
            key={thread.id}
            {...thread}
            user={user}
            authUserId={authUserId}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
            onCategoryClick={onCategoryClick}
          />
        );
      })}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
      ownerId: PropTypes.string.isRequired,
    }),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  ).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onCategoryClick: PropTypes.func,
};

export default ThreadList;
