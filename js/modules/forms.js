import{closeModalWindow, openModalWindow} from './modal';
import {postData} from '../services/services';
function forms(formSelector, modalTimerId) {
    //Forms
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'успех',
        failure: 'что-то пошло не так'
    };

    forms.forEach(item => { //на каждую форму подвязана postData
        bindPostData(item);
    });

    // const postData = async (url, data) => {
    //     const result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application/json'
    //         },
    //         body: data
    //     });

    //     return await result.json(); //Это промис
    // };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            //изначально добавляем в форму сообщение о загрузке
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); 

            const formData = new FormData(form);
           
            //form data  в  json
            const obj = {};
            formData.forEach(function(value, key){
                obj[key] = value;
            });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success); //поменяем сообщение о загрузке на сообщение об успехе  
                statusMessage.remove(); //удаление спинера
            }).catch(err => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();//очистка инпутов
            })
        });
    }

    function showThanksModal(message) { //вывод сообщения спасибо при отправке формы
        const prevModalDialog = document.querySelector('.modal__dialog'); // изначальный контент модального окна
        
        prevModalDialog.classList.add('hide'); //скрываем предыдущий контент
        openModalWindow('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class='modal__content'>
            <div class='modal__close' data-close>x</div>
            <div class='modal__title'>${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModalWindow('.modal');
        }, 4000);
    }

    fetch('http://localhost:3000/menu')  //получение данных с бд 
        .then(data => data.json())
        .then(res => console.log(res)); 
}

export default forms;