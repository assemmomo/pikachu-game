document.addEventListener('scroll', function() {
    const img = document.getElementById('animated-img');
    const img2 = document.getElementById('animated-img2');
    const about1 = document.querySelector('.about1');
    const about2 = document.querySelector('.about2');
    const imgPosition = img.getBoundingClientRect().top + 300;
    const img2Position = img2.getBoundingClientRect().top + 300;
    const screenPosition = window.innerHeight / 1.5;

    if (imgPosition < screenPosition) {
        img.style.transform = 'translateX(0)';
        about1.style.transform = 'translateX(0)';
    }else{
        img.style.transform = 'translateX(-200%)';
        about1.style.transform = 'translateX(200%)';
    }
    if (img2Position < screenPosition) {
        img2.style.transform = 'translateX(0)';
        about2.style.transform = 'translateX(0)';
    }else{
        img2.style.transform = 'translateX(200%)';
        about2.style.transform = 'translateX(-200%)';
    }
});
