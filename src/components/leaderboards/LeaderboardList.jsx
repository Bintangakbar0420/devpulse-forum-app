import PropTypes from 'prop-types';
import Avatar from '../common/Avatar';

function LeaderboardList({ leaderboards = [], startIndex = 0 }) {
  if (!leaderboards || leaderboards.length === 0) return null;

  return (
    <div className="leaderboard-list">
      {leaderboards.map((item, index) => {
        const rank = startIndex + index + 1;
        return (
          <div key={item.user.id} className="leaderboard-row">
            <span className="leaderboard-rank">#{rank}</span>

            <div className="leaderboard-user">
              <Avatar image={item.user.avatar} name={item.user.name} size={40} />
              <div>
                <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {item.user.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {item.user.email}
                </div>
              </div>
            </div>

            <div className="leaderboard-score-val">
              {item.score.toLocaleString()} pts
            </div>
          </div>
        );
      })}
    </div>
  );
}

LeaderboardList.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string,
        avatar: PropTypes.string,
      }).isRequired,
      score: PropTypes.number.isRequired,
    }),
  ).isRequired,
  startIndex: PropTypes.number,
};

export default LeaderboardList;
