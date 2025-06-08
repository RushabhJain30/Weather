import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sunrise, Sunset, Wind, Droplets, Eye, Thermometer, RefreshCw } from 'lucide-react';
import WeatherIcon from './components/WeatherIcon';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import { fetchWeatherData, fetchForecastData, WeatherData, ForecastData } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [location, setLocation] = useState('New York');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const handleSearch = async (searchLocation: string) => {
    if (!searchLocation.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        fetchWeatherData(searchLocation),
        fetchForecastData(searchLocation)
      ]);
      
      setWeather(weatherData);
      setForecast(forecastData);
      setLocation(searchLocation);
      setSearchTerm('');
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch weather data. Please check the location and try again.');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  const handleRefresh = () => {
    if (weather) {
      handleSearch(weather.location.name);
    }
  };

  useEffect(() => {
    handleSearch('New York');
  }, []);

  const getBackgroundGradient = () => {
    if (!weather) return 'from-blue-400 via-blue-500 to-blue-600';
    
    const condition = weather.current.condition.text.toLowerCase();
    const hour = new Date(weather.location.localtime).getHours();
    const isNight = hour < 6 || hour > 18;
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      return isNight 
        ? 'from-indigo-900 via-purple-900 to-blue-900' 
        : 'from-yellow-400 via-orange-400 to-pink-500';
    } else if (condition.includes('partly cloudy')) {
      return isNight
        ? 'from-slate-800 via-slate-700 to-slate-600'
        : 'from-blue-400 via-sky-400 to-cyan-400';
    } else if (condition.includes('overcast') || condition.includes('cloudy')) {
      return 'from-gray-500 via-gray-600 to-gray-700';
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return 'from-slate-600 via-blue-700 to-indigo-800';
    } else if (condition.includes('snow')) {
      return 'from-blue-100 via-blue-300 to-blue-500';
    } else if (condition.includes('thunder') || condition.includes('storm')) {
      return 'from-gray-800 via-slate-800 to-purple-900';
    } else if (condition.includes('mist') || condition.includes('fog')) {
      return 'from-gray-400 via-gray-500 to-gray-600';
    }
    return 'from-blue-400 via-blue-500 to-blue-600';
  };

  const getWeatherParticles = () => {
    if (!weather) return null;
    
    const condition = weather.current.condition.text.toLowerCase();
    
    if (condition.includes('sunny') || condition.includes('clear')) {
      const hour = new Date(weather.location.localtime).getHours();
      const isDaytime = hour >= 6 && hour <= 18;
      
      if (isDaytime) {
        return (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {/* Animated Sun */}
            <div className="absolute top-20 right-20 w-32 h-32 animate-sun-rotation">
              <div className="relative w-full h-full">
                {/* Sun rays */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-8 bg-yellow-300 opacity-80 animate-sun-rays"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0.5px 16px',
                      transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
                {/* Sun core */}
                <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-sun-glow shadow-2xl">
                  <div className="absolute inset-2 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            {/* Floating light particles */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-200 rounded-full opacity-60 animate-float-particles"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        );
      }
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-8 bg-blue-200 opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
                transform: `translateY(-100vh)`,
                animation: `fall ${1 + Math.random()}s linear infinite`
              }}
            />
          ))}
        </div>
      );
    } else if (condition.includes('snow')) {
      return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animation: `snowfall ${2 + Math.random() * 2}s linear infinite`
              }}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      {getWeatherParticles()}
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Weather Dashboard
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors duration-200" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search for a city..."
                className="w-full pl-12 pr-4 py-4 rounded-full border-0 shadow-2xl focus:ring-4 focus:ring-white/30 focus:outline-none text-gray-700 placeholder-gray-400 backdrop-blur-sm bg-white/90 transition-all duration-300 hover:bg-white/95"
              />
            </div>
          </form>

          {/* Refresh Button */}
          {weather && (
            <div className="flex justify-center items-center space-x-4 text-white/80">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
              {lastUpdated && (
                <span className="text-sm">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="text-center animate-pulse">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4"></div>
            <p className="text-white text-lg">Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 backdrop-blur border border-red-500/30 rounded-2xl p-6 text-white text-center mb-6 animate-shake">
            <div className="text-lg font-semibold mb-2">Oops! Something went wrong</div>
            <div>{error}</div>
          </div>
        )}

        {weather && forecast && !loading && (
          <div className="space-y-8 animate-fade-in-up">
            {/* Current Weather Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3 animate-slide-in-left">
                  <MapPin className="w-6 h-6 text-white/80 animate-bounce" />
                  <h2 className="text-2xl md:text-3xl font-semibold text-white">
                    {weather.location.name}, {weather.location.country}
                  </h2>
                </div>
                <div className="text-white/60 text-right animate-slide-in-right">
                  <p className="text-lg">{new Date(weather.location.localtime).toLocaleDateString()}</p>
                  <p className="text-sm">{new Date(weather.location.localtime).toLocaleTimeString()}</p>
                </div>
              </div>

              {/* Main Temperature Display */}
              <div className="text-center animate-scale-in mb-8">
                <div className="flex items-center justify-center space-x-6 mb-6">
                  <div className="animate-float">
                    <WeatherIcon 
                      condition={weather.current.condition.text}
                      size="large"
                    />
                  </div>
                  <div>
                    <div className="text-7xl md:text-8xl font-bold text-white animate-number-change">
                      {Math.round(weather.current.temp_c)}°
                    </div>
                    <div className="text-white/80 text-xl capitalize animate-fade-in">
                      {weather.current.condition.text}
                    </div>
                  </div>
                </div>
                
                {/* High/Low Temperatures */}
                <div className="flex justify-center space-x-8 text-white/80">
                  <div className="flex items-center space-x-2 hover:text-white transition-colors duration-200">
                    <Thermometer className="w-5 h-5 text-red-400" />
                    <span className="text-lg">H: {Math.round(forecast.forecast.forecastday[0].day.maxtemp_c)}°</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-white transition-colors duration-200">
                    <Thermometer className="w-5 h-5 text-blue-400" />
                    <span className="text-lg">L: {Math.round(forecast.forecast.forecastday[0].day.mintemp_c)}°</span>
                  </div>
                </div>
              </div>

              {/* Sunrise/Sunset */}
              <div className="flex justify-center space-x-12 pt-8 border-t border-white/20">
                <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                  <Sunrise className="w-6 h-6 text-yellow-300 group-hover:animate-pulse" />
                  <div className="text-white">
                    <div className="text-sm text-white/80">Sunrise</div>
                    <div className="font-semibold text-lg">{forecast.forecast.forecastday[0].astro.sunrise}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 cursor-pointer group">
                  <Sunset className="w-6 h-6 text-orange-300 group-hover:animate-pulse" />
                  <div className="text-white">
                    <div className="text-sm text-white/80">Sunset</div>
                    <div className="font-semibold text-lg">{forecast.forecast.forecastday[0].astro.sunset}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Forecast */}
            <div className="animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <HourlyForecast hourlyData={forecast.forecast.forecastday[0].hour} />
            </div>

            {/* Weather Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-500 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                <span>Weather Details</span>
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: Wind, label: 'Wind Speed', value: `${weather.current.wind_kph} km/h`, color: 'text-cyan-400' },
                  { icon: Droplets, label: 'Humidity', value: `${weather.current.humidity}%`, color: 'text-blue-400' },
                  { icon: Eye, label: 'Visibility', value: `${weather.current.vis_km} km`, color: 'text-purple-400' },
                  { icon: Thermometer, label: 'Feels like', value: `${Math.round(weather.current.feelslike_c)}°`, color: 'text-orange-400' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-white/10 rounded-2xl p-5 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-200`} />
                      <span className="text-white/80 text-sm font-medium">{item.label}</span>
                    </div>
                    <div className="text-white text-xl font-bold">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Forecast */}
            <div className="animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <DailyForecast dailyData={forecast.forecast.forecastday} />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
        
        @keyframes snowfall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes sun-rotation {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes sun-rays {
          0%, 100% {
            opacity: 0.6;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }
        
        @keyframes sun-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 255, 0, 0.5), 0 0 40px rgba(255, 255, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 255, 0, 0.5);
          }
        }
        
        @keyframes float-particles {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
            opacity: 0.6;
          }
          75% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.9;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        @keyframes number-change {
          from {
            transform: scale(1.1);
          }
          to {
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.8s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-number-change {
          animation: number-change 0.3s ease-out;
        }
        
        .animate-sun-rotation {
          animation: sun-rotation 20s linear infinite;
        }
        
        .animate-sun-rays {
          animation: sun-rays 2s ease-in-out infinite;
        }
        
        .animate-sun-glow {
          animation: sun-glow 3s ease-in-out infinite;
        }
        
        .animate-float-particles {
          animation: float-particles 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default App;