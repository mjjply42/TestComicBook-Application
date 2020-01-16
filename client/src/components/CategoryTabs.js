import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'

export const CategoryTabs = (props) => {

    const classes = useStyles()
    const [buttonTabs, updateButtons] = useState([
        {name:"Year", selected: true}, {name: "Writer", selected: false}, 
        {name: "Artist", selected: false}, {name: "Owner", selected: false}, 
        {name: "Random", selected: false}])

    const handleClickStatuses = (item) => {
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

    return (
        <Fragment>
            {buttonTabs ? buttonTabs.map((item, index) => {
                return ( item.selected ?
                    <label htmlFor="text-button-file">
                        <Fab size="small" classes={{ root: classes.inputRootSelected}} onClick={() => {handleClickStatuses(item)}} style={{textColor: 'purple', marginLeft: 5, marginRight: 5, backgroundColor: "#F15454"}} 
                            variant={item.selected ? "contained":null} component="span">{item.name}</Fab>
                    </label> :
                    <label htmlFor="text-button-file">
                        <Button classes={{ root: classes.inputRootUnSelected}} onClick={() => {handleClickStatuses(item)}} 
                        style={{marginLeft: 5, marginRight: 5}} 
                        variant={item.selected ? "contained":null} component="span">{item.name}</Button>
                    </label> 
                )
            }): undefined}
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