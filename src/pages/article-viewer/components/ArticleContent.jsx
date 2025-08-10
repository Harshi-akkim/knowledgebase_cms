import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ArticleContent = ({ content, searchQuery = '' }) => {
  const [expandedCodeBlocks, setExpandedCodeBlocks] = useState(new Set());
  const [zoomedImage, setZoomedImage] = useState(null);
  const contentRef = useRef(null);

  // Mock content sections for demonstration
  const contentSections = [
    {
      id: 'introduction',
      type: 'text',
      content: `Knowledge management is a critical component of modern enterprise operations. It involves the systematic approach to capturing, developing, sharing, and effectively using organizational knowledge.\n\nThis comprehensive guide will walk you through the essential concepts, best practices, and implementation strategies for building an effective knowledge management system.`
    },
    {
      id: 'key-concepts',
      type: 'text',
      content: `## Key Concepts\n\nBefore diving into implementation details, it's important to understand the fundamental concepts:\n\n### 1. Knowledge Types\n- **Explicit Knowledge**: Documented information that can be easily shared\n- **Tacit Knowledge**: Personal knowledge based on experience and insights\n- **Procedural Knowledge**: Step-by-step processes and workflows\n\n### 2. Knowledge Lifecycle\nThe knowledge lifecycle consists of four main phases: creation, capture, organization, and utilization.`
    },
    {
      id: 'code-example',type: 'code',language: 'javascript',title: 'Knowledge Base Search Implementation',
      content: `// Advanced search functionality with filters and ranking
class KnowledgeBaseSearch {
  constructor(articles) {
    this.articles = articles;
    this.searchIndex = this.buildSearchIndex();
  }

  buildSearchIndex() {
    const index = new Map();
    this.articles.forEach(article => {
      const words = this.tokenize(article.title + ' ' + article.content);
      words.forEach(word => {
        if (!index.has(word)) {
          index.set(word, []);
        }
        index.get(word).push({
          id: article.id,
          relevance: this.calculateRelevance(word, article)
        });
      });
    });
    return index;
  }

  search(query, filters = {}) {
    const queryWords = this.tokenize(query);
    const results = new Map();
    
    queryWords.forEach(word => {
      if (this.searchIndex.has(word)) {
        this.searchIndex.get(word).forEach(match => {
          const currentScore = results.get(match.id) || 0;
          results.set(match.id, currentScore + match.relevance);
        });
      }
    });

    return this.rankResults(results, filters);
  }

  calculateRelevance(word, article) {
    let score = 0;
    if (article.title.toLowerCase().includes(word)) score += 3;
    if (article.tags.some(tag => tag.toLowerCase().includes(word))) score += 2;
    if (article.content.toLowerCase().includes(word)) score += 1;
    return score;
  }

  tokenize(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  rankResults(results, filters) {
    return Array.from(results.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([id, score]) => ({ id, score }))
      .slice(0, 20);
  }
}`
    },
    {
      id: 'implementation-steps',type: 'text',
      content: `## Implementation Steps\n\n### Phase 1: Planning and Strategy\n1. **Assess Current State**: Evaluate existing knowledge assets and gaps\n2. **Define Objectives**: Set clear goals for your knowledge management initiative\n3. **Identify Stakeholders**: Engage key personnel across departments\n4. **Choose Technology**: Select appropriate tools and platforms\n\n### Phase 2: Content Creation and Migration\n1. **Content Audit**: Review and categorize existing documentation\n2. **Content Standards**: Establish formatting and quality guidelines\n3. **Migration Plan**: Systematically move content to the new system\n4. **Quality Assurance**: Review and validate migrated content`
    },
    {
      id: 'architecture-diagram',type: 'image',src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',alt: 'Knowledge Management System Architecture',caption: 'High-level architecture of a modern knowledge management system showing data flow and component interactions'
    },
    {
      id: 'best-practices',type: 'text',
      content: `## Best Practices\n\n### Content Organization\n- Use consistent taxonomy and categorization\n- Implement clear naming conventions\n- Create logical folder structures\n- Tag content appropriately for discoverability\n\n### User Experience\n- Design intuitive navigation\n- Provide powerful search capabilities\n- Enable collaborative features\n- Ensure mobile responsiveness\n\n### Maintenance and Governance\n- Establish content review cycles\n- Assign content ownership\n- Monitor usage analytics\n- Gather user feedback regularly`
    }
  ];

  const highlightSearchTerms = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text?.replace(regex, '<mark class="search-highlight">$1</mark>');
  };

  const toggleCodeBlock = (blockId) => {
    const newExpanded = new Set(expandedCodeBlocks);
    if (newExpanded?.has(blockId)) {
      newExpanded?.delete(blockId);
    } else {
      newExpanded?.add(blockId);
    }
    setExpandedCodeBlocks(newExpanded);
  };

  const copyCodeToClipboard = (code) => {
    navigator.clipboard?.writeText(code)?.then(() => {
      // Could show a toast notification here
    });
  };

  const renderTextContent = (section) => {
    const processedContent = highlightSearchTerms(section?.content, searchQuery);
    
    return (
      <div 
        className="prose prose-lg max-w-none text-foreground"
        dangerouslySetInnerHTML={{ __html: processedContent?.replace(/\n/g, '<br>') }}
      />
    );
  };

  const renderCodeBlock = (section) => {
    const isExpanded = expandedCodeBlocks?.has(section?.id);
    const maxLines = 15;
    const lines = section?.content?.split('\n');
    const shouldTruncate = lines?.length > maxLines;
    const displayContent = shouldTruncate && !isExpanded 
      ? lines?.slice(0, maxLines)?.join('\n') + '\n// ... (click to expand)'
      : section?.content;

    return (
      <div className="my-8 bg-muted rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Code" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">{section?.title}</span>
            <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded">
              {section?.language}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyCodeToClipboard(section?.content)}
              className="p-1 rounded hover:bg-muted transition-smooth"
              title="Copy code"
            >
              <Icon name="Copy" size={14} className="text-muted-foreground" />
            </button>
            {shouldTruncate && (
              <button
                onClick={() => toggleCodeBlock(section?.id)}
                className="p-1 rounded hover:bg-muted transition-smooth"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                <Icon 
                  name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                  size={14} 
                  className="text-muted-foreground" 
                />
              </button>
            )}
          </div>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="font-mono text-foreground">{displayContent}</code>
        </pre>
      </div>
    );
  };

  const renderImage = (section) => {
    return (
      <div className="my-8">
        <div 
          className="relative cursor-zoom-in rounded-lg overflow-hidden border border-border"
          onClick={() => setZoomedImage(section)}
        >
          <Image
            src={section?.src}
            alt={section?.alt}
            className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded">
            <Icon name="ZoomIn" size={16} />
          </div>
        </div>
        {section?.caption && (
          <p className="text-sm text-muted-foreground mt-2 text-center italic">
            {section?.caption}
          </p>
        )}
      </div>
    );
  };

  return (
    <>
      <div ref={contentRef} className="article-content">
        {contentSections?.map((section) => (
          <div key={section?.id} id={section?.id} className="scroll-mt-20">
            {section?.type === 'text' && renderTextContent(section)}
            {section?.type === 'code' && renderCodeBlock(section)}
            {section?.type === 'image' && renderImage(section)}
          </div>
        ))}
      </div>
      {/* Image Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-1200 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
            <Image
              src={zoomedImage?.src}
              alt={zoomedImage?.alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleContent;