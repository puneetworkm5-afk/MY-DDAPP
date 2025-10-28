import ContractAABI from "./abi/ContractA.json";
import ContractBABI from "./abi/ContractB.json";
import ContractCABI from "./abi/ContractC.json";

export const CONTRACTS = [
  {
    name: "ContractA",
    address: "0xD721ec94D7418EBF9ef7ECbdcf5EE22A1fA521FF", // Contract A deployed address
    abi: ContractAABI,
  },
  {
    name: "ContractB",
    address: "0x0C2C5C04cde32854f4618CE9Db01e8cb5De7Ef7A", // Contract B deployed address
    abi: ContractBABI,
  },
  {
    name: "ContractC",
    address: "0xc539C452E92876a5F260db967aC3Cf2E1F857f98", // Contract C deployed address
    abi: ContractCABI,
  },
];
