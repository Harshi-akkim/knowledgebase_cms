import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const UserAccountDropdown = ({ 
  user = { name: 'John Doe', email: 'john.doe@company.com', role: 'Admin', avatar: null },
  className = "" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const menuItems = [
    {
      section: 'Account',
      items: [
        { label: 'Profile Settings', icon: 'User', action: () => console.log('Profile Settings') },
        { label: 'Preferences', icon: 'Settings', action: () => console.log('Preferences') },
        { label: 'Notifications', icon: 'Bell', action: () => console.log('Notifications') },
      ]
    },
    {
      section: 'Support',
      items: [
        { label: 'Help Center', icon: 'HelpCircle', action: () => console.log('Help Center') },
        { label: 'Keyboard Shortcuts', icon: 'Keyboard', action: () => console.log('Shortcuts') },
        { label: 'Contact Support', icon: 'MessageCircle', action: () => console.log('Support') },
      ]
    },
    {
      section: 'System',
      items: [
        { label: 'Admin Panel', icon: 'Shield', action: () => console.log('Admin Panel'), adminOnly: true },
        { label: 'System Status', icon: 'Activity', action: () => console.log('System Status') },
      ]
    }
  ];

  const logoutItem = { label: 'Sign Out', icon: 'LogOut', action: () => navigate('/login') };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleItemClick = (action) => {
    action();
    setIsOpen(false);
  };

  const getInitials = (name) => {
    return name?.split(' ')?.map(word => word?.charAt(0))?.join('')?.toUpperCase()?.slice(0, 2);
  };

  const getRoleColor = (role) => {
    const colors = {
      'Admin': 'bg-error text-error-foreground',
      'Editor': 'bg-warning text-warning-foreground',
      'Viewer': 'bg-success text-success-foreground',
      'Contributor': 'bg-accent text-accent-foreground',
    };
    return colors?.[role] || 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth focus:outline-none focus:ring-2 focus:ring-ring"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* User Avatar */}
        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
          {user?.avatar ? (
            <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm font-medium text-secondary-foreground">
              {getInitials(user?.name)}
            </span>
          )}
        </div>

        {/* User Info (Hidden on mobile) */}
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-foreground">{user?.name}</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
        </div>

        {/* Dropdown Arrow */}
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-floating z-1100">
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-sm font-medium text-secondary-foreground">
                    {getInitials(user?.name)}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{user?.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu Sections */}
          <div className="py-1">
            {menuItems?.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {sectionIndex > 0 && <div className="border-t border-border my-1" />}
                
                <div className="px-3 py-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {section?.section}
                  </div>
                </div>

                {section?.items?.map((item, itemIndex) => {
                  // Skip admin-only items for non-admin users
                  if (item?.adminOnly && user?.role !== 'Admin') {
                    return null;
                  }

                  return (
                    <button
                      key={itemIndex}
                      onClick={() => handleItemClick(item?.action)}
                      className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-muted transition-smooth"
                    >
                      <Icon name={item?.icon} size={16} className="text-muted-foreground" />
                      <span>{item?.label}</span>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Logout Section */}
            <div className="border-t border-border mt-1">
              <button
                onClick={() => handleItemClick(logoutItem?.action)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-left hover:bg-muted transition-smooth text-error"
              >
                <Icon name={logoutItem?.icon} size={16} />
                <span>{logoutItem?.label}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountDropdown;