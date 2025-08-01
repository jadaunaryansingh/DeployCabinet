import { useAuth as useDemoAuth } from '@/hooks/useAuth';
import { useAuth as useFirebaseAuth } from '@/hooks/useUnifiedAuth';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { User, Shield, MoreVertical, Chrome } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoLoginButton() {
  const { authState: demoAuthState, login: demoLogin } = useDemoAuth();
  const { loginWithGoogle } = useFirebaseAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async (email: string, password: string, userType: 'user' | 'developer', label: string) => {
    console.log(`${label} login clicked`);
    const success = await demoLogin(email, password, userType);
    console.log(`${label} login result:`, success);
    
    if (success) {
      console.log(`${label} login successful!`);
      navigate(userType === 'developer' ? '/developer-dashboard' : '/dashboard');
    } else {
      console.log(`${label} login failed!`);
    }
  };

  const handleGoogleLogin = async () => {
    console.log('Google login clicked');
    const success = await loginWithGoogle();
    
    if (success) {
      console.log('Google login successful!');
      navigate('/dashboard');
    } else {
      console.log('Google login failed!');
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('cab-i-net-user');
    localStorage.removeItem('cab-i-net-auth');
    console.log('LocalStorage cleared');
    window.location.reload();
  };

  console.log('DemoLoginButton render - demoAuthState:', demoAuthState);
  
  // Temporarily always show the button for testing
  // if (demoAuthState.isLoggedIn) {
  //   console.log('DemoLoginButton: User is logged in, hiding button');
  //   return null;
  // }

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="w-12 h-12 p-0 rounded-full bg-cabinet-yellow border-cabinet-yellow/20 hover:bg-cabinet-light-yellow text-black font-bold shadow-lg"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="w-56 glass-morphism border-cabinet-yellow/20 backdrop-blur-xl"
        >
          <div className="p-2">
            <p className="text-xs text-cabinet-grey mb-2 px-2">Quick Access</p>
          </div>
          
          <DropdownMenuItem 
            onClick={() => handleDemoLogin('demo@cabinet.com', 'demo123', 'user', 'User Demo')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-cabinet-yellow/10"
          >
            <User className="w-4 h-4 text-green-500" />
            <span>User Demo</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={() => handleDemoLogin('aryan@cabinet.com', 'admin123', 'developer', 'Developer Demo')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-cabinet-yellow/10"
          >
            <Shield className="w-4 h-4 text-blue-500" />
            <span>Developer Demo</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            onClick={handleGoogleLogin}
            className="flex items-center space-x-2 cursor-pointer hover:bg-cabinet-yellow/10"
          >
            <Chrome className="w-4 h-4 text-red-500" />
            <span>Google Login</span>
          </DropdownMenuItem>
          
          <div className="border-t border-cabinet-yellow/10 my-1"></div>
          
          <DropdownMenuItem 
            onClick={() => navigate('/login')}
            className="flex items-center space-x-2 cursor-pointer hover:bg-cabinet-yellow/10"
          >
            <User className="w-4 h-4 text-cabinet-yellow" />
            <span>Full Login Page</span>
          </DropdownMenuItem>
          
          <div className="border-t border-cabinet-yellow/10 my-1"></div>
          
          <DropdownMenuItem 
            onClick={clearLocalStorage}
            className="flex items-center space-x-2 cursor-pointer hover:bg-red-500/10 text-red-400"
          >
            <span className="w-4 h-4">🗑️</span>
            <span>Clear Storage</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
} 