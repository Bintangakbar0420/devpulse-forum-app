import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogIn, FiMail, FiLock, FiZap } from 'react-icons/fi';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    setIsLoading(false);

    if (result && result.success) {
      navigate('/');
    }
  };

  const handleFillDemoAccount = () => {
    // Fill demo account for easy testing
    setEmail('john_doe@example.com');
    setPassword('secretpassword');
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Selamat Datang</h1>
      <p className="form-subtitle">
        Masuk ke akun DevPulse Anda untuk mulai berdiskusi.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <FiMail style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Alamat Email
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            <FiLock style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Kata Sandi
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}
          style={{ marginTop: '10px' }}
        >
          <FiLogIn />
          <span>{isLoading ? 'Memproses...' : 'Masuk Sekarang'}</span>
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block btn-sm"
          style={{ marginTop: '10px' }}
          onClick={handleFillDemoAccount}
        >
          <FiZap />
          <span>Isi Contoh Akun Demo</span>
        </button>
      </form>

      <p className="form-footer-text">
        Belum memiliki akun? <Link to="/register">Daftar sekarang</Link>
      </p>
    </div>
  );
}

export default LoginPage;
