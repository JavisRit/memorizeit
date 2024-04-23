let sequence = [];
let humanSequence = [];
let level = 0;
let tiles = ['red', 'green', 'blue', 'yellow'];
let colorDisplay = document.getElementById("colorDisplay");

const startButton = document.querySelector('.js-start');
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const tileContainer = document.querySelector('.js-container');

const audioElements = document.querySelectorAll('audio');
audioElements.forEach(audio => {
  audio.volume = 0.30; // ลดระดับเสียงลง 50%
});

function endGame(text,title){
  let endGames = new Audio('/memorizeit_1/sound/sound_congrade.mp3')
  endGames.volume = 0.50; // ลดเสียงลง 50%
  endGames.play();
  Swal.fire({
    title: "Congratulation!",
    text: "You passed all levels, Thank for playing . . .",
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(memorizeit_1/image/trees.png)",
    backdrop: `
      rgba(0,0,123,0.4)
      url("image/nyan.gif")
      left top
      no-repeat
    `,
    showCloseButton: false,
    showCancelButton: false,
    focusConfirm: false,
    confirmButtonText: `
      <i class="fa fa-thumbs-up"></i> Great!
    `,
    confirmButtonAriaLabel: "Thumbs up, great!"
  });
  tiles = ['red', 'green', 'blue', 'yellow'];

  // เรียกใช้ CSS เพื่อเบลอภาพข้างหลัง
  document.body.classList.add('blur-background');

  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'OBSERVATION';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');

  const colorToReset = ['purple','brown','orange']
  colorToReset.forEach(color => resetButton(color));

  swapBG(level)
}

function resetGame(text,title) {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    onClose: function() {
      // ลบ CSS เพื่อเรียกคืนภาพปกติ
      document.body.classList.remove('blur-background');
    }
  });

  tiles = ['red', 'green', 'blue', 'yellow'];

  // เรียกใช้ CSS เพื่อเบลอภาพข้างหลัง
  document.body.classList.add('blur-background');

  sequence = [];
  humanSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  heading.textContent = 'OBSERVATION';
  info.classList.add('hidden');
  tileContainer.classList.add('unclickable');

  const colorToReset = ['purple','brown','orange']
  colorToReset.forEach(color => resetButton(color));

  swapBG(level)
}


function humanTurn(level) {
  tileContainer.classList.remove('unclickable');
  info.textContent = `Your turn: There is ${level} button${level > 1 ? '' : ''}`;
  console.log(sequence)
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('activated');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('activated');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      // activateTile(color);
      if(level < 11){
        sequenceDisplay(color)
      }else{
        sequenceDisplay2(color)
      }
      
    }, (index + 1) * 750);
  });
}

