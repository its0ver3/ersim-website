import { useState, useEffect } from 'react'

export function useGeolocation(fallback) {
  const [location, setLocation] = useState(fallback)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function detect() {
      try {
        const ipRes = await fetch('https://get.geojs.io/v1/ip/geo.json', { signal: controller.signal })
        if (!ipRes.ok) throw new Error('bad response')
        const ipData = await ipRes.json()

        const city = typeof ipData.city === 'string' ? ipData.city.trim() : ''
        const lat = parseFloat(ipData.latitude)
        const lng = parseFloat(ipData.longitude)
        if (city === '' || !Number.isFinite(lat) || !Number.isFinite(lng)) {
          throw new Error('invalid data')
        }

        const cityUpper = city.toUpperCase()
        setLocation({ lat, lng, city: cityUpper, area: cityUpper })

        // Best-effort reverse-geocode for a neighborhood-level label.
        try {
          const geoRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
            { signal: controller.signal }
          )
          if (!geoRes.ok) return
          const geoData = await geoRes.json()
          const locality =
            typeof geoData.locality === 'string' ? geoData.locality.trim() : ''
          if (locality !== '') {
            setLocation({ lat, lng, city: cityUpper, area: locality.toUpperCase() })
          }
        } catch (geoErr) {
          if (geoErr.name === 'AbortError') return
        }
      } catch (err) {
        if (err.name !== 'AbortError') setError(err)
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    detect()
    return () => controller.abort()
  }, [])

  return { location, isLoading, error }
}
