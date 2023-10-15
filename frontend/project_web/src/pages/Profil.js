import React from "react";
import {fetchPost} from "../utils/utils";

function Profil() {
	const [user, setUser] = React.useState(null);
	const [erreur, setErreur] = React.useState(null);

	React.useEffect(() => {
		fetchPost("user/getUtilisateur", { nom: JSON.parse(localStorage.getItem("user")) })
			.then((res) => res.json())
			.then((data) => {
				setUser(data);
			})
	}, []);

	function onChange(event) {
		user[event.target.name] = event.target.value;
		setUser(user);
		setErreur(null)
	}

	function majAddress(event) {
		event.preventDefault();
		fetchPost("user/majAddress", {
			nom: user.nom,
			addressNumero: user.addressNumero,
			addressRue: user.addressRue,
			ville: user.ville,
			Codepostal: user.Codepostal
		}).then((res) => res.json()).then((data) => {
			if (data === "Utilisateur introuvable") {
				setErreur("Utilisateur introuvable");
			} else {
				setErreur(null);
				window.location.href = "/profil";
			}
		}).catch(() => {
			setErreur("Erreur lors de la mise à jour des informations");
		});
	}

	return (
		<div>
			<h1>Profil</h1>
			{!user ? "Loading..." : (
				<div>
					<p>Nom: {user.nom}</p>
					<p>Prénom: {user.prenom}</p>
					<p>Email: {user.email}</p>
					<form onSubmit={(event) => majAddress(event)}>
						<label>Adresse numéro : {user.addressNumero} <br/> Changer le numéro :
							<input type="number" name="addressNumero"
							       onChange={(event) => onChange(event)}/></label><br/><br/>
						<label>Adresse rue : {user.addressRue} <br/> Changer la rue :
							<input type="text" name="addressRue"
							       onChange={(event) => onChange(event)}/></label><br/><br/>
						<label>Ville : {user.ville} <br/> Changer la ville :
							<input type="text" name="ville"
							       onChange={(event) => onChange(event)}/></label><br/><br/>
						<label>Code postal : {user.Codepostal} <br/> Changer le code postal :
							<input type="number" name="Codepostal"
							       onChange={(event) => onChange(event)}/></label><br/>
						<button type="submit">Mettre à jour l'adresse</button>
					</form>
					{erreur}
				</div>
			)}
		</div>
	);
}

export default Profil;