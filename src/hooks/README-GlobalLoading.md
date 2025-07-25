# Global Loading Screen Usage

## Overview
The global loading screen provides a beautiful, animated loading experience with a tiny logo, revolving circles, and light beams on a black background.

## How to Use

### Method 1: Simple Loading (Recommended)
```tsx
import { useLoading } from '../contexts/LoadingContext';

const MyPage: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();

  const handleSomeAction = async () => {
    startLoading('Loading data...');
    
    try {
      // Your async operation here
      await fetchData();
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <button onClick={handleSomeAction}>Load Data</button>
    </div>
  );
};
```

### Method 2: Full Control
```tsx
import { useGlobalLoading } from '../contexts/LoadingContext';

const MyPage: React.FC = () => {
  const { 
    showGlobalLoading, 
    hideGlobalLoading, 
    setLoadingMessage,
    isGlobalLoading 
  } = useGlobalLoading();

  const handleComplexOperation = async () => {
    setLoadingMessage('Initializing...');
    showGlobalLoading();
    
    // Step 1
    await step1();
    setLoadingMessage('Processing...');
    
    // Step 2
    await step2();
    setLoadingMessage('Finalizing...');
    
    // Step 3
    await step3();
    
    hideGlobalLoading();
  };

  return (
    <div>
      <button onClick={handleComplexOperation} disabled={isGlobalLoading}>
        {isGlobalLoading ? 'Processing...' : 'Start Complex Operation'}
      </button>
    </div>
  );
};
```

## Features
- **Tiny Logo**: School logo displayed in the center
- **Revolving Circles**: Multiple animated circles rotating around the logo
- **Light Beams**: Beautiful rotating beams and sparkles
- **Custom Messages**: Optional loading messages
- **Smooth Animations**: Powered by Framer Motion
- **Z-Index 9999**: Always appears on top of other content

## Best Practices
1. Always call `stopLoading()` or `hideGlobalLoading()` in a `finally` block
2. Use descriptive loading messages for better UX
3. Don't show loading for operations under 500ms
4. Consider using the simple `useLoading` hook for most cases
