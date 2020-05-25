class Timer {
    constructor() {
        this.time = null;
        this.historyTime = null;
        this.hours = null;
        this.minutes = null;
        this.seconds = null;
        this.countOff = null;
        this.audio = new Audio('assets/alarm.mp3');

        this.UiSelectors = {
            hours: '[data-hours]',
            minutes: '[data-minutes]',
            seconds: '[data-seconds]',
            confirmBtn: '[data-confirm]',
            editBtn: '[data-edit]',
            startBtn: '[data-start]',
            playBtn: '[data-play]',
            pauseBtn: '[data-pause]',
            rerunBtn: '[data-rerun]',
            alarmBtn: '[data-alarm]',
        }
    }

    initializeTimer() {
        this.hours = document.querySelector(this.UiSelectors.hours);
        this.minutes = document.querySelector(this.UiSelectors.minutes);
        this.seconds = document.querySelector(this.UiSelectors.seconds);
        this.confirmBtn = document.querySelector(this.UiSelectors.confirmBtn);
        this.editBtn = document.querySelector(this.UiSelectors.editBtn);
        this.startBtn = document.querySelector(this.UiSelectors.startBtn);
        this.playBtn = document.querySelector(this.UiSelectors.playBtn);
        this.pauseBtn = document.querySelector(this.UiSelectors.pauseBtn);
        this.rerunBtn = document.querySelector(this.UiSelectors.rerunBtn);
        this.alarmBtn = document.querySelector(this.UiSelectors.alarmBtn);
        this.addEventListeners();
    }

    addEventListeners() {
        this.confirmBtn.addEventListener('click', () => this.timerConfirm());
        this.playBtn.addEventListener('click', () => this.timerStart());
        this.rerunBtn.addEventListener('click', () => this.timerRerun());
        this.pauseBtn.addEventListener('click', () => this.timerPause(this.countOff));
        this.editBtn.addEventListener('click', () => this.timerEdit(this.countOff));
        this.alarmBtn.addEventListener('click', () => this.timerAlarm(this.countOff));
    }

    toggleShowElement(...elements) {
        elements.forEach((element) => element.classList.toggle('hide'));
    }

    toggleDisabledElement(...elements) {
        elements.forEach((element) => {
            element.disabled ? element.removeAttribute('disabled') : element.setAttribute('disabled', 'true');
        })
    }

    timerConfirm() {
        this.historyTime = [this.hours.value, this.minutes.value, this.seconds.value];
        this.time = Number(this.hours.value) * 60 * 60 + Number(this.minutes.value) * 60 + Number(this.seconds.value);
        this.toggleShowElement(this.confirmBtn, this.editBtn)

        this.toggleDisabledElement(this.startBtn, this.hours, this.minutes, this.seconds);
    }

    timerStart() {
        this.toggleShowElement(this.playBtn, this.pauseBtn)

        this.countOff = setInterval(() => {
            this.time--;
            let h = Math.floor(this.time / (60 * 60));
            let m = Math.floor(this.time % (60 * 60) / 60);
            let s = Math.floor(this.time % 60);
            h = h < 10 ? `0${h}` : h;
            m = m < 10 ? `0${m}` : m;
            s = s < 10 ? `0${s}` : s;
            this.hours.value = h;
            this.minutes.value = m;
            this.seconds.value = s;

            if (this.time == 0) {
                clearInterval(this.countOff);
                this.audio.play();
                this.toggleShowElement(this.alarmBtn);
            }
        }, 1000)
    }

    timerPause(countOff) {
        this.toggleShowElement(this.pauseBtn, this.playBtn);
        clearInterval(this.countOff);
    }

    timerRerun() {
        this.hours.value = this.historyTime[0];
        this.minutes.value = this.historyTime[1];
        this.seconds.value = this.historyTime[2];
        this.time = Number(this.hours.value) * 60 * 60 + Number(this.minutes.value) * 60 + Number(this.seconds.value);
    }

    timerEdit(countOff) {
        this.timerPause(this.countOff);
        this.toggleShowElement(this.confirmBtn, this.editBtn, this.pauseBtn, this.playBtn);
        this.toggleDisabledElement(this.hours, this.minutes, this.seconds, this.startBtn);
    }

    timerAlarm(countOff) {
        this.timerEdit(countOff)
        this.toggleShowElement(this.alarmBtn, this.pauseBtn, this.playBtn);
        this.audio.pause();
    }
}