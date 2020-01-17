import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InputBase from '@material-ui/core/InputBase'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserHistory } from 'history';
import { CategoryTabs } from './CategoryTabs'
import { WriterGeneral, Writer } from './Writer.js'
import { ArtistGeneral, Artist } from './Artist.js'
import { OwnerGeneral, Owner } from './Owner.js'
import ComicLogo from '../img/ComicClan.png'
import ComicIcon from '../img/IconShape.png'
import BlankIcon from '../img/Rectangle.png'
import EmptyStarIcon from '../img/emptyStar.png'
import FullStarIcon from '../img/fullStar.png'

export const Random = (props) => {
    let valueArray = []
    const [randomArray, updateRandomArray] = useState([])
    const comicsStore = useSelector(state => state.navState.comics)

    useEffect(() => {
        if (comicsStore.length > 0)
        {
            let i = 0
            while (i < (props.page === 'book' ? 6 : props.count))
            {
                let result = Math.floor((Math.random() * comicsStore.length-1) + 1)
                if (!valueArray.includes(result))
                    valueArray.push(result)
                else
                    continue
                i++
            }
        }
        updateRandomArray(valueArray)
    },[comicsStore])

    console.log("Here at random", valueArray)
    let otherMatch = useRouteMatch()

    const createUrlForBookPage = (item) => {
        console.log(item)
        let itemSplit = item.name.split(" ")
        let urlPath = itemSplit.join("?")
        let pathname = window.location.pathname.split("/")[1]
        //updateBookPageRoute(`/${urlPath}`)
        return `${urlPath}`
    }
    console.log(otherMatch)
    if (comicsStore.length < 1)
        return
    return (<div>
        <Fragment>
        <div style={{ marginTop: 22, alignContent: 'space-between', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

            {randomArray.length > 0 &&
                randomArray.map((item, index) => {
                    return (
                        <div style={{height: 500, minHeight: 400, display: 'flex', flexDirection: 'column', alignContent: 'space-between', justifyContent: 'center', width: 274, marginLeft: 2}}>
                        <div style={{maxWidth: 272, height: 500}}>
                                <img onClick={() => {window.location.href = `/bookpage/${createUrlForBookPage(comicsStore[item])}`}} style={{minWidth: 100, maxWidth: 250, width: "100%", minHeight: 20, height: "auto", maxHeight: 370}} src={BlankIcon}></img>
                                <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: "1.3rem", display: 'flex', marginTop: 0}}>{comicsStore[item].name} </Typography>
                                <div style={{display: 'flex', height: 100}}>
                                    <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                        <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                        <p style={{color: '#999999', marginRight: 3}}>By</p>
                                        <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{comicsStore[item].owner}</p>
                                        </Typography>
                                </div>
                            </div>
                        </div>
                )
            })}
            </div>
        </Fragment>
        </div>
    )
}