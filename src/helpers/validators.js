import * as R from 'ramda';
/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

const isRed = R.equals('red');
const isGreen = R.equals('green');
const isNotWhite = R.compose(R.not, R.equals('white'));
const isNotRed = R.compose(R.not, isRed);
const isBlue = R.equals('blue');
const isOrange = R.equals('orange');

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({ star, square, triangle, circle }) => {
    if (triangle !== 'white' || circle !== 'white') {
        return false;
    }

    return star === 'red' && square === 'green';
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = ({ star, square, triangle, circle }) => {
    let count = 0;
    let args = [star, square, triangle, circle];
    for (let i = 0; i < args.length; i++) {
        if (isGreen(args[i])) count++;
        if (count === 2) return true;
    }
    return false;
};
// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
    let redCount = 0;
    let blueCount = 0;
    let args = [star, square, triangle, circle];
    for (let i = 0; i < args.length; i++) {
        if (isRed(args[i])) redCount++;
        else if (isBlue(args[i])) blueCount++;
    }
    return redCount === blueCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат
export const validateFieldN4 = ({ star, square, circle }) => {
    return isBlue(circle) && isRed(star) && isOrange(square);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
    const colorSet = {};
    let args = [star, square, triangle, circle];
    for (let i of args) {
        if (isNotWhite(i)) {
            colorSet[i] ? colorSet[i]++ : (colorSet[i] = 1);
            if (colorSet[i] === 3) return true;
        }
    }
    return false;
};

// 6. Две зеленые фигуры (одна из них треугольник), еще одна любая красная.
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
    if (triangle !== 'green') return false;
    if (!R.any(isRed)([star, square, circle])) return false;
    if (!R.any(isGreen)([star, square, circle])) return false;

    return true;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = ({ star, square, triangle, circle }) => {
    return R.all(isOrange)([star, square, triangle, circle]);
};

// 8. Не красная и не белая звезда.
export const validateFieldN8 = ({ star }) => {
    return R.allPass([isNotRed, isNotWhite])(star);
};

// 9. Все фигуры зеленые.
export const validateFieldN9 = ({ star, square, triangle, circle }) => {
    return R.all(isGreen)([star, square, triangle, circle]);
};

// 10. Треугольник и квадрат одного цвета (не белого)
export const validateFieldN10 = ({ triangle, square }) => {
    if (triangle !== square) return false;

    return R.all(isNotWhite)([triangle, square]);
};
