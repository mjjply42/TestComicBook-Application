import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createBrowserHistory } from 'history';
import { CategoryTabs } from './CategoryTabs'
import ComicLogo from '../img/ComicClan.png'
import ComicIcon from '../img/IconShape.png'
import BlankIcon from '../img/Rectangle.png'

export default function MainSection() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const comicsStore = useSelector(state => state.navState.comics)
    const [comics, updateComics] = useState([])
    const [previousRoute, updatePreviousRoute] = useState("")
    const [obj, updateObjs] = useState([
        {id: 1, name: "Berf"}, {id: 17, name: "Curd"}, {id: 0, name: "Turc"}, {id: 2, name: "Eli"},
    ])
    const [searched, updateSearched] = useState([])
    const [testSearch, updateTestSearch] = useState([
        {name: "Arthur"}, {name: "Artemis"}, {name: "Amiable"}, {name: "Bat"}, {name: "Battle"},
        {name: "Cat"}, {name: "Cattle"},
    ])
    const [sorted, updateSortSet] = useState([])
    const [currentKey, updateCurrentKey] = useState()
    let routeSource = useRouteMatch()
    const history = createBrowserHistory()


    useEffect(() => {
        dispatch({type: 'update-comics-saga-pusher'})
        updatePreviousRoute(window.location.href)
        updateCurrentKey(window.location.pathname.split("/")[1])
    }, [])


    useEffect(() => {
        console.log(comicsStore)
        updateComics(comicsStore)
        if (comicsStore.length > 0)
            sortSetByKey(currentKey)
    }, [comicsStore])

    useEffect(() => {
    }, [routeSource])

    const sortSetByKey  = async (key) => {
        let arr = []
        if (!comicsStore.length > 0)
            return
        if (key === "year")
        {
            arr = comicsStore.sort(function(a, b) {
                return a[key.trim()] - b[key.trim()];
            })
        }
        else
        {
            console.log("KEY2,", key)
            arr = JSON.parse(JSON.stringify(comicsStore.sort(await dynamicSort(key))))
            console.log("ARR ", arr)
        }
        console.log("SORTED ", arr)
        updateSortSet(arr)
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
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                            <YearGeneral />
                        </div>
                    )}}/>
                </Switch>
            </div>
        )
    }

    const YearGeneral = () => {
        console.log("Here at year")
        return (<Fragment>
                {sorted.length > 0 &&
                sorted.map((item, index) => {
                    return (
                        <div style={{margin: 10}}>
                            <img style={{minWidth: 100, width: '30%'}} src={BlankIcon}></img>
                            <h2 style={{marginTop: 0}}>{item.year}</h2>
                        </div>
                    )
                })}
            </Fragment>
                )
    }

    const Writer = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 87}}>
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
                        <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                        <Typography style={{color: '#CCCCCC', textAlign: 'left', marginLeft: 10, fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                        <div style={{display: 'flex', height: 100}}>
                            <Typography style={{textAlign: 'left',marginLeft: 10, fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                <p style={{color: '#999999', marginRight: 3}}>Owned</p>
                                <p style={{color: '#999999', marginRight: 3}}>By</p>
                                <p style={{color: '#CCCCCC', fontWeight: 'bold'}}>{item.writer}</p>
                                </Typography>
                        </div>
                    </Grid>
                )
            })}
        </Fragment>)
    }

    const Artist = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 87}}>
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
                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{bakcgroundColor: 'orange', marginRight: 10}}>
                        <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                        <Typography style={{textAlign: 'left', fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                        <div style={{display: 'flex', height: 100}}>
                            <Typography style={{textAlign: 'left', fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                <p style={{marginRight: 3}}>Owned</p>
                                <p style={{marginRight: 3}}>By</p>
                                <p style={{fontWeight: 'bold'}}>{item.artist}</p>
                                </Typography>
                        </div>
                    </Grid>
                )
            })}
        </Fragment>)
    }

    const Owner = () => {
        let aboutMatch = useRouteMatch()
        return (
            <div style={{marginTop: 87}}>
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
                    <Grid item xs={5} sm={4} md={3} lg={2} xl={1} style={{bakcgroundColor: 'orange', marginRight: 10}}>
                        <img style={{minWidth: 100, height: 300}} src={BlankIcon}></img>
                        <Typography style={{textAlign: 'left', fontSize: 22, display: 'flex', alignSelf: 'flex-start', marginTop: 0}}>{item.name} </Typography>
                        <div style={{display: 'flex', height: 100}}>
                            <Typography style={{textAlign: 'left', fontSize: 16, display: 'flex', alignSelf: 'flex-start', marginTop: 0, marginRight: 4}}>
                                <p style={{marginRight: 3}}>Owned</p>
                                <p style={{marginRight: 3}}>By</p>
                                <p style={{fontWeight: 'bold'}}>{item.owner}</p>
                                </Typography>
                        </div>
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
        sortSetByKey(item.path.split("/")[1])
        //history.push(item.path)
    }

    return (
        <Fragment>
                <div className="main_section" style={{width: "100%", minHeight: 1500, 
                backgroundColor: "#333333", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <div style={{backgroundColor: "#535353", height: 73, width: "100%", display: 'flex', justifyContent: "center"}}>
                        <div style={{width: "96%", 
                                    height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start"}}>
                            <img style={{minWidth: 20, width: '2.17%', marginRight: 10, marginTop: 3}} src={ComicIcon}></img>
                            <img style={{minWidth: 100, width: '9.76%'}} src={ComicLogo}></img>
                        </div>
                    </div>
                    <div style={{height: "100%", width: "96%"}}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon style={{width: 60, height: 32.4}}/>
                            </div>
                                <InputBase onChange={(text) => {handleChange(text)}} placeholder="Search by book name" 
                                    classes={{ root: classes.inputRoot, input: classes.inputInput,}}
                                    inputProps={{ 'aria-label': 'search' }}/>
                        </div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <div style={{display: 'flex'}}>
                                <CategoryTabs changeTab={updateTabSelect}/>
                            </div>
                            <div>
                                <Route path={'/year' || '/'} exact component={Year}/>
                                <Route path='/writer' exact component={Writer}/>
                                <Route path='/artist' exact component={Artist}/>
                                <Route path='/owner' exact component={Owner}/>
                                <Route path='/random' exact component={Random}/>
                                {searched ? searched.map((item, index) => {
                                    return (
                                        <div style={{display: "inline-block", margin: 10}}>
                                            <h1 style={{marginTop: 0}}>{item.name}</h1>
                                            <h2 style={{marginTop: 0}}>{item.name}</h2>
                                        </div>
                                    )
                                }): undefined }
                                <button onClick={() => {dispatch({type: 'update-saga-pusher'})}}>Comics</button>
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