import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import ArticleHeader from './components/ArticleHeader';
import ArticleContent from './components/ArticleContent';
import TableOfContents from './components/TableOfContents';
import RelatedArticles from './components/RelatedArticles';
import CommentSystem from './components/CommentSystem';
import VersionHistory from './components/VersionHistory';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ArticleViewer = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get search query from URL params for highlighting
  const searchQuery = searchParams?.get('q') || '';
  const articleId = searchParams?.get('id') || 'default-article';

  // Mock article data
  const mockArticle = {
    id: 'article-km-guide',
    title: 'Complete Guide to Knowledge Management Systems',
    content: `This comprehensive guide covers everything you need to know about implementing and managing knowledge management systems in modern organizations.`,
    author: {
      name: 'Sarah Chen',
      role: 'Senior Knowledge Manager',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    publishedAt: '2025-01-09T10:30:00Z',
    updatedAt: '2025-01-09T14:20:00Z',
    viewCount: 2847,
    isBookmarked: false,
    tags: ['Knowledge Management', 'Enterprise', 'Best Practices', 'Implementation'],
    category: {
      name: 'Knowledge Management',
      path: '/search-results?category=knowledge-management'
    },
    subcategory: {
      name: 'Implementation Guides',
      path: '/search-results?category=implementation-guides'
    }
  };

  // Category breadcrumb path
  const categoryPath = [
    { name: 'Knowledge Management', path: '/search-results?category=knowledge-management' },
    { name: 'Implementation Guides', path: '/search-results?category=implementation-guides' }
  ];

  useEffect(() => {
    // Simulate loading article data
    const loadArticle = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setArticle(mockArticle);
      setLoading(false);
    };

    loadArticle();
  }, [articleId]);

  useEffect(() => {
    // Track reading progress
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement?.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookmark = () => {
    setArticle(prev => ({
      ...prev,
      isBookmarked: !prev?.isBookmarked
    }));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: 'Check out this article on knowledge management',
        url: window.location?.href
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    // Mock export functionality
    const element = document.createElement('a');
    const file = new Blob([article.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${article?.title?.replace(/\s+/g, '-')?.toLowerCase()}.txt`;
    document.body?.appendChild(element);
    element?.click();
    document.body?.removeChild(element);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-muted-foreground">Loading article...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center">
              <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">Article Not Found</h1>
              <p className="text-muted-foreground">The requested article could not be found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Reading Progress Bar */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-muted z-1000">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      <div className="pt-17">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Breadcrumb */}
          <Breadcrumb categoryPath={categoryPath} />

          <div className="flex gap-8">
            {/* Main Content */}
            <main className="flex-1 max-w-4xl">
              <article className="bg-surface rounded-lg border border-border p-8">
                <ArticleHeader
                  article={article}
                  onBookmark={handleBookmark}
                  onShare={handleShare}
                  onPrint={handlePrint}
                  onExport={handleExport}
                />

                <ArticleContent 
                  content={article?.content}
                  searchQuery={searchQuery}
                />

                {/* Article Actions */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="History"
                      iconPosition="left"
                      onClick={() => setIsVersionHistoryOpen(true)}
                    >
                      Version History
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Flag"
                      iconPosition="left"
                    >
                      Report Issue
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Eye" size={16} />
                    <span>{article?.viewCount?.toLocaleString()} views</span>
                  </div>
                </div>

                {/* Comment System */}
                <CommentSystem />
              </article>
            </main>

            {/* Sidebar */}
            <aside className="hidden lg:block w-80 space-y-6">
              {/* Table of Contents */}
              <div className="sticky top-24">
                <TableOfContents 
                  isOpen={isTocOpen}
                  onToggle={() => setIsTocOpen(!isTocOpen)}
                />
              </div>

              {/* Related Articles */}
              <RelatedArticles />
            </aside>
          </div>
        </div>
      </div>
      {/* Mobile Table of Contents */}
      <TableOfContents 
        isOpen={isTocOpen}
        onToggle={() => setIsTocOpen(!isTocOpen)}
      />
      {/* Version History Modal */}
      <VersionHistory
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
      />
    </div>
  );
};

export default ArticleViewer;