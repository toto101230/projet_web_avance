import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Produits from "./pages/Produits";
import Panier from "./pages/Panier";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Deconnexion from "./pages/Deconnexion";
import Admin from "./pages/Admin";
import Profil from "./pages/Profil";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="" element={<Home/>}/>
                    <Route path="produits" element={<Produits/>}/>
                    <Route path="panier" element={<Panier/>}/>
                    <Route path="connexion" element={<Connexion/>}/>
                    <Route path="inscription" element={<Inscription/>}/>
                    <Route path="deconnexion" element={<Deconnexion/>}/>
                    <Route path="admin" element={<Admin/>}/>
                    <Route path="profil" element={<Profil/>}/>
                    <Route path="*" element={<NoPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}