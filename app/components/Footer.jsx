export default (first) => {
    return (
        <footer className="w-full bg-gray-900 text-gray-300 py-12">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo + Description */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">resize</h2>
                    <p className="text-gray-400">
                        Simple and fast image processing & resizing for your content.
                        Upload, resize, and optimize in seconds.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="/" className="hover:text-purple-400">Home</a></li>
                        <li><a href="/gallery" className="hover:text-purple-400">Gallery</a></li>
                        <li><a href="/about" className="hover:text-purple-400">About</a></li>
                        <li><a href="/contact" className="hover:text-purple-400">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-purple-400">Docs</a></li>
                        <li><a href="#" className="hover:text-purple-400">API</a></li>
                        <li><a href="#" className="hover:text-purple-400">Support</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
                    <p className="text-gray-400 mb-4">Subscribe for the latest features & updates.</p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded-l-md w-full focus:outline-none border text-white"
                        />
                        <button className="bg-purple-500 px-4 py-2 rounded-r-md text-white hover:bg-purple-600 transition">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} resize. All rights reserved.
            </div>
        </footer>
    )
}