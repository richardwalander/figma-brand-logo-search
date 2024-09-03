import { h } from 'preact'
import { useParams } from 'wouter-preact'
import { useState } from 'preact/hooks'
import ListItem from '../components/listitem/list-item'
import './explore-cat.css'
const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const ExploreCategory = () => {
  const { categories } = window.pluginConfig
  const { cat } = useParams()
  const category = categories.find((c) => c.id === cat)
  console.log(category)

  // const [exploreCategories, setCategories] = useState(categories)
  return (
    <div className="container explore-cat">
      <div className="row">
        <div className="col-sm-1">
          <i className="la la-arrow-left"></i>
        </div>
        <div className="col-sm">{category.name}</div>
      </div>
      <div className="">
        {category.brands.map((r) => (
          <ListItem key={r.domain} {...r} onClick={() => {}} url={`https://img.logo.dev/${r.domain}?token=${token}`} />
        ))}
      </div>
    </div>
  )
}

export default ExploreCategory
