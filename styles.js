import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',   
  },
  loadingText : {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
  overlay: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 32,
    color: 'white',
  },
  weatherInfo: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 20,
  },
  city: {
    fontSize: 33,
    fontWeight: 'bold',
    paddingBottom: 12,
  },
  temp: {
    fontSize: 25,
    color: 'black',
    borderColor: 'black',
    paddingBottom: 10,
  },
  weather: {
    fontSize: 20,
    shadowColor: 'black',
    color: 'white',
    shadowColor: '#111111',
    shadowOffset: { width: -2, height: 4 },
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
    shadowOpacity: 0.2,
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
  forecastCardSection: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 30,
  },
  forecastCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    padding: 28,
    margin: 8,
    alignItems: 'center',
  },
  forecastDate: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  forecastTime: {
    fontSize: 17,
    marginBottom: 6,
  },
  forecastTemp: {
    fontSize: 23,
    color: 'grey',
    marginBottom: 10,
  },
});
