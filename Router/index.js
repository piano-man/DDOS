var fs = require('fs');
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getIpList","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ipAddress","type":"string"},{"name":"currenttime","type":"uint256"}],"name":"updateIpList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ipArray","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ipList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0xcde82faee63ed029ab2ebe87696d567b46749f24'

VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at(contractAddress);

web3.eth.defaultAccount=web3.eth.accounts[2];
var ip1 = Date.now()
let val = contractInstance.getListLength();
//console.log(val);
fs.closeSync(fs.openSync('block.txt', 'w'));
for(let i=0;i<val;i++)
{
  let val = contractInstance.getIpList(i,{from: web3.eth.accounts[2], gas:3000000}).toString();
  var str = val.split(',')[0];
  var time = Date.now();
  var ip_time = val.split(',')[1];
  if(((time-ip_time)/(1000*60))<30)
  {
      console.log(str," needs to be blocked")
      console.log("Writing to file\n")
      fs.appendFileSync('block.txt',str+'\n',function(err){
          console.log(err);
      })
  }
  
}

