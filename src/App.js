import Main from "./components/Main";
import InitPage from "./components/InitPage";
import React, { useState } from "react";

function App() {
  const [isLogin, setisLogin] = useState(false);
  const setLoginval = () => {
    setisLogin(!isLogin);
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={setLoginval}>Login</button>
      </header>
      {isLogin ? <Main /> : <InitPage />}
    </div>
  );
}

export default App;
