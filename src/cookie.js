/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    let search = filterNameInput.value;
    let cookie = takeMeCookie();

    listTable.innerHTML = '';
    for (const prop in cookie) {
        if (cookie.hasOwnProperty(prop) && cookie[prop] != undefined) {

            if (isMatching(prop, search) || isMatching(cookie[prop], search)) {
                createRow(prop, cookie[prop]);
            }
            
        }
    }

});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    if (getCookie(addNameInput.value) == undefined) {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;
        
        if (isMatching(addValueInput.value, filterNameInput.value)) {
            createRow(addNameInput.value, addValueInput.value);
        }

    } else {
        document.cookie = `${addNameInput.value}=${addValueInput.value}`;

        if (isMatching(addValueInput.value, filterNameInput.value)) {
            for (const child of listTable.children) {
                if (child.firstElementChild.innerText == addNameInput.value) {
    
                    child.firstElementChild.nextElementSibling.innerText = addValueInput.value;
                }
            }
        } else {
            for (const child of listTable.children) {
                if (child.firstElementChild.innerText == addNameInput.value) {
    
                    listTable.removeChild(child);
                }
            }
        }

    }

});

function takeMeCookie() {
    let cookie = document.cookie.split(';').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});

    return cookie;
}

function createRow (name, value) {

    let row = document.createElement('tr');

    row.classList.add('row');
    row.innerHTML = `<td>${name}</td><td>${value}</td><td><button class='delete'>Удалить</button></td>`;

    listTable.appendChild(row);
}

function appendCookie () {
    const myCookie = takeMeCookie();

    for (const prop in myCookie) {
        if (myCookie.hasOwnProperty(prop) && myCookie[prop] != undefined ) {
            createRow(prop, myCookie[prop]);
        }
    }
}

function btnListener() {

    listTable.addEventListener('click', e => {
        let elem = e.target;

        if (elem.tagName == 'BUTTON') {
            listTable.removeChild(elem.closest('.row'));
            let cookieName = elem.closest('.row').firstElementChild.innerText;

            deleteCookie(cookieName);
        } 
    });
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == 'number' && expires) {
        var d = new Date();

        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + '=' + value;

    for (var propName in options) {
        if (propName) {
            updatedCookie += '; ' + propName;
            var propValue = options[propName];

            if (propValue !== true) {
                updatedCookie += '=' + propValue;
            }
        }

    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    setCookie(name, '', {
        expires: -1
    })
}

function isMatching(full, chunk) {
    let fullStr = full.toLowerCase(),
        chunkStr = chunk.toLowerCase();

    if (fullStr.indexOf(chunkStr) != -1) {
        return true;
    }

    return false;

}

appendCookie();
btnListener();
