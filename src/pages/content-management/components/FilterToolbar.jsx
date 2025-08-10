import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const FilterToolbar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  activeFilterCount,
  onSearch,
  searchQuery 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'Published', label: 'Published' },
    { value: 'Draft', label: 'Draft' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Archived', label: 'Archived' }
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    { value: 'Getting Started', label: 'Getting Started' },
    { value: 'User Guides', label: 'User Guides' },
    { value: 'API Documentation', label: 'API Documentation' },
    { value: 'Troubleshooting', label: 'Troubleshooting' },
    { value: 'Best Practices', label: 'Best Practices' },
    { value: 'Security', label: 'Security' }
  ];

  const authorOptions = [
    { value: '', label: 'All Authors' },
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Michael Chen', label: 'Michael Chen' },
    { value: 'Emily Rodriguez', label: 'Emily Rodriguez' },
    { value: 'David Kim', label: 'David Kim' },
    { value: 'Lisa Thompson', label: 'Lisa Thompson' }
  ];

  const contentTypeOptions = [
    { value: '', label: 'All Types' },
    { value: 'Article', label: 'Article' },
    { value: 'Tutorial', label: 'Tutorial' },
    { value: 'FAQ', label: 'FAQ' },
    { value: 'Guide', label: 'Guide' },
    { value: 'Reference', label: 'Reference' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleDateRangeChange = (type, value) => {
    onFilterChange({
      ...filters,
      dateRange: {
        ...filters?.dateRange,
        [type]: value
      }
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Search and Quick Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search articles, content, and metadata..."
              value={searchQuery}
              onChange={(e) => onSearch(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          {activeFilterCount > 0 && (
            <Button variant="ghost" onClick={onClearFilters} iconName="X" iconPosition="left">
              Clear Filters
            </Button>
          )}
          
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export
          </Button>
        </div>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
              className="w-full"
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={filters?.category}
              onChange={(value) => handleFilterChange('category', value)}
              searchable
              className="w-full"
            />
            
            <Select
              label="Author"
              options={authorOptions}
              value={filters?.author}
              onChange={(value) => handleFilterChange('author', value)}
              searchable
              className="w-full"
            />
            
            <Select
              label="Content Type"
              options={contentTypeOptions}
              value={filters?.contentType}
              onChange={(value) => handleFilterChange('contentType', value)}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="date"
                  value={filters?.dateRange?.from || ''}
                  onChange={(e) => handleDateRangeChange('from', e?.target?.value)}
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="date"
                  value={filters?.dateRange?.to || ''}
                  onChange={(e) => handleDateRangeChange('to', e?.target?.value)}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                View Count Range
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Min views"
                  value={filters?.viewRange?.min || ''}
                  onChange={(e) => handleFilterChange('viewRange', { 
                    ...filters?.viewRange, 
                    min: e?.target?.value 
                  })}
                  className="flex-1"
                />
                <span className="text-muted-foreground">to</span>
                <Input
                  type="number"
                  placeholder="Max views"
                  value={filters?.viewRange?.max || ''}
                  onChange={(e) => handleFilterChange('viewRange', { 
                    ...filters?.viewRange, 
                    max: e?.target?.value 
                  })}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          
          {filters?.status && (
            <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
              Status: {filters?.status}
              <button
                onClick={() => handleFilterChange('status', '')}
                className="ml-1 hover:text-primary/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters?.category && (
            <span className="inline-flex items-center px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Category: {filters?.category}
              <button
                onClick={() => handleFilterChange('category', '')}
                className="ml-1 hover:text-accent/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters?.author && (
            <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success text-xs rounded-full">
              Author: {filters?.author}
              <button
                onClick={() => handleFilterChange('author', '')}
                className="ml-1 hover:text-success/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
          
          {filters?.contentType && (
            <span className="inline-flex items-center px-2 py-1 bg-warning/10 text-warning text-xs rounded-full">
              Type: {filters?.contentType}
              <button
                onClick={() => handleFilterChange('contentType', '')}
                className="ml-1 hover:text-warning/80"
              >
                <Icon name="X" size={12} />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterToolbar;