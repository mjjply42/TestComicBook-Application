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
import { Random } from './Random.js'
import ComicLogo from '../img/ComicClan.png'
import ComicIcon from '../img/IconShape.png'
import BlankIcon from '../img/Rectangle.png'
import EmptyStarIcon from '../img/emptyStar.png'
import FullStarIcon from '../img/fullStar.png'
import { Standard } from '../utils/standard.js'

const validSorts = ["year", "owner", "artist", "writer", "random", ""]

export default function MainSection() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const comicsStore = useSelector(state => state.navState.comics)
    const [comics, updateComics] = useState([])
    const [previousRoute, updatePreviousRoute] = useState("")
    const [currentRoute, updateCurrentRoute] = useState("")
    const [searched, updateSearched] = useState([])
    const [sorted, updateSortSet] = useState([])
    const bookpageSignal = useSelector(state => state.navState.bookpage)
    const [bookPageRoute, updateBookPageRoute] = useState("")
    const [currentKey, updateCurrentKey] = useState()
    let routeSource = useRouteMatch()
    const history = createBrowserHistory()


    useEffect(() => {
        dispatch({type: 'update-comics-saga-pusher'})
        updatePreviousRoute(window.location.href)
        if (window.location.pathname === "/")
            return
        updateCurrentKey(window.location.pathname.split("/")[1])
    }, [])

    useEffect(() => {
        if (comicsStore.length > 0 )
            updateCurrentRoute(getCurrentBookRoute())
    },[routeSource])


    useEffect(() => {
        updateComics(comicsStore)
        if (comicsStore.length > 0)
        {
            setRandomSequenceArray()
            sortSetByKey(currentKey, comicsStore)
            updateCurrentRoute(getCurrentBookRoute())
        }
    }, [comicsStore])

    useEffect(() => {
        console.log("KEY ", currentKey)
        if (currentKey === "random")
            setRandomSequenceArray()
    },[currentKey])

    const getCurrentBookRoute = () => {
        if (!window.location.pathname.split("/").includes('bookpage'))
            return
        let comicName = window.location.href.split("/bookpage/")[1].split("?").join(" ")
        let comicItem = comicsStore.filter((item, index) => {
            return item.name === comicName
            }) 
        return comicItem 
    }

    const setRandomSequenceArray = () => {
        let i = 0
        let valueArray = []
        let newSortArr = []
        while (i < comicsStore.length)
        {
            let result = Math.floor((Math.random() * comicsStore.length-1) + 1)
            if (!valueArray.includes(result))
                valueArray.push(result)
            else
                continue
            newSortArr.push(comicsStore[result])
            i++
        }
        updateSortSet(newSortArr)
        return(newSortArr)
    }

    const sortSetByKey  = async (key, array = comicsStore, source) => {
        let arr = []
        let newYearArr = []
        let year = 0
        let index = 0
        if (!comicsStore.length > 0)
            return
        if (!validSorts.includes(key))
            return
        if (key === 'random')
        {
            setRandomSequenceArray()
            return
        }
        updateCurrentKey(key)
        if (key === "year")
        {
            arr = array.sort(function(a, b) {
                return b[key.trim()] - a[key.trim()];
            })
            arr.map((item, ind) => {
                if (year !== item.year)
                {
                    newYearArr.push([])
                    if (year !== 0)
                        index++
                    year = item.year
                }
                newYearArr[index].push(item)
            })
            updateSortSet(newYearArr)
        }
        else if (source === "search" && key !== 'year')
            updateSortSet(JSON.parse(JSON.stringify(array.sort(await dynamicSort(key)))))
        else
        {
            arr = JSON.parse(JSON.stringify(array.sort(await dynamicSort(key))))
            updateSortSet(arr)
        }
    }


    function dynamicSort(property) {
        var sortOrder = 1;
    
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
    
        return function (a,b) {
            if(sortOrder == -1){
                return b[property].localeCompare(a[property]);
            }else{
                return a[property].localeCompare(b[property]);
            }        
        }
    }

    const Year = () => {
        return (
            <div>
                <Switch>
                    <Route render={ () => 
                            <YearGeneral />}/>
                </Switch>
            </div>
        )
    }


    const YearGeneral = () => {
        return (<Fragment>
                {sorted.length > 0 &&
                sorted.map((item, index) => {
                    return (
                        <Fragment>
                            <h1 style={{textAlign: 'left', color: '#AAAAAA'}}>{item[0].year}</h1>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                            {item.map((it, index) => {
                                return (
                                    <>
                                        <Standard item={it}/>
                                    </>
                                )
                            })
                            }
                            </Grid>
                            <Divider style={{backgroundColor: "#535353"}} heavy/>
                            <Divider style={{backgroundColor: "#535353"}} heavy/>
                        </Fragment>
                    )
                })
                }
            </Fragment>
                )
    }

    const BookPage = () => {
        dispatch({type: 'update-bookpage-signal', data: true})
        return (
            <div>
                <div style={{display: 'flex', marginTop: 40, flexDirection: 'row'}}>
                    <ChevronLeftIcon onClick={() => {history.goBack()}} style={{color: "#777777"}}/>
                    <Typography style={{color: '#777777'}} onClick={() => {history.goBack()}}>Back to collection</Typography>
                </div>
                {currentRoute &&
                <Fragment><div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30, justifyContent: 'center'}}>
                    <img style={{minWidth: 300, minHeight: 200, width: "24.2%", height: 517}} src={BlankIcon}></img>
                    <div style={{marginLeft: 40, display: 'flex', flexDirection: 'column', width: "67%"}}>
                        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', alignContent: 'space-between'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '80%', minWidth: '50%'}}>
                            <Typography style={{textAlign: 'left', fontSize: '2rem', color: '#AAAAAA'}}>{`${currentRoute[0].name} (${currentRoute[0].year})`}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '10%', marginTop: 5}}>
                        {
                            
                            [0, 1, 2, 3, 4].map((item, index) => {
                                if (currentRoute[0].rating - index >= 0)
                                    return (<img style={{minWidth: 10, height: 30}} src={FullStarIcon}></img>)
                                else
                                    return (<img style={{minWidth: 10, height: 24, marginTop: -3}} src={EmptyStarIcon}></img>)
                            })
                        }
                        </div>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column', minWidth: 300, alignItems: 'flex-start'}}>
                        <Typography style={{display: 'flex', alignSelf: 'flex-start'}}>
                            <p style={{color: '#999999', marginRight: 3}}>Writer:</p>
                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{currentRoute[0].writer}</p>
                        </Typography>
                        <Typography style={{display: 'flex', alignSelf: 'flex-start'}}>
                            <p style={{color: '#999999', marginRight: 3}}>Artist:</p>
                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{currentRoute[0].artist}</p>
                        </Typography>
                        <Typography style={{textAlign: 'left', display: 'flex', alignSelf: 'flex-start'}}>
                            <p style={{color: '#999999', marginRight: 3}}>Publication:</p>
                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{currentRoute[0].publication}</p>
                        </Typography>
                        <Typography style={{textAlign: 'left', display: 'flex', alignSelf: 'flex-start'}}>
                            <p style={{color: '#999999', marginRight: 3}}>Owner:</p>
                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{currentRoute[0].owner}</p>
                        </Typography>
                        <br></br>
                        <Typography style={{color: '#CCCCCC', textAlign: 'left', fontSize: 16}}>{currentRoute[0].summary}</Typography>
                    </div>
                    </div>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Divider style={{backgroundColor: "#535353"}} heavy/>
                    <Divider style={{backgroundColor: "#535353"}} heavy/>
                </Fragment>
                }
                <div style={{display: 'flex', marginTop: 40, flexDirection: 'row', alignItems: 'center'}}>
                    <Typography style={{fontSize: 32, color: '#AAAAAA'}}>Other Random Books</Typography>
                </div>
                <Random page={"book"} count={(comicsStore ? comicsStore.length -1 :25)} sorted={sorted}/>
            </div>
        )
    }

    const handleChange = (event) => {
        let val = event.target.value
        if (val === "")
        {
            updateSearched([])
            return
        }
        if (comicsStore.length < 0)
            return
        if (window.location.pathname !== "/random")
        {
            let result = comicsStore.filter((item, index) => {
                return !item.name.toLowerCase().indexOf(val.toLowerCase())
            })
            updateSearched(result)
            sortSetByKey(currentKey, result, "search")
        }
        else
        {
            let randomArr = setRandomSequenceArray()
            let result = randomArr.filter((item, index) => {
                return !item.name.toLowerCase().indexOf(val.toLowerCase())
            })
            updateSearched(result)
            updateSortSet(result)
        }
    }

    const updateTabSelect = (item) => {
        console.log("IT ", item)
        sortSetByKey(item.path.split("/")[1])
    }

    const Search = () => {
        return (
            <>
        <div style={{ marginTop: 22, alignContent: 'space-between', display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {searched ? searched.map((item, index) => {
                return ((
                    <>
                        <Standard item={item}/>
                    </>
                )
                )
            }): undefined }
            </div>
            </>
        )
    }

    return (
        <Fragment>
                <div className="main_section" style={{width: "100%", minHeight: window.innerHeight, 
                backgroundColor: "#333333", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{backgroundColor: "#535353", height: 73, width: "100%", display: 'flex', justifyContent: "center"}}>
                        <div onClick={() => {
                            window.location.href = '/'
                        }} style={{width: "96%", 
                                    height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                            <img style={{minWidth: 20, width: '2.17%', marginRight: 10, marginTop: 3}} src={ComicIcon}></img>
                            <img style={{minWidth: 100, width: '9.76%'}} src={ComicLogo}></img>
                        </div>
                    </div>
                    <div style={{height: "100%", width: "96%"}}>
                        {!bookpageSignal && <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon style={{width: 60, height: 32.4}}/>
                            </div>
                                <InputBase onChange={(text) => {handleChange(text)}} placeholder="Search by book name" 
                                    classes={{ root: classes.inputRoot, input: classes.inputInput,}}
                                    inputProps={{ 'aria-label': 'search' }}/>
                        </div>}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex'}}>
                                {!bookpageSignal && <CategoryTabs changeTab={updateTabSelect}/>}
                            </div>
                            <div>
                                <Route onClick={() => {updateCurrentRoute('/')}} path={'/'} component={Search}/>
                                <Route onClick={() => {updateCurrentRoute('/year')}} path={'/year'} component={Year}/>
                                <Route onClick={() => {updateCurrentRoute('/writer')}} path='/writer' component>< Writer sorted={(sorted ? sorted : [])} /></Route>
                                <Route onClick={() => {updateCurrentRoute('/artist')}} path='/artist' component><Artist sorted={(sorted ? sorted : [])}/></Route>
                                <Route onClick={() => {updateCurrentRoute('/owner')}} path='/owner' component> <Owner sorted={(sorted ? sorted : [])}/></Route>
                                <Route onClick={() => {
                                    updateCurrentRoute('/random')
                                    }} path='/random' exact component><Random sorted={sorted} count={(comicsStore ? comicsStore.length -1 :25)} /> </Route >
                                <Route onClick={() => {updateCurrentRoute('/bookpage')}} path='/bookpage' component><BookPage name={bookPageRoute}/></Route>
                            </div>
                        </div>
                    </div>
                </div>
        </Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
        display: 'block',
        },
    },
    search: {
        display: 'flex',
        position: 'relative',
        borderStyle: 'solid',
        borderRadius: 8,
        borderWidth: 3,
        backgroundColor: fade('#333333', 0.15),
        '&:hover': {
        backgroundColor: fade('#333333', 0.25),
        },
        borderColor: '#777777',
        marginTop: 28,
        [theme.breakpoints.up('sm')]: {
        width: '99.6%',
        height: 54,
        marginBottom: 30,
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#777777',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%'
    },
    inputInput: {
        marginLeft: 56,
        color: '#777777',
        marginTop: -3,
        fontSize: '1.1rem',
        fontWeight: 'heavy',
    },
    }));