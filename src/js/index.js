let _sentences = [];

document.addEventListener('DOMContentLoaded', () => {
    getSentences();
    listeners();
});

function listeners() {
    document.querySelectorAll('.generate')[0].addEventListener('click', e => generate(e));
    document.querySelectorAll('.copy')[0].addEventListener('click', e => copy(e));
}

function generate(e) {
    e.preventDefault();
    e.stopPropagation();
    document.querySelectorAll('.sentence')[0].innerHTML = `<h1 class="title">${generateSentence()}</h1>`;
}

function copy(e) {
    e.preventDefault();
    e.stopPropagation();

    var copyTextarea = document.querySelector('.sentence h1');
    var textarea = document.createElement("textarea");
    textarea.textContent = copyTextarea.textContent;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();

    try {
        var el = document.createElement("div");
        el.textContent = 'copiado';
        el.classList.add('text-copied');
        el.classList.add('slide-top');
        document.querySelector('.card').appendChild(el);
        
        setTimeout(() => {
            document.querySelector('.text-copied').classList.add('slide-out-bottom');

            setTimeout(() => {
                document.querySelector('.text-copied').remove();
            }, 1000);

        }, 2500);

        return document.execCommand('copy');

    } catch (err) {
        console.error('Oops, unable to copy');
        return false;
    }
    finally {
        document.body.removeChild(textarea);
    }
}

function getSentences() {
    fetch('/sentences')
        .then(response => response.json())
        .then(res => {
            _sentences = res.sentences;
            document.querySelectorAll('.sentence')[0].innerHTML = `<h1 class="title">${generateSentence()}</h1>`;
        })
        .catch(err => {
            console.log(err);
        });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateSentence() {
    let randFirstColumn = getRandomInt(0, _sentences.firstColumn.length);
    let firstColumn = _sentences.firstColumn[randFirstColumn];

    let randSecondColumn = getRandomInt(0, _sentences.secondColumn.length);
    let secondColumn = _sentences.secondColumn[randSecondColumn];

    let randThirdColumn = getRandomInt(0, _sentences.thirdColumn.length);
    let thirdColumn = _sentences.thirdColumn[randThirdColumn];

    let randFourthColumn = getRandomInt(0, _sentences.fourthColumn.length);
    let fourthColumn = _sentences.fourthColumn[randFourthColumn];

    return `${firstColumn} ${secondColumn} ${thirdColumn} ${fourthColumn}`;
}