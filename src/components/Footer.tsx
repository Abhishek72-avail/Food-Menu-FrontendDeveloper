import React from 'react';
import { UtensilsCrossed, Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-white">FoodieHub</span>
            </div>
            <p className="text-sm leading-relaxed">
            "Savor the Flavor, Share the Joy – FoodieHub, Where Every Bite Feels Like Home!"
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-900 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-red-600 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FoodieHub One</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">FoodieHub Instamart</a></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  12345-Food Street, vadodara,Gujarat.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">1800-555-777</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">support@foodiehub.com</span>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Sitemap</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 px-4 py-6">
          <p className="text-sm text-center flex flex-col items-center">
          <UtensilsCrossed className="text-h-6-w-6-center  text-orange-500 mb -2" />
          <span className="text-1xl font-bold text-white">FoodieHub  </span>
           ©2024 Bundle Technologies Pvt. Ltd
          </p>
        </div>
      </div>
    </footer>
  );
}