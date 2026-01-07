import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { serviceCategories } from '@/data/services';
import { toast } from 'sonner';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronLeft,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Shield,
  Award
} from 'lucide-react';

const ProviderDetails = () => {
  const { serviceId, providerId } = useParams();
  const navigate = useNavigate();
  const [isRequesting, setIsRequesting] = useState(false);

  const service = serviceCategories.find(cat => cat.id === serviceId);
  const provider = service?.providers.find(p => p.id === providerId);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">😔</p>
          <h2 className="font-display font-bold text-xl mb-2">Provider not found</h2>
          <Button onClick={() => navigate('/services')}>Back to Services</Button>
        </div>
      </div>
    );
  }

  const handleRequest = () => {
    setIsRequesting(true);
    setTimeout(() => {
      toast.success('Service request sent!', {
        description: `${provider.name} will be notified of your request.`,
      });
      setIsRequesting(false);
    }, 1500);
  };

  const handleDecline = () => {
    navigate('/services');
    toast.info('Request cancelled');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b py-4">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="sp-card p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
                  <span className="text-4xl font-display font-bold text-primary">
                    {provider.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                
                <div className="text-center sm:text-left flex-1">
                  <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
                    <h1 className="font-display font-bold text-2xl">{provider.name}</h1>
                    {provider.verified && (
                      <Badge className="bg-sp-green text-accent-foreground gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{provider.company}</p>
                  
                  <div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {provider.location}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {provider.experience}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="sp-card p-8">
              <h2 className="font-display font-bold text-lg mb-4">About</h2>
              <p className="text-muted-foreground leading-relaxed">
                {provider.description}
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <Award className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Licensed</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <Shield className="h-6 w-6 mx-auto mb-2 text-sp-green" />
                  <p className="text-sm font-medium">Insured</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 text-center">
                  <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-sp-blue" />
                  <p className="text-sm font-medium">Background Check</p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="sp-card p-8">
              <h2 className="font-display font-bold text-lg mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl bg-muted/50">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      "Excellent service! Very professional and completed the work on time. Highly recommended."
                    </p>
                    <p className="text-sm font-medium mt-2">- Happy Customer</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <div className="sp-card p-6 sticky top-24">
              <div className="text-center mb-6">
                <p className="text-4xl font-display font-bold text-primary">
                  ${provider.hourlyRate}
                </p>
                <p className="text-muted-foreground">per hour</p>
              </div>

              <Badge 
                variant="secondary" 
                className="w-full justify-center py-2 mb-6 bg-sp-green-light text-sp-green-dark"
              >
                {provider.availability}
              </Badge>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <span>Flexible scheduling</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span>Secure escrow payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>AI-protected contact</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="w-full"
                  onClick={handleRequest}
                  disabled={isRequesting}
                >
                  {isRequesting ? 'Sending Request...' : 'Request Service'}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
              </div>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Communication happens via AI-generated secure number for privacy protection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDetails;
