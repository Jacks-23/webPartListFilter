import * as React from "react";

import { cardsState } from "./cardsState";
import { cardsProps } from "./cardsProps";


import { SPHttpClient } from "@microsoft/sp-http";
import { templateSettings } from "lodash";
import Card from "./card";

    

export class Cards extends React.Component<cardsProps, cardsState> {
    constructor(props: cardsProps, state: cardsState) {
        super(props);
        this.state = {
            items: [],
            ready: false,
        };

    }


    public async componentDidMount() {
        const urlProjects = "/_api/Web/Lists/getbytitle('Projects')/Items?$select=Title,Id";
        const responseProjects = await this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}${urlProjects}`,
        SPHttpClient.configurations.v1);
        const dataProjects = await responseProjects.json();
        let projectData = dataProjects.value.map(u => [u.Id, u.Title]);

        const urlDocs = "/_api/Web/Lists/getbytitle('Project Documents')/Items?$select=Title,ProjectId";
        const responseDocs = await this.props.context.spHttpClient.get(`${this.props.context.pageContext.web.absoluteUrl}${urlDocs}`,
        SPHttpClient.configurations.v1);
        const dataDocs = await responseDocs.json();
        let docsData = dataDocs.value.map(u => [u.ProjectId, u.Title]);

        let arrSet = [];

        const filtreDocsId = (index, arrayInit, arrayFinal) => {
            arrayInit.forEach( e => {
                if(e[0] != index) return;
                
                arrayFinal.push(e[1]);
            });
            
            return arrayFinal;
        };

        for (let i = 0; i < projectData.length; i++) {
            let arrDocs=[];
            arrDocs = filtreDocsId(i+1,docsData, arrDocs );
            let objectProject = {
                Id: projectData[i][0],
                Title: projectData[i][1],
                Docs: arrDocs
            };
            arrSet.push(objectProject);
        }

        console.log(projectData);

        console.log(docsData);

        console.log(arrSet);

        this.setState({
            items: arrSet,
            ready: true,
            
        });      
        
    }


    
    public render(): React.ReactElement<cardsProps> {

        const {ready, items} = this.state;

        return (
            <div className="container">
                <Card state={items} />
            </div>
            
            
        );
    }
    
}