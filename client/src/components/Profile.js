import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";

import {updateUser, getUser} from "../redux/actions"

export default function Profile() {

    const dispatch = useDispatch();

    const [state, setState] = useState({
        id: '',
        first_name: '',
        last_name: '',
        username: '',
        email: ''
    })
    
    const [message, setMessage] = useState({
        error: ''
    })

    useEffect(() => {
		dispatch(getUser());
    },[]);
    
    
	const response = useSelector((state) =>{
		return state
    })
    
	useEffect(() => {
		if(response.auth.updateUserError) {
			setMessage({error: "Update failed!"})
		}
    }, [response.auth.updateUserError]);

    useEffect(() => {
		if(response.auth.updateUserSuccess) {
			setMessage({error: "Profile Updated Successfully"})
		}
    }, [response.auth.updateUserSuccess]);
    
	useEffect(() => { 
		if(response.auth.getUserSuccess) {
            const user = response.auth.user[0]
            const userData = {
                id: user.uuid,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email
            }
			setState(userData)
		}
    },[response.auth.getUserSuccess]);
    
    const handleOnChange = event => {
        const { name, value } = event.target;
            setState({ ...state, [name]: value });
      };
    
    const handleOnSubmit = (event) => {
        dispatch(updateUser(state));
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-sm-4 card p-5">
                {!state ? <h1>Loading</h1>: (
                    <div className="card">
                        <img className="card-img-top" src="https://www.skwebinfo.com/static/images/edithero.c28023ec7237.jpg" alt="Card image"/>
                        <div className="card-body">
                            <h4 className="card-title">{state.username}</h4>
                            <p className="card-text">{state.email}</p>
                        </div>
                   
                    </div>  
                )}
            </div>
            <div className="col-sm-8 card p-5">
                <form>
                    <h3>Update Your profile</h3>
                    <div className="form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control" value={state.first_name} name="first_name" onChange={handleOnChange} placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control" value={state.last_name} name="last_name" onChange={handleOnChange} placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" value={state.username} name="username" onChange={handleOnChange} placeholder="Enter username" />
                    </div>

                    <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" value={state.email} name="email" onChange={handleOnChange} placeholder="Enter email" />
                    </div>

                    <div><label>{message.error ? (message.error): ''}</label></div>

                    <button type="button" onClick={handleOnSubmit} className="btn btn-primary btn-block">Update</button>
                </form>
            </div>
        </div>
                
      
    </div>
  );
}
