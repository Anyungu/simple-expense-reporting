import React from "react";
import Header from "./sections/Header";
import Body from "./sections/Body";

type Props = {
  transactions: Transaction[];
  accounts: Account[];
};

const MainPage = ({ transactions, accounts }: Props) => {
  return (
    <div>
      {/* top sticky heaader */}
      <Header />
      {/* rest body section */}
      <Body accounts={accounts} transactions={transactions} />
    </div>
  );
};

export default MainPage;
