import './style.css'
import { User, Message } from './interfaces/User'

export let users:User[] = [];
export let user:User

export const loadLoggedUser = () => {
    const storedUser = localStorage.getItem("loggedUser");
    user = storedUser ? JSON.parse(storedUser) : [];
}

export const loadUsers = () => {
    const storedUsers = localStorage.getItem("users");
    users = storedUsers ? JSON.parse(storedUsers) : [];
};

export const addFriend = (friend:User) => {
    
    user = { ...user, friends: [...user.friends, friend] };

    const updatedUsers = users.map(u => {
        if(u.id === user.id) {
            return user;
        }

        return u;
    })

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

export const addMessageFriend = (message: Message) => {
    user = {...user, messages: [...user.messages,message]};

    const updatedMessage = users.map(u => {
        if(u.id === user.id) {
            return user;
        }else if(u.id === message.recipientId) {
            const updatedFriend = {
                ...u,
                messages: [...u.messages, message]
            };
            return updatedFriend
        }
        return u;
    })


    localStorage.setItem("users", JSON.stringify(updatedMessage));
    localStorage.setItem("loggedUser", JSON.stringify(user));
}

export const addUserRegister = (user:User) => {
    users = [...users, user];
    localStorage.setItem("users", JSON.stringify(users))
}