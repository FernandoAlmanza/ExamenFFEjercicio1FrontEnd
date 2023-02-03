import {Component, Fragment} from "react";
import Header from "../template/Header";

import {ApiUrl} from "../services/apirest";
import axios from 'axios';
import {Navigate} from "react-router-dom";

class Dashboard extends Component {
    state = {
        products: [],
        productId: 0,
        shouldRedirect: false,
        totalElements: 0,
        elements: 5,
        actualPage: 1,
        lookFor: "",
        ordering: "DESC",
        orderedBy: "id"
    }

    componentDidMount() {
        let uri = ApiUrl + `products?page=1&size=${this.state.elements}`
        axios.get(uri, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(result => {
            this.setState({products: result.data.rows, totalElements: result.data.count})
        })
    }

    changePage = page => {
        let uri = ApiUrl + `products?orderBy=${this.state.orderedBy}&page=${page}&size=${this.state.elements}&search=${this.state.lookFor}`
        axios.get(uri, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(result => {
            this.setState({products: result.data.rows, totalElements: result.data.count})
        })
        this.setState({actualPage: page})
    }

    clickProduct(productId) {
        this.setState({
            productId,
            shouldRedirect: true
        })
    }

    changeLimit = async newLimit => {
        await this.setState({
            elements: newLimit.target.value
        })
    }

    handleInput = async event => {
        await this.setState({
            lookFor: event.target.value
        })
    }

    search = () => {
        let uri = ApiUrl + `products?page=1&size=${this.state.elements}&search=${this.state.lookFor}`
        axios.get(uri, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(result => {
            this.setState({products: result.data.rows, totalElements: result.data.count})
        })
    }

    orderBy = async order => {
        let uri = ApiUrl + `products?orderBy=${order}&page=${this.state.actualPage}&size=${this.state.elements}&search=${this.state.lookFor}&orderType=${this.state.ordering}`
        axios.get(uri, {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}).then(result => {
            this.setState({products: result.data.rows, totalElements: result.data.count})
        })
        await this.setState({ordering: this.state.ordering === 'ASC'? 'DESC': 'ASC', orderedBy: order})
        console.log(this.state.orderedBy)
    }

    render() {
        const formatter = new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
        });

        console.log(range(1, (Math.ceil(this.state.totalElements / this.state.elements) ?? 1), 1))

        function range(start, stop, step) {
            if (typeof stop == 'undefined') {
                stop = start;
                start = 0;
            }

            if (typeof step == 'undefined') {
                step = 1;
            }

            if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
                return [];
            }

            var result = [];
            for (var i = start; step > 0 ? i <= stop : i >= stop; i += step) {
                result.push(i);
            }

            return result;
        };

        return this.state.shouldRedirect ? <Navigate to={`/inventory/modify/${this.state.productId}`}/> : (<Fragment>
            <Header/>

            <div className="container">
                <div className="container" style={{display: "flex", flexDirection: "row"}}>
                    <div className="col-sm-5">
                        <input type="text" style={{width: "20rem"}} name="lookFor" className="form-control m-0"
                               onChange={this.handleInput}/>
                        <input type="button" className="btn btn-primary m-2" value="Buscar" onClick={this.search}/>
                    </div>
                    <div className="col-sm-5">
                        <select style={{width: "20rem"}} name="lookFor" className="form-control m-0"
                                onChange={this.changeLimit}>
                            <option value="5">Mostrar 5 elementos</option>
                            <option value="10">Mostrar 10 elementos</option>
                            <option value="25">Mostrar 25 elementos</option>
                            <option value="50">Mostrar 50 elementos</option>
                            <option value="100">Mostrar 100 elementos</option>
                        </select>
                    </div>
                </div>
                <div className="containerPage"
                     style={{display: "flex", justifyContent: "center", maxWidth: "100rem", overflowY: "auto"}}>
                    {range(1, (Math.ceil(this.state.totalElements / this.state.elements) ?? 1)).map(page => {
                        return (<button style={{padding: ".5rem"}} onClick={() => this.changePage(page)}
                                        className={`btn ${page === this.state.actualPage ? "btn-primary" : "btn-dark"} m-2`}>{page}</button>)
                    })}
                </div>
                <br/>
                <table className="table table-hover table-dark">
                    <thead>
                    <tr>
                        <th scope="col" className={this.state.orderedBy === "id" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('id')}>#</th>
                        <th scope="col" className={this.state.orderedBy === "sku" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('sku')}>Clave de producto</th>
                        <th scope="col" className={this.state.orderedBy === "productName" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('productName')}>Nombre de producto</th>
                        <th scope="col" className={this.state.orderedBy === "price" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('price')}>Precio</th>
                        <th scope="col" className={this.state.orderedBy === "userId" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('userId')}>Registrado por</th>
                        <th scope="col" className={this.state.orderedBy === "registryDate" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('registryDate')}>Fecha de registro</th>
                        <th scope="col" className={this.state.orderedBy === "productType" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('productType')}>Tipo de producto</th>
                        <th scope="col" className={this.state.orderedBy === "productStatus" ? "bg-light text-black" : ""} style={{cursor: "pointer"}} onClick={() => this.orderBy('productStatus')}>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.products.map(product => {
                            return (
                                <tr key={product.id} style={{cursor: "pointer"}}
                                    onClick={() => this.clickProduct(product.id)}>
                                    <td>{product.id}</td>
                                    <td>{product.sku}</td>
                                    <td>{product.productName}</td>
                                    <td>{formatter.format(product.price)}</td>
                                    <td>{product.user.name} {product.user.lastName} {product.user.secondLastName}</td>
                                    <td>{product.registryDate}</td>
                                    <td>{product.productType}</td>
                                    <td>{product.productStatus === "Active" ? "Activo" : "Cancelado"}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </Fragment>);
    }
}

export default Dashboard;
