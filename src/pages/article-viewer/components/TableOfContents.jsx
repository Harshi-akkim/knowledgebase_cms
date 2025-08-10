import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const TableOfContents = ({ isOpen, onToggle }) => {
  const [activeSection, setActiveSection] = useState('');
  const [sections, setSections] = useState([]);

  // Mock table of contents data
  const mockSections = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'key-concepts', title: 'Key Concepts', level: 1 },
    { id: 'knowledge-types', title: 'Knowledge Types', level: 2 },
    { id: 'knowledge-lifecycle', title: 'Knowledge Lifecycle', level: 2 },
    { id: 'code-example', title: 'Search Implementation', level: 1 },
    { id: 'implementation-steps', title: 'Implementation Steps', level: 1 },
    { id: 'phase-1', title: 'Phase 1: Planning', level: 2 },
    { id: 'phase-2', title: 'Phase 2: Content Creation', level: 2 },
    { id: 'architecture-diagram', title: 'System Architecture', level: 1 },
    { id: 'best-practices', title: 'Best Practices', level: 1 },
    { id: 'content-organization', title: 'Content Organization', level: 2 },
    { id: 'user-experience', title: 'User Experience', level: 2 },
    { id: 'maintenance', title: 'Maintenance & Governance', level: 2 }
  ];

  useEffect(() => {
    setSections(mockSections);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (let i = sections?.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections?.[i]?.id);
        if (element && element?.offsetTop <= scrollPosition) {
          setActiveSection(sections?.[i]?.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element?.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const getLevelIndentation = (level) => {
    return level === 1 ? 'pl-0' : 'pl-4';
  };

  const getLevelStyle = (level) => {
    return level === 1 
      ? 'font-medium text-foreground' 
      : 'text-sm text-muted-foreground';
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-floating flex items-center justify-center z-1100"
      >
        <Icon name="List" size={20} />
      </button>
      {/* Table of Contents */}
      <div className={`
        fixed lg:sticky top-20 right-0 lg:right-auto
        w-80 lg:w-full h-[calc(100vh-5rem)] lg:h-auto
        bg-surface lg:bg-transparent
        border-l lg:border-l-0 border-border
        shadow-lg lg:shadow-none
        z-1050 lg:z-auto
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 lg:p-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:mb-4">
            <h3 className="text-lg font-semibold text-foreground">Table of Contents</h3>
            <button
              onClick={onToggle}
              className="lg:hidden p-1 rounded hover:bg-muted transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Navigation List */}
          <nav className="space-y-1">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => scrollToSection(section?.id)}
                className={`
                  w-full text-left py-2 px-3 rounded-lg transition-smooth
                  ${getLevelIndentation(section?.level)}
                  ${getLevelStyle(section?.level)}
                  ${activeSection === section?.id 
                    ? 'bg-primary/10 text-primary border-l-2 border-primary' :'hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  {section?.level === 2 && (
                    <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                  )}
                  <span className="truncate">{section?.title}</span>
                </div>
              </button>
            ))}
          </nav>

          {/* Reading Progress */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
              <span>Reading Progress</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-1040"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default TableOfContents;