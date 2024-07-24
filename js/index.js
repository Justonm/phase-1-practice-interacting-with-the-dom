document.addEventListener('DOMContentLoaded', () => {
    let counter = document.getElementById('counter');
    let minusButton = document.getElementById('minus');
    let plusButton = document.getElementById('plus');
    let heartButton = document.getElementById('heart');
    let pauseButton = document.getElementById('pause');
    let likesList = document.querySelector('.likes');
    let commentForm = document.getElementById('comment-form');
    let commentInput = document.getElementById('comment-input');
    let commentsList = document.getElementById('list');

    let count = 0;
    let paused = false;
    let likes = {};

    function updateCounter() {
        if (!paused) {
            count++;
            counter.innerText = count;
        }
    }

    let timer = setInterval(updateCounter, 1000);

    minusButton.addEventListener('click', () => {
        if (!paused) {
            count--;
            counter.innerText = count;
        }
    });

    plusButton.addEventListener('click', () => {
        if (!paused) {
            count++;
            counter.innerText = count;
        }
    });

    heartButton.addEventListener('click', () => {
        if (!paused) {
            if (likes[count]) {
                likes[count]++;
            } else {
                likes[count] = 1;
            }
            renderLikes();
        }
    });

    pauseButton.addEventListener('click', () => {
        paused = !paused;
        if (paused) {
            clearInterval(timer);
            pauseButton.innerText = 'resume';
            disableButtons(true);
        } else {
            timer = setInterval(updateCounter, 1000);
            pauseButton.innerText = 'pause';
            disableButtons(false);
        }
    });

    function disableButtons(state) {
        minusButton.disabled = state;
        plusButton.disabled = state;
        heartButton.disabled = state;
    }

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let comment = commentInput.value;
        if (comment) {
            let commentElement = document.createElement('p');
            commentElement.innerText = comment;
            commentsList.appendChild(commentElement);
            commentInput.value = '';
        }
    });

    function renderLikes() {
        likesList.innerHTML = '';
        for (let key in likes) {
            let li = document.createElement('li');
            li.innerText = `${key} has been liked ${likes[key]} ${likes[key] > 1 ? 'times' : 'time'}`;
            likesList.appendChild(li);
        }
    }
});