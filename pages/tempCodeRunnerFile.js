import React, { useState } from "react";
import Blockchain from "../blockchain/blockchain";
import Transaction from "../blockchain/transaction";
import Wallet from "../blockchain/wallet";

const Dashboard = () => {
  const [chain] = useState(new Blockchain());
  const [wallet] = useState(new Wallet());
  const [status, setStatus] = useState("");

  const addTransaction = () => {
    const tx = new Transaction(wallet.publicKey, "receiver-address", 50);
    wallet.signTransaction(tx);
    chain.addTransaction(tx);
    setStatus("Transaction added!");
  };

  const minePending = () => {
    chain.minePendingTransactions(wallet.publicKey);
    setStatus(`Block mined! Your balance: ${chain.getBalanceOfAddress(wallet.publicKey)}`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Local Blockchain Dashboard</h2>
      <p>Status: {status}</p>
      <p>Your wallet address: {wallet.publicKey}</p>
      <button onClick={addTransaction}>Add Transaction</button>
      <button onClick={minePending} style={{ marginLeft: "10px" }}>Mine Pending Transactions</button>

      <h3>Blockchain:</h3>
      {chain.chain.map((block, index) => (
        <div key={index} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <p><strong>Block #{index}</strong></p>
          <p>Previous Hash: {block.previousHash}</p>
          <p>Hash: {block.hash}</p>
          <p>Nonce: {block.nonce}</p>
          <p>Transactions:</p>
          <ul>
            {block.transactions.map((tx, i) => (
              <li key={i}>{tx.fromAddress} → {tx.toAddress}: {tx.amount}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
