import React, { ChangeEvent, ChangeEventHandler, useRef, useState } from "react";


interface AddItemProps {
    addItem: (txt: string) => void
}


const AddItem: React.FC<AddItemProps> = ({addItem}) => {


    const fileRef = useRef<HTMLInputElement>();

    // const inputRef = useRef<HTMLInputElement>();
    // const add = () => {
    //     const value = inputRef.current.value;
    //     inputRef.current.value = '';
    //     addItem(value);
    // }

    // <input type="text" ref={inputRef}/>

    const [value, setValue] = useState<string>('ciao');


    const add = () => {
        addItem(value);
        setValue('');
    }


    return (
        <>
            <input id="pippo" type="text" value={value} onChange={e => setValue(e.target.value)}/>
            <button onClick={add}>Add</button>
        </>
    )
}

export default AddItem;


