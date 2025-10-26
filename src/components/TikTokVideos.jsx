import React, { useState, useEffect } from 'react';
import './TikTokVideos.css';
import ErrorHandler from '../utils/errorHandler';

const TikTokVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTikTokVideos();
  }, []);

  const fetchTikTokVideos = async () => {
    try {
      const response = await fetch('/tiktok-videos.json');
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.videos || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const TikTokEmbed = ({ video }) => {
    const [embedFailed, setEmbedFailed] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
      // Load TikTok embed script
      if (!window.tiktokEmbedLoaded) {
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
        window.tiktokEmbedLoaded = true;
      }

      // Check if embed loads successfully
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 5000); // Show fallback after 5 seconds

      return () => clearTimeout(timer);
    }, []);

    const handleEmbedError = () => {
      setEmbedFailed(true);
      setShowFallback(true);
    };

    return (
      <div className="tiktok-embed-container">
        {!embedFailed && (
          <blockquote 
            className="tiktok-embed" 
            cite={video.url} 
            data-video-id={video.id}
            data-embed-from="embed_page"
            onError={handleEmbedError}
          >
            <section>
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                title={`@${video.username}`} 
                href={`https://www.tiktok.com/@${video.username}`}
              >
                @{video.username}
              </a>
              <p>{video.description}</p>
              <a 
                target="_blank" 
                rel="noopener noreferrer"
                title="♬ original sound" 
                href={video.url}
              >
                ♬ original sound
              </a>
            </section>
          </blockquote>
        )}
        
        {(showFallback || embedFailed) && (
          <div className="tiktok-fallback">
            <div className="video-preview">
              <h3>🎵 TikTok Video</h3>
              <div className="video-info">
                <p className="username">@{video.username} {video.verified && '✓'}</p>
                <p className="description">"{video.description}"</p>
                <div className="video-stats">
                  <span>❤️ {video.likes}</span>
                  <span>💬 {video.comments}</span>
                  <span>🔄 {video.shares}</span>
                </div>
                <a 
                  href={video.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="watch-button"
                >
                  ▶️ Watch on TikTok
                </a>
                <p className="help-text">
                  Click to view this video on TikTok's website
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="tiktok-loading">
        <div className="loading-spinner"></div>
        <p>Loading TikTok videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tiktok-error">
        <h3>Unable to load TikTok videos</h3>
        <p>{error}</p>
        <button onClick={fetchTikTokVideos} className="retry-button">
          Try Again
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="tiktok-empty">
        <h3>🎵 No TikTok videos found yet</h3>
        <p>Check back soon for videos featuring St. Louis Demo JHS!</p>
      </div>
    );
  }

  return (
    <div className="tiktok-videos-section">
      <h2>🎵 St. Louis Demo JHS on TikTok</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <TikTokEmbed video={video} />
            <div className="video-metadata">
              <div className="video-user">
                <span>👤 @{video.username}</span>
                <span>📅 {video.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="videos-footer">
        <p>Videos automatically updated weekly</p>
        <p className="last-update">
          Last update: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TikTokVideos;
