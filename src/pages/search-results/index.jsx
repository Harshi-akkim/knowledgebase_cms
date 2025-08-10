import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from '../../components/ui/SearchBar';

import Button from '../../components/ui/Button';
import SearchFilters from './components/SearchFilters';
import SearchResultCard from './components/SearchResultCard';
import SearchSortOptions from './components/SearchSortOptions';
import SearchSuggestions from './components/SearchSuggestions';
import SearchExportOptions from './components/SearchExportOptions';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('list');
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    contentType: {},
    category: {},
    author: {},
    dateRange: {},
    tags: {}
  });

  const resultsPerPage = 10;

  // Mock search results data
  const mockResults = [
    {
      id: 'art_001',
      title: 'User Management and Permission Configuration Guide',
      snippet: `This comprehensive guide covers all aspects of user management including role-based access control, permission settings, and security best practices. Learn how to create user accounts, assign roles, and configure granular permissions for different user types in your organization.`,
      author: 'Sarah Johnson',
      lastModified: '2025-01-15T10:30:00Z',
      contentType: 'guide',
      category: 'Technical Documentation',
      tags: ['user-management', 'permissions', 'security', 'rbac'],
      views: 2847,
      relevanceScore: 0.95,
      isBookmarked: false
    },
    {
      id: 'art_002',
      title: 'Getting Started with Knowledge Base Management',
      snippet: `A beginner-friendly tutorial that walks you through the basics of knowledge base management. Covers content creation, organization strategies, search optimization, and collaboration workflows to help you build an effective knowledge repository.`,
      author: 'Mike Chen',
      lastModified: '2025-01-10T14:22:00Z',
      contentType: 'tutorial',
      category: 'Getting Started',
      tags: ['getting-started', 'knowledge-base', 'content-management'],
      views: 1923,
      relevanceScore: 0.87,
      isBookmarked: true
    },
    {
      id: 'art_003',
      title: 'Advanced Search Techniques and Query Optimization',
      snippet: `Master the art of finding information quickly with advanced search techniques. This article covers boolean operators, field-specific searches, filters, and natural language queries to help users discover relevant content efficiently.`,
      author: 'Emily Davis',
      lastModified: '2025-01-08T09:15:00Z',
      contentType: 'article',
      category: 'Technical Documentation',
      tags: ['search', 'optimization', 'advanced', 'queries'],
      views: 1456,
      relevanceScore: 0.82,
      isBookmarked: false
    },
    {
      id: 'art_004',
      title: 'Content Lifecycle Management Best Practices',
      snippet: `Learn how to effectively manage content throughout its lifecycle from creation to archival. This guide covers content planning, review processes, version control, and automated workflows for maintaining high-quality knowledge bases.`,
      author: 'Alex Wilson',
      lastModified: '2025-01-05T16:45:00Z',
      contentType: 'guide',
      category: 'Content Management',
      tags: ['lifecycle', 'best-practices', 'workflow', 'version-control'],
      views: 1234,
      relevanceScore: 0.78,
      isBookmarked: false
    },
    {
      id: 'art_005',
      title: 'Troubleshooting Common Authentication Issues',
      snippet: `Resolve authentication problems quickly with this troubleshooting guide. Covers login failures, session timeouts, password reset issues, and integration problems with external authentication providers.`,
      author: 'John Smith',
      lastModified: '2025-01-03T11:20:00Z',
      contentType: 'faq',
      category: 'Technical Support',
      tags: ['troubleshooting', 'authentication', 'login', 'support'],
      views: 987,
      relevanceScore: 0.75,
      isBookmarked: true
    }
  ];

  // Initialize search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams?.get('q') || '';
    setSearchQuery(query);
    
    if (query) {
      performSearch(query);
    }
  }, [location?.search]);

  const performSearch = (query) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setCurrentPage(1);
    }, 500);
  };

  const handleSearchSubmit = (query) => {
    navigate(`/search-results?q=${encodeURIComponent(query)}`);
  };

  const handleFilterChange = (filterType, value, checked) => {
    if (filterType === 'clear') {
      setFilters({
        contentType: {},
        category: {},
        author: {},
        dateRange: {},
        tags: {}
      });
    } else {
      setFilters(prev => ({
        ...prev,
        [filterType]: {
          ...prev?.[filterType],
          [value]: checked
        }
      }));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/search-results?q=${encodeURIComponent(suggestion)}`);
  };

  const handleSearchRefine = (refinedQuery) => {
    navigate(`/search-results?q=${encodeURIComponent(refinedQuery)}`);
  };

  const handleExport = (exportData) => {
    console.log('Exporting search results:', exportData);
    // In real app, this would trigger the export process
  };

  // Filter and sort results
  const filteredResults = mockResults?.filter(result => {
    // Apply filters
    const hasActiveFilters = Object.values(filters)?.some(filterGroup => 
      Object.values(filterGroup)?.some(value => value === true)
    );
    
    if (!hasActiveFilters) return true;
    
    // Check each filter type
    const contentTypeMatch = !Object.values(filters?.contentType)?.some(v => v) || 
                            filters?.contentType?.[result?.contentType];
    const categoryMatch = !Object.values(filters?.category)?.some(v => v) || 
                         filters?.category?.[result?.category?.toLowerCase()?.replace(/\s+/g, '-')];
    const authorMatch = !Object.values(filters?.author)?.some(v => v) || 
                       filters?.author?.[result?.author?.toLowerCase()?.replace(/\s+/g, '_')];
    
    return contentTypeMatch && categoryMatch && authorMatch;
  });

  // Sort results
  const sortedResults = [...filteredResults]?.sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return b?.relevanceScore - a?.relevanceScore;
      case 'date_desc':
        return new Date(b.lastModified) - new Date(a.lastModified);
      case 'date_asc':
        return new Date(a.lastModified) - new Date(b.lastModified);
      case 'title_asc':
        return a?.title?.localeCompare(b?.title);
      case 'title_desc':
        return b?.title?.localeCompare(a?.title);
      case 'views_desc':
        return b?.views - a?.views;
      case 'author_asc':
        return a?.author?.localeCompare(b?.author);
      default:
        return 0;
    }
  });

  // Paginate results
  const totalResults = sortedResults?.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const paginatedResults = sortedResults?.slice(startIndex, startIndex + resultsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Search Results</h1>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-2xl">
              <SearchBar
                placeholder="Search knowledge base..."
                size="large"
                autoFocus={!searchQuery}
                showSuggestions={true}
              />
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar - Desktop */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <SearchFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  resultCount={totalResults}
                />
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Sort Options */}
              <div className="mb-6">
                <SearchSortOptions
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  resultCount={totalResults}
                  searchQuery={searchQuery}
                />
              </div>

              {/* Mobile Filters Button */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="outline"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => setIsFiltersPanelOpen(true)}
                  fullWidth
                >
                  Filters
                </Button>
              </div>

              {/* Results or Suggestions */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-3 text-muted-foreground">Searching...</span>
                </div>
              ) : totalResults > 0 ? (
                <>
                  {/* Export Options */}
                  <div className="flex justify-end mb-6">
                    <SearchExportOptions
                      searchQuery={searchQuery}
                      resultCount={totalResults}
                      onExport={handleExport}
                    />
                  </div>

                  {/* Search Results */}
                  <div className="space-y-6">
                    {paginatedResults?.map((result) => (
                      <SearchResultCard
                        key={result?.id}
                        result={result}
                        searchQuery={searchQuery}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center space-x-2 mt-8">
                      <Button
                        variant="outline"
                        iconName="ChevronLeft"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      />
                      
                      {[...Array(totalPages)]?.map((_, index) => {
                        const page = index + 1;
                        const isCurrentPage = page === currentPage;
                        const showPage = page === 1 || page === totalPages || 
                                        Math.abs(page - currentPage) <= 2;
                        
                        if (!showPage) {
                          if (page === currentPage - 3 || page === currentPage + 3) {
                            return <span key={page} className="px-2 text-muted-foreground">...</span>;
                          }
                          return null;
                        }
                        
                        return (
                          <Button
                            key={page}
                            variant={isCurrentPage ? 'default' : 'outline'}
                            onClick={() => handlePageChange(page)}
                            className="w-10 h-10"
                          >
                            {page}
                          </Button>
                        );
                      })}
                      
                      <Button
                        variant="outline"
                        iconName="ChevronRight"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                    </div>
                  )}
                </>
              ) : (
                <SearchSuggestions
                  searchQuery={searchQuery}
                  onSuggestionClick={handleSuggestionClick}
                  onSearchRefine={handleSearchRefine}
                />
              )}
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filters Panel */}
      {isFiltersPanelOpen && (
        <div className="fixed inset-0 bg-black/50 z-1200 lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border overflow-y-auto">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsFiltersPanelOpen(false)}
                />
              </div>
            </div>
            <div className="p-4">
              <SearchFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                resultCount={totalResults}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;