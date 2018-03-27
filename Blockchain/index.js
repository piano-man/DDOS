Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":false,"inputs":[{"name":"ipAddress","type":"string"},{"name":"currenttime","type":"uint256"}],"name":"updateIpList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"ipList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"ipaddr","type":"string"}],"name":"getIpList","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0xcc3373806ad09e822de3579f38b080dc461332a4'
//personal.unlockAccount(web3.eth.defaultAccount)
var attackers = require('./attackers.json')
console.log(attackers)
var attackers_list = []
var len = attackers.length 
for(var i=0;i<len;i++)
{
  attackers_list.push(attackers[i].ipAddress)
}
console.log(attackers_list)
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at(contractAddress);

web3.eth.defaultAccount=web3.eth.coinbase
var ip1 = Date.now()
for(let i = 0;i<attackers_list.length;i++)
{
contractInstance.updateIpList(attackers_list[i],ip1);
let val = contractInstance.getIpList(attackers_list[i]).toString();
console.log(val);
}




//console.log(contractInstance.ipList(0));
//console.log("output:")
//console.log(val)
