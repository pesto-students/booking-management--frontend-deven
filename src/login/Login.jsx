import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { history } from '_helpers';
import { authActions } from '_store';
import { LoginLayout } from '_layouts/LoginLayout';

export { Login };

function Login() {
    const dispatch = useDispatch();
    const authUser = useSelector(x => x.auth.user);
    const authError = useSelector(x => x.auth.error);

    useEffect(() => {
        // redirect to home if already logged in
        if (authUser) history.navigate('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ username, password }) {
        return dispatch(authActions.login({ username, password }));
    }

    return (
        <LoginLayout>
            <div className="mt-4 alert alert-info">
                Username: test<br />
                Password: test
            </div>

            <div className="pt-4 pb-2">
                <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                <p className="text-center small">Enter your username & password to login</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3 needs-validation" noValidate>
                <div className="col-12">
                    <label htmlFor="yourUsername" className="form-label">Username</label>
                    <div className="input-group has-validation">
                        <span className="input-group-text" id="inputGroupPrepend">@</span>

                        <input name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} required />
                        <div className="invalid-feedback">{errors.username?.message}</div>

                    </div>
                </div>
                <div className="col-12">
                    <label htmlFor="yourPassword" className="form-label">Password</label>
                    <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} required />
                    <div className="invalid-feedback">{errors.password?.message}</div>

                </div>
                <div className="col-12">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" name="remember" value="true" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                </div>
                <div className="col-12">
                    <button disabled={isSubmitting} className="btn btn-primary w-100">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Login
                    </button>
                    {authError &&
                        <div className="alert alert-danger mt-3 mb-0">{authError.message}</div>
                    }
                </div>

                {/* <div className="col-12">
                        <p className="small mb-0">Don't have account? <a href="pages-register.html">Create an account</a></p>
                    </div> */}
            </form>
        </LoginLayout>
    );
}
