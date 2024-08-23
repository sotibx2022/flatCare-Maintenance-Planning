"use client"
import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { useReducer } from 'react'
import { useDispatch } from 'react-redux';
interface SearchProps {
    searchResults: (params: { searchValue: string, categoryValue: string, priorityValue: string }) => void;
}
const Search: React.FC<SearchProps> = ({ searchResults }) => {
    const initialState = {
        search: '',
        category: '',
        priority: '',
    }
    const reducer = (state: typeof initialState, action: { type: string, payload: string }) => {
        switch (action.type) {
            case 'SETSEARCH':
                return { ...state, search: action.payload }
            case 'SETCATEGORY':
                return { ...state, category: action.payload }
            case 'SETPRIORITY':
                return { ...state, priority: action.payload }
            case 'RESET':
                return { ...initialState }
            default: return state;
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const findCategories = async () => {
        const response = await axios.get("/api/category/findCategory");
        return response.data.categories;
    }
    const searchNotifications = (value: string) => {
        dispatch({ type: 'SETSEARCH', payload: value });
        if (searchResults) {
            searchResults({
                searchValue: value,
                categoryValue: state.category,
                priorityValue: state.priority
            });
        }
    };
    const searchByPriority = (value: string) => {
        dispatch({ type: 'SETPRIORITY', payload: value });
        searchResults({ searchValue: state.search, categoryValue: state.category, priorityValue: value });
    };
    const searchByCategory = (value: string) => {
        dispatch({ type: 'SETCATEGORY', payload: value });
        searchResults({ searchValue: state.search, categoryValue: value, priorityValue: state.priority });
    };
    const resetSearch = () => {
        dispatch({ type: 'RESET', payload: '' });
        searchResults({ searchValue: '', categoryValue: '', priorityValue: '' });
    };
    const { data: categories = [] } = useQuery({ queryKey: ['categories'], queryFn: findCategories })
    return (
        <div className='flex  flex-col  -mt-[1rem] justify-start lg:justify-between lg:gap-4 lg:items-center lg:flex-row lg:mt-4'>
            <div className="form_Item">
                <input type='search' placeholder='Search Notification' value={state.search}
                    onChange={(e) => searchNotifications(e.target.value)}
                    className='bg-primaryLight border-b-2 border-b-primaryDark outline-none py-2 text-primaryDark' />
            </div>
            <div className="form_Item">
                <label>Filter By Categories</label>
                <select value={state.category} onChange={(E) => searchByCategory(E.target.value)}>
                    <option value="">Select One</option>
                    {categories && categories.map((category: { id: string, name: string }, index: number) => {
                        return <option key={index} value={category.name}>{category.name}</option>
                    })}
                </select>
            </div>
            <div className="form_Item">
                <label>Filter By Priorities</label>
                <select value={state.priority} onChange={(E) => searchByPriority(E.target.value)} >
                    <option value="">Select One</option>
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                </select>
            </div>
            <button onClick={resetSearch}>Reset</button>
        </div>
    )
}
export default Search