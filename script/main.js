/* eslint-disable eol-last */
// eslint-disable-next-line strict
'use strict';
window.addEventListener('DOMContentLoaded', () => {

    function countTimer(deadLine) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaning() {
            const dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 3600);

            return {
                timeRemaining,
                hours,
                minutes,
                seconds
            };
        }

        function updateClock() {
            const timer = getTimeRemaning();

            if (timer.hours >= 0 && timer.hours <= 9) {
                timerHours.textContent = `0${timer.hours}`;
            } else if (timer.hours < 0) {
                timerHours.textContent = '00';
            } else {
                timerHours.textContent = timer.hours;
            }
            if (timer.minutes >= 0 && timer.minutes <= 9) {
                timerMinutes.textContent = `0${timer.minutes}`;
            } else if (timer.minutes < 0) {
                timerMinutes.textContent = '00';
            } else {
                timerMinutes.textContent = timer.minutes;
            }
            if (timer.seconds >= 0 && timer.seconds <= 9) {
                timerSeconds.textContent = `0${timer.seconds}`;
            } else if (timer.seconds < 0) {
                timerSeconds.textContent = '00';
            } else {
                timerSeconds.textContent = timer.seconds;
            }
        }

        setInterval(updateClock, 1000);
    }

    countTimer('13 september 2020');
});
