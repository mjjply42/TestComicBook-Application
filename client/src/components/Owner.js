import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Standard } from '../utils/standard.js'

export const Owner = (props) => {
    return (
        <div style={{marginTop: 30}}>
            <Switch>
                <Route render={ () => <OwnerGeneral sorted={props.sorted}/>}/>
            </Switch>
        </div>
    )
}

export const OwnerGeneral = (props) => {
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