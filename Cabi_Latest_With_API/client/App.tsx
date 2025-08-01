import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppStateContext, useAppStateProvider } from "./hooks/useAppState";
import { AuthContext, useAuthProvider } from "./hooks/useAuth";
import { AuthContext as FirebaseAuthContext, useAuthProvider as useFirebaseAuthProvider } from "./hooks/useFirebaseAuth";
import NotificationSystem from "./components/NotificationSystem";
import DemoLoginButton from "./components/DemoLoginButton";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import DeveloperDashboardPage from "./pages/DeveloperDashboardPage";
import LiveRidesPage from "./pages/LiveRidesPage";
import CustomerFeedbackPage from "./pages/CustomerFeedbackPage";
import RevenueAnalyticsPage from "./pages/RevenueAnalyticsPage";
import CommunityPage from "./pages/CommunityPage";
import CalculatorPage from "./pages/CalculatorPage";
import OffersPage from "./pages/OffersPage";
import FriendsPage from "./pages/FriendsPage";
import FavoriteDriversPage from "./pages/FavoriteDriversPage";
import EntertainmentPage from "./pages/EntertainmentPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TestAuthPage from "./pages/TestAuthPage";
import { ROUTES, DEFAULT_ROUTES } from "./routes";

console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY);

const queryClient = new QueryClient();

const AppRoutes = () => (
  <>
    <DemoLoginButton />
    <Routes>
      {/* Public routes */}
      <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.PUBLIC.TEST_AUTH} element={<TestAuthPage />} />

      {/* Root route - redirect based on user type */}
      <Route
        path={ROUTES.PROTECTED.HOME}
        element={
          <ProtectedRoute>
            <Navigate to={DEFAULT_ROUTES.AUTHENTICATED} replace />
          </ProtectedRoute>
        }
      />

      {/* Landing page accessible via direct route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        }
      />

      {/* Protected user routes */}
      <Route
        path={ROUTES.PROTECTED.BOOKING}
        element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.DASHBOARD}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.COMMUNITY}
        element={
          <ProtectedRoute>
            <CommunityPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.CALCULATOR}
        element={
          <ProtectedRoute>
            <CalculatorPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.OFFERS}
        element={
          <ProtectedRoute>
            <OffersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.FRIENDS}
        element={
          <ProtectedRoute>
            <FriendsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.FAVORITE_DRIVERS}
        element={
          <ProtectedRoute>
            <FavoriteDriversPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PROTECTED.ENTERTAINMENT}
        element={
          <ProtectedRoute>
            <EntertainmentPage />
          </ProtectedRoute>
        }
      />

      {/* Developer-only routes */}
      <Route
        path={ROUTES.DEVELOPER.DASHBOARD}
        element={
          <ProtectedRoute requiredUserType="developer">
            <DeveloperDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.DEVELOPER.LIVE_RIDES}
        element={
          <ProtectedRoute requiredUserType="developer">
            <LiveRidesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.DEVELOPER.CUSTOMER_FEEDBACK}
        element={
          <ProtectedRoute requiredUserType="developer">
            <CustomerFeedbackPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.DEVELOPER.REVENUE_ANALYTICS}
        element={
          <ProtectedRoute requiredUserType="developer">
            <RevenueAnalyticsPage />
          </ProtectedRoute>
        }
      />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      
      {/* Catch-all route - must be last */}
      <Route path={ROUTES.UTILITY.NOT_FOUND} element={<NotFound />} />
    </Routes>
  </>
);

const AppWithFirebaseAuth = () => {
  const appState = useAppStateProvider();
  const authProvider = useFirebaseAuthProvider();
  const demoAuthProvider = useAuthProvider();

  return (
    <FirebaseAuthContext.Provider value={authProvider}>
      <AuthContext.Provider value={demoAuthProvider}>
        <AppStateContext.Provider value={appState}>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <NotificationSystem />
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </AppStateContext.Provider>
      </AuthContext.Provider>
    </FirebaseAuthContext.Provider>
  );
};

const AppWithDemoAuth = () => {
  const appState = useAppStateProvider();
  const authProvider = useAuthProvider();

  return (
    <AuthContext.Provider value={authProvider}>
      <AppStateContext.Provider value={appState}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <NotificationSystem />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AppStateContext.Provider>
    </AuthContext.Provider>
  );
};

const App = () => {
  // Force Firebase authentication for full functionality
  const useFirebaseAuth = true; // Always use Firebase auth
  
  console.log('🔐 Using Firebase Authentication:', useFirebaseAuth);
  
  return useFirebaseAuth ? <AppWithFirebaseAuth /> : <AppWithDemoAuth />;
};

export default App;
