import React from 'react';
import './App.css';
import './style.css';
import Header from './components/Header';
import Footer from './components/Footer';
import TypeTest from './components/type_test/typing_test_page';


function App() {
  return (
    <div className="App">
      <Header />
      <div className="container">
        <TypeTest />
      </div>
      <Footer />
    </div>
  );
}

export default App;
