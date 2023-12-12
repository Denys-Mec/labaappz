import "../style/header.css"
const Header = ({ content }) => {
    return (
        <div className={"header"}>
            <h1 className={"page-title"}>{content}</h1>
            <button className={"help-btn"}>?</button>
        </div>
    );
};

export default Header;