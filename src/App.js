import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Simple safe providers
const AuthContext = React.createContext();
const ThemeContext = React.createContext();

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context || { user: null, isAuthenticated: false, loading: false };
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  return context || { theme: 'light', toggleTheme: () => {} };
};

function SimpleAuthProvider({ children }) {
  const [user] = React.useState(null);
  const value = { user, isAuthenticated: false, loading: false };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function SimpleThemeProvider({ children }) {
  const [theme] = React.useState('light');
  const value = { theme, toggleTheme: () => {} };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Test components to isolate the issue
function TestHome() {
  console.log('HomePage rendering');
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Home Page - Testing</h1>
      <p>If you see this, HomePage works</p>
    </div>
  );
}

function TestNavbar() {
  console.log('Navbar rendering');
  return (
    <nav style={{ padding: '1rem', background: '#4f46e5', color: 'white' }}>
      <div>Test Navbar</div>
    </nav>
  );
}

function TestFooter() {
  console.log('Footer rendering');
  return (
    <footer style={{ padding: '2rem', background: '#f3f4f6', textAlign: 'center' }}>
      <p>Test Footer</p>
    </footer>
  );
}

// Error boundary to catch crashes
class CrashCatcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('COMPONENT CRASHED:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white' }}>
          <h2>Component Crashed!</h2>
          <p>Error: {this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [step, setStep] = React.useState(1);

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <CrashCatcher>
            <TestHome />
          </CrashCatcher>
        );
      case 2:
        return (
          <CrashCatcher>
            <TestNavbar />
            <TestHome />
          </CrashCatcher>
        );
      case 3:
        return (
          <CrashCatcher>
            <TestNavbar />
            <TestHome />
            <TestFooter />
          </CrashCatcher>
        );
      case 4:
        // Test with actual components
        try {
          const Navbar = require('./components/Navbar').default;
          const HomePage = require('./pages/HomePage').default;
          const Footer = require('./components/Footer').default;
          
          return (
            <CrashCatcher>
              <Navbar />
              <HomePage />
              <Footer />
            </CrashCatcher>
          );
        } catch (error) {
          return (
            <div style={{ padding: '20px', background: 'orange', color: 'white' }}>
              <h2>Import Error!</h2>
              <p>{error.message}</p>
            </div>
          );
        }
      default:
        return <TestHome />;
    }
  };

  return (
    <SimpleThemeProvider>
      <SimpleAuthProvider>
        <Router>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '20px', background: '#f0f0f0', padding: '10px' }}>
              <h3>Debug Steps:</h3>
              <button onClick={() => setStep(1)}>Step 1: Test Home Only</button>
              <button onClick={() => setStep(2)}>Step 2: + Navbar</button>
              <button onClick={() => setStep(3)}>Step 3: + Footer</button>
              <button onClick={() => setStep(4)}>Step 4: Real Components</button>
              <span style={{ marginLeft: '20px' }}>Current: Step {step}</span>
            </div>
            
            <Routes>
              <Route path="/" element={renderStep()} />
            </Routes>
            
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </Router>
      </SimpleAuthProvider>
    </SimpleThemeProvider>
  );
}

export default App;
