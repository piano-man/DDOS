echo Enter interface name
read iname
echo '1' | sudo tee /proc/sys/net/ipv4/conf/$iname/forwarding
echo enter incoming traffic port
read iport
echo enter destination ip
read dip
echo enter destination port
read dport
sudo iptables -t nat -A PREROUTING -p tcp -i $iname --dport $iport -j DNAT --to-destination $dip:$dport
sudo iptables -A FORWARD -p tcp -d $dip --dport $dport -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT
sudo iptables -t nat -A POSTROUTING -j MASQUERADE
sudo iptables -A INPUT -i $iname -p tcp --destination-port $dport -s $dip -j DROP
