# [Allianz ICS]

## Getting Started

Clone the repo.  
Go to ```/src/config.js```  
Put your own ```APP_ID``` and ```APP_KEY```  
npm install  
npm start  
 
go port 30001


## Populate And Test Big Chain Database ##
If you cannot see any claims in ```/claims``` page then please follow these instructions:  
In this repo, there are two python scripts for bigchain.db 	
To use them first install bigchaindb-driver for python3  
```
pip3 install -U bigchaindb-driver
```
or if you want to use python2.x
```
pip install -U bigchaindb-driver
```
After that please go to [BCDB-Test](https://testnet.bigchaindb.com), and create an account for yourself.[1]  
Then navigate to Applications -> Your app's name, and find your Application ID and Application Keys.  
Copy and paste them into ```populate_bcdp.py``` and ```test_bcdp.py```  
Then first run ```populate_bcdp.py``` and populate your bigchaindb, and then run ```test_bcdp.py``` to retrieve results  

[1] -> You can use my ApplicationId and Application key, that I shared via slack-channel.


## Documentations ##

[BCDB Python Driver](https://github.com/bigchaindb/bigchaindb-driver)  
[BCDB JS Driver](https://github.com/bigchaindb/js-bigchaindb-driver)  
[PUG-JS](https://pugjs.org/api/getting-started.html)  
[HTML-to-PUG*](http://html2jade.org/)  

* Developers changed Jade's name to PUG recently, so thats why that link directs to html2jade.org. It is not a mistake.
