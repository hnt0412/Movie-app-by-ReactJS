const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey: '25ed72b8728c3a506b772fde3685367b',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;