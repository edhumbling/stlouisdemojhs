export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  
  res.status(200).json({
    hasPrivateKey: !!privateKey,
    keyLength: privateKey ? privateKey.length : 0,
    keyPrefix: privateKey ? privateKey.substring(0, 10) + '...' : 'none'
  });
}
