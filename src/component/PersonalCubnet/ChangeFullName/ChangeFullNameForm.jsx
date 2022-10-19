import React from 'react';
import {useForm} from "react-hook-form";

const ChangeFullNameForm = ({changeFullNameUsers,setEditName}) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();

    const onSubmit = (data) => {
        debugger
        reset()
        setEditName(false)
        changeFullNameUsers(data)
    }



    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input placeholder={"Введите имя"}  {...register("displayName")} type="text"/>
            </div>
            <button type={"submit"}>Сохранить новое имя</button>
        </form>
    );
};

export default ChangeFullNameForm;