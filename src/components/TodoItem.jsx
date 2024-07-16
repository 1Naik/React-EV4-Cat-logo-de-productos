import { Fragment } from "react";

const TodoItem = ({ todo, cambiarEstado, openModal }) => {
    const { id, producto, descripcion, precio, estado } = todo
    const fnCambiarEstado = () => {
        cambiarEstado(id);
    }
    return (
        <Fragment>
            <div className="card mb-3">
                <div className="card-body">
                    <h5 className="card-title">{producto}</h5>
                    <p className="card-text">{descripcion}</p>
                    <p className="card-text">Precio: ${precio}</p>
                    <p className="card-text">
                        Estado: 
                        <input
                            type="checkbox"
                            className="form-check-input ms-2"
                            checked={estado}
                            onChange={fnCambiarEstado}
                        />
                    </p>
                    <button className="btn btn-danger" onClick={() => openModal(todo)}>
                        <i className="bi bi-trash"></i>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}


export default TodoItem;