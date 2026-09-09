import PropTypes from 'prop-types';
import { FiTag, FiX } from 'react-icons/fi';

function CategoryFilter({ categories = [], selectedCategory, onSelectCategory }) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="filter-section">
      <div className="filter-header">
        <span className="section-label">
          <FiTag /> Kategori Populer
        </span>
        {selectedCategory && (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => onSelectCategory(null)}
          >
            <FiX /> Reset Filter
          </button>
        )}
      </div>

      <div className="category-tags">
        <button
          type="button"
          className={`category-pill ${!selectedCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          Semua
        </button>

        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          const displayLabel = category.startsWith('#') ? category : `#${category}`;
          return (
            <button
              key={category}
              type="button"
              className={`category-pill ${isSelected ? 'active' : ''}`}
              onClick={() => onSelectCategory(isSelected ? null : category)}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
