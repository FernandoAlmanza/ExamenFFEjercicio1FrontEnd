import {Component} from "react";
import {Navigate} from "react-router-dom";

export default class Header extends Component{
    state = {
        haveToken: !!localStorage.getItem("token")
    }
    handleExit = () => {
        localStorage.removeItem("token")
        this.setState({
            haveToken: false
        })
    }
    render() {
        let message = "";
        const hour = new Date().getHours();
        if(hour >= 6 && hour <= 11) message = `Buenos dias ${localStorage.getItem("fullName")}`;
        else if(hour >= 12 && hour <= 18) message = `Buenas tardes ${localStorage.getItem("fullName")}`;
        else message = `Buenas noches ${localStorage.getItem("fullName")}`;
        return this.state.haveToken ? (
            <nav className="navbar bg-primary" data-bs-theme="dark">
                <a style={{marginLeft: "1rem"}} href="/inventory/add" className="btn btn-dark">Nuevo producto</a>
                <h5 className="text-light">{message}</h5>
                <input style={{marginRight: "1rem"}} type="button" className="btn btn-danger" onClick={this.handleExit} value="Salir"/>
            </nav>
        ): <Navigate to="/" />;
    }
}
