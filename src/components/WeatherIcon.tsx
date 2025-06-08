import React from 'react';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow, 
  CloudDrizzle,
  CloudLightning,
  Cloudy,
  Moon,
  CloudMoon
} from 'lucide-react';

interface WeatherIconProps {
  condition: string;
  size?: 'small' | 'medium' | 'large';
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 'medium' }) => {
  const conditionLower = condition.toLowerCase();
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-20 h-20'
  };

  const iconSize = sizeClasses[size];
  const iconClass = `${iconSize} text-white drop-shadow-lg transition-all duration-300 hover:scale-110`;

  if (conditionLower.includes('sunny') || conditionLower.includes('clear day')) {
    return <Sun className={`${iconClass} text-yellow-300 animate-pulse`} />;
  } else if (conditionLower.includes('clear night')) {
    return <Moon className={`${iconClass} text-blue-200`} />;
  } else if (conditionLower.includes('partly cloudy') && conditionLower.includes('night')) {
    return <CloudMoon className={`${iconClass} text-blue-200`} />;
  } else if (conditionLower.includes('partly cloudy') || conditionLower.includes('partly sunny')) {
    return <Cloudy className={`${iconClass} text-gray-200`} />;
  } else if (conditionLower.includes('overcast') || conditionLower.includes('cloudy')) {
    return <Cloud className={`${iconClass} text-gray-300`} />;
  } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
    return <CloudRain className={`${iconClass} text-blue-300`} />;
  } else if (conditionLower.includes('drizzle') || conditionLower.includes('mist')) {
    return <CloudDrizzle className={`${iconClass} text-blue-200`} />;
  } else if (conditionLower.includes('snow') || conditionLower.includes('blizzard')) {
    return <CloudSnow className={`${iconClass} text-white`} />;
  } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <CloudLightning className={`${iconClass} text-purple-300 animate-pulse`} />;
  }
  
  // Default fallback
  return <Sun className={`${iconClass} text-yellow-300`} />;
};

export default WeatherIcon;