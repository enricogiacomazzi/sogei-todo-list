
import React, { useEffect, useState } from 'react';
import { ListItemModel } from './models/ListItemModel';
import axios, { AxiosError } from 'axios';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

export function useTodoList() {

    const BASEURL = 'http://localhost:3001/todos';
    const queryKey = ['getItems'];
    const queryClient = useQueryClient();

    const {data: items, isLoading, error} = useQuery<Array<ListItemModel>, any>(queryKey, async () => {
        const res = await axios.get(BASEURL);
        return res.data;
    });

    const invalidate = () => {
        return queryClient.invalidateQueries(queryKey);
    }

    const deleteItem = useMutation<number,any, number>(async id => {
        await axios.delete(`${BASEURL}/${id}`)
        return id;
    }, { onSuccess: () => invalidate()});

    const toggleCompleted = useMutation<void,any, number>(async (id) => {
        const item = items?.find(x => x.id === id);
        if(!item) {
          throw new Error('item not found');
        }

        await axios.patch(`${BASEURL}/${id}`, {completed: !item.completed});
    }, { onSuccess: () => invalidate()});

    const addItem = useMutation<void, any, string>(async (label) => {
        await axios.post(BASEURL, {label, completed: false});
    }, { onSuccess: () => invalidate()})


    return {
        loading: isLoading,
        error,
        addItem, 
        items,
        toggleCompleted,
        deleteItem
    }

}