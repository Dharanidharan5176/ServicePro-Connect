import { useState, useEffect } from 'react';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationMapProps {
  className?: string;
}

const LocationMap = ({ className = '' }: LocationMapProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoading(false);
      },
      (err) => {
        setError('Unable to retrieve your location. Please enable location services.');
        setLoading(false);
        console.error('Geolocation error:', err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Generate Google Maps embed URL
  const getMapUrl = () => {
    if (!location) return '';
    return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.lat},${location.lng}&zoom=16`;
  };

  // Generate Google Maps link for opening in new tab
  const getGoogleMapsLink = () => {
    if (!location) return '';
    return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
  };

  return (
    <div className={`sp-card overflow-hidden ${className}`}>
      <div className="p-4 border-b bg-muted/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-sp-blue flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display font-semibold">Your Live Location</h3>
              <p className="text-sm text-muted-foreground">
                {location 
                  ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`
                  : 'Fetching location...'
                }
              </p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={getCurrentLocation}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Navigation className="h-4 w-4" />
            )}
            <span className="ml-2 hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </div>

      <div className="relative h-[300px] bg-muted">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-sp-blue mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Getting your location...</p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted p-4">
            <div className="text-center">
              <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <Button variant="outline" size="sm" onClick={getCurrentLocation}>
                Try Again
              </Button>
            </div>
          </div>
        )}

        {location && !loading && !error && (
          <iframe
            title="Your Location"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapUrl()}
          />
        )}
      </div>

      {location && (
        <div className="p-3 bg-muted/30 border-t">
          <a 
            href={getGoogleMapsLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-sp-blue hover:underline flex items-center gap-1 justify-center"
          >
            <MapPin className="h-4 w-4" />
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
