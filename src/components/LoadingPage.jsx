import React from 'react';

const LoadingPage = ({ loading }) => {
  //if (!loading) return null;

  return (
    <>
    <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.loader}></div>
        <p style={styles.text}>Loading...</p>
      </div>
    </div>
    </>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0, 0, 0)', // Dark overlay background with transparency
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,  // Ensures it is on top of everything
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  loader: {
    border: '8px solid #333',  // Dark border for the spinner
    borderTop: '8px solid #fff',  // Light top border for the spinner
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite', // Spinner animation
  },
  text: {
    marginTop: '10px',
    fontSize: '18px',
    color: '#fff',  // Light text for dark mode
  },
};

// Keyframe animation for spinning effect
const globalStyles = {
  '@keyframes spin': {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

export default LoadingPage;
