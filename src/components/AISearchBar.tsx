import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Search, Sparkles, Loader2, X, ArrowRight } from 'lucide-react';

interface AISearchResult {
  matchedCategories: string[];
  response: string;
}

interface AISearchBarProps {
  onCategorySelect: (categoryId: string) => void;
  className?: string;
}

const AISearchBar = ({ onCategorySelect, className = '' }: AISearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<AISearchResult | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter what service you need');
      return;
    }

    setIsSearching(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('ai-search', {
        body: { query: query.trim() }
      });

      if (error) {
        console.error('AI search error:', error);
        if (error.message?.includes('429')) {
          toast.error('Too many requests. Please wait a moment.');
        } else if (error.message?.includes('402')) {
          toast.error('AI service temporarily unavailable.');
        } else {
          toast.error('Search failed. Please try again.');
        }
        return;
      }

      setResult(data);
    } catch (err) {
      console.error('Search error:', err);
      toast.error('Failed to search. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResult(null);
  };

  const categoryLabels: Record<string, { name: string; icon: string }> = {
    plumber: { name: 'Plumber', icon: '🔧' },
    electrician: { name: 'Electrician', icon: '⚡' },
    housekeeper: { name: 'Housekeeper', icon: '🧹' },
    watchman: { name: 'Watchman', icon: '👮' },
    carpenter: { name: 'Carpenter', icon: '🪚' },
    painter: { name: 'Painter', icon: '🎨' },
    gardener: { name: 'Gardener', icon: '🌿' },
    driver: { name: 'Driver', icon: '🚗' },
    cook: { name: 'Cook', icon: '👨‍🍳' },
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-sp-blue" />
        </div>
        <input
          type="text"
          placeholder="Describe what you need... e.g., 'My kitchen sink is leaking'"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-14 rounded-xl border-2 border-sp-blue/20 bg-card pl-12 pr-28 text-base focus:outline-none focus:ring-2 focus:ring-sp-blue/30 focus:border-sp-blue transition-all"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {query && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            onClick={handleSearch}
            disabled={isSearching || !query.trim()}
            className="h-10 px-4 bg-sp-blue hover:bg-sp-blue/90"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
      </div>

      {/* AI Response */}
      {result && (
        <div className="sp-card p-4 bg-gradient-to-br from-sp-blue-light to-card animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-lg bg-sp-blue flex items-center justify-center shrink-0">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-foreground mb-3">{result.response}</p>
              
              {result.matchedCategories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {result.matchedCategories.map((catId) => {
                    const cat = categoryLabels[catId];
                    if (!cat) return null;
                    return (
                      <Button
                        key={catId}
                        variant="outline"
                        size="sm"
                        onClick={() => onCategorySelect(catId)}
                        className="group hover:bg-sp-blue hover:text-primary-foreground hover:border-sp-blue transition-all"
                      >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name}
                        <ArrowRight className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISearchBar;
