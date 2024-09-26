import { User, UserLogin } from "../interfaces/User";
import { alert } from "../components/alert";
import { addUserRegister, loadUsers, users } from "../main";

document.addEventListener("DOMContentLoaded", () => {

    loadUsers()


    const registerForm = document.querySelector<HTMLFormElement>("#register-form");
    const inputName = document.querySelector<HTMLInputElement>("#name");
    const inputPhone = document.querySelector<HTMLInputElement>("#phone");
    const inputPassword = document.querySelector<HTMLInputElement>("#password");
    const inputImage = document.querySelector<HTMLInputElement>("#image");
    const inputInfo = document.querySelector<HTMLInputElement>("#info");

    const loginForm = document.querySelector<HTMLFormElement>("#loginForm");
    const loginPhone = document.querySelector<HTMLInputElement>("#loginPhone");
    const loginPassword = document.querySelector<HTMLInputElement>("#loginPassword");

    inputName?.addEventListener("blur", validateInputs);
    inputPhone?.addEventListener("blur", validateInputs);
    inputPassword?.addEventListener("blur", validateInputs);
    inputImage?.addEventListener("blur", validateInputs);
    inputInfo?.addEventListener("blur", validateInputs);

    registerForm?.addEventListener("submit", sendForm);
    loginForm?.addEventListener("submit", login);

    const userApp: User = {
        id: Date.now(),
        name: "",
        phone: null,
        password: "",
        image: "",
        isActive: false,
        info: "",
        date: "",
        friends: [],
        messages: []
    }

    const userLogin: UserLogin = {
        phone: null,
        password: ""
    }

    function validateInputs(e: Event) {
        const target = e.target as HTMLInputElement;
        const parent = target.parentElement as HTMLElement

        if (target.value === "") {
            const message = target.name;
            alert(`El campo ${message} es obligatorio`, parent);
            return
        }
    }

    function sendForm(e: SubmitEvent) {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const parent = target.parentElement as HTMLElement

        const userRegister = Object.assign(userApp, {
            id: Date.now(),
            name: inputName?.value,
            phone: inputPhone?.value,
            password: inputPassword?.value,
            image: inputImage?.value,
            isActive: false,
            info: inputInfo?.value,
            date: null,
            friends: [],
            messages: []
        })

        if (Object.values(userRegister).includes("")) {
            alert("Los campos no pueden ir vacíos", parent)
            return
        }

        addUserRegister({ ...userRegister })

        Object.assign(userRegister, {
            id: Date.now(),
            name: "",
            phone: null,
            password: "",
            image: "",
            isActive: false,
            info: "",
            date: "",
            friends: [],
            messages: []
        })

        registerForm?.reset();

    };

    //****************LOGIN*****************************//
    function login(e: SubmitEvent) {
        e.preventDefault();

        const target = e.target as HTMLInputElement;
        const parent = target.parentElement as HTMLElement

        const userLogged = Object.assign(userLogin, {
            phone: loginPhone?.value,
            password: loginPassword?.value
        });

        if (Object.values(userLogged).includes("")) {
            alert("Los campos no pueden ir vacíos", parent)
            return
        }

        const findUser = users.find(user => user.phone === userLogged.phone && user.password === userLogged.password)
        if(findUser) {
            findUser.isActive = true

            localStorage.setItem("loggedUser", JSON.stringify(findUser));

            setTimeout(() => {
                location.href = "/src/pages/chat.html"
            }, 1000);
        }else {
            alert("Usuario no encontrado", parent);
            return;
        }

        Object.assign(userLogged, {
            phone: null,
            password: ""
        });

        loginForm?.reset();
    }
});