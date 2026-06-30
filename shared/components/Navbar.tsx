'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { CompanyLogo, DropdownPanel } from "@shared/components";
import { HamburgerIcon, ChevronDownIcon } from "@shared/components/icons";
import { navItems } from '@shared/constants/navbar.constant'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpandedItem, setMobileExpandedItem] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Enhance header shadow/blur once the user has scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close any open dropdown when user clicks outside the navbar
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  // Close mobile menu and dropdowns on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const toggleDropdown = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }

  const toggleMobileItem = (label: string) => {
    setMobileExpandedItem((prev) => (prev === label ? null : label))
  }

  return (
    <header
      ref={navRef}
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_24px_0_rgba(0,0,0,0.08)]'
          : 'bg-white border-b border-gray-100'}
      `}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <CompanyLogo />

          {/* ── Desktop nav items ── */}
          <ul className="hidden md:flex items-center gap-0.5" role="menubar">
            {navItems.map((item) => (
              <li key={item.label} className="relative" role="none">
                {item.dropdown ? (
                  <>
                    <button
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                      onClick={() => toggleDropdown(item.label)}
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                      className={`
                        flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg
                        transition-colors duration-150 select-none
                        ${openDropdown === item.label
                          ? 'text-[#FF6C37] bg-orange-50'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}
                      `}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`transition-transform duration-200 ${
                          openDropdown === item.label ? 'rotate-180 text-[#FF6C37]' : 'text-gray-400'
                        }`}
                      />
                    </button>

                    {/* Invisible bridge keeps dropdown open while mouse moves from button to panel */}
                    {openDropdown === item.label && (
                      <div
                        className="absolute top-full left-0 right-0 h-2"
                        onMouseEnter={() => setOpenDropdown(item.label)}
                        onMouseLeave={() => setOpenDropdown(null)}
                        aria-hidden="true"
                      />
                    )}

                    <div
                      onMouseEnter={() => setOpenDropdown(item.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      <DropdownPanel
                        items={item.dropdown}
                        isOpen={openDropdown === item.label}
                      />
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href!}
                    role="menuitem"
                    className="
                      block px-4 py-2 text-sm font-medium text-gray-600
                      hover:text-gray-900 hover:bg-gray-50 rounded-lg
                      transition-colors duration-150
                    "
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="
                px-5 py-2 text-sm font-semibold text-white rounded-full
                bg-[#FF6C37] hover:bg-[#e85d2a]
                shadow-[0_2px_12px_0_rgba(255,108,55,0.35)]
                hover:shadow-[0_4px_16px_0_rgba(255,108,55,0.45)]
                transition-all duration-200 active:scale-[0.97]
              "
            >
              Contact Us
            </Link>
          </div>

          {/* ── Mobile hamburger ── */}
          <button
            className="
              md:hidden flex items-center justify-center w-9 h-9 rounded-lg
              text-gray-600 hover:text-gray-900 hover:bg-gray-100
              transition-colors duration-150
            "
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <HamburgerIcon isOpen={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ── */}
      <div
        id="mobile-menu"
        role="region"
        aria-label="Mobile navigation"
        className={`
          md:hidden overflow-hidden
          transition-all duration-300 ease-in-out
          ${mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <div className="border-t border-gray-100 bg-white px-4 pb-5 pt-2 space-y-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.dropdown ? (
                <>
                  <button
                    onClick={() => toggleMobileItem(item.label)}
                    aria-expanded={mobileExpandedItem === item.label}
                    className="
                      w-full flex items-center justify-between
                      px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700
                      hover:bg-gray-50 transition-colors duration-150
                    "
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`transition-transform duration-200 text-gray-400 ${
                        mobileExpandedItem === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mobile accordion */}
                  <div
                    className={`
                      overflow-hidden transition-all duration-200
                      ${mobileExpandedItem === item.label ? 'max-h-80' : 'max-h-0'}
                    `}
                  >
                    <ul className="mt-0.5 ml-3 pl-3 border-l-2 border-orange-100 space-y-0.5 pb-1">
                      {item.dropdown.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="
                              flex flex-col px-3 py-2.5 rounded-lg
                              hover:bg-orange-50 transition-colors duration-150
                            "
                          >
                            <span className="text-sm font-medium text-gray-800">{child.label}</span>
                            <span className="text-xs text-gray-400 mt-0.5">{child.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href!}
                  onClick={() => setMobileOpen(false)}
                  className="
                    block px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700
                    hover:bg-gray-50 transition-colors duration-150
                  "
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}

          {/* Mobile CTA */}
          <div className="pt-3 border-t border-gray-100">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="
                block w-full text-center px-5 py-3 rounded-full
                bg-[#FF6C37] text-white text-sm font-semibold
                hover:bg-[#e85d2a] transition-colors duration-150
                shadow-[0_2px_12px_0_rgba(255,108,55,0.3)]
              "
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
