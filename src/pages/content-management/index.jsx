import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';

import Button from '../../components/ui/Button';
import CategoryTree from './components/CategoryTree';
import ContentTable from './components/ContentTable';
import FilterToolbar from './components/FilterToolbar';
import BulkActionsBar from './components/BulkActionsBar';
import ContentMetrics from './components/ContentMetrics';
import WorkflowPanel from './components/WorkflowPanel';

const ContentManagement = () => {
  const navigate = useNavigate();
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ field: 'lastModified', direction: 'desc' });
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    author: '',
    contentType: '',
    dateRange: { from: '', to: '' },
    viewRange: { min: '', max: '' }
  });
  const [isCategoryPanelOpen, setIsCategoryPanelOpen] = useState(true);

  // Mock data
  const mockMetrics = {
    totalArticles: 1247,
    published: 892,
    underReview: 23,
    totalViews: 45678
  };

  const mockCategories = [
    {
      id: '1',
      name: 'Getting Started',
      articleCount: 45,
      children: [
        { id: '1-1', name: 'Installation', articleCount: 12, children: [] },
        { id: '1-2', name: 'Quick Start', articleCount: 18, children: [] },
        { id: '1-3', name: 'Configuration', articleCount: 15, children: [] }
      ]
    },
    {
      id: '2',
      name: 'User Guides',
      articleCount: 156,
      children: [
        { id: '2-1', name: 'Basic Features', articleCount: 67, children: [] },
        { id: '2-2', name: 'Advanced Features', articleCount: 43, children: [] },
        { id: '2-3', name: 'Integrations', articleCount: 46, children: [] }
      ]
    },
    {
      id: '3',
      name: 'API Documentation',
      articleCount: 89,
      children: [
        { id: '3-1', name: 'REST API', articleCount: 34, children: [] },
        { id: '3-2', name: 'GraphQL', articleCount: 28, children: [] },
        { id: '3-3', name: 'Webhooks', articleCount: 27, children: [] }
      ]
    },
    {
      id: '4',
      name: 'Troubleshooting',
      articleCount: 78,
      children: []
    }
  ];

  const mockArticles = [
    {
      id: '1',
      title: 'Getting Started with KnowledgeBase CMS',
      description: 'A comprehensive guide to setting up and using the CMS',
      category: 'Getting Started',
      author: 'Sarah Johnson',
      status: 'Published',
      lastModified: '2025-01-08T10:30:00Z',
      views: 2456,
      contentType: 'Guide'
    },
    {
      id: '2',
      title: 'Advanced Search Techniques',
      description: 'Learn how to use advanced search features effectively',
      category: 'User Guides',
      author: 'Michael Chen',
      status: 'Under Review',
      lastModified: '2025-01-07T15:45:00Z',
      views: 1234,
      contentType: 'Tutorial'
    },
    {
      id: '3',
      title: 'API Authentication Methods',
      description: 'Complete guide to API authentication and security',
      category: 'API Documentation',
      author: 'Emily Rodriguez',
      status: 'Published',
      lastModified: '2025-01-06T09:15:00Z',
      views: 3456,
      contentType: 'Reference'
    },
    {
      id: '4',
      title: 'Common Installation Issues',
      description: 'Troubleshooting guide for installation problems',
      category: 'Troubleshooting',
      author: 'David Kim',
      status: 'Draft',
      lastModified: '2025-01-05T14:20:00Z',
      views: 567,
      contentType: 'FAQ'
    },
    {
      id: '5',
      title: 'Content Organization Best Practices',
      description: 'How to structure and organize your knowledge base content',
      category: 'Best Practices',
      author: 'Lisa Thompson',
      status: 'Published',
      lastModified: '2025-01-04T11:30:00Z',
      views: 1890,
      contentType: 'Article'
    }
  ];

  const mockWorkflowItems = [
    {
      id: 'w1',
      title: 'Advanced Search Techniques',
      author: 'Michael Chen',
      status: 'in-review',
      priority: 'high',
      submittedAt: '2025-01-08T08:00:00Z',
      assignedReviewer: 'Sarah Johnson',
      reviewNotes: 'Please review the technical accuracy of the search operators section.'
    },
    {
      id: 'w2',
      title: 'New API Endpoints Documentation',
      author: 'Emily Rodriguez',
      status: 'pending-review',
      priority: 'medium',
      submittedAt: '2025-01-07T16:30:00Z',
      assignedReviewer: null,
      reviewNotes: null
    },
    {
      id: 'w3',
      title: 'Security Guidelines Update',
      author: 'David Kim',
      status: 'pending-review',
      priority: 'high',
      submittedAt: '2025-01-07T10:15:00Z',
      assignedReviewer: null,
      reviewNotes: null
    }
  ];

  const [articles, setArticles] = useState(mockArticles);
  const [workflowItems, setWorkflowItems] = useState(mockWorkflowItems);

  // Filter and sort articles
  const filteredArticles = articles?.filter(article => {
    if (searchQuery && !article?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !article?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
      return false;
    }
    if (filters?.status && article?.status !== filters?.status) return false;
    if (filters?.category && article?.category !== filters?.category) return false;
    if (filters?.author && article?.author !== filters?.author) return false;
    if (filters?.contentType && article?.contentType !== filters?.contentType) return false;
    return true;
  })?.sort((a, b) => {
    const { field, direction } = sortConfig;
    const aValue = field === 'lastModified' ? new Date(a[field]) : a?.[field];
    const bValue = field === 'lastModified' ? new Date(b[field]) : b?.[field];
    
    if (direction === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  const activeFilterCount = Object.values(filters)?.filter(value => {
    if (typeof value === 'object') {
      return Object.values(value)?.some(v => v !== '');
    }
    return value !== '';
  })?.length;

  const handleSelectArticle = (articleId) => {
    setSelectedArticles(prev => 
      prev?.includes(articleId) 
        ? prev?.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleSelectAll = () => {
    if (selectedArticles?.length === filteredArticles?.length) {
      setSelectedArticles([]);
    } else {
      setSelectedArticles(filteredArticles?.map(article => article?.id));
    }
  };

  const handleBulkAction = async (action, count) => {
    console.log(`Executing ${action} on ${count} articles`);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSelectedArticles([]);
  };

  const handleStatusChange = (articleId, newStatus) => {
    setArticles(prev => prev?.map(article => 
      article?.id === articleId ? { ...article, status: newStatus } : article
    ));
  };

  const handleCategoryChange = (articleId, newCategory) => {
    setArticles(prev => prev?.map(article => 
      article?.id === articleId ? { ...article, category: newCategory } : article
    ));
  };

  const handleCategoryDragDrop = (draggedCategory, targetCategory) => {
    console.log(`Moving ${draggedCategory?.name} to ${targetCategory?.name}`);
  };

  const handleAssignReviewer = (itemId) => {
    console.log(`Assigning reviewer to item ${itemId}`);
  };

  const handleApprove = (itemId) => {
    setWorkflowItems(prev => prev?.filter(item => item?.id !== itemId));
  };

  const handleReject = (itemId) => {
    setWorkflowItems(prev => prev?.map(item => 
      item?.id === itemId ? { ...item, status: 'rejected' } : item
    ));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      category: '',
      author: '',
      contentType: '',
      dateRange: { from: '', to: '' },
      viewRange: { min: '', max: '' }
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-full mx-auto px-6 py-8">
          <div className="mb-8">
            <Breadcrumb />
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Content Management</h1>
                <p className="text-muted-foreground">
                  Manage articles, categories, and content workflows
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsCategoryPanelOpen(!isCategoryPanelOpen)}
                  iconName={isCategoryPanelOpen ? 'PanelRightClose' : 'PanelRightOpen'}
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Categories
                </Button>
                
                <Button variant="outline" iconName="Upload" iconPosition="left">
                  Import Content
                </Button>
                
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Create Article
                </Button>
              </div>
            </div>

            <ContentMetrics metrics={mockMetrics} />
          </div>

          <div className="flex gap-8">
            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              <FilterToolbar
                filters={filters}
                onFilterChange={setFilters}
                onClearFilters={handleClearFilters}
                activeFilterCount={activeFilterCount}
                onSearch={setSearchQuery}
                searchQuery={searchQuery}
              />

              <ContentTable
                articles={filteredArticles}
                selectedArticles={selectedArticles}
                onSelectArticle={handleSelectArticle}
                onSelectAll={handleSelectAll}
                onSort={setSortConfig}
                sortConfig={sortConfig}
                onStatusChange={handleStatusChange}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Right Panel */}
            <div className={`w-80 space-y-6 ${isCategoryPanelOpen ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card border border-border rounded-lg p-6">
                <CategoryTree
                  categories={mockCategories}
                  onCategorySelect={setSelectedCategory}
                  selectedCategory={selectedCategory}
                  onDragDrop={handleCategoryDragDrop}
                />
              </div>

              <WorkflowPanel
                workflowItems={workflowItems}
                onAssignReviewer={handleAssignReviewer}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            </div>
          </div>
        </div>
      </main>
      <BulkActionsBar
        selectedCount={selectedArticles?.length}
        onBulkAction={handleBulkAction}
        onClearSelection={() => setSelectedArticles([])}
        isVisible={selectedArticles?.length > 0}
      />
    </div>
  );
};

export default ContentManagement;