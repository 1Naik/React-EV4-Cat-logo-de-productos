import React from "react";
import ReactPaginate from 'react-paginate';
import App from "./App";
import TodoItem from "./TodoItem";

const Paginacion = ({pageNumber, setPageNumber}) => {

    return <ReactPaginate
    className="pagination justify-content-center gap-4 my-4"
    forcePage={pageNumber===1? 0: pageNumber-1}
    nextLabel="Next"
    previousLabel="Prev"
    nextClassName="btn btn-primary"
    previousLinkClassName="text-white"
    nextLinkClassName="text-white"
    previousClassName="btn btn-primary"
    pageClassName="page-item"
    pageLinkClassName="page-link"
    activeClassName="active"
    onPageChange={(event)=>{
        setPageNumber(event.selected+1)
    }}
    pageCount={5}
    />;
}

export default Paginacion;