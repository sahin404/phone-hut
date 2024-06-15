// Load Phone information
const loadPhone = async (phone = "a") => {
  const singlePhone = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phone}`
  );
  const singlePhoneJson = await singlePhone.json();
  showInformation(singlePhoneJson.data);
};

//Show Phone in card
function showInformation(phones) {
  // console.log(phones);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerText = "";
  const PhonesLength = phones.length;
  if (PhonesLength > 12) {
    phones = phones.slice(0, 12);
    notFound(false);
    showMoreButton(true);
  } else {
    if(PhonesLength===0){
        notFound(true);
        showMoreButton(false);
        loadingOption(false);
    }
    else{
        notFound(false);
        showMoreButton(false);
    }
    
  }

  phones.forEach((phone) => {
    // console.log(phone);
    const card = document.createElement("div");
    card.classList = `card bg-base-100 shadow-xl`;
    card.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions justify-center">
                        <button onclick="modalImplementation('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>
        `;
    cardContainer.appendChild(card);
    loadingOption(false);
  });
}

//modalImplementation

const modalImplementation = async(slug)=>{
  const phone  = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
  const phoneDetails = await phone.json();
  setModal(phoneDetails.data);
  my_modal.showModal();

}

// Set Modal
function setModal(phone){
  // console.log(phone);
  const innerModal = document.getElementById('inner-modal');
  innerModal.innerHTML = `
  <img src="${phone.image}"></img>
  <h1 class = "text-3xl my-3">${phone.name}</h1>
  <h1> <span class = "font-bold">Storage: </span>${phone?.mainFeatures?.memory}</h1>
  <h1><span class = "font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize}</h1>
  <h1><span class = "font-bold">Chipset: </span> ${phone?.mainFeatures?.chipSet}</h1>
  
  `
}
// Show More button
function showMoreButton(check) {
  const showMore = document.getElementById("show-more-button");
  if (check) {
    showMore.classList.remove("hidden");
  } else {
    showMore.classList.add("hidden");
  }
}

// Not Found Section

function notFound(check2){
    const notFoundText = document.getElementById('not-found');
    if(check2){
        notFoundText.classList.remove('hidden');
    }
    else{
      notFoundText.classList.add('hidden');
    }

}

// Search Option Implementation
function searchPhone() {
  loadingOption(true);
  const inputText = document.getElementById("input-text");
  const inputTextValue = inputText.value;
  loadPhone(inputTextValue);
}

//Loading
function loadingOption(check){
  const loadingId = document.getElementById('loading');
  if(check){
    loadingId.classList.remove('hidden');
  }
  else{
    loadingId.classList.add('hidden');
  }
}

loadPhone();
