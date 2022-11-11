

// initiate some of JS functionality of Materialize
document.addEventListener("DOMContentLoaded", async ()=> {

  const modals = document.querySelectorAll(".modal");
  const elems = document.querySelectorAll('.tooltipped');
  M.Tooltip.init(elems);
  M.Modal.init(modals);

  const randomImageButton = document.getElementsByClassName("random-image")[0];
  const likeButtons = document.querySelectorAll(".like-post");
  
  randomImageButton.addEventListener("click", async (e) => {
    let imageUrlInput = document.getElementsByClassName('create-post')[0];
  
    let randomImage = await fetch("/post/random-image").then(responce => responce.json())
    imageUrlInput.value = randomImage.imageUrl
  });
  
  likeButtons.forEach(button => {
    button.addEventListener("click", async (e) => {
  
      const postId = button.dataset.id;
  
     fetch(`/post/${postId}/like`, {
        method: 'PATCH'
      }).then(res => res.json()).then((res) => {
        if(typeof res === 'object'){
          debugger;          
          const spanWithLikes = document.querySelectorAll(`span[data-id="${postId}"]`)[0];
          const button = document.querySelectorAll(`button[data-id="${postId}"]`)[0];
          const likeIcon = document.querySelectorAll(`i.like[data-id="${postId}"]`)[0];

          spanWithLikes.innerText = res.likes;
          button.dataset.tooltip = res.likedBy
          debugger;
          likeIcon.innerText = res.increment ? "favorite" : "favorite_border" 
        }
      });      
    })
  })    
});

