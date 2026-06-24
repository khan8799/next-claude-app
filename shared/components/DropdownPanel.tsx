import Link from "next/link";
import { DropdownItem } from "../interfaces/navbar.interface";

function DropdownPanel({ items, isOpen }: { items: DropdownItem[]; isOpen: boolean }) {
  return (
    <div
      className={`
        absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px]
        bg-white rounded-2xl shadow-2xl shadow-gray-200/80 ring-1 ring-gray-100
        transition-all duration-200 origin-top
        ${isOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-95 pointer-events-none'}
      `}
      role="menu"
    >
      {/* Dropdown caret */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 rounded-tl-sm ring-1 ring-gray-100" />
      <ul className="relative grid grid-cols-2 gap-1 p-3">
        {items.map((item) => (
          <li key={item.href} role="none">
            <Link
              href={item.href}
              role="menuitem"
              className="
                group flex flex-col gap-0.5 px-4 py-3 rounded-xl
                hover:bg-orange-50 transition-colors duration-150
              "
            >
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[#FF6C37] transition-colors">
                {item.label}
              </span>
              <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors leading-snug">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* Footer strip */}
      <div className="border-t border-gray-100 px-6 py-3 flex justify-between items-center rounded-b-2xl bg-gray-50/60">
        <span className="text-xs text-gray-400">Explore all capabilities</span>
        <svg className="w-4 h-4 text-[#FF6C37]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
        </svg>
      </div>
    </div>
  )
}

export default DropdownPanel;