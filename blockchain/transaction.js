// transaction.js
import SHA256 from "crypto-js/sha256";

export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  isValid() {
    // For simplicity in browser demo, always return true
    return true;
  }
}
