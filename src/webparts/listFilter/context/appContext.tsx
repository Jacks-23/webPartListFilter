import * as React from "react";

const Context = React.createContext({context: null, appUrl:''});

export function AppProvider({children, context}) {

    return (
        <Context.Provider value={{context, appUrl : context.pageContext.web.absoluteUrl}}>
            {children}    
        </Context.Provider>
    );
}

const useAppContext = () => {
    return React.useContext(Context);
};

export default useAppContext;