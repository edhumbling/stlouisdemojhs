import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { motion } from 'framer-motion';
import { Settings, Image, FileText, LogOut } from 'lucide-react';
import ContentEditor from '../components/admin/ContentEditor';
import MediaLibrary from '../components/admin/MediaLibrary';

const AdminPage: React.FC = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('content');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
              theme="dark"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => supabase.auth.signOut()}
            className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'content'
                      ? 'bg-primary-100 text-primary-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <FileText size={18} className="mr-2" />
                  Content
                </button>
                <button
                  onClick={() => setActiveTab('media')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'media'
                      ? 'bg-primary-100 text-primary-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Image size={18} className="mr-2" />
                  Media Library
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-primary-100 text-primary-600'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              {activeTab === 'content' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Content Management</h2>
                  <ContentEditor />
                </div>
              )}

              {activeTab === 'media' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Media Library</h2>
                  <MediaLibrary />
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Settings</h2>
                  {/* Settings interface will be added here */}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;