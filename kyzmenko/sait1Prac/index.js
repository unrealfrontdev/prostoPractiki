import anime from 'anime';
import react from 'react';
import reactDom from 'reactdom';


const headerMenu = document.getElementById("headerMenu");

headerMenu.addEventListener('mouseover', openMenu());

function openMenu(){
    anime({
        targets: 'headerMenu',
        translateY: 100,
    })
}