import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { useLocation } from 'wouter-preact'
import ListItem from '../components/listitem/list-item' // Assuming ListItem is a separate Preact component
import * as mixpanel from 'mixpanel-figma'
import './home.css'
import SearchField from '../components/searchfield/searchfield'

const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN
const secret = import.meta.env.VITE_LOGO_DEV_API_SECRET

const Home = ({ params }) => {
  // const { q } = useParams()
  const q = decodeURIComponent(params.q)
  const [result, setResult] = useState([])
  const [domain, setDomain] = useState('')
  const [, setLocation] = useLocation()
  let searchTimer

  useEffect(() => {
    console.log('search', params)
    if (params.hasOwnProperty('q')) {
      setDomain(q)
      parent.postMessage({ pluginMessage: { type: 'search-logo', query: q } }, '*')
      mixpanel.track('search_domain', { value: q })
    }
    document.getElementById('domain').focus()
    const onMessage = (event) => {
      const msg = event.data.pluginMessage
      switch (msg.type) {
        case 'search-result':
          setResult(msg.data)
          break
        default:
          break
      }
    }
    window.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])

  const clear = () => {
    setDomain('')
    setResult([])
    document.getElementById('domain').focus()
  }

  const search = async (e) => {
    clearTimeout(searchTimer)

    searchTimer = setTimeout(() => {
      const val = e.target.value
      setDomain(val)

      if (val !== '') {
        parent.postMessage({ pluginMessage: { type: 'search-logo', query: val } }, '*')
        window.sa_event('search_domain', { value: val })
        mixpanel.track('search_domain', { value: val })
        setLocation(`/search/${encodeURIComponent(val)}`)
      } else {
        setResult([])
      }
    }, 1000)
  }

  // const generate = async (d) => {
  //   if (d !== '') {
  //     parent.postMessage({ pluginMessage: { type: 'create-logo', domain: d } }, '*')
  //     window.sa_event('insert_logo', { domain: d })
  //     mixpanel.track('insert_logo', { domain: d })
  //   }
  // }

  // const cancel = () => {
  //   parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*')
  // }

  // const itemClick = (r) => {
  //   setDomain(r.domain)
  //   generate(r.domain)
  // }

  return (
    <div id="search">
      <div className="container">
        <div className="row">
          <SearchField domain={domain} onSearch={search} onClear={clear}></SearchField>
        </div>
      </div>

      {result.length > 0 ? (
        <div className="container search-result">
          {result.map((r) => (
            <ListItem key={r.domain} {...r} />
          ))}
        </div>
      ) : (
        <div className="container empty">
          <svg class="svg" width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="url(#paint0_linear)" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47.0533 23.0549C49.2748 21.7724 52.0118 21.7724 54.2332 23.0549L72.1831 33.4183C74.4045 34.7009 75.773 37.0712 75.773 39.6363V60.363C75.773 62.9281 74.4045 65.2984 72.1831 66.581L54.232 76.945C52.0144 78.2254 49.2828 78.2278 47.0629 76.9513L31.4681 67.9839C31.1502 68.2109 30.8216 68.4261 30.4827 68.6284L21.2517 74.141L15.1163 63.867L24.3473 58.3544C25.0706 57.9225 25.5135 57.1421 25.5135 56.2996V39.6363C25.5135 37.0712 26.882 34.7009 29.1035 33.4183L47.0533 23.0549ZM37.4209 57.603L46.6413 62.9049C49.1147 64.3272 52.1583 64.3245 54.6292 62.8979L59.8065 59.9088C62.2817 58.4798 63.8065 55.8388 63.8065 52.9806V47.0187C63.8065 44.1605 62.2817 41.5195 59.8065 40.0905L54.6433 37.1095C52.1681 35.6804 49.1185 35.6804 46.6433 37.1095L41.48 40.0905C39.0048 41.5195 37.48 44.1605 37.48 47.0187V56.2996C37.48 56.7372 37.4601 57.1721 37.4209 57.603Z"
              fill="url(#paint1_linear)"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M47.0533 23.0549C49.2748 21.7724 52.0118 21.7724 54.2332 23.0549L72.1831 33.4183C74.4045 34.7009 75.773 37.0712 75.773 39.6363V60.363C75.773 62.9281 74.4045 65.2984 72.1831 66.581L54.232 76.945C52.0144 78.2254 49.2828 78.2278 47.0629 76.9513L31.4681 67.9839C31.1502 68.2109 30.8216 68.4261 30.4827 68.6284L21.2517 74.141L15.1163 63.867L24.3473 58.3544C25.0706 57.9225 25.5135 57.1421 25.5135 56.2996V39.6363C25.5135 37.0712 26.882 34.7009 29.1035 33.4183L47.0533 23.0549ZM37.4209 57.603L46.6413 62.9049C49.1147 64.3272 52.1583 64.3245 54.6292 62.8979L59.8065 59.9088C62.2817 58.4798 63.8065 55.8388 63.8065 52.9806V47.0187C63.8065 44.1605 62.2817 41.5195 59.8065 40.0905L54.6433 37.1095C52.1681 35.6804 49.1185 35.6804 46.6433 37.1095L41.48 40.0905C39.0048 41.5195 37.48 44.1605 37.48 47.0187V56.2996C37.48 56.7372 37.4601 57.1721 37.4209 57.603Z"
              fill="white"
            />
            <path
              d="M37.48 57.5084C36.9873 60.9257 34.2922 65.7965 31.4968 67.9792L44.0617 75.1591L50.6433 65.2867L37.48 57.5084Z"
              fill="url(#paint2_linear)"
            />
            <path
              d="M50 41.8605V56.9768M50 56.9768L55.8139 52.3256M50 56.9768L44.186 52.3256"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient id="paint0_linear" x1="-3.72529e-07" y1="100" x2="100" y2="-3.72529e-07" gradientUnits="userSpaceOnUse">
                <stop stop-color="#6E279F" />
                <stop offset="1" stop-color="#B636B9" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="4.57201" y1="76.9541" x2="75.1747" y2="35.6694" gradientUnits="userSpaceOnUse">
                <stop />
                <stop offset="1" stop-opacity="0" />
              </linearGradient>
              <linearGradient id="paint2_linear" x1="35.0867" y1="62.8934" x2="46.455" y2="69.7741" gradientUnits="userSpaceOnUse">
                <stop stop-opacity="0.2" />
                <stop offset="1" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
          <h3>Search for logo</h3>
          <p>Type the domain to search for logos to use in your design.</p>
        </div>
      )}
    </div>
  )
}

export default Home
