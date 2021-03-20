import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
import DataTable from './DataTable/DataTable'
import Loader from './Loader/Loader'

function App() {

    const [state, setState] = useState({isLoading: true, data: [], sort: 'asc', sortField: 'id'})

    function onSort(sortField) {
        const cloneData = state.data.concat();
        const sortType = state.sort === 'asc' ? 'desc' : 'asc';

        switch (sortField) {
            case 'id':
                setState({
                    data: cloneData.sort((a, b) => {
                        return sortType === 'asc' ? a[0].value - b[0].value : b[0].value - a[0].value
                    }),
                    sort: sortType
                })
                break;
            case 'name':
                // setState({
                //     data: cloneData.sort((a, b) => {
                //         return sortType === 'asc' ? a[1].value - b[1].value : b[1].value - a[1].value
                //     }),
                //     sort: sortType
                // })

                console.log(cloneData.sort())
                break; //TODO pars unicode symbols
            case 'age':
                setState({
                    data: cloneData.sort((a, b) => {
                        return sortType === 'asc' ? a[2].value - b[2].value : b[2].value - a[2].value
                    }),
                    sort: sortType
                })
                break;
            default:
                return
        }
    }

    function removeClient(id) {
        const data = {id: id}
        const cloneData = state.data.concat();
        try {
            axios.post('https://frontend-test.netbox.ru/method=delete', data)
                .then(() => {
                    setState({
                        data: cloneData.filter((item) => item[0].value !== id)
                    })
                })

        } catch(e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        axios.get('https://frontend-test.netbox.ru/', {})
            .then(resp => {
                setState({
                    isLoading: false,
                    data: resp.data,
                    sort: 'asc',
                    sortField: 'id'
                })
            })

    }, [])
    return (
        <div className="container">
            {state.data.isLoading ? <Loader/> : <DataTable props={state.data} onSort={onSort} removeClient={removeClient}/>}
        </div>
    );
}

export default App;
