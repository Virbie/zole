document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".iest input").forEach((switchEl, index) => {
    switchEl.addEventListener("change", function () {
      if (this.checked) {
        document.querySelectorAll(".iest input").forEach((el, i) => {
          if (i !== index) {
            el.checked = false;
          }
        });
        if (index === 0) {
          startColorChange();
        } else {
          stopColorChange();
        }
      } else {
        stopColorChange();
      }
    });
  });

  let colorInterval;
  const defaultColors = {
    red: getComputedStyle(document.documentElement).getPropertyValue("--red"),
    balts: getComputedStyle(document.documentElement).getPropertyValue(
      "--balts",
    ),
    bg: getComputedStyle(document.documentElement).getPropertyValue("--bg"),
    bg2: getComputedStyle(document.documentElement).getPropertyValue("--bg2"),
    blak: getComputedStyle(document.documentElement).getPropertyValue("--blak"),
    gray: getComputedStyle(document.documentElement).getPropertyValue("--gray"),
    gray1: getComputedStyle(document.documentElement).getPropertyValue(
      "--gray1",
    ),
    gray2: getComputedStyle(document.documentElement).getPropertyValue(
      "--gray2",
    ),
    wait: getComputedStyle(document.documentElement).getPropertyValue("--wait"),
    pink: getComputedStyle(document.documentElement).getPropertyValue("--pink"),
  };

  function startColorChange() {
    colorInterval = setInterval(() => {
      document.documentElement.style.setProperty("--red", getRandomColor());
      document.documentElement.style.setProperty("--balts", getRandomColor());
      document.documentElement.style.setProperty("--bg", getRandomColor());
      document.documentElement.style.setProperty("--bg2", getRandomColor());
      document.documentElement.style.setProperty("--blak", getRandomColor());
      document.documentElement.style.setProperty("--gray", getRandomColor());
      document.documentElement.style.setProperty("--gray1", getRandomColor());
      document.documentElement.style.setProperty("--gray2", getRandomColor());
      document.documentElement.style.setProperty("--wait", getRandomColor());
      document.documentElement.style.setProperty("--pink", getRandomColor());
    }, 1);
  }

  function stopColorChange() {
    clearInterval(colorInterval);
    document.documentElement.style.setProperty("--red", defaultColors.red);
    document.documentElement.style.setProperty("--balts", defaultColors.balts);
    document.documentElement.style.setProperty("--bg", defaultColors.bg);
    document.documentElement.style.setProperty("--bg2", defaultColors.bg2);
    document.documentElement.style.setProperty("--blak", defaultColors.blak);
    document.documentElement.style.setProperty("--gray", defaultColors.gray);
    document.documentElement.style.setProperty("--gray1", defaultColors.gray1);
    document.documentElement.style.setProperty("--gray2", defaultColors.gray2);
    document.documentElement.style.setProperty("--wait", defaultColors.wait);
    document.documentElement.style.setProperty("--pink", defaultColors.pink);
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
});
