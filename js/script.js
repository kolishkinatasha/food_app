import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModalWindow} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => { //скрипт сработает когда сформируется дом-дерево

    const modalTimerId = setTimeout(() => openModalWindow('.modal', modalTimerId), 5000); //открыть модалку через 5с

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2021-01-15');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide', 
        nextArrow: '.offer__slider-next', 
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total', 
        currentCounter: '#current', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
});

