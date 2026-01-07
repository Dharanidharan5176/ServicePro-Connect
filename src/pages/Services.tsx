import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { serviceCategories, Provider } from '@/data/services';
import AISearchBar from '@/components/AISearchBar';
import { 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ChevronLeft
} from 'lucide-react';

const Services = () => {
  const { userRole } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedService = serviceCategories.find(cat => cat.id === selectedCategory);

  if (userRole === 'servicer') {
    return (
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">Service Categories</h1>
            <p className="text-muted-foreground">Manage your service offerings</p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">As a servicer, manage your requests from the Dashboard.</p>
            <Link to="/dashboard">
              <Button variant="accent" size="lg">
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b py-8">
        <div className="container mx-auto px-4">
          {selectedCategory ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedCategory(null)}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="font-display text-3xl font-bold flex items-center gap-3">
                  <span className="text-4xl">{selectedService?.icon}</span>
                  {selectedService?.name} Services
                </h1>
                <p className="text-muted-foreground mt-1">
                  {selectedService?.providers.length || 0} providers available
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">Browse Services</h1>
              <p className="text-muted-foreground mb-6">Find trusted professionals for any job</p>
              
              {/* AI Search Bar */}
              <AISearchBar 
                onCategorySelect={(categoryId) => setSelectedCategory(categoryId)} 
                className="max-w-2xl"
              />
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {!selectedCategory ? (
          /* Service Categories Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className="sp-card p-6 text-center group cursor-pointer"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.description}</p>
                <p className="text-xs text-primary mt-2 font-medium">
                  {category.providers.length} providers
                </p>
              </button>
            ))}
          </div>
        ) : (
          /* Providers List */
          <div className="space-y-4">
            {selectedService?.providers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-4xl mb-4">😔</p>
                <h3 className="font-semibold text-lg mb-2">No providers available</h3>
                <p className="text-muted-foreground">Check back soon for new service providers.</p>
              </div>
            ) : (
              selectedService?.providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} serviceId={selectedCategory} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProviderCard = ({ provider, serviceId }: { provider: Provider; serviceId: string }) => {
  return (
    <Link to={`/provider/${serviceId}/${provider.id}`}>
      <div className="sp-card p-6 flex flex-col sm:flex-row gap-6 cursor-pointer">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <span className="text-3xl font-display font-bold text-primary">
            {provider.name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h3 className="font-display font-bold text-lg flex items-center gap-2 justify-center sm:justify-start">
                {provider.name}
                {provider.verified && (
                  <CheckCircle2 className="h-4 w-4 text-sp-green" />
                )}
              </h3>
              <p className="text-muted-foreground text-sm">{provider.company}</p>
            </div>
            <Badge variant="secondary" className="mx-auto sm:mx-0 w-fit">
              {provider.availability}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 mt-3 justify-center sm:justify-start text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              {provider.rating} ({provider.reviews} reviews)
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {provider.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {provider.experience} experience
            </span>
          </div>

          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
            {provider.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="text-center sm:text-right shrink-0">
          <p className="text-2xl font-display font-bold text-primary">
            ${provider.hourlyRate}
          </p>
          <p className="text-xs text-muted-foreground">per hour</p>
          <Button variant="accent" size="sm" className="mt-3">
            View Profile
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Services;
