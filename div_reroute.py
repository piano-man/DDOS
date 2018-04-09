import subprocess
import time
def main():
   
    subprocess.run(["sudo iptables -F FORWARD"],shell=True)
    print("Enter interface name")
    i_name = input()
    print("enter incoming traffic port")
    iport = input()

    with open("list.txt") as f:
        content = f.readlines()
    content = [x.strip() for x in content]
    p = subprocess.Popen(["sudo netstat -n -p|grep SYN_REC | wc -l"], stdout=subprocess.PIPE,shell=True)
    (output,err) = p.communicate()
    counter = int(output)
    print(counter)
    max = len(content)
    
    cnt = 0
    
    while(counter>0):
        
        print("Enter destination port for",content[cnt])
        dport = input()
            

        p = subprocess.Popen(["sudo netstat -n -p|grep SYN_REC | wc -l"], stdout=subprocess.PIPE,shell=True)
        (output,err) = p.communicate()
        output = output.decode("utf-8")
        counter = int(output)
        print(output)

        subprocess.run(["sudo iptables -t nat -A PREROUTING -p tcp -i " + i_name + " --dport " + iport + " -j DNAT --to-destination " + content[cnt] + ":" +dport],shell=True)
        subprocess.run(["sudo iptables -A FORWARD -p tcp -d  " + content[cnt] + " --dport " + dport + " -m state --state NEW,ESTABLISHED,RELATED -j ACCEPT"],shell=True)
        subprocess.run(["sudo iptables -t nat -A POSTROUTING -j MASQUERADE"],shell=True)
        subprocess.run(["sudo iptables -A INPUT -i " + i_name + " -p tcp --destination-port " + dport + " -s " + content[cnt] + " -j DROP"],shell=True) 
                

         	
        time.sleep(5)
        
        if(cnt == max-1):
            cnt = 0
            
        else:
            cnt = cnt+1

    subprocess.run(["sudo iptables -F FORWARD"],shell=True)            

if __name__ == "__main__":
	main()