const today = document.querySelector('#day');
const time = document.querySelector('#time')
const date = new Date();
const day_object = {
    1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursday",
    5: "Friday", 6: "Saturday", 0: "Sunday"
}

time.innerHTML = date.getTime()
today.innerHTML = day_object[date.getDay()]
