export interface AppConfig {
    colors: { [key: string]: string; }; // A simple string->string map.
    defaultRepository: string;
}
