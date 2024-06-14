import CharacterGallery from "@components/CharacterGallery";
import logo from "@assets/logo.svg";
import './index.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <div className="logo-container">
                <img src={logo} alt="Logo de la página" className="logo-img" />
            </div>
            <CharacterGallery />
        </div>
    );
}

export default HomePage;
