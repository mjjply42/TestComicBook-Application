import React, { Fragment, useState, useEffect } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Route, Link, useRouteMatch, useParams, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CategoryTabs } from './CategoryTabs'
import ComicLogo from '../img/ComicClan.png'
import ComicIcon from '../img/IconShape.png'

export default function MainSection() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const comicsStore = useSelector(state => state.navState.comics)
    const [previousRoute, updatePreviousRoute] = useState("")
    const [obj, updateObjs] = useState([
        {id: 1, name: "Berf"}, {id: 17, name: "Curd"}, {id: 0, name: "Turc"}, {id: 2, name: "Eli"},
    ])
    const [searched, updateSearched] = useState([])
    const [testSearch, updateTestSearch] = useState([
        {name: "Arthur"}, {name: "Artemis"}, {name: "Amiable"}, {name: "Bat"}, {name: "Battle"},
        {name: "Cat"}, {name: "Cattle"},
    ])
    const [sorted, updateSortSet] = useState()
    let routeSource = useRouteMatch()


    useEffect(() => {
        updatePreviousRoute(window.location.href)
    }, [])

    useEffect(() => {
            console.log("COMIC STORE: ", comicsStore)
    }, [comicsStore])

    useEffect(() => {
        sortSetByKey("id")
    }, [])

    const sortSetByKey = (key) => {
        let arr = obj.sort(function(a, b) {
            return a[key] - b[key];
        })
        updateSortSet(arr)
    }

    const Main = () => {
        let mainMatch = useRouteMatch()
        console.log(mainMatch)
        return (
            <div>
                <h1 style={{marginTop: 0}}>Hello From Home</h1>
            </div>
        )
    }

    const About = () => {
        let aboutMatch = useRouteMatch()
        console.log(aboutMatch)
        return (
            <div>
                <Switch>
                    <Route path='/about/id'>
                        {sorted ? sorted.map((item, index) => {
                            return (
                                <AboutFull info={item}/>
                            )
                        }):undefined}
                    </Route>
                    <Route render={ () => obj.map((item, index) => {
                        return (<AboutEmpty/>)
                    })}/>
                </Switch>
            </div>
        )
    }

    const  AboutFull = (props) => {
        return (
            <Fragment>
            <div style={{display: "inline-block", margin: 10, width: 70, height: 100, backgroundColor: "orange"}}>
                <h1 style={{marginTop: 0}}>{props.info.id}</h1>
                <h1 style={{marginTop: 0}}>{props.info.name}</h1>
            </div>
            <div style={{display: "inline-block", margin: 10, width: 70, height: 100, backgroundColor: "pink"}}>
            <h1 style={{marginTop: 0}}>{props.info.id}</h1>
            <h1 style={{marginTop: 0}}>{props.info.name}</h1>
        </div>
        <Route path={`/about/id/${props.info.id}`}>
            <AboutItem info={props.info}/>
        </Route>
        </Fragment>
        )
    }

    const AboutItem = (props) => {
        return (
            <div>
                <p style={{color: "yellow"}}>{props.info.name}</p>
            </div>
        )
    }

    const AboutEmpty = () => {
        return (<div style={{display: "inline-block", margin: 10}}>
                    <h1 style={{marginTop: 0}}>fdf</h1>
                    <h2 style={{marginTop: 0}}>1</h2>
                </div>
                )
    }

    const Other = () => {
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
        console.log(item)
    }

    return (
        <Fragment>
                <div className="main_section" style={{width: "100%", height: 1300, 
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
                                <Route path={'/'} exact component={Main}/>
                                <Route path='/about' component={About}/>
                                <Route path='/other' exact component={Other}/>
                                <button><Link to="/" onClick={() => {updatePreviousRoute(window.location.href)}}>Home</Link></button>
                                <button><Link to="/about" onClick={() => {updatePreviousRoute(window.location.href)}}>About</Link></button>
                                <button><Link to="/other" onClick={() => {updatePreviousRoute(window.location.href)}}>Other</Link></button>
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