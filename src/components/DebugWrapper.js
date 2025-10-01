import React from 'react';

const DebugWrapper = ({ componentName, children }) => {
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    console.log(`✅ ${componentName} mounted successfully`);
    return () => console.log(`❌ ${componentName} unmounted`);
  }, [componentName]);

  if (hasError) {
    return (
      <div style={{ 
        border: '2px solid red', 
        padding: '10px', 
        margin: '10px 0',
        background: '#fee'
      }}>
        <strong>CRASH: {componentName}</strong>
        <p>This component caused an error</p>
      </div>
    );
  }

  try {
    return (
      <div data-component={componentName}>
        {children}
      </div>
    );
  } catch (error) {
    console.error(`🚨 ${componentName} crashed:`, error);
    setHasError(true);
    return (
      <div style={{ 
        border: '2px solid red', 
        padding: '10px', 
        margin: '10px 0',
        background: '#fee'
      }}>
        <strong>CRASH: {componentName}</strong>
        <p>Error: {error.message}</p>
      </div>
    );
  }
};

export default DebugWrapper;
