import React from 'react';
import { ListItemModel } from '../../models/ListItemModel';
import ListItem from '../list-item/ListItem';

interface ListProps {
    items: Array<ListItemModel>;
    toggleCompleted: (id: number) => void;
    deleteItem: (id: number) => void;
}


const List: React.FC<ListProps> = (props) => {
    return (
        <ul>
        {props.items.map(x => <ListItem
                                    key={x.id}
                                    item={x} 
                                    toggleCompleted={() => props.toggleCompleted(x.id)}
                                    deleteItem={() => props.deleteItem(x.id)}
                                />)}
        </ul>
    )
}


export default List;

