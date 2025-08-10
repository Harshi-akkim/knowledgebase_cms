import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ControlPanel = ({ 
  onCategoryFilter, 
  onRelationshipFilter, 
  onSearchHighlight,
  onViewModeChange,
  onResetView,
  categories = [],
  relationshipTypes = [],
  isExpanded = true,
  onToggleExpanded
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRelationships, setSelectedRelationships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('3d');

  const categoryOptions = categories?.map(cat => ({
    value: cat?.id,
    label: cat?.name,
    description: `${cat?.count} articles`
  }));

  const relationshipOptions = relationshipTypes?.map(rel => ({
    value: rel?.type,
    label: rel?.label,
    description: `${rel?.count} connections`
  }));

  const viewModeOptions = [
    { value: '3d', label: '3D View' },
    { value: 'cluster', label: 'Cluster View' },
    { value: 'hierarchy', label: 'Hierarchy View' },
    { value: 'timeline', label: 'Timeline View' }
  ];

  const handleCategoryChange = (values) => {
    setSelectedCategories(values);
    onCategoryFilter(values);
  };

  const handleRelationshipChange = (values) => {
    setSelectedRelationships(values);
    onRelationshipFilter(values);
  };

  const handleSearchChange = (e) => {
    const query = e?.target?.value;
    setSearchQuery(query);
    onSearchHighlight(query);
  };

  const handleViewModeChange = (value) => {
    setViewMode(value);
    onViewModeChange(value);
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedRelationships([]);
    setSearchQuery('');
    setViewMode('3d');
    onResetView();
  };

  if (!isExpanded) {
    return (
      <div className="fixed top-20 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={onToggleExpanded}
          className="bg-surface/90 backdrop-blur-sm border-border shadow-floating"
        >
          <Icon name="Settings" size={20} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-20 left-4 w-80 bg-surface/95 backdrop-blur-sm border border-border rounded-lg shadow-floating z-50 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Map Controls</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleExpanded}
            className="h-8 w-8"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Search & Highlight
          </label>
          <div className="relative">
            <Icon
              name="Search"
              size={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
            />
          </div>
        </div>

        {/* View Mode */}
        <div className="mb-4">
          <Select
            label="View Mode"
            options={viewModeOptions}
            value={viewMode}
            onChange={handleViewModeChange}
            className="mb-2"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-4">
          <Select
            label="Filter by Categories"
            description="Select categories to display"
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
            multiple
            searchable
            clearable
            className="mb-2"
          />
        </div>

        {/* Relationship Filter */}
        <div className="mb-4">
          <Select
            label="Show Relationships"
            description="Select relationship types to display"
            options={relationshipOptions}
            value={selectedRelationships}
            onChange={handleRelationshipChange}
            multiple
            searchable
            clearable
            className="mb-2"
          />
        </div>

        {/* Display Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Display Options
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Show node labels"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Show connection strength"
             
              onChange={() => {}}
            />
            <Checkbox
              label="Enable physics simulation"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Auto-rotate view"
             
              onChange={() => {}}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            onClick={onResetView}
            iconName="RotateCcw"
            iconPosition="left"
            fullWidth
          >
            Reset View
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            iconName="RefreshCw"
            iconPosition="left"
            fullWidth
          >
            Clear Filters
          </Button>
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">Technical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">Business</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-muted-foreground">Process</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-muted-foreground">Policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;