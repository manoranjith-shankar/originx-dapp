import React from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    margin: '0.1rem',
    marginInlineStart: '-2.9004rem',
    fontFamily: 'var(--font-family)',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1rem',
    marginBottom: '2rem',
  },
  reasonsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '400px',
    padding: '1rem',
    border: '1px solid white',
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
  },
  reasonItem: {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  arrowContainer: {
    display: 'flex',
    justifyContent: 'space-between', // Adjusted justifyContent property
    marginTop: '1rem',
    marginInlineStart: '3.1rem',
    width: '100%',
  },

  arrowLinkContainer: {
    display: 'inline-block', // Added display property
  },

  arrowLink: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'white',
    fontSize: '0.8rem',
  },

  arrowIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
};

const OopsComponent = ({ onRetry }) => (
  <div style={styles.container}>
    <h2 style={styles.heading}>Oops!</h2>
    <p style={styles.message}>Something went wrong. Please try again later.</p>
    <div
      style={styles.reasonsContainer}
      onMouseOver={(e) => {
        e.target.style.borderColor = 'white';
      }}
      onMouseOut={(e) => {
        e.target.style.borderColor = 'transparent';
      }}
    >
      <div style={styles.arrowContainer}>
        <div style={styles.arrowLinkContainer}>
          <a href="/" style={styles.arrowLink}>
            <i className="fa fa-arrow-left" style={styles.arrowIcon} />
            Back to Home
          </a>
        </div>
        <div style={styles.arrowLinkContainer}>
          <a href="https://originx-docs.0xc0d3rs.tech" style={styles.arrowLink}>
            <i className="fa fa-arrow-right" style={styles.arrowIcon} />
            Go to Docs
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default OopsComponent;