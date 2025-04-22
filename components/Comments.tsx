// components/Comments.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Comments() {
  const { asPath } = useRouter()

  useEffect(() => {
    const container = document.getElementById('utterances-container')
    if (!container) return

    container.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.setAttribute('repo', 'Olle-88/konsthall-demo')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-dark')

    container.appendChild(script)
  }, [asPath])

  return <div id="utterances-container" className="mt-6" />
}
