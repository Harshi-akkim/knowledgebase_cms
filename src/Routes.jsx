import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ContentManagement from './pages/content-management';
import SearchResults from './pages/search-results';
import LoginPage from './pages/login';
import ArticleViewer from './pages/article-viewer';
import Dashboard from './pages/dashboard';
import KnowledgeMap3D from './pages/3d-knowledge-map';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/content-management" element={<ContentManagement />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/article-viewer" element={<ArticleViewer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/3d-knowledge-map" element={<KnowledgeMap3D />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;