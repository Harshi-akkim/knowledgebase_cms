import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleHeader = ({ article, onBookmark, onShare, onPrint, onExport }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content?.split(' ')?.length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <div className="mb-8">
      {/* Article Title */}
      <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
        {article?.title}
      </h1>
      {/* Article Meta Information */}
      <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-muted-foreground">
        {/* Author */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-secondary">
            <Image
              src={article?.author?.avatar}
              alt={article?.author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-foreground">{article?.author?.name}</div>
            <div className="text-xs">{article?.author?.role}</div>
          </div>
        </div>

        {/* Publication Date */}
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Published {formatDate(article?.publishedAt)}</span>
        </div>

        {/* Last Updated */}
        {article?.updatedAt && article?.updatedAt !== article?.publishedAt && (
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} />
            <span>Updated {formatDate(article?.updatedAt)}</span>
          </div>
        )}

        {/* Reading Time */}
        <div className="flex items-center space-x-2">
          <Icon name="BookOpen" size={16} />
          <span>{getReadingTime(article?.content)} min read</span>
        </div>

        {/* View Count */}
        <div className="flex items-center space-x-2">
          <Icon name="Eye" size={16} />
          <span>{article?.viewCount?.toLocaleString()} views</span>
        </div>
      </div>
      {/* Article Actions */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <button
          onClick={onBookmark}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
            article?.isBookmarked
              ? 'bg-warning text-warning-foreground'
              : 'bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground'
          }`}
        >
          <Icon name={article?.isBookmarked ? 'Bookmark' : 'BookmarkPlus'} size={16} />
          <span>{article?.isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
        </button>

        <button
          onClick={onShare}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-smooth"
        >
          <Icon name="Share2" size={16} />
          <span>Share</span>
        </button>

        <button
          onClick={onPrint}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-smooth"
        >
          <Icon name="Printer" size={16} />
          <span>Print</span>
        </button>

        <button
          onClick={onExport}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-smooth"
        >
          <Icon name="Download" size={16} />
          <span>Export</span>
        </button>
      </div>
      {/* Article Tags */}
      {article?.tags && article?.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {article?.tags?.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleHeader;