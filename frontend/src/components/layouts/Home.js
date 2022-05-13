import React, { Fragment, useEffect } from "react";
import MetaData from "./MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/product/productActions";
import { Product } from "../product/Product";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { loading, products, error, productCount } = useSelector(
    (state) => state.products
  );

  //  ----------------------
  //JSX
  //  ----------------------
  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
