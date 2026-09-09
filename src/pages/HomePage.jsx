import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiTrendingUp } from 'react-icons/fi';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
} from '../states/threads/action';
import {
  setFilterCategoryActionCreator,
  clearFilterCategoryActionCreator,
} from '../states/filterCategory/action';
import ThreadList from '../components/threads/ThreadList';
import CategoryFilter from '../components/threads/CategoryFilter';
import ThreadSearch from '../components/threads/ThreadSearch';

function HomePage() {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const filterCategory = useSelector((state) => state.filterCategory);

  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Extract unique categories from threads
  const categories = useMemo(() => {
    const list = threads.map((thread) => thread.category).filter(Boolean);
    return Array.from(new Set(list));
  }, [threads]);

  // Filter threads by active category and search keyword
  const filteredThreads = useMemo(() => {
    return threads.filter((thread) => {
      const matchCategory = filterCategory
        ? thread.category?.toLowerCase() === filterCategory.toLowerCase()
        : true;

      const matchSearch = searchKeyword.trim()
        ? thread.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          thread.body.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;

      return matchCategory && matchSearch;
    });
  }, [threads, filterCategory, searchKeyword]);

  const handleSelectCategory = (category) => {
    if (!category) {
      dispatch(clearFilterCategoryActionCreator());
    } else {
      dispatch(setFilterCategoryActionCreator(category));
    }
  };

  const handleUpVoteThread = (threadId) => {
    dispatch(asyncToggleUpVoteThread(threadId));
  };

  const handleDownVoteThread = (threadId) => {
    dispatch(asyncToggleDownVoteThread(threadId));
  };

  return (
    <div className="home-page">
      <section className="hero-banner">
        <div>
          <h1 className="hero-title">Ruang Diskusi & Ide Developer Masa Depan</h1>
          <p className="hero-subtitle">
            Eksplorasi ribuan topik seputar React, JavaScript, arsitektur software, dan teknologi modern bersama komunitas pengembang Indonesia.
          </p>
        </div>
        <Link to={authUser ? '/new' : '/login'} className="btn btn-primary">
          <FiPlusCircle />
          <span>Mulai Diskusi Baru</span>
        </Link>
      </section>

      <CategoryFilter
        categories={categories}
        selectedCategory={filterCategory}
        onSelectCategory={handleSelectCategory}
      />

      <ThreadSearch
        searchKeyword={searchKeyword}
        onSearchChange={setSearchKeyword}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiTrendingUp style={{ color: 'var(--primary-light)' }} />
          {filterCategory ? `Diskusi #${filterCategory}` : 'Diskusi Terbaru'}
        </h2>
        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Menampilkan {filteredThreads.length} dari {threads.length} diskusi
        </span>
      </div>

      <ThreadList
        threads={filteredThreads}
        users={users}
        authUserId={authUser?.id}
        onUpVote={handleUpVoteThread}
        onDownVote={handleDownVoteThread}
        onCategoryClick={handleSelectCategory}
      />
    </div>
  );
}

export default HomePage;
