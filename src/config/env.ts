interface ConfigOptions {
    CHARACTER_URL: string;
}

const CONFIG: ConfigOptions = {
    CHARACTER_URL: import.meta.env.VITE_CHARACTER_URL,
};

export default CONFIG;