function sl () {
  // slider
var slider = tns({
  container: '.friend__section__items__inner',
  "items": 3,
  "slideBy": "page",
  "swipeAngle": false,
  "speed": 400,
  "responsive": {
    "1280": {
      "items": 3,
    },
    "768": {
      "items": 2,
      
    },
    "300": {
      "items": 1,
    },
   
  },
});

// set img for navigation
document.querySelector(['[data-controls="next"]']).innerHTML = '<img src="../../assets/images/arrow-prev.png" alt="prev">';
document.querySelector(['[data-controls="prev"]']).innerHTML = '<img src="../../assets/images/arrow-cur.png" alt="cur">';

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

  sl();
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
      if (uniqueStepList.length >= 3) {
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
    window.scrollTo(pageXOffset, 0)
    document.querySelector('.menu').classList.remove('active');
    document.querySelector('.header__burger').classList.remove('active');
    document.querySelector('.logo').classList.remove('active');
    document.querySelector('.header').classList.remove('active');
    document.body.classList.remove('noscroll');
});


