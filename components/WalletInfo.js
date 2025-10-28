import React from "react";

export default function WalletInfo({ wallet, balance }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>Your Wallet</h2>
      <p>Address: {wallet.publicKey}</p>
      <p>Balance: {balance}</p>
    </div>
  );
}
