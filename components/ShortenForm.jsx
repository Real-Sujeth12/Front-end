import React, { useState } from 'react'
import { shorten } from '../services/api'
import { logEvent } from '../loggingMiddleware'

export default function ShortenForm({ onSuccess }) {
  const [longUrl, setLongUrl] = useState('')
  const [customCode, setCustomCode] = useState('')
  const [expiry, setExpiry] = useState(30)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setBusy(true); setError(null)
    logEvent('shorten_submit', { longUrl, customCode, expiry })
    try {
      const res = await shorten({
        longUrl,
        customCode: customCode || undefined,
        expiryMinutes: Number(expiry) || undefined
      })
      setResult(res)
      logEvent('shorten_success_client', res)
      if (onSuccess) onSuccess()
    } catch (err) {
      setError(err?.body?.error || 'Failed')
      logEvent('shorten_error_client', { err })
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <label>
        Long URL
        <input value={longUrl} onChange={e => setLongUrl(e.target.value)} required />
      </label>
      <label>
        Custom short code (optional)
        <input value={customCode} onChange={e => setCustomCode(e.target.value)} />
      </label>
      <label>
        Validity minutes (default 30)
        <input type="number" value={expiry} onChange={e => setExpiry(e.target.value)} min={1} />
      </label>
      <button type="submit" disabled={busy}>Create Short Link</button>

      {result && (
        <div>
          <b>Short URL: </b>
          <a href={result.shortUrl} target="_blank" rel="noreferrer">{result.shortUrl}</a>
        </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  )
}
