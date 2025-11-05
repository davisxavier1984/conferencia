// Utility function to create page URLs
export function createPageUrl(pageName: string): string {
  // For now, using React Router paths
  const routes: Record<string, string> = {
    'Register': '/',
    'Admin': '/admin',
  };

  return routes[pageName] || '/';
}
