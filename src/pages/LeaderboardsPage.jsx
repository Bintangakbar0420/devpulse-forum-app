import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiAward } from 'react-icons/fi';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardPodium from '../components/leaderboards/LeaderboardPodium';
import LeaderboardList from '../components/leaderboards/LeaderboardList';

function LeaderboardsPage() {
  const dispatch = useDispatch();
  const rawLeaderboards = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  const leaderboards = useMemo(() => {
    return rawLeaderboards.filter(
      (item) => !item.user?.name?.toLowerCase().includes('antigravity') && item.user?.id !== 'user-JDbZgghgPJXCbzip',
    );
  }, [rawLeaderboards]);

  const topThree = leaderboards.slice(0, 3);
  const remaining = leaderboards.slice(3);

  return (
    <div className="leaderboard-container">
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--primary-light)',
            fontWeight: '700',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '8px',
          }}
        >
          <FiAward /> Klasemen Kontributor
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', letterSpacing: '-0.02em' }}>
          Leaderboard Pengguna Aktif
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '8px auto 0' }}>
          Apresiasi bagi para developer yang paling aktif berdiskusi, memberikan solusi, dan berbagi ilmu di DevPulse.
        </p>
      </div>

      <LeaderboardPodium topThree={topThree} />

      {remaining.length > 0 && (
        <>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '32px 0 16px', color: '#fff' }}>
            Peringkat Selanjutnya
          </h2>
          <LeaderboardList leaderboards={remaining} startIndex={3} />
        </>
      )}

      {leaderboards.length === 0 && (
        <div className="empty-state">
          <p>Belum ada data peringkat yang tersedia saat ini.</p>
        </div>
      )}
    </div>
  );
}

export default LeaderboardsPage;
