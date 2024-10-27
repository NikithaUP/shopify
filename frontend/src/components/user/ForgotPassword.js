import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, forgotPassword } from '../../actions/userActions';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "../layouts/MetaData";

export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const {error,message}=useSelector(state=>state.authState)
    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email);
        dispatch(forgotPassword(formData))
    }

    useEffect(() => {
        if (message) {
            toast(message, {
              position: "top-right",
              theme: "dark",
              type: "success",
            });
            setEmail("");
            return;
        }
        if (error) {
          toast(error, {
            position: "top-right",
            theme: "dark",
            type: "error",
            onOpen: () => {
              dispatch(clearAuthError);
            },
          });
          return;
        }
    },[dispatch,message,error])
    return (
      <Fragment>
        <MetaData title='Forgot Password'/>
        <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form onSubmit={submitHandler} className="shadow-lg">
            <h1 className="mb-3">Forgot Password</h1>
            <div className="form-group">
              <label htmlFor="email_field">Enter Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
              />
            </div>

            <button
              id="forgot_password_button"
              type="submit"
              className="btn btn-block py-3"
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
      </Fragment>
    );
}