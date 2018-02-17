echo Enter interfce name
read inname
echo Enter port to analyze
read portname
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' tcptrack|grep "install ok installed")
if [ "" == "$PKG_OK" ]; then
  echo "No somelib. Setting up somelib."
  sudo apt-get install tcptrack
fi
sudo tcptrack -i $inname port $portname
