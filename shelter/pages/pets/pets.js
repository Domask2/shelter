const galleryItems = document.querySelector('.friend__section__items__inner').children;
const prev = document.querySelector('.previous');
const next = document.querySelector('.next');
const page = document.querySelector('.number');
const end = document.querySelector('.end');
const last = document.querySelector('.last');
let maxItem = 8;
let index = 1;
let pagination;


// pagination
window.addEventListener("resize", resizeThrottler, false);
window.addEventListener("load", resizeThrottler, false);

var resizeTimeout;
function resizeThrottler() {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if ( !resizeTimeout ) {
    resizeTimeout = setTimeout(function() {
      resizeTimeout = null;
      actualResizeHandler();
     // The actualResizeHandler will execute at a rate of 15fps
     }, 66);
  }

}

function actualResizeHandler() {
  if (document.documentElement.clientWidth >= 1280) {
    maxItem = 8;
  } else if (document.documentElement.clientWidth <=1279 && document.documentElement.clientWidth>= 768) {
    maxItem = 6;
  } else if (document.documentElement.clientWidth <768) {
    maxItem = 3;
  }
  index=1;
  pagination = Math.ceil(galleryItems.length/maxItem);
  showItems();
      check();
  return pagination;
}

prev.addEventListener('click', function() {
index--;
check();
showItems();
});

next.addEventListener('click', function() {
index++;
check();
showItems();
});

last.addEventListener('click', function() {
index = pagination;

check();
showItems();
});

end.addEventListener('click', function() {
index = 1;
check();
showItems();
});

function check() {
if (index==pagination) {
  next.setAttribute('disabled','disabled');
  last.setAttribute('disabled','disabled');
}
else {
  next.removeAttribute('disabled','disabled');
  last.removeAttribute('disabled','disabled');
}

if(index>1) {
  prev.removeAttribute('disabled','disabled');
  end.removeAttribute('disabled','disabled');
} else {
  prev.setAttribute('disabled','disabled');
  end.setAttribute('disabled','disabled');
}

}

function showItems() {
for(let i=0;i<galleryItems.length; i++) {
  galleryItems[i].classList.remove('show');
  galleryItems[i].classList.add('hide');

  if(i>=(index*maxItem)-maxItem && i<index*maxItem) {
    galleryItems[i].classList.remove('hide');
    galleryItems[i].classList.add('show');
  }

  page.innerHTML=index;
}

}

// random
let pets = [];
let fullPetsList = []; // 48

const request = new XMLHttpRequest();
request.open('GET', './pets.json');

request.onload = () => {
  pets = JSON.parse(request.response);

  fullPetsList = (() => {
    let tempArr = [];

    for (let i=0; i<6; i++) {
      const newPets = pets;

      for(let j=pets.length; j>0; j--) {
        let randInd = Math.floor((Math.random() * j));
        const randElem = newPets.splice(randInd,1)[0];
        newPets.push(randElem);
      }
      tempArr = [...tempArr, ...newPets];
    }
    return tempArr;
  }) ();


  fullPetsList = sort863(fullPetsList);
  

  createPets(fullPetsList);

  for (let i=0; i<(fullPetsList.length/6); i++) {
    const stepList = fullPetsList.slice(i * 6, (i*6) + 6);

    for(let j=0; j<6; j++) {
      stepList.forEach((item, ind) => {
        if (item.name === stepList[j].name && (ind !== j) ) {
          document.querySelector('#pets').children[(i*6) + j].style.border = '5px solid red';
        }
      });
    }
  }
  modal();
  resizeThrottler(); 
  actualResizeHandler();
  showItems();
  check();
}

const createPets = (petsList) => {
  const elem = document.querySelector('.friend__section__items__inner');
  elem.innerHTML += createElements(petsList);
}

const createElements = (petsList) => {
  let str = '';
  for (let i=0; i<petsList.length; i++) {
    str = str + `
    <div class="friend__section__item">
    <img class="friend__section__item__img" src="${ petsList[i].img }" alt="photo">
    <div class="friend__section__items__title">
      ${petsList[i].name}
    </div>
    <button type="button" class="friend__section__items__btn">
      Learn more
    </button>
  </div>
    `;
    
  }
  return str;
}

request.send();
 
const sort863 = (list) => {
  let unique8List = [];
  let length = list.length;
  for (let i = 0; i < length / 8; i++) {
    const uniqueStepList = [];
    for (j = 0; j < list.length; j++) {
      if (uniqueStepList.length >= 8) {
        break;
      }
      const isUnique = !uniqueStepList.some((item) => {
        return item.name === list[j].name;
      });
      if (isUnique) {
        uniqueStepList.push(list[j]);
        list.splice(j, 1);
        j--;
      }
    }
    unique8List = [...unique8List, ...uniqueStepList];
  }
  list = unique8List;


  list = sort6recursively(list);

  return list;
}

