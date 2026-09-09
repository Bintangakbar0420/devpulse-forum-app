import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiPlusCircle, FiArrowLeft } from 'react-icons/fi';
import { asyncAddThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.authUser);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setIsSubmitting(true);
    // Format category: remove leading '#' if typed
    const cleanCategory = category.trim().replace(/^#+/, '');
    const result = await dispatch(
      asyncAddThread({
        title,
        body,
        category: cleanCategory,
      }),
    );
    setIsSubmitting(false);

    if (result && result.success) {
      navigate('/');
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn btn-secondary btn-sm">
          <FiArrowLeft />
          <span>Kembali</span>
        </Link>
      </div>

      <div className="card">
        <h1 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '8px', color: '#fff' }}>
          Mulai Diskusi Baru
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.925rem' }}>
          Bagikan ide, tanyakan permasalahan kode, atau mulai diskusi menarik dengan developer lain.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Judul Diskusi <span style={{ color: 'var(--vote-down)' }}>*</span>
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Contoh: Mengapa useEffect dipanggil dua kali di React 18?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Kategori / Topik
            </label>
            <input
              id="category"
              type="text"
              className="form-input"
              placeholder="Contoh: react, redux, javascript (tanpa tanda #)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="body" className="form-label">
              Isi Diskusi <span style={{ color: 'var(--vote-down)' }}>*</span>
            </label>
            <textarea
              id="body"
              className="comment-textarea"
              style={{ minHeight: '180px' }}
              placeholder="Jelaskan pertanyaan, konteks, atau ide Anda secara mendalam. Anda dapat menuliskan kode atau paragraf."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Link to="/" className="btn btn-secondary">
              Batal
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !title.trim() || !body.trim()}
            >
              <FiPlusCircle />
              <span>{isSubmitting ? 'Mempublikasikan...' : 'Publikasikan Thread'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateThreadPage;
