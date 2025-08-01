import { ROUTES, isValidRoute, isPublicRoute, isProtectedRoute, isDeveloperRoute } from '../routes';

/**
 * Route validation and navigation utilities
 * Helps prevent 404 errors and provides better route handling
 */

export interface RouteInfo {
  path: string;
  isValid: boolean;
  isPublic: boolean;
  isProtected: boolean;
  isDeveloper: boolean;
  requiresAuth: boolean;
  requiresDeveloper: boolean;
}

/**
 * Validates a route and returns information about it
 */
export const validateRoute = (path: string): RouteInfo => {
  const isValid = isValidRoute(path);
  const isPublic = isPublicRoute(path);
  const isProtected = isProtectedRoute(path);
  const isDeveloper = isDeveloperRoute(path);
  
  return {
    path,
    isValid,
    isPublic,
    isProtected,
    isDeveloper,
    requiresAuth: isProtected || isDeveloper,
    requiresDeveloper: isDeveloper,
  };
};

/**
 * Gets the appropriate redirect path based on authentication status
 */
export const getRedirectPath = (
  isAuthenticated: boolean,
  userType?: 'user' | 'developer'
): string => {
  if (!isAuthenticated) {
    return ROUTES.PUBLIC.LOGIN;
  }
  
  if (userType === 'developer') {
    return ROUTES.DEVELOPER.DASHBOARD;
  }
  
  return ROUTES.PROTECTED.DASHBOARD;
};

/**
 * Checks if a user can access a specific route
 */
export const canAccessRoute = (
  path: string,
  isAuthenticated: boolean,
  userType?: 'user' | 'developer'
): boolean => {
  const routeInfo = validateRoute(path);
  
  // Public routes are always accessible
  if (routeInfo.isPublic) {
    return true;
  }
  
  // Protected routes require authentication
  if (routeInfo.requiresAuth && !isAuthenticated) {
    return false;
  }
  
  // Developer routes require developer authentication
  if (routeInfo.requiresDeveloper && userType !== 'developer') {
    return false;
  }
  
  return true;
};

/**
 * Gets all accessible routes for a user
 */
export const getAccessibleRoutes = (
  isAuthenticated: boolean,
  userType?: 'user' | 'developer'
): string[] => {
  const allRoutes = [
    ...Object.values(ROUTES.PUBLIC),
    ...Object.values(ROUTES.PROTECTED),
    ...Object.values(ROUTES.DEVELOPER),
  ];
  
  return allRoutes.filter(route => 
    canAccessRoute(route, isAuthenticated, userType)
  );
};

/**
 * Logs route access attempts for debugging
 */
export const logRouteAccess = (
  path: string,
  isAuthenticated: boolean,
  userType?: 'user' | 'developer'
): void => {
  const routeInfo = validateRoute(path);
  const canAccess = canAccessRoute(path, isAuthenticated, userType);
  
  console.log('Route Access Log:', {
    path,
    routeInfo,
    isAuthenticated,
    userType,
    canAccess,
    timestamp: new Date().toISOString(),
  });
  
  if (!canAccess) {
    console.warn(`Access denied to route: ${path}`);
  }
};

/**
 * Handles invalid route navigation
 */
export const handleInvalidRoute = (
  path: string,
  navigate: (path: string) => void
): void => {
  console.error(`Invalid route accessed: ${path}`);
  
  // Try to find a similar route or redirect to home
  const similarRoute = findSimilarRoute(path);
  if (similarRoute) {
    console.log(`Redirecting to similar route: ${similarRoute}`);
    navigate(similarRoute);
  } else {
    console.log('Redirecting to home page');
    navigate(ROUTES.PROTECTED.HOME);
  }
};

/**
 * Finds a similar route if the requested route doesn't exist
 */
const findSimilarRoute = (path: string): string | null => {
  const allRoutes = [
    ...Object.values(ROUTES.PUBLIC),
    ...Object.values(ROUTES.PROTECTED),
    ...Object.values(ROUTES.DEVELOPER),
  ];
  
  // Remove leading slash for comparison
  const cleanPath = path.replace(/^\/+/, '');
  
  // Look for exact matches first
  const exactMatch = allRoutes.find(route => 
    route.replace(/^\/+/, '') === cleanPath
  );
  
  if (exactMatch) {
    return exactMatch;
  }
  
  // Look for partial matches
  const partialMatch = allRoutes.find(route => 
    route.replace(/^\/+/, '').includes(cleanPath) ||
    cleanPath.includes(route.replace(/^\/+/, ''))
  );
  
  return partialMatch || null;
}; 