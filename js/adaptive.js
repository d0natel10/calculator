// адаптивность
const adaptiveButtonClose = document.getElementById('adaptive');
const blockNumbers = document.getElementById('numbers');
const blockFunc = document.getElementById('func');
const adaptiveButtonOpen = document.getElementById('adaptiveOpen');


if (window.innerWidth <= 768) {
    blockFunc.style.display = 'none'; 
}

adaptiveButtonClose.addEventListener('click', () => {
    blockNumbers.style.display = 'none';
    adaptiveButtonOpen.style.display = 'block';

    if (blockFunc.style.display === 'none' || blockFunc.style.display === '') {
        blockFunc.style.display = 'grid';
    } else {
        blockFunc.style.display = 'none';
    }
});

adaptiveButtonOpen.addEventListener('click', () => {
    adaptiveButtonOpen.style.display = 'none';
    blockFunc.style.display = 'none';

    if (blockNumbers.style.display === 'none' || blockNumbers.style.display === '') {
        blockNumbers.style.display = 'grid';
    } else {
        blockNumbers.style.display = 'none';
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        blockFunc.style.display = 'grid';
        adaptiveButtonOpen.style.display = 'none'; 
        blockNumbers.style.display = 'grid'; 
    } else {
        blockFunc.style.display = 'none'; 
    }
});
