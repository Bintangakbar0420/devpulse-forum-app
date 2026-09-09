import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';

function LeaderboardPodium({ topThree = [] }) {
  if (!topThree || topThree.length === 0) return null;

  const [first, second, third] = topThree;

  return (
    <div className="podium-section">
      {/* 2nd Place */}
      {second && (
        <div className="podium-card podium-2">
          <span className="podium-badge badge-silver">#2 Silver</span>
          <div className="podium-avatar">
            <Avatar image={second.user.avatar} name={second.user.name} size={64} />
          </div>
          <div className="podium-name">{second.user.name}</div>
          <div className="podium-score">{second.score.toLocaleString()} pts</div>
        </div>
      )}

      {/* 1st Place */}
      {first && (
        <div className="podium-card podium-1">
          <span className="podium-badge badge-gold">#1 Juara</span>
          <div className="podium-avatar">
            <Avatar image={first.user.avatar} name={first.user.name} size={76} />
          </div>
          <div className="podium-name">{first.user.name}</div>
          <div className="podium-score">{first.score.toLocaleString()} pts</div>
        </div>
      )}

      {/* 3rd Place */}
      {third && (
        <div className="podium-card podium-3">
          <span className="podium-badge badge-bronze">#3 Bronze</span>
          <div className="podium-avatar">
            <Avatar image={third.user.avatar} name={third.user.name} size={64} />
          </div>
          <div className="podium-name">{third.user.name}</div>
          <div className="podium-score">{third.score.toLocaleString()} pts</div>
        </div>
      )}
    </div>
  );
}

LeaderboardPodium.propTypes = {
  topThree: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default LeaderboardPodium;
