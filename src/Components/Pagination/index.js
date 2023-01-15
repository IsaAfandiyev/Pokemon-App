import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useDispatch, useSelector} from "react-redux";
import {changePage} from "../../redux/pokemons";

export default function PaginationRounded() {
    const dispatch = useDispatch();
    const page = useSelector(state=>state.characters.page)
    const pages = useSelector(state=>state.characters.pages)

    const pageValue = (e,value)=>{
        dispatch(changePage(value))
    }
    return (
        <Stack spacing={2}>
            <Pagination count={10} shape="rounded"  onChange={pageValue} page={page} />
        </Stack>
    );
}