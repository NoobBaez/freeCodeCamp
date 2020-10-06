import React, { useState, useEffect } from 'react';
import Quote from './components/Quote'

import DB from './db.json';

const App = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    randomQuote();
  }, [])

  function randomQuote() {
    const index = Math.floor(Math.random() * DB.length);
    setQuote(DB[index]);
  };

  function setBackgroundImg(quote) {
    return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Roboto Condensed, sans-serif',
      height: '100vh',
      width: '100wh',
      backgroundImage: `url(${quote && quote.img})`,
      flexDirection: 'column',
      backgroundRepeat: 'noRepeat',
      backgroundPosition: 'left',
      backgroundSize: 'cover',
      backgroundColor: 'black',
      content: '',
      filter: 'blur(5px)',
    }
  }

  return (
    <>
      <div id="wraper" style={setBackgroundImg(quote)}/>
      <Quote randomQuote={quote} getRandomQuote={randomQuote} />
    </>
  );

};

export default App;