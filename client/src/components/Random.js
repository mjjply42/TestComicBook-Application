import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlankIcon from '../img/Rectangle.png'
import { Standard } from '../utils/standard.js'

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
    let otherMatch = useRouteMatch()
    if (comicsStore.length < 1)
        return
    return (<div>
        <Fragment>
        <div style={{ marginTop: 30, alignContent: 'space-between', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

            {props.sorted.length > 0 &&
                props.sorted.map((item, index) => {
                    return(
                    <>
                        <Standard item={item}/>
                    </>
                )
            })}
            </div>
        </Fragment>
        </div>
    )
}