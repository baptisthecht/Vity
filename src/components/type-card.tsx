import { LucideIcon } from "lucide-react"
import Link from "next/link"

export const TypeCard = ({label, href, icon: Icon}: {label: string, href: string, icon: LucideIcon }) => {
    return <Link href={href} className="gap-10 border rounded-2xl p-8 text-2xl font-bold flex flex-col items-center justify-end bg-gray-100 hover:bg-gray-200 transition-colors duration-100 ease-in-out cursor-pointer">
        <Icon className="w-16 h-16 text-primary" />
        {label}
    </Link>
}