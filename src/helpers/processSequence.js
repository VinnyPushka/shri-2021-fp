/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';

const api = new Api();

const validate = (string) => {
    if (
        string.length < 10 &&
        string.length > 2 &&
        !isNaN(Number(string)) &&
        Number(string) > 0
    )
        return true;

    return false;
};
const getNumFromSting = (str) => Math.round(Number(str));
const getNumberLength = (num) => String(num).length;
const getSquare = (num) => num ** 2;
const getId = (num) => num % 3;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    writeLog(value);

    if (!validate(value)) return handleError('ValidationError');

    writeLog(getNumFromSting(value));

    api.get('https://api.tech/numbers/base', {
        from: 10,
        to: 2,
        number: value,
    })
        .catch((e) => console.log(e))

        .then(({ result }) => {
            writeLog(result);
            return getNumberLength(result);
        })
        .then((len) => {
            writeLog(len);
            return getSquare(len);
        })
        .then((square) => {
            writeLog(square);
            return getId(square);
        })
        .then((id) => {
            writeLog(id);
            api.get(`https://animals.tech/${id}`, id)
                .then(({ result }) => {
                    handleSuccess(result);
                })
                .catch((e) => console.log(e));
        });
};

export default processSequence;
