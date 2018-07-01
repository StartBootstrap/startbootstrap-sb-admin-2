#!/usr/bin/python3
from bigchaindb_driver import BigchainDB

tokens = {}
tokens['app_id'] = 'YOUR_APP_ID'
tokens['app_key'] = 'YOUR_APP_KEY'
bdb = BigchainDB('https://test.bigchaindb.com', headers=tokens)
print("Results --------");
claims_list = bdb.assets.get(search='altest');
for claim in claims_list:
	print(claim);
