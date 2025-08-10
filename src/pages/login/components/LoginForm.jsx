import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for different user roles
  const mockCredentials = [
    { email: 'admin@company.com', password: 'Admin123!', role: 'Admin' },
    { email: 'editor@company.com', password: 'Editor123!', role: 'Editor' },
    { email: 'viewer@company.com', password: 'Viewer123!', role: 'Viewer' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Store user session data
        localStorage.setItem('user', JSON.stringify({
          email: validCredential?.email,
          role: validCredential?.role,
          name: validCredential?.email?.split('@')?.[0]?.replace('.', ' ')?.replace(/\b\w/g, l => l?.toUpperCase()),
          loginTime: new Date()?.toISOString()
        }));

        if (formData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        navigate('/dashboard');
      } else {
        setErrors({
          general: `Invalid credentials. Please use: ${mockCredentials?.map(c => c?.email)?.join(', ')} with their respective passwords.`
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => {
    alert('Password reset functionality would be implemented here. For demo, use the provided mock credentials.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-floating p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Icon name="BookOpen" size={32} color="white" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to your KnowledgeBase CMS account
          </p>
        </div>

        {/* General Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            required
            disabled={isLoading}
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData?.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-smooth"
              disabled={isLoading}
            >
              Forgot password?
            </button>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Demo Credentials</p>
              <p className="text-xs text-muted-foreground">
                Use admin@company.com / Admin123! for full access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;