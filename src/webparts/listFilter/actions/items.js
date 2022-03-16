import { SPHttpClient } from "@microsoft/sp-http";

export async function fetchProjects(context)  {
    const urlProjects = "/_api/Web/Lists/getbytitle('Projects')/Items?$select=Title,Id";
    const responseProjects = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}${urlProjects}`,
    SPHttpClient.configurations.v1);
    return await responseProjects.json();
}

export async function fetchDocuments(context) {
    
    const urlDocs = "/_api/Web/Lists/getbytitle('Project Documents')/Items?$select=Title,ProjectId";
    const responseDocs = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}${urlDocs}`,
    SPHttpClient.configurations.v1);
    return await responseDocs.json(); 
}