var fs = require('fs');
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[{"name":"num","type":"uint256"}],"name":"getIpList","outputs":[{"name":"","type":"string"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"ipAddress","type":"string"},{"name":"currenttime","type":"uint256"}],"name":"updateIpList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"ipArray","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ipList","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getListLength","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]')

var contractAddress = '0xcde82faee63ed029ab2ebe87696d567b46749f24'
//personal.unlockAccount(web3.eth.defaultAccount)
var attackers = require('./logs.json')
//console.log(attackers)
var attackers_list = []
var len = attackers.length 
attackers_list = attackers.ipAddress;
//console.log(attackers_list)
VotingContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = VotingContract.at(contractAddress);

web3.eth.defaultAccount=web3.eth.accounts[2];
var ip1 = Date.now()
fs.closeSync(fs.openSync('block.txt', 'w'));
for(let i = 0;i<attackers_list.length;i++)
{
console.log("Adding BlackListed Ip to blockchain :")
console.log(attackers_list[i])
console.log('\n')
contractInstance.updateIpList(attackers_list[i],ip1,{from: web3.eth.accounts[2], gas:3000000});
//let val = contractInstance.getIpList(attackers_list[i]).toString();
//console.log(val);
}

let val = contractInstance.getListLength();
console.log(val);
for(let i=0;i<val;i++)
{
  let val = contractInstance.getIpList(i,{from: web3.eth.accounts[2], gas:3000000}).toString();
  var str = val.split(',')[0];
  console.log('ip:'+str)
  var time = Date.now();
  console.log('time:'+time);
  var ip_time = val.split(',')[1];
  console.log('ip time:'+ip_time)
  if(((time-ip_time)/(1000*60))<30)
  {
      console.log("Needs to be blocked\n")
      console.log("Writing to file\n")
      fs.appendFileSync('block.txt',str+'\n',function(err){
          console.log(err);
      })
  }
  
}



//console.log(contractInstance.ipList(0));
//console.log("output:")
//console.log(val)
