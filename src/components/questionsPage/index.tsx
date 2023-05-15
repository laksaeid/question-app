import {useQuestion} from "@/context";
import {useEffect, useState} from "react";
import axios from "axios";

const QuestionPage = () => {
    const { state } = useQuestion();
    const [questions,setQuestions]= useState([])
    console.log(questions)
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
         axios(state.apiUrl).then((res) => {
           console.log(res);
           setQuestions(res.data.results)
           setLoading(false)
         });
    },[])
    return <div>{loading ? <p>loading...</p> : <>
        {questions?.map(q=>{
            return(<>
            <p>{q.question}</p>
            </>)
        })}

    </>}</div>;
};

export default QuestionPage;