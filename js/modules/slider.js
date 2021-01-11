function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
     //слайдер 2 вариант
   
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const prev = document.querySelector(prevArrow);
    const next = document.querySelector(nextArrow);
    const total = document.querySelector(totalCounter);
    const current = document.querySelector(currentCounter);
    const slidesWrapper = document.querySelector(wrapper);
    const width = window.getComputedStyle(slidesWrapper).width;
    const slidesField = document.querySelector(field);

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%'; //блок шириной как все слайды в ряд
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
   
    slides.forEach(slide => {
        slide.style.width = width;
    });  
    
    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];

    indicators.classList.add('carousel-indicators');

    indicators.style.cssText =  `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;`;

        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    const dotsOpasity = () => {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
    }

    const currentText = () => {
        if (slides.length < 10) {
            current.textContent  = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    };

    const deleteNotDigits = (str) => {
        return +str.replace(/\D/g, '')
    }

    prev.addEventListener('click', () => {
        if(offset == 0) { 
            offset = deleteNotDigits(width) * (slides.length - 1)
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex --;
        }

        currentText();
        dotsOpasity();
    });

    next.addEventListener('click', () => {
        // if(offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
        if(offset == deleteNotDigits(width) * (slides.length - 1)) { 
            offset = 0
        } else {
            offset += deleteNotDigits(width)
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex ++;
        }

        currentText();
        dotsOpasity(); 
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentText();       
            dotsOpasity();
        })
    })
}

export default slider;