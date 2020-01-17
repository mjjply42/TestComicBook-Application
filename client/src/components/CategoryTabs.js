import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'

export const CategoryTabs = (props) => {
    const classes = useStyles()
    const [buttonTabs, updateButtons] = useState([
        {name:"Year", selected: false, path: '/year'}, {name: "Writer", selected: false, path: '/writer'}, 
        {name: "Artist", selected: false, path: '/artist'}, {name: "Owner", selected: false, path: '/owner'}, 
        {name: "Random", selected: false, path: '/random'}])

    const changeClickStatuses = (item) => {
        let newButtons = JSON.parse(JSON.stringify(buttonTabs))
        newButtons.map((button, index) => {
            if (button.name !== item.name)
                button.selected = false
            else
                button.selected = true
        })
        updateButtons(newButtons)
        props.changeTab(item)
    }
    useEffect(() => {
        let item = buttonTabs.filter((item) => {
            return item.path === window.location.pathname
        })
        if (item.length > 0)
            changeClickStatuses(item[0])
    },[])

    return (
        <Fragment>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {buttonTabs ? buttonTabs.map((item, index) => {
                return ( item.selected ?
                    <label htmlFor="text-button-file">
                        <Fab size="small" classes={{ root: classes.inputRootSelected}} onClick={() => {changeClickStatuses(item)}} style={{textColor: 'purple', marginLeft: 5, marginRight: 5, backgroundColor: "#F15454"}} 
                            variant={item.selected ? "contained":null} component="span">{item.name}</Fab>
                    </label> :
                    <label htmlFor="text-button-file">
                        <Link style={{ textDecoration: 'none' }} to={item.path} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
                            <Button classes={{ root: classes.inputRootUnSelected}} onClick={() => {changeClickStatuses(item)}} 
                        style={{marginLeft: 5, marginRight: 5}} 
                        variant={item.selected ? "contained":null} component="span">{item.name}</Button></Link>
                    </label> 
                )
            }): undefined}
            </div>
        </Fragment>
        )
}

const useStyles = makeStyles(theme => ({

    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    inputRootUnSelected: {
        color: '#777777',
        width: '100%'
    },
    inputRootSelected: {
        color: 'white',
        width: '100%'
    },
    inputInput: {
        marginLeft: 56,
        color: '#777777',
        marginTop: -3,
        fontSize: 20,
        fontWeight: 'heavy',
    },
    }));