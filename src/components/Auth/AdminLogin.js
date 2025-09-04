import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import { Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate admin validation (replace with actual API call)
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        adminLogin({
          username: formData.username,
          id: 'admin_001',
          name: 'Administrator',
        });
        navigate('/admin');
      } else {
        alert('Invalid credentials');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold gradient-text">
                Admin Panel
              </h1>
              <p className="text-sm text-gray-600">YessPLORA Management</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Access the administrative dashboard to manage the treasure hunt
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                  placeholder="Enter admin password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-6 rounded-lg font-medium hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              {isLoading ? (
                <div className="loading-spinner w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                'Login to Admin Panel'
              )}
            </motion.button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h4>
            <div className="text-xs text-gray-600 space-y-1">
              <div>Username: admin</div>
              <div>Password: admin123</div>
            </div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          className="text-center mt-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Registration
          </button>
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="text-center mt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p className="text-xs text-gray-500">
            This is a secure admin panel. Unauthorized access is prohibited.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
