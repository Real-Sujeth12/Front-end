import React from 'react'
import { logEvent } from '../loggingMiddleware'

export default function LinkList({ links = [] }) {
  if (!links.length) return <div>No links yet.</div>

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {links.map(link => (
        <div key={link.code} style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6 }}>
          <div>
            <b>Short URL: </b>
            <a href={link.shortUrl} target="_blank" rel="noreferrer"
               onClick={() => logEvent('click_short_link', { code: link.code })}>
              {link.shortUrl}
            </a>
          </div>
          <div><b>Original:</b> {link.longUrl}</div>
          <div><b>Clicks:</b> {link.clicks || 0}</div>
        </div>
      ))}
    </div>
  )
}
