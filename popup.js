document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('toggleTheme').addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'toggleTheme' });
  });
});


document.getElementById('toggleTheme').addEventListener('change', function() {
  var isDarkMode = this.checked;
  localStorage.setItem('isDarkMode', isDarkMode);
  updateTheme(isDarkMode);
});

function updateTheme(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}


const DURATION = 500;

document.querySelector('#toggleTheme').addEventListener('click', (e) => {
  const toggle = e.target.closest('.toggle');
  const input = toggle.querySelector('input');
  const offKnob = toggle.querySelector('.off-knob');
  const onKnob = toggle.querySelector('.on-knob');
  const outline = toggle.querySelector('.outline');
  const outlineBlur = toggle.querySelector('.outline--blur');

  const animating = toggle
    .getAnimations({ subtree: true })
    .some((animation) => animation.playState !== 'finished');

  if (animating) {
    e.preventDefault();
    return;
  }

  if (input.checked) {
    animateOffKnobCheck();
    animateOnKnobCheck();
    animateOutlineCheck();
    return;
  }

  animateOffKnobUncheck();
  animateOnKnobUncheck();
  animateOutlineUncheck();

  function animateOffKnobCheck() {
    offKnob.animate(
      [
        { transform: 'scale(1) translateX(0)' },
        {
          transform: 'scale(0.1)',
          background: 'var(--on-color)',
          offset: 0.6,
        },
        {
          transform: 'scale(0.1) translateX(-430px)',
          background: 'var(--on-color)',
        },
      ],
      {
        duration: DURATION,
        easing: 'cubic-bezier(0.44, -0.44, 0.98, 0.89)',
        fill: 'forwards',
      }
    );
  }

  function animateOffKnobUncheck() {
    offKnob.animate(
      [
        {
          transform: 'scale(0.1) translateX(-430px)',
          background: 'var(--off-color)',
        },
        {
          transform: 'scale(0.1) translateX(0)',
          background: 'var(--off-color)',
          offset: 0.4,
        },
        {
          transform: 'scale(1.05) translateX(0)',
          background: 'var(--off-color)',
          offset: 0.7,
        },
        {
          transform: 'scale(0.87) translateX(0)',
          background: 'var(--off-color)',
          offset: 0.8,
        },
        {
          transform: 'scale(1.01) translateX(0)',
          background: 'var(--off-color)',
          offset: 0.9,
        },
        {
          transform: 'scale(1) translateX(0)',
          background: 'var(--off-color)',
        },
      ],
      {
        duration: DURATION,
        easing: 'ease-out',
        delay: DURATION * 2,
        fill: 'forwards',
      }
    );
  }

  function animateOnKnobCheck() {
    onKnob.animate(
      [
        {
          background: 'var(--on-color)',
        },
        {
          transform: 'translateX(0) scale(0.1)',
          background: 'var(--on-color)',
          offset: 0.4,
        },
        {
          transform: 'translateX(0) scale(1.05)',
          background: 'var(--on-color)',
          offset: 0.7,
        },
        {
          transform: 'translateX(0) scale(0.87)',
          background: 'var(--on-color)',
          offset: 0.8,
        },
        {
          transform: 'translateX(0) scale(1.01)',
          background: 'var(--on-color)',
          offset: 0.9,
        },
        {
          transform: 'translateX(0) scale(1)',
          background: 'var(--on-color)',
        },
      ],
      {
        duration: DURATION,
        easing: 'ease-out',
        delay: DURATION + DURATION,
        fill: 'forwards',
      }
    );
  }

  function animateOnKnobUncheck() {
    onKnob.animate(
      [
        {
          transform: 'scale(0.1) translateX(0)',
          background: 'var(--off-color)',
          offset: 0.6,
        },
        {
          transform: 'scale(0.1) translateX(430px)',
          background: 'var(--off-color)',
        },
      ],
      {
        duration: DURATION,
        easing: 'cubic-bezier(0.44, -0.44, 0.98, 0.89)',
        fill: 'forwards',
      }
    );
  }

  function animateOutlineCheck() {
    const keyframes = [
      {
        strokeOpacity: 1,
      },
      {
        strokeOpacity: 1,
        offset: 0.99,
      },
      {
        strokeOpacity: 0,
        strokeDashoffset: 89,
      },
    ];
    const options = {
      duration: DURATION,
      easing: 'cubic-bezier(0.55, 0.055, 0.9, 1)',
      delay: DURATION,
      fill: 'forwards',
    };
    outline.animate(keyframes, options);
    outlineBlur.animate(keyframes, options);
  }

  function animateOutlineUncheck() {
    const keyframes = [
      {
        strokeOpacity: 1,
        strokeDashoffset: 89,
      },
      {
        strokeOpacity: 1,
        strokeDashoffset: 32.5,
        offset: 0.99,
      },
      {
        strokeOpacity: 0,
        strokeDashoffset: 32.5,
      },
    ];
    const options = {
      duration: DURATION,
      easing: 'cubic-bezier(0.55, 0.055, 0.9, 1)',
      delay: DURATION,
      fill: 'forwards',
    };
    outline.animate(keyframes, options);
    outlineBlur.animate(keyframes, options);
  }
});
