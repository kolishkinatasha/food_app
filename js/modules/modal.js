
const openModalWindow = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);

    // modalWindow.style.display = 'block'; или
    modal.classList.add('show');
    modal.classList.remove('hide');
    //уберем прокрутку окна при открытой модалке
    document.body.style.overflow = 'hidden';
    
    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId); //если человек сам открыл модалку то окно второй раз через 5с не откроется
    }
};

const closeModalWindow = (modalSelector) => {
    const modal = document.querySelector(modalSelector);

    // modalWindow.style.display = 'none'; или
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
};

function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal
    const modal = document.querySelector(modalSelector);
    const modalTrigger = document.querySelectorAll(triggerSelector);

    modalTrigger.forEach(item => {
    const modal = document.querySelector(modalSelector);
        item.addEventListener('click', () => openModalWindow(modalSelector, modalTimerId));
    });

    // modalCloseBtn.addEventListener('click', closeModalWindow);
    
    modal.addEventListener('click', (e) => {
        //если кликнуто на крестик по атрибуту то закрываем окно
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // если кликнуто по темной подложке
           closeModalWindow(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow(modalSelector);
        }
    });

   
    const showModalByScroll = () => {
        //если прокрученная часть плюс видимая в браузере часть больше или равны общей высоте страницы(видимой или скротов в скроллах)
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModalWindow(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll); //чтобы сработало один раз
        }
    };

    //открываем модалку исли пользователь долистал сайт до конца
    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModalWindow, openModalWindow}