import { useEffect } from 'react'

export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
