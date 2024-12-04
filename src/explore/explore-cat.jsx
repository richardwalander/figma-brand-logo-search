import { h } from 'preact'
import { useParams } from 'wouter-preact'
import { useState } from 'preact/hooks'
import ListItem from '../components/listitem/list-item'
import './explore-cat.css'
import BackButton from '../components/backbutton/backbutton'
const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const ExploreCategory = () => {
  const { categories } = window.pluginConfig
  const { cat } = useParams()
  const category = categories.find((c) => c.id === cat)
  console.log(category)

  // const [exploreCategories, setCategories] = useState(categories)
  return (
    <div id="explore-cat" className="container">
      <div className="row header">
        <div className="col-sm-2">
          <BackButton></BackButton>
        </div>
        <div className="col-sm">
          <h5>
            {category.icon} {category.name}
          </h5>
        </div>
      </div>
      <div className="brands">
        {category.brands.map((r) => (
          <ListItem key={r.domain} {...r} url={`https://img.logo.dev/${r.domain}?token=${token}`} />
        ))}
      </div>
    </div>
  )
}

export default ExploreCategory
