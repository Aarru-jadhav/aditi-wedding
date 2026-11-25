import React from "react";
import Page1 from "./Section/Page1.jsx";
import TheCouple from "./Section/TheCouple.jsx";
import StackCards from "./Section/StackCards.jsx";
import Venues from "./Section/Venues.jsx";
import Countdown from "./Section/Countdown.jsx";
// import Closing from "./Section/Closing.jsx";

const App = () => {
  return (
    <>
      <Page1 />
      <TheCouple />
      <StackCards />
      <Venues />
      <Countdown />
      {/* <Closing /> */}
    </>
  );
};

export default App;