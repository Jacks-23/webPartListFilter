import * as React from "react";
import Card from "./card";
import { useState } from "react";
import { useEffect } from "react";
import {fetchProjects, fetchDocuments} from '../../actions/items';
import useAppContext from "../../context/appContext";
import {Icon} from '@fluentui/react/lib/Icon'

const Cards = () =>  {
    const [items, setItems] = useState([]);
    const [ready, setIsReady] = useState(false);
    const [search, setSearch] = useState('');
    const {context} = useAppContext();
    useEffect(() => {
        fetchProjects(context).then((response) => {
            const projects = response.value;
            fetchDocuments(context).then((response) =>  {
                const documents = response.value;

            setItems(projects.map(project => {
                return {
                    Id: project.Id,
                    Title: project.Title,
                    Docs: documents.filter(document => document.ProjectId=== project.Id)
                };
            }));
            });
        });
    }, []);

    useEffect(() => {
        if(!(ready === true) && items.length > 0 ) {
            console.log('set ready to true');
            console.log(items);
            setIsReady(true);
        }
    }, [items]);
    const filtered = search.length === 0 ? items :
    items.filter(item => item.Title.toLowerCase().startsWith(search.toLowerCase()));
    const searchIcon = () => <Icon iconName="Search"></Icon>

    

    return (
        <>
            {ready ? (
                <>
                    <div className="flex justify-center mb-3 border-double border-4 border-indigo-600">
                            <input className="filterBar" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="filter"/>
                            <Icon iconName="Search"></Icon>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        {filtered.length > 0 ? filtered.map((item,index) => (
                            <>
                                <Card item={item} key={index} />
                            </>
                        ))
                        :
                            <div className="container">
                                <h1>No results found</h1>
                            </div>
                        }
                    </div>
                </>
            ) : (
                <span>Loading</span>
            )
        }
        </>
    );    
};

export default Cards;