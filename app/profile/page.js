"use client"
import { useSession } from "next-auth/react"

export default (first) => {
    const { data: session } = useSession()

    return (
        <div className="max-w-md mx-auto mt-10 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

            <div className="h-24 bg-gradient-to-r from-purple-500 to-indigo-500"></div>

            <div className="p-6 relative -mt-12 flex flex-col items-center ">

                <img
                    src={session.user?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full  border-white shadow-lg object-cover"
                />

                <h2 className="mt-4 text-xl font-semibold text-gray-800">
                    {session.user?.name || "User"}
                </h2>
                <p className="text-gray-500 text-sm">{session.user?.email}</p>

                <p className="mt-2 text-xs text-gray-400">
                    ID: {session.user?.sub || "N/A"}
                </p>

                <div className="mt-4 flex space-x-4">
                    <button className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition">
                        Edit Profile
                    </button>
                    <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition">
                        Settings
                    </button>
                </div>
            </div>
        </div>

    )
}