export const aunthHelper = (key) => {
    const localKey = localStorage.getItem(key);

    if (localKey === null) {
        localStorage.setItem(key, 'false');

        return false;
    }
    localKey === false
        ? localStorage.setItem(key, 'true')
        : localStorage.setItem(key, 'false');

    return localKey;
};
