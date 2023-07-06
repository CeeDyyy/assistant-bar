'use client'

import React, { useState, useEffect } from 'react'
import * as emoji from 'node-emoji'

export default function Home() {
  const [sentence, setSentence] = useState("smilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmile")
  const [word, setWord] = useState("smilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmilesmile")
  const [suggestedWords, setSuggestedWords] = useState([])
  const [chats, setChats] = useState([])

  useEffect(() => {
    fetch(`https://api.datamuse.com/sug?s=${word}`).then((response) => response.json()).then((result) => setSuggestedWords(result))
  }, [word])

  function handleTyping(value) {
    setSentence(value)
    const splitedSentence = value.split(" ");
    setWord(splitedSentence[splitedSentence.length - 1])
  }

  function selectSuggestion(selected) {
    setWord("")
    word.length ? setSentence(sentence.slice(0, -word.length) + selected + " ") : setSentence(sentence + selected + " ")
  }

  function handleSend(message) {
    setSentence("")
    setWord("")
    setChats([...chats, message])
  }

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="mx-auto mb-auto h-full w-[687px] bg-[url('https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80')]">
        <div className="flex flex-col h-full justify-between">

          {/* Fake Chat Area */}
          <div className="mb-auto flex gap-4 flex-col p-4">

            <div className="flex gap-4">
              <div className="rounded-full bg-gray-400 aspect-square h-10"></div>
              <div className="rounded bg-white p-4">
                Try to type something...
              </div>
            </div>

            {chats.map((chat, index) =>
              <div className="ml-auto flex gap-4" key={index}>
                <div className="rounded bg-white p-4">
                  {chat}
                </div>
                <div className="rounded-full bg-gray-400 aspect-square h-10"></div>
              </div>
            )}

          </div>

          {/* Typing Chat Area */}
          <div className="p-4 flex items-center gap-4">
            <textarea value={sentence} onChange={(e) => handleTyping(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend(sentence)} className="grow p-4 rounded" />
            <button onClick={() => handleSend(sentence)} className="h-full p-4 rounded bg-blue-600 group/send hover:bg-blue-400 duration-100">
              <div className="flex items-center gap-2 group-hover/send:scale-105 duration-100">
                <p className="text-white">Send</p>
                <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z" fill="white"></path> </g></svg>
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Assistant Bar */}
      <div className="grid grid-cols-3 divide-x-2 h-24 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1491002052546-bf38f186af56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1208&q=80')]">

        <div className="grid grid-rows-2 font-medium px-4">
          <div className="grid justify-items-center content-center overflow-x-auto">
            <p style={{ textShadow: '1px 1px 2px white' }}>{sentence}</p>
          </div>
          <div className="grid justify-items-center content-center overflow-x-auto">
            <p style={{ textShadow: '1px 1px 2px white' }}>{word}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 overflow-x-auto">
          {suggestedWords.map((suggestedWord, index) =>
            <div onClick={() => selectSuggestion(suggestedWord.word)} className="cursor-pointer py-1 px-4 text-white bg-gray-600 rounded-full" key={index}>
              {suggestedWord.word}
            </div>
          )}
        </div>

        <div className="flex items-center gap-8 p-4 overflow-x-auto">
          {emoji.search(word).map((emoji, index) =>
            <div onClick={() => selectSuggestion(emoji.emoji)} className="cursor-pointer text-3xl" key={index}>
              {emoji.emoji}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
