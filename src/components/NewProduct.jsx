import {Component, Fragment} from "react";
import {ApiUrl} from "../services/apirest";
import axios from "axios";
import {Navigate} from "react-router-dom";
import Header from "../template/Header";

class NewProduct extends Component{
    state = {
        product: {
            sku: "",
            productName: "",
            price: "",
            registryDate: "",
            productType: ""
        },
        error: false,
        errorMessage: "",
        shouldRedirect: false
    }

    eventHandler = async event => {
        await this.setState({
            product: {
                ...this.state.product,
                [event.target.name]: event.target.value
            }
        })
        console.log(this.state.product)
    }

    goBackButton = event => {
        this.setState({shouldRedirect: true})
    }

    createButton = event => {
        const URI = ApiUrl + `products`
        axios.post(URI, this.state.product, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        ).then((response) => {
            this.setState({
                shouldRedirect: true
            })
        }).catch(error => {
            let message = ""
            if (error.response.data.statusCode === 400) message = "La información capturada es invalida, revisa los datos e intentalo de nuevo"
            else if (error.response.data.statusCode === 404) message = "El servidor no está disponible"
            else message = "Ha ocurrido un error técnico!"
            this.setState({
                error: true,
                errorMessage: message
            })
        })
    }

    render() {
        return this.state.shouldRedirect ? <Navigate to={'/inventory'}/> : (<Fragment>
            <Header/>
            <div className="container">
                <h3>Agregar Nuevo Producto</h3>
                {this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
            </div>
            <div className="container"><br/>
                <form className="form-horizontal">
                    <div className="row">
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Clave de producto
                            </label>
                            <input type="text" name="sku" className="form-control" onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Nombre del producto
                            </label>
                            <input type="text" name="productName" className="form-control" onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Precio
                            </label>
                            <input type="text" name="price" className="form-control" onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Fecha de registro
                            </label>
                            <input type="date" name="registryDate" className="form-control" onChange={this.eventHandler}/>
                        </div>
                    </div>
                    <br/>
                    <div className="row align-content-center justify-content-center">
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Tipo de producto
                            </label>
                            <input type="text" name="productType" className="form-control" onChange={this.eventHandler}/>
                        </div>
                    </div>
                </form>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-sm-11 justify-content-center">
                        <input type="button" className="btn btn-primary" onClick={this.createButton} value="Guardar"/>
                        <input type="button" className="btn btn-dark m-3" onClick={this.goBackButton} value="Cancelar"/>
                    </div>
                </div>
            </div>
        </Fragment>);
    }
}

export default NewProduct;
