import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import {useDeleteAvatarMutation, useFetchAvatarMutation} from "@/store/authApi";
import {useRef, useState} from "react";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useFetchImg = (initialImg?:string) =>{
    const initialState = initialImg || ""  ;
    const [fetchAvatar] = useFetchAvatarMutation();
    const [deleteAvatar] = useDeleteAvatarMutation();
    const inputFileRef:any = useRef(null);
    const [previewImg, setPreviewImg] = useState<string>(initialState);
    const handleChangeFile = async(event:any) => {
        try {
            console.log(1)
            const formData:any = new FormData();
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

    return {previewImg, setPreviewImg, inputFileRef, handleChangeFile, onClickRemoveImage };
}