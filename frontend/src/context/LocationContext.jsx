import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within LocationProvider');
  }
  return context;
};

const LocationProvider = ({ children }) => {
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Title case city name
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  const updateLocation = async (newPincode) => {
    if (newPincode.length !== 6 || !/^\d{6}$/.test(newPincode)) {
      setError('Please enter a valid 6-digit Indian PIN code');
      return false;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${newPincode}`);
      const data = await response.json();

      if (data[0]?.Status === 'Success' && data[0].PostOffice?.length > 0) {
        // Find nearest village or location name
        let cityName = '';
        for (const po of data[0].PostOffice) {
          if (po.Block && po.Block !== 'NA' && po.Name.toLowerCase().includes(po.Block.toLowerCase())) {
            cityName = po.Name;
            break;
          } else if (po.Name && !cityName) {
            cityName = po.Name;
          }
        }
        cityName = cityName || data[0].PostOffice[0].District || newPincode;
        const formattedCity = toTitleCase(cityName);

        setPincode(newPincode);
        setCity(formattedCity);

        localStorage.setItem('userPincode', newPincode);
        localStorage.setItem('userCity', formattedCity);

        return true;
      } else {
        setError('PIN code not serviceable');
        return false;
      }
    } catch (err) {
      setError('Network error. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const formattedLocation = city ? `${city} ${pincode}` : 'your location';

// Detect live location + load localStorage
  useEffect(() => {
    const getLiveLocation = () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('Live location:', latitude, longitude);
        
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en`);
          const data = await response.json();
          
          console.log('Geocode response:', data);
          
          if (data && data.address) {
            const cityName = data.address.city || data.address.town || data.address.village || 
                           data.address.county || data.address.state_district || data.address.region || 'your location';
            const formattedCity = toTitleCase(cityName);
            
            console.log('Detected city:', formattedCity);
            setCity(formattedCity);
            localStorage.setItem('userCity', formattedCity);
          }
        } catch (err) {
          console.error('Geocode error:', err);
        }
      }, (error) => {
        console.log('Geolocation error:', error.message);
      }, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      });
    };

    getLiveLocation();

    // Load localStorage fallback
    const savedPin = localStorage.getItem('userPincode');
    const savedCity = localStorage.getItem('userCity');
    if (savedPin && savedCity) {
      setPincode(savedPin);
      setCity(savedCity);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ 
      pincode, 
      city, 
      formattedLocation, 
      updateLocation, 
      loading,
      error,
      setError 
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;

