document.addEventListener('scroll', function() {
    const img = document.getElementById('animated-img');
    const img2 = document.getElementById('animated-img2');
    const imgPosition = img.getBoundingClientRect().top + 300;
    const img2Position = img2.getBoundingClientRect().top + 300;
    const screenPosition = window.innerHeight / 1.5;

    if (imgPosition < screenPosition) {
        img.style.transform = 'translateX(0)';
    }
    if (img2Position < screenPosition) {
        img2.style.transform = 'translateX(0)';
    }
});
