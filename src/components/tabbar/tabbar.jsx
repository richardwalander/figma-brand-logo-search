import { h } from 'preact'
import { Link, useRoute } from 'wouter-preact'
import './tabbar.css'

const TabBar = () => {
  const [isSearch, params] = useRoute('/search/:q')
  return (
    <div className="tab-bar">
      <div className="container">
        <div className="row">
          <Link className={(active) => (active ? 'active tab-item' : 'tab-item')} href="/explore">
            Explore
          </Link>
          <Link className={(active) => (isSearch ? 'active tab-item' : 'tab-item')} href="/search">
            Search
          </Link>
          <Link className={(active) => (active ? 'active tab-item' : 'tab-item')} href="/more">
            More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TabBar
