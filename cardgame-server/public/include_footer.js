let raveInterval = null;

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function startRave() {
  const root = document.documentElement;

  if (raveInterval) return; // Already raving

  console.log("[Rave] Rave mode ACTIVATED 🔊🕺💃");

  raveInterval = setInterval(() => {
    root.style.setProperty('--red', getRandomColor());
    root.style.setProperty('--balts', getRandomColor());
    root.style.setProperty('--bg', getRandomColor());
    root.style.setProperty('--bg2', getRandomColor());
    root.style.setProperty('--blak', getRandomColor());
    root.style.setProperty('--gray', getRandomColor());
    root.style.setProperty('--gray1', getRandomColor());
    root.style.setProperty('--gray2', getRandomColor());
    root.style.setProperty('--wait', getRandomColor());
    root.style.setProperty('--pink', getRandomColor());
  }, 1);
  document.querySelectorAll("p, h1, h2, h3, h4, span, a").forEach(el => {
    el.classList.add("rave-text");
  });
  document.querySelectorAll("img").forEach(el => {
    el.classList.add("rave-image");
  });
}

function stopRave() {
  const root = document.documentElement;

  if (raveInterval) {
    clearInterval(raveInterval);
    raveInterval = null;
  }

  // Restore defaults
  root.style.setProperty('--red', '#e01b24');
  root.style.setProperty('--balts', '#ffffff');
  root.style.setProperty('--bg', '#000000');
  root.style.setProperty('--bg2', '#1b1b1b');
  root.style.setProperty('--blak', '#000000');
  root.style.setProperty('--gray', '#ccc');
  root.style.setProperty('--gray1', '#ddd');
  root.style.setProperty('--gray2', '#3c3c3c');
  root.style.setProperty('--wait', '#f9f9f9');
  root.style.setProperty('--pink', '#ff9a9a');

  console.log("[Rave] Rave mode DEACTIVATED 😢");
  document.querySelectorAll(".rave-text").forEach(el => {
    el.classList.remove("rave-text");
  });
  document.querySelectorAll(".rave-image").forEach(el => {
    el.classList.remove("rave-image");
  });
}

function startLightMode() {
  const root = document.documentElement;
  root.classList.add("light-mode");

  // Set light mode colors directly
  root.style.setProperty('--red', '#2be01b');   // Light red
  root.style.setProperty('--balts', '#222222'); // Dark text
  root.style.setProperty('--bg', '#f4f4f4');    // Light background
  root.style.setProperty('--bg2', '#e0e0e0');
  root.style.setProperty('--blak', '#a7a7a7');
  root.style.setProperty('--gray', '#888888');
  root.style.setProperty('--gray1', '#b8b8b8');
  root.style.setProperty('--gray2', '#b8b8b8');
  root.style.setProperty('--wait', '#ffffff');
  root.style.setProperty('--pink', '#9aff9a');

  console.log("[LightMode] Light mode ACTIVATED 🌞");
}

function stopLightMode() {
  const root = document.documentElement;
  root.classList.remove("light-mode");

  // Restore default (dark mode) colors
  root.style.setProperty('--red', '#e01b24');
  root.style.setProperty('--balts', '#ffffff');
  root.style.setProperty('--bg', '#000000');
  root.style.setProperty('--bg2', '#1b1b1b');
  root.style.setProperty('--blak', '#000000');
  root.style.setProperty('--gray', '#ccc');
  root.style.setProperty('--gray1', '#ddd');
  root.style.setProperty('--gray2', '#3c3c3c');
  root.style.setProperty('--wait', '#f9f9f9');
  root.style.setProperty('--pink', '#ff9a9a');

  console.log("[LightMode] Light mode DEACTIVATED 🌚");
}

function startspecialMode() {
  const root = document.documentElement;
  root.classList.add("special-mode");

  root.style.setProperty('--red', '#e100ff');
  root.style.setProperty('--balts', '#ff00e1');
  root.style.setProperty('--bg', '#64e8ff');
  root.style.setProperty('--bg2', '#00d9ff');
  root.style.setProperty('--blak', '#ff93f2');
  root.style.setProperty('--gray', '#ff93f2');
  root.style.setProperty('--gray1', '#ee10ff');
  root.style.setProperty('--gray2', '#fcb8fd');
  root.style.setProperty('--wait', '#64e8ff');
  root.style.setProperty('--pink', '#fcb8fd');

  console.log("[specialMode] kas pie velna notiek???");
}

function stopspecialMode() {
  const root = document.documentElement;
  root.classList.remove("special-mode");

  // Restore default values
  root.style.setProperty('--red', '#e01b24');
  root.style.setProperty('--balts', '#ffffff');
  root.style.setProperty('--bg', '#000000');
  root.style.setProperty('--bg2', '#1b1b1b');
  root.style.setProperty('--blak', '#000000');
  root.style.setProperty('--gray', '#ccc');
  root.style.setProperty('--gray1', '#ddd');
  root.style.setProperty('--gray2', '#3c3c3c');
  root.style.setProperty('--wait', '#f9f9f9');
  root.style.setProperty('--pink', '#ff9a9a');

  console.log("[specialMode] nu ta beidzot ");
}


function initRaveSwitch() {
  const raveSwitch = document.getElementById("set1");

  if (!raveSwitch) {
    console.warn("[Rave] Switch with id='set1' not found.");
    return;
  }

  // Check localStorage for raveMode state
  const raveState = localStorage.getItem("raveMode");
  if (raveState === "on") {
    raveSwitch.checked = true;
    startRave();
  } else {
    raveSwitch.checked = false;
    stopRave();
  }

  raveSwitch.addEventListener("change", function () {
    if (this.checked) {
      localStorage.setItem("raveMode", "on");
      startRave();
    } else {
      localStorage.setItem("raveMode", "off");
      stopRave();
    }
  });
}

function initLightModeSwitch() {
  const lightModeSwitch = document.getElementById("set2");

  if (!lightModeSwitch) {
    console.warn("[LightMode] Switch with id='set2' not found.");
    return;
  }

  // Check localStorage for lightMode state
  const lightModeState = localStorage.getItem("lightMode");
  if (lightModeState === "on") {
    lightModeSwitch.checked = true;
    startLightMode();
  } else {
    lightModeSwitch.checked = false;
    stopLightMode();
  }

  lightModeSwitch.addEventListener("change", function () {
    if (this.checked) {
      localStorage.setItem("lightMode", "on");
      startLightMode();
    } else {
      localStorage.setItem("lightMode", "off");
      stopLightMode();
    }
  });
}

function initspecialSwitch() {
  const specialSwitch = document.getElementById("set3");

  if (!specialSwitch) {
    console.warn("[specialMode] Switch with id='set3' not found.");
    return;
  }

  const specialState = localStorage.getItem("specialMode");

  if (specialState === "on") {
    specialSwitch.checked = true;
    startspecialMode();
  } else {
    specialSwitch.checked = false;
    stopspecialMode();
  }

  specialSwitch.addEventListener("change", function () {
    console.log(`[specialMode] Switch toggled: ${this.checked}`);
    if (this.checked) {
      localStorage.setItem("specialMode", "on");
      startspecialMode();
    } else {
      localStorage.setItem("specialMode", "off");
      stopspecialMode();
    }
  });
}


// Start everything once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  console.log("[Footer] Footer script loaded.");
  initRaveSwitch();
  initLightModeSwitch();
  initspecialSwitch();
  fetch('footer.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('footer').innerHTML = html;
    })
    .catch(error => {
      console.error('Kaut kas nogāja greizi ar footeru:', error);
    });
});