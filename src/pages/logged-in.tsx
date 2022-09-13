import Link from 'next/link'
import React, { useEffect } from 'react'
import useSWR from 'swr'
import Layout from '../components/Layout'
import { useCurrentUser } from '../context/CurrentUserContext'
import { fetcher } from '../utils/fetcherAPI'

const LoggedIn = () => {
    const { userName, userPassword, setUserToken, setUserNameLocal, token } = useCurrentUser()

    const { data, error } = useSWR(`/api/login?userName=${userName}&userPassword=${userPassword}`, fetcher)
    if (data) {
        setUserToken(data.access_token)
        setUserNameLocal(userName)
        localStorage.setItem('token', JSON.stringify(data.access_token))
        localStorage.setItem('username', JSON.stringify(userName))
    }

    useEffect(() => {
        if (token !== '') {
            window.location.href = '/'
        }
    }, [token])

    return (
        <Layout>
            <div className='flex flex-col w-auto h-min dark:bg-slate-500 p-4 rounded-lg text-center transition-all shadow-2xl drop-shadow-2xl'>
                {data ? (
                    <>
                        <p>Your In!!</p>
                        <Link href={`/users/${userName}`}>
                            <button className='dark:hover:text-white'>Visit Your Profile!</button>
                        </Link>
                    </>

                ) : error ? (
                    <Link href={'/login'}>
                        <button>Please Retry</button>
                    </Link>
                ) : 'Loading...'}

            </div>
        </Layout>
    )
}

export default LoggedIn