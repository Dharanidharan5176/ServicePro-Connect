import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  FileText, 
  Users, 
  Calendar, 
  CreditCard, 
  Star,
  AlertTriangle,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react';

const Home = () => {
  const { userName, userRole } = useAuth();

  const steps = [
    {
      icon: FileText,
      title: 'Post Your Job',
      description: 'Describe your service need with photos & location. AI matches instantly.',
      color: 'sp-blue',
    },
    {
      icon: Users,
      title: 'Get Matched',
      description: 'Verified providers respond with quotes & availability.',
      color: 'sp-green',
    },
    {
      icon: Calendar,
      title: 'Schedule Service',
      description: 'Choose provider, confirm timing, track arrival.',
      color: 'sp-purple',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Escrow-based secure payment with multiple options.',
      color: 'sp-orange',
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Share experience to build a trusted community.',
      color: 'sp-blue',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="sp-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary-foreground/10 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 py-20 lg:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-primary-foreground">
                Welcome back, {userName}!
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl lg:text-6xl mb-6">
              ServicePro
              <span className="text-accent"> Connect</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 font-medium mb-2">
              Service Protect and Connect
            </p>
            
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              A trusted SaaS marketplace for connecting users with verified service providers across multiple categories. Safe, secure, and simple.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/services">
                <Button variant="hero" size="xl">
                  {userRole === 'user' ? 'Browse Services' : 'View Requests'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/sos">
                <Button variant="heroOutline" size="xl">
                  <AlertTriangle className="h-5 w-5" />
                  SOS System
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">
              How ServicePro Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and safe. Get connected with trusted professionals in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="sp-card p-6 text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-4">
                  <div className={`h-16 w-16 mx-auto rounded-2xl bg-${step.color}-light flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`h-8 w-8 text-${step.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Innovation Section */}
      <section className="py-20 lg:py-28 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-sp-emergency-light px-4 py-2 mb-6">
              <Shield className="h-4 w-4 text-sp-emergency" />
              <span className="text-sm font-medium text-sp-emergency">Safety First</span>
            </div>
            <h2 className="font-display text-3xl font-bold sm:text-4xl mb-4">
              Revolutionary SOS System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your safety is our priority. Our innovative emergency system keeps you protected.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Police Alert Card */}
            <div className="sp-card p-8 bg-gradient-to-br from-sp-emergency-light to-card">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-sp-emergency flex items-center justify-center shrink-0">
                  <Phone className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                    🚨 Police Alert
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    One-tap SOS instantly notifies the nearest police station with your live location. Help arrives when you need it most.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Instant location sharing
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Direct police notification
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Audio recording capability
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Neighbor Network Card */}
            <div className="sp-card p-8 bg-gradient-to-br from-sp-green-light to-card">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-sp-green flex items-center justify-center shrink-0">
                  <MapPin className="h-7 w-7 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-2 flex items-center gap-2">
                    🏘️ Neighbor Network
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Instantly notifies trusted neighbors or emergency contacts for immediate help. Community safety at your fingertips.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Pre-set emergency contacts
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Neighborhood alerts
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-sp-green" />
                      Real-time location tracking
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/sos">
              <Button variant="sos" size="xl">
                <AlertTriangle className="h-5 w-5" />
                Learn About Safety
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-display font-bold text-primary">50K+</p>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-accent">10K+</p>
              <p className="text-muted-foreground">Verified Providers</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-sp-orange">100K+</p>
              <p className="text-muted-foreground">Jobs Completed</p>
            </div>
            <div>
              <p className="text-3xl font-display font-bold text-sp-purple">4.9★</p>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
