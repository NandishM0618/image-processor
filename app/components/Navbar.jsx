"use client"
import Link from "next/link"
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"

export default () => {
    const { data: session } = useSession()
    const [open, setOpen] = useState(false)
    const menuRef = useRef()

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="max-w-5xl mx-auto rounded-xl bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="text-2xl font-medium text-black/70">
                    <div className="flex items-center space-x-3">

                        <img
                            src="https://static.vecteezy.com/system/resources/previews/047/233/850/non_2x/resize-icon-line-icon-for-your-website-mobile-presentation-and-logo-design-vector.jpg"
                            alt="Resize Logo"
                            className="w-10 h-10 object-contain"
                        />

                        <h2 className="text-2xl font-bold text-gray-800">resize</h2>
                    </div>
                </div>

                <div className="hidden md:flex items-center space-x-3 gap-x-3 text-gray-700 font-medium">

                    <Link
                        href="/"
                        className="text-sm hover:text-purple-500 transition-colors duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/gallery"
                        className="text-sm hover:text-purple-500 transition-colors duration-200"
                    >
                        Image Gallery
                    </Link>
                    <Link
                        href="#about"
                        className="text-sm hover:text-purple-500 transition-colors duration-200"
                    >
                        About
                    </Link>

                    <div className="ml-2">
                        {!session ? (
                            <button
                                onClick={() => signIn("cognito")}
                                className="bg-purple-500 text-white text-sm px-5 py-2.5 rounded-full shadow-md 
                   hover:bg-purple-600 hover:shadow-lg 
                   transition-all duration-200"
                            >
                                Sign in
                            </button>
                        ) : (
                            <div className="relative">
                                <button onClick={() => setOpen(!open)} className="flex cursor-pointer items-center focus:outline-none">
                                    <ChevronDown className={`w-4 h-4 mx-2 text-gray-600 transition-transform ${open ? "rotate-180" : "rotate-0"
                                        }`} />
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/6522/6522516.png"
                                        className="w-10 h-10 rounded-full shadow-sm hover:scale-105 transition-transform"
                                        alt="Profile"
                                    />
                                </button>
                                {open && (
                                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                                        <Link
                                            href="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition"
                                            onClick={() => setOpen(false)}
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                setOpen(false);
                                                signOut();
                                            }}
                                            className="w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </nav>
    )
}