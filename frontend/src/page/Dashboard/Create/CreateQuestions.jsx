import { useState } from 'react'
import DashboardLayout from '../../../layouts/DashboardLayout'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../lib/api'

export default function createquestions(){
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
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState('mul-choice')
    const navigate = useNavigate();
    const {classid, courseid, examid} = useParams() 

    const handleChange = (e) =>{
        setChecked(e.target.value)
    }

    const handleChoiceChange = (index, value) => {
        const updated = [...formMul.choice_text]
        updated[index] = value
        setFormMul({...formMul, choice_text: updated})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError({})
        setLoading(true)
        try{
        
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
            
            
            navigate(`/admin/dashboard/classes/${classid}/courses/${courseid}/exams/${examid}/questions`)
        }catch(err){
            if(err.response?.status === 422){
                setError(err.response.data.errors)
            }
        }finally{
            setLoading(false)
        }
    }

    return (
        <DashboardLayout>
            <main className="flex text-[#3f454c]" >
                    <div className="m-8 md:mx-20 w-full ">
                        <h1 className='font-bold text-2xl text-[#3f454c]'>Create Questions</h1>
                        <div className='my-6 text-[#3f454c]'>
                            <form action="" className=' p-4 rounded-xl shadow-md h-full' onSubmit={handleSubmit}>
                            {console.log(formMul.is_correct)}
                                <div className='flex flex-col justify-center gap-5'>
                                    <div className='flex flex-col gap-2'>
                                        <label htmlFor="" className='font-bold'>Question:</label>
                                        <textarea type="text" placeholder='Enter question' className='p-2 w-full border-2 border-[#E0E8EB] rounded-md hover:border-[#60848f] transition-all focus:outline-none focus:border-[#60848f]'
                                        onChange={e => setForm({...form, question:e.target.value})}/>
                                        {error.question && <p className='text-red-500'>{error.question[0]}</p>}
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
                        </div>
                    </div>
                </main>
        </DashboardLayout>
    )
}