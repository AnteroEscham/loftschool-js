/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {

    function random(min, max) {
        var rand = min + Math.random() * (max + 1 - min);

        rand = Math.floor(rand);
        
        return rand;
    }

    let div = document.createElement('div');

    div.classList.add('draggable-div');
    div.style.height = `${random(50, 300)}px`;
    div.style.width = `${random(50, 300)}px`;
    div.style.backgroundColor = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    div.style.position = 'absolute';
    div.style.top = `${random(0, 100)}%`;
    div.style.left = `${random(0, 100)}%`;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    
    target.setAttribute('draggable', true);
    target.style.cursor = 'move';

    target.addEventListener('dragstart', e => {
        const elem = e.currentTarget;

        elem.style.zIndex = '1000';
    });

    target.addEventListener('dragend', e => {
        const elem = e.currentTarget;

        elem.style.left = e.pageX - elem.offsetWidth / 2 + 'px';
        elem.style.top = e.pageY - elem.offsetHeight / 2 + 'px';

        elem.style.zIndex = '1000';
    });
 
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
