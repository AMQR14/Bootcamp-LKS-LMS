import { useNavigate, useParams } from "react-router-dom"
import TeacherDashboardLayout from "../../layouts/TeacherDashboardLayout"
import { Edit, Edit2, MoveLeft, Plus, Save, Trash, X } from "lucide-react"
import {Link, useBlocker} from 'react-router-dom' 
import { useEffect, useState } from "react"
import api from '../../lib/api'
import ModelBox from "../../components/ModelBox"

export default function TeacherExamQuestion(){
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(false)
    const {courseid, examid} = useParams()
    const [examName, setExamName] = useState('')
    const [exam, setExam] = useState([])
    const [error, setError] = useState({})
    const [checked, setChecked] = useState('mul-choice')
    const navigate = useNavigate();
    const [opened, setOpened] = useState(false)
    const [edited, setEdited] = useState(false)
    const [questionid, setQuestionid] = useState('')
    const [form, setForm] = useState({
        question: '',
        exam_id: ''
    })
    const [formMul, setFormMul] = useState({
        choice_text: ['', '', '', ''], 
        is_correct: 0,              
        exam_id: '',
        question_id: ''
    })
    const [formMulEdit, setFormMulEdit] = useState({
        choice_text: ['', '', '', ''], 
        is_correct: 0,              
        exam_id: '',
        question_id: ''
    })
    const [mult, setMult] = useState([])
    const [checkedEdit, setCheckedEdit] = useState('')
    const [saving, setSaving] = useState(false)
    const [value, setValue] = useState(1)
    const [valueMul, setValueMul] = useState(1)
    const [currentValue, setCurrentValue] = useState()
    const [clientQuestion, setClientQuestion] = useState([])


    async function postPoints(e) {
        e.preventDefault()
        setLoading(true)
        try{
            if(allCurrentPoints == 100){
                await api.put(`/exams/${examid}`, {
                    name: exam.name,
                    start_time: exam.start_time,
                    end_time: exam.start_time,
                    course_id:courseid, 
                    essays_points: value,
                    multiple_choices_points: valueMul,
                })

                setError([])

                fetchQuestion()
            }else{
                setError(['The Current must be 100'])
            }

        }finally{
            setLoading(false)
        }
    }
    
    const open = () => {
        setOpened(!opened)
    }


    async function fetchQuestion() {
        setLoading(true)
        try{
            const res = await api.get(`/exams/${examid}`)
            setExam(res.data.exam)
            setExamName(res.data.exam.name)
            setQuestions(res.data.exam.question)
            setValue(res.data.exam.essays_points)        
            setValueMul(res.data.exam.multiple_choices_points)  

            setClientQuestion(res.data.exam.question)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchQuestion()
    }, [])

    const handleChange = (e) =>{
        setChecked(e.target.value)
    }

    const handleChoiceChange = (index, value) => {
        const updated = [...formMul.choice_text]
        updated[index] = value
        setFormMul({...formMul, choice_text: updated})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError({});
        setLoading(true);        
      
        try {
          const multipleChoices = checked === 'mul-choice'
            ? formMul.choice_text.map((choice, index) => ({
                choice_text: choice,
                is_correct: index === formMul.is_correct ? 1 : 0,
              }))
            : [];
      
          const newClientQuestion = {
            question: form.question,
            exam_id: examid,
            multiple_choice: multipleChoices,
          };
      
          setClientQuestion((questions) => [...questions, newClientQuestion]);
          console.log(clientQuestion)
      
          open();
        } catch (err) {
          if (err.response?.status === 422) {
            setError(err.response.data.errors);
          }
        } finally {
          setLoading(false);
        }
      }   
    
    async function handleDelete(id) {
        setLoading(true)
        try{
            await api.delete(`/questions/${id}`)
            fetchQuestion()
        }finally{
            setLoading(false)
        }
    }


    //EDIT

    const edit = (id) => {
        setEdited(!edited)
        setQuestionid(id)
    }

    const handleChangeEdit = (e) =>{
        setCheckedEdit(e.target.value)
    }

    async function fetchEdit() {
        setLoading(true)
        try {
            const res = await api.get(`/questions/${questionid}`)
            const question = res.data.question

            setForm(question)

            if (question.multiple_choice?.length > 0) {
                const choices = question.multiple_choice
                setMult(choices)
                setCheckedEdit('mul-choice')
                setFormMulEdit({
                    choice_text: choices.map(c => c.choice_text),
                    is_correct: choices.findIndex(c => c.is_correct === 1),
                    exam_id: question.exam_id,
                    question_id: question.id
                })
            } else {
                setCheckedEdit('essay')
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(questionid){
            fetchEdit()
        }
    }, [questionid])

    async function handleSubmitEdit(e, id) {
        e.preventDefault()
        setError({})
        setSaving(true)
        try {
            await api.put(`/questions/${questionid}`, {
                question: form.question,
                exam_id: examid
            })

            if (checkedEdit === 'mul-choice') {
                {console.log(form)}
                {form.multiple_choice?.length == 0 ?                     
                    await Promise.all(
                        formMulEdit.choice_text.map((choice, index) =>
                            api.post(`/multiplechoices`, {
                                choice_text: choice,
                                is_correct: index === formMulEdit.is_correct ? 1 : 0,
                                question_id: questionid
                                
                            })
                        )
                    )
                :
                    await Promise.all(
                        formMulEdit.choice_text.map((choice, index) =>
                            api.put(`/multiplechoices/${mult[index].id}`, {
                                choice_text: choice,
                                is_correct: index === formMulEdit.is_correct ? 1 : 0,
                                question_id: questionid
                                
                            })
                        )
                    )
                }
                
            } else if (checkedEdit === 'essay' && mult.length > 0) {
                await Promise.all(
                    mult.map(choice =>
                        api.delete(`/multiplechoices/${choice.id}`)
                    )
                    
                )
            }

            edit()
            fetchQuestion()
        } catch(err) {
            if(err.response.status === 422){
                setError(err.response.data.errors)
            }
        } finally {
            setSaving(false)
        }
    }
    
    const handleValue = (e) => {
        const firstValue = e.target.value

        const fixed = Math.min(100, Math.max(1, Number(firstValue)))

        setValue(fixed)
    }

    const  handleValueMul = (e) => {
        const firstValue = e.target.value

        const fixed = Math.min(100, Math.max(1, Number(firstValue)))

        setValueMul(fixed)
    }

    const essay = questions.filter(e => e.multiple_choice == 0)
    // console.log(essay)

    const multiple_choice = questions.filter(e => e.multiple_choice != 0)
    // console.log(multiple_choice)

    const allEssayPoints = essay.length * value
    // console.log(allEssayPoints)

    const allMulPoints = multiple_choice.length * valueMul
    // console.log(allMulPoints)

    const allCurrentPoints = allEssayPoints + allMulPoints
    // console.log(allCurrentPoints)

    async function saveChanges() {
        setLoading(true)
        try{
            //Submit
            const res = await api.post('/questions', {
                question: form.question,
                exam_id: examid
            })
            
            const newQuestionId = res.data.question.id
            
            if (checked === 'mul-choice'){
                await Promise.all(
                    formMul.choice_text.map((choice, index) =>
                        api.post('/multiplechoices', {
                            choice_text: choice,
                            is_correct: index === formMul.is_correct ? 1 : 0,
                            question_id: newQuestionId
                        })
                    )
                )
            }

            //Edit
            // await api.put(`/questions/${questionid}`, {
            //     question: form.question,
            //     exam_id: examid
            // })

            // if (checkedEdit === 'mul-choice') {
            //     {console.log(form)}
            //     {form.multiple_choice?.length == 0 ?                     
            //         await Promise.all(
            //             formMulEdit.choice_text.map((choice, index) =>
            //                 api.post(`/multiplechoices`, {
            //                     choice_text: choice,
            //                     is_correct: index === formMulEdit.is_correct ? 1 : 0,
            //                     question_id: questionid
                                
            //                 })
            //             )
            //         )
            //     :
            //         await Promise.all(
            //             formMulEdit.choice_text.map((choice, index) =>
            //                 api.put(`/multiplechoices/${mult[index].id}`, {
            //                     choice_text: choice,
            //                     is_correct: index === formMulEdit.is_correct ? 1 : 0,
            //                     question_id: questionid
                                
            //                 })
            //             )
            //         )
            //     }
                
            // } else if (checkedEdit === 'essay' && mult.length > 0) {
            //     await Promise.all(
            //         mult.map(choice =>
            //             api.delete(`/multiplechoices/${choice.id}`)
            //         )
                    
            //     )
            // }

            //Delete
            await api.delete(`/questions/${id}`)

            location.reload()
        }finally{
            setLoading(false)
        }
    }

    return (
        <>
            <TeacherDashboardLayout>
                <div>
                    {opened == false ? '' :
                        <ModelBox>
                            <form action="" className='text-[#3f454c]' onSubmit={handleSubmit}>
                                    <div className="flex justify-end" onClick={()=> open()}>
                                        <X className=""/>
                                    </div>
                                    <div className='flex flex-col justify-center gap-5'>
                                        <div className="flex flex-col gap-2">
                                            <div className='flex flex-col gap-2'>
                                                <label htmlFor="" className='font-bold'>Question:</label>
                                                <textarea type="text" placeholder='Enter question' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                                onChange={e => setForm({...form, question:e.target.value})}/>
                                                {error.question && <p className='text-red-500'>{error.question[0]}</p>}
                                            </div>
                                        </div>
                                        <div className=' flex gap-6'>
                                            <div className='flex gap-1'>
                                                <input type="radio" name='question-type' value='mul-choice' checked={checked == 'mul-choice'} onChange={handleChange}/>
                                                <label>Multiple Choice</label>
                                            </div>
                                            <div className='flex gap-1'>
                                                <input type="radio" name='question-type' value='essay' checked={checked == 'essay'} onChange={handleChange}/>
                                                <label>Essay</label>
                                            </div>
                                        </div>
                                        {checked == 'mul-choice' ?
                                            <div className='flex flex-col gap-6'>
                                                <p className='text-gray-400'>Must pick one correct answer</p>
                                                {[0, 1, 2, 3].map(index => (  
                                                    <div key={index} className='flex items-center gap-4'>
                                                        <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                            <div className='flex gap-2 px-2 w-full'>
                                                                <input type="radio" name='correct-answer'
                                                                    value={index}
                                                                    checked={formMul.is_correct === index}
                                                                    onChange={() => setFormMul({...formMul, is_correct: index})}/>
                                                                <input type="text" className='w-full outline-none'
                                                                    placeholder={`Enter choice ${index + 1}`}
                                                                    value={formMul.choice_text[index]}
                                                                    onChange={e => handleChoiceChange(index, e.target.value)}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}

                                                {error.choice_text && <p className='text-red-500'>{error.choice_text[0]}</p>}
                                            </div>
                                        : ''}

                                        <button className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10' type='submit' disabled={loading}>{loading ? 'Creating...' : 'Create'}</button>
                                    </div>
                                </form>
                        </ModelBox>
                    }
                    {edited == false ? '' :
                        <ModelBox>
                            <form action="" className='text-[#3f454c]' onSubmit={handleSubmitEdit}>
                            <div className="flex justify-end" onClick={()=> edit()}>
                                        <X className=""/>
                                    </div>
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Question:</label>
                                        <textarea
                                            type="text"
                                            placeholder='Enter question'
                                            value={loading ? 'Loading...' : form.question}
                                            className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                            onChange={e => setForm({...form, question: e.target.value})}
                                        />
                                        {error.question && <p className='text-red-500'>{error.question[0]}</p>}
                                    </div>

                                    <div className='flex gap-6'>
                                        <div className='flex gap-1'>
                                            <input type="radio" name='question-type' value='mul-choice' checked={checkedEdit === 'mul-choice'} onChange={handleChangeEdit}/>
                                            <label>Multiple Choice</label>
                                        </div>
                                        <div className='flex gap-1'>
                                            <input type="radio" name='question-type' value='essay' checked={checkedEdit === 'essay'} onChange={handleChangeEdit}/>
                                            <label>Essay</label>
                                        </div>
                                    </div>
                                    
                                    {checkedEdit === 'mul-choice' &&
                                        <div className='flex flex-col gap-6'>
                                            <p className='text-gray-400'>Must pick one correct answer</p>
                                            {[0, 1, 2, 3].map(index => (
                                                <div key={index} className='flex items-center gap-4'>
                                                    <div className='flex gap-1 border-[#E0E8EB] border-2 rounded p-1 w-full md:w-100'>
                                                        <div className='flex gap-2 px-2 w-full'>
                                                            <input
                                                                type="radio"
                                                                name='correct-answer'
                                                                value={index}
                                                                checked={formMulEdit.is_correct === index}
                                                                onChange={() => setFormMulEdit({...formMulEdit, is_correct: index})}
                                                            />
                                                            <input
                                                                type="text"
                                                                className='w-full outline-none'
                                                                placeholder={`Enter choice ${index + 1}`}
                                                                value={formMulEdit.choice_text[index]}
                                                                onChange={e => handleChoiceChange(index, e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {error.choice_text && <p className='text-red-500'>{error.choice_text[0]}</p>}
                                        </div>
                                    }

                                    <button
                                        className='p-3 bg-[#60848f] text-white font-bold rounded-md hover:bg-[#7098a4] transition-all mt-10'
                                        type='submit'
                                        disabled={saving}
                                    >
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </ModelBox>
                    }
                </div>
                <main className="flex">
                    <div className="m-8 md:mx-20 w-full">
                        {loading ?
                            <div className="flex mt-15 justify-center items-center"> <div className="w-30 h-30 bg-white border-b-6 border-r-6 border-[#a3bac2] rounded-full animate-spin"></div> </div>
                        :
                            <div>
                                <div className="flex w-full gap-4">
                                    <div className="border border-gray-300 w-full h-full p-2 bg-gray-100 rounded-md flex items-center justify-between flex-row overflow-auto">
                                        <h1 className="ml-4 font-semibold text-[#3f454c] text-nowrap">{examName}</h1>
                                        <form className="flex mx-4 flex-row gap-3" onSubmit={postPoints}>
                                            <div className="flex items-center gap-2 flex-row">
                                                <label htmlFor="" className="font-semibold text-sm text-[#3f454c] text-nowrap">Essay Points:</label>
                                                <input type="number" min={1} max={100} className="p-2 h-8 w-fit border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]" value={value} onChange={handleValue}/>
                                            </div>
                                            <div className="flex items-center gap-2 flex-row ">
                                                <label htmlFor="" className="font-semibold text-sm text-[#3f454c] text-nowrap">Multiple Choice Points:</label>
                                                <input type="number" min={1} max={100} className="p-2 h-8 w-fit border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]" value={valueMul} onChange={handleValueMul}/>
                                            </div>
                                            <div className="flex items-center gap-2 flex-row ">
                                                <label htmlFor="" className="font-semibold text-sm text-[#3f454c] text-nowrap">Current Point:</label>
                                                <div className="p-2 h-8 w-18 border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f] flex items-center">
                                                    <p className="">{allCurrentPoints}</p>
                                                </div>
                                            </div>
                                            <button className="bg-[#60848f] hover:bg-[#76a0ad] max-h-10 transition-all p-1 px-2 text-white rounded-md text-sm font-semibold">
                                                <Edit2 className="size-5"/>
                                            </button>
                                        </form>
                                    </div>
                                    
                                    <div className='flex justify-end gap-2'>
                                        <Link to={`/teacher/dashboard/course/${courseid}/exam/${examid}`} className='flex justify-center items-center w-14 h-12 bg-[#60848f] hover:bg-[#76a0ad] transition-all text-white font-semibold rounded-md '><MoveLeft className='size-7 stroke-2'/></Link>
                                    </div>
                                </div>
                                <div className="my-4 min-h-screen gap-4 flex flex-col">
                                    {error && <p className="text-red-500">{error[0]}</p>}
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-1">
                                            <p className="text-gray-400">The number of question must be a multiple of 5</p>
                                            {questions.length % 5 == 0 ? '' : <p className="text-red-500">*</p>}
                                        </div>
                                        <button className="bg-[#60848f] hover:bg-[#76a0ad]  transition-all p-2 text-white rounded-md font-semibold px-4 flex gap-2 items-center" onClick={()=> saveChanges()}>
                                            <p>Save</p>
                                            <Save className="size-5"/>
                                        </button>
                                    </div>
                                    {clientQuestion.map((question, index)=>(
                                        <div className="group/question  border border-gray-300 bg-gray-100 rounded-md h-full" key={question.id}>
                                            <div className="m-0 text-sm flex items-center mr-3 translate-y-1 text-red-500 justify-end">
                                                <div className="m-0">{question.multiple_choice.length == 0 ? value : valueMul}*</div>
                                            </div>
                                            <div className="flex gap-2 w-full h-full p-3 text-[#3f454c]">
                                                <div className="flex items-center justify-between flex-col gap-2">
                                                    <h1 className="bg-gray-50 border border-gray-300 w-8 h-8 flex items-center justify-center rounded-md font-semibold text-[#3f454c]">{index + 1}</h1>
                                                    <div className="flex opacity-0 flex-col justify-center items-center gap-2 text-white group-hover/question:opacity-100 transition-all">
                                                        <button className="bg-[#5ca3b8] hover:bg-[#66b2c9] p-1 rounded-md" onClick={()=> edit(question.id)}>
                                                            <Edit className="text-"/>
                                                        </button>
                                                        <button className=" bg-[#d25252] hover:bg-[#ea5e5e] p-1 rounded-md" onClick={()=> handleDelete(question.id)}>
                                                            <Trash/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="w-full gap-2 flex flex-col">
                                                    <div className="border border-gray-300 rounded-md bg-gray-50">
                                                        <p className="p-2 ">{question.question}</p>
                                                    </div>
                                                    {question.multiple_choice.length == 0 ?
                                                    <div>
                                                        <textarea 
                                                            disabled
                                                            type="text" 
                                                            placeholder="Enter Answer..." 
                                                            className="border border-gray-300 rounded-md bg-gray-50 w-full p-2 hover:border-gray-400 transition-all focus:outline-none focus:border-gray-400" 
                                                        />
                                                    </div>
                                                    :
                                                    <div>
                                                        <p className="mb-2">Pick one answer :</p>
                                                        <div className="gap-2 flex flex-col">
                                                            {question.multiple_choice.map((choice)=>(
                                                                <label key={choice.id}>
                                                                    <div className="gap-2 flex bg-gray-50 rounded-md border border-gray-300 p-2 px-2 hover:border-gray-400 transition-all has-checked:border-[#60848f] has-checked:border-2">
                                                                        <input 
                                                                            disabled
                                                                            type="radio" 
                                                                            className=""
                                                                        />
                                                                        <label htmlFor="">{choice.choice_text}</label>
                                                                    </div>
                                                                </label>  
                                                            ))}
                                                        </div>
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    ))} 
                                    <div className="group/create hover:scale-101  hover:border-gray-300 border-5 border-dashed border-gray-200 h-35 rounded-md flex justify-center items-center transition-all" onClick={()=> open()}>
                                        <Plus className="text-gray-200 group-hover/create:text-gray-300 transition-all size-30 stroke-[2px]"/>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </main>
            </TeacherDashboardLayout>
        </>
    )
}