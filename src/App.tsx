import './App.css';
import MainProvider from "./main-provider/MainProvider";
import React from 'react';
import Auth from "./components/screen/Auth/Auth";

function App() {
  return (
    <div className="App">
      <MainProvider>
          <Auth />
      </MainProvider>
    </div>
  );
}

export default App;
