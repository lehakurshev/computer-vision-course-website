import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-900 text-2xl">cvcourse<span
                    className="text-blue-500">.ru</span></span>
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <a href="#home" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Главная</a>
              <a href="#program" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Программа курса</a>
              <a href="#author" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Об авторе</a>
              <a href="#consultation" className="nav-link py-4 px-3 text-gray-700 hover:text-blue-500">Получить консультацию</a>
            </div>
            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button" onClick={toggleMobileMenu}>
                <svg className="w-6 h-6 text-gray-700" fill="none" strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <ul>
              <li><a href="#home" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Главная</a></li>
              <li><a href="#program" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Программа курса</a></li>
              <li><a href="#author" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Об авторе</a></li>
              <li><a href="#consultation" className="block text-sm px-2 py-4 hover:bg-blue-500 hover:text-white" onClick={closeMobileMenu}>Получить консультацию</a></li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  )
}

export default App
