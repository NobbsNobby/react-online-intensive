export const aunthHelper = (key) => {
    const localKey = localStorage.getItem(key);
    console.log(localKey);
    if (localKey === null) {
        localStorage.setItem(key, 'false');

        return false;
    }
    // Не сразу понял что в localStorage строки храняться и пришлось брать false в кавычки
    localKey === 'false'
        ? localStorage.setItem(key, 'true')
        : localStorage.setItem(key, 'false');

    return localKey;
};
