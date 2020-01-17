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

const validSorts = ["year", "owner", "artist", "writer", "random"]

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
            sortSetByKey(currentKey)
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

    const sortSetByKey  = async (key) => {
        let arr = []
        let newYearArr = []
        let year = 0
        let index = 0
        if (!comicsStore.length > 0)
            return
        if (!validSorts.includes(key))
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
        else
        {
            arr = JSON.parse(JSON.stringify(comicsStore.sort(await dynamicSort(key))))
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
                    <Route render={ () => {
                    return( 
                        <div style={{marginTop: 30}}>
                            <YearGeneral />
                        </div>
                    )}}/>
                </Switch>
            </div>
        )
    }

    const createUrlForBookPage = (item) => {
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
                            <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                            {item.map((it, index) => {
                                return (
                                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{}}>
                                        <Link onClick={() => {window.scrollTo(0)}} style={{ textDecoration: 'none' }} to={`/bookpage/${createUrlForBookPage(it)}`} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
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
                        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: "60%"}}>
                            <Typography style={{fontSize: '2rem', color: '#AAAAAA'}}>{`${currentRoute[0].name} (${currentRoute[0].year})`}</Typography>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '40%', marginTop: 5}}>
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
                        <Typography style={{color: '#CCCCCC', textAlign: 'left'}}>{currentRoute[0].summary}</Typography>
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
            </div>
        )
    }

    const Writer = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 99}}>
                <Switch>
                    <Route render={ () => {
                    return( 
                        <Grid container spacing={3}
                        direction="row"
                        justify="space-around"
                        alignItem="center">
                            <WriterGeneral />
                        </Grid>
                    )}}/>
                </Switch>
            </div>
        )
    }

    const WriterGeneral = () => {
        console.log("Here at writer")
        return (<Fragment>
            {sorted.length > 0 &&
            sorted.map((item, index) => {
                return (
                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{}}>
                        <Link onClick={() => {window.scrollTo(0)}} style={{ textDecoration: 'none' }} to={`/bookpage/${createUrlForBookPage(item)}`} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
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
        </Fragment>)
    }

    const Artist = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 99}}>
                <Switch>
                    <Route render={ () => {
                    return( 
                        <Grid container spacing={3}
                        direction="row"
                        justify="space-around"
                        alignItem="center">
                            <ArtistGeneral />
                        </Grid>
                    )}}/>
                </Switch>
            </div>
        )
    }

    const ArtistGeneral = () => {
        let aboutMatch = useRouteMatch()
        console.log("Here at artist")
        return (<Fragment>
            {sorted.length > 0 &&
            sorted.map((item, index) => {
                return (
                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{}}>
                        <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                        <Link onClick={() => {window.scrollTo(0)}} style={{ textDecoration: 'none' }} to={`/bookpage/${createUrlForBookPage(item)}`} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
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
        </Fragment>)
    }

    const Owner = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 99}}>
                <Switch>
                    {/*<Route path='/year/id'>
                        {sorted ? sorted.map((item, index) => {
                            return (
                                <AboutFull info={item}/>
                            )
                        }):undefined}
                    </Route>*/}
                    <Route render={ () => {
                    return( 
                        <Grid container spacing={3}
                        direction="row"
                        justify="space-around"
                        alignItem="center">
                            <OwnerGeneral />
                        </Grid>
                    )}}/>
                </Switch>
            </div>
        )
    }

    const OwnerGeneral = () => {
        console.log("Here at owner")
        return (<Fragment>
            {sorted.length > 0 &&
            sorted.map((item, index) => {
                return (
                    <Grid item xs={6} sm={4} md={3} lg={2} xl={1} style={{}}>
                        <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                        <Link onClick={() => {window.scrollTo(0)}} style={{ textDecoration: 'none' }} to={`/bookpage/${createUrlForBookPage(item)}`} onClick={() => {/*updatePreviousRoute(window.location.href)*/}}>
                        <Typography noWrap={false} style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                        <div style={{display: 'flex', height: 100, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
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
        </Fragment>)
    }

    const Random = () => {
        console.log("Here at random")
        let otherMatch = useRouteMatch()
        console.log(otherMatch)
        return (
            <div>
                <h1 style={{marginTop: 0}}>Hello From Other</h1>
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

        updateSearched(testSearch.filter((item, index) => {
            return !item.name.toLowerCase().indexOf(val.toLowerCase())
        }))
    
    }

    const updateTabSelect = (item) => {
        console.log("HERE")
        sortSetByKey(item.path.split("/")[1])
    }

    return (
        <Fragment>
                <div className="main_section" style={{width: "100%", minHeight: window.innerWidth, 
                backgroundColor: "#333333", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{backgroundColor: "#535353", height: 73, width: "100%", display: 'flex', justifyContent: "center"}}>
                        <div style={{width: "96%", 
                                    height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                            <img style={{minWidth: 20, width: '2.17%', marginRight: 10, marginTop: 3}} src={ComicIcon}></img>
                            <img style={{minWidth: 100, width: '9.76%'}} src={ComicLogo}></img>
                        </div>
                    </div>
                    <div style={{height: "100%", width: "96%"}}>
                        { currentRoute === "/bookpage" && <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon style={{width: 60, height: 32.4}}/>
                            </div>
                                <InputBase onChange={(text) => {handleChange(text)}} placeholder="Search by book name" 
                                    classes={{ root: classes.inputRoot, input: classes.inputInput,}}
                                    inputProps={{ 'aria-label': 'search' }}/>
                        </div>}
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex'}}>
                                {currentRoute === "/bookpage" && <CategoryTabs changeTab={updateTabSelect}/>}
                            </div>
                            <div>
                                <Route path={'/year' || '/'} exact component={Year}/>
                                <Route path='/writer' exact component={Writer}/>
                                <Route path='/artist' exact component={Artist}/>
                                <Route path='/owner' exact component={Owner}/>
                                <Route path='/random' exact component={Random}/>
                                <Route path='/bookpage' component><BookPage name={bookPageRoute}/></Route>
                                {searched ? searched.map((item, index) => {
                                    return (
                                        <div style={{display: "inline-block", margin: 10}}>
                                            <h1 style={{marginTop: 0}}>{item.name}</h1>
                                            <h2 style={{marginTop: 0}}>{item.name}</h2>
                                        </div>
                                    )
                                }): undefined }
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