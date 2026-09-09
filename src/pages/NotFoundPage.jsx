import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px' }}>
      <div
        style={{
          fontSize: '4rem',
          color: 'var(--primary-light)',
          marginBottom: '16px',
        }}
      >
        <FiAlertTriangle />
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '12px' }}>
        404 - Halaman Tidak Ditemukan
      </h1>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto 24px' }}>
        Halaman atau diskusi yang Anda cari mungkin telah dihapus, dipindahkan, atau alamat URL yang dimasukkan salah.
      </p>
      <Link to="/" className="btn btn-primary">
        <FiHome />
        <span>Kembali ke Beranda</span>
      </Link>
    </div>
  );
}

export default NotFoundPage;
