#!/usr/bin/python3
from bigchaindb_driver import BigchainDB
from bigchaindb_driver.crypto import generate_keypair

tokens = {}
tokens['app_id'] = 'YOUR_APP_ID'
tokens['app_key'] = 'YOUR_APP_KEY'
bdb = BigchainDB('https://test.bigchaindb.com', headers=tokens)
alice = generate_keypair()

claim_1 = {'data': {'claim_id': '1', 'claim_date':'21.06.2018', 'ooe': 'altest', 'sum_expense': '1000'},}
claim_2 = {'data': {'claim_id': '2', 'claim_date':'22.06.2018', 'ooe': 'altest', 'sum_expense': '2000'},}
claim_3 = {'data': {'claim_id': '3', 'claim_date':'23.06.2018', 'ooe': 'altest', 'sum_expense': '2500'},}
claim_4 = {'data': {'claim_id': '4', 'claim_date':'24.06.2018', 'ooe': 'altest', 'sum_expense': '3000'},}
claim_5 = {'data': {'claim_id': '5', 'claim_date':'25.06.2018', 'ooe': 'altest', 'sum_expense': '5000'},}
#Until implementing login-logout functionality, It is okay to keep all ooe's as altest

claims = [claim_1, claim_2, claim_3, claim_4, claim_5]

for claim in claims:
	prepared_creation_tx = bdb.transactions.prepare(
		operation='CREATE',
		signers=alice.public_key,
		asset=claim
	)
	fulfilled_creation_tx = bdb.transactions.fulfill(prepared_creation_tx, private_keys=alice.private_key)
	print("Inserting Claim {}".format(claim));
	bdb.transactions.send_commit(fulfilled_creation_tx)
