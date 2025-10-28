import React, { useState } from "react";
import { ethers } from "ethers";
import ContractC from "../abi/ContractC.json";

const Lenders = () => {
  const [status, setStatus] = useState("Checking for pending loan...");
  const [pending, setPending] = useState(true);
  const [connected, setConnected] = useState(false);

  const CONTRACT_ADDRESS = localStorage.getItem("loanContract");

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask!");
      return;
    }
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      setConnected(true);
      setStatus("MetaMask connected. You can approve the loan.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to connect MetaMask: " + err.message);
    }
  };

  const approveLoan = async () => {
    if (!connected) {
      setStatus("⚠️ Connect MetaMask first.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractC, signer);

      setStatus("Attempting to approve loan...");
      const tx = await contract.disburse_loan({ value: 0 });
      await tx.wait();

      setStatus("✅ Loan approved (transaction succeeded)!");
      setPending(false);
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Transaction failed (contract conditions not met or insufficient funds).");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lender Dashboard</h2>
      <p>{status}</p>

      {pending && !connected && <button onClick={connectMetaMask}>Connect MetaMask</button>}
      {pending && connected && <button onClick={approveLoan}>Approve Loan</button>}
    </div>
  );
};

export default Lenders;
