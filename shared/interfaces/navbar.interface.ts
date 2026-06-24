export interface DropdownItem {
  label: string
  href: string
  description: string
}

export interface NavItem {
  label: string
  href?: string
  dropdown?: DropdownItem[]
}