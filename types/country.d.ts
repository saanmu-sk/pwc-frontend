export interface Country {
  name: string;
  code: string;
  flag: string;
  region: string;
  population: number;
  currencies: { [key: string]: string };
  languages: string[];
  timezones: string[];
}
