import React from 'react';
import { motion } from 'motion/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Camera, Cloud, Bot, MapPin, Utensils } from 'lucide-react';
import { useLanguage } from './language-context';

interface EnhancedTabsProps {
  children: React.ReactNode;
  defaultValue: string;
}

const tabData = [
  { value: 'analysis', icon: Camera, label: 'Analysis', gradient: 'from-blue-500 to-cyan-500' },
  { value: 'weather', icon: Cloud, label: 'Weather', gradient: 'from-green-500 to-blue-500' },
  { value: 'doctor', icon: Bot, label: 'Doctor', gradient: 'from-purple-500 to-pink-500' },
  { value: 'hospitals', icon: MapPin, label: 'Hospitals', gradient: 'from-red-500 to-orange-500' },
  { value: 'nutrition', icon: Utensils, label: 'Nutrition', gradient: 'from-yellow-500 to-green-500' },
];

const EnhancedTabs: React.FC<EnhancedTabsProps> = ({ children, defaultValue }) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-lg border border-border/50 p-1 rounded-xl">
          {tabData.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <motion.div
                key={tab.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <TabsTrigger
                  value={tab.value}
                  className="relative flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:shadow-lg group"
                  data-gradient={tab.gradient}
                >
                  <div className="relative">
                    <Icon className="h-4 w-4 transition-all duration-300 group-data-[state=active]:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-data-[state=active]:opacity-20 rounded blur transition-opacity duration-300" style={{
                      backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`
                    }}></div>
                  </div>
                  <span className="hidden sm:inline font-medium">{tab.label}</span>
                  
                  {/* Active indicator */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                    whileInView={{ width: "60%", x: "-50%" }}
                    transition={{ duration: 0.3 }}
                  />
                </TabsTrigger>
              </motion.div>
            );
          })}
        </TabsList>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </Tabs>
  );
};

export default EnhancedTabs;