export default (first) => {
    const steps = [
        {
            title: "User Uploads Image",
            desc: "A user uploads an image via the web app. The image is stored in an Amazon S3 bucket (original-images/).",
            img: "https://www.pngplay.com/wp-content/uploads/8/Upload-Icon-Logo-Transparent-Free-PNG.png",
        },
        {
            title: "Trigger Lambda",
            desc: "The S3 upload event automatically triggers an AWS Lambda function.",
            img: "https://images.seeklogo.com/logo-png/31/2/amazon-web-services-aws-logo-png_seeklogo-319188.png",
        },
        {
            title: "Lambda Processes Image",
            desc: "Lambda uses Sharp (Node.js) or Pillow (Python) to create resized versions: Thumbnail, Medium, and Original.",
            img: "https://static.thenounproject.com/png/2965944-200.png",
        },
        {
            title: "Save Resized Images",
            desc: "Lambda saves resized images back to S3 in resized-images/thumbnail/ and resized-images/medium/.",
            img: "https://cdn-icons-png.flaticon.com/512/4209/4209802.png",
        },
        {
            title: "Store Metadata in DynamoDB",
            desc: "Metadata such as image ID, S3 URLs, timestamps, and user ID is stored in DynamoDB.",
            img: "https://cdn-icons-png.flaticon.com/512/9850/9850812.png",
        },
        {
            title: "Frontend Access",
            desc: "The frontend fetches metadata and displays thumbnails first. On click, medium or original images load.",
            img: "https://img.freepik.com/free-vector/frontend-development-concept-website-interface-design-improvement-web-page-programming-coding-testing-it-profession-isolated-flat-vector-illustration_613284-2357.jpg",
        },
        {
            title: "Optional: CloudFront CDN",
            desc: "CloudFront caches and delivers images globally for faster access.",
            img: "https://www.gtechme.com/wp-content/uploads/2023/05/The-Benefits-Of-Using-A-Content-Delivery-Network-CDN-For-Your-Website-banner-1.jpg",
        },
    ];

    return (
        <section className="w-full py-16 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
                    🔹 Workflow – How It Works
                </h2>

                <div className="space-y-20">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-10 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >

                            <div className="flex-1">
                                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                                    {index + 1}. {step.title}
                                </h3>
                                <p className="text-gray-600 text-lg">{step.desc}</p>
                            </div>


                            <div className="flex-1 flex justify-center">
                                <img
                                    src={step.img}
                                    alt={step.title}
                                    className="w-40 h-40 object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}