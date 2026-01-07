import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { 
  Shield, 
  User, 
  Wrench, 
  ArrowRight, 
  CheckCircle2,
  Zap,
  Lock,
  Star
} from 'lucide-react';

const Landing = () => {
  const [selectedRole, setSelectedRole] = useState<'user' | 'servicer' | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (selectedRole && name) {
      login(selectedRole, name);
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="sp-gradient-hero relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 mb-6">
                <Shield className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-primary-foreground">Trusted by 50,000+ Users</span>
              </div>
              
              <h1 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl mb-6">
                ServicePro
                <span className="text-accent"> Connect</span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 mb-4">
                Service Protect and Connect
              </p>
              
              <p className="text-lg text-primary-foreground/70 mb-8 max-w-xl">
                A trusted SaaS marketplace for connecting users with verified service providers across multiple categories. Safe, secure, and simple.
              </p>

              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <span>Verified Providers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-accent" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Rated & Reviewed</span>
                </div>
              </div>
            </div>

            {/* Right - Sign In Card */}
            <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <div className="sp-card p-8 bg-card">
                <h2 className="font-display text-2xl font-bold text-center mb-2">
                  Get Started
                </h2>
                <p className="text-muted-foreground text-center mb-6">
                  Choose how you want to join
                </p>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    onClick={() => setSelectedRole('user')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === 'user'
                        ? 'border-sp-blue bg-sp-blue-light'
                        : 'border-border hover:border-sp-blue/50'
                    }`}
                  >
                    <div className={`h-12 w-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      selectedRole === 'user' ? 'bg-sp-blue' : 'bg-muted'
                    }`}>
                      <User className={`h-6 w-6 ${selectedRole === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <p className={`font-semibold ${selectedRole === 'user' ? 'text-sp-blue-dark' : 'text-foreground'}`}>
                      Join as User
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Find services
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedRole('servicer')}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                      selectedRole === 'servicer'
                        ? 'border-sp-green bg-sp-green-light'
                        : 'border-border hover:border-sp-green/50'
                    }`}
                  >
                    <div className={`h-12 w-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                      selectedRole === 'servicer' ? 'bg-sp-green' : 'bg-muted'
                    }`}>
                      <Wrench className={`h-6 w-6 ${selectedRole === 'servicer' ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <p className={`font-semibold ${selectedRole === 'servicer' ? 'text-sp-green-dark' : 'text-foreground'}`}>
                      Join as Servicer
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Offer services
                    </p>
                  </button>
                </div>

                {/* Google Sign In */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <GoogleSignInButton />

                {/* Form Fields */}
                {selectedRole && (
                  <div className="space-y-4 animate-fade-in mt-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1.5"
                      />
                    </div>
                    
                    <Button 
                      onClick={handleJoin}
                      variant={selectedRole === 'user' ? 'user' : 'servicer'}
                      size="lg"
                      className="w-full mt-6"
                      disabled={!name}
                    >
                      Continue as {selectedRole === 'user' ? 'User' : 'Servicer'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <p className="text-xs text-muted-foreground text-center mt-6">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Preview */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-sp-blue-light flex items-center justify-center">
              <Zap className="h-7 w-7 text-sp-blue" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Instant Matching</h3>
            <p className="text-muted-foreground">AI-powered matching connects you with the right provider in minutes.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-sp-green-light flex items-center justify-center">
              <Lock className="h-7 w-7 text-sp-green" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">Secure Payments</h3>
            <p className="text-muted-foreground">Escrow-based payment system ensures safe transactions.</p>
          </div>
          
          <div className="text-center p-6">
            <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-sp-emergency-light flex items-center justify-center">
              <Shield className="h-7 w-7 text-sp-emergency" />
            </div>
            <h3 className="font-display font-semibold text-lg mb-2">SOS Protection</h3>
            <p className="text-muted-foreground">Revolutionary emergency system for your safety.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
