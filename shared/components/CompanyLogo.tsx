import Link from "next/link";

function CompanyLogo() {
  return (
    <Link href="/" aria-label="EPAM Home" className="flex items-center gap-2.5 shrink-0">
      {/* Orange accent bar — EPAM brand identifier */}
      <span className="block w-1.5 h-7 rounded-sm bg-[#FF6C37]" aria-hidden="true" />
      <span className="text-xl font-black tracking-widest text-gray-900 leading-none">
        EPAM
      </span>
      <span className="hidden sm:block text-[10px] font-semibold tracking-[0.2em] text-gray-400 uppercase leading-none mt-0.5 self-end mb-0.5">
        Systems
      </span>
    </Link>
  )
}

export default CompanyLogo;