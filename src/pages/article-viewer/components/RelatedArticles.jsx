import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RelatedArticles = () => {
  const navigate = useNavigate();

  const relatedArticles = [
    {
      id: 'article-1',
      title: 'Advanced Search Techniques for Knowledge Management',
      excerpt: 'Learn how to implement sophisticated search algorithms and improve content discoverability in your knowledge base.',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      publishedAt: '2025-01-15T10:30:00Z',
      readTime: 8,
      category: 'Search & Discovery',
      tags: ['Search', 'Algorithms', 'UX'],
      viewCount: 1247,
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop'
    },
    {
      id: 'article-2',
      title: 'Content Governance and Quality Control',
      excerpt: 'Establish effective workflows for content review, approval, and maintenance to ensure high-quality knowledge assets.',
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      publishedAt: '2025-01-12T14:15:00Z',
      readTime: 12,
      category: 'Content Management',
      tags: ['Governance', 'Quality', 'Workflows'],
      viewCount: 892,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=200&fit=crop'
    },
    {
      id: 'article-3',
      title: 'Building Collaborative Knowledge Communities',
      excerpt: 'Foster knowledge sharing culture and enable effective collaboration among team members and departments.',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      publishedAt: '2025-01-10T09:45:00Z',
      readTime: 6,
      category: 'Collaboration',
      tags: ['Community', 'Collaboration', 'Culture'],
      viewCount: 1456,
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=200&fit=crop'
    },
    {
      id: 'article-4',
      title: 'Analytics and Metrics for Knowledge Management',
      excerpt: 'Track usage patterns, measure content effectiveness, and make data-driven decisions for your knowledge base.',
      author: {
        name: 'David Park',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      publishedAt: '2025-01-08T16:20:00Z',
      readTime: 10,
      category: 'Analytics',
      tags: ['Analytics', 'Metrics', 'Data'],
      viewCount: 734,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleArticleClick = (articleId) => {
    navigate(`/article-viewer?id=${articleId}`);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="BookOpen" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Related Articles</h3>
      </div>
      <div className="space-y-6">
        {relatedArticles?.map((article) => (
          <article
            key={article?.id}
            className="group cursor-pointer"
            onClick={() => handleArticleClick(article?.id)}
          >
            <div className="flex space-x-4">
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={article?.thumbnail}
                  alt={article?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-1">
                  {article?.title}
                </h4>
                
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {article?.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <div className="w-4 h-4 rounded-full overflow-hidden">
                      <Image
                        src={article?.author?.avatar}
                        alt={article?.author?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span>{article?.author?.name}</span>
                  </div>
                  
                  <span>•</span>
                  <span>{formatDate(article?.publishedAt)}</span>
                  
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{article?.readTime} min</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {article?.tags?.slice(0, 2)?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-accent/10 text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-border">
        <button
          onClick={() => navigate('/search-results')}
          className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-smooth"
        >
          <span>View All Articles</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default RelatedArticles;