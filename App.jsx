import React, { useEffect, useState } from 'react'
import ShortenForm from './components/ShortenForm'
import LinkList from './components/LinkList'
import { listLinks } from './services/api'
import { logEvent } from './loggingMiddleware'

export default function App() {
  const [links, setLinks] = useState([])
  const [loading, setLoading] = useState(true)

  async function load() {
    try {
      setLoading(true)
      const data = await listLinks()
      setLinks(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    logEvent('app_load', {})
    load()
  }, [])

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>URL Shortener</h1>
      <ShortenForm onSuccess={load} />
      <hr />
      <h2>Your Links</h2>
      {loading ? <div>Loading...</div> : <LinkList links={links} />}
    </div>
  )
}
