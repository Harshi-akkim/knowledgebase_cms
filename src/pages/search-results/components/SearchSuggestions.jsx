import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchSuggestions = ({ searchQuery, onSuggestionClick, onSearchRefine }) => {
  const suggestions = [
    {
      type: 'spelling',
      title: 'Did you mean?',
      items: [
        { text: 'user management', query: 'user management' },
        { text: 'user permissions', query: 'user permissions' }
      ]
    },
    {
      type: 'related',
      title: 'Related searches',
      items: [
        { text: 'role-based access control', query: 'role-based access control' },
        { text: 'user authentication setup', query: 'user authentication setup' },
        { text: 'permission troubleshooting', query: 'permission troubleshooting' },
        { text: 'admin user creation', query: 'admin user creation' }
      ]
    },
    {
      type: 'popular',
      title: 'Popular searches',
      items: [
        { text: 'getting started guide', query: 'getting started guide' },
        { text: 'API documentation', query: 'API documentation' },
        { text: 'troubleshooting common issues', query: 'troubleshooting common issues' },
        { text: 'best practices security', query: 'best practices security' }
      ]
    }
  ];

  const searchRefinements = [
    { label: 'Add "tutorial"', query: `${searchQuery} tutorial`, icon: 'Plus' },
    { label: 'Add "guide"', query: `${searchQuery} guide`, icon: 'Plus' },
    { label: 'Exclude "basic"', query: `${searchQuery} -basic`, icon: 'Minus' },
    { label: 'Exact phrase', query: `"${searchQuery}"`, icon: 'Quote' }
  ];

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Search Refinements */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Settings" size={16} />
          <span>Refine your search</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {searchRefinements?.map((refinement, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              iconName={refinement?.icon}
              iconPosition="left"
              onClick={() => onSearchRefine(refinement?.query)}
              className="text-sm"
            >
              {refinement?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Search Suggestions */}
      {suggestions?.map((section, sectionIndex) => (
        <div key={sectionIndex} className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon 
              name={section?.type === 'spelling' ? 'Spell' : section?.type === 'related' ? 'Link' : 'TrendingUp'} 
              size={16} 
            />
            <span>{section?.title}</span>
          </h3>
          <div className="space-y-2">
            {section?.items?.map((item, itemIndex) => (
              <button
                key={itemIndex}
                onClick={() => onSuggestionClick(item?.query)}
                className="flex items-center space-x-3 w-full p-2 rounded-lg hover:bg-muted transition-smooth text-left"
              >
                <Icon name="Search" size={14} className="text-muted-foreground flex-shrink-0" />
                <span className="text-sm text-foreground">{item?.text}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
      {/* No Results Help */}
      <div className="bg-muted border border-border rounded-lg p-6 text-center">
        <Icon name="SearchX" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="font-medium text-foreground mb-2">No results found</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Try adjusting your search terms or use the suggestions above
        </p>
        <div className="flex flex-col sm:flex-row gap-2 justify-center">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={() => onSearchRefine('')}
          >
            Clear Search
          </Button>
          <Button
            variant="outline"
            iconName="HelpCircle"
            iconPosition="left"
            onClick={() => console.log('Open search help')}
          >
            Search Help
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchSuggestions;