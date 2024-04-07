import React from 'react';
import { setState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
// import Filters from './Filters';

import Album from './ads1'
import Filters from './Filters';

function FirstPage(props) {
  useEffect(() => {
    
  }, []);
  const greeting = 'Hello Function Component!';
 
  return <div>
    <center>
    <Filters/>
    </center>
    
    <Album />
  </div>;
}

export default FirstPage;