function nextStep() {
    
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function sequenceDisplay(color){

  let fontSound = new Audio('/memorizeit_1/sound/font.mp3')
  fontSound.volume = 0.50; // ลดเสียงลง 50%
  fontSound.play();

  colorDisplay.innerHTML = color;
  colorDisplay.style.color = color;
  setTimeout(function() {
    colorDisplay.innerHTML = "&nbsp";
    colorDisplay.style.color = "#c0c0c0";
  }, 350)
}

function sequenceDisplay2(color){

  let fontSound = new Audio('/memorizeit_1/sound/font.mp3')
  fontSound.volume = 0.50; // ลดเสียงลง 50%
  fontSound.play();
  
  colorDisplay.innerHTML = color;
  let textcolor = tiles[Math.floor(Math.random() * tiles.length)]
  colorDisplay.style.color = textcolor;
  setTimeout(function() {
    colorDisplay.innerHTML = "&nbsp";
    colorDisplay.style.color = "#c0c0c0";
  }, 350)
}

function nextRound() {
  level += 1;

  // ทำให้ปุ่มกดไม่ได้
  tileContainer.classList.add('unclickable');
  info.innerHTML = "Waiting . . .";
  heading.innerHTML = "Level "+level+ " / 20";

  if (level === 21) {
    endGame('Congratulations . . .','Success!');
    return
  }

  if(level % 5 == 1 && level > 5){
    let number = Math.floor(Math.random() * hiddenButton.length)   
    color = hiddenButton[number] 
    console.log(number)
    console.log(color)
    let nextLevels = new Audio('/memorizeit_1/sound/nextlevel.mp3')
    nextLevels.volume = 0.50; // ลดเสียงลง 50%
    nextLevels.play();

    const tile = document.querySelector(`[data-tile='${color}']`);

    tile.classList.remove('hidden')
    tiles.push(color);
    hiddenButton.splice(number, 1)
    swapBG(level)
}

  if(level % 10 == 1){
    sequence = [];
  }

  // copy sequence ให้ nextSequence
  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(
     () => humanTurn(sequence.length) , sequence.length * 850 + 1000
  );
}

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - humanSequence.length;

  if (humanSequence[index] !== sequence[index]) {
    // เล่นเสียงเมื่อผู้เล่นกดปุ่มผิด
    const wrongSound = document.getElementById('wrongSound');
    wrongSound.play();
    // แสดงข้อความแจ้งเตือน
    resetGame('You lost . . .','Oops!');
    return;
  }

  if (humanSequence.length === sequence.length) {

    humanSequence = [];
    info.textContent = 'You Success';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `Your turn: There is ${remainingTaps} button${
    remainingTaps > 1 ? '' : ''
  }`;
}

function startGame() {
  // เพิ่ม class hidden ให้ start 
  startButton.classList.add('hidden');
  // ลบ class hidden ของ info
  info.classList.remove('hidden');
  info.innerHTML = "Waiting . . .";
  hiddenButton = ["purple","brown","orange"];
  nextRound();
}

function resetButton(color){
  const tile = document.querySelector(`[data-tile='${color}']`);
  tile.classList.add('hidden')
  
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});

// JavaScript
window.onload = function() {
  const songs = [
    '/memorizeit_1/sound/music_hard.mp3'
  ];
  myAudio.volume = 0.05; // ลดเสียงลง 50%

  const myAudio = document.getElementById('myAudio');
  const randomIndex = Math.floor(Math.random() * songs.length);
  myAudio.src = songs[randomIndex];
  myAudio.play();
};

function togglePlay() {
  const myAudio = document.getElementById('myAudio');
  if (myAudio.paused) {
      myAudio.play();
      myAudio.volume = 0.1; // ลดเสียงลง 50%
      document.querySelector(".button").innerHTML = "<i class='fas fa-volume-up'></i>";
  } else {
      myAudio.pause();
      document.querySelector(".button").innerHTML = "<i class='fas fa-volume-mute'></i>";
  }

  // เสียงเมื่อกดปุ่ม togglePlay()
  var togglePlaySound = new Audio("/memorizeit_1/sound/selectsound.mp3");
  togglePlaySound.volume = 0.25; // ลดเสียงลงเป็น 25%
  togglePlaySound.play();
}

function swapBG(level){
  if(level <6){
    document.body.style.backgroundImage = "url('/memorizeit_2/image/background_1.gif')"
  } else if(level == 6){
    document.body.style.backgroundImage = "url('/memorizeit_2/image/background_2.gif')"
  }else if(level == 11){
    document.body.style.backgroundImage = "url('/memorizeit_2/image/background_3.gif')"
  } else {
    document.body.style.backgroundImage = "url('/memorizeit_2/image/background_4.gif')"
  }
  
}

window.addEventListener('DOMContentLoaded', (event) => {
  const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
      }
  });
  Toast.fire({
      icon: "info",
      title: "connecting success . . ."
  });
});


function leave() {
          Swal.fire({
            title: "Are you sure?",
            text: "You want to exit this mode?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
            // timer: 2000 // ตั้งเวลาให้คำแจ้งเตือนหายไปหลังจาก 1.5 วินาที
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Success!",
                text: "Exit this mode successfully . . .",
                icon: "success",
                showConfirmButton: false
              });
              setTimeout(() => {
                window.location.href = "/index.html"; // เปลี่ยน URL หน้าเว็บ
            }, 1500); // รอ 1.5 วินาทีก่อนที่จะเปลี่ยนหน้า
            }
          });
      }