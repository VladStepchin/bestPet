console.log("Hello! It is working");

// initiate some of JS functionality of Materialize
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
});


const randomImageButton = document.getElementsByClassName("random-image")[0];

randomImageButton.addEventListener("click", async (e) => {
  let imageUrlInput = document.getElementsByClassName('create-post')[0];

  let randomImage = await fetch("/post/random-image").then(responce => responce.json())
  imageUrlInput.value = randomImage.imageUrl
});
