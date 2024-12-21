import React from 'react'

const InstructionsCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Instructions</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2 text-lg">How to get your cookie:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            <li>Log in to Wellfound</li>
            <li>Open Developer Tools (F12 or Right-click &#8594; Inspect)</li>
            <li>Go to the Network tab</li>
            <li>Click on any GraphQL request</li>
            <li>In the Request Headers, find the "cookie" field</li>
            <li>Copy the entire cookie value and paste it in the form</li>
          </ol>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-lg">How to get the message thread URL:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
            <li>Go to Wellfound website</li>
            <li>Click on the message thread you want to send a message to</li>
            <li>Copy the URL from your browser's address bar</li>
            <li>It should look like: https://wellfound.com/jobs/messages/966476377</li>
            <li>Paste the URL in the "Message Thread URL" field in the form</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default InstructionsCard

