import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTree = ({ categories, onCategorySelect, selectedCategory, onDragDrop }) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set(['1', '2', '3']));
  const [draggedItem, setDraggedItem] = useState(null);

  const toggleExpanded = (categoryId) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded?.has(categoryId)) {
      newExpanded?.delete(categoryId);
    } else {
      newExpanded?.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleDragStart = (e, category) => {
    setDraggedItem(category);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetCategory) => {
    e?.preventDefault();
    if (draggedItem && draggedItem?.id !== targetCategory?.id) {
      onDragDrop(draggedItem, targetCategory);
    }
    setDraggedItem(null);
  };

  const renderCategory = (category, level = 0) => {
    const hasChildren = category?.children && category?.children?.length > 0;
    const isExpanded = expandedCategories?.has(category?.id);
    const isSelected = selectedCategory === category?.id;

    return (
      <div key={category?.id} className="select-none">
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, category)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, category)}
          onClick={() => onCategorySelect(category?.id)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer transition-smooth hover:bg-muted ${
            isSelected ? 'bg-primary/10 border border-primary/20' : ''
          }`}
          style={{ marginLeft: `${level * 16}px` }}
        >
          {hasChildren && (
            <button
              onClick={(e) => {
                e?.stopPropagation();
                toggleExpanded(category?.id);
              }}
              className="p-0.5 hover:bg-muted rounded transition-smooth"
            >
              <Icon
                name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
                size={14}
                className="text-muted-foreground"
              />
            </button>
          )}
          
          {!hasChildren && <div className="w-4" />}
          
          <Icon name="Folder" size={16} className="text-accent flex-shrink-0" />
          
          <span className="text-sm font-medium text-foreground flex-1 truncate">
            {category?.name}
          </span>
          
          <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {category?.articleCount}
          </span>
        </div>
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {category?.children?.map(child => renderCategory(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Categories</h3>
        <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
          <Icon name="Plus" size={16} className="text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-1 max-h-96 overflow-y-auto">
        {categories?.map(category => renderCategory(category))}
      </div>
    </div>
  );
};

export default CategoryTree;