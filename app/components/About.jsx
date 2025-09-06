export default (first) => {
    return (
        <div id="about" className="max-w-7xl mx-auto px-6 py-12">

            <div className="bg-white p-10">

                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    About resize
                </h2>

                <p className="text-gray-600 leading-relaxed text-lg mb-6 text-center">
                    resize is a serverless platform that makes image
                    storage, resizing, and optimization seamless. Powered by
                    <span className="font-semibold text-purple-600"> AWS Lambda</span> and
                    <span className="font-semibold text-purple-600"> S3</span>, it
                    automatically generates multiple image sizes for web and mobile
                    applications while maintaining high quality and performance.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="p-6 bg-purple-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/1829/1829589.png" className="w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">Automatic Resizing</h3>
                        <p className="text-gray-600 text-sm mt-2">Generates thumbnails, medium, and large sizes instantly.</p>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/4301/4301717.png" className="w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">Cloud Powered</h3>
                        <p className="text-gray-600 text-sm mt-2">Runs on AWS Lambda & S3 with zero server management.</p>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-xl shadow-sm text-center hover:shadow-md transition">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" className="w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800">Secure & Scalable</h3>
                        <p className="text-gray-600 text-sm mt-2">Ensures reliability, scalability, and data security.</p>
                    </div>
                </div>

                <div className="mt-10 text-center">
                    <p className="text-gray-700">
                        Whether you’re building an e-commerce store, a media-heavy blog,
                        or a portfolio site, Cloud Image Processor helps you deliver
                        optimized images effortlessly. 🚀
                    </p>
                </div>
            </div>
        </div>
    )
}