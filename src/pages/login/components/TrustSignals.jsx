import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption'
    },
    {
      icon: 'Lock',
      title: 'SSL Secured',
      description: '256-bit SSL certificate'
    },
    {
      icon: 'CheckCircle',
      title: 'SOC 2 Compliant',
      description: 'Audited security controls'
    },
    {
      icon: 'Globe',
      title: 'GDPR Ready',
      description: 'Privacy compliant'
    }
  ];

  const certifications = [
    'ISO 27001 Certified',
    'HIPAA Compliant',
    'PCI DSS Level 1',
    'FedRAMP Authorized'
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-card/50 rounded-lg border border-border/50"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={20} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">
              {feature?.title}
            </h3>
            <p className="text-xs text-muted-foreground">
              {feature?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Certifications */}
      <div className="text-center">
        <p className="text-sm font-medium text-foreground mb-3">
          Trusted by enterprises worldwide
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {certifications?.map((cert, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full"
            >
              <Icon name="Award" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">{cert}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Info */}
      <div className="text-center pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground">
          © {new Date()?.getFullYear()} KnowledgeBase CMS. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Privacy Policy
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Terms of Service
          </button>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-smooth">
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;