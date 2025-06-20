import Search from '@/components/SearchBar'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiSearch, FiBell, FiTrendingUp, FiShield } from 'react-icons/fi';

const page = async () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <ToastContainer />
      
      {/* Hero Section */}
      <section className='relative flex pt-40 justify-center overflow-hidden'>
        <div className='absolute inset-0 bg-black'></div>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent'></div>
        
        {/* Floating Bubbles */}
        <div className='absolute inset-0 overflow-hidden'>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className='absolute rounded-full bg-blue-500/10 backdrop-blur-sm animate-float'
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 15 + 10}s`,
                opacity: Math.random() * 0.3 + 0.1
              }}
            />
          ))}
        </div>
        <div className='container mx-auto px-4 relative z-10'>
          <h1 className='text-5xl md:text-7xl font-bold text-center text-white'>
            PriceTracker
          </h1>
          <p className='text-lg text-zinc-400 text-center mt-3 max-w-md mx-auto'>
            Track prices. Save smarter.
          </p>
          <div className='mt-6 max-w-xl mx-auto'>
            <div className='relative'>
              <div className='absolute inset-0 bg-black/20 rounded-lg blur-[2px]'></div>
              <div className='relative bg-black/20 backdrop-blur-md rounded-lg p-1.5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]'>
                <div className='flex items-center'>
                  
                    <Search/>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <section className='relative pt-20 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black'></div>
        <div className='container mx-auto px-4 relative z-10'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            {[
              {
                number: '1M+',
                label: 'Products Tracked',
                icon: '📊'
              },
              {
                number: '50K+',
                label: 'Active Users',
                icon: '👥'
              },
              {
                number: '24/7',
                label: 'Price Monitoring',
                icon: '⏰'
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className='relative group'
              >
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500'></div>
                <div className='relative bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500'>
                  <div className='text-4xl mb-2'>{stat.icon}</div>
                  <div className='text-3xl font-bold text-white mb-1'>{stat.number}</div>
                  <div className='text-zinc-400'>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Interactive Price Demo */}
      <section className='pt-36 relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-black via-blue-900/5 to-black'></div>
        <div className='container mx-auto px-4 relative z-10'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Try It Now</h2>
          <div className='max-w-4xl mx-auto bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-blue-500/10'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='space-y-6'>
                <div className='p-4 rounded-lg bg-black/20 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 cursor-pointer group'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold text-white'>Dairy Products</h3>
                    <span className='text-green-400'>₹249</span>
                  </div>
                  <div className='h-2 bg-blue-500/20 rounded-full overflow-hidden'>
                    <div className='h-full bg-blue-500/40 rounded-full w-[85%]'></div>
                  </div>
                  <p className='text-sm text-zinc-400 mt-2'>15% below average</p>
                </div>
                <div className='p-4 rounded-lg bg-black/20 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 cursor-pointer group'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold text-white'>Electronics</h3>
                    <span className='text-red-400'>₹2,999</span>
                  </div>
                  <div className='h-2 bg-blue-500/20 rounded-full overflow-hidden'>
                    <div className='h-full bg-blue-500/40 rounded-full w-[65%]'></div>
                  </div>
                  <p className='text-sm text-zinc-400 mt-2'>5% above average</p>
                </div>
                <div className='p-4 rounded-lg bg-black/20 border border-blue-500/10 hover:border-blue-500/20 transition-all duration-300 cursor-pointer group'>
                  <div className='flex items-center justify-between mb-2'>
                    <h3 className='text-lg font-semibold text-white'>Home & Kitchen</h3>
                    <span className='text-yellow-400'>₹1,499</span>
                  </div>
                  <div className='h-2 bg-blue-500/20 rounded-full overflow-hidden'>
                    <div className='h-full bg-blue-500/40 rounded-full w-[75%]'></div>
                  </div>
                  <p className='text-sm text-zinc-400 mt-2'>2% below average</p>
                </div>
              </div>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-lg blur-xl'></div>
                <div className='relative bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-blue-500/10 h-full'>
                  <h3 className='text-xl font-semibold mb-4'>Price Chart</h3>
                  <div className='h-40 bg-gradient-to-r from-gray-900/50 to-black/50 rounded-lg p-6'>
                    {/* Price Chart */}
                    <div className='h-full flex items-end justify-between'>
                      {[60, 80, 70, 90, 85, 75, 65].map((height, index) => (
                        <div key={index} className='w-8 bg-blue-500/40 rounded-t-md' style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className='mt-4 flex justify-between text-sm text-zinc-400'>
                    <span>Last 7 days</span>
                    <span>Price trend: ↓ 5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='mt-36'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>Why Choose PriceTracker?</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {[
              {
                icon: <FiSearch className="w-8 h-8 text-purple-400" />,
                title: "Real-time Tracking",
                description: "Get instant price updates for your favorite products"
              },
              {
                icon: <FiBell className="w-8 h-8 text-blue-400" />,
                title: "Price Alerts",
                description: "Never miss a price drop with customizable notifications"
              },
              {
                icon: <FiTrendingUp className="w-8 h-8 text-purple-400" />,
                title: "Price History",
                description: "View historical price data to make informed decisions"
              }
            ].map((feature, index) => (
              <div key={index} className='p-6 rounded-lg bg-black/30 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300'>
                <div className='mb-4'>{feature.icon}</div>
                <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
                <p className='text-zinc-400'>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='pt-36'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-20'>How It Works</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto'>
            {[
              {
                step: "01",
                title: "Paste Product Link",
                description: "Simply paste the URL of the product you want to track"
              },
              {
                step: "02",
                title: "Set Price Alert",
                description: "Choose your target price and notification preferences"
              },
              {
                step: "03",
                title: "Get Notified",
                description: "Receive instant alerts when prices drop"
              }
            ].map((step, index) => (
              <div key={index} className='text-center'>
                <div className='w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4'>
                  <span className='text-2xl font-bold'>{step.step}</span>
                </div>
                <h3 className='text-xl font-semibold mb-2'>{step.title}</h3>
                <p className='text-zinc-400'>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Preview */}
      <section className='pt-36 pb-20 bg-black/50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>See It In Action</h2>
          <div className='max-w-2xl mx-auto bg-black/30 rounded-lg p-6 border border-purple-500/20'>
            <div className='flex items-center justify-between mb-4'>
              <div className='w-24 h-24 bg-purple-500/20 rounded-lg'>
                <img src="https://prompthero.ai/wp-content/uploads/2023/02/grid_0-8.webp" alt="Product" className='w-full h-full object-cover rounded-lg' />
              </div>
              <div className='flex-1 ml-4'>
                <h3 className='text-xl font-semibold'>Example Product</h3>
                <p className='text-zinc-400'>Current Price: ₹799</p>
              </div>
              <div className='text-right'>
                <p className='text-green-400'>-20%</p>
                <p className='text-zinc-400'>Lowest: ₹599</p>
              </div>
            </div>
            <div className='bg-black/30 rounded-lg p-6 border border-purple-500/20'>
              <div className='space-y-4'>
                <div className='flex justify-between items-center border-b border-purple-500/20 pb-3'>
                  <span className='text-zinc-400'>Highest Price</span>
                  <span className='text-red-400 font-semibold'>₹999</span>
                </div>
                <div className='flex justify-between items-center border-b border-purple-500/20 pb-3'>
                  <span className='text-zinc-400'>Lowest Price</span>
                  <span className='text-green-400 font-semibold'>₹599</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-zinc-400'>Average Price</span>
                  <span className='text-blue-400 font-semibold'>₹799</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className='py-12 bg-gradient-to-r from-purple-900/20 to-blue-900/20'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-2xl font-semibold'>Trusted by 1,000+ users worldwide</p>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-20 border-t border-purple-500/20'>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div>
              <h3 className='text-xl font-bold mb-4'>PriceTracker</h3>
              <p className='text-zinc-400'>Your ultimate price tracking solution</p>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Quick Links</h4>
              <ul className='space-y-2'>
                <li><a href="#" className='text-zinc-400 hover:text-white transition-colors'>About</a></li>
                <li><a href="#" className='text-zinc-400 hover:text-white transition-colors'>Contact</a></li>
                <li><a href="#" className='text-zinc-400 hover:text-white transition-colors'>Privacy</a></li>
              </ul>
            </div>
            <div>
              <h4 className='text-lg font-semibold mb-4'>Legal</h4>
              <ul className='space-y-2'>
                <li><a href="#" className='text-zinc-400 hover:text-white transition-colors'>Terms of Service</a></li>
                <li><a href="#" className='text-zinc-400 hover:text-white transition-colors'>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className='mt-8 pt-8 border-t border-purple-500/20 text-center text-zinc-400'>
            <p>&copy; 2024 PriceTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page
