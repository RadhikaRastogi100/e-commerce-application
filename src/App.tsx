import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import ProductListPage from "./productPages/ProductListPage";
import ProductDetailsPage from "./productPages/ProductDetailPage";
import Navbar from "./component/Navbar/Navbar";

const App: React.FC = () => (
  <Router>
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
