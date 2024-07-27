import React from "react";
import HeaderBalance from "./HeaderBalance";

type Props = {};

const Header = ({}: Props) => {
  return (
    <header className=" sticky top-2 bg-red flex flex-row justify-around py-4">
      <HeaderBalance />
    </header>
  );
};

export default Header;
