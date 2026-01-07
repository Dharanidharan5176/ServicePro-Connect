import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { sampleRequests, ServiceRequest } from '@/data/services';
import { toast } from 'sonner';
import { 
  Clock, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Calendar,
  Star,
  ArrowUpRight
} from 'lucide-react';

const Dashboard = () => {
  const { userRole, userName } = useAuth();
  const [requests, setRequests] = useState<ServiceRequest[]>(sampleRequests);

  const handleAccept = (id: string) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'accepted' } : req)
    );
    toast.success('Request accepted!', {
      description: 'The client has been notified.',
    });
  };

  const handleDecline = (id: string) => {
    setRequests(prev => 
      prev.map(req => req.id === id ? { ...req, status: 'declined' } : req)
    );
    toast.info('Request declined');
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');
  const completedRequests = requests.filter(r => r.status === 'completed' || r.status === 'accepted');

  // Mock earnings data
  const earnings = {
    total: 4250,
    thisMonth: 1200,
    pending: 350,
    jobs: 28,
  };

  if (userRole === 'user') {
    return <UserDashboard userName={userName} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-muted/50 border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-2">Servicer Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userName}! Manage your service requests here.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Earnings Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="sp-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Total Earnings</span>
              <TrendingUp className="h-4 w-4 text-sp-green" />
            </div>
            <p className="text-2xl font-display font-bold">${earnings.total}</p>
            <p className="text-xs text-sp-green">+12% from last month</p>
          </div>
          
          <div className="sp-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">This Month</span>
              <Calendar className="h-4 w-4 text-sp-blue" />
            </div>
            <p className="text-2xl font-display font-bold">${earnings.thisMonth}</p>
          </div>
          
          <div className="sp-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Pending</span>
              <Clock className="h-4 w-4 text-sp-orange" />
            </div>
            <p className="text-2xl font-display font-bold">${earnings.pending}</p>
          </div>
          
          <div className="sp-card p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-muted-foreground text-sm">Jobs Completed</span>
              <Star className="h-4 w-4 text-yellow-500" />
            </div>
            <p className="text-2xl font-display font-bold">{earnings.jobs}</p>
          </div>
        </div>

        {/* Service Requests */}
        <div className="mb-8">
          <h2 className="font-display font-bold text-xl mb-4">
            Incoming Requests
            {pendingRequests.length > 0 && (
              <Badge className="ml-2 bg-sp-orange text-primary-foreground">
                {pendingRequests.length} new
              </Badge>
            )}
          </h2>

          {pendingRequests.length === 0 ? (
            <div className="sp-card p-12 text-center">
              <p className="text-4xl mb-4">📭</p>
              <h3 className="font-semibold mb-2">No pending requests</h3>
              <p className="text-muted-foreground">New service requests will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <RequestCard 
                  key={request.id} 
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="font-display font-bold text-xl mb-4">Recent Activity</h2>
          <div className="sp-card divide-y">
            {completedRequests.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No recent activity
              </div>
            ) : (
              completedRequests.map((request) => (
                <div key={request.id} className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">{request.clientName}</p>
                    <p className="text-sm text-muted-foreground">{request.serviceType}</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className={request.status === 'accepted' ? 'bg-sp-green-light text-sp-green-dark' : ''}
                  >
                    {request.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RequestCard = ({ 
  request, 
  onAccept, 
  onDecline 
}: { 
  request: ServiceRequest;
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}) => {
  const urgencyColors = {
    low: 'bg-sp-green-light text-sp-green-dark',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-sp-emergency-light text-sp-emergency-dark',
  };

  return (
    <div className="sp-card p-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-display font-bold text-lg">{request.clientName}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {request.clientLocation}
              </p>
            </div>
            <Badge className={urgencyColors[request.urgency]}>
              {request.urgency} priority
            </Badge>
          </div>

          <div className="p-4 rounded-xl bg-muted/50 mb-4">
            <p className="font-medium text-sm mb-1">{request.serviceType}</p>
            <p className="text-muted-foreground">{request.description}</p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              Budget: {request.budget}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(request.date).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex gap-3 lg:flex-col lg:w-32">
          <Button 
            variant="accent" 
            className="flex-1 lg:flex-none"
            onClick={() => onAccept(request.id)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Accept
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 lg:flex-none"
            onClick={() => onDecline(request.id)}
          >
            <XCircle className="h-4 w-4" />
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = ({ userName }: { userName: string }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-muted/50 border-b py-8">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {userName}!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="sp-card p-6">
            <p className="text-muted-foreground text-sm mb-1">Active Requests</p>
            <p className="text-2xl font-display font-bold">2</p>
          </div>
          <div className="sp-card p-6">
            <p className="text-muted-foreground text-sm mb-1">Completed Jobs</p>
            <p className="text-2xl font-display font-bold">12</p>
          </div>
          <div className="sp-card p-6">
            <p className="text-muted-foreground text-sm mb-1">Saved Providers</p>
            <p className="text-2xl font-display font-bold">5</p>
          </div>
          <div className="sp-card p-6">
            <p className="text-muted-foreground text-sm mb-1">Total Spent</p>
            <p className="text-2xl font-display font-bold">$890</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="sp-card p-6">
          <h2 className="font-display font-bold text-xl mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sp-green-light flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-sp-green" />
                </div>
                <div>
                  <p className="font-medium">Plumbing repair completed</p>
                  <p className="text-sm text-muted-foreground">John Smith • 2 days ago</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-sp-blue-light flex items-center justify-center">
                  <Clock className="h-5 w-5 text-sp-blue" />
                </div>
                <div>
                  <p className="font-medium">Electrical work scheduled</p>
                  <p className="text-sm text-muted-foreground">Sarah Williams • Tomorrow at 2 PM</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
