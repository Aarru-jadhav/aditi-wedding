import React, { useState } from "react";
import Page1 from "./Section/Page1.jsx";
import TheCouple from "./Section/TheCouple.jsx";
import StackCards from "./Section/StackCards.jsx";
import Venues from "./Section/Venues.jsx";
import Countdown from "./Section/Countdown.jsx";
import Closing from "./Section/Closing.jsx";

const App = () => {
  const [page1Opened, setPage1Opened] = useState(false);

  return (
    <div className="w-full min-h-screen bg-[#04091a]">
      <Page1 onRevealComplete={() => setPage1Opened(true)} />

      {page1Opened && (
        <div className="w-full transition-opacity duration-700 opacity-100">
          <TheCouple />
          <StackCards />
          <Venues />
          <Countdown />
          <Closing />
        </div>
      )}
    </div>
  );
};

export default App;