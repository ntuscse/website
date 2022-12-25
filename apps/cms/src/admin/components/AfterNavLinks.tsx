import React from "react"
import { Chevron } from 'payload/components'
import { NavLink } from 'react-router-dom'
import NavGroup from "payload/dist/admin/components/elements/NavGroup";

const baseClass = 'nav-group-after-nav-links';

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
    <>
      <NavGroup label="Merch">
        {merchRoutes.map((route, index) => (
          <NavLink key={index} className="nav__link" activeClassName="active" to={route.href}>
            <Chevron />
            {route.label}
          </NavLink>
        ))}
      </NavGroup>
    </>
  )
}

const AfterNavLinks = [
  MerchLinks
]

export default AfterNavLinks
