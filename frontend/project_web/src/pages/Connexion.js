import React from "react";
import Cookies from "react-cookies";
import {createStorageUser, fetchPost} from "../utils/utils";

function Connexion() {
	const [data, setData] = React.useState({});
	const [erreur, setErreur] = React.useState(null);

	const onChange = (event) => {
		data[event.target.name] = event.target.value;
		setData(data);
		if (erreur !== null) {
			setErreur(null);
		}
	}

	function connexion(event) {
		event.preventDefault();
		const user = {
			email: data.email,
			password: data.password
		}
		fetchPost("user/connexion", user).then(res => {
			if (res.status !== 200) {
				setErreur("Mauvais identifiants");
			} else {
				res.json().then((data) => {
					createStorageUser(data);
					if (Cookies.load("panier") !== undefined) {
						Cookies.remove("panier");
						window.location.href = "/panier";
					} else {
						window.location.href = "/";
					}
				});
			}
		}).catch((error) => {
			console.error('Error:', error);
		});
	}

	return (
		<div>
			<h1>Connexion</h1>
			<form onSubmit={(event) => connexion(event)}>
				<label>Email:
					<input type="text" name="email" required
					       onChange={(event) => onChange(event)}/></label><br/>
				<label>Mot de passe:
					<input type="password" name="password" required
					       onChange={(event) => onChange(event)}/></label><br/>
				<input type="submit" value="Submit"/><br/>
				<span style={{ color: "red" }}>{erreur}</span>
			</form>
			<br/>
			<a href="/inscription">Pas encore inscrit ?</a>
		</div>
	);
}

export default Connexion;