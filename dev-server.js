import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// ImageKit API proxy
app.get('/api/imagekit-files', async (req, res) => {
  console.log('ImageKit API called with:', req.method, req.query);
  
  try {
    const { folder, limit = 200, skip = 0 } = req.query;
    
    console.log('Processing request for folder:', folder);
    console.log('Limit:', limit, 'Skip:', skip);

    if (!folder) {
      console.log('No folder provided');
      return res.status(400).json({ error: 'Folder parameter is required' });
    }

    // Get the private API key from environment variables
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    
    console.log('Private key exists:', !!privateKey);
    console.log('Private key length:', privateKey ? privateKey.length : 0);
    
    if (!privateKey) {
      console.error('IMAGEKIT_PRIVATE_KEY environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    console.log('Making request to ImageKit API...');
    
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

    console.log('ImageKit API response status:', response.status);
    console.log('ImageKit API response data length:', response.data ? response.data.length : 'no data');

    // Return the files data
    res.status(200).json(response.data || []);

  } catch (error) {
    console.error('ImageKit API Error:', error);
    console.error('Error response:', error.response?.data);
    console.error('Error status:', error.response?.status);
    
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
});

// Test endpoint
app.get('/api/test-env', (req, res) => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  
  res.status(200).json({
    hasPrivateKey: !!privateKey,
    keyLength: privateKey ? privateKey.length : 0,
    keyPrefix: privateKey ? privateKey.substring(0, 10) + '...' : 'none'
  });
});

// Grokipedia search API endpoint
app.post('/api/grokipedia-search', async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  try {
    const { query, type = 'search' } = req.body;

    if (!query) {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }

    // Construct the Grokipedia search URL
    const searchUrl = `https://grokipedia.com/search?q=${encodeURIComponent(query)}`;
    
    // Make the request to Grokipedia
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Grokipedia API returned ${response.status}: ${response.statusText}`);
    }

    const html = response.data;
    
    // Extract relevant information from the HTML response
    // This is a basic implementation - you might want to enhance it based on Grokipedia's actual structure
    const results = {
      query: query,
      url: searchUrl,
      timestamp: new Date().toISOString(),
      status: 'success',
      results: {
        // Basic response structure - customize based on actual Grokipedia response format
        title: `Search results for "${query}"`,
        description: `AI-powered encyclopedia search results for "${query}"`,
        source: 'grokipedia.com',
        url: searchUrl,
        contentLength: html.length
      }
    };

    res.status(200).json(results);

  } catch (error) {
    console.error('Grokipedia search error:', error);
    
    res.status(500).json({
      error: 'Failed to search Grokipedia',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
  console.log(`Development API server running on http://localhost:${PORT}`);
  console.log(`ImageKit API available at http://localhost:${PORT}/api/imagekit-files`);
});
