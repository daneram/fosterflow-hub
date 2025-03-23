
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Star, Plus } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SavedFilterPresets } from './SavedFilterPresets';

interface RecordFilterPanelProps {
  selectedType: string | null;
  setSelectedType: (type: string | null) => void;
  selectedStatus: string | null;
  setSelectedStatus: (status: string | null) => void;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (show: boolean) => void;
  isAdvancedSearchOpen: boolean;
  setIsAdvancedSearchOpen: (open: boolean) => void;
  onSelectPreset: (preset: string) => void;
}

export const RecordFilterPanel: React.FC<RecordFilterPanelProps> = ({
  selectedType,
  setSelectedType,
  selectedStatus,
  setSelectedStatus,
  showFavoritesOnly,
  setShowFavoritesOnly,
  isAdvancedSearchOpen,
  setIsAdvancedSearchOpen,
  onSelectPreset
}) => {
  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-lg flex items-center justify-between">
          Filters
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setSelectedType(null);
              setSelectedStatus(null);
              setShowFavoritesOnly(false);
            }}
          >
            Clear
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Filter Chips */}
        <div className="flex flex-wrap gap-2 pb-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={showFavoritesOnly ? "bg-primary/10" : ""}
          >
            <Star className={`h-4 w-4 mr-1 ${showFavoritesOnly ? "text-yellow-500" : ""}`} />
            Favorites
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSelectedStatus('active')}
          >
            Active
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setSelectedType('case');
              setSelectedStatus('active');
            }}
          >
            Active Cases
          </Button>
        </div>
        
        {/* Saved Filters Section */}
        <Collapsible>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Saved Filters</h3>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="pt-2">
            <SavedFilterPresets onSelectPreset={onSelectPreset} />
          </CollapsibleContent>
        </Collapsible>
        
        {/* Standard Filter Sections */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Record Type</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedType === null ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            <Button 
              variant={selectedType === 'case' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType('case')}
            >
              Cases
            </Button>
            <Button 
              variant={selectedType === 'assessment' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType('assessment')}
            >
              Assessments
            </Button>
            <Button 
              variant={selectedType === 'report' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType('report')}
            >
              Reports
            </Button>
            <Button 
              variant={selectedType === 'document' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedType('document')}
            >
              Documents
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Status</h3>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedStatus === null ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus(null)}
            >
              All
            </Button>
            <Button 
              variant={selectedStatus === 'active' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus('active')}
            >
              Active
            </Button>
            <Button 
              variant={selectedStatus === 'pending' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus('pending')}
            >
              Pending
            </Button>
            <Button 
              variant={selectedStatus === 'closed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus('closed')}
            >
              Closed
            </Button>
            <Button 
              variant={selectedStatus === 'archived' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedStatus('archived')}
            >
              Archived
            </Button>
          </div>
        </div>
        
        {/* Advanced Filters Toggle */}
        <div className="pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => setIsAdvancedSearchOpen(!isAdvancedSearchOpen)}
          >
            <Filter className="h-4 w-4 mr-1" />
            Advanced Filters
          </Button>
        </div>
        
        {/* Advanced Filters Panel */}
        {isAdvancedSearchOpen && (
          <div className="space-y-3 pt-2">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Date Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">From</p>
                  <Input type="date" className="h-8" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">To</p>
                  <Input type="date" className="h-8" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Assigned To</h3>
              <Select>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Anyone</SelectItem>
                  <SelectItem value="sarah">Sarah Wilson</SelectItem>
                  <SelectItem value="michael">Michael Brown</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                  <SelectItem value="robert">Robert Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Priority</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Urgent</Button>
                <Button variant="outline" size="sm">High</Button>
                <Button variant="outline" size="sm">Medium</Button>
                <Button variant="outline" size="sm">Low</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Compliance Status</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">Complete</Button>
                <Button variant="outline" size="sm">Incomplete</Button>
                <Button variant="outline" size="sm">Overdue</Button>
              </div>
            </div>
            
            <div className="pt-2">
              <Button size="sm" className="w-full">Apply Filters</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
