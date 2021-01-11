function timer(id, deadline) {
    //Timer

    function detTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); //кол-во ms до конечного времени - дата сейчас
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); //кол-во дней общее число мс делим на кол-во мс в дне
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24); // остаток от деления чтобы конвертировать лишние часы в дни
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();// чтобы не ждать первые 1000мс с timeInterval
        function updateClock() {
            const t = detTimeRemaining(endtime); //

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock(id, deadline);
}

export default timer;