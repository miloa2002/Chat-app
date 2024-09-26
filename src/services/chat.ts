import { loadLoggedUser, addMessageFriend, users, addFriend, user } from "../main";
import { alert } from "../components/alert";
import { Message, User } from "../interfaces/User";
import moment from "moment";

document.addEventListener("DOMContentLoaded", () => {

    const invitationFriend = document.querySelector<HTMLFormElement>("#friendForm");
    const friendPhone = document.querySelector<HTMLInputElement>("#friendPhone");
    const formChat = document.querySelector<HTMLFormElement>("#form-chat");
    const inputMessage = document.querySelector<HTMLInputElement>("#message-input");
    const chatMessagesContent = document.querySelector<HTMLDivElement>("#chat-messages");

    const divChats = document.querySelector("#chats");

    invitationFriend?.addEventListener("submit", getFriend);

    formChat?.addEventListener("submit", addMessage);

    loadLoggedUser();

    let friendChat:User;
    
    const message: Message = {
        id: Date.now(),
        senderId: null,
        recipientId: null,
        content: null,
        timestamps: null,
        isRead: false
    }

    function getFriend(e: SubmitEvent) {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const parent = target.parentElement as HTMLElement


        if (friendPhone?.value === "") {
            alert("Los campos no pueden ir vacíos", parent)
            return
        }

        const findUser = users.filter(u => u.phone?.toString() === friendPhone?.value)

        if (findUser.length <= 0) {
            alert("Usuario no encontrado", parent);
            return;
        }

        addFriend({ ...findUser[0] });

        invitationFriend?.reset();

        showChats();

    }

    showChats();
    function showChats() {

        cleanHtml();

        user.friends.forEach(friend => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div class="flex gap-4 items-center border-b-2 p-2 cursor-pointer">
                    <img class="w-16 h-16 object-cover rounded-full" src="${friend.image}" alt="">
                    <div>
                        <p class="font-bold">${friend.name}</p>
                        <p>Mensaje</p>
                    </div>
                </div>
            `;

            div.addEventListener("click", () => {
                friendChat = friend;
                const allDivs = document.querySelectorAll(".bg-gray-200")

                allDivs.forEach(element => element.classList.remove("bg-gray-200"));

                div.classList.add("bg-gray-200");

                loadMessages();

            })

            divChats?.appendChild(div);
        })
    }

    function addMessage(e: Event) {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const parent = target.parentElement as HTMLElement

        const valueMessage = inputMessage?.value

        if (!friendChat || !friendChat.id) {
            alert("No se ha seleccionado un contacto", parent);
            return;
        }    

        if (valueMessage === "") {
            alert("El campo no puede estar vacío", parent);
            return;
        }else {
            const messageUser = Object.assign(message, {
                id: Date.now(),
                senderId: user.id,
                recipientId: friendChat.id,
                content: valueMessage,
                timestamps: moment().format('YYYY-MM-DD HH:mm:ss'),
                isRead: false
            })
       
            addMessageFriend({...messageUser});
            Object.assign(messageUser, {
                message
            })

            loadMessages();
        }
        formChat?.reset();
    }

    
    function loadMessages() {
        cleanChatMessages(); 
    
        const filteredMessages = user.messages.filter((msg) => {
            return (
                (msg.senderId === user.id && msg.recipientId === friendChat.id) ||
                (msg.senderId === friendChat.id && msg.recipientId === user.id)
            );
        });
    
        filteredMessages.forEach((msg) => {
            const messageWrapper = document.createElement("div");
            const messageDiv = document.createElement("div");
    
            if (msg.senderId === user.id) {
                messageWrapper.classList.add("flex", "justify-end", "mb-2");
                messageDiv.classList.add(
                    "bg-green-500", 
                    "text-white", 
                    "p-3", 
                    "rounded-lg", 
                    "max-w-xs", 
                    "break-words"
                );
            } else {
                messageWrapper.classList.add("flex", "justify-start", "mb-2");
                messageDiv.classList.add(
                    "bg-gray-400", 
                    "text-white", 
                    "p-3", 
                    "rounded-lg", 
                    "max-w-xs", 
                    "break-words"
                );
            }
    
            messageDiv.innerHTML = `
                <p class="mb-1">${msg.content}</p>
                <small class="text-xs text-gray-200">${msg.timestamps}</small>
            `;
    
            messageWrapper.appendChild(messageDiv);
            chatMessagesContent?.appendChild(messageWrapper);
        });
    }
    

    function cleanHtml() {
        while (divChats?.firstChild) {
            divChats.removeChild(divChats.firstChild);
        }
    };

    function cleanChatMessages() {
        while (chatMessagesContent?.firstChild) {
            chatMessagesContent.removeChild(chatMessagesContent.firstChild);
        }
    };

});