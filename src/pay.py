import requests
import base64
from mobile_money.momo import Collection
from mobile_money import generate_uuid  
 
# request to pay with MTN MOMO
# url = "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay"
api_key = "7defad77b2634e2a85c920d67d938def"

# payload = {
#     "amount": "200.0",
#     "currency": "XAF",
#     "externalId": "ash101",
#     "payer": {
#         "partyIdType": "MSISDN",
#         "partyId": "675416098"
#     },
#     "payerMessage": "Validate your transaction",
#     "payeeNote": "Payment for product"
# }

# response = requests.post(
#     url, 
#     headers = {
#     # 'Authorization': f'Bearer {api_key}',
#     'Authorization': '7defad77b2634e2a85c920d67d938def', 
#     # 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSMjU2In0.eyJjbGllbnRJZCI6IjBjYWMwNDM1LTkzMWEtNGUwMC05YjA1LTk0NjMwYTg5NWFlNiIsImV4cGlyZXMiOiIyMDI0LTAxLTE2VDEyOjUwOjEzLjUxMyIsInNlc3Npb25JZCI6IjlmZDExZWM4LWQ4NDgtNDMwNy1iZGZhLWVmNzFiOTM5ZWM2MyJ9.BB3ywzfrwg2L0KfEKtH3IAtWcOcvKAWfCsebSNJRurIB0oscnCjF11hQHVn-YqbE0aukBF0jVSM8S-SasiYU55Q-CgOAr11Zo6EzUduky2qyAtiUTiL4d8ObHTp-tJ36PNDr9iHtJvprq_WblnVq5PlRxkYdiWzxWr9CM6EXkamuVJIZhvB-FDt9L2ed3O1dzTOycKjD1oxcZxHI9Apgv2D-5dzT_StGb5izebHt9NQ0YJhPyIw_MMKsQ-TLB8yz50XTXrxf5HtIOkcH3G28JOL1WPIWxnwsFw2V7NGuGVRDc6GnsvORQmlmyvNonGP5neVQk49sWrRMmkrmdqFypg',
#     'Ocp-Apim-Subscription-Key': '04300fb18a9141ec8030d0ba879dd75d',
#     'X-Reference-Id': '182f03bc-d901-4af4-8b8d-2bb397377c5b', 
#     'X-Target-Environment': 'sandbox'
#     }, 
#     data=payload
#     )

# print(response)

# from campay.sdk import Client as CamPayClient

# campay = CamPayClient({
#     "app_username": "ashprince",
#     "app_password": "ashprince101",
#     "environment": "PROD"
# })

# collect = campay.collect({
#     "amount": "200.0",
#     "currency": "XAF",
#     "from": "237675416098",
#     "description": "Validate your transaction",
#     "external_reference": "Payment for product"
# })

# print(collect)

# collection = Collection(
#     subscription_key="04300fb18a9141ec8030d0ba879dd75d",
#     api_user="182f03bc-d901-4af4-8b8d-2bb397377c5b",
#     api_key="7defad77b2634e2a85c920d67d938def",
#     callback_url="https://webhook.site/1f1bf16f-3bca-4f5e-b780-6f288e6c1483",
#     production=False,
# )

# transaction_reference = generate_uuid()

# response = collection.collect(
#     amount="100",
#     phone_number="237675416098",
#     currency="EUR",
#     external_id="ash101",
#     reference_id=transaction_reference,
#     payee_note="test",
#     payer_message="Validate purchase",
# )

# print(response)

api_user = "53c052c8-481f-48c3-8f50-ec34534fde47"

credentials = f"{api_user} {api_key}"
base64_credentials = base64.b64encode(credentials.encode()).decode()
print(base64_credentials)