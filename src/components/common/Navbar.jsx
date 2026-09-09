import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { FiMessageSquare, FiAward, FiPlusCircle, FiLogOut, FiLogIn, FiUserPlus } from 'react-icons/fi';
import { BsActivity } from 'react-icons/bs';
import Avatar from './Avatar';

function Navbar({ authUser, onLogout }) {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">
            <BsActivity />
          </div>
          <span>DevPulse</span>
          <span className="brand-tag">v1.0</span>
        </Link>

        <nav className="navbar-nav">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
            <FiMessageSquare />
            <span>Threads</span>
          </NavLink>

          <NavLink to="/leaderboards" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <FiAward />
            <span>Leaderboard</span>
          </NavLink>

          {authUser ? (
            <>
              <Link to="/new" className="btn btn-primary btn-sm">
                <FiPlusCircle />
                <span>Buat Thread</span>
              </Link>

              <div className="nav-user">
                <div className="nav-user-info" title={authUser.email}>
                  <Avatar image={authUser.avatar} name={authUser.name} size={34} />
                  <span className="nav-user-name">{authUser.name}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-danger-ghost btn-sm"
                  onClick={onLogout}
                  title="Keluar / Logout"
                  aria-label="Logout"
                >
                  <FiLogOut />
                </button>
              </div>
            </>
          ) : (
            <div className="nav-user">
              <Link to="/login" className="btn btn-secondary btn-sm">
                <FiLogIn />
                <span>Masuk</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <FiUserPlus />
                <span>Daftar</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

Navbar.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
