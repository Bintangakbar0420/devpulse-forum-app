import DOMPurify from 'dompurify';

/**
 * Sanitize raw HTML string using DOMPurify
 */
export const sanitizeHtml = (htmlContent) => {
  if (!htmlContent) return '';
  return DOMPurify.sanitize(htmlContent);
};

/**
 * Strips HTML tags to produce a clean snippet of plain text
 */
export const stripHtml = (htmlContent, maxLength = 160) => {
  if (!htmlContent) return '';
  const text = htmlContent.replace(/<[^>]*>?/gm, '').trim();
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};
