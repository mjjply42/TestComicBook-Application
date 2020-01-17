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

const validSorts = ["year", "owner", "artist", "writer", "random", ""]

export default function MainSection() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const comicsStore = useSelector(state => state.navState.comics)
    const [comics, updateComics] = useState([])
    const [previousRoute, updatePreviousRoute] = useState("")
    const [currentRoute, updateCurrentRoute] = useState("")
    const [searched, updateSearched] = useState([])
    const [testSearch, updateTestSearch] = useState([
        {name: "Arthur"}, {name: "Artemis"}, {name: "Amiable"}, {name: "Bat"}, {name: "Battle"},
        {name: "Cat"}, {name: "Cattle"},
    ])
    const [sorted, updateSortSet] = useState([])
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
        console.log(comicsStore)
        updateComics(comicsStore)
        console.log("CUR ", currentKey)
        if (comicsStore.length > 0)
        {
            sortSetByKey(currentKey, comicsStore)
            updateCurrentRoute(getCurrentBookRoute())
        }
    }, [comicsStore])

    const getCurrentBookRoute = () => {
        if (!window.location.pathname.split("/").includes('bookpage'))
            return
        let comicName = window.location.href.split("/bookpage/")[1].split("?").join(" ")
        let comicItem = comicsStore.filter((item, index) => {
            return item.name === comicName
            }) 
        return comicItem 
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
            return
        if (key === "year")
        {
            arr = comicsStore.sort(function(a, b) {
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
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
            newYearArr[0].push(arr[0])
        }
        else if (source === "search")
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
        let aboutMatch = useRouteMatch()
        console.log("ITS YEAR")
        return (
            <div>
                <Switch>
                    {/*<Route path='/year/id'>
                        {sorted ? sorted.map((item, index) => {
                            return (
                                <AboutFull info={item}/>
                            )
                        }):undefined}
                    </Route>*/}
                    <Route render={ () => 
                            <YearGeneral />}/>
                </Switch>
            </div>
        )
    }

    const createUrlForBookPage = (item) => {
        console.log(item)
        let itemSplit = item.name.split(" ")
        let urlPath = itemSplit.join("?")
        let pathname = window.location.pathname.split("/")[1]
        updateBookPageRoute(`/${urlPath}`)
        return `${urlPath}`
    }

    const YearGeneral = () => {
        let year = 0
        return (<Fragment>
                {sorted.length > 0 &&
                sorted.map((item, index) => {
                    return (
                        <Fragment>
                            <h1 style={{textAlign: 'left', color: '#AAAAAA'}}>{item[0].year}</h1>
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={2}>
                            {item.map((it, index) => {
                                return (
                                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{}}>
                                        <Link onClick={() => {window.scrollTo(0)}} style={{ textDecoration: 'none' }} to={`/bookpage/Dog?Boy?#310}`} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
                                    <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                                    <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{it.name} </Typography>
                                    <div style={{display: 'flex', height: 100}}>
                                        <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                            <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                            <p style={{color: '#999999', marginRight: 3}}>By</p>
                                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{it.owner}</p>
                                        </Typography>
                                    </div>
                                    </Link>
                                    </Grid>
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
        //let comicItem = getCurrentBookRoute()
        //updateCurrentRoute('/bookpage')
        if (currentRoute)
            console.log(currentRoute)
        return (
            <div>
                <div style={{display: 'flex', marginTop: 40, flexDirection: 'row'}}>
                    <ChevronLeftIcon onClick={() => {history.goBack()}} style={{color: "#777777"}}/>
                    <Typography style={{color: '#777777'}} onClick={() => {history.goBack()}}>Back to collection</Typography>
                </div>
                {currentRoute &&
                <Fragment><div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 30, justifyContent: 'center'}}>
                    <img style={{minWidth: 300, minHeight: 200/*, width: 336, height: 517*/, width: "24.2%", height: 517}} src={BlankIcon}></img>
                    <div style={{marginLeft: 20, display: 'flex', flexDirection: 'column', width: "74%"}}>
                        <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center'}}>
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', maxWidth: '80%', minWidth: '50%'}}>
                            <Typography style={{fontSize: '2rem', color: '#AAAAAA'}}>{`${currentRoute[0].name} (${currentRoute[0].year})`}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', minWidth: '10%', marginTop: 5, marginLeft: 20}}>
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
                        <div style={{display: 'flex', flexDirection: 'column', minWidth: 300,}}>
                        <Typography style={{textAlign: 'left', display: 'flex', alignSelf: 'flex-start'}}>
                            <p style={{color: '#999999', marginRight: 3}}>Writer:</p>
                            <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{currentRoute[0].writer}</p>
                        </Typography>
                        <Typography style={{textAlign: 'left', display: 'flex', alignSelf: 'flex-start'}}>
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
                <div style={{display: 'flex', marginTop: 40, flexDirection: 'row'}}>
                    <Typography style={{fontSize: 32, color: '#AAAAAA'}}>Other Random Books</Typography>
                </div>
                <Random count={(comicsStore ? comicsStore.length -1 :25)}/>
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
        let result = comicsStore.filter((item, index) => {
            return !item.name.toLowerCase().indexOf(val.toLowerCase())
        })
        updateSearched(result)
        sortSetByKey(currentKey, result, "search")
    }

    const updateTabSelect = (item) => {
        console.log("HERE")
        sortSetByKey(item.path.split("/")[1])
    }

    return (
        <Fragment>
                <div className="main_section" style={{width: "100%", minHeight: window.innerHeight, 
                backgroundColor: "#333333", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{backgroundColor: "#535353", height: 73, width: "100%", display: 'flex', justifyContent: "center"}}>
                        <div style={{width: "96%", 
                                    height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                            <img style={{minWidth: 20, width: '2.17%', marginRight: 10, marginTop: 3}} src={ComicIcon}></img>
                            <img style={{minWidth: 100, width: '9.76%'}} src={ComicLogo}></img>
                        </div>
                    </div>
                    <div style={{height: "100%", width: "96%"}}>
                        { currentRoute !== "/bookpage" && <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon style={{width: 60, height: 32.4}}/>
                            </div>
                                <InputBase onChange={(text) => {handleChange(text)}} placeholder="Search by book name" 
                                    classes={{ root: classes.inputRoot, input: classes.inputInput,}}
                                    inputProps={{ 'aria-label': 'search' }}/>
                        </div>}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex'}}>
                                {currentRoute !== "/bookpage" && <CategoryTabs changeTab={updateTabSelect}/>}
                            </div>
                            <div>
                                <Route path={'/year' || '/'} exact component={Year}/>
                                <Route path='/writer' exact component>< Writer sorted={(sorted ? sorted : [])} /></Route>
                                <Route path='/artist' exact component><Artist sorted={(sorted ? sorted : [])}/></Route>
                                <Route path='/owner' exact component> <Owner sorted={(sorted ? sorted : [])}/></Route>
                                <Route path='/random' exact component><Random count={(comicsStore ? comicsStore.length -1 :25)} /> </Route >
                                <Route path='/bookpage' component><BookPage name={bookPageRoute}/></Route>
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
        fontSize: 20,
        fontWeight: 'heavy',
    },
    }));