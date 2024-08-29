const ps = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!~@#$%^&*()_+[]{}<>?/'
};

const scroll = document.querySelector('.scroll'),
      scrollNumber = document.querySelector('.details span'),
      indicator = document.querySelector('.pass-indicator'),
      passInput = document.querySelector('.input-box input'),
      btn = document.querySelector('.generate-btn'),
      copy = document.querySelector('.material-symbols-outlined');

let passWord = '';

function password (maxNumber) {
  const selectedOptions = document.querySelectorAll('.option input');
  let pass = '';
  let passString = '';
  
  selectedOptions.forEach(option => {
    if (option.type === 'checkbox' && option.checked) {
      const key = option.getAttribute('id');
      passString += ps[key];
    }   
  });

  for(let i = 0; i < maxNumber; i++ ) {
    const random = Math.floor(Math.random() * passString.length);
    pass += passString[random];
  }

  const response = [pass, passString];

  if (checkPassword(response[0], response[1]) === false) {
    return password(maxNumber);
  } else {
    return response; 
  }
}

function checkPassword(str, passString) {
  if (passString.includes(`${ps.lowercase}`)) {
    const pattern = /(?=.*[a-z])/;

    if (!pattern.test(str)) {
      return false;
    } 
  }

  if (passString.includes(`${ps.uppercase}`)) {
    const pattern = /(?=.*[A-Z])/;

    if (!pattern.test(str)) {
      return false;
    } 
  }

  if (passString.includes(`${ps.numbers}`)) {
    const pattern = /(?=.*[0-9])/;

    if (!pattern.test(str)) {
      return false;
    } 
  }
  
  if (passString.includes(`${ps.symbols}`)) {
    const pattern = /(?=.*[!~@#$%^&*()_+[\]{}<>/?])/;

    if (!pattern.test(str)) {
      return false;
    } 
  }
  return true;
}

function changeIndicatorColor() {
  if (scroll.value > 8 && scroll.value <= 12) {
    indicator.classList.remove('weak', 'strong', 'midStrong');
    indicator.classList.add('mid');
  } else if (scroll.value > 12 && scroll.value <=18) {
    indicator.classList.remove('mid', 'weak', 'strong');
    indicator.classList.add('midStrong');
  }  else if ((scroll.value > 18 && scroll.value < 25)) {
      indicator.classList.remove('mid', 'midStrong', 'weak');
      indicator.classList.add('strong');
    } else {
        indicator.classList.remove('mid', 'strong', 'midStrong');
        indicator.classList.add('weak');
  }
}

function removeCopy() {
  copy.classList.remove('greenCopy');
  copy.textContent = 'copy_all';
}


btn.addEventListener('click', () => {
  passWord = password(scroll.value)[0];
  passInput.value = passWord;
  removeCopy();
});
  
passWord = password(scroll.value)[0];
passInput.value = passWord;

scroll.addEventListener('input', () => {
  scrollNumber.textContent = scroll.value;
  changeIndicatorColor();
  passWord = password(scroll.value)[0];
  passInput.value = passWord;
  removeCopy();
});

document.querySelectorAll('.option input').forEach( item => {
  item.addEventListener('change', () => {
    removeCopy();
    passWord = password(scroll.value)[0];
    passInput.value = passWord;
  });
});

copy.addEventListener('click', () => {
  copy.classList.add('greenCopy');
  copy.textContent = 'priority';
  navigator.clipboard.writeText(`${passWord}`);
});





