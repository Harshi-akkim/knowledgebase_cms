import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFilterChange, resultCount = 0 }) => {
  const [expandedSections, setExpandedSections] = useState({
    contentType: true,
    category: true,
    author: false,
    dateRange: false,
    tags: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (filterType, value, checked) => {
    onFilterChange(filterType, value, checked);
  };

  const clearAllFilters = () => {
    onFilterChange('clear', null, null);
  };

  const hasActiveFilters = Object.values(filters)?.some(filterGroup => 
    Object.values(filterGroup)?.some(value => value === true)
  );

  const filterSections = [
    {
      key: 'contentType',
      title: 'Content Type',
      icon: 'FileText',
      options: [
        { value: 'article', label: 'Articles', count: 1247 },
        { value: 'guide', label: 'Guides', count: 342 },
        { value: 'tutorial', label: 'Tutorials', count: 189 },
        { value: 'faq', label: 'FAQs', count: 156 },
        { value: 'policy', label: 'Policies', count: 89 },
        { value: 'procedure', label: 'Procedures', count: 67 }
      ]
    },
    {
      key: 'category',
      title: 'Category',
      icon: 'Folder',
      options: [
        { value: 'technical', label: 'Technical Documentation', count: 523 },
        { value: 'hr', label: 'Human Resources', count: 298 },
        { value: 'finance', label: 'Finance & Accounting', count: 234 },
        { value: 'marketing', label: 'Marketing', count: 187 },
        { value: 'operations', label: 'Operations', count: 156 },
        { value: 'legal', label: 'Legal & Compliance', count: 92 }
      ]
    },
    {
      key: 'author',
      title: 'Author',
      icon: 'User',
      options: [
        { value: 'john_smith', label: 'John Smith', count: 89 },
        { value: 'sarah_johnson', label: 'Sarah Johnson', count: 76 },
        { value: 'mike_chen', label: 'Mike Chen', count: 54 },
        { value: 'emily_davis', label: 'Emily Davis', count: 43 },
        { value: 'alex_wilson', label: 'Alex Wilson', count: 32 }
      ]
    },
    {
      key: 'dateRange',
      title: 'Date Range',
      icon: 'Calendar',
      options: [
        { value: 'today', label: 'Today', count: 12 },
        { value: 'week', label: 'This Week', count: 45 },
        { value: 'month', label: 'This Month', count: 156 },
        { value: 'quarter', label: 'This Quarter', count: 423 },
        { value: 'year', label: 'This Year', count: 1890 }
      ]
    },
    {
      key: 'tags',
      title: 'Tags',
      icon: 'Tag',
      options: [
        { value: 'best-practices', label: 'Best Practices', count: 234 },
        { value: 'troubleshooting', label: 'Troubleshooting', count: 189 },
        { value: 'getting-started', label: 'Getting Started', count: 167 },
        { value: 'advanced', label: 'Advanced', count: 123 },
        { value: 'security', label: 'Security', count: 98 },
        { value: 'integration', label: 'Integration', count: 76 }
      ]
    }
  ];

  return (
    <div className="w-full bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={18} className="text-muted-foreground" />
            <h3 className="font-semibold text-foreground">Filters</h3>
          </div>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
            >
              Clear All
            </button>
          )}
        </div>
        {resultCount > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {resultCount?.toLocaleString()} results found
          </p>
        )}
      </div>
      {/* Filter Sections */}
      <div className="divide-y divide-border">
        {filterSections?.map((section) => (
          <div key={section?.key} className="p-4">
            <button
              onClick={() => toggleSection(section?.key)}
              className="flex items-center justify-between w-full text-left mb-3 hover:text-primary transition-smooth"
            >
              <div className="flex items-center space-x-2">
                <Icon name={section?.icon} size={16} className="text-muted-foreground" />
                <span className="font-medium text-sm">{section?.title}</span>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`text-muted-foreground transition-transform ${
                  expandedSections?.[section?.key] ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSections?.[section?.key] && (
              <div className="space-y-2">
                {section?.options?.map((option) => (
                  <div key={option?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option?.label}
                      checked={filters?.[section?.key]?.[option?.value] || false}
                      onChange={(e) => handleFilterChange(section?.key, option?.value, e?.target?.checked)}
                      size="sm"
                    />
                    <span className="text-xs text-muted-foreground">
                      {option?.count?.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilters;