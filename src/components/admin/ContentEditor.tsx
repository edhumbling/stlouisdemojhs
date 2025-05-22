import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader } from 'lucide-react';

interface ContentBlock {
  id: string;
  section: string;
  content: Record<string, any>;
  updated_at: string;
}

const ContentEditor: React.FC = () => {
  const [sections, setSections] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<Record<string, any>>({});

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const { data, error } = await supabase
        .from('content_blocks')
        .select('*')
        .order('section');

      if (error) throw error;
      setSections(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sections:', error);
      setLoading(false);
    }
  };

  const handleSectionSelect = (section: ContentBlock) => {
    setSelectedSection(section.id);
    setCurrentContent(section.content);
  };

  const handleContentChange = (key: string, value: any) => {
    setCurrentContent(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    if (!selectedSection) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('content_blocks')
        .update({ content: currentContent })
        .eq('id', selectedSection);

      if (error) throw error;
      
      // Refresh sections
      await fetchSections();
    } catch (error) {
      console.error('Error saving content:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Sections List */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium mb-4">Website Sections</h3>
        <div className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionSelect(section)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedSection === section.id
                  ? 'bg-primary-100 text-primary-600'
                  : 'hover:bg-gray-100'
              }`}
            >
              {section.section}
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="md:col-span-3">
        {selectedSection ? (
          <div className="space-y-6">
            {Object.entries(currentContent).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {key}
                </label>
                {typeof value === 'string' ? (
                  <textarea
                    value={value}
                    onChange={(e) => handleContentChange(key, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    rows={4}
                  />
                ) : (
                  <input
                    type="text"
                    value={JSON.stringify(value)}
                    onChange={(e) => handleContentChange(key, JSON.parse(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                {saving ? (
                  <Loader className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            Select a section to edit its content
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentEditor;