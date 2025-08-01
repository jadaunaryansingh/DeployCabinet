// Centralized routes configuration for CAB-I-NET
// This ensures all routes are properly defined and prevents 404 errors

export const ROUTES = {
  // Public routes (no authentication required)
  PUBLIC: {
    LOGIN: '/login',
    TEST_AUTH: '/test-auth',
  },

  // Protected routes (authentication required)
  PROTECTED: {
    HOME: '/',
    DASHBOARD: '/dashboard',
    BOOKING: '/booking',
    COMMUNITY: '/community',
    CALCULATOR: '/calculator',
    OFFERS: '/offers',
    FRIENDS: '/friends',
    FAVORITE_DRIVERS: '/favorite-drivers',
    ENTERTAINMENT: '/entertainment',
  },

  // Developer routes (developer authentication required)
  DEVELOPER: {
    DASHBOARD: '/developer-dashboard',
    LIVE_RIDES: '/live-rides',
    CUSTOMER_FEEDBACK: '/customer-feedback',
    REVENUE_ANALYTICS: '/revenue-analytics',
  },

  // Utility routes
  UTILITY: {
    NOT_FOUND: '*',
  },
} as const;

// Route definitions for navigation
export const NAVIGATION_ROUTES = [
  {
    path: ROUTES.PROTECTED.DASHBOARD,
    name: 'Dashboard',
    icon: 'Home',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.BOOKING,
    name: 'Book Ride',
    icon: 'Car',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.COMMUNITY,
    name: 'Community',
    icon: 'Users',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.CALCULATOR,
    name: 'Calculator',
    icon: 'Calculator',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.OFFERS,
    name: 'Offers',
    icon: 'Gift',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.FRIENDS,
    name: 'Friends',
    icon: 'Heart',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.FAVORITE_DRIVERS,
    name: 'Favorite Drivers',
    icon: 'Star',
    protected: true,
  },
  {
    path: ROUTES.PROTECTED.ENTERTAINMENT,
    name: 'Entertainment',
    icon: 'Music',
    protected: true,
  },
];

// Developer navigation routes
export const DEVELOPER_ROUTES = [
  {
    path: ROUTES.DEVELOPER.DASHBOARD,
    name: 'Developer Dashboard',
    icon: 'Settings',
    developerOnly: true,
  },
  {
    path: ROUTES.DEVELOPER.LIVE_RIDES,
    name: 'Live Rides',
    icon: 'Activity',
    developerOnly: true,
  },
  {
    path: ROUTES.DEVELOPER.CUSTOMER_FEEDBACK,
    name: 'Customer Feedback',
    icon: 'MessageSquare',
    developerOnly: true,
  },
  {
    path: ROUTES.DEVELOPER.REVENUE_ANALYTICS,
    name: 'Revenue Analytics',
    icon: 'BarChart3',
    developerOnly: true,
  },
];

// Route validation function
export const isValidRoute = (path: string): boolean => {
  const allRoutes = [
    ...Object.values(ROUTES.PUBLIC),
    ...Object.values(ROUTES.PROTECTED),
    ...Object.values(ROUTES.DEVELOPER),
  ];
  
  return allRoutes.includes(path as any);
};

// Route type checking
export const isPublicRoute = (path: string): boolean => {
  return Object.values(ROUTES.PUBLIC).includes(path as any);
};

export const isProtectedRoute = (path: string): boolean => {
  return Object.values(ROUTES.PROTECTED).includes(path as any);
};

export const isDeveloperRoute = (path: string): boolean => {
  return Object.values(ROUTES.DEVELOPER).includes(path as any);
};

// Default redirect routes
export const DEFAULT_ROUTES = {
  AUTHENTICATED: ROUTES.PROTECTED.DASHBOARD,
  UNAUTHENTICATED: ROUTES.PUBLIC.LOGIN,
  DEVELOPER: ROUTES.DEVELOPER.DASHBOARD,
} as const; 