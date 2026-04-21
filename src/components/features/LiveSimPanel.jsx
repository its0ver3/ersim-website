import { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { PhoneIncoming } from 'lucide-react'
import { useGeolocation } from '../../hooks/useGeolocation'

const MAP_TINT = 'sepia(0.35) hue-rotate(70deg) brightness(0.8) saturate(0.85) contrast(1.05)'
const INITIAL_ZOOM = 11
const ZOOM_LOW = 11
const ZOOM_HIGH = 11.3
const ZOOM_CYCLE_MS = 15000
const AREA_RADIUS_M = 450
const BOOT_TEXT = '> INITIALIZING...'
const BOOT_TYPE_MS = 40
const BOOT_HOLD_MS = 200

const mapStyle = {
  version: 8,
  sources: {
    carto: {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
      ],
      tileSize: 256,
      attribution: '',
    },
  },
  layers: [{ id: 'carto', type: 'raster', source: 'carto' }],
}

// Approximate a geographic circle as a GeoJSON polygon so it scales with zoom.
function circlePolygon(lng, lat, radiusMeters = AREA_RADIUS_M, points = 64) {
  const earthRadius = 6371000
  const d = radiusMeters / earthRadius
  const latRad = (lat * Math.PI) / 180
  const lngRad = (lng * Math.PI) / 180
  const coords = []
  for (let i = 0; i <= points; i++) {
    const bearing = (i / points) * 2 * Math.PI
    const newLat = Math.asin(
      Math.sin(latRad) * Math.cos(d) +
      Math.cos(latRad) * Math.sin(d) * Math.cos(bearing)
    )
    const newLng =
      lngRad +
      Math.atan2(
        Math.sin(bearing) * Math.sin(d) * Math.cos(latRad),
        Math.cos(d) - Math.sin(latRad) * Math.sin(newLat)
      )
    coords.push([(newLng * 180) / Math.PI, (newLat * 180) / Math.PI])
  }
  return {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [coords] },
  }
}

