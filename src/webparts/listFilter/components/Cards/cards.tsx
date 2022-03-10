import * as React from "react";

import { cardsState } from "./cardsState";
import { cardsProps } from "./cardsProps";

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import { iteratee } from "lodash";
import { DocumentCard, DocumentCardDetails, DocumentCardTitle } from "office-ui-fabric-react/lib/DocumentCard";

    

export class Cards extends React.Component<cardsProps, cardsState> {
    constructor(props: cardsProps, state: cardsState) {
        super(props);
        this.state = {
            items: [],
            docs:[],
            ready: false,
        };
    }

    
    public getItems() {
        const url = "/_api/Web/Lists/getbytitle('Projects')/Items?$select=Title,Id";
        this.props.context.spHttpClient
            .get(
                `${this.props.context.pageContext.web.absoluteUrl}${url}`,
                SPHttpClient.configurations.v1
            )
            .then(
                (response: SPHttpClientResponse): Promise<{ value: any[] }> => {
                    return response.json();
                }
            )
            .then((response: { value: any[] }) => {
                let _items = [];
                _items = _items.concat(response.value);
                this.setState({
                    items: _items,
                    ready: false
                });
            });
           
            
    }
    
    public getDocuments() {
        this.props.context.spHttpClient
            .get(
                `${this.props.context.pageContext.web.absoluteUrl}/_api/Web/Lists/getbytitle('Project Documents')/Items?$select=Title,ProjectId`,
                SPHttpClient.configurations.v1
            )
            .then(
                (response2: SPHttpClientResponse): Promise<{ value: any[] }> => {
                    return response2.json();
                }
            )
            .then((response2: { value: any[] }) => {
                let _documents = [];
                _documents = _documents.concat(response2.value);
                 let newItems = this.state.items.map(item => {
                    return {...item, documents : _documents.filter(document => document.ProjectId === item.Id)
                    }
                })
                console.log(newItems)
                this.setState({
                    docs:_documents,
                    items : newItems,
                    ready: true
                });
            });
    }

    public componentDidMount(): void {
        this.getItems();
        this.getDocuments();
        
    }


    
    public render(): React.ReactElement<cardsProps> {

        const {ready, items, docs} = this.state;
        return (
            <div className="container">
                { ready ? (
                    <>
                    {items.map((item, key) =>
                        <div className="container">
                            {item.Title}
                            {item.documents.map((a) => <p> {a.Title} </p>)}
                        </div>
                    )}
                    </>
                ) : <></>}

            </div>
        );
        
    }

    
}