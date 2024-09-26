const showModal = document.querySelector<HTMLButtonElement>("#show-modal"); 
const closeModal = document.querySelector<HTMLButtonElement>("#close-modal"); 

showModal?.addEventListener("click", () => {
    document.querySelector("#my-modal")?.classList.remove("hidden");
});

closeModal?.addEventListener("click", () => {
    document.querySelector("#my-modal")?.classList.add("hidden");
});
