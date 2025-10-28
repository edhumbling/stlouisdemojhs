export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET and POST methods
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { query, type = 'search' } = req.method === 'GET' ? req.query : req.body;

    if (!query) {
      res.status(400).json({ error: 'Query parameter is required' });
      return;
    }

    // Construct the Grokipedia search URL
    const searchUrl = `https://grokipedia.com/search?q=${encodeURIComponent(query)}`;
    
    // Make the request to Grokipedia
    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
      },
    });

    if (!response.ok) {
      throw new Error(`Grokipedia API returned ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    
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
        url: searchUrl
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
}
