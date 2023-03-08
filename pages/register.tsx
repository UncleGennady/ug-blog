import React, {useEffect} from 'react';
import Head from "next/head";
import styles from "@/styles/LoginRegister.module.scss";
import {Formik} from "formik";
import Avatar from "@/components/avatar";
import {useFetchRegisterMutation} from "@/store/authApi";
import {ISignUpResponse, ISignUp} from "@/model";
import {useRouter} from "next/router";
import {useAppSelector, useFetchImg} from "@/hook";


const Register = () => {
    const  router = useRouter()

    const [fetchRegister, results] = useFetchRegisterMutation()

    const auth = useAppSelector((state) => state.auth.value)
    useEffect(()=>{
        if(auth)router.push('/')
    },[auth])

    const {previewImg, inputFileRef, handleChangeFile, onClickRemoveImage } = useFetchImg()

    const submitHandle = async(values:ISignUp) => {
        try {
            if(!!previewImg) values.avatarUrl = previewImg
            const data:ISignUpResponse | any = await fetchRegister(values);
            console.log(results)
            console.log(data)
            if(!data.data){
                throw new Error("Failed to sign up")
            }
            router.push('/login')
        }catch (e){
                return alert("Failed to sign up")
        }
    }

    return (
        <>
            <Head>
                <title>Sign up</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <h2>Sign up</h2>
                <div className={styles.wrapper}>
                    <Formik
                        initialValues={{ fullName: '', email: '', password: '' }}
                        validate={values => {
                            const errors:any = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }

                            if(!values.fullName){
                                errors.fullName = 'Required';
                            } else if (
                                values.fullName.length < 3
                            ) {
                                errors.fullName = 'Full name should be longer';
                            }

                            if(!values.password){
                                errors.password = 'Required';
                            } else if (
                                values.password.length < 6
                            ) {
                                errors.password = 'Invalid password';
                            }

                            return errors;
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                          await submitHandle(values)
                        }}
                    >
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                              /* and other goodies */
                          }) => (
                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.avatar}>
                                    {!previewImg && <button className={styles.avatar_button} onClick={()=> inputFileRef.current.click()}>
                                        <div >
                                            <svg
                                                className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiAvatar-fallback css-13y7ul3"
                                                focusable="false" aria-hidden="true" viewBox="0 0 24 24"
                                                data-testid="PersonIcon">
                                                <path
                                                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                            </svg>
                                          </div>
                                    </button>}
                                    {!!previewImg && <Avatar src={`${process.env.NEXT_PUBLIC_API_URL}${previewImg}`}/> }
                                    <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                                    {!!previewImg && <button className={styles.button_delete} onClick={onClickRemoveImage}>
                                        delete avatar
                                    </button>}
                                </div>
                                <input
                                    type="name"
                                    name="fullName"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fullName}
                                    className={styles.input}
                                />
                                {errors.fullName && touched.fullName && <div className={styles.input_error}>
                                   {errors.fullName}
                               </div>}
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-mail"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    className={styles.input}
                                />
                                {errors.email && touched.email && <div className={styles.input_error}>
                                    { errors.email}
                                </div>}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    className={styles.input}
                                />
                                {errors.password && touched.password && <div className={styles.input_error}>
                                    {errors.password}
                                </div>}
                                <button type="submit" disabled={isSubmitting}  className={styles.button}>
                                    Submit
                                </button>
                            </form>
                        )}
                    </Formik>
                </div>
            </main>
        </>
    );
};

export default Register;