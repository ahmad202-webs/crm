let box = document.querySelector(".box");
let API = "http://localhost:3002/users";

async function get() {
  try {
    let response = await fetch(API);
    let data = await response.json();
    getData(data);
  } catch (error) {
    console.error(error);
  }
}

function getData(data) {
  box.innerHTML = "";
  data.forEach((elem) => {
    let tr = document.createElement("tr");

    let name = document.createElement("td");
    name.innerHTML = elem.name
    tr.appendChild(name);

    let datesCount = 4;

    let scoreSelects = [];
    let attCheckboxes = [];

    for (let i = 0; i < datesCount; i++) {
      let attTd = document.createElement("td");
      let attCheckbox = document.createElement("input");
      attCheckbox.type = "checkbox";
        attCheckbox.checked = true;
        attCheckbox.style.width = "20px";
        attCheckbox.style.height = "20px";
        attCheckbox.style.accentColor = "#3b82f6"
        attCheckbox.style.borderRadius = "4px";
        attCheckbox.style.cursor = "pointer";

      attTd.appendChild(attCheckbox);
      tr.appendChild(attTd);
      attCheckboxes.push(attCheckbox);

      let scoreTd = document.createElement("td");
      let scoreSelect = document.createElement("select");
      for (let s = 0; s <= 5; s++) {
        let option = document.createElement("option");
        option.value = s;
        option.textContent = s;
        scoreSelect.appendChild(option);
      }
      scoreTd.appendChild(scoreSelect);
      tr.appendChild(scoreTd);
      scoreSelects.push(scoreSelect);
    }

    let bonusTd = document.createElement("td");
    let bonusSelect = document.createElement("select");
    for (let b = 0; b <= 5; b++) {
      let option = document.createElement("option");
      option.value = b;
      option.textContent = b;
      bonusSelect.appendChild(option);
    }
    bonusTd.appendChild(bonusSelect);
    tr.appendChild(bonusTd);

    let examTd = document.createElement("td");
    let examInput = document.createElement("input");
    examInput.type = "number";
    examInput.min = 0;
    examTd.appendChild(examInput);
    tr.appendChild(examTd);

    let sumTd = document.createElement("td");
    sumTd.classList.add("sum-cell");
    tr.appendChild(sumTd);

    function calculateSum() {
      let sum = 0;

      for (let i = 0; i < datesCount; i++) {
        if (attCheckboxes[i].checked) {
          sum += Number(scoreSelects[i].value);
        }
      }

      sum += Number(bonusSelect.value);

      let examVal = Number(examInput.value);
      if (!isNaN(examVal) && examVal >= 0) {
        sum += examVal;
      }

      sumTd.textContent = sum;
    }

    scoreSelects.forEach((select) =>
      select.addEventListener("change", calculateSum)
    );
    attCheckboxes.forEach((checkbox) =>
      checkbox.addEventListener("change", calculateSum)
    );
    bonusSelect.addEventListener("change", calculateSum);
    examInput.addEventListener("input", calculateSum);

    calculateSum();

    box.appendChild(tr);
  });
}

get();
