const inputLink = document.getElementById("input-url");
const btn = document.getElementById("submit");
let urlsArr = [localStorage.getItem("urls")];

const shortURL = async () => {
  const res = await fetch(
    `https://api.shrtco.de/v2/shorten?url=${inputLink.value}`
  );
  const data = await res.json();
  let output = `
  <div class="url">
            <div class="entered-url">
            <a href="${inputLink.value}">${inputLink.value}</a>
            </div>
            <div class="short-url">
            <a href="${data.result.full_short_link}">${data.result.full_short_link}</a>
            </div>
            <button id="copy">Copy</button>
        </div>
  `;
  document.querySelector(".url-container").innerHTML += output;
  inputLink.value = "";
  urlsArr.push(output);
  localStorage.setItem("urls", urlsArr);
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputLink.value == "") {
    document.querySelector(".error-msg").innerHTML = "<p>Please add a link</p>";
    setTimeout(() => {
      document.querySelector(".error-msg").innerHTML = "";
    }, 3000);
  } else {
    shortURL();
    copyURL();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".url-container").innerHTML =
    localStorage.getItem("urls");
});

const copyURL = () => {
  setTimeout(() => {
    const copyBtn = document.querySelectorAll("#copy");
    copyBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const shorturl = e.target.previousElementSibling.children[0].innerHTML;
        navigator.clipboard.writeText(shorturl).then(() => {
          e.target.style.backgroundColor = "hsl(260, 8%, 14%)";
          e.target.textContent = "Copied!";
          e.target.style.color = "#fff";
        });
      });
    });
  }, 500);
};

copyURL();
