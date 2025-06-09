export default function AboutPage() {
    return (
        <div className="container py-5">
            {/* Hero Section */}
            <section className="text-center mb-5">
                <h1 className="display-4 fw-bold text-farming mb-4">About SmartFarm</h1>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <p className="lead">
                            Connecting farmers across Europe for equipment sharing, produce selling, and agricultural collaboration.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-5 bg-farming-light rounded-3 mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="fw-bold text-farming mb-4">Our Mission</h2>
                            <p>
                                SmartFarm was created to address the key challenges facing modern farmers: lack of quick information,
                                high access costs, and limited national collaboration.
                            </p>
                            <p>
                                We believe that by connecting farmers through technology, we can create a more sustainable and
                                profitable agricultural ecosystem that benefits everyone.
                            </p>
                            <div className="d-flex align-items-center mt-4">
                                <div className="me-4">
                                    <div
                                        className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                                        style={{ width: "60px", height: "60px" }}
                                    >
                                        <span style={{ fontSize: "2rem" }}>🌱</span>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="text-farming mb-1">Sustainable Farming</h5>
                                    <p className="mb-0 small">Supporting the EU's Sustainable Development Goals</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-farming border-0 shadow">
                                <div className="card-body p-4">
                                    <h3 className="text-farming mb-3">Our Vision</h3>
                                    <p>
                                        We envision a future where farmers can easily share resources, knowledge, and opportunities,
                                        creating a more resilient and collaborative agricultural community.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <div className="d-flex">
                                                <div className="me-2">✅</div>
                                                <div>Reduce equipment costs through sharing and rentals</div>
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div className="d-flex">
                                                <div className="me-2">✅</div>
                                                <div>Create new markets for surplus products</div>
                                            </div>
                                        </li>
                                        <li className="mb-2">
                                            <div className="d-flex">
                                                <div className="me-2">✅</div>
                                                <div>Provide instant access to agricultural expertise</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="me-2">✅</div>
                                                <div>Support young farmers with financial opportunities</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Features */}
            <section className="py-5 mb-5">
                <h2 className="text-center fw-bold text-farming mb-5">What Makes SmartFarm Different</h2>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="card feature-card h-100 text-center p-4">
                            <div style={{ fontSize: "3rem" }}>🚜</div>
                            <h5 className="mt-3 text-farming">Equipment Marketplace</h5>
                            <p className="text-muted small">
                                Buy, sell, or rent agricultural equipment directly from other farmers, reducing costs and increasing
                                equipment utilization.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="card feature-card h-100 text-center p-4">
                            <div style={{ fontSize: "3rem" }}>🥕</div>
                            <h5 className="mt-3 text-farming">Product Exchange</h5>
                            <p className="text-muted small">
                                Sell surplus produce, organic fertilizer, livestock feed, and other agricultural products at fair
                                prices.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="card feature-card h-100 text-center p-4">
                            <div style={{ fontSize: "3rem" }}>🔧</div>
                            <h5 className="mt-3 text-farming">Services Network</h5>
                            <p className="text-muted small">
                                Offer specialized agricultural services to other farmers or find the expertise you need for your farm.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="card feature-card h-100 text-center p-4">
                            <div style={{ fontSize: "3rem" }}>🤖</div>
                            <h5 className="mt-3 text-farming">AI Farm Assistant</h5>
                            <p className="text-muted small">
                                Get instant answers to questions about equipment, farming techniques, plant diseases, and agricultural
                                best practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact & Statistics */}
            <section className="py-5 bg-farming-light rounded-3 mb-5">
                <div className="container">
                    <h2 className="text-center fw-bold text-farming mb-5">Our Impact</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="card h-100 border-0 shadow">
                                <div className="card-body p-4">
                                    <div style={{ fontSize: "2.5rem" }} className="mb-2">
                                        🧑‍🌾
                                    </div>
                                    <h3 className="text-farming">500+</h3>
                                    <p className="text-muted">Farmers Connected</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <div className="card h-100 border-0 shadow">
                                <div className="card-body p-4">
                                    <div style={{ fontSize: "2.5rem" }} className="mb-2">
                                        💰
                                    </div>
                                    <h3 className="text-farming">€120,000+</h3>
                                    <p className="text-muted">Equipment Costs Saved</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card h-100 border-0 shadow">
                                <div className="card-body p-4">
                                    <div style={{ fontSize: "2.5rem" }} className="mb-2">
                                        🌍
                                    </div>
                                    <h3 className="text-farming">5+</h3>
                                    <p className="text-muted">European Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-5 mb-5">
                <h2 className="text-center fw-bold text-farming mb-5">Meet Our Team</h2>
                <div className="row g-4">
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 text-center">
                            <div className="p-3">
                                <div
                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "120px", height: "120px" }}
                                >
                                    <span style={{ fontSize: "3rem" }}>👨‍🌾</span>
                                </div>
                                <h5 className="text-farming">Marko Petrović</h5>
                                <p className="text-muted small">Founder & CEO</p>
                                <p className="small">Former farmer with 15 years of experience in agricultural technology</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 text-center">
                            <div className="p-3">
                                <div
                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "120px", height: "120px" }}
                                >
                                    <span style={{ fontSize: "3rem" }}>👩‍💻</span>
                                </div>
                                <h5 className="text-farming">Ana Jovanović</h5>
                                <p className="text-muted small">CTO</p>
                                <p className="small">Agricultural engineer with expertise in farm management systems</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 text-center">
                            <div className="p-3">
                                <div
                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "120px", height: "120px" }}
                                >
                                    <span style={{ fontSize: "3rem" }}>👨‍💼</span>
                                </div>
                                <h5 className="text-farming">Milan Nikolić</h5>
                                <p className="text-muted small">Head of Partnerships</p>
                                <p className="small">10+ years experience in agricultural cooperatives and EU funding</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <div className="card h-100 text-center">
                            <div className="p-3">
                                <div
                                    className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                                    style={{ width: "120px", height: "120px" }}
                                >
                                    <span style={{ fontSize: "3rem" }}>👩‍🔬</span>
                                </div>
                                <h5 className="text-farming">Jelena Đorđević</h5>
                                <p className="text-muted small">Agricultural Specialist</p>
                                <p className="small">PhD in Agricultural Sciences with focus on sustainable farming practices</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Banking Partnership */}
            <section className="py-5 bg-farming-light rounded-3 mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <h2 className="fw-bold text-farming mb-4">Banking Partnership</h2>
                            <p>
                                SmartFarm partners with leading agricultural banks to provide farmers with tailored financial products
                                based on their platform activity.
                            </p>
                            <p>
                                Through our analytics tools, banks can offer targeted loans and financial products to farmers based on
                                their equipment usage patterns, purchase history, and farming activities.
                            </p>
                            <div className="alert alert-success mt-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <span style={{ fontSize: "1.5rem" }}>💡</span>
                                    </div>
                                    <div>
                                        <strong>Example:</strong> If our system detects you frequently rent a tractor, our banking partners
                                        can offer you a favorable loan to purchase your own equipment.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card card-farming border-0 shadow">
                                <div className="card-body p-4">
                                    <h3 className="text-farming mb-3">Financial Benefits</h3>
                                    <ul className="list-unstyled">
                                        <li className="mb-3">
                                            <div className="d-flex">
                                                <div className="me-3">
                                                    <div
                                                        className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                                                        style={{ width: "40px", height: "40px" }}
                                                    >
                                                        <span className="text-white">1</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="text-farming">Personalized Loans</h5>
                                                    <p className="small text-muted">
                                                        Receive loan offers tailored to your specific farming needs and usage patterns
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="mb-3">
                                            <div className="d-flex">
                                                <div className="me-3">
                                                    <div
                                                        className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                                                        style={{ width: "40px", height: "40px" }}
                                                    >
                                                        <span className="text-white">2</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="text-farming">Risk Analysis</h5>
                                                    <p className="small text-muted">
                                                        AI-powered risk assessment to help prevent poor investment decisions
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="me-3">
                                                    <div
                                                        className="rounded-circle bg-success d-flex align-items-center justify-content-center"
                                                        style={{ width: "40px", height: "40px" }}
                                                    >
                                                        <span className="text-white">3</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="text-farming">Financial Consulting</h5>
                                                    <p className="small text-muted">
                                                        Access to personalized financial consultations to maximize your farm investments
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-5">
                <h2 className="fw-bold text-farming mb-4">Join the SmartFarm Community</h2>
                <p className="lead mb-4">
                    Be part of the agricultural revolution that's helping farmers across Europe collaborate and thrive
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <a href="/register" className="btn btn-farming btn-lg">
                        Register Now
                    </a>
                    <a href="/contact" className="btn btn-outline-success btn-lg">
                        Contact Us
                    </a>
                </div>
            </section>
        </div>
    )
}
