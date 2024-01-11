export function updateTime() {
  let targetElement = document.getElementById("clock");
  let now = new Date().toLocaleTimeString();
  targetElement.innerText = now;
}

export const timer = setInterval(() => {
  updateTime();
}, 1000);

export const timeOut = setTimeout((seconds) => {
  clearInterval(timer);
}, seconds * 1000);
