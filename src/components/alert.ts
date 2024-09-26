export function alert(message: string, position: HTMLElement) {
    const div = document.createElement("DIV");

    div.innerHTML = `
        <div class="bg-red-100 border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">${message}</strong>
        </div>
    `

    setTimeout(() => {
        div.remove()
    }, 3000);

    position.appendChild(div)
}