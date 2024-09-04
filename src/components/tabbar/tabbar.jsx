import { h } from 'preact'
import { Link, useRoute } from 'wouter-preact'
import './tabbar.css'

const TabBar = () => {
  const [isSearch] = useRoute('/search/*?')
  const [isExplore] = useRoute('/explore/*?')
  const [isDetails] = useRoute('/details/*?')
  return !isDetails ? (
    <div className="tab-bar">
      <div className="container">
        <div className="row">
          <Link className={() => (isExplore ? 'active tab-item' : 'tab-item')} href="/explore/">
            Explore
          </Link>
          <Link className={() => (isSearch ? 'active tab-item' : 'tab-item')} href="/search/">
            Search
          </Link>
          <Link className={(active) => (active ? 'active tab-item' : 'tab-item')} href="/more">
            More
          </Link>
        </div>
      </div>
    </div>
  ) : null
}

export default TabBar
