import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* À propos */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">AutoLuxe</h3>
              <p className="text-sm">
                Votre plateforme de confiance pour acheter et vendre des voitures de qualité.
              </p>
            </div>

            {/* Liens rapides */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Liens rapides</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-blue-400 transition-colors">Catalogue</a></li>
                <li><a href="/add" className="hover:text-blue-400 transition-colors">Vendre</a></li>
                <li><a href="/signin" className="hover:text-blue-400 transition-colors">Connexion</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-bold text-lg mb-3">Contact</h3>
              <p className="text-sm">
                Email: contact@autoluxe.fr<br />
                Tél: +33 1 23 45 67 89
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-6 text-center text-sm">
            <p>&copy; 2025 AutoLuxe. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;