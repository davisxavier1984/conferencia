export function createPageUrl(pageName) {
  const routes = {
    'Register': '/',
    'Admin': '/admin',
    'Confirmation': '/confirmation'
  };

  return routes[pageName] || '/';
}
