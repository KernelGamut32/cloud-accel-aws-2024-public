import json
import os
import boto3
import base64

def lambda_handler(event, context):
    email_contents = """
    <html>
    <body>
    <p><a href="{url_base}/{token}/success">PASS</a></p>
    <p><a href="{url_base}/{token}/fail">FAIL</a></p>
    </body>
    </html>
"""
    callback_base = os.environ['URL']
    token = base64.b64encode(bytes(event["token"], "utf-8")).decode("utf-8")

    formatted_email = email_contents.format(url_base=callback_base, token=token)
    ses_client = boto3.client('ses')
    ses_client.send_email(
        Source=event["sender"],
        Destination={
            'ToAddresses': [event["team_alias"]]
        },
        Message={
            'Subject': {
                'Data': 'PLEASE REVIEW',
                'Charset': 'UTF-8'
            },
            'Body': {
                'Text': {
                    'Data': formatted_email,
                    'Charset': 'UTF-8'
                },
                'Html': {
                    'Data': formatted_email,
                    'Charset': 'UTF-8'
                }
            }
        },
        ReplyToAddresses=[
            'no-reply+delivery@example.com',
        ]
    )
    return {}
