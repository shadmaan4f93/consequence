import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";

import {postLogin} from "../redux/actions"

export default function Login(props) {
	const dispatch = useDispatch();

  const response = useSelector((state) =>{
    return state
	})

	const [message, setMessage] = useState({
    error: ''
	})
	
	useEffect(() => {
		if(response.auth.postLoginError) {
			setMessage({error: "login failed!"})
		}
	}, [response.auth.postLoginError]);
	
	useEffect(() => {
		if(response.auth.postLoginSuccess) {
			window.location.href = '/profile'
		}
			
	}, [response.auth.postLoginSuccess]);

  const [state, setState] = useState({
    username: "",
    password: "",
   
	})
	
  const handleOnChange = event => {
    const { name, value } = event.target;
		setState({ ...state, [name]: value });
  };

  const handleOnSubmit = (event) => {
    dispatch(postLogin(state));
	}
  return (
		<div className="auth-inner">
      <form>
				<h3>Log In</h3>
				<div className="form-group">
						<label>Username</label>
						<input type="username" className="form-control" name="username" onChange={handleOnChange} placeholder="Username" />
				</div>
				<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" onChange={handleOnChange} placeholder="Enter password" />
				</div>
				<div><label>{message.error ? (message.error): ''}</label></div>
				<button type="button" onClick={handleOnSubmit}  className="btn btn-primary btn-block">Login</button>
			</form>
    </div>
  );
}
