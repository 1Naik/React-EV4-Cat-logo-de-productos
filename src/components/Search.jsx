import React, { useState } from "react";
import styles from "./Search.module.scss";

const Search = ({ setSearch, setPageNumber }) => {
    const [inputValue, setInputValue] = useState("");


    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        setSearch(value); // Actualizar la búsqueda en cada cambio
        setPageNumber(1); // Restablecer a la primera página
    };

    return (
        <form className="d-flex justify-content-center gap-4 mb-5">
            <input 
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Búsqueda de productos"
                type="text"
                className={styles.input}
            />
        </form>
    );
};

export default Search;