import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Users, 
  Calendar, 
  CreditCard, 
  Star,
  Shield,
  ArrowRight,
  CheckCircle2,
  Zap,
  Lock,
  Phone
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'Post Your Job',
      description: 'Describe what you need done. Add photos, location, and preferred timing. Our AI instantly matches you with the best providers.',
      color: 'sp-blue',
      details: [
        'Easy job description form',
        'Photo & location upload',
        'AI-powered matching in seconds',
        'Get multiple quotes instantly',
      ],
    },
    {
      number: 2,
      icon: Users,
      title: 'Get Matched',
      description: 'Verified service providers respond with quotes, availability, and their qualifications. Compare and choose the best fit.',
      color: 'sp-green',
      details: [
        'View provider profiles & ratings',
        'Compare quotes side-by-side',
        'Check availability in real-time',
        'Read verified reviews',
      ],
    },
    {
      number: 3,
      icon: Calendar,
      title: 'Schedule Service',
      description: 'Pick your preferred provider, confirm the timing, and track their arrival. Communication happens through our secure system.',
      color: 'sp-purple',
      details: [
        'Flexible scheduling options',
        'Real-time arrival tracking',
        'Secure in-app messaging',
        'Calendar integration',
      ],
    },
    {
      number: 4,
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Pay with confidence using our escrow-based system. Funds are only released when you\'re satisfied with the work.',
      color: 'sp-orange',
      details: [
        'Multiple payment methods',
        'Escrow protection',
        'Transparent pricing',
        'Automatic receipts',
      ],
    },
    {
      number: 5,
      icon: Star,
      title: 'Rate & Review',
      description: 'Share your experience to help others make informed decisions. Build a trusted community together.',
      color: 'sp-blue',
      details: [
        'Rate service quality',
        'Leave detailed feedback',
        'Photo evidence option',
        'Build provider reputation',
      ],
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Verified Providers',
      description: 'All service providers undergo thorough background checks and verification.',
    },
    {
      icon: Lock,
      title: 'Secure Payments',
      description: 'Escrow-based payment system protects both users and providers.',
    },
    {
      icon: Phone,
      title: 'Privacy Protected',
      description: 'AI-generated secure numbers keep your personal information private.',
    },
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Our AI finds the perfect provider for your needs in seconds.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="sp-gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold text-primary-foreground sm:text-5xl mb-4">
            How ServicePro Works
          </h1>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Simple, secure, and safe. Get connected with trusted professionals in just a few steps.
          </p>
        </div>
      </div>

      {/* Steps */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="space-y-16 lg:space-y-24">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Content */}
              <div className="flex-1">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className={`h-12 w-12 rounded-2xl bg-${step.color} flex items-center justify-center`}>
                    <step.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className={`text-sm font-semibold text-${step.color}`}>STEP {step.number}</span>
                </div>
                
                <h2 className="font-display text-3xl font-bold mb-4">{step.title}</h2>
                <p className="text-lg text-muted-foreground mb-6">{step.description}</p>
                
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-sp-green shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="flex-1 w-full max-w-lg">
                <div className={`sp-card p-8 bg-gradient-to-br from-${step.color}-light to-card`}>
                  <div className="aspect-square rounded-2xl bg-muted/50 flex items-center justify-center">
                    <step.icon className={`h-24 w-24 text-${step.color}/30`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-muted/50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-center mb-4">
            Why Choose ServicePro?
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We've built features that prioritize your safety, convenience, and peace of mind.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="sp-card p-6 text-center">
                <div className="h-14 w-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="sp-card p-8 lg:p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-sp-blue-light to-card">
          <h2 className="font-display text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of users who trust ServicePro Connect for their service needs.
          </p>
          <Link to="/services">
            <Button variant="hero" size="xl">
              Browse Services
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
