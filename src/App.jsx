import React, { Component } from "react"
import axios from "axios"
import search_Svg from './assets/search.svg'
import user_Svg from './assets/user.svg'
import setting_Svg from './assets/setting.svg'
import { setting } from './components/user/settings'
import Result from './components/pages/result'
import About from './components/pages/about'

export default class App extends Component {

    state = {
        text: '',
        about: true,
        tab: 'All',
        users: [],
        loading: false
    }

    render () {

        // shorten states variables
        const {text, about, tab, users, loading} = this.state

        // handle pages
        const handlePage = page => {
            if(tab === page) return

            this.setState({tab: page})
        }

        const handleText = async e => {
            this.setState({text: e.target.value})

            this.setState({loading: true})
            const result = await axios.get(`https://api.github.com/search/users?q=${e.target.value}`)
            this.setState({users: result.data.items, loading: false})
        }

        return (

            <div className="box">

                <div className="search">
                    <div className="search-icon">
                        <img src={search_Svg} alt="seacrh icon" />
                    </div>
                    <input type="text" placeholder="Type a name..." spellCheck="false" value={text} onChange={handleText} autoComplete="false" />
                    {
                        text !== '' &&
                        <div className="clear">
                            <a onClick={() => this.setState({text: ''})}>Clear</a>
                        </div>
                    }
                    {
                        text === ''
                    }
                </div>

                {
                    (text !== '' && loading!== true ) &&
                    
                    <div className="tabs">
                        <br />
                        {
                            tab === 'All' ? <a id="selected" onClick={() => handlePage('All')}>All <span>{users.length}</span></a> : <a onClick={() => handlePage('All')}>All <span>{users.length}</span></a>
                        }
                        {
                        about &&
                            <a id={tab === 'About' ? 'selected' : null} onClick={() => handlePage('About')}><strong><img src={user_Svg} alt="about icon" /></strong> About</a>
                        }
                        <div className="setting">
                            <div className="setting-icon">
                                <img src={setting_Svg} alt="setting icon" onClick={setting} id="setting-icon" />
                            </div>
                            <div className="menu close" id="setting-menu">
                                <a><img src={user_Svg} alt="about icon" /> About</a>
                                <label className="switch">
                                    <input type="checkbox" checked={about} onChange={(e) => this.setState({about: e.target.checked, tab: 'All'})} />
                                    <span className="slider round"></span>
                                </label>
                            </div>
                        </div>
                        <hr />
                    </div>
                }

                {
                    text !== '' &&
                    <div className="pages">
                        {
                            tab === 'All'
                            ? <Result loading={loading} users={users}/>
                            : <About /> 
                        }
                    </div>
                }
            </div>
        )

    }
}