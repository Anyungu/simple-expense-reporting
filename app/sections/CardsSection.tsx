import React from "react";
import ValueCard from "../components/ValueCard";
import Ably from "ably";
import { AblyProvider, ChannelProvider, useChannel } from "ably/react";

type Props = {
  accounts: Account[];
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
          <ValueCard
            account={{
              id: 1000,
              name: "MARGIN",
              balance:
                (accounts.find((account) => account.name === "REVENUE")
                  ?.balance ?? 0) -
                (accounts.find((account) => account.name === "EXPENDITURE")
                  ?.balance ?? 0),
            }}
          />
        </div>
      </ChannelProvider>
    </AblyProvider>
  );
}

export default CardsSection;
