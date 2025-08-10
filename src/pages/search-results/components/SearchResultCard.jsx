import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchResultCard = ({ result, searchQuery = '' }) => {
  const [isBookmarked, setIsBookmarked] = useState(result?.isBookmarked || false);
  const navigate = useNavigate();

  const handleBookmark = (e) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
    // In real app, this would make an API call
    console.log(`${isBookmarked ? 'Removed' : 'Added'} bookmark for:`, result?.title);
  };

  const handleShare = (e) => {
    e?.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: result?.title,
        text: result?.snippet,
        url: window.location?.origin + `/article-viewer?id=${result?.id}`
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location?.origin + `/article-viewer?id=${result?.id}`);
      console.log('Link copied to clipboard');
    }
  };

  const handleResultClick = () => {
    navigate(`/article-viewer?id=${result?.id}&q=${encodeURIComponent(searchQuery)}`);
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text?.split(regex);
    
    return parts?.map((part, index) => 
      regex?.test(part) ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : part
    );
  };

  const getContentTypeIcon = (type) => {
    const icons = {
      'article': 'FileText',
      'guide': 'BookOpen',
      'tutorial': 'GraduationCap',
      'faq': 'HelpCircle',
      'policy': 'Shield',
      'procedure': 'List'
    };
    return icons?.[type] || 'FileText';
  };

  const getContentTypeColor = (type) => {
    const colors = {
      'article': 'text-blue-600 bg-blue-50',
      'guide': 'text-green-600 bg-green-50',
      'tutorial': 'text-purple-600 bg-purple-50',
      'faq': 'text-orange-600 bg-orange-50',
      'policy': 'text-red-600 bg-red-50',
      'procedure': 'text-indigo-600 bg-indigo-50'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
    return `${Math.ceil(diffDays / 365)} years ago`;
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-6 hover:shadow-floating transition-smooth cursor-pointer"
      onClick={handleResultClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg ${getContentTypeColor(result?.contentType)}`}>
            <Icon name={getContentTypeIcon(result?.contentType)} size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-smooth truncate">
              {highlightText(result?.title, searchQuery)}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center space-x-1">
                <Icon name="User" size={14} />
                <span>{result?.author}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{formatDate(result?.lastModified)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Eye" size={14} />
                <span>{result?.views?.toLocaleString()} views</span>
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            iconName={isBookmarked ? 'Bookmark' : 'BookmarkPlus'}
            onClick={handleBookmark}
            className="text-muted-foreground hover:text-warning"
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Share"
            onClick={handleShare}
            className="text-muted-foreground hover:text-primary"
          />
        </div>
      </div>
      {/* Content Snippet */}
      <div className="mb-4">
        <p className="text-muted-foreground leading-relaxed">
          {highlightText(result?.snippet, searchQuery)}
        </p>
      </div>
      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Category */}
          <div className="flex items-center space-x-1 text-sm">
            <Icon name="Folder" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">{result?.category}</span>
          </div>

          {/* Tags */}
          {result?.tags && result?.tags?.length > 0 && (
            <div className="flex items-center space-x-2">
              {result?.tags?.slice(0, 3)?.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {result?.tags?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{result?.tags?.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Relevance Score */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={14} className="text-warning" />
            <span className="text-sm font-medium text-foreground">
              {Math.round(result?.relevanceScore * 100)}% match
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;