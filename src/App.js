import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes
import ProductView from './ProductView';

const App = () => {
    return (
       <Router>
               <Routes> {/* Wrap Route components in Routes */}
                   <Route exact path="/" element={<ProductView />} /> 
                  
               </Routes>
      </Router>

    );
};

export default App;
