/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) { 
    let [arr, func] = [array, fn];

    for (let i = 0; i < arr.length; i++) {
    
        func(arr[i], i, arr);
    
    }
  
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let [arr, func, newArr] = [array, fn, []];
    
    for (let i = 0; i < arr.length; i++) {
        newArr.push(func(arr[i], i, arr));
    }
    
    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let [arr, func, init] = [array, fn, initial];
    
    let result;
        
    if (init == undefined) {
        result = arr[0];
        for (let i = 1; i < arr.length; i++) {
            result = func(result, arr[i], i, arr);
        }
            
    } else {
        result = init;
        
        for (let i = 0; i < arr.length; i++) {
            result = func(result, arr[i], i, arr);
        }
    }
  
    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let upperArray = [];
  
    for (let prop in obj) {

        if (obj.hasOwnProperty(prop)) {
            upperArray.push(prop.toUpperCase());
        }
        
    }
  
    return upperArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  
    let proxy = new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;

            return true;
        }
    });
    
    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
