import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import BlankIcon from '../img/Rectangle.png'

const createUrlForBookPage = (item) => {
    let itemSplit = item.name.split(" ")
    let urlPath = itemSplit.join("?")
    let pathname = window.location.pathname.split("/")[1]
    return `${urlPath}`
}

export const Standard = (props) => {
    return (
        <div style={{height: 500, minHeight: 400, display: 'flex', flexDirection: 'column', alignContent: 'space-between', justifyContent: 'center', width: 274, marginLeft: 2}}>
                    <div style={{maxWidth: 272, height: 500}}>
                            <img onClick={() => {window.location.href = `/bookpage/${createUrlForBookPage(props.item)}`}} style={{minWidth: 100, maxWidth: 250, width: "100%", minHeight: 20, height: "auto", maxHeight: 370}} src={BlankIcon}></img>
                            <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: "1.3rem", display: 'flex', marginTop: 0}}>{props.item.name} </Typography>
                            <div style={{display: 'flex', height: 100}}>
                                <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                    <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                    <p style={{color: '#999999', marginRight: 3}}>By</p>
                                    <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{props.item.owner}</p>
                                    </Typography>
                            </div>
                        </div>
                    </div>
    )
}