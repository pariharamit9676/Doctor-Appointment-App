import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const AddDoctor = () => {

    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        email: '',
        password: '',
        experience: '1 year',
        fees: '',
        about: '',
        speciality: 'General physician',
        degree: '',
        address1: '',
        address2: ''
    })
    const [docImg, setDocImg] = useState(false)
    const [loading, setLoading] = useState(false)

    const {backendUrl, aToken} = useContext(AdminContext)
    const onSubmitHandler =  async(event)=>{
        event.preventDefault();
        setLoading(true)
        try {
            if(!docImg) {
                return toast.error('Image Not Selected')
            }
            const formData = new FormData()
            formData.append('image',docImg)
            Object.keys(doctorInfo).forEach((key) => formData.append(key, doctorInfo[key]))
            formData.append('address',JSON.stringify({line1:doctorInfo.address1, line2:doctorInfo.address2}))

            formData.forEach((value, key) => {
                console.log(`${key} : ${value}`);   
            })
            const {data} = await axios.post(backendUrl+'/api/admin/add-doctor', formData, {headers: {aToken}})
            console.log(doctorInfo);
            
            if(data.success){
                toast.success(data.message)
                setDoctorInfo({
                    name: '',
                    email: '',
                    password: '',
                    experience: '1 year',
                    fees: '',
                    about: '',
                    speciality: 'General physician',
                    degree: '',
                    address1: '',
                    address2: ''
                })
                setDocImg(false)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }finally {
            setLoading(false)
        }

    }

    const onDataChange = (e) =>{
            const {name, value} = e.target;
            setDoctorInfo((prev) =>({...prev, [name]:value}))
    }
    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docImg ?URL.createObjectURL(docImg): assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
                    <p>upload doctor <br />picture</p>
                </div>
                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full flex lg:flex-1 flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Name</p>
                            <input onChange={onDataChange} name='name' value={doctorInfo.name} className='border rounded px-3 py-2' type="text" placeholder='Name' required/>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Email</p>
                            <input onChange={onDataChange} name='email' value={doctorInfo.email} className='border rounded px-3 py-2' type="email" placeholder='Email' required/>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Doctor Password</p>
                            <input onChange={onDataChange} name='password' value={doctorInfo.password} className='border rounded px-3 py-2' type="password" placeholder='Password' required/>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Experience</p>
                            <select onChange={onDataChange} value={doctorInfo.experience} className='border rounded px-3 py-2' name="experience">
                               <option value="1 year">1 year</option>
                               <option value="2 year">2 year</option>
                               <option value="3 year">3 year</option>
                               <option value="4 year">4 year</option>
                               <option value="5 year">5 year</option>
                               <option value="6 year">6 year</option>
                               <option value="7 year">7 year</option>
                               <option value="8 year">8 year</option>
                               <option value="9 year">9 year</option>
                               <option value="10 year">10 year</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Fees</p>
                            <input onChange={onDataChange} name='fees' value={doctorInfo.fees} className='border rounded px-3 py-2' type="number" placeholder='Fees' required/>
                        </div>
                        </div>
                        <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Speciality</p>
                            <select onChange={onDataChange} name="speciality" value={doctorInfo.speciality} className='border rounded px-3 py-2'>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Education</p>
                            <input onChange={onDataChange} name='degree' value={doctorInfo.degree} className='border rounded px-3 py-2' type="text" placeholder='Education' required/>
                        </div>
                        
                        <div className='flex-1 flex flex-col gap-1'>
                            <p>Address</p>
                            <input onChange={onDataChange} name='address1' value={doctorInfo.address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required/>
                            <input  onChange={onDataChange} name='address2' value={doctorInfo.address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required/>
                        </div>
                        </div>
                </div>
                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea onChange={onDataChange} name='about' value={doctorInfo.about} className='w-full px-4 pt-2 border rounded' placeholder='write about doctor' rows={5}></textarea>
                </div>
                <button type='submit' className='bg-primary py-2 px-10 mt-4 text-white rounded-full'>{loading ? 'Submitting...' : 'Add Doctor'}</button>
                </div>
        </form>
    )
}

export default AddDoctor
