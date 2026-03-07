//if (sessionStorage.getItem("isLogged") != true) {
//    window.location.replace("login.html");
//}

function shift_dx(array) {
    let last = array[array.length - 1];
    for (let i = array.length - 1; i > 0; i--) {
        array[i] = array[i - 1];
    }
    array[0] = last;
}

function shift_sx(array) {
    let first = array[0];
    for (let i = 0; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }
    array[array.length - 1] = first;
}

function randomize(array) {

    let random_array = new Array(array.length);
    let index;
    for (let i = 0; i < array.length; i++) {
        index = Math.floor(Math.random() * array.length);
        while (random_array[index] != undefined) {
            index++;
            if (index == random_array.length) index = 0;
        }
        random_array[index] = array[i];
    }
    return random_array;
}

function sort(array) {

    let n = array.length;
    let swapped;

    do {
        swapped = false;

        for (let i = 0; i < n - 1; i++) {
            if (parseInt(array[i]) > parseInt(array[i + 1])) {
                let temp = array[i];
                array[i] = array[i + 1];
                array[i + 1] = temp;

                swapped = true;
            }
        }
        n--;

    } while (swapped);

    return array;
}

export function play(id) {
    const player = document.getElementById("player");
    player.src = "http://localhost:8000/stream/" + id;
    player.play();
}