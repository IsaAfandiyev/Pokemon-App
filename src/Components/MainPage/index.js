import {useDispatch, useSelector} from "react-redux";
import {useEffect,useState} from "react";
import React from "react";
import {fetchPokemons} from "../../redux/pokemons";
import axios from "axios";
import styles from "./index.module.css"
import PaginationRounded from "../Pagination";

function MainPage() {
    const dispatch = useDispatch();
    const allData = useSelector(state=>state.characters.allItems)
    const status = useSelector(state => state.characters.status)
    const page = useSelector(state=>state.characters.page)
    console.log(allData)
    useEffect(()=>{
        dispatch(fetchPokemons(page))
    },[dispatch,page])


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [item, setItem] = useState(null);

    console.log('item',item)
    const getPokemon = async (url)=>{
        handleOpen();
        const res = await axios.get(url);
        const data = res.data;
        setItem(data)
    }

    return(
        <>
            {
                status ==='loading' ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <div className={styles.mainPageContainer}>

                    <div className={styles.container}>
                        {
                            allData&&
                            React.Children.toArray(
                                allData.map(item=>(
                                    <div className={styles.itemsCard} onClick={()=>getPokemon(item.url)}>
                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${item.url.split('/')[item.url.split("/").length - 2]}.png`} alt=""/>
                                        <div>{item.name}</div>
                                    </div>

                                ))
                            )
                        }

                    </div>
                            <div className={styles.rightSide}>
                                <h1 className={styles.rightSideName}>{item?item.name:'select Pokemon'}</h1>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item?item.id:4}.svg`} alt="" className={styles.rightSideImg}/>
                                <div className={styles.abilities}>
                                    <div className={styles.group}>
                                        <h2>{item?item.abilities[0].ability.name:'select pokemon'}</h2>
                                    </div>
                                    <div className={styles.group}>
                                        <h2>{item?item.abilities[1].ability.name:'select pokemon'}</h2>
                                    </div>
                                </div>
                                <div className={styles.baseStat}>
                                    { item? item.stats.map( stat =>(
                                        <h3>{stat.stat.name}:{stat.base_stat}</h3>
                                    )) : 'loading'}
                                </div>
                            </div>

                        </div>
                        <PaginationRounded/>


                    </>
            }
        </>
    )

}

export default MainPage;