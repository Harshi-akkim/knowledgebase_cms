import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import BackgroundPattern from './components/BackgroundPattern';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <BackgroundPattern />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="flex-shrink-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                  </svg>
                </div>
                <span className="text-xl font-semibold text-foreground">
                  KnowledgeBase CMS
                </span>
              </div>
              
              {/* Help Link */}
              <button className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
                Need Help?
              </button>
            </div>
          </div>
        </header>

        {/* Main Login Area */}
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Branding & Info */}
              <div className="hidden lg:block space-y-8">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Enterprise Knowledge Management
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Centralize, organize, and discover your organization's knowledge with AI-powered search and intelligent content management.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">AI-powered search capabilities</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">Role-based access control</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">Advanced analytics & reporting</span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-foreground">Real-time collaboration</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Login Form */}
              <div className="w-full">
                <LoginForm />
              </div>
            </div>
          </div>
        </main>

        {/* Footer with Trust Signals */}
        <footer className="flex-shrink-0 p-6">
          <div className="max-w-7xl mx-auto">
            <TrustSignals />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;