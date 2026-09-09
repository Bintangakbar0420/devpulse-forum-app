/**
 * Formats ISO date string to a human-readable relative time string (Indonesian).
 * e.g., "baru saja", "10 menit lalu", "2 jam lalu", "3 hari lalu"
 */
export const postedAt = (dateString) => {
  const now = new Date();
  const posted = new Date(dateString);
  const diffInSeconds = Math.floor((now - posted) / 1000);

  if (Number.isNaN(diffInSeconds) || diffInSeconds < 0) {
    return 'baru saja';
  }

  if (diffInSeconds < 60) {
    return `${diffInSeconds} detik lalu`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} menit lalu`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} jam lalu`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} hari lalu`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} bulan lalu`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} tahun lalu`;
};

export const formatFullDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};