export default function LiveSimPanel() {
  const { location } = useGeolocation({
    lat: 43.6532,
    lng: -79.3832,
    city: 'TORONTO',
    area: 'TORONTO',
  })

  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const breathingRafRef = useRef(null)
  const zoomTimerRef = useRef(null)
  const locationRef = useRef(location)
  locationRef.current = location

  const [bootText, setBootText] = useState('')
  const [booted, setBooted] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Boot typing sequence
  useEffect(() => {
    let i = 0
    const iv = setInterval(() => {
      i++
      setBootText(BOOT_TEXT.slice(0, i))
      if (i >= BOOT_TEXT.length) {
        clearInterval(iv)
        setTimeout(() => setBooted(true), BOOT_HOLD_MS)
      }
    }, BOOT_TYPE_MS)
    return () => clearInterval(iv)
  }, [])

  // Init map + area layer + breathing + zoom oscillation
  useEffect(() => {
    if (!mapContainerRef.current) return

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [location.lng, location.lat],
      zoom: INITIAL_ZOOM,
      interactive: false,
      attributionControl: false,
    })
    mapRef.current = map

    map.on('load', () => {
      if (!mapRef.current) return
      const loc = locationRef.current

      map.addSource('call-area', {
        type: 'geojson',
        data: circlePolygon(loc.lng, loc.lat),
      })
      map.addLayer({
        id: 'call-area-fill',
        type: 'fill',
        source: 'call-area',
        paint: { 'fill-color': '#C9A24B', 'fill-opacity': 0.25 },
      })
      map.addLayer({
        id: 'call-area-line',
        type: 'line',
        source: 'call-area',
        paint: {
          'line-color': '#C9A24B',
          'line-width': 2,
          'line-opacity': 0.85,
        },
      })

      // Breathing outline — oscillate line width/opacity and fill opacity.
      const start = performance.now()
      const tick = (now) => {
        if (!mapRef.current) return
        const t = (now - start) / 1000
        const phase = (Math.sin(t * 1.2) + 1) / 2
        if (map.getLayer('call-area-line')) {
          map.setPaintProperty('call-area-line', 'line-opacity', 0.45 + phase * 0.45)
          map.setPaintProperty('call-area-line', 'line-width', 1.5 + phase * 1.5)
        }
        if (map.getLayer('call-area-fill')) {
          map.setPaintProperty('call-area-fill', 'fill-opacity', 0.18 + phase * 0.14)
        }
        breathingRafRef.current = requestAnimationFrame(tick)
      }
      breathingRafRef.current = requestAnimationFrame(tick)

      // Zoom oscillation — easeTo between low/high, linear, cycling.
      const oscillate = (toHigh) => {
        if (!mapRef.current) return
        map.easeTo({
          zoom: toHigh ? ZOOM_HIGH : ZOOM_LOW,
          duration: ZOOM_CYCLE_MS,
          easing: (t) => t,
        })
        zoomTimerRef.current = setTimeout(() => oscillate(!toHigh), ZOOM_CYCLE_MS)
      }
      oscillate(true)

      setMapLoaded(true)
    })

    return () => {
      if (breathingRafRef.current) cancelAnimationFrame(breathingRafRef.current)
      if (zoomTimerRef.current) clearTimeout(zoomTimerRef.current)
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to location changes after the map has loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return
    const map = mapRef.current
    const src = map.getSource('call-area')
    if (src) src.setData(circlePolygon(location.lng, location.lat))
    map.easeTo({
      center: [location.lng, location.lat],
      duration: 1500,
    })
  }, [location.lat, location.lng, mapLoaded])

  return (
    <div className="relative aspect-[4/3] w-full border-2 border-cream/20 bg-charcoal shadow-[12px_12px_0px_0px_rgba(201,162,75,0.25)] rounded-3xl overflow-hidden">
      {/* Layer 1: Map (sepia-moss wash via CSS filter) */}
      <div className="absolute inset-0" style={{ filter: MAP_TINT }}>
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>

      {/* Layer 2: Tint overlays */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-moss/10 mix-blend-multiply" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />

      {/* Layer 3: HUD overlay */}
      <div
        className={`absolute inset-0 pointer-events-none z-20 transition-opacity duration-500 ${
          booted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute top-0 left-0 right-0 bg-charcoal text-cream p-2 flex justify-between items-center font-mono text-[10px] font-bold uppercase tracking-widest border-b-2 border-[#C9A24B]">
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 rounded-full bg-[#C9A24B] animate-pulse" />
            <span>ERSIM // LIVE_TRAINING</span>
          </div>
          <div>
            <span>SCENARIO 017 · P1</span>
          </div>
        </div>

        <div className="absolute top-10 left-4 w-4 h-4 border-t-[3px] border-l-[3px] border-cream/40" />
        <div className="absolute top-10 right-4 w-4 h-4 border-t-[3px] border-r-[3px] border-cream/40" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-[3px] border-l-[3px] border-cream/40" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-[3px] border-r-[3px] border-cream/40" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(242,240,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(242,240,233,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Layer 4: Active call bar */}
      <div
        className={`absolute bottom-3 left-3 right-3 z-30 transition-opacity duration-500 delay-150 ${
          booted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="backdrop-blur-md bg-charcoal/85 border-l-4 border-[#C9A24B] text-cream font-mono font-bold p-3 flex items-center gap-3 shadow-2xl">
          <div className="p-1.5 bg-[#C9A24B]/20 rounded shrink-0">
            <PhoneIncoming className="w-4 h-4 text-[#C9A24B] animate-pulse" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-[10px] text-cream/60 uppercase tracking-wider">
              Active Call
            </span>
            <span className="text-sm md:text-base leading-none tracking-tight truncate">
              {location.area}
              <span className="animate-pulse">_</span>
            </span>
          </div>
        </div>
      </div>

      {/* Layer 5: Boot overlay — covers everything until sequence finishes */}
      <div
        className={`absolute inset-0 z-40 bg-charcoal flex items-center justify-center font-mono text-cream text-sm md:text-base transition-opacity duration-500 ${
          booted ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <span className="tracking-widest">
          {bootText}
          <span className="animate-pulse">_</span>
        </span>
      </div>

      {/* Layer 6: Attribution */}
      <div className="absolute bottom-1 right-3 z-50 text-[8px] text-cream/40 font-mono">
        © OSM © CARTO
      </div>
    </div>
  )
}
