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

app.listen(PORT, () => {
  console.log(`Development API server running on http://localhost:${PORT}`);
  console.log(`ImageKit API available at http://localhost:${PORT}/api/imagekit-files`);
});
