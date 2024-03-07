import { useState } from "react";



export const useModalVagas = () => {

    const [modal18, setModal18] = useState(false);


    const handleClick = () => {
        setModal18(true)
    }

    return{modal18, setModal18, handleClick}
}
