import subprocess
import json
dict = {}
dict.setdefault("ipAddress",[])
with open('test.txt') as f, open('logs.json','w') as fp,open('reconstruct.txt','w') as fp1:
    for line in f:
        for i,ch in enumerate(line):
            if ch=='T' and line[i:i+3]=="TTL":        
                temp = []
                temp=line.split(" ")
                if(len(temp)>=5):
                    ip = temp[9].split("=")[1]
                    port = temp[17].split("=")[1]
                    print(ip,port)
                    p = subprocess.Popen(["nmap -p"+port+" "+ip], stdout=subprocess.PIPE,shell=True)
                    (output,err) = p.communicate()
                    if b'closed' in output:
                        dict['ipAddress'].append(ip)
                    if b'down' in output:
                        dict['ipAddress'].append(ip)
                    if b'open' in output:
                        fp1.write(line)
                    if b'up' in output:
                        fp1.write(line)

    json.dump(dict,fp)           