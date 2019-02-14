import { actionTypes } from '../constant/constant'
import axios from 'axios'


export function getData() {
    return (dispatch) => {

        // let res = await axios.get('http://192.168.100.27:5000/')
        // console.log(res.data)
        
        axios.get('http://localhost:5000/')
            .then((res) => {
                const data=res.data
                console.log(res.data)
                dispatch({ type: actionTypes.GET, payload: data})
            })
            .catch((err) => {
                console.log(err)
            })

        // try {
        //     const response = await axios.get('http://localhost:5000/');
        //     console.log(response);
        //   }
        // catch (error) {
        //     console.error(error);
        // }

        // fetch('http://localhost:5000/')
        // .then((res)=>{
        //     console.log(res.json())
        // })
        // .catch((err)=>{
        //     console.log(err)
        // })
    }
}

export function add(obj) {
    return (dispatch) => {
        console.log(obj)
        axios.post('http://localhost:5000/', obj)
        .then((res) => {
            const data=res.data
            dispatch({ type: actionTypes.ADD, payload: data })
        })
        .catch((err) => {
            console.log(err)
        })

    }
}
export function update(obj) {
    return (dispatch) => {
        axios.put(`http://localhost:5000/${obj.todoObj._id}`,obj.todoObj)
        .then((res) => {
            getData()(dispatch)
        })
        .catch((err) => {
            console.log(err)
        })
        // dispatch({ type: actionTypes.UPDATE, payload: obj })

    }
}

export function deleteOne(ind, id) {
    return (dispatch) => {
        axios.delete(`http://localhost:5000/${id}`)
        .then((res) => {
            getData()(dispatch)
        })
        .catch((err) => {
            console.log(err)
        })
        // dispatch({ type: actionTypes.DELETE, payload: ind })

    }
}

export function deleteAll() {
    return (dispatch) => {
        axios.delete(`http://localhost:5000/deleteAll`)
        .then((res) => {
            getData()(dispatch)
        })
        .catch((err) => {
            console.log(err)
        })
        // dispatch({ type: actionTypes.DELETEALL })

    }
}
