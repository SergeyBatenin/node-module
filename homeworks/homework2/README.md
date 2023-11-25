# Random password generator

## Установка пакета 
npm i my-generator-password

## Принцип работы
Функция генерации пароля может создавать пароль, который будет включать символы верхнего и нижнего регистра, цифры. Спецсимволы идут опционально.

Базовые параметры для генерации:  
minLength = 6  
lowerCase = 1  
upperCase = 1  
digit = 1  
special = 0

## Пример использования
```
const getPass = require('my-generator-password');
console.log(getPass.generatePassword(8, 2, 2, 2, 1));