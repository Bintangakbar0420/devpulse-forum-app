import PropTypes from 'prop-types';

function CategoryBadge({ category, onClick }) {
  if (!category) return null;

  const formattedCategory = category.startsWith('#') ? category : `#${category}`;

  if (onClick) {
    return (
      <button
        type="button"
        className="category-badge"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        {formattedCategory}
      </button>
    );
  }

  return <span className="category-badge">{formattedCategory}</span>;
}

CategoryBadge.propTypes = {
  category: PropTypes.string,
  onClick: PropTypes.func,
};

export default CategoryBadge;
