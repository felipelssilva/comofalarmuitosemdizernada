let _sentences = [];

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-0P6S1WF939');

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname == "/") {
        getSentences();
        listeners();
    }
    else if (window.location.pathname == "/about") {
        getSentences();

    }
});

function listeners() {
    document.querySelectorAll('.generate')[0].addEventListener('click', e => generate(e));
    document.querySelectorAll('.copy')[0].addEventListener('click', e => copy(e));
}

function generate(e) {
    e.preventDefault();
    e.stopPropagation();
    let $sentence = document.querySelectorAll('.sentence');
    generateSentence($sentence);
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
        document.querySelector('.card-sentence').prepend(el);

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
            let $sentence = document.querySelectorAll('.sentence');
            let $table = document.querySelectorAll('table');

            if ($sentence.length > 0) {
                generateSentence($sentence);
            }

            if ($table.length > 0) {
                createTableResults($table);
            }
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

function generateSentence($sentence) {
    let randFirstColumn = getRandomInt(0, _sentences.firstColumn.length);
    let firstColumn = _sentences.firstColumn[randFirstColumn];

    let randSecondColumn = getRandomInt(0, _sentences.secondColumn.length);
    let secondColumn = _sentences.secondColumn[randSecondColumn];

    let randThirdColumn = getRandomInt(0, _sentences.thirdColumn.length);
    let thirdColumn = _sentences.thirdColumn[randThirdColumn];

    let randFourthColumn = getRandomInt(0, _sentences.fourthColumn.length);
    let fourthColumn = _sentences.fourthColumn[randFourthColumn];

    $sentence[0].innerHTML = `<h1 class="title">${firstColumn} ${secondColumn} ${thirdColumn} ${fourthColumn}</h1>`;
}

function createTableResults($table) {
    $table[0].tBodies[0].innerHTML = '';

    /* Object.values(_sentences).map((e, i) => {
         e.map((el, j) => {
             let row = '';
             let cel = '';
 
             if (i == 0) {
                 row = $table[0].tBodies[0].insertRow();
             } else {
                 row = $table[0].tBodies[0].children[i];
             }
             cel = row.insertCell();
             cel.innerHTML = el;
         });
     });*/

    _sentences.firstColumn.map((e, i) => {
        let row = $table[0].tBodies[0].insertRow();
        let cel = row.insertCell();
        cel.innerHTML = e;
    });

    _sentences.secondColumn.map((e, i) => {
        let cel = $table[0].tBodies[0].children[i].insertCell();
        cel.innerHTML = e;
    });

    _sentences.thirdColumn.map((e, i) => {
        let cel = $table[0].tBodies[0].children[i].insertCell();
        cel.innerHTML = e;
    });

    _sentences.fourthColumn.map((e, i) => {
        let cel = $table[0].tBodies[0].children[i].insertCell();
        cel.innerHTML = e;
    });
}