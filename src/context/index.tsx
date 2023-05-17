import {createContext, ReactNode, useContext, useReducer} from "react";



interface InitialType{
    apiUrl:string
    page:string
    questionNumber:number
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
    page:'startForm',
    questionNumber:0

}
const reducer = function(state:InitialType,action:DispatchType):InitialType{
    switch (action.type) {
        case 'submitForm':
            return {
                ...state,
                page:'questionPage',
                apiUrl:action.payload.apiUrl
            }
            case 'questionNumber':
            return {
                ...state,
                questionNumber:state.questionNumber+1
            }
            case 'reset':
            return initial
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

