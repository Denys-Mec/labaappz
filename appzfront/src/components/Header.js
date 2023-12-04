import "../style/header.css"
const Header = ({ content }) => {
    return (
        <div>
            <h1 className={"page-title"}>{content}</h1>
        </div>
    );
};

export default Header;