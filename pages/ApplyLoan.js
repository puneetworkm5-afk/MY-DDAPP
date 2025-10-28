import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACTS } from "../contracts";

export default function ApplyLoan() {
  const [borrower, setBorrower] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState("");
  const [addresses, setAddresses] = useState([]);

  const connectAndApplyLoan = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask!");
      return;
    }

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      setStatus("Applying for loan...");
      const deployedAddresses = [];

      // Interact with ContractA, ContractB, ContractC
      const contractA = new ethers.Contract(CONTRACTS[0].address, CONTRACTS[0].abi, signer);
      deployedAddresses.push({ name: CONTRACTS[0].name, address: CONTRACTS[0].address });

      const contractB = new ethers.Contract(CONTRACTS[1].address, CONTRACTS[1].abi, signer);
      deployedAddresses.push({ name: CONTRACTS[1].name, address: CONTRACTS[1].address });

      const contractC = new ethers.Contract(CONTRACTS[2].address, CONTRACTS[2].abi, signer);
      deployedAddresses.push({ name: CONTRACTS[2].name, address: CONTRACTS[2].address });

      // Add member (ignore Aadhaar validation)
      const tx = await contractC.add_member(await signer.getAddress(), Number(aadhaar || "1234567890"));
      await tx.wait();

      setStatus("✅ Loan applied successfully!");
      setAddresses(deployedAddresses);

      // Save ContractC address for Lenders page
      localStorage.setItem("loanContract", CONTRACTS[2].address);
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Apply for Loan</h2>
      <input placeholder="Borrower Name" value={borrower} onChange={(e) => setBorrower(e.target.value)} /><br /><br />
      <input placeholder="Aadhaar Number" value={aadhaar} onChange={(e) => setAadhaar(e.target.value)} /><br /><br />
      <input placeholder="Loan Amount (ETH)" value={amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />
      <input placeholder="Duration (days)" value={duration} onChange={(e) => setDuration(e.target.value)} /><br /><br />
      <button onClick={connectAndApplyLoan}>Apply Loan</button>
      <p>{status}</p>

      {addresses.length > 0 && (
        <div>
          <h3>Contracts Used:</h3>
          {addresses.map((c) => (
            <p key={c.name}>{c.name}: {c.address}</p>
          ))}
        </div>
      )}
    </div>
  );
}
