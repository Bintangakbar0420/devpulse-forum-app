import PropTypes from 'prop-types';
import { FiSearch, FiX } from 'react-icons/fi';

function ThreadSearch({ searchKeyword, onSearchChange }) {
  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Cari thread diskusi berdasarkan judul atau kata kunci..."
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchKeyword && (
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}
          onClick={() => onSearchChange('')}
          aria-label="Hapus kata kunci"
        >
          <FiX />
        </button>
      )}
    </div>
  );
}

ThreadSearch.propTypes = {
  searchKeyword: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default ThreadSearch;
