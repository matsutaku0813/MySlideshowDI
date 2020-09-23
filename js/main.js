'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const img = document.createElement('img');
    img.src = image;

    const li = document.createElement('li');
    if (index === currentIndex) {
      li.classList.add('current');
    }
    li.addEventListener('click', () => {
      mainImage.src = image;
      const thumbnails = document.querySelectorAll('.thumbnails>li');
      thumbnails[currentIndex].classList.remove('current');
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId;
  let seconds = new Vue({
    el: '#seconds',
    data: {
      sec: 1000
    }
  });

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      next.click();
      playSlideshow();
    }, seconds.sec);
  }

  function backSlideshow() {
    timeoutId = setTimeout(() => {
      prev.click();
      backSlideshow();
    }, seconds.sec);
  }

  let isPlaying = false;
  let isBack = false;
  const play = document.getElementById('play');
  const back = document.getElementById('back');

  function setButtonPlay() {
    back.classList.toggle('inactive');
  }
  // function setButtonPlay() {
  //   back.classList.add('inactive');
  // }
  // function setButtonPlayPauseBreak() {
  //   back.classList.remove('inactive');
  // }
  function setButtonBack() {
    play.classList.toggle('inactive');
  }
  // function setButtonBack() {
  //   play.classList.add('inactive');
  // }
  // function setButtonBackPauseBreak() {
  //   play.classList.remove('inactive');
  // }

  play.addEventListener('click', () => {
    if (play.classList.contains('inactive') === true) {
      return;
    }
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
      setButtonPlay();
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play';
      setButtonPlay();
      // setButtonPlayPauseBreak();
    }
    isPlaying = !isPlaying;
  });

  back.addEventListener('click', () => {
    if (back.classList.contains('inactive') === true) {
      return;
    }
    if (isBack === false) {
      backSlideshow();
      back.textContent = 'Pause';
      setButtonBack();
    } else {
      clearTimeout(timeoutId);
      back.textContent = 'Back';
      setButtonBack();
      // setButtonBackPauseBreak();
    }
    isBack = !isBack;
  });
}