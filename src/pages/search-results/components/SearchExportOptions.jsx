import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchExportOptions = ({ searchQuery, resultCount, onExport }) => {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    includeSnippets: true,
    includeMetadata: true,
    includeFullContent: false,
    includeImages: false
  });

  const exportFormats = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'excel', label: 'Excel Spreadsheet' },
    { value: 'csv', label: 'CSV File' },
    { value: 'json', label: 'JSON Data' },
    { value: 'word', label: 'Word Document' }
  ];

  const handleExport = () => {
    const exportData = {
      query: searchQuery,
      format: exportFormat,
      options: exportOptions,
      resultCount,
      timestamp: new Date()?.toISOString()
    };
    
    onExport(exportData);
    setIsExportModalOpen(false);
    
    // Simulate export process
    console.log('Exporting search results:', exportData);
  };

  const handleOptionChange = (option, checked) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: checked
    }));
  };

  return (
    <>
      <Button
        variant="outline"
        iconName="Download"
        iconPosition="left"
        onClick={() => setIsExportModalOpen(true)}
        disabled={resultCount === 0}
      >
        Export Results
      </Button>
      {/* Export Modal */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1200 p-4">
          <div className="bg-card border border-border rounded-lg w-full max-w-md">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Export Search Results</h2>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setIsExportModalOpen(false)}
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Export Info */}
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Info" size={16} className="text-primary" />
                  <span className="text-muted-foreground">
                    Exporting {resultCount?.toLocaleString()} results
                    {searchQuery && ` for "${searchQuery}"`}
                  </span>
                </div>
              </div>

              {/* Export Format */}
              <div>
                <Select
                  label="Export Format"
                  options={exportFormats}
                  value={exportFormat}
                  onChange={setExportFormat}
                />
              </div>

              {/* Export Options */}
              <div>
                <h3 className="font-medium text-foreground mb-3">Export Options</h3>
                <div className="space-y-3">
                  <Checkbox
                    label="Include content snippets"
                    description="Add preview text for each result"
                    checked={exportOptions?.includeSnippets}
                    onChange={(e) => handleOptionChange('includeSnippets', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Include metadata"
                    description="Author, date, category, and tags"
                    checked={exportOptions?.includeMetadata}
                    onChange={(e) => handleOptionChange('includeMetadata', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Include full content"
                    description="Complete article content (larger file size)"
                    checked={exportOptions?.includeFullContent}
                    onChange={(e) => handleOptionChange('includeFullContent', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Include images"
                    description="Embed images in the export"
                    checked={exportOptions?.includeImages}
                    onChange={(e) => handleOptionChange('includeImages', e?.target?.checked)}
                  />
                </div>
              </div>

              {/* File Size Estimate */}
              <div className="bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Estimated file size:</span>
                  <span className="font-medium text-foreground">
                    {exportOptions?.includeFullContent ? '15-25 MB' : 
                     exportOptions?.includeImages ? '8-12 MB' : '2-5 MB'}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setIsExportModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExport}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchExportOptions;