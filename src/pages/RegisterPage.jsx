import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiUserPlus, FiUser, FiMail, FiLock, FiCheckCircle } from 'react-icons/fi';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok dengan kata sandi.');
      return;
    }

    if (password.length < 6) {
      alert('Kata sandi harus terdiri dari minimal 6 karakter.');
      return;
    }

    setIsLoading(true);
    const result = await dispatch(asyncRegisterUser({ name, email, password }));
    setIsLoading(false);

    if (result && result.success) {
      alert('Pendaftaran berhasil! Silakan masuk dengan akun baru Anda.');
      navigate('/login');
    }
  };

  return (
    <div className="form-card">
      <h1 className="form-title">Daftar Akun</h1>
      <p className="form-subtitle">
        Bergabunglah bersama ribuan developer lainnya di DevPulse.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            <FiUser style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Nama Lengkap
          </label>
          <input
            id="name"
            type="text"
            className="form-input"
            placeholder="Contoh: Alex Pratama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
        </div>

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
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            <FiCheckCircle style={{ verticalAlign: 'middle', marginRight: '6px' }} />
            Konfirmasi Kata Sandi
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="form-input"
            placeholder="Ketik ulang kata sandi Anda"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={isLoading}
          style={{ marginTop: '10px' }}
        >
          <FiUserPlus />
          <span>{isLoading ? 'Mendaftarkan...' : 'Buat Akun Sekarang'}</span>
        </button>
      </form>

      <p className="form-footer-text">
        Sudah memiliki akun? <Link to="/login">Masuk di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
