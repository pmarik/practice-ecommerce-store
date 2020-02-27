import React, { useState } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/FormInput.component';
import CustomButton from '../custom-button/CustomButton.component';
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const [userCredentials, setCredentials] = useState({email: '', password: ''});


    const { email, password } = userCredentials;

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await auth.signInWithEmailAndPassword(email, password);
            setCredentials({ email: '', password: '' });
        } catch (err){
            console.error(err);
        }

        setCredentials({ email: '', password: '' })
    }


    const handleChange = (e) => {
        const { value, name } = e.target;
        setCredentials({...userCredentials, [name]: value });
    }


        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput name="email" type="email" value={email} required handleChange={handleChange} label="email" />
                    <FormInput name="password" type="password" value={password} required handleChange={handleChange} label="password" />

                    <div className="buttons">
                        <CustomButton type="submit"> Sign In </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>

                </form>
            </div>
        )
    
}

export default SignIn;