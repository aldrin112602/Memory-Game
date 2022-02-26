let $ = (element) => {

    let elementNode = document.querySelectorAll(element);

    if (elementNode.length > 1) {

        return elementNode;

    } else {

        return document.querySelector(element);

    }

}

const container = $('#container');

var level = 1,
    life = 5;

function gameStart() {

    let rows = 4;

    for (var i = 0; i < rows; i++) {

        var div = document.createElement('div');

        div.className = 'row';

        for (var j = 0; j < rows; j++) {

            var span = document.createElement('span');

            span.className = 'box';

            div.appendChild(span);

        }

        container.appendChild(div);

    }



    var box = $('span.box');

    var pick = [];




    for (var i = 0; i < 7; i++) {

        pick.push(Math.floor(Math.random() * ($('span.box').length - 1)))

    }



    var filter = new Set(pick);

    pick = [];

    filter.forEach(val => {

        pick.push(val)

    })



    pick.forEach(val => {

        box[val].style.backgroundColor = '#222';

    })




    touch = 0;

    var interval = setInterval(() => {

        $('h3').textContent = 'Lives: ' + life;

        $('h2').textContent = 'Level: ' + level;

    }, 100)



    box.forEach((box, index) => {

        box.style.pointerEvents = 'none';

        box.onclick = () => {

            if (pick.includes(index)) {

                touch++;

                box.style.backgroundColor = '#222';

                if (touch == pick.length) {

                    window.navigator.vibrate([500]);

                    setTimeout(() => {

                        alert('Well done!\n Next level unlocked.');
                        
                       gameStart();

                    }, 500);

                    level++;

                    life += 2;

                    container.innerHTML = '';

                    clearInterval(interval);

                    

                }



            } else {

                life--;

                window.navigator.vibrate([100]);

                if (life == 0) {

                    window.navigator.vibrate([500]);



                    alert("Game over! You're out of life");



                    var restart = confirm('Restart Game?');

                    if (restart) {

                        location.reload();

                    } else {

                        alert("Game over! You're out of life");

                    }

                }

            }



            box.style.pointerEvents = 'none';

        }



    })

    setTimeout(() => {

        box.forEach(el => el.style.backgroundColor = '#fff');

    }, 4000)



    var rotates = [90, 180];

    var axis = ['X', 'Y'];

    var moves = rotates[Math.floor(Math.random() * (rotates.length + 1))];

    axis = axis[Math.floor(Math.random() * 2)];



    setTimeout(() => {

        box.forEach(el => el.style.pointerEvents = 'auto');



        if (axis == 'X') {

            container.style.transform = `rotate(-${moves}deg)`;

        } else {

            container.style.transform = `rotate(${moves}deg)`;

        }

    }, 4100)

}

gameStart();
