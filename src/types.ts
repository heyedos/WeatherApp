interface coordProps {
  lat: number;
  lon: number;
}
interface cityProps {
  coord: coordProps;
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
}
interface cloudProps {
  all: number;
}
interface mainProps {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
}
interface weatherProps {
  description: string;
  icon: string;
  id: number;
  main: string;
}
interface windProps {
  deg: number;
  gust: number;
  speed: number;
}
interface listProps {
  clouds: cloudProps;
  dt: number;
  dt_txt: string;
  main: mainProps;
  weather: weatherProps[];
  wind: windProps;
}
export interface weatherApp {
  city: cityProps;
  list: listProps[];
}

interface LatLonProp {
  latitude: number;
  longitude: number;
}
export interface positionProps {
  coords: LatLonProp;
}
export interface optionsProps {
  weekday: "long" | "short" | "narrow";
  year: "numeric" | "2-digit";
  month: "long" | "short" | "narrow" | "numeric" | "2-digit";
  day: "numeric" | "2-digit";
}
