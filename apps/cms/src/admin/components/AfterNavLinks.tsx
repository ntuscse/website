import React from "react"
import { Chevron } from 'payload/components'
import { NavLink } from 'react-router-dom'

const baseClass = 'after-nav-links';

const merchRoutes = [
  {
    id: 'merch_overview',
    label: 'Overview',
    href: '/admin/merch/overview',
  },
  {
    id: 'merch_sales',
    label: 'Sales',
    href: '/admin/merch/sales',
  },
  {
    id: 'merch_products',
    label: 'Products',
    href: '/admin/merch/products',
  }
]

const MerchLinks: React.FC = () => {
  return (
    <div className={baseClass}>
      <span className="nav__label">Merch</span>
      <nav>
        {merchRoutes.map((route, index) => (
          <NavLink key={index} className="nav__link" activeClassName="active" to={route.href}>
            <Chevron />
            {route.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

const AfterNavLinks = [
  MerchLinks
]

export default AfterNavLinks
