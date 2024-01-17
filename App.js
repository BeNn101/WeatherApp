import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View , ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import * as Location from 'expo-location';
import { ScrollView } from 'react-native';
import { styles } from './styles';



export default function App() {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {

        setLoading(true);

        
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
        fetchForecast(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error('Error getting location:', error);
      }finally {
        setLoading(false); 
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

  function fetchForecast(lat, lon) {
    const apiKey = 'ef7d32567dbed321820828d0ba33b91c';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=fr`;

    axios.get(forecastUrl)
      .then(function(response) {
        setForecastData(response.data.list);       
      })
      .catch(function(error) {
        console.error('Erreur lors de la récupération des données de prévision:', error);
      });
  }
  
  function formatForecastDate(dt_txt) {
    const date = new Date(dt_txt);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return {
      formattedDate: `${day}/${month}`,
      formattedTime: `${hours}:${minutes}`,
    };
  }

  return (
    <View style={[styles.container]}>
      {loading ? (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="black" />
        <Text style={styles.loadingText}>En cours de chargement , patientez</Text>
      </View>
    ) : (
      <>
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
            {forecastData && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.forecastCardSection}>
                  {forecastData.map((forecast, index) => {
                    const { formattedDate, formattedTime } = formatForecastDate(forecast.dt_txt);
  
                    return (
                      <View key={index} style={styles.forecastCard}>
                        <Text style={styles.forecastDate}>{formattedDate}</Text>
                        <Text style={styles.forecastTime}>{formattedTime}</Text>
                        <Text style={styles.forecastTemp}>{Math.floor(forecast.main.temp)}°C</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                          {forecast.weather[0].main.charAt(0).toUpperCase() +
                            forecast.weather[0].main.slice(1)}
                        </Text>
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={{
                            uri: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`,
                          }}
                        />
                      </View>
                      
                    );
                  })}
                </View>
                
              </ScrollView>
            )}
          
        
      </ImageBackground>
      </>
      )}
    </View>
  );
  
}

