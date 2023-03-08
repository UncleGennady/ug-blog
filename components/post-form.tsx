import React from 'react';
import {Formik} from "formik";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {ICreatedPost} from "@/model";
import styles from "@/styles/LoginRegister.module.scss";
import Avatar from "@/components/avatar";
import {useFetchImg} from "@/hook";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const PostForm = ({title, tags, textMarkdown, setTextMarkdown, submitHandle}:{title?:string, tags?:string[], textMarkdown:string, setTextMarkdown:any, submitHandle:(values:ICreatedPost)=>void}) => {

    const {previewImg, inputFileRef, handleChangeFile, onClickRemoveImage } = useFetchImg()

    return (
        <Formik
            initialValues={{ title: title, tags: !!tags ? tags.join(' ') : ''}}
            validate={values => {
                const errors:any = {};
                if (!values.title) {
                    errors.title = 'Required';
                } else if (values.title.trim().length < 1) {
                    errors.title = 'Invalid title';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                //imageUrl: ""
                const localValues:ICreatedPost = {imageUrl : '', ...values, tags: values.tags.trim().split(' '), text : textMarkdown }
                submitHandle(localValues)
                setTimeout(() => {
                    alert(JSON.stringify(localValues, null, 2));
                    setSubmitting(false);
                }, 400);
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
                <form onSubmit={handleSubmit}>
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
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.title}
                    />
                    {errors.title && touched.title && errors.title}
                    <input
                        type="text"
                        name="tags"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.tags}
                    />
                    <div>
                        <MDEditor value={textMarkdown} height={500} onChange={setTextMarkdown}  />
                    </div>

                    {!!textMarkdown && textMarkdown.trim().length < 5 && <p>Invalid text</p>}

                    <button type="submit" disabled={isSubmitting}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    );
};

export default PostForm;