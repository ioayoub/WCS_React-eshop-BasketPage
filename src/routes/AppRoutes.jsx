import { Route, Routes } from "react-router-dom"

import Home from "../pages/Home.jsx"
import Basket from "../pages/Basket"
import Products from "../pages/Products.jsx"
import NoMatch from "../pages/NoMatch.jsx"
import Product from "../pages/Product.jsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/basket" element={<Basket />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/no-match" element={<NoMatch />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  )
}

export default AppRoutes
