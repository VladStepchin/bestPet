

// initiate some of JS functionality of Materialize
document.addEventListener("DOMContentLoaded", async ()=> {

  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  // check if the user is available
  
});


const randomImageButton = document.getElementsByClassName("random-image")[0];

randomImageButton.addEventListener("click", async (e) => {
  let imageUrlInput = document.getElementsByClassName('create-post')[0];

  let randomImage = await fetch("/post/random-image").then(responce => responce.json())
  imageUrlInput.value = randomImage.imageUrl
});
