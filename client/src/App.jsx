import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './scenes/layout';
import Test from './scenes/test';
import Learn from './scenes/learn';
import Reading from './scenes/reading';
import Contact from './scenes/contact';

import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Learn />} />
            <Route path="/test" element={<Test />} />
            <Route path="/reading" element={<Reading />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
