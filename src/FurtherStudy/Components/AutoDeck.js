import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import "../stylesheets/Deck.css"

import { v4 as uuid } from "uuid";
import Card from './Card';

const Deck = () => {
    const [deckData, setDeckData] = useState(null);
    const [deck, setDeck] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const remaining = useRef(52);

    const BASEURL = "https://deckofcardsapi.com/api/deck/"
    
    // start with a deck
    useEffect(() => {
        async function startingDeck() {
            try{
                const res = await axios.get(`${BASEURL}new/shuffle/?deck_count=1`);
                console.log("startingDeck()", res.data.deck_id);
                setDeckData(res.data);
            }catch{
                console.log("Loading deckId...");
            }
        }
        startingDeck();
        
        // console.log("Deck Data", deckData.deck_id);
    }, []);

    const rotateCard = () => {
        const deg = Math.random()* 360;
        return `rotate(${deg}deg)`;
    }

    async function addCard() {
        try{
            if(remaining.current == 0){
                alert("Error: no more cards remaining!");
                return;
            }
            const res = await axios.get(`${BASEURL}${deckData.deck_id}/draw/?count=1`);
            let card = {...res.data.cards[0], id: uuid(), angle: rotateCard()};
            remaining.current = res.data.remaining;
            setDeck([ ...deck, card]);

        }catch {
            console.log("Oops, something happened inside addCard()");
        }
    }

    async function shuffleDeck() {
        try{
            setIsShuffling(true);
            const res = await axios.get(`${BASEURL}new/shuffle/?deck_count=1`);
            setDeckData(res.data);
            setDeck([]);
            remaining.current = 52;
        } catch{
            console.log("Something went wrong while shuffling the deck...");
        } finally {
            setIsShuffling(false);
        }
    }

    return (
        <div className='Deck'>
            <h1 className='Deck-header'>Automatic Deck of Cards</h1>
            <div>
                <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle</button>
                <button onClick={addCard} disabled={isShuffling}>Gimme a card!</button>
            </div>
            <p className='Deck-remainingcards'>Remaining cards: {remaining.current}</p>
            <div className='Deck-area'>
                {deck.map(({ id, code, image, angle }) => (<Card key={id} code={code} image={image} angle={angle} />))}
            </div>
        </div>
    )
}

export default Deck