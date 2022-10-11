import React from 'react';
import { ListItemModel } from '../../models/ListItemModel';

interface ListItemProps {
    item: ListItemModel;
    toggleCompleted: () => void;
    deleteItem: () => void;
}


const ListItem: React.FC<ListItemProps> = ({item: {completed, label}, toggleCompleted, deleteItem}) => {

    const style = completed ? {textDecoration: 'line-through'} : undefined;
    const iconCls = completed ? 'fa fa-times' : 'fa fa-check';
    return (
        <li>
            <span style={style}>{label}</span>
            <button onClick={toggleCompleted}><i className={iconCls}/></button>
            <button onClick={deleteItem}><i className='fa fa-trash'/></button>
        </li>
    )
}


export default ListItem;