import { Fragment, useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Modal from 'react-modal';
import Paginacion from "./Paginacion";
import Search from "./Search";
//Agregar libreria de id, npm install uuid4
import uuid4 from "uuid4";

const App = () => {
    const [todos, setTodos] = useState([
        { id: 1, producto: "Notebook", descripcion: "Ryzen 7", precio: 2000, estado: false },
        { id: 2, producto: "Monitor", descripcion: "144hz", precio: 50000, estado: false },
        { id: 3, producto: "Agua", descripcion: "Con gas", precio: 1000, estado: false },
        { id: 4, producto: "Audifonos", descripcion: "In ear", precio: 12000, estado: false },
        { id: 5, producto: "Mouse", descripcion: "Logitech", precio: 18000, estado: false },
    ])

    //Const Modal
    const [modalIsOpen, setIsOpen] = useState(false);
    const [productoToDelete, setproductoToDelete] = useState(null);

    //Const Paginacion
    const [pageNumber, setPageNumber] = useState(1);
    const todosPerPage = 9;

    //Const Search
    const [search, setSearch] = useState("")
    // Configuración del modal
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    Modal.setAppElement('#root');

    const openModal = (producto) => {
        setproductoToDelete(producto);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const confirmDelete = () => {
        const productos = todos.filter((todo) => !todo.estado);
        setTodos(productos)
        closeModal();
    };

    //Agregar la funcion para agregar productos
    const agregarproducto = () => {
        const producto = productoRef.current?.value.trim();
        const descripcion = descripcionRef.current?.value.trim();
        const precio = precioRef.current?.value.trim();

        //Validar que el campo nombre sea obligatorio
        if (!producto) {
            alert("El nombre es obligatorio")
        }

        //Validar que el campo descripcion sea obligatorio
        if (!descripcion) {
            alert("La descripcion es obligatoria");
            return;
        }

        //Validar que el precio no sea negativo
        if (precio < 0) {
            alert("El precio debe ser un numero positivo");
            return;
        }

        //Validar si el input tiene texto y limpiar el input
        if (producto === "" || descripcion === "" || precio === "") return; //Si no hay texto no hace nada y se devuelve
        setTodos((prevTodos) => {
            const nuevoProducto = {
                id: uuid4(),
                producto: producto,
                descripcion: descripcion,
                precio: precio,
                estado: false
            };
            return [...prevTodos, nuevoProducto,];
        });

        productoRef.current.value = null;
        descripcionRef.current.value = null;
        precioRef.current.value = null;
        alert("Producto agregado con éxito!")
    };

    //Eliminar productos - filter
    const eliminarproductosCompletos = () => {
        //Me quedo solo con aquellos elementos que no esten completadas (false)
        const productos = todos.filter((todo) => !todo.estado);
        setTodos(productos)
    }

    const contarproductos = () => {
        //Cuenta todas las productos cuyo estado es false "pendiente"
        return todos.filter((todo) => !todo.estado).length;
    }
    const Resumenproductos = () => {
        const cantidad = contarproductos()
        if (cantidad === 0) {
            return (
                <div className="alert alert-success mt-3 text-center">
                    No tienes productos disponibles
                </div>
            )
        }
        if (cantidad === 1) {
            return (
                <div className="alert alert-info mt-3 text-center">
                    Tienes solamente {cantidad} producto
                </div>
            )
        }
        if (cantidad > 9) {
            return (
                <div className="alert alert-danger mt-3 text-center">
                    Tienes {cantidad} productos
                </div>
            )
        }
        return (
            <div className="alert alert-warning mt-3 text-center">
                Tienes {cantidad} productos
            </div>
        )

    }

    // LocalStorage
    const KEY = "todos";
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if (storedTodos) {
            setTodos(storedTodos);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);

    //Definir productoRef para usar el input
    const productoRef = useRef();

    //Definir descripcionRef para usar el input
    const descripcionRef = useRef();

    //Definir precioRef para usar el input
    const precioRef = useRef();

    const cambiarEstadoproducto = (id) => {
        /* Obtener todos los elementos del array todo */
        const newTodos = [...todos];
        /* Buscar el todo que necesitamos cambiar de estado */
        const todo = newTodos.find((todo) => todo.id === id);
        /* Cambio de estado */
        todo.estado = !todo.estado;
        /* Seteamos el cambio en la lista */
        setTodos(newTodos);
    };

    // Filtrar productos basados en la búsqueda
    const filteredTodos = todos.filter(todo =>
        todo.producto.toLowerCase().includes(search.toLowerCase()) ||
        todo.descripcion.toLowerCase().includes(search.toLowerCase()) ||
        todo.precio.toString().includes(search)
    );

    return (
        <Fragment>

            <div className="row">
                <div className="col-12 col-lg-12 col-md-12 col-sm-12 text-center">
                    <h1 className="display-5 my-5">Catálogo de productos <img src="./agregar-producto.png" alt="" width={100} height={90} /></h1>
                </div>
            </div>
            <form className="border border-primary border-3 rounded-4 p-5">
                <h1 className="display-5 mb-3 text-center">Agregar productos</h1>
                <div className="row mt-3">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label className="mb-2">Nombre del producto</label>
                        <input className="form-control" type="text" placeholder="Ingrese un producto" ref={productoRef} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label className="mb-2">Descripción</label>
                        <input className="form-control" type="text" placeholder="Ingrese una descripción" ref={descripcionRef} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                        <label className="mb-2">Precio</label>
                        <input className="form-control" type="number" placeholder="Ingrese un precio" ref={precioRef} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                        <button className="btn btn-primary ms-2" onClick={agregarproducto}><i className="bi bi-clipboard-plus"></i> Añadir producto </button>
                    </div>
                </div>
            </form>
            <div className="row my-4"></div>
            <div className="row my-4">
                <div className="col-12 col-lg-12 col-md-12 col-sm-12 mb-3">
                    <h1 className="display-5 my-3">Productos</h1>
                </div>
            <Search setPageNumber={setPageNumber} setSearch={setSearch} />    
            </div>
            <div className="row">
                {filteredTodos.map((todo) => (
                    <div className="col-12 col-lg-4 col-md-6 col-sm-12 mb-3" key={todo.id}>
                        <TodoItem todo={todo} cambiarEstado={cambiarEstadoproducto} openModal={openModal} />
                    </div>
                ))}
            </div>

            <Resumenproductos />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Confirm Delete Modal"
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Eliminación</h5>
                    </div>
                    <div className="modal-body">
                        <p>¿Estás seguro de que quieres eliminar este producto?</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
                        <button className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
                    </div>
                </div>

            </Modal>
            <Paginacion pageNumber={pageNumber} setPageNumber={setPageNumber} />
        </Fragment>
    )
}


export default App;

