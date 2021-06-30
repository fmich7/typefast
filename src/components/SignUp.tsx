import React from 'react';

export default function SignUpPage() {
    return (
        <div className="container">
            <form className="mt-5 w-50 mx-auto">
                <label className="form-label">Create your account</label>
                <div className="mb-3">
                    <input type="email" placeholder="Email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <input placeholder="Password" type="password" className="form-control" id="exampleInputPassword1" />
                    <span className="form-text">
                        Must be 8-20 characters long.
                    </span>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}
