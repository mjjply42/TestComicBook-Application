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
import ComicLogo from '../img/ComicClan.png'
import ComicIcon from '../img/IconShape.png'
import BlankIcon from '../img/Rectangle.png'
import EmptyStarIcon from '../img/emptyStar.png'
import FullStarIcon from '../img/fullStar.png'

export const Owner = (props) => {
    let aboutMatch = useRouteMatch()
    return (
        <div style={{marginTop: 30}}>
            <Switch>
                {/*<Route path='/year/id'>
                    {sorted ? sorted.map((item, index) => {
                        return (
                            <AboutFull info={item}/>
                        )
                    }):undefined}
                </Route>*/}
                <Route render={ () => <OwnerGeneral sorted={props.sorted}/>}/>
            </Switch>
        </div>
    )
}

export const OwnerGeneral = (props) => {
    console.log("Here at owner")

    const createUrlForBookPage = (item) => {
        console.log(item)
        let itemSplit = item.name.split(" ")
        let urlPath = itemSplit.join("?")
        let pathname = window.location.pathname.split("/")[1]
        //updateBookPageRoute(`/${urlPath}`)
        return `${urlPath}`
    }

    return (<Fragment>
        <Grid container
        direction="row"
        justify="space-between"
        alignItems="center" spacing={2} style={{marginTop: 22}}>
        {props.sorted.length > 0 &&
        props.sorted.map((item, index) => {
            return (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={1} style={{height: 550, minHeight: 450, height: 400}}>
                            <img onClick={() => {window.location.href = `/bookpage/${createUrlForBookPage(item)}`}} style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                            <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                            <div style={{display: 'flex', height: 100}}>
                                <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                    <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                    <p style={{color: '#999999', marginRight: 3}}>By</p>
                                    <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{item.owner}</p>
                                    </Typography>
                            </div>
                        </Grid>
            )
        })}
        </Grid>
    </Fragment>)
}