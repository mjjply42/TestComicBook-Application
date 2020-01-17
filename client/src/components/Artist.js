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

export const Artist = (props) => {
    let aboutMatch = useRouteMatch()
    return (
        <div style={{marginTop: 30}}>
            <Switch>
                <Route render={ () => <ArtistGeneral sorted={props.sorted}/>}/>
            </Switch>
        </div>
    )
}

export const ArtistGeneral = (props) => {
    let aboutMatch = useRouteMatch()
    console.log("Here at artist")
    return (<Fragment>
        <Grid container
        direction="row"
        justify="space-between"
        alignItems="center" spacing={2} style={{marginTop: 22}}>
        {props.sorted.length > 0 &&
        props.sorted.map((item, index) => {
            return (
                <Grid item xs={6} sm={4} md={3} lg={2} xl={1} style={{height: 550, minHeight: 450, height: 400}}>
                            <Link  style={{ textDecoration: 'none' }} to={`/bookpage/Dog?Boy?#310`}>
                            <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                            <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                            <div style={{display: 'flex', height: 100}}>
                                <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                    <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                    <p style={{color: '#999999', marginRight: 3}}>By</p>
                                    <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{item.owner}</p>
                                    </Typography>
                            </div>
                            </Link>
                        </Grid>
            )
        })}
        </Grid>
    </Fragment>)
}