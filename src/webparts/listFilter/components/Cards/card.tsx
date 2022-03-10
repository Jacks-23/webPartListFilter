import * as React from "react";
import {useState} from "react";

const Card = ({state}) => {

     //the value of the search field :

     const [title, setTitle] = React.useState("");

     // the search result

     const [foundCards, setFoundCards] = React.useState(state);

     const filtered = (e) => {
         const keyword = e.target.value;
         if (keyword !== '') {
             const results = state.filter((card) => {
             return card.Title.toLowerCase().startsWith(keyword.toLowerCase());

             });
             setFoundCards(results);
         } else {
             setFoundCards(state);
         }

         setTitle(keyword);
     };

    return (  
        <div className="container">
                <div className="flex justify-center mb-3">
                    <input className="filterBar" value={state.Title} onChange={filtered} placeholder="filter"/>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    {foundCards && foundCards.length > 0 ? (
                        foundCards.map((card) => (
                            <div className="container">
                                <div className="w-full md:w-1/2 lg: my-4 lg:px-4 lg:w-1/3">
                                        <div id="cardBlock" className={` md:shrink-0 md:mr-10 block rounded-lg shadow-lg`}>
                                            <div className="px-6 py-4">
                                            <img className="w-10" src="https://picsum.photos/200" alt="Sunset in the mountains"/>
                                                <div className="font-bold text-xl mb-2">{card.Title}</div>
                                                <ul className="list-disc">
                                                    {card.Docs.map((doc) =>
                                                        <li>{doc} </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className="px-6 pt-4 pb-2">
                                                <button type="button" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out">Success</button>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        )))
                        : (
                            <div className="container">
                                <h1>No results found</h1>
                                <p>{state.length}</p>
                                </div>
                            
                        )
                    }
                </div>
            </div>
    );
};
 
export default Card;