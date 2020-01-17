import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import BlankIcon from '../img/Rectangle.png'
import { Standard } from '../utils/standard.js'

export const Artist = (props) => {
    return (
        <div style={{marginTop: 30}}>
            <Switch>
                <Route render={ () => <ArtistGeneral sorted={props.sorted}/>}/>
            </Switch>
        </div>
    )
}

export const ArtistGeneral = (props) => {
    return (<Fragment>
        <div style={{ marginTop: 22, alignContent: 'space-between', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        {props.sorted.length > 0 &&
        props.sorted.map((item, index) => {
            return (
                <>
                    <Standard item={item}/>
                </>
            )
        })}
        </div>
    </Fragment>)
}