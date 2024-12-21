from flask import Flask, request, jsonify
import requests
from flask_cors import CORS  # Import CORS

app = Flask(__name__)

CORS(app)


@app.route('/send-message', methods=['POST'])
def send_message():
    try:
        # Get message body and cookies from request
        data = request.json
        print(data)
        if not data or 'message' not in data or 'cookie' not in data:
            return jsonify({'error': 'Required fields missing. Please provide message and cookies'}), 400
        
        message = data['message']
        cookie = data['cookie']
        thread_id=data['threadId']
        print("=======================================================================",thread_id)
        
        url = 'https://wellfound.com/graphql'
        
        headers = {
            'accept': '*/*',
            'accept-encoding': 'gzip, deflate, br, zstd',
            'accept-language': 'en-US,en;q=0.9',
            'apollographql-client-name': 'talent-web',
            'content-type': 'application/json',
            'cookie': cookie,
            'origin': 'https://wellfound.com',
            'referer': 'https://wellfound.com/jobs/messages/962575574',
            'sec-ch-device-memory': '8',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-arch': '"x86"',
            'sec-ch-ua-full-version-list': '"Microsoft Edge";v="131.0.2903.112", "Chromium";v="131.0.6778.205", "Not_A Brand";v="24.0.0.0"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-model': '""',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'same-origin',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'x-angellist-dd-client-referrer-resource': '/jobs/messages/:id?',
            'x-apollo-operation-name': 'CandidateSendMessage',
            'x-apollo-signature': '1734800935-oYRYJVLPD06nYWyZbbUPVwY5yfn4%2BlrURyQ9wNINMDI%3D',
            'x-requested-with': 'XMLHttpRequest'
        }

        payload = {
            "operationName": "CandidateSendMessage",
            "extensions": {
                "operationId": "tfe/1ee8d94da36a0811d05340d91a4427175dbb8abfafe2dab802483d375fdcfb7d"
            },
            "variables": {
                "input": {
                    "id": thread_id,
                    "type": "JOBPAIRING",
                    "body": message
                }
            }
        }

        response = requests.post(url, headers=headers, json=payload)
        print(response.status_code)
        print(response.text) 
        
        return jsonify({
            'status': response.status_code,
            'response': response.text if response.status_code == 200 else response.text
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)