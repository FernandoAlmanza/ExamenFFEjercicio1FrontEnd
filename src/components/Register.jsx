import {Component, Fragment} from "react";
import axios from 'axios';

//Assets
import '../assets/css/Login.css';
import {ApiUrl} from "../services/apirest";
import {Navigate} from "react-router-dom";

class Register extends Component {
    state = {
        form: {
            name: "",
            lastName: "",
            secondLastName: "",
            birthdate: "",
            phone: "",
            password: ""
        },
        error: false,
        errorMessage: "",
        shouldRedirect: false,
        passwordRepeated: ""
    }

    eventHandler = async event => {
        await this.setState({
            form: {
                ...this.state.form,
                [event.target.name]: event.target.value
            }
        })
    }

    eventHandler2 = async event => {
        await this.setState({
            passwordRepeated: event.target.value
        })
    }
    submitHandler = event => event.preventDefault();

    buttonHandler = () => {
        const haveEmptyFields = !(this.state.form.name && this.state.form.lastName && this.state.form.secondLastName && this.state.form.birthdate && this.state.form.phone && this.state.form.password && this.state.passwordRepeated)
        console.log(haveEmptyFields)

        if (this.state.form.password === this.state.passwordRepeated && !haveEmptyFields) {
            const URI = ApiUrl + 'auth/signup'
            axios.post(URI, this.state.form).then(response => {
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("fullName", `${response.data.user.name} ${response.data.user.lastName} ${response.data.user.secondLastName}`)
                this.setState({
                    shouldRedirect: true
                })
            }).catch(err => {
                let message = ""
                if (err.response.data.statusCode === 409) message = "El usuario ya existe!"
                else message = "El servidor no está disponible"
                this.setState({
                    error: true,
                    errorMessage: message
                })

            })
        } else if (this.state.form.password !== this.state.passwordRepeated && !haveEmptyFields)
            this.setState({
                error: true,
                errorMessage: "Las contraseñas no coinciden"
            })
        else this.setState({
                error: true,
                errorMessage: "No pueden haber campos vacios!"
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
                                    <input type="text" id="name" className="form-control input-sm chat-input"
                                           placeholder="Nombre" name="name"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="text" id="lastName" className="form-control input-sm chat-input"
                                           placeholder="Apellido Paterno" name="lastName"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="text" id="phoneNumber" className="form-control input-sm chat-input"
                                           placeholder="Número de teléfono" name="secondLastName"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="date" id="birthdate" className="form-control input-sm chat-input"
                                           placeholder="Fecha de nacimiento" name="birthdate"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="text" id="phoneNumber" className="form-control input-sm chat-input"
                                           placeholder="Número de teléfono" name="phone"
                                           onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="password" id="userPassword"
                                           className="form-control input-sm chat-input"
                                           placeholder="Contraseña" name="password" onChange={this.eventHandler}/>
                                    <br/>
                                    <input type="password" id="repeatUserPassword"
                                           className="form-control input-sm chat-input"
                                           placeholder="Contraseña" name="passwordRepeated"
                                           onChange={this.eventHandler2}/>
                                    <br/>
                                    <div className="wrapper">
                                        <span className="group-btn">
                                            <input type="submit" className="btn btn-primary btn-md"
                                                   value="Registrar usuario" onClick={this.buttonHandler}/>
                                        </span>
                                    </div>
                                    <div className="wrapper">
                                        <span className="group-btn">
                                            <a href="/" className="m-2 btn btn-primary btn-md">Iniciar sesión</a>
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

export default Register;
