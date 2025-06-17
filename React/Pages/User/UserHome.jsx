"use client"

import { useState } from "react"
import {
  FiMenu,
  FiX,
  FiUsers,
  FiBarChart2,
  FiSmartphone,
  FiCheck,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMapPin,
  FiPlus,
  FiMinus,
} from "react-icons/fi"
import { FaQrcode, FaStar, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa"

export default function QRCodeMenuLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <FaQrcode className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold">QRMenu</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium hover:text-green-600 transition-colors">
              Services
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition-colors">
              Pricing
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition-colors">
              How It Works
            </a>
            <a href="#faq" className="text-sm font-medium hover:text-green-600 transition-colors">
              FAQ
            </a>
            <a href="#about" className="text-sm font-medium hover:text-green-600 transition-colors">
              About
            </a>
            <a href="#blog" className="text-sm font-medium hover:text-green-600 transition-colors">
              Blog
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="h-9 px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Login
            </button>
            <button className="h-9 px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Register
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 bg-white">
            <nav className="flex flex-col space-y-4">
              <a href="#services" className="text-sm font-medium hover:text-green-600 transition-colors">
                Services
              </a>
              <a href="#pricing" className="text-sm font-medium hover:text-green-600 transition-colors">
                Pricing
              </a>
              <a href="#how-it-works" className="text-sm font-medium hover:text-green-600 transition-colors">
                How It Works
              </a>
              <a href="#faq" className="text-sm font-medium hover:text-green-600 transition-colors">
                FAQ
              </a>
              <a href="#about" className="text-sm font-medium hover:text-green-600 transition-colors">
                About
              </a>
              <a href="#blog" className="text-sm font-medium hover:text-green-600 transition-colors">
                Blog
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <button className="w-full px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Login
                </button>
                <button className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Register
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Restaurant with QR Code Menus
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Create digital menus, collect customer reviews, and boost your business with our easy-to-use QR code
                    platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Get Started Free
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    See How It Works
                  </button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="QR Code Menu Preview"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full relative z-10"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need for Digital Menus
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to create, manage, and optimize your restaurant's digital
                  presence.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FaQrcode className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">QR Code Menus</h3>
                <p className="text-gray-500">
                  Create beautiful digital menus that customers can access instantly by scanning a QR code.
                </p>
              </div>
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FaStar className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Customer Reviews</h3>
                <p className="text-gray-500">
                  Collect and showcase customer reviews to build trust and improve your service.
                </p>
              </div>
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FiBarChart2 className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Analytics Dashboard</h3>
                <p className="text-gray-500">
                  Track menu views, popular items, and customer feedback with our comprehensive analytics.
                </p>
              </div>
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FiSmartphone className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Mobile Optimized</h3>
                <p className="text-gray-500">
                  Menus that look great on any device, ensuring a seamless experience for all customers.
                </p>
              </div>
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FiUsers className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Multi-language Support</h3>
                <p className="text-gray-500">
                  Cater to international customers with menus available in multiple languages.
                </p>
              </div>
              <div className="p-6 space-y-4 text-center shadow-lg hover:shadow-xl transition-shadow rounded-lg border border-gray-200">
                <div className="mx-auto bg-green-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <FiArrowRight className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold">Easy Integration</h3>
                <p className="text-gray-500">
                  Seamlessly integrate with your existing systems and social media platforms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">Process</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How QRMenu Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started in minutes with our simple three-step process.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold">Create Your Menu</h3>
                <p className="text-gray-500">
                  Upload your menu items, add descriptions, prices, and photos using our intuitive dashboard.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold">Generate QR Codes</h3>
                <p className="text-gray-500">
                  Create custom QR codes for your tables, print them, or add them to your existing materials.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold">Collect Reviews</h3>
                <p className="text-gray-500">
                  Customers scan, view your menu, and can leave reviews directly through the same platform.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                Start Creating Your Menu
              </button>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for your business. All plans include core features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="p-6 space-y-6 border-2 border-gray-200 rounded-lg">
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Starter</h3>
                  <p className="text-gray-500">For small restaurants just getting started</p>
                  <div className="flex justify-center items-baseline">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>1 QR code menu</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Basic analytics</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Customer reviews</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Get Started
                </button>
              </div>
              <div className="p-6 space-y-6 border-2 border-green-600 rounded-lg shadow-lg relative">
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                  Popular
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Professional</h3>
                  <p className="text-gray-500">For growing restaurants with multiple menus</p>
                  <div className="flex justify-center items-baseline">
                    <span className="text-4xl font-bold">$79</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>5 QR code menus</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Customer reviews & responses</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Multi-language support</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Get Started
                </button>
              </div>
              <div className="p-6 space-y-6 border-2 border-gray-200 rounded-lg">
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-gray-500">For restaurant chains and large establishments</p>
                  <div className="flex justify-center items-baseline">
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-gray-500 ml-1">/month</span>
                  </div>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Unlimited QR code menus</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Enterprise analytics</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>White-label solution</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="h-5 w-5 text-green-600 mr-2" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
                <button className="w-full px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it. Here's what restaurant owners have to say about QRMenu.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 space-y-4 rounded-lg border border-gray-200 bg-white">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500">
                  "QRMenu has transformed how we operate. Our customers love the digital menus, and we've seen a
                  significant increase in reviews."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Cafe Deluxe</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 rounded-lg border border-gray-200 bg-white">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500">
                  "The analytics have been eye-opening. We've optimized our menu based on the data and increased our
                  profits by 20%."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                  <div>
                    <p className="font-medium">Michael Chen</p>
                    <p className="text-sm text-gray-500">Fusion Bistro</p>
                  </div>
                </div>
              </div>
              <div className="p-6 space-y-4 rounded-lg border border-gray-200 bg-white">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500">
                  "Setting up was incredibly easy. We were up and running in less than a day, and the customer support
                  has been excellent."
                </p>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-gray-300 h-10 w-10"></div>
                  <div>
                    <p className="font-medium">Elena Rodriguez</p>
                    <p className="text-sm text-gray-500">Tapas & More</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about our QR code menu and review system.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              {[
                {
                  question: "How do I create a QR code menu?",
                  answer:
                    "Creating a QR code menu is simple. Sign up for an account, upload your menu items with descriptions and prices, customize the design, and generate your QR code. You can then print it or display it digitally.",
                },
                {
                  question: "Can I update my menu in real-time?",
                  answer:
                    "Yes! One of the biggest advantages of QR code menus is that you can update them instantly. Change prices, add seasonal items, or remove out-of-stock dishes in real-time without reprinting anything.",
                },
                {
                  question: "How do customers leave reviews?",
                  answer:
                    "After viewing your menu, customers will see an option to leave a review. They can rate their experience and provide feedback directly through their phone, making the process seamless and increasing review rates.",
                },
                {
                  question: "Is it difficult to set up?",
                  answer:
                    "Not at all. Our platform is designed to be user-friendly, even for those with limited technical experience. Most restaurants can set up their digital menu in under an hour, and our support team is always available to help.",
                },
                {
                  question: "Can I customize the design of my menu?",
                  answer:
                    "Absolutely. You can customize colors, fonts, layout, and add your restaurant's logo to ensure your digital menu matches your brand identity perfectly.",
                },
                {
                  question: "What analytics do you provide?",
                  answer:
                    "Our analytics dashboard shows you which menu items are viewed most frequently, peak viewing times, customer ratings, and review trends. This data helps you optimize your menu and improve customer satisfaction.",
                },
              ].map((faq, index) => (
                <div key={index} className="border rounded-lg">
                  <button
                    className="flex w-full items-center justify-between p-4 text-left font-medium"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    {openFaq === index ? (
                      <FiMinus className="h-5 w-5 text-green-600" />
                    ) : (
                      <FiPlus className="h-5 w-5 text-green-600" />
                    )}
                  </button>
                  {openFaq === index && <div className="p-4 pt-0 text-gray-500">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-green-600 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Restaurant?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of restaurants already using QRMenu to enhance their customer experience.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <button className="px-4 py-2 rounded-md bg-white text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                  Get Started Free
                </button>
                <button className="px-4 py-2 rounded-md border border-white text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">
                    Contact Us
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Have questions or need assistance? Our team is here to help you get started with QRMenu.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <FiMail className="h-5 w-5 text-green-600" />
                    <span>support@qrmenu.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiPhone className="h-5 w-5 text-green-600" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <FiMapPin className="h-5 w-5 text-green-600" />
                    <span>123 Restaurant Row, Foodie City, FC 12345</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <FaFacebookF className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <FaTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                  <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a href="#" className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <FaLinkedinIn className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="How can we help you?"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <button className="w-full px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm text-green-600">About Us</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h2>
                <p className="text-gray-500 md:text-xl/relaxed">
                  QRMenu was founded in 2020 when restaurants were looking for contactless solutions. What started as a
                  simple QR code generator has evolved into a comprehensive platform for digital menus and customer
                  reviews.
                </p>
                <p className="text-gray-500 md:text-xl/relaxed">
                  Our mission is to help restaurants embrace digital transformation, enhance customer experiences, and
                  grow their business through technology that's accessible to everyone.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <button className="px-4 py-2 rounded-md bg-green-600 text-white text-sm font-medium shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Learn More
                  </button>
                  <button className="px-4 py-2 rounded-md border border-gray-200 text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                    Meet Our Team
                  </button>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
                <img
                  src="/placeholder.svg?height=550&width=550"
                  alt="Our Team"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full relative z-10"
                  width={550}
                  height={550}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaQrcode className="h-6 w-6 text-green-600" />
                <span className="text-lg font-bold">QRMenu</span>
              </div>
              <p className="text-sm text-gray-500">Digital menus and reviews for modern restaurants.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Product</h3>
              <nav className="flex flex-col space-y-2 text-sm text-gray-500">
                <a href="#" className="hover:text-green-600">
                  Features
                </a>
                <a href="#" className="hover:text-green-600">
                  Pricing
                </a>
                <a href="#" className="hover:text-green-600">
                  Testimonials
                </a>
                <a href="#" className="hover:text-green-600">
                  FAQ
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Company</h3>
              <nav className="flex flex-col space-y-2 text-sm text-gray-500">
                <a href="#" className="hover:text-green-600">
                  About
                </a>
                <a href="#" className="hover:text-green-600">
                  Blog
                </a>
                <a href="#" className="hover:text-green-600">
                  Careers
                </a>
                <a href="#" className="hover:text-green-600">
                  Contact
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Resources</h3>
              <nav className="flex flex-col space-y-2 text-sm text-gray-500">
                <a href="#" className="hover:text-green-600">
                  Help Center
                </a>
                <a href="#" className="hover:text-green-600">
                  Documentation
                </a>
                <a href="#" className="hover:text-green-600">
                  Guides
                </a>
                <a href="#" className="hover:text-green-600">
                  API Reference
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Legal</h3>
              <nav className="flex flex-col space-y-2 text-sm text-gray-500">
                <a href="#" className="hover:text-green-600">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-green-600">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-green-600">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-green-600">
                  GDPR
                </a>
              </nav>
            </div>
          </div>
          <div className="mt-10 border-t pt-6 flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs text-gray-500">© {new Date().getFullYear()} QRMenu. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaFacebookF className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-green-600">
                <FaLinkedinIn className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
