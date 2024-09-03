import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link, useLocation } from 'wouter-preact'
import SearchField from '../components/searchfield/searchfield'
import Accordion from '../components/accordion/accordion'
import './explore.css'

const Explore = () => {
  const { categories } = window.pluginConfig
  const [exploreCategories, setCategories] = useState(categories)
  const [location, setLocation] = useLocation()
  return (
    <div id="explore">
      <div className="container">
        <div className="row">
          <SearchField
            domain={''}
            onSearch={(e) => {
              const val = e.target.value
              setLocation(`/search/${val}`)
            }}
          ></SearchField>
        </div>
        <Accordion title="Categories">
          {exploreCategories.map((cat) => (
            <Link to={`/explore/${cat.id}`} asChild>
              <div className="category-list-item col-sm-6">
                <div className="row rounded">
                  <div className="col-sm-2">{cat.icon}</div>
                  <div className="col-sm">{cat.name}</div>
                  <div className="col-sm-1">
                    <i className="la la-angle-right"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </Accordion>
        {/* <div className="row">
          <div className="col-sm">
            <h4>Categories</h4>
          </div>
        </div>
        <div className="row">
          {exploreCategories.map((cat) => (
            <Link to={`/explore/${cat.id}`} asChild>
              <div className="category-list-item col-sm-6">
                <div className="row rounded">
                  <div className="col-sm-2">{cat.icon}</div>
                  <div className="col-sm">{cat.name}</div>
                  <div className="col-sm-1">
                    <i className="la la-angle-right"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div> */}
      </div>
    </div>
  )
}

export default Explore
