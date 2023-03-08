import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import {useDeleteAvatarMutation, useFetchAvatarMutation} from "@/store/authApi";
import {useRef, useState} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useFetchImg = ()=>{
    const [fetchAvatar] = useFetchAvatarMutation()
    const [deleteAvatar] = useDeleteAvatarMutation()
    const inputFileRef = useRef(null)
    const [previewImg, setPreviewImg] = useState<string>('')
    const handleChangeFile = async(event:any) => {
        try {
            console.log(1)
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const {data}:any = await fetchAvatar(formData)

            console.log(data)

            setPreviewImg(data.url)

        }catch (err){
            console.warn("ошибка",err);
            alert('Error getting file!')
        }
    };

    const onClickRemoveImage = async() => {
        try {
            const {data}:any = await deleteAvatar({data:{ url: previewImg }})
            console.log(data)
            setPreviewImg('')
        }catch (err){
            console.warn("ошибка",err);
            alert('Error deleting file!')
        }
    };

    return {previewImg, inputFileRef, handleChangeFile, onClickRemoveImage }
}