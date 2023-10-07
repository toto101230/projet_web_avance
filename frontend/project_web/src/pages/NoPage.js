import React from "react";

function NoPage() {
    return (
        <div style={{textAlign: "center"}}>
            <h1>404</h1>
            <p>La page n'a pas été trouvée ! Quest-ce que vous faites ici?</p>
            <a href="/">Retrouver votre chemin</a>
        </div>
    );
}

export default NoPage;