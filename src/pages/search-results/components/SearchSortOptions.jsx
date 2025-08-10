import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SearchSortOptions = ({ 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange, 
  resultCount = 0,
  searchQuery = '' 
}) => {
  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'date_desc', label: 'Newest First' },
    { value: 'date_asc', label: 'Oldest First' },
    { value: 'title_asc', label: 'Title A-Z' },
    { value: 'title_desc', label: 'Title Z-A' },
    { value: 'views_desc', label: 'Most Viewed' },
    { value: 'author_asc', label: 'Author A-Z' }
  ];

  const viewModeOptions = [
    { value: 'list', icon: 'List', label: 'List View' },
    { value: 'grid', icon: 'Grid3X3', label: 'Grid View' },
    { value: 'compact', icon: 'AlignJustify', label: 'Compact View' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        {/* Search Results Info */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-muted-foreground">
            {resultCount > 0 ? (
              <>
                <span className="font-medium text-foreground">
                  {resultCount?.toLocaleString()}
                </span>
                {' '}results
                {searchQuery && (
                  <>
                    {' '}for{' '}
                    <span className="font-medium text-foreground">
                      "{searchQuery}"
                    </span>
                  </>
                )}
              </>
            ) : (
              'No results found'
            )}
          </div>

          {/* Search Time */}
          <div className="text-sm text-muted-foreground">
            <Icon name="Clock" size={14} className="inline mr-1" />
            Search completed in 0.23 seconds
          </div>
        </div>

        {/* Sort and View Options */}
        <div className="flex items-center space-x-4">
          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={onSortChange}
              placeholder="Sort by..."
              className="w-40"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center border border-border rounded-lg p-1">
            {viewModeOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onViewModeChange(option?.value)}
                className={`p-2 rounded transition-smooth ${
                  viewMode === option?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={option?.label}
              >
                <Icon name={option?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Advanced Search Hint */}
      {searchQuery && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
            <Icon name="Lightbulb" size={14} className="mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-medium">Pro tip:</span> Use quotes for exact phrases, 
              OR/AND for boolean search, or try natural language queries like 
              "How to configure user permissions?"
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSortOptions;