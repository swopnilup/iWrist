const total = 3;
  let cur = 0, timer, pbTimer;

  function goTo(n) {
    const slides = document.querySelectorAll('.slide');
    const dots   = document.querySelectorAll('.dot');

    // hide current
    slides[cur].style.position = 'absolute';
    slides[cur].style.inset    = '0';
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');

    // show next
    cur = (n + total) % total;
    slides[cur].style.position = 'relative';
    slides[cur].style.inset    = '';
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');

    resetProgress();
  }

  function resetProgress() {
    const pb = document.getElementById('pb');
    pb.style.transition = 'none';
    pb.style.width = '0%';
    clearTimeout(pbTimer);
    pbTimer = setTimeout(() => {
      pb.style.transition = 'width 3s linear';
      pb.style.width = '100%';
    }, 30);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 3000);
  }

  document.getElementById('prev').onclick = () => { goTo(cur - 1); startAuto(); };
  document.getElementById('next').onclick = () => { goTo(cur + 1); startAuto(); };
  document.querySelectorAll('.dot').forEach(d => {
    d.onclick = () => { goTo(+d.dataset.i); startAuto(); };
  });

  resetProgress();
  startAuto();