const sort6recursively = (list) => {
  const length = list.length;

  for (let i = 0; i < (length / 6); i++) {
    const stepList = list.slice(i * 6, (i * 6) + 6);

    for (let j = 0; j < 6; j++) {
      const duplicatedItem = stepList.find((item, ind) => {
        return item.name === stepList[j].name && (ind !== j);
      });

      if (duplicatedItem !== undefined) {
        const ind = (i * 6) + j;
        const which8OfList = Math.trunc(ind / 8);

        list.splice(which8OfList * 8, 0, list.splice(ind, 1)[0]);

        sort6recursively(list);
      }
    }
  }

  return list;
}
  
  resizeThrottler(); 
  actualResizeHandler();
  showItems();
  check();


// burger menu
document.querySelector('.header__burger').addEventListener('click', function() {
  document.querySelector('.menu').classList.toggle('active');
  document.querySelector('.header__burger').classList.toggle('active');
  document.querySelector('.logo').classList.toggle('active');
  document.querySelector('.header').classList.toggle('active');
  document.body.classList.toggle('noscroll');
});

document.querySelector('.header').addEventListener('click', function(e) {
  if(e.target.matches('.header.active')) {
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.header__burger').classList.remove('active');
    document.querySelector('.logo').classList.remove('active');
    document.querySelector('.header').classList.remove('active');
    document.body.classList.remove('noscroll');
  }

});

document.querySelector('.list__link_active').addEventListener('click', function(e) {
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.header__burger').classList.remove('active');
    document.querySelector('.logo').classList.remove('active');
    document.querySelector('.header').classList.remove('active');
    document.body.classList.remove('noscroll');
});


function modal () {
  // modal window
const sliderItems = document.querySelectorAll('.friend__section__item');
sliderItems.forEach(item => {
  item.addEventListener('click', (e) => {

      document.querySelector('.modal').style.opacity = '0';
      // document.querySelector('.modal').classList.add('animate__animated', 'animate__fadeIn');
      document.querySelector('.modal').style.display = 'block'; 
      setTimeout(()=> {
        document.querySelector('.modal').style.opacity = '1';
      },500);
      document.body.style.overflow = 'hidden';

      const request = new XMLHttpRequest();
      request.open('GET', './pets.json');
      request.onload = () => {
      pets = JSON.parse(request.response);


        pets.forEach((item,i) => {
          if(e.target.matches('.friend__section__item')) {

            document.querySelector('.modal').style.display = 'none'; 
            document.querySelector('.modal').style.opacity = '0';
            document.body.style.overflow = 'hidden';
            
              if ( (e.target.textContent.indexOf(item.name))!==-1) {
                
                document.querySelector('.modal__section--img').src = item.img;
                document.querySelector('.modal__section--title').innerHTML = item.name;
                document.querySelector('.modal__section--typebredd .type').innerHTML = item.type;
                document.querySelector('.modal__section--typebredd .breed').innerHTML = item.breed;
                document.querySelector('.modal__section--description').innerHTML = item.description;
                document.querySelector('.li-inoculations-pets').innerHTML = item.inoculations;
                document.querySelector('.li-diseases-pets').innerHTML = item.diseases;
                document.querySelector('.li-parasites-pets').innerHTML = item.parasites;
              }
          } else {
            
              if ( (e.target.parentElement.textContent).indexOf(item.name)!==-1) {
                
                document.querySelector('.modal__section--img').src = item.img;
                document.querySelector('.modal__section--title').innerHTML = item.name;
                document.querySelector('.modal__section--typebredd .type').innerHTML = item.type;
                document.querySelector('.modal__section--typebredd .breed').innerHTML = item.breed;
                document.querySelector('.modal__section--description').innerHTML = item.description;
                document.querySelector('.li-inoculations-pets').innerHTML = item.inoculations;
                document.querySelector('.li-diseases-pets').innerHTML = item.diseases;
                document.querySelector('.li-parasites-pets').innerHTML = item.parasites;
           }
          }

        });

        
      };

      request.send();
  });

document.querySelector('.modal__wrapper').addEventListener('click', (e) => {
  if(e.target.matches('.modal__wrapper')) {
    document.querySelector('.modal').style.opacity = '0';
    // document.querySelector('.modal').classList.add('animate__animated', 'animate__fadeOut')
    setTimeout(()=> {
      document.querySelector('.modal').style.display = 'none';
    },500);
    
    document.body.style.overflow = '';
  }
  
  });
});

document.querySelector('.modal__section--close__wrapper').addEventListener('click', (e) => {
  document.querySelector('.modal').style.opacity = '0';
  // document.querySelector('.modal').classList.add('animate__animated', 'animate__fadeOut')
  setTimeout(()=> {
    document.querySelector('.modal').style.display = 'none';
  },500);
  document.body.style.overflow = '';
});

}





