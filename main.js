window.onload = function() {
  let frequency_mn = 500;
  let power_val = 1;
  let pan_value = 0;

  let power = document.querySelector('.fa-power-off');
  let sub_ten = document.querySelector('#minus_ten');
  let add_ten = document.querySelector('#plus_ten');
  let sub_one = document.querySelector('#minus_one');
  let add_one = document.querySelector('#plus_one');
  let pan_val = document.querySelector('#pan_val');
  let vol_val = document.querySelector('#volume');

  let inp_val = document.querySelector('input[type="number"]');
  //console.log(inp_val)


  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();
  var oscillator = audioCtx.createOscillator();
  var panner = audioCtx.createStereoPanner();
  var volume = audioCtx.createGain();



  function start_sound() {
    oscillator.type = 'square';
    oscillator.frequency.value = frequency_mn;
    inp_val.value = frequency_mn;
    //audioCtx.volume = 0.0;
    //volume.gain.value = 0.5;
    //volume.gain.linearRampToValueAtTime(1, 0);
    oscillator.connect(volume).connect(panner).connect(audioCtx.destination);
    //volume.connect(audioCtx.destination);
    panner.pan.value = pan_value * (-1);
    //volume.gain.value = 0.0;

  }



  power.addEventListener('click', function() {
    if (power_val == 1) {
      power.style.color = 'green';
      oscillator = audioCtx.createOscillator();
      oscillator.start();
      start_sound();
    }
    else {
      power.style.color = 'red';
      oscillator.stop();
    }
    power_val = power_val * (-1);
    //console.log(power_val);
  });

  inp_val.addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
      frequency_mn = parseInt(inp_val.value);
      start_sound();
    }
  });

  pan_val.addEventListener('input', function() {
    //console.log(pan_val.value)
    pan_value = pan_val.value;
    start_sound();
  });
  
  vol_val.addEventListener('input', function() {
    volume.gain.value = this.value;
  });



  sub_ten.addEventListener('click', function() {
    frequency_mn -= 10;
    start_sound();
  });
  add_ten.addEventListener('click', function() {
    frequency_mn += 10;
    start_sound();
  });
  sub_one.addEventListener('click', function() {
    frequency_mn -= 1;
    start_sound();
  });
  add_one.addEventListener('click', function() {
    frequency_mn += 1;
    start_sound();
  });


  //oscillator.stop();
}
