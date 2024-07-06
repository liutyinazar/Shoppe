import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Shop from "./Components/Shop/Shop";
import JewelryDetail from "./Components/Shop/JewelryDetail/JewelryDetail"

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/jewelry/:id" element={<JewelryDetail/>} />
        </Routes>
    </Router>
  );
};

export default App;
