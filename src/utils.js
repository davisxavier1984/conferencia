/**
 * Creates a page URL based on the page name
 * @param {string} pageName - The name of the page
 * @returns {string} The URL path
 */
export function createPageUrl(pageName) {
  const pageMap = {
    'Register': '/',
    'Admin': '/admin'
  };

  return pageMap[pageName] || '/';
}

/**
 * Utility function to merge class names
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
