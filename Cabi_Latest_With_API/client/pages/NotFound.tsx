import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cabinet-dark via-cabinet-dark/95 to-cabinet-dark/90">
      <div className="text-center max-w-md mx-auto p-8">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-cabinet-yellow/20 rounded-full flex items-center justify-center">
            <Search className="w-16 h-16 text-cabinet-yellow" />
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-cabinet-yellow mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-cabinet-grey mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Navigation Buttons */}
        <div className="space-y-4">
          <Button
            onClick={handleGoHome}
            className="w-full bg-cabinet-yellow text-black hover:bg-cabinet-light-yellow"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Home
          </Button>
          
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full border-cabinet-yellow/30 text-cabinet-yellow hover:bg-cabinet-yellow/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-cabinet-dark/50 rounded-lg border border-cabinet-yellow/20">
          <p className="text-sm text-cabinet-grey">
            <strong>Requested URL:</strong> {location.pathname}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
