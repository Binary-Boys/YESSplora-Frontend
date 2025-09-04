import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, User, Lock } from 'lucide-react';
import { useAuthStore } from '../../hooks/useAuthStore';

const AdminLoginIcon = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { adminLogin } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await adminLogin(credentials);
      setIsOpen(false);
      setCredentials({ username: '', password: '' });
    } catch (error) {
      console.error('Admin login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Admin Icon Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 p-3 bg-gradient-bg-primary text-neutral-light rounded-full shadow-lg hover:bg-gradient-bg-secondary transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        title="Admin Login"
      >
        <Settings className="w-5 h-5" />
      </motion.button>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              className="relative bg-gradient-bg-dark border border-primary-accent rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 text-neutral-light hover:text-primary-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-neutral-light" />
                </div>
                <h2 className="text-2xl font-bold text-neutral-light mb-2">Admin Login</h2>
                <p className="text-neutral-light text-opacity-80">Access admin dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors"
                    placeholder="Enter username"
                    required
                  />
                </div>

                <div>
                  <label className="block text-neutral-light text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={credentials.password}
                      onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-neutral-light placeholder-neutral-light placeholder-opacity-50 focus:outline-none focus:border-primary-accent transition-colors pr-12"
                      placeholder="Enter password"
                      required
                    />
                    <Lock className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-light text-opacity-50" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-bg-primary text-neutral-light rounded-lg font-semibold hover:bg-gradient-bg-secondary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-neutral-light border-t-transparent rounded-full animate-spin mr-2"></div>
                      Logging in...
                    </div>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminLoginIcon;
