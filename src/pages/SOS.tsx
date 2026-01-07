import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import LocationMap from '@/components/LocationMap';
import { 
  AlertTriangle, 
  Phone, 
  MapPin, 
  Users, 
  Radio,
  Shield,
  CheckCircle2,
  Mic,
  Video,
  Bell
} from 'lucide-react';

const SOS = () => {
  const [policeAlertActive, setPoliceAlertActive] = useState(false);
  const [neighborAlertActive, setNeighborAlertActive] = useState(false);

  const handlePoliceAlert = () => {
    setPoliceAlertActive(true);
    toast.error('🚨 POLICE ALERT SENT', {
      description: 'Emergency services have been notified with your live location.',
      duration: 5000,
    });
    
    // Simulate alert completion
    setTimeout(() => {
      setPoliceAlertActive(false);
    }, 3000);
  };

  const handleNeighborAlert = () => {
    setNeighborAlertActive(true);
    toast.success('🏘️ NEIGHBOR NETWORK ALERTED', {
      description: 'Your trusted contacts have been notified.',
      duration: 5000,
    });
    
    setTimeout(() => {
      setNeighborAlertActive(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-sp-emergency-light border-b py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-sp-emergency px-4 py-2 mb-4">
            <Shield className="h-5 w-5 text-primary-foreground" />
            <span className="text-sm font-semibold text-primary-foreground">Emergency System</span>
          </div>
          <h1 className="font-display text-3xl font-bold mb-2">SOS Emergency Center</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Your safety is our priority. Use these emergency features when you need immediate help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Main SOS Panel */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Police Alert */}
          <div className="sp-card p-8 bg-gradient-to-br from-sp-emergency-light to-card relative overflow-hidden">
            {policeAlertActive && (
              <div className="absolute inset-0 bg-sp-emergency/10 animate-pulse" />
            )}
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-sp-emergency flex items-center justify-center">
                  <Phone className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl flex items-center gap-2">
                    🚨 Police Alert
                  </h2>
                  <p className="text-muted-foreground">Instant emergency response</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                One-tap SOS instantly notifies the nearest police station with your live location. 
                Help arrives when you need it most.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Instant GPS location sharing</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Direct police notification</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Auto audio recording</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Real-time tracking enabled</span>
                </div>
              </div>

              <Button 
                variant="sos" 
                size="xl" 
                className="w-full relative"
                onClick={handlePoliceAlert}
                disabled={policeAlertActive}
              >
                {policeAlertActive && (
                  <span className="absolute inset-0 rounded-xl animate-pulse-ring bg-sp-emergency/50" />
                )}
                <AlertTriangle className="h-6 w-6" />
                {policeAlertActive ? 'ALERT SENT!' : 'ACTIVATE POLICE ALERT'}
              </Button>
            </div>
          </div>

          {/* Neighbor Network */}
          <div className="sp-card p-8 bg-gradient-to-br from-sp-green-light to-card relative overflow-hidden">
            {neighborAlertActive && (
              <div className="absolute inset-0 bg-sp-green/10 animate-pulse" />
            )}
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 rounded-2xl bg-sp-green flex items-center justify-center">
                  <Users className="h-8 w-8 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-2xl flex items-center gap-2">
                    🏘️ Neighbor Network
                  </h2>
                  <p className="text-muted-foreground">Community safety system</p>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">
                Instantly notifies trusted neighbors or emergency contacts for immediate help. 
                Community safety at your fingertips.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Pre-set emergency contacts</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Neighborhood-wide alerts</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Real-time location sharing</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                  <span>Two-way communication</span>
                </div>
              </div>

              <Button 
                variant="accent" 
                size="xl" 
                className="w-full"
                onClick={handleNeighborAlert}
                disabled={neighborAlertActive}
              >
                <MapPin className="h-6 w-6" />
                {neighborAlertActive ? 'CONTACTS NOTIFIED!' : 'ALERT NEIGHBOR NETWORK'}
              </Button>
            </div>
          </div>
        </div>

        {/* Live Location Map */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl mb-6 text-center">Your Live Location</h3>
          <LocationMap className="max-w-4xl mx-auto" />
        </div>

        {/* Additional Features */}
        <div className="mb-12">
          <h3 className="font-display font-bold text-xl mb-6 text-center">Additional Safety Features</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="sp-card p-6 text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-sp-blue-light flex items-center justify-center">
                <Mic className="h-6 w-6 text-sp-blue" />
              </div>
              <h4 className="font-semibold mb-2">Audio Recording</h4>
              <p className="text-sm text-muted-foreground">Auto-records audio during emergencies</p>
            </div>
            
            <div className="sp-card p-6 text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-sp-purple/10 flex items-center justify-center">
                <Video className="h-6 w-6 text-sp-purple" />
              </div>
              <h4 className="font-semibold mb-2">Video Evidence</h4>
              <p className="text-sm text-muted-foreground">Capture video and upload to cloud</p>
            </div>
            
            <div className="sp-card p-6 text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-sp-orange/10 flex items-center justify-center">
                <Radio className="h-6 w-6 text-sp-orange" />
              </div>
              <h4 className="font-semibold mb-2">Live Tracking</h4>
              <p className="text-sm text-muted-foreground">Share real-time location with contacts</p>
            </div>
            
            <div className="sp-card p-6 text-center">
              <div className="h-12 w-12 mx-auto mb-4 rounded-xl bg-sp-green-light flex items-center justify-center">
                <Bell className="h-6 w-6 text-sp-green" />
              </div>
              <h4 className="font-semibold mb-2">Silent Alert</h4>
              <p className="text-sm text-muted-foreground">Discreet emergency notification</p>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Setup */}
        <div className="sp-card p-8 max-w-2xl mx-auto">
          <h3 className="font-display font-bold text-xl mb-4 text-center">Setup Emergency Contacts</h3>
          <p className="text-muted-foreground text-center mb-6">
            Add trusted neighbors and family members to your emergency network for faster response times.
          </p>
          <div className="flex justify-center">
            <Button variant="outline" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Manage Emergency Contacts
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOS;
