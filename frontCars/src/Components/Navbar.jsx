import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              AutoLuxe
            </span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink to="/">Catalogue</NavLink>
            
            {token ? (
              <>
                <NavLink to="/add">Ajouter</NavLink>
                <NavLink to="/admin/cars">Gestion</NavLink>
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <NavLink to="/signin">Connexion</NavLink>
                <Link 
                  to="/signup"
                  className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 font-medium"
    >
      {children}
    </Link>
  );
};

export default Navbar;