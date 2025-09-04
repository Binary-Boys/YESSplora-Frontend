import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../hooks/useAuthStore';
import NeonHalo from '../Animation/NeonHalo';
import { 
  Home, 
  Gamepad2, 
  Trophy, 
  QrCode, 
  Info,
  LogOut,
  User,
  Settings
} from 'lucide-react';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { team, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);

  const navigationItems = [
    {
      path: '/home',
      icon: Home,
      label: 'Home',
      color: 'primary'
    },
    {
      path: '/games',
      icon: Gamepad2,
      label: 'Games',
      color: 'secondary'
    },
    {
      path: '/leaderboard',
      icon: Trophy,
      label: 'Leaderboard',
      color: 'accent'
    },
    {
      path: '/scanner',
      icon: QrCode,
      label: 'Scanner',
      color: 'success'
    },
    {
      path: '/about',
      icon: Info,
      label: 'About',
      color: 'warning'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const getActiveTab = () => {
  //   return navigationItems.find(item => item.path === location.pathname) || navigationItems[0];
  // };

  return (
    <div className="min-h-screen bg-gradient-bg-dark flex flex-col">
      {/* Header */}
      <motion.header
        className="glass-effect px-4 py-3 relative z-20"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <NeonHalo intensity={0.8}>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-bg-primary rounded-xl flex items-center justify-center mr-3">
                <span className="text-neutral-light font-bold text-lg">Y</span>
              </div>
              <div>
                <h1 className="text-lg font-display font-semibold gradient-text">
                  YESSplora
                </h1>
                <p className="text-xs text-neutral-light text-opacity-80">
                  {team?.name || 'Team'}
                </p>
              </div>
            </div>
          </NeonHalo>

          <div className="flex items-center space-x-2">
            {/* Points Display */}
            <NeonHalo intensity={0.6}>
              <div className="bg-gradient-bg-primary text-neutral-light px-3 py-1 rounded-full text-sm font-medium">
                {team?.points || 0} pts
              </div>
            </NeonHalo>

            {/* Menu Button */}
            <NeonHalo intensity={0.6}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              >
                <User className="w-4 h-4 text-neutral-light" />
              </button>
            </NeonHalo>
          </div>
        </div>

        {/* User Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              className="absolute top-full left-0 right-0 glass-effect rounded-b-xl shadow-lg z-50 mt-1"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-4 space-y-3">
                <div className="border-b border-white border-opacity-20 pb-3">
                  <h3 className="font-medium text-neutral-light">{team?.name}</h3>
                  <p className="text-sm text-neutral-light text-opacity-80">
                    {team?.members?.map(m => m.name).join(', ') || 'No members'}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center px-3 py-2 text-sm text-neutral-light text-opacity-80 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-3 py-2 text-sm text-primary-accent hover:bg-primary-accent hover:bg-opacity-10 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <motion.nav
        className="glass-effect border-t border-white border-opacity-20 px-2 py-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-around">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NeonHalo key={item.path} intensity={isActive ? 0.8 : 0.4}>
                <motion.button
                  onClick={() => handleNavigation(item.path)}
                  className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-bg-primary text-neutral-light'
                      : 'text-neutral-light text-opacity-70 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 w-2 h-2 bg-primary-accent rounded-full"
                      layoutId="activeTab"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              </NeonHalo>
            );
          })}
        </div>
      </motion.nav>

      {/* Active Tab Indicator */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-bg-primary"
        layoutId="activeTabBar"
        initial={{ width: 0 }}
        animate={{ 
          width: `${100 / navigationItems.length}%`,
          x: `${(navigationItems.findIndex(item => item.path === location.pathname) || 0) * (100 / navigationItems.length)}%`
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default MainLayout;
