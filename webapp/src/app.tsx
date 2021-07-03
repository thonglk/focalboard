// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React, {useState, useEffect} from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch,
} from 'react-router-dom'

import {FlashMessages} from './components/flashMessages'
import {getCurrentLanguage, storeLanguage} from './i18n'
import {default as client} from './octoClient'
import BoardPage from './pages/boardPage'
import ChangePasswordPage from './pages/changePasswordPage'
import ErrorPage from './pages/errorPage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import {IUser} from './user'
import {Utils} from './utils'
import CombinedProviders from './combinedProviders'
import {importNativeAppSettings} from './nativeApp'

const App = React.memo((): JSX.Element => {
    importNativeAppSettings()

    const [language, setLanguage] = useState(getCurrentLanguage())
    const [user, setUser] = useState<IUser|undefined>(undefined)
    const [initialLoad, setInitialLoad] = useState(false)

    useEffect(() => {
        client.getMe().then((loadedUser?: IUser) => {
            setUser(loadedUser)
            setInitialLoad(true)
            if (loadedUser?.auth_data) {
                localStorage.setItem('workspaceId', loadedUser.auth_data)
            }
        })
    }, [])

    const setAndStoreLanguage = (lang: string): void => {
        storeLanguage(lang)
        setLanguage(lang)
    }

    return (
        <CombinedProviders
            language={language}
            user={user}
            setLanguage={setAndStoreLanguage}
        >
            <FlashMessages milliseconds={2000}/>
            <Router
                forceRefresh={true}
                basename={Utils.getBaseURL()}
            >
                <div id='frame'>
                    <div id='main'>
                        <Switch>
                            <Route path='/error'>
                                <ErrorPage/>
                            </Route>
                            <Route path='/login'>
                                <LoginPage/>
                            </Route>
                            <Route path='/register'>
                                <RegisterPage/>
                            </Route>
                            <Route path='/change_password'>
                                <ChangePasswordPage/>
                            </Route>
                            <Route path='/shared'>
                                <BoardPage readonly={true}/>
                            </Route>
                            <Route path='/board'>
                                {initialLoad && !user && <Redirect to='/login'/>}
                                <BoardPage/>
                            </Route>
                            <Route path='/:workspaceId/shared'>
                                <BoardPage readonly={true}/>
                            </Route>
                            <Route
                                path='/:workspaceId/'
                                render={({match}) => {
                                    if (initialLoad && !user) {
                                        let redirectUrl = '/' + Utils.buildURL(`/${match.params.workspaceId}/`)
                                        if (redirectUrl.indexOf('//') === 0) {
                                            redirectUrl = redirectUrl.slice(1)
                                        }
                                        const loginUrl = `/login?r=${encodeURIComponent(redirectUrl)}`
                                        return <Redirect to={loginUrl}/>
                                    }
                                    return (
                                        <BoardPage/>
                                    )
                                }}
                            />
                            <Route
                                path='/'
                                render={() => {
                                    if (initialLoad && !user) {
                                        window.location.href = 'https://get.hyper.vin'
                                        return null
                                    } else if (user) {
                                        Utils.log(`user: ${user.auth_data}`)

                                        const workspaceUrl = `/${encodeURIComponent(user.auth_data)}`
                                        return (<Redirect to={workspaceUrl}/>)
                                    }
                                    return null
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </CombinedProviders>
    )
})

export default App
