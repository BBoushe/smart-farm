export default function AboutPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <section className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "#2d5016" }}>
                    About SmartFarm
                </h1>
                <div className="flex justify-center">
                    <div className="max-w-4xl">
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                            Connecting farmers across Europe for equipment sharing, produce selling, and agricultural collaboration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-12 rounded-xl mb-12" style={{ backgroundColor: "#f5f5dc" }}>
                <div className="px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6" style={{ color: "#2d5016" }}>
                                Our Mission
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                SmartFarm was created to address the key challenges facing modern farmers: lack of quick information,
                                high access costs, and limited national collaboration.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                We believe that by connecting farmers through technology, we can create a more sustainable and
                                profitable agricultural ecosystem that benefits everyone.
                            </p>
                            <div className="flex items-center">
                                <div className="mr-4">
                                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-md">
                                        <span className="text-3xl">🌱</span>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-lg font-semibold mb-1" style={{ color: "#2d5016" }}>
                                        Sustainable Farming
                                    </h5>
                                    <p className="text-sm text-gray-600">Supporting the EU's Sustainable Development Goals</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white rounded-xl shadow-lg p-6 border" style={{ borderColor: "#8fbc8f" }}>
                                <h3 className="text-2xl font-bold mb-4" style={{ color: "#2d5016" }}>
                                    Our Vision
                                </h3>
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    We envision a future where farmers can easily share resources, knowledge, and opportunities, creating
                                    a more resilient and collaborative agricultural community.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-start">
                                        <span className="mr-3 text-green-600 font-bold">✅</span>
                                        <span className="text-gray-700">Reduce equipment costs through sharing and rentals</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-green-600 font-bold">✅</span>
                                        <span className="text-gray-700">Create new markets for surplus products</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-green-600 font-bold">✅</span>
                                        <span className="text-gray-700">Provide instant access to agricultural expertise</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="mr-3 text-green-600 font-bold">✅</span>
                                        <span className="text-gray-700">Support young farmers with financial opportunities</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-12 mb-12">
                <h2 className="text-center text-3xl font-bold mb-12" style={{ color: "#2d5016" }}>
                    What Makes SmartFarm Different
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            icon: "🚜",
                            title: "Equipment Marketplace",
                            desc: "Buy, sell, or rent agricultural equipment directly from other farmers, reducing costs and increasing equipment utilization.",
                        },
                        {
                            icon: "🥕",
                            title: "Product Exchange",
                            desc: "Sell surplus produce, organic fertilizer, livestock feed, and other agricultural products at fair prices.",
                        },
                        {
                            icon: "🔧",
                            title: "Services Network",
                            desc: "Offer specialized agricultural services to other farmers or find the expertise you need for your farm.",
                        },
                        {
                            icon: "🤖",
                            title: "AI Farm Assistant",
                            desc: "Get instant answers to questions about equipment, farming techniques, plant diseases, and agricultural best practices.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-xl shadow-lg text-center p-6 border transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                            style={{ borderColor: "#8fbc8f" }}
                        >
                            <div className="text-5xl mb-4">{feature.icon}</div>
                            <h5 className="text-xl font-semibold mb-3" style={{ color: "#2d5016" }}>
                                {feature.title}
                            </h5>
                            <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Impact & Statistics */}
            <section className="py-12 rounded-xl mb-12" style={{ backgroundColor: "#f5f5dc" }}>
                <div className="px-6">
                    <h2 className="text-center text-3xl font-bold mb-12" style={{ color: "#2d5016" }}>
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {[
                            { icon: "🧑‍🌾", value: "500+", label: "Farmers Connected" },
                            { icon: "💰", value: "€120,000+", label: "Equipment Costs Saved" },
                            { icon: "🌍", value: "5+", label: "European Countries" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-lg p-8 border" style={{ borderColor: "#8fbc8f" }}>
                                <div className="text-5xl mb-4">{stat.icon}</div>
                                <h3 className="text-3xl font-bold mb-2" style={{ color: "#2d5016" }}>
                                    {stat.value}
                                </h3>
                                <p className="text-gray-600 font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banking Partnership */}
            <section className="py-12 rounded-xl mb-12" style={{ backgroundColor: "#f5f5dc" }}>
                <div className="px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-3xl font-bold mb-6" style={{ color: "#2d5016" }}>
                                Banking Partnership
                            </h2>
                            <p className="text-gray-700 mb-4 leading-relaxed">
                                SmartFarm partners with leading agricultural banks to provide farmers with tailored financial products
                                based on their platform activity.
                            </p>
                            <p className="text-gray-700 mb-6 leading-relaxed">
                                Through our analytics tools, banks can offer targeted loans and financial products to farmers based on
                                their equipment usage patterns, purchase history, and farming activities.
                            </p>
                            <div className="p-4 rounded-lg flex items-start" style={{ backgroundColor: "#e8f5e8" }}>
                                <span className="mr-3 text-2xl">💡</span>
                                <div className="text-gray-700">
                                    <strong>Example:</strong> If our system detects you frequently rent a tractor, our banking partners
                                    can offer you a favorable loan to purchase your own equipment.
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="bg-white rounded-xl shadow-lg p-6 border" style={{ borderColor: "#8fbc8f" }}>
                                <h3 className="text-2xl font-bold mb-6" style={{ color: "#2d5016" }}>
                                    Financial Benefits
                                </h3>
                                <ul className="space-y-6">
                                    {[
                                        {
                                            num: "1",
                                            title: "Personalized Loans",
                                            desc: "Receive loan offers tailored to your specific farming needs and usage patterns",
                                        },
                                        {
                                            num: "2",
                                            title: "Risk Analysis",
                                            desc: "AI-powered risk assessment to help prevent poor investment decisions",
                                        },
                                        {
                                            num: "3",
                                            title: "Financial Consulting",
                                            desc: "Access to personalized financial consultations to maximize your farm investments",
                                        },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white mr-4 font-bold"
                                                style={{ backgroundColor: "#2d5016" }}
                                            >
                                                {item.num}
                                            </div>
                                            <div>
                                                <h5 className="text-lg font-semibold mb-1" style={{ color: "#2d5016" }}>
                                                    {item.title}
                                                </h5>
                                                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-12">
                <h2 className="text-3xl font-bold mb-6" style={{ color: "#2d5016" }}>
                    Join the SmartFarm Community
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Be part of the agricultural revolution that's helping farmers across Europe collaborate and thrive
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/register"
                        className="inline-block text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 hover:opacity-90"
                        style={{ backgroundColor: "#2d5016" }}
                    >
                        Register Now
                    </a>
                    <a
                        href="/contact"
                        className="inline-block border-2 font-semibold py-4 px-8 rounded-lg text-lg transition-colors duration-200 hover:bg-opacity-10"
                        style={{ borderColor: "#2d5016", color: "#2d5016" }}
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    )
}
