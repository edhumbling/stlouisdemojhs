import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ExternalLink } from 'lucide-react';

interface PageErrorBoundaryProps {
  children: ReactNode;
  pageName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface PageErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
}

class PageErrorBoundary extends Component<PageErrorBoundaryProps, PageErrorBoundaryState> {
  private maxRetries = 3;

  constructor(props: PageErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      retryCount: 0
    };
  }

  static getDerivedStateFromError(error: Error): Partial<PageErrorBoundaryState> {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Page Error Boundary caught an error on ${this.props.pageName || 'unknown page'}:`, error, errorInfo);
    
    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log specific error types that might cause 5xx errors
    if (error.message.includes('fetch')) {
      console.error('Network/fetch error detected - this might cause server errors');
    }
    
    if (error.message.includes('JSON')) {
      console.error('JSON parsing error detected - check API responses');
    }
    
    if (error.message.includes('undefined')) {
      console.error('Undefined reference error detected - check component props');
    }
  }

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: null,
        retryCount: prevState.retryCount + 1
      }));
    } else {
      // After max retries, redirect to home
      window.location.href = '/';
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleReportIssue = () => {
    const errorDetails = {
      page: this.props.pageName || 'unknown',
      error: this.state.error?.message || 'unknown',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };
    
    // You can send this to your error tracking service
    console.log('Error report:', errorDetails);
    
    // For now, just show an alert
    alert('Error has been reported. Thank you for your feedback.');
  };

  render() {
    if (this.state.hasError) {
      const canRetry = this.state.retryCount < this.maxRetries;
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-xl shadow-lg border border-red-200 p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Page Error
            </h1>
            
            <p className="text-gray-600 mb-4">
              {this.props.pageName ? `The ${this.props.pageName} page encountered an error.` : 'This page encountered an error.'}
            </p>

            {this.state.retryCount > 0 && (
              <p className="text-sm text-orange-600 mb-4">
                Retry attempt {this.state.retryCount} of {this.maxRetries}
              </p>
            )}

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-gray-100 rounded-lg text-left">
                <h3 className="font-semibold text-gray-800 mb-2">Error Details:</h3>
                <pre className="text-xs text-gray-600 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>
              )}
              
              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                Go Home
              </button>

              <button
                onClick={this.handleReportIssue}
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
                Report Issue
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              This error has been automatically logged. If the problem persists, please contact support.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default PageErrorBoundary;
