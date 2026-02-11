
import { Facebook, Instagram, MapPin, Mail, Phone, Youtube, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {


  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-3">
      

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-green-300 text-gray-300">All Products</Link></li>
              <li><Link to="/indoor-plants" className="hover:text-green-300 text-gray-300">Indoor Plants</Link></li>
              <li><Link to="/pots" className="hover:text-green-300 text-gray-300">Pots & Planters</Link></li>
              <li><Link to="/seeds" className="hover:text-green-300 text-gray-300">Seeds</Link></li>
              <li><Link to="/tools" className="hover:text-green-300 text-gray-300">Gardening Tools</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="hover:text-green-300 text-gray-300">Contact Us</Link></li>
              <li><Link to="/returns" className="hover:text-green-300 text-gray-300">Returns & Refunds</Link></li>
              <li><Link to="/faq" className="hover:text-green-300 text-gray-300">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-green-300 text-gray-300">Shipping Information</Link></li>
              <li><Link to="/about" className="hover:text-green-300 text-gray-300">About Us</Link></li>
            </ul>
          </div>

          {/* Locations & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Our Locations</h3>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">उरुळीकांचन</p>
                    <a 
                      href="https://g.co/kgs/TtyYfDr" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-green-300 hover:text-green-200"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">बीड आष्टी</p>
                    <a 
                      href="https://maps.app.goo.gl/5BR2ZyaGKtv7Xre96" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-green-300 hover:text-green-200"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </li>
               <li>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-200">खेडशिवापूर पुणे</p>
                    <a 
                      href="https://maps.app.goo.gl/XRU9DdMa61AQtEHq6?g_st=iw" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-green-300 hover:text-green-200"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-4 text-gray-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <a href="tel:+918007345005" className="text-gray-300 hover:text-green-300">
                  +91 8007345005
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 flex-shrink-0 text-gray-400" />
                <a href="mailto:hindavinursery@gmail.com" className="text-gray-300 hover:text-green-300">
                  hindavinursery@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="pt-8 border-t border-gray-700">
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/share/19Cm1i68xP/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 flex flex-col items-center gap-2 text-gray-300"
              aria-label="Facebook"
            >
              <div className="bg-blue-600 rounded-full p-2">
                <Facebook className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Facebook</span>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/hindavinursery05?igsh=MXZqeDVnMnRzOG9law==" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 flex flex-col items-center gap-2 text-gray-300"
              aria-label="Instagram"
            >
              <div className="bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded-full p-2">
                <Instagram className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Instagram</span>
            </a>
            
            {/* WhatsApp */}
            <a 
              href="https://wa.me/918007345005" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 flex flex-col items-center gap-2 text-gray-300"
              aria-label="WhatsApp"
            >
              <div className="bg-green-500 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <span className="text-xs">WhatsApp</span>
            </a>
            
            {/* YouTube */}
            <a 
              href="https://www.youtube.com/@HindaviNursery" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 flex flex-col items-center gap-2 text-gray-300"
              aria-label="YouTube"
            >
              <div className="bg-red-600 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <span className="text-xs">YouTube</span>
            </a>
            
            {/* Twitter/X */}
            <a 
              href="https://twitter.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 flex flex-col items-center gap-2 text-gray-300"
              aria-label="Twitter"
            >
              <div className="bg-black rounded-full p-2">
                <Twitter className="h-5 w-5 text-white" />
              </div>
              <span className="text-xs">Twitter</span>
            </a>
          </div>
          
          <p className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Hindavi Nursery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;