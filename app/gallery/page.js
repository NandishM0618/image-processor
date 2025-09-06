"use client"
import { useEffect, useState } from "react"

export default (first) => {
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)
    const API_GATEWAY_URL = process.env.NEXT_PUBLIC_API_GATEWAY_URL
    const REGION = process.env.NEXT_PUBLIC_REGION

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch(`https://${API_GATEWAY_URL}.execute-api.${REGION}.amazonaws.com/get-images`, {
                    method: "GET",
                    credentials: "include"
                })
                const data = await res.json()
                console.log("Fetched items", data)
                setImages(data || [])
            } catch (err) {
                console.error("Error fetching images:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchImages()
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500">Loading images...</p>
            </div>
        )
    }
    return (
        <div className="max-w-7xl mx-auto px-6 py-10">

            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800">Image Gallery</h2>
                <p className="text-gray-500 mt-2">
                    Browse uploaded images with different sizes
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((img, index) => (
                    <div key={index} className="group [perspective:1200px]">
                        <div className="relative w-full h-[500px] transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-md [backface-visibility:hidden]">
                                <img
                                    src={img.urls.original || img.urls.medium || img.urls.thumb}
                                    alt={`image-${index}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute inset-0 bg-white rounded-2xl shadow-md p-4 flex flex-col justify-center items-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                                <p className="text-sm text-gray-700 font-medium">
                                    Uploaded by: {img.userId}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(img.uploadedAt).toLocaleString()}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                    {Object.entries(img.urls).map(([size, url]) => (
                                        <a
                                            key={size}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-medium hover:bg-purple-600 transition"
                                        >
                                            {size}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}
