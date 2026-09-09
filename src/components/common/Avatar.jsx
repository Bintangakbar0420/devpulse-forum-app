import { useState } from 'react';
import PropTypes from 'prop-types';

function Avatar({ image, name, size = 40, className = '' }) {
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || 'User',
  )}&background=10b981&color=fff&bold=true`;

  const [src, setSrc] = useState(image || fallbackUrl);

  const handleError = () => {
    setSrc(fallbackUrl);
  };

  return (
    <img
      src={src}
      alt={name || 'Avatar Pengguna'}
      width={size}
      height={size}
      onError={handleError}
      className={`avatar-img ${className}`}
      loading="lazy"
    />
  );
}

Avatar.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default Avatar;
