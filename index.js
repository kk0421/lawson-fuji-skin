/**
 * Lawson at Dusk — host half.
 *
 * Serves the extracted wallpaper to the browser and injects the cinematic
 * startup animation into the initial HTML before the Harness app mounts.
 */
import { readFileSync } from 'node:fs'

export const name = 'lawson-fuji-skin'
export const inject = ['webServer']

const SPLASH_FILE = new URL('./splash.js', import.meta.url)
const IMAGE_FILE = new URL('./bg.jpg', import.meta.url)
const IMAGE_ROUTE = '/lawson-fuji-skin/bg.jpg'
const GEO_ROUTE = '/lawson-fuji-skin/geo'
const WEATHER_ROUTE = '/lawson-fuji-skin/weather'
const GEO_TTL = 60 * 60 * 1000
const WEATHER_TTL = 8 * 60 * 1000
const geoCache = new Map()
const weatherCache = new Map()

const BOOT_CSS = [
  'html,body{background-color:#08131c !important;}',
  'body{--dsh-boot-bg:#08131c;}',
  'body:has(#lfs-boot-root) [data-dsh-boot]{background:transparent !important;}',
  'body:has(#lfs-boot-root) [data-dsh-boot] [class*="_card_"]{display:none !important;}',
].join('')

function readSplash() {
  try {
    return readFileSync(SPLASH_FILE, 'utf8')
  } catch (error) {
    console.warn('[lawson-fuji-skin] boot animation source is unavailable:', error)
    return ''
  }
}

function readImage() {
  try {
    return readFileSync(IMAGE_FILE)
  } catch (error) {
    console.warn('[lawson-fuji-skin] wallpaper is unavailable:', error)
    return null
  }
}

function sendJson(res, status, payload) {
  const body = Buffer.from(JSON.stringify(payload))
  res.writeHead(status, {
    'cache-control': 'no-store',
    'content-length': String(body.byteLength),
    'content-type': 'application/json; charset=utf-8',
    'x-content-type-options': 'nosniff',
  })
  res.end(body)
}

async function fetchJson(url, timeout = 7000) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        accept: 'application/json',
        'user-agent': 'lawson-fuji-skin/1.0',
      },
    })
    if (!response.ok) throw new Error(`upstream ${response.status}`)
    return await response.json()
  } finally {
    clearTimeout(timer)
  }
}

function cached(map, key, ttl) {
  const hit = map.get(key)
  if (!hit) return null
  if (Date.now() - hit.at > ttl) {
    map.delete(key)
    return null
  }
  return hit.value
}

function remember(map, key, value) {
  map.set(key, { at: Date.now(), value })
  if (map.size > 120) {
    const oldest = map.keys().next().value
    if (oldest !== undefined) map.delete(oldest)
  }
  return value
}

