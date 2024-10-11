interface LocationTypes {
  name: string;
  country: string;
  lat: string;
  lon: string;
  localtime: string;
}
interface conditionType {
  icon: string;
  text: string;
}
interface CurrentTypes {
  condition: conditionType;
  cloud: string;
  wind_mph: string;
  temp_c: string;
  temp_f: string;
}
interface conditionTypes {
  text: string;
  icon: string;
}
interface dayTypes {
  avgtemp_c: string;
  condition: conditionTypes;
}
export interface ForecastdayTypes {
  date: string;
  day: dayTypes;
}
interface ForecastTypes {
  forecastday: ForecastdayTypes[];
}

export interface WeatherTypes {
  location: LocationTypes;
  current: CurrentTypes;
  forecast: ForecastTypes;
}
export interface errorType {
  errorMsg: string | undefined;
}
export interface errorMsg {
  setErrorMsg: Function;
}
export interface weatherProp {
  weather?: ForecastdayTypes | null;
}
