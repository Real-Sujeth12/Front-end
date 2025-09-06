// src/services/api.js
import { logEvent } from '../loggingMiddleware'

let mockLinks = []

export async function shorten({ longUrl, customCode, expiryMinutes }) {
  const code = customCode || Math.random().toString(36).substring(2, 8)
  const shortUrl = `http://localhost:5173/r/${code}`
  const newLink = { code, longUrl, shortUrl, clicks: 0 }
  mockLinks.push(newLink)
  logEvent('shorten_success_client', newLink)
  return newLink
}

export async function listLinks() {
  return mockLinks
}

export async function analytics(code) {
  const link = mockLinks.find(l => l.code === code)
  return link ? { ...link, clicks: link.clicks } : null
}
