import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ customPath = null, categoryPath = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const generateBreadcrumbs = () => {
    if (customPath) {
      return customPath;
    }

    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }];

    const routeMap = {
      'search-results': 'Search Results',
      'article-viewer': 'Article',
      'content-management': 'Content Management',
      '3d-knowledge-map': 'Knowledge Map',
    };

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      const label = routeMap?.[segment] || segment?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase());
      
      breadcrumbs?.push({ label, path });
    });

    // Add category path if provided (for article viewer)
    if (categoryPath && categoryPath?.length > 0) {
      const categoryBreadcrumbs = categoryPath?.map((category, index) => ({
        label: category?.name,
        path: category?.path || '#',
        isCategory: true,
      }));
      
      // Insert category breadcrumbs before the last item
      breadcrumbs?.splice(-1, 0, ...categoryBreadcrumbs);
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (location?.pathname === '/login' || location?.pathname === '/dashboard' || location?.pathname === '/') {
    return null;
  }

  const handleNavigation = (path) => {
    if (path !== '#') {
      navigate(path);
    }
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
          )}
          
          {index === breadcrumbs?.length - 1 ? (
            <span className="text-foreground font-medium" aria-current="page">
              {crumb?.label}
            </span>
          ) : (
            <button
              onClick={() => handleNavigation(crumb?.path)}
              className={`transition-smooth hover:text-foreground ${
                crumb?.isCategory ? 'text-accent' : ''
              }`}
              disabled={crumb?.path === '#'}
            >
              {crumb?.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;