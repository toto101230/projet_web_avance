import React from "react";

function Produits() {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("http://localhost:3001/add")
            .then((res) => res.json())
            .then((data) => {setData(data); console.log(data);})
            .catch((error) => setData([{title: "test", prix: 10}, {title: "test2", prix: 20}]));
    }, []);

    return (
        <div>
            <h1>Listes des produits</h1>
            <ul>
                {!data ? "Loading..." : data.map((product) => (
                    <li key={product.title}>
                        {product.title} - {product.prix}€
                        <button onClick={() => setProduitSelectionne(product)}>Ajouter au panier</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function setProduitSelectionne(product) {
    let panier = localStorage.getItem("panier");
    if (panier === null) {
        panier = [];
    } else {
        panier = JSON.parse(panier);
    }
    if (product !== undefined) {
        let produit = panier.filter((p) => p.title === product.title);
        if (produit.length === 0) {
            panier.push({title: product.title, quantity: 1, prix: product.prix});
        } else {
            panier = panier.map((p) => {
                if (p.title === product.title) {
                    p.quantity++;
                }
                return p;
            });
        }
    }
    console.log(product)
    localStorage.setItem("panier", JSON.stringify(panier));
}

export default Produits;