import {Component, Fragment} from "react";

import Header from "../template/Header";
import {ApiUrl} from "../services/apirest";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";

function withParams(Component) {
    return props => <Component {...props} params={useParams()}/>;
}

class ModifyProduct extends Component {

    state = {
        product: {
            sku: "",
            productName: "",
            price: "",
            registryDate: "",
            productType: "",
            productStatus: ""
        },
        error: false,
        errorMessage: "",
        shouldRedirect: false,
        success: false
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

    updateButton = event => {
        const URI = ApiUrl + `products/${this.props.params.id}`
        axios.put(URI, this.state.product, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        ).then((response) => {
            this.setState({
                success: true
            })
        }).catch(error => {
            let message = ""
            if (error.response.data.statusCode === 404) message = "El producto a agregar no existe!"
            else if (error.response.data.statusCode === 500) message = "El servidor no está disponible"
            else message = "Ha ocurrido un error técnico!"
            this.setState({
                error: true,
                errorMessage: message
            })
        })
    }

    deleteButton = event => {
        const URI = ApiUrl + `products/${this.props.params.id}`
        axios.delete(URI, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        ).then((response) => {
            this.setState({
                shouldRedirect: true
            })
        }).catch(error => {
            let message = ""
            if (error.response.data.statusCode === 404) message = "El producto a agregar no existe!"
            else if (error.response.data.statusCode === 404) message = "El servidor no está disponible"
            else message = "Ha ocurrido un error técnico!"
            this.setState({
                error: true,
                errorMessage: message
            })
        })
    }

    componentDidMount() {
        let uri = ApiUrl + `products/${this.props.params.id}`//'?page=1'
        axios.get(uri, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(result => {
            const {
                sku,
                productName,
                price,
                registryDate,
                productType,
                productStatus
            } = result.data
            this.setState({
                product: {
                    sku,
                    productName,
                    price,
                    registryDate,
                    productType,
                    productStatus
                },
            })
        }).catch(error => {
            let message = ""
            if (error.response.data.statusCode === 404) message = "El producto a agregar no existe!"
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
                <h3>Editar Producto</h3>
                {this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.errorMessage}
                    </div>
                }
                {this.state.success &&
                    <div className="alert alert-success" role="alert">
                        Se ha modificado con éxito el producto
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
                            <input type="text" name="sku" className="form-control" value={this.state.product.sku}
                                   onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Nombre del producto
                            </label>
                            <input type="text" name="productName" className="form-control"
                                   value={this.state.product.productName} onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Precio
                            </label>
                            <input type="text" name="price" className="form-control" value={this.state.product.price}
                                   onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Fecha de registro
                            </label>
                            <input type="date" name="registryDate" className="form-control"
                                   value={this.state.product.registryDate} onChange={this.eventHandler}/>
                        </div>
                    </div>
                    <br/>
                    <div className="row align-content-center justify-content-center">
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Tipo de producto
                            </label>
                            <input type="text" name="productType" className="form-control"
                                   value={this.state.product.productType} onChange={this.eventHandler}/>
                        </div>
                        <div className="col-sm-3">
                            <label htmlFor="" className="col-md-10 control-label">
                                Estado del producto
                            </label>
                            <select name="productStatus" className="form-control"
                                    value={this.state.product.productStatus} onChange={this.eventHandler}>
                                <option>-Elige un estado-</option>
                                <option value="Active">Activo</option>
                                <option value="Cancelled">Cancelado</option>
                            </select>
                        </div>
                    </div>
                </form>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-sm-11 justify-content-center">
                        <input type="button" className="btn btn-primary" onClick={this.updateButton} value="Guardar"/>
                        <input type="button" className="btn btn-danger m-3" onClick={this.deleteButton} value="Eliminar"/>
                        <input type="button" className="btn btn-dark" onClick={this.goBackButton} value="Volver"/>
                    </div>
                </div>
            </div>
        </Fragment>);
    }
}

export default withParams(ModifyProduct);