export function apply(ctx) {
  const image = readImage()

  ctx.inject(['webServer'], (webCtx) => {
    webCtx.on(
      'webserver/index-inject',
      (table) => {
        if (!Array.isArray(table)) return
        const splashSource = readSplash()
        table.push({ kind: 'style', text: BOOT_CSS })
        if (splashSource) {
          table.push({ kind: 'script', placement: 'head', text: splashSource })
        }
      },
      { prepend: true },
    )

    if (image) {
      try {
        webCtx.effect(() => webCtx.webServer.register({
          kind: 'exact',
          path: IMAGE_ROUTE,
          handler(req, res) {
            if (req.method !== 'GET' && req.method !== 'HEAD') {
              res.writeHead(405, { allow: 'GET, HEAD' })
              res.end()
              return
            }
            res.writeHead(200, {
              'cache-control': 'no-cache',
              'content-length': String(image.byteLength),
              'content-type': 'image/jpeg',
              'x-content-type-options': 'nosniff',
            })
            res.end(req.method === 'HEAD' ? undefined : image)
          },
        }), 'lawson-fuji-skin: wallpaper route')
      } catch (error) {
        console.warn('[lawson-fuji-skin] wallpaper route could not be registered:', error)
      }
    }

    try {
      webCtx.effect(() => webCtx.webServer.register({
        kind: 'exact',
        path: GEO_ROUTE,
        async handler(req, res) {
          if (req.method !== 'GET') {
            sendJson(res, 405, { error: 'method not allowed' })
            return
          }
          const requestUrl = new URL(req.url ?? GEO_ROUTE, 'http://dsh.local')
          const query = (requestUrl.searchParams.get('q') ?? '').trim()
          if (!query || query.length > 80) {
            sendJson(res, 400, { error: 'q must be 1-80 characters' })
            return
          }
          const key = query.toLowerCase()
          const hit = cached(geoCache, key, GEO_TTL)
          if (hit) {
            sendJson(res, 200, hit)
            return
          }
          try {
            const upstream = new URL('https://geocoding-api.open-meteo.com/v1/search')
            upstream.searchParams.set('name', query)
            upstream.searchParams.set('count', '6')
            upstream.searchParams.set('language', 'zh')
            upstream.searchParams.set('format', 'json')
            const data = await fetchJson(upstream.href)
            const results = (Array.isArray(data.results) ? data.results : [])
              .filter((item) => item && Number.isFinite(item.latitude) && Number.isFinite(item.longitude))
              .map((item) => ({
                name: String(item.name || ''),
                admin1: String(item.admin1 || ''),
                country: String(item.country || ''),
                latitude: Number(item.latitude),
                longitude: Number(item.longitude),
                timezone: String(item.timezone || ''),
              }))
            sendJson(res, 200, remember(geoCache, key, { results }))
          } catch (error) {
            console.warn('[lawson-fuji-skin] geocoding failed:', error)
            sendJson(res, 502, { error: 'geocoding unavailable' })
          }
        },
      }), 'lawson-fuji-skin: geocoding route')
    } catch (error) {
      console.warn('[lawson-fuji-skin] geocoding route could not be registered:', error)
    }

    try {
      webCtx.effect(() => webCtx.webServer.register({
        kind: 'exact',
        path: WEATHER_ROUTE,
        async handler(req, res) {
          if (req.method !== 'GET') {
            sendJson(res, 405, { error: 'method not allowed' })
            return
          }
          const requestUrl = new URL(req.url ?? WEATHER_ROUTE, 'http://dsh.local')
          const latitude = Number(requestUrl.searchParams.get('lat'))
          const longitude = Number(requestUrl.searchParams.get('lon'))
          if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
            || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            sendJson(res, 400, { error: 'lat/lon required' })
            return
          }
          const key = `${latitude.toFixed(2)},${longitude.toFixed(2)}`
          const hit = cached(weatherCache, key, WEATHER_TTL)
          if (hit) {
            sendJson(res, 200, hit)
            return
          }
          try {
            const upstream = new URL('https://api.open-meteo.com/v1/forecast')
            upstream.searchParams.set('latitude', String(latitude))
            upstream.searchParams.set('longitude', String(longitude))
            upstream.searchParams.set('current', 'temperature_2m,weather_code,is_day')
            upstream.searchParams.set('timezone', 'auto')
            upstream.searchParams.set('forecast_days', '1')
            const data = await fetchJson(upstream.href)
            const current = data.current || {}
            sendJson(res, 200, remember(weatherCache, key, {
              temperature: Number(current.temperature_2m),
              code: Number(current.weather_code),
              isDay: Number(current.is_day) === 1,
              timezone: String(data.timezone || ''),
              fetchedAt: Date.now(),
            }))
          } catch (error) {
            console.warn('[lawson-fuji-skin] weather failed:', error)
            sendJson(res, 502, { error: 'weather unavailable' })
          }
        },
      }), 'lawson-fuji-skin: weather route')
    } catch (error) {
      console.warn('[lawson-fuji-skin] weather route could not be registered:', error)
    }
  })
}
