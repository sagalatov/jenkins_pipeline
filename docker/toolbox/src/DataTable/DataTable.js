import React, {useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import Modal from "./Modal/Modal";


export default function DataTable({props, onSort, removeClient}) {

    const [modalIsOpen, setModalIsOpen] = useState({open: false, id: ''})

    function editingClient(id) {
        setModalIsOpen({open: true, id: id})
    }

    return (
        <div>
            <Table striped bordered hover responsive size="sm" align="center">
                <thead>
                <tr>
                    <th onClick={() => {onSort('id')}}>ID</th>
                    <th onClick={() => {onSort('name')}}>Name</th>
                    <th onClick={() => {onSort('age')}}>Age</th>
                    <th onClick={() => {onSort('phone')}}>Phone</th>
                    <th onClick={() => {onSort('e-mail')}}>E-mail</th>
                </tr>
                </thead>
                <tbody>
                {props.map((item, i) => {
                    return <tr key={item[0].value}>{
                        item.map((i, index) => {
                            return (
                                <td key={index}>{i.value}</td>
                            )
                        })
                    }
                    <td><Button onClick={() => editingClient((item[0].value))} variant="primary">Редакатировать</Button></td>
                    <td><Button onClick={() => removeClient((item[0].value))} variant="danger">Удалить</Button></td>
                    </tr>
                })}
                </tbody>
            </Table>

            {modalIsOpen.open && (
                <Modal props={props} id={modalIsOpen.id}/>
            )}
        </div>
    )
}

