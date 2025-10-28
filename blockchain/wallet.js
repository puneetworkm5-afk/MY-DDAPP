// wallet.js
import SHA256 from "crypto-js/sha256";

export default class Wallet {
  constructor() {
    // simple pseudo wallet public key
    this.publicKey = SHA256(Date.now() + Math.random()).toString();
  }

  signTransaction(transaction) {
    // in browser demo, we won’t actually sign
    transaction.signature = "signed"; 
  }
}
