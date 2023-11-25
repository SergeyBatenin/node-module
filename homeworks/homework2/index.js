const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'g', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@', '#', '$', '%', '&', '(', ')', ',', '.', '?', ';', ':', '/'];

const generateRandomIndex = (min, max) => {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

const shuffle = (array) => {
    let m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);

        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

const generatePassword = (minLength = 6, lowerCase = 1, upperCase = 1, digit = 1, special = 0) => {
    if (minLength < 6) {
        minLength = 8;
    }
    const password = [];

    password.push(symbols[generateRandomIndex(0, 25)]);
    password.push(symbols[generateRandomIndex(26, 51)]);
    password.push(symbols[generateRandomIndex(52, 61)]);

    for (let i = 0; i < lowerCase - 1; i++) {
        password.push(symbols[generateRandomIndex(0, 25)]);
    }
    for (let i = 0; i < upperCase - 1; i++) {
        password.push(symbols[generateRandomIndex(26, 51)]);
    }
    for (let i = 0; i < digit - 1; i++) {
        password.push(symbols[generateRandomIndex(52, 61)]);
    }
    for (let i = 0; i < special; i++) {
        password.push(symbols[generateRandomIndex(62, 75)]);
    }

    if (password.length < minLength) {
        const length = generateRandomIndex(minLength - password.length, minLength - password.length + 3);
        for (let i = 0; i < length; i++) {
            password.push(symbols[generateRandomIndex(0, 75)]);
        }
    }
    shuffle(password);
    return password.join('');
}

module.exports = { generatePassword };