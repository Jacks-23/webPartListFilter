import * as React from "react";


const Card = ({item}) => {

    return (
        <>
        <div className="w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            <div id="cardBlock" className="w-52 h-52 md:shrink-0 md:mr-10 block rounded-lg shadow-lg">
                <div className="w-full h-full px-3 py-3">
                    <div className="flex flex-nowrap gap-3 pb-4">
                        <img className="w-10" src="https://picsum.photos/200" alt="Sunset in the mountains"/>
                        <div className="font-bold text-l break-words self-center ">{item.Title}</div>
                    </div>
                    
                    {item.Docs.length > 3 ? 
                        <div className="break-words overflow-y-auto scrollbar">
                            <ul className="list-disc list-inside h-32 w-40 text-left">
                                {item.Docs.map((doc, index) =>
                                    <li className="text-sm" key={index}><a href={`https://m365x33077487.sharepoint.com/SitePages/${doc.Title}.aspx`}> {doc.Title} </a></li>
                                    
                                )}
                            </ul>
                        </div>
                        
                    : 
                        <>
                        <ul className="list-disc h-5">
                            {item.Docs.map((doc, index) =>
                                <li className="flex items-center" key={index}><a href={`https://m365x33077487.sharepoint.com/SitePages/${doc.Title}.aspx`}> {doc.Title} </a></li>
                            )}
                        </ul>
                        </>
                    }
                </div>
            </div>
        </div>
        </>
                
    );
};
 
export default Card;

