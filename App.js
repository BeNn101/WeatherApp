import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import * as Location from 'expo-location';


export default function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          lat: location.coords.latitude,
          lon: location.coords.longitude,
        });

        fetchWeather(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      }
        
    })();
  }, []);
  function fetchWeather(lat, lon) {
    const apiKey = 'ef7d32567dbed321820828d0ba33b91c';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

    axios.get(url)
      .then(function(response) {
        setWeatherData(response.data);
      })
      .catch(function(error) {
        console.error('Erreur lors de la récupération des données météorologiques:', error);
      });
  }

  // function fetchForecast(lat, lon) {
  //   const apiKey = 'ef7d32567dbed321820828d0ba33b91c';
  //   const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr&cnt=40`;

  //   axios.get(forecastUrl)
  //     .then(function(response) {
  //       setForecastData(response.data.list);
  //     })
  //     .catch(function(error) {
  //       console.error('Erreur lors de la récupération des données de prévision:', error);
  //     });
  // }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./img/picture.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
        <Text style={styles.title}>App Météo </Text>
        </View>
        {weatherData && (
          <View style={styles.weatherInfo}>
            <Text style={styles.city}>{weatherData.name}</Text>
            <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
            <Text style={styles.weather}>
              {weatherData.weather[0].description.charAt(0).toUpperCase() +
                weatherData.weather[0].description.slice(1)}
            </Text>
            {weatherData.weather[0].icon && (
              <Image
                style={{ width: 50, height: 50 }} 
                source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png` }}
              />
            )}
          </View>
        )}
      <View style={styles.forecastSection}>
        <Text style={styles.forecastTitle}>Prévisions</Text>
      </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {    
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignItems : 'center',   
    justifyContent : 'center',
    paddingTop: 32,
    color: 'white', 
  },
  weatherInfo: {
    backgroundColor : 'rgba(128, 128, 128, 0.5)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center', 
    margin : 16,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom : 20,
  },
  city: {
    fontSize : 33,
    fontWeight : 'bold',
    paddingBottom : 12
  },
  temp : {
    fontSize : 25,
    color : 'blue',
    borderColor : 'black',
    paddingBottom : 10,
  },
  weather : {
    fontSize : 20,
    shadowColor : 'black',
    color : 'white',
    shadowColor : '#111111',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

  },
  forecastSection: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    shadowColor: 'white',
    shadowOffset: { width: -2, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 3,
  
  },
  forecastTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

 