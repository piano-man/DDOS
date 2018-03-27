pragma solidity ^0.4.21;

contract Ip {
  
  mapping (string => uint256) private timestamp;
  
  string public ipList;

  function Ip() public {

  }

  function updateIpList(string ipAddress,uint256 currenttime) public {
    ipList = ipAddress;
      timestamp[ipList] = currenttime;
  }

function getIpList(string ipaddr) view public returns (string,uint256) {
    return (ipaddr,timestamp[ipaddr]);
  }
}