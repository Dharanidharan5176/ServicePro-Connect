import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Shield, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Wrench, 
  AlertTriangle,
  LogOut,
  Search
} from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, userRole, userName, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Shield className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-display font-bold text-foreground">ServicePro</span>
              <span className="text-lg font-display font-bold text-accent"> Connect</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center gap-1">
              <Link to="/home">
                <Button 
                  variant={isActive('/home') ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  Home
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant={isActive('/services') ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  Services
                </Button>
              </Link>
              
              {/* Role Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1">
                    {userRole === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Wrench className="h-4 w-4" />
                    )}
                    <span className="capitalize">{userRole}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => switchRole('user')}>
                    <User className="h-4 w-4 mr-2" />
                    User Mode
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole('servicer')}>
                    <Wrench className="h-4 w-4 mr-2" />
                    Servicer Mode
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* SOS Button */}
              <Link to="/sos">
                <Button variant="sos" size="sm" className="ml-2">
                  <AlertTriangle className="h-4 w-4" />
                  SOS
                </Button>
              </Link>

              <Link to="/how-it-works">
                <Button 
                  variant={isActive('/how-it-works') ? 'secondary' : 'ghost'}
                  size="sm"
                >
                  How It Works
                </Button>
              </Link>
            </div>
          )}

          {/* Right side - Search & User */}
          <div className="flex items-center gap-3">
            {isAuthenticated && userRole === 'user' && (
              <div className="hidden lg:flex items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="h-9 w-64 rounded-lg border bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <span className="hidden sm:block">{userName}</span>
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/">
                <Button variant="default" size="sm">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && isAuthenticated && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col gap-2">
              <Link to="/home" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Services</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
              </Link>
              <Link to="/sos" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="sos" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  SOS Emergency
                </Button>
              </Link>
              <Link to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">How It Works</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
