import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import {postRegister} from "../redux/actions"

export default function Register() {
	const dispatch = useDispatch();

  const response = useSelector((state) =>{
    return state
	})
	
  const [state, setState] = useState({
		username: "",
		email: "",
    password: "",
   
	})
	
	const [message, setMessage] = useState({
    error: ''
	})

	useEffect(() => {
		if(response.auth.postRegisterError) {
			setMessage({error: "Registration failed!"})
		}
	}, [response.auth.postRegisterError]);
	
	useEffect(() => {
		if(response.auth.postRegisterSuccess) {
			window.location.href = '/login'
		}
			
	}, [response.auth.postRegisterSuccess]);

  const handleOnChange = event => {
    const { name, value } = event.target;
		setState({ ...state, [name]: value });
  };

  const handleOnSubmit = (event) => {
    dispatch(postRegister(state));
	}
  return (
		<div className="auth-inner">
			<form>
				<h3>Register</h3>
				<div className="form-group">
						<label>Username</label>
						<input type="text" className="form-control" name="username" onChange={handleOnChange} placeholder="Enter username" />
				</div>

				<div className="form-group">
						<label>Email address</label>
						<input type="email" className="form-control" name="email" onChange={handleOnChange} placeholder="Enter email" />
				</div>

				<div className="form-group">
						<label>Password</label>
						<input type="password" className="form-control" name="password" onChange={handleOnChange} placeholder="Enter password" />
				</div>

				<div><label>{message.error ? (message.error): ''}</label></div>

				<button type="button" onClick={handleOnSubmit} className="btn btn-primary btn-block">Register</button>
				<p className="forgot-password text-right">
						Already registered <a href="/login">Login?</a>
				</p>
			</form>
    </div>
  );
}
