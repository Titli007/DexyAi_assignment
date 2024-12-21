import { useState, FormEvent } from 'react'
import InstructionsCard from './InstructionsCard'

export default function App() {
  const [cookie, setCookie] = useState('')
  const [message, setMessage] = useState('')
  const [threadUrl, setThreadUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponse('')

    const threadId = threadUrl.split('/').pop() || '966476377'
    console.log(threadId)

    console.log(cookie, message, threadId)

    try {
      const res = await fetch('http://127.0.0.1:5000/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookie, message, threadId }),
      })

      const data = await res.json()
      console.log(data)
      setResponse(data.message || 'Message sent successfully!')
    } catch (error) {
      setResponse('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className='flex items-center justify-center gap-4 mb-6'>
            <img src='/wellfound.jpg' alt='wellfound logo' className="w-12 h-12 object-contain"/>
            <h1 className="text-3xl font-bold text-gray-800">Wellfound Assistant</h1>
          </div>
          
          <div className='flex justify-center items-center gap-5 my-8'>
            <img src="/dexy_logo.avif" alt='dexy_ai logo' className="w-8 h-8 object-contain"/>
            <span className='text-xl font-medium'>Message DexyAI Anytime</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cookie" className="block text-sm font-medium text-gray-700 mb-1">Cookie</label>
              <input
                type="text"
                id="cookie"
                value={cookie}
                onChange={(e) => setCookie(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Paste your cookie here"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your message"
                rows={4}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="threadUrl" className="block text-sm font-medium text-gray-700 mb-1">Message Thread URL (optional)</label>
              <div className="relative">
                <input
                  type="text"
                  id="threadUrl"
                  value={threadUrl}
                  onChange={(e) => setThreadUrl(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="DexyAI"
                />
                {/* <img src="/dexy_logo.avif" alt="Dexy AI" className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 object-contain" /> */}
              </div>
              <p className="mt-1 text-xs text-gray-500">
                URL format: https://wellfound.com/jobs/messages/966476377
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
          {response && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {response}
            </div>
          )}
        </div>
        <InstructionsCard />
      </div>
    </div>
  )
}

