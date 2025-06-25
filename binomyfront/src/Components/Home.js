import React from 'react'
import Header from './Header'
import ChatBott from './ChatBott'

function Home({user}) {
 
  return (
    <div>
        <Header/>
        <ChatBott/>
    </div>
  )
}

export default Home