import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentTable = ({ 
  articles, 
  selectedArticles, 
  onSelectArticle, 
  onSelectAll, 
  onSort, 
  sortConfig,
  onStatusChange,
  onCategoryChange 
}) => {
  const [editingCell, setEditingCell] = useState(null);

  const getStatusColor = (status) => {
    const colors = {
      'Published': 'bg-success text-success-foreground',
      'Draft': 'bg-warning text-warning-foreground',
      'Under Review': 'bg-accent text-accent-foreground',
      'Archived': 'bg-muted text-muted-foreground'
    };
    return colors?.[status] || 'bg-secondary text-secondary-foreground';
  };

  const handleSort = (field) => {
    const direction = sortConfig?.field === field && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const getSortIcon = (field) => {
    if (sortConfig?.field !== field) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatViewCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000)?.toFixed(1)}k`;
    }
    return count?.toString();
  };

  const handleInlineEdit = (articleId, field, value) => {
    if (field === 'status') {
      onStatusChange(articleId, value);
    } else if (field === 'category') {
      onCategoryChange(articleId, value);
    }
    setEditingCell(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedArticles?.length === articles?.length && articles?.length > 0}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Title</span>
                  <Icon name={getSortIcon('title')} size={14} />
                </button>
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Category</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('author')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Author</span>
                  <Icon name={getSortIcon('author')} size={14} />
                </button>
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Status</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('lastModified')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Last Modified</span>
                  <Icon name={getSortIcon('lastModified')} size={14} />
                </button>
              </th>
              
              <th className="text-left px-4 py-3">
                <button
                  onClick={() => handleSort('views')}
                  className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-smooth"
                >
                  <span>Views</span>
                  <Icon name={getSortIcon('views')} size={14} />
                </button>
              </th>
              
              <th className="w-20 px-4 py-3">
                <span className="text-sm font-medium text-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-border">
            {articles?.map((article) => (
              <tr key={article?.id} className="hover:bg-muted/30 transition-smooth">
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedArticles?.includes(article?.id)}
                    onChange={() => onSelectArticle(article?.id)}
                    className="rounded border-border"
                  />
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="FileText" size={16} className="text-muted-foreground flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground truncate max-w-xs">
                        {article?.title}
                      </div>
                      {article?.description && (
                        <div className="text-xs text-muted-foreground truncate max-w-xs">
                          {article?.description}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{article?.category}</span>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-secondary-foreground">
                        {article?.author?.split(' ')?.map(n => n?.[0])?.join('')}
                      </span>
                    </div>
                    <span className="text-sm text-foreground">{article?.author}</span>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  {editingCell === `${article?.id}-status` ? (
                    <select
                      value={article?.status}
                      onChange={(e) => handleInlineEdit(article?.id, 'status', e?.target?.value)}
                      onBlur={() => setEditingCell(null)}
                      className="text-xs px-2 py-1 rounded-full border border-border bg-background"
                      autoFocus
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Archived">Archived</option>
                    </select>
                  ) : (
                    <button
                      onClick={() => setEditingCell(`${article?.id}-status`)}
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-smooth hover:opacity-80 ${getStatusColor(article?.status)}`}
                    >
                      {article?.status}
                    </button>
                  )}
                </td>
                
                <td className="px-4 py-3">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(article?.lastModified)}
                  </span>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatViewCount(article?.views)}
                    </span>
                  </div>
                </td>
                
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-muted rounded transition-smooth">
                      <Icon name="Edit" size={14} className="text-muted-foreground" />
                    </button>
                    <button className="p-1 hover:bg-muted rounded transition-smooth">
                      <Icon name="MoreHorizontal" size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {articles?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first article or adjusting your filters.
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Article
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContentTable;