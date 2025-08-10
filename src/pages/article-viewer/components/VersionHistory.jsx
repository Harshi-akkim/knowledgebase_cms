import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VersionHistory = ({ isOpen, onClose }) => {
  const [selectedVersions, setSelectedVersions] = useState([]);
  const [showDiff, setShowDiff] = useState(false);

  const versions = [
    {
      id: 'v1.4',
      version: '1.4',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      timestamp: '2025-01-09T10:30:00Z',
      changes: 'Added new section on analytics and updated code examples',
      changeType: 'major',
      size: '2.3 KB',
      isCurrent: true
    },
    {
      id: 'v1.3',
      version: '1.3',
      author: {
        name: 'Michael Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      timestamp: '2025-01-08T14:15:00Z',
      changes: 'Fixed typos and improved formatting in implementation steps',
      changeType: 'minor',
      size: '2.1 KB',
      isCurrent: false
    },
    {
      id: 'v1.2',
      version: '1.2',
      author: {
        name: 'Emily Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
      },
      timestamp: '2025-01-07T16:45:00Z',
      changes: 'Added architecture diagram and expanded best practices section',
      changeType: 'major',
      size: '1.9 KB',
      isCurrent: false
    },
    {
      id: 'v1.1',
      version: '1.1',
      author: {
        name: 'David Park',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg'
      },
      timestamp: '2025-01-05T11:20:00Z',
      changes: 'Updated search implementation code and added error handling',
      changeType: 'minor',
      size: '1.7 KB',
      isCurrent: false
    },
    {
      id: 'v1.0',
      version: '1.0',
      author: {
        name: 'Sarah Chen',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
      },
      timestamp: '2025-01-03T09:00:00Z',
      changes: 'Initial version of the knowledge management guide',
      changeType: 'initial',
      size: '1.5 KB',
      isCurrent: false
    }
  ];

  const formatDate = (timestamp) => {
    return new Date(timestamp)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'major':
        return 'bg-error/10 text-error border-error/20';
      case 'minor':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'initial':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'major':
        return 'AlertTriangle';
      case 'minor':
        return 'Edit';
      case 'initial':
        return 'Plus';
      default:
        return 'FileText';
    }
  };

  const handleVersionSelect = (versionId) => {
    setSelectedVersions(prev => {
      if (prev?.includes(versionId)) {
        return prev?.filter(id => id !== versionId);
      } else if (prev?.length < 2) {
        return [...prev, versionId];
      } else {
        return [prev?.[1], versionId];
      }
    });
  };

  const handleCompareVersions = () => {
    if (selectedVersions?.length === 2) {
      setShowDiff(true);
    }
  };

  const mockDiffContent = [
    {
      type: 'unchanged',
      content: '# Knowledge Management Best Practices'
    },
    {
      type: 'unchanged',
      content: 'Knowledge management is a critical component of modern enterprise operations.'
    },
    {
      type: 'removed',
      content: 'This guide covers basic implementation strategies.'
    },
    {
      type: 'added',
      content: 'This comprehensive guide covers advanced implementation strategies and analytics.'
    },
    {
      type: 'unchanged',
      content: '## Key Concepts'
    },
    {
      type: 'added',
      content: '### Analytics and Metrics\nTrack usage patterns and measure content effectiveness.'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-1200 flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-floating w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="History" size={20} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Version History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex h-[calc(90vh-5rem)]">
          {/* Version List */}
          <div className="w-1/2 border-r border-border overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-foreground">Select versions to compare</h3>
                <Button
                  size="sm"
                  onClick={handleCompareVersions}
                  disabled={selectedVersions?.length !== 2}
                >
                  Compare
                </Button>
              </div>

              <div className="space-y-3">
                {versions?.map((version) => (
                  <div
                    key={version?.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-smooth ${
                      selectedVersions?.includes(version?.id)
                        ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                    }`}
                    onClick={() => handleVersionSelect(version?.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          Version {version?.version}
                        </span>
                        {version?.isCurrent && (
                          <span className="px-2 py-0.5 text-xs bg-success/10 text-success rounded-full border border-success/20">
                            Current
                          </span>
                        )}
                        <span className={`px-2 py-0.5 text-xs rounded-full border ${getChangeTypeColor(version?.changeType)}`}>
                          <Icon name={getChangeTypeIcon(version?.changeType)} size={12} className="inline mr-1" />
                          {version?.changeType}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{version?.size}</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <Image
                          src={version?.author?.avatar}
                          alt={version?.author?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {version?.author?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(version?.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-foreground">{version?.changes}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diff View */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-4">
              {showDiff && selectedVersions?.length === 2 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-foreground">
                      Comparing v{versions?.find(v => v?.id === selectedVersions?.[0])?.version} → v{versions?.find(v => v?.id === selectedVersions?.[1])?.version}
                    </h3>
                    <button
                      onClick={() => setShowDiff(false)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-1 font-mono text-sm">
                    {mockDiffContent?.map((line, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded ${
                          line?.type === 'added' ?'bg-success/10 text-success border-l-2 border-success'
                            : line?.type === 'removed' ?'bg-error/10 text-error border-l-2 border-error' :'text-foreground'
                        }`}
                      >
                        <span className="mr-2 text-muted-foreground">
                          {line?.type === 'added' ? '+' : line?.type === 'removed' ? '-' : ' '}
                        </span>
                        {line?.content}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Icon name="GitCompare" size={48} className="text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Select Two Versions
                  </h3>
                  <p className="text-muted-foreground">
                    Choose two versions from the list to see the differences between them.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionHistory;