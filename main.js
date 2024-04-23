document.addEventListener("DOMContentLoaded", function () {
    var gameModeButton = document.getElementById("gameModeButton");

    gameModeButton.addEventListener("click", function () {
        // ซ่อนปุ่ม GameMode
        gameModeButton.style.display = "none";

        var gamemodesSection = document.querySelector(".gamemodes");

        // สร้างปุ่ม Easy
        var easyButton = createModeButton("MEMORIZE");
        gamemodesSection.appendChild(easyButton);

        // สร้างปุ่ม Medium
        var mediumButton = createModeButton("OBSERVATION");
        gamemodesSection.appendChild(mediumButton);

        // กำหนด event listener ให้กับแต่ละปุ่ม
        easyButton.addEventListener("click", function () {
            changeGameMode("MEMORIZE");
            hideModeButtons();
            centerGameModeButton(); // กลับมาให้ปุ่มอยู่กลางหน้าจอ
            swapBG(1)
        });

        mediumButton.addEventListener("click", function () {
            changeGameMode("OBSERVATION");
            hideModeButtons();
            centerGameModeButton();
            swapBG(2)
        });
    });
});

function createModeButton(text) {
    var button = document.createElement("button");
    button.textContent = text;
    button.classList.add("gamemode-button", "mode-button");

    // เพิ่มเสียงเข้าไปในปุ่ม
    var clickSound = new Audio("/memorizeit_1/sound/selectsound.mp3");
    clickSound.volume = 0.25; // ลดเสียงลงเป็น 25%
    button.appendChild(clickSound);

    button.addEventListener("click", function() {
        // เมื่อคลิกปุ่มให้เล่นเสียง
        clickSound.play();
    });

    return button;
}

function changeGameMode(mode) {
    var gameModeButton = document.getElementById("gameModeButton");
    gameModeButton.textContent = mode;
}

function hideModeButtons() {
    var buttons = document.querySelectorAll('.mode-button');
    buttons.forEach(function(button) {
        button.style.display = "none"; // ซ่อนปุ่ม
    });
}

function centerGameModeButton() {
    var gameModeButton = document.getElementById("gameModeButton");
    gameModeButton.style.display = "block";
    gameModeButton.style.margin = "auto"; // กำหนดให้ปุ่มอยู่ตรงกลาง
}

// JavaScript
window.onload = function() {
    const songs = [
      '/memorizeit_1/sound/music_login.mp3'
    ];
    myAudio.volume = 0.1; // ลดเสียงลง 50%
  
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

  // function joinMode() {
  //   window.location.href = "/memorizeit_1/index.html"
  // }

  function checkUsername() {
    var usernameInput = document.getElementById("username").value;
    var selectedGamemode = document.getElementById("gameModeButton").textContent;

    // เสียงเมื่อกด Join Mode
    var joinModeSound = new Audio("/memorizeit_1/sound/selectsound.mp3");
    joinModeSound.volume = 0.25; // ลดเสียงลงเป็น 50%
    joinModeSound.play();

    if (selectedGamemode.trim() === "GAME MODE") {
        Swal.fire({
            icon: "error",
            title: "ERROR!",
            text: "PLEASE SELECT A GAMEMODE",
            showConfirmButton: false,
            timer: 2000
        });
        return; // ไม่ทำการตรวจสอบ Username หรือเปลี่ยนหน้า
    }

    var redirectURL = "/memorizeit_1/index.html"; // URL ที่จะเปลี่ยนไปตาม Gamemode
    if (selectedGamemode.trim() === "OBSERVATION") {
        redirectURL = "/memorizeit_2/index2.html"; // เปลี่ยน URL ถ้าเลือกโหมด OBSERV
    }

    if (usernameInput.trim() !== "") {
        Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: "HAVE FUN WITH SELECTED MODE",
            showConfirmButton: false,
            timer: 2000
        }).then(() => {
            setTimeout(() => {
                window.location.href = redirectURL; // เปลี่ยน URL ตาม Gamemode ที่เลือก
            }, 1500);
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "ERROR!",
            text: "PLEASE ENTER USERNAME . . .",
            showConfirmButton: false,
            timer: 2000
        });
    }
}

function swapBG(n){
    if(n == 1){
        document.body.style.backgroundImage = "url('memorizeit_1/image/background.gif')"
    } else{
        document.body.style.backgroundImage = "url('memorizeit_2/image/background.gif')"
    }
}