import React, { Fragment } from "react";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Fragment>
      <footer className="py-1">
        <p className="text-center mt-1">
          Shopping Cart - 2022-{year}, All Rights Reserved
        </p>
      </footer>
    </Fragment>
  );
};
