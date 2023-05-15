import {createContext, ReactNode, useContext, useReducer} from "react";



interface InitialType{
    apiUrl:string
    page:string
}
interface DispatchType {
    type:string
    payload:InitialType
}
interface ContextType {
    state:InitialType,
    dispatch:(x:DispatchType)=>void
}
interface Props {
    children:ReactNode
}
const initial={
    apiUrl:'',
    page:'startForm'
}
const reducer = function(state:InitialType,action:DispatchType):InitialType{
    switch (action.type) {
        case 'submitForm':
            return {
                ...state,
                page:'questionPage',
                apiUrl:action.payload.apiUrl
            }
        default:
            return state
    }
}

const questionContext = createContext< ContextType | null>(null)
export const useQuestion =()=>useContext(questionContext)
export const QuestionProvider = ({children}:Props) => {
    const [state,dispatch] = useReducer(reducer,initial,undefined)
    return (
        <questionContext.Provider value={{state,dispatch}}>
            {children}
        </questionContext.Provider>
    );
};

