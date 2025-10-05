import React from 'react';

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    console.error('Root error boundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null 
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px 20px', 
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h1 style={{ color: '#e74c3c', marginBottom: '20px' }}>
            🚨 Something went wrong
          </h1>
          <p style={{ marginBottom: '30px', color: '#666' }}>
            We encountered an unexpected error. Please try reloading the page or go back to the homepage.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={this.handleReload}
              style={{
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Reload Page
            </button>
            <button 
              onClick={this.handleGoHome}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2ecc71',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Go to Homepage
            </button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
            <details style={{ 
              marginTop: '30px', 
              textAlign: 'left',
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '5px',
              border: '1px solid #e9ecef'
            }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                Error Details (Development Only)
              </summary>
              <pre style={{ 
                whiteSpace: 'pre-wrap',
                fontSize: '12px',
                color: '#e74c3c',
                marginTop: '10px'
              }}>
                {this.state.error && this.state.error.toString()}
                {'\n'}
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default RootErrorBoundary;
