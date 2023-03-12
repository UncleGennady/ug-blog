import React from 'react';
import {Formik} from "formik";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import {ICreatedPost} from "@/model";
import styles from "@/styles/PostForm.module.scss";
import {useFetchImg} from "@/hook";
import Image from "next/image";


const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

const PostForm = ({title, tags, img, textMarkdown, setTextMarkdown, submitHandle}:{title?:string, tags?:string[], img?:string, textMarkdown:string, setTextMarkdown:any, submitHandle:(values:ICreatedPost)=>void}) => {
    console.log(img);
    const {previewImg, inputFileRef, handleChangeFile, onClickRemoveImage } = useFetchImg(img);
    return (
        <Formik
            initialValues={{ title: title, tags: !!tags ? tags.join(' ') : ''}}
            validate={values => {
                const errors:any = {};
                if (!values.title) {
                    errors.title = 'Required title';
                } else if (values.title.trim().length < 1) {
                    errors.title = 'Invalid title';
                }
                return errors;
            }}
            onSubmit={ (values, { setSubmitting }) => {
                const localValues:ICreatedPost = {imageUrl : previewImg, ...values, tags: values.tags.trim().split(' '), text : textMarkdown }
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
              }) => (
               <>
                   <div className={styles.preview_wrapper}>
                       {!previewImg && <button className={styles.button} onClick={()=> inputFileRef.current.click()}>
                           Add preview image
                       </button>}
                       {!!previewImg && <div className={styles.preview_image}>
                           <Image
                               loader={() =>`${process.env.NEXT_PUBLIC_API_URL}${previewImg}`}
                               src={`${process.env.NEXT_PUBLIC_API_URL}${previewImg}`}
                               alt={"#"}
                               unoptimized={true}
                               fill
                           />
                       </div>}
                       <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
                       {!!previewImg && <button className={styles.button_delete} onClick={onClickRemoveImage}>
                           delete image
                       </button>}
                   </div>
                   <form className={styles.form} onSubmit={handleSubmit}>
                       <input
                           className={styles.title}
                           type="text"
                           name="title"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.title}
                           placeholder={'Article title...'}
                       />
                       {errors.title && touched.title && errors.title}
                       <input
                           className={styles.tags}
                           type="text"
                           name="tags"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.tags}
                           placeholder={'tags are separated by spaces...'}
                       />
                       <div className={styles.markdown}>
                           <MDEditor value={textMarkdown} height={500} onChange={setTextMarkdown}  />
                       </div>

                       {!!textMarkdown && textMarkdown.trim().length < 5 && <p>Invalid text</p>}

                       <button className={styles.button} type="submit" disabled={isSubmitting}>
                           Submit
                       </button>
                   </form>
               </>
            )}
        </Formik>
    );
};

export default PostForm;