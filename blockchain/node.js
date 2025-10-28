import Blockchain from "./blockchain";
import Wallet from "./wallet";
import Transaction from "./transaction";

export default class Node {
  constructor(name) {
    this.name = name;
    this.blockchain = new Blockchain();
    this.wallet = new Wallet();
  }

  addTransaction(to, amount) {
    const tx = new Transaction(this.wallet.publicKey, to, amount);
    this.wallet.signTransaction(tx);
    this.blockchain.addTransaction(tx);
  }

  mine() {
    this.blockchain.minePendingTransactions(this.wallet.publicKey);
  }

  getBalance() {
    return this.blockchain.getBalanceOfAddress(this.wallet.publicKey);
  }

  // 🔥 Propagate block to another node
  syncWith(node) {
    if (this.blockchain.chain.length > node.blockchain.chain.length) {
      node.blockchain.chain = JSON.parse(JSON.stringify(this.blockchain.chain));
      node.blockchain.pendingTransactions = [];
    }
  }
}
