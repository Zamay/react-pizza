import { Route, Routes } from "react-router-dom";

import "./scss/app.scss";

import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
