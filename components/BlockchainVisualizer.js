import React from "react";

export default function BlockchainVisualizer({ chain }) {
  return (
    <div>
      <h2>Blockchain</h2>
      {chain.chain.map((block, i) => (
        <div key={i} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
          <p><strong>Block {i}</strong></p>
          <p>Hash: {block.hash}</p>
          <p>Previous Hash: {block.previousHash}</p>
          <p>Transactions:</p>
          {block.transactions.map((tx, j) => (
            <div key={j} style={{ paddingLeft: "10px" }}>
              <p>From: {tx.fromAddress}</p>
              <p>To: {tx.toAddress}</p>
              <p>Amount: {tx.amount}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
