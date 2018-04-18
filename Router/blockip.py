import subprocess
import time

def main():
    with open('block.txt') as f:
        for line in f:
            subprocess.run(["sudo iptables -A INPUT -s "+line[:-1]+" -j DROP"],shell=True)

if __name__ == '__main__':
    main()