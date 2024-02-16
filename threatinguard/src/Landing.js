import React from 'react';

// Import images (replace with actual image paths)
// eslint-disable-next-line no-unused-vars
import image1 from '/3rd yr/1st sem/Computing Project/Source/ThreatINGuard/threatinguard/src/Images/image-1.png'


const styles = { 


    container: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: 'space-between', 
      },
      image1: {
        flex: 1,
        top: '0', 
        borderRadius: '8px', 
        width: '100%', 
        height: '950px',
        backgroundSize: 'cover' 
      },
      textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: '20px',
      },
      mainText: {
        color: '#030303',
        fontSize: '4rem',
        fontWeight: 600,
        lineHeight: '1.125',
        textAlign: 'center'
      },
      secondText: {
        fontSize: '2rem',
        lineHeight: '1',
        textAlign: 'center'
      },
      button: {
        backgroundColor: '#487784',
        color: '#ffffff',
        borderRadius: '2px',
        width: '20%',
        height: '3rem',
        padding: '0 1rem',
        fontSize: '1.6rem',
        fontFamily: 'Poppins',
        fontWeight: 500,
        lineHeight: '1.2',
        marginTop: '5%'
      },
};

// Placeholder image component 
const ImagePlaceholder = (props) => {
  return (
    <div style={{
      ...styles.image1,
      backgroundImage: `url(${props.imageUrl})`,
    }} />
  );
};


const Text = (props) => {
  return (
    <div className={props.styleClass}>{props.text}</div>
  )
}
const App = () => {
  
  const image1Url = 'https://assets.api.uizard.io/api/cdn/stream/0adf2157-690b-4a0f-9908-99f0cbc179c2.png';

  return (
    <div style={styles.container}>
      <ImagePlaceholder imageUrl={image1Url} />
      <div style={styles.textContainer}>
        <Text style={styles.mainText} text="ThreatINGuard" />
        <Text style={styles.secondText} text="User Activity Monitoring Dashboard" />
        <button style={styles.button}>Start</button>
      </div>
    </div>
  );
};

export default App;

