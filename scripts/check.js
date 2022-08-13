let links = document.getElementsByClassName('addCheck');

for (let i = 0; i < links.length; i++) {
  links.item(i).insertAdjacentHTML(
    'afterend',
    `<label class="custom-check">
      <input type="checkbox" class="chk">
      <span class="checkmark"></span>
    </label>`
  );
}

let checkBoxes = document.getElementsByClassName('chk');

for (let i = 0; i < checkBoxes.length; i++) {
  const current = checkBoxes.item(i);
  // Check if saved, load it
  if (
    JSON.parse(
      localStorage.getItem(
        document.title + links.item(i).text + links.item(i).href
      )
    )
  ) {
    current.checked = JSON.parse(
      localStorage.getItem(
        document.title + links.item(i).text + links.item(i).href
      )
    );
  }
  // else save it
  else {
    localStorage.setItem(
      document.title + links.item(i).text + links.item(i).href,
      current?.checked
    );
  }
}

for (let i = 0; i < checkBoxes.length; i++) {
  const current = checkBoxes.item(i);
  current?.addEventListener('click', () => {
    localStorage.setItem(
      document.title + links.item(i).text + links.item(i).href,
      current?.checked
    );
    setCheckedValue();
  });
}

// TODO: Get the number of checked boxes

const getChecked = () => {
  let count = 0;
  for (let i = 0; i < checkBoxes.length; i++) {
    if (
      JSON.parse(
        localStorage.getItem(
          document.title + links.item(i).text + links.item(i).href
        )
      )
    )
      count++;
  }
  return count;
};

const setCheckedValue = () => {
  const precentage = document.getElementById('progress');
  const background = document.getElementById('back');
  const value = parseInt(getChecked());
  const finalAns = Math.round((value / checkBoxes.length) * 10000) / 100;
  precentage.innerHTML = `Progress : ${finalAns} %`;
  background.style.width = (value * 100) / checkBoxes.length + '%';
};

setCheckedValue();
