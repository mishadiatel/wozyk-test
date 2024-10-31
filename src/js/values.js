import uaFlag from '../assets/img/flags/ua.png'
import usFlag from '../assets/img/flags/us.png'
import plFlag from '../assets/img/flags/pl.png'
import deFlag from '../assets/img/flags/de.png'
import jpFlag from '../assets/img/flags/jp.png'
import esFlag from '../assets/img/flags/es.png'
import cnFlag from '../assets/img/flags/cn.png'

export const notEmptyPromocodeMessage = 'Промокод не може бути порожнім';

export const requiredFieldMessage = 'Це поле не може бути порожнім';

export const appliedPromocodeButtonText = 'Застосовано';

export const incorrectNumberFormat = 'Ви ввели не вірний номер'

export const countriesCodes = [
    { name: "Ukraine", code: "+380", flag: uaFlag },
    { name: "United States", code: "+1", flag: usFlag },
    { name: "Poland", code: "+48", flag: plFlag },
    { name: "Germany", code: "+49", flag: deFlag },
    { name: "Japan", code: "+81", flag: jpFlag },
    { name: "Spain", code: "+34", flag: esFlag },
    { name: "China", code: "+86", flag: cnFlag }
];

export const ticketTypes = [
    {label: 'Дорослий', discount: 0, active: true},
    {label: 'Дитина до 10 років', discount: 10},
    {label: 'Пенсіонер', discount: 15},
    {label: 'Людина з інвалідністю', discount: 20},
    {label: 'Учасник бойових дій', discount: 20},
    {label: 'Студент', discount: 5},
    {label: 'Домашній улюбленець', discount: 0},
]