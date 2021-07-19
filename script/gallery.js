const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach( thumbnail => {
    thumbnail.addEventListener('click', e => {
        console.log(e.target);
    })
})