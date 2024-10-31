export const Timer = () => {
    function updateTime(time) {
        const hours = formatTime(new Date(time).getUTCHours());
        const minutes = formatTime(new Date(time).getUTCMinutes());
        const seconds = formatTime(new Date(time).getUTCSeconds());

        timers.forEach(timer => {
            // timer.querySelector(".hours").textContent = hours;
            timer.querySelector(".minutes").textContent = minutes;
            timer.querySelector(".seconds").textContent = seconds;
        });
        const percentage = (remainingTime / totalTime) * 100;
        const timeLeftLine = document.querySelector('.timer__time-left-line')
        timeLeftLine.style.width = `${percentage}%`;
        if(percentage < 60 && percentage > 30) {
            timeLeftLine.style.backgroundColor = '#f9d20e'
        }
        if(percentage <= 30) {
            timeLeftLine.style.backgroundColor = '#ff523f'
        }
    }

    function formatTime(unit) {
        return unit >= 10 ? unit : "0" + unit;
    }

    function countdown() {
        if (remainingTime <= 0) {
            clearInterval(interval);
        } else {
            remainingTime -= 1000;
            updateTime(remainingTime);
        }
    }

    function startCountdown() {
        interval = setInterval(countdown, 1000);
    }

    const timers = document.querySelectorAll(".timer");
    const totalTime = 20 * 60 * 1000; // 20 minutes in milliseconds
    let remainingTime = totalTime;
    let interval;

    countdown();
    startCountdown();
}
