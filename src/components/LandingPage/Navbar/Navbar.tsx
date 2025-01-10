import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {user , loading} = useContext(AuthContext)
  if(loading) return <div>Loading...</div>
  console.log("navbar",user);
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-xl font-bold text-indigo-600">
                ProjectHub
              </a>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">About</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </div>
            </div>
            {
              user? 
              <Link to="/dashboard">
                <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
                  Go to Dashboard
                </button>
              </Link>
              :
              <div className="flex items-center space-x-4">
                <a 
                  href="/login"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Log in
                </a>
                <a
                  href="/register"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  Sign up
                </a>
              </div>
            }
          </div>
        </div>
      </nav>
    );
};

export default Navbar;