interface EnvOptions {
    CHARACTER_URL: string;
}

const ENV: EnvOptions = {
    CHARACTER_URL: import.meta.env.VITE_CHARACTER_URL,
};

export default ENV;