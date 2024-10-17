import React from "react";
import ValueCard from "../components/ValueCard";
import Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";

type Props = {
  accounts: BalanceAccount[];
};

function CardsSection({ accounts }: Props) {
  const client = new Ably.Realtime({
    key: process.env.NEXT_PUBLIC_ABLY_API_KEY,
    // clientId: "<client-ID>",
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName="account-balance">
        <div className="grid grid-cols-1 gap-2 laptop:grid-cols-3 laptop:gap-24 laptop:gap-y-12 py-4 laptop:py-12 px-4 laptop:px-24">
          {accounts.map((account, idx) => (
            <ValueCard key={idx} account={account} />
          ))}
        </div>
      </ChannelProvider>
    </AblyProvider>
  );
}

export default CardsSection;
