"use client"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { uploadFile } from "../lib/filehandler"
import { useSession } from "next-auth/react"

export default (first) => {
    const [file, setFile] = useState(null)
    const [userId, setUserId] = useState(null)
    const [message, setMessage] = useState("");
    const [loading,setLoading] = useState(false);


    const { data: session, status } = useSession()

    const handleFileChange = (e) => {
        e.preventDefault()
        if (e.target.files.length) {
            setFile(e.target.files[0])
            setMessage("");
        }
    }

   const handleUpload = async () => {
        if (!session) {
            setMessage("⚠️ Please log in to upload images.")
            return
        }
        if (!file) {
            setMessage("⚠️ Please select a file before uploading.")
            return
        }

        setMessage("")
        setLoading(true)

        try {
            await uploadFile(file, userId)
            setMessage("✅ Upload successful!")
            setFile(null)
        } catch (error) {
            console.error("Upload failed:", error)
            setMessage("❌ Upload failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            setUserId(session.user.id || session.user.sub);
        }
    }, [session, status])
    // console.log("userId", userId)
    return (
        <header className="relative p-3 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-b-md">
            <Navbar />
            <div className="w-full flex justify-center items-center py-15">
                <div className="max-w-5xl mx-auto w-full rounded-2xl flex flex-col space-y-3 px-8 text-center">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-white  leading-17 text-5xl">Image Processing and Resizing for Content</h2>
                    </div>

                    <div className="max-w-xl mx-auto">
                        <div className="flex items-center bg-white rounded-xl shadow-lg overflow-hidden">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="flex-1 px-4 py-3 cursor-pointer text-gray-700 focus:outline-none"
                            />
                            <button
                                type="submit"
                                onClick={handleUpload}
                                className={`px-6 py-3 font-semibold rounded-lg transition ${!file || !session
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-purple-500 text-white hover:bg-purple-600"
                                    }`}
                            >
                                {loading ? "Uploading..." : "Upload"}
                            </button>
                        </div>
                        {loading && (
                            <div className="mt-2 flex justify-center">
                                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        {message && (
                            <p className="text-sm text-red-500 font-medium">{message}</p>
                        )}
                    </div>
                    <div className=" mt-3 -mb-4">
                        <p className="text-gray-100 leading-relaxed text-base">
                            Our <span className="text-orange-500 font-bold">resize</span> platform makes it simple to upload, resize, and optimize images
                            in real time. Built with scalability and speed in mind, it leverages AWS Lambda and S3
                            to handle images securely without worrying about servers. Whether you’re a developer,
                            designer, or business owner, our service ensures your images are fast, lightweight,
                            and ready for the web — saving you both time and storage costs.
                        </p>
                    </div>
                </div>
            </div>
        </header>
    )
}
