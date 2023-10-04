function Commande(){
    if(localStorage.getItem('user') == null){
        window.location.href = "/connexion";
        return null;
    }

    return(
        <div>
            <h1>Commande</h1>
        </div>
    );

}

export default Commande;