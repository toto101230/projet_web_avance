function Deconnexion() {
    localStorage.removeItem("user");
    window.location.href = "/";
}

export default Deconnexion;