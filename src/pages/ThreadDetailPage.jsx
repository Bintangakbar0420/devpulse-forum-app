import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft, FiMessageSquare } from 'react-icons/fi';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/threads/ThreadDetail';
import CommentInput from '../components/comments/CommentInput';
import CommentList from '../components/comments/CommentList';

function ThreadDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const handleUpVoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const handleDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const handleAddComment = (content) => {
    return dispatch(asyncAddComment({ threadId: id, content }));
  };

  const handleUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const handleDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (!threadDetail) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
        <p>Memuat rincian diskusi...</p>
      </div>
    );
  }

  return (
    <div className="thread-detail-page">
      <div style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn btn-secondary btn-sm">
          <FiArrowLeft />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <ThreadDetail
        {...threadDetail}
        authUserId={authUser?.id}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
      />

      <section className="comments-section">
        <h2 className="comments-header">
          <FiMessageSquare />
          <span>Tanggapan Komunitas ({threadDetail.comments.length})</span>
        </h2>

        <CommentInput
          authUser={authUser}
          onAddComment={handleAddComment}
        />

        <CommentList
          comments={threadDetail.comments}
          authUserId={authUser?.id}
          onUpVoteComment={handleUpVoteComment}
          onDownVoteComment={handleDownVoteComment}
        />
      </section>
    </div>
  );
}

export default ThreadDetailPage;
