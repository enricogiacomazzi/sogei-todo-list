
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
        const item = items?.find(x => x.id === id);
        if(!item) {
          throw new Error('item not found');
        }

        await axios.delete(`${BASEURL}/${id}`)
        return id;
    },
    {
        onSuccess: () => invalidate()
    });

    // const [items, setItems] = useState<Array<ListItemModel>>([]);
    // const [loading, setLoading] = useState<boolean>(false);
    // const [error, setError] = useState<string | undefined>();
  
    // const  getData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get('http://localhost:3001/todos');
    //     const data = response.data;
    //     setItems(data);
    //   }catch(e) {
    //     setError(e.message)
    //     console.log('errore', e);
    //   }
    //   finally{
    //     setLoading(false);
    //   }
  
    // }
  
  
    // const  getData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch(BASEURL);
    //     const data = await response.json();
    //     setItems(data);
    //   }catch(e: any) {
    //     setError(e.message)
    //     console.log('errore', e);
    //   }
    //   finally{
    //     setLoading(false);
    //   }
  
    // }
  
    // useEffect(() => {
    //   getData();
    // }, []);
  
  
    const toggleCompleted = async (id: number) => {
      const item = items?.find(x => x.id === id);
      if(!item) {
        return;
      }
      try {
        const res = await axios.patch(`${BASEURL}/${id}`, {...item, completed: !item.completed});
        queryClient.invalidateQueries(queryKey);
        // const editedItem = res.data;
        // setItems(items.map(x => x.id === id ? editedItem : x));
        // await getData();
      } catch (e) {
        console.log('error');
      }
    }
  
    // const deleteItem = async (id: number) => {
    //   const item = items?.find(x => x.id === id);
    //   if(!item) {
    //     return;
    //   }
    //   try {
    //     const res = await axios.delete(`${BASEURL}/${id}`);
    //     queryClient.invalidateQueries(queryKey);
    //     // setItems(items.filter(x => x.id !== id));
    //     // await getData();
    //   } catch (e) {
    //     console.log('error');
    //   }
    // }
  
    const addItem = async (label: string) => {
      try {
        const res = await axios.post(BASEURL, {label, completed: false});
        queryClient.invalidateQueries(queryKey);
        // setItems([...items, res.data]);
        // await getData();
      } catch (e) {
        console.log('error');
      }
    }


    return {
        loading: isLoading,
        error,
        addItem, 
        items,
        toggleCompleted,
        deleteItem
    }

}