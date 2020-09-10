import React, { useState } from "react";
import Dropdown from "./components/Dropdown";
import CardList from "./components/CardList";
import "./App.css";

function App() {
  const [layoutType, setLayoutType] = useState(null);

  return (
    <div>
      <Dropdown setLayoutType={setLayoutType} />
      <CardList layoutType={layoutType} />
    </div>
  );
}

export default App;
