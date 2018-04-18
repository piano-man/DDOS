echo Enter port to analyze
read portname
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' conntrack|grep "install ok installed")
if [ "" == "$PKG_OK" ]; then
  echo "No somelib. Setting up somelib."
  sudo apt-get install conntrack
fi
sudo conntrack -L -p tcp --dport $portname

