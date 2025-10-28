// api/imagekit-files.js
import axios from 'axios';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { folder, limit = 200, skip = 0 } = req.query;

    if (!folder) {
      return res.status(400).json({ error: 'Folder parameter is required' });
    }

    // Get the private API key from environment variables
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    
    if (!privateKey) {
      console.error('IMAGEKIT_PRIVATE_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Make request to ImageKit API with higher limit
    const response = await axios.get('https://api.imagekit.io/v1/files', {
      auth: {
        username: privateKey,
        password: '', // No password needed for ImageKit
      },
      params: {
        path: folder,
        sort: 'DESC_CREATED',
        limit: Math.min(parseInt(limit), 1000), // Cap at 1000 for performance
        skip: parseInt(skip),
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StLouisDemoJHS/1.0)',
      },
    });

    // Return the files data
    res.status(200).json(response.data || []);

  } catch (error) {
    console.error('ImageKit API Error:', error.response?.data || error.message);
    
    // Return appropriate error response
    if (error.response?.status === 403) {
      res.status(403).json({ 
        error: 'Access denied. Please check ImageKit configuration.',
        details: error.response?.data?.message || 'Authentication failed'
      });
    } else if (error.response?.status === 404) {
      res.status(404).json({ 
        error: 'Folder not found',
        details: 'The specified folder does not exist in ImageKit'
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch images from ImageKit',
        details: error.response?.data?.message || error.message
      });
    }
  }
}
