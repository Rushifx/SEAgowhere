function validate(event) {

    event.preventDefault();

    const email = document.getElementById("newsEmail").value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const toastElement = document.getElementById("news-toast");
    const toastBodyElement = document.getElementById("news-toast-body");

    if (emailRegex.test(email)) {
        showToast({ toastElement, toastBodyElement, bgColor: "success", msg: "Thank you for subscribing to our newsletter!" });
        return;
    } else {
        showToast({toastElement, toastBodyElement, bgColor: "danger", msg: "Sorry! Please input a valid email."});
        return;
    }
}

function showToast({ toastElement, toastBodyElement, bgColor, msg }) {
    toastElement.classList.remove("bg-success", "bg-danger");
    toastElement.classList.add(`bg-${bgColor}`, "text-white");
    toastBodyElement.textContent = msg;
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}