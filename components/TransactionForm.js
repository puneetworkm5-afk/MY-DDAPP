import React, { useState } from "react";

export default function TransactionForm({ wallet, addTransaction }) {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(toAddress, parseInt(amount));
    setToAddress("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Send Transaction</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Send</button>
    </form>
  );
}
