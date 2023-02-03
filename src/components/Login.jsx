import {Component, Fragment} from "react";
import axios from 'axios';

//Assets
import '../assets/css/Login.css';
import {ApiUrl} from "../services/apirest";
import {Navigate} from "react-router-dom";

class Login extends Component {
    state = {
        form: {
            username: "",
            password: ""
        },
        error: false,
        errorMessage: "",
        shouldRedirect: false
    }

    eventHandler = async event => {
        await this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }
    submitHandler = event => event.preventDefault();

    buttonHandler = () => {
        const URI = ApiUrl + 'auth/login'
        axios.post(URI, this.state.form).then(response => {
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("fullName", `${response.data.user.name} ${response.data.user.lastName} ${response.data.user.secondLastName}`)
            this.setState({
                shouldRedirect: true
            })
        }).catch(err => {
            let message = ""
            if (err.response.data.statusCode === 401) message = "Las credenciales son invalidas!"
            else message = "El servidor no está disponible"
            this.setState({
                error: true,
                errorMessage: message
            })

        })
    }

    render() {
        return this.state.shouldRedirect ? <Navigate to="/inventory"/> : (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-5 col-md-3">
                            <div className="form-login">
                                <h4>Inicio de sesión</h4>
                                <form onSubmit={this.submitHandler}>
                                    <input type="text" id="userName" className="form-control input-sm chat-input"
                                           placeholder="Número de teléfono" name="username"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="password" id="userPassword"
                                           className="form-control input-sm chat-input"
                                           placeholder="Contraseña" name="password" onChange={this.eventHandler}/>
                                    <br/>
                                    <div className="wrapper">
                                        <span className="group-btn">
                                            <input type="submit" className="btn btn-primary btn-md"
                                                   value="Iniciar sesión" onClick={this.buttonHandler}/>
                                        </span>
                                    </div>
                                    <div className="wrapper">
                                        <span className="group-btn">
                                            <a href="/register" className="m-2 btn btn-primary btn-md">Registrar usuario</a>
                                        </span>
                                    </div>
                                </form>
                                <br/>
                                {this.state.error &&
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.errorMessage}
                                    </div>}
                            </div>

                        </div>
                    </div>
                </div>
            </Fragment>
        )
            ;
    }
}

export default Login;
