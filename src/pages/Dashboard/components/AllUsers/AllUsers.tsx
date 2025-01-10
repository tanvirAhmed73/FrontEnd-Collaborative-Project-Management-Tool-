
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, UserRound } from 'lucide-react';

export default function OnlineUsers() {
  const [isMobile, setIsMobile] = useState(false);

  // Dummy online users data
  const dummyUsers = [
    {
      id: "1",
      displayName: "John Doe",
      photoURL: "https://randomuser.me/api/portraits/men/1.jpg",
      online: true,
    },
    {
      id: "2",
      displayName: "Jane Smith",
      photoURL: "https://randomuser.me/api/portraits/women/1.jpg",
      online: false,
    },
    {
      id: "3",
      displayName: "Michael Brown",
      photoURL: "https://randomuser.me/api/portraits/men/2.jpg",
      online: true,
    },
    {
      id: "4",
      displayName: "Sarah Wilson",
      photoURL: "https://randomuser.me/api/portraits/women/2.jpg",
      online: true,
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 right-0 h-screen w-72 md:w-64 bg-gradient-to-b from-purple-600 to-indigo-700 text-white shadow-lg p-6 overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-8 border-b border-white/20 pb-4 flex items-center justify-center gap-2">
        <UserRound className="w-6 h-6" />
        All Users
      </h2>

      {/* Display users */}
      {dummyUsers.map((user) => (
        <motion.div
          key={user.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-end gap-3 mb-6 relative group"
        >
          {/* Online status indicator */}
          <span 
            className={`absolute w-3 h-3 rounded-full bottom-0 right-0 md:relative md:bottom-auto md:right-auto
              ${user.online ? 'bg-green-400' : 'bg-gray-400'} 
              transition-all duration-300 ease-in-out group-hover:scale-110`}
          ></span>
          
          {/* User's name (only show on desktop) */}
          {!isMobile && (
            <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors duration-200">
              {user.displayName}
            </span>
          )}
          
          {/* User's avatar */}
          <div className="relative">
            <img 
              src={user.photoURL} 
              alt={user.displayName}
              className="w-12 h-12 md:w-10 md:h-10 rounded-full border-2 border-white/50 transition-all duration-300 ease-in-out group-hover:border-white group-hover:scale-105" 
            />
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-1 -right-1 bg-indigo-500 rounded-full p-1"
            >
              <User className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

