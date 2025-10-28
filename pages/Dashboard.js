import React, { useState } from "react";
import Node from "../blockchain/node";

const Dashboard = () => {
  const [nodes] = useState([
    new Node("Node A"),
    new Node("Node B"),
    new Node("Node C"),
  ]);
  const [status, setStatus] = useState("");

  const addTransaction = (fromIndex, toIndex, amount) => {
    const fromNode = nodes[fromIndex];
    const toNode = nodes[toIndex];
    fromNode.addTransaction(toNode.wallet.publicKey, amount);
    setStatus(`${fromNode.name} added tx → ${toNode.name}`);
  };

  const mineBlock = (nodeIndex) => {
    const node = nodes[nodeIndex];
    node.mine();
    setStatus(`${node.name} mined a block!`);
  };

  const syncNodes = (fromIndex) => {
    const source = nodes[fromIndex];
    nodes.forEach((n, i) => {
      if (i !== fromIndex) source.syncWith(n);
    });
    setStatus(`${source.name} propagated its chain to all nodes!`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Blockchain Network Simulation (Without P2P)</h2>
      <p>Status: {status}</p>

      <h3>Actions:</h3>
      <button onClick={() => addTransaction(0, 1, 25)}>
        Node A → Node B: 25
      </button>
      <button onClick={() => addTransaction(1, 2, 40)} style={{ marginLeft: "10px" }}>
        Node B → Node C: 40
      </button>

      <div style={{ marginTop: "20px" }}>
        {nodes.map((node, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{node.name}</h3>
            <p>Wallet: {node.wallet.publicKey.slice(0, 20)}...</p>
            <p>Balance: {node.getBalance()}</p>

            <button onClick={() => mineBlock(i)}>Mine Block</button>
            <button onClick={() => syncNodes(i)} style={{ marginLeft: "10px" }}>
              Propagate Chain
            </button>

            <h4>Blockchain:</h4>
            {node.blockchain.chain.map((block, bi) => (
              <div
                key={bi}
                style={{
                  border: "1px dashed gray",
                  marginTop: "5px",
                  padding: "5px",
                }}
              >
                <p>Block #{bi}</p>
                <p>Hash: {block.hash.slice(0, 20)}...</p>
                <p>Merkle Root: {block.merkleRoot || "N/A"}</p>
                <p>
                  Tx Count: {block.transactions.length}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
