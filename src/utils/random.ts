export const getRandomImageUrl = () => {
    const dimensions = { min: 200, max: 500};
    const getRandomDimension = () => Math.floor(Math.random() * (dimensions.max - dimensions.min + 1)) + dimensions.min;
    const width = getRandomDimension(); 
    const height = getRandomDimension();

    const themes = ["nature", "animal", "cat", "dog", "city", "food"];
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];

    const usePicsum = Math.random() < 0.5;

    if (usePicsum) {
        return `https://picsum.photos/${width}/${height}`;
    } else {
        return `https://loremflickr.com/${width}/${height}/${randomTheme}`;
    }
};

export const generateRandomPassword = (length = 12) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
};