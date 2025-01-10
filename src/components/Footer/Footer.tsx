
const Footer = () => {
    return (
        <footer className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Product</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Features</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Pricing</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Company</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">About</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Blog</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Terms</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Connect</h3>
              <ul className="mt-4 space-y-4">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400">
              © 2024 ProjectHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;