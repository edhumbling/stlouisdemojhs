import React, { useState } from 'react';
import { ExternalLink, RefreshCw, Share2, Eye } from 'lucide-react';

interface SocialMediaDebuggerProps {
  url?: string;
  title?: string;
  description?: string;
  image?: string;
}

const SocialMediaDebugger: React.FC<SocialMediaDebuggerProps> = ({
  url = window.location.href,
  title = document.title,
  description = "St. Louis Demonstration JHS - Quality Education in Ghana",
  image = "https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MqO2sszQQOhZkrEnRa2dswxvNMHPcmT9p0b6z"
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const debugTools = [
    {
      name: "Facebook Sharing Debugger",
      url: `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`,
      description: "Clear Facebook cache and preview how your page appears when shared",
      color: "bg-blue-600 hover:bg-blue-700",
      icon: <Share2 size={16} />
    },
    {
      name: "Twitter Card Validator",
      url: `https://cards-dev.twitter.com/validator?url=${encodeURIComponent(url)}`,
      description: "Validate and preview Twitter Cards",
      color: "bg-sky-500 hover:bg-sky-600",
      icon: <Eye size={16} />
    },
    {
      name: "LinkedIn Post Inspector",
      url: `https://www.linkedin.com/post-inspector/inspect/${encodeURIComponent(url)}`,
      description: "Clear LinkedIn cache and preview social sharing",
      color: "bg-blue-700 hover:bg-blue-800",
      icon: <RefreshCw size={16} />
    },
    {
      name: "WhatsApp Link Preview",
      url: `https://web.whatsapp.com/send?text=${encodeURIComponent(url)}`,
      description: "Test how the link appears in WhatsApp",
      color: "bg-green-600 hover:bg-green-700",
      icon: <ExternalLink size={16} />
    }
  ];

  const openTool = (toolUrl: string) => {
    window.open(toolUrl, '_blank', 'width=1200,height=800');
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors z-50 text-sm font-medium"
      >
        🔧 Debug Social Previews
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Social Media Preview Debugger</h2>
              <p className="text-red-100 text-sm mt-1">Clear caches and test social media previews</p>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:text-red-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Current Page Info */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-3">Current Page Information</h3>
          <div className="space-y-2 text-sm">
            <div><strong>URL:</strong> <span className="text-blue-600 break-all">{url}</span></div>
            <div><strong>Title:</strong> <span className="text-gray-700">{title}</span></div>
            <div><strong>Description:</strong> <span className="text-gray-700">{description}</span></div>
            <div><strong>Image:</strong> <span className="text-blue-600 break-all">{image}</span></div>
          </div>
        </div>

        {/* Debug Tools */}
        <div className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Debug Tools</h3>
          <div className="grid gap-3">
            {debugTools.map((tool, index) => (
              <button
                key={index}
                onClick={() => openTool(tool.url)}
                className={`${tool.color} text-white p-4 rounded-lg transition-colors text-left group`}
              >
                <div className="flex items-center gap-3">
                  {tool.icon}
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm opacity-90">{tool.description}</div>
                  </div>
                  <ExternalLink size={16} className="ml-auto opacity-70 group-hover:opacity-100" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="p-6 bg-gray-50 rounded-b-xl">
          <h3 className="font-semibold text-gray-800 mb-3">Instructions</h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li><strong>1. Facebook:</strong> Click "Scrape Again" to clear cache and see new preview</li>
            <li><strong>2. Twitter:</strong> Enter your URL and click "Preview card" to validate</li>
            <li><strong>3. LinkedIn:</strong> Click "Inspect" to clear cache and preview</li>
            <li><strong>4. WhatsApp:</strong> Send the link to yourself to test preview</li>
          </ol>
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Social media platforms cache previews for 24-48 hours. 
              Use these tools to force refresh the cache after making changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaDebugger;
