import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiSend, FiLogIn } from 'react-icons/fi';

function CommentInput({ onAddComment, authUser }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authUser) {
    return (
      <div className="comment-input-card" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          Silakan <strong>masuk ke akun Anda</strong> untuk ikut berdiskusi dan memberikan komentar.
        </p>
        <Link to="/login" className="btn btn-primary btn-sm">
          <FiLogIn />
          <span>Masuk untuk Berkomentar</span>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    const result = await onAddComment(content);
    setIsSubmitting(false);

    if (result && result.success) {
      setContent('');
    }
  };

  return (
    <div className="comment-input-card">
      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '12px' }}>
        Beri Tanggapan
      </h3>
      <form onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          placeholder="Tuliskan komentar atau opini konstruktif Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting || !content.trim()}
          >
            <FiSend />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Komentar'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

CommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default CommentInput;
