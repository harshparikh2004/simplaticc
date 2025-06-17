import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { auth } from '../firebase';

const steps = [
    { name: 'Project Name', placeholder: 'Enter Project Name', key: 'projectTitle', type: 'text' },
    { name: 'Project Description', placeholder: 'Enter Project Description', key: 'projectDescription', type: 'text' },
    { name: 'Tech Stack', placeholder: 'Enter Tech Stack (e.g., React, Node.js)', key: 'techStack', type: 'text' },
    { name: 'Diagram Types', placeholder: 'Enter diagram types (comma-separated)', key: 'diagramTypes', type: 'text' },
];

function NewProject() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleNext = () => {
        setDirection(1);
        if (step < steps.length - 1) setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setDirection(-1);
        if (step > 0) setStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [steps[step].key]: e.target.value });
    };

    const handleSubmit = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser) {
            alert("You must be logged in to submit a project.");
            return;
        }

        try {
            const structuredData = {
                projectTitle: formData.projectTitle || '',
                projectDescription: formData.projectDescription || '',
                techStack: formData.techStack || '',
                diagramTypes: (formData.diagramTypes || '').split(',').map(diagram => diagram.trim()),
                createdBy: currentUser.email,
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, 'projects'), structuredData);
            toast.success('Project Saved Successfully.', {
                position: "top-center",
                duration: 1300,
            });
            setTimeout(() => {
                navigate('/profile');
            }, 1700);
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error('Error saving project.', {
                position: "top-center",
                duration: 1300,
            });
        }
    };

    const isLastStep = step === steps.length - 1;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isLastStep) {
                handleSubmit();
            } else {
                handleNext();
            }
        }
    };

    return (
        <div className='border w-full h-screen px-8 py-8 flex items-center justify-center'>
            <form
                onSubmit={(e) => e.preventDefault()}
                className='w-full h-full max-w-2xl flex flex-col gap-8 justify-center items-center'
                style={{ fontFamily: 'Quicksand' }}
            >
                <AnimatePresence mode='wait' initial={false}>
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, y: direction > 0 ? 40 : -40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: direction > 0 ? -40 : 40 }}
                        transition={{ duration: 0.3 }}
                        className='w-full flex flex-col gap-2 items-center'
                    >
                        <label className='text-lg font-semibold'>{steps[step].name}</label>
                        <input
                            type={steps[step].type}
                            className='rounded-md border-2 border-black/20 shadow-lg p-2 w-3/4 outline-none font-medium'
                            placeholder={steps[step].placeholder}
                            value={formData[steps[step].key] || ''}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className='flex items-center justify-between w-3/4'>
                    <button
                        type='button'
                        onClick={handlePrev}
                        disabled={step === 0}
                        className='w-[160px] py-2 px-4 bg-gray-300 hover:bg-gray-400 text-black rounded-md transition-all duration-150 disabled:opacity-50'
                    >
                        Previous
                    </button>

                    {isLastStep ? (
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className='w-[160px] py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-all duration-150'
                        >
                            Submit
                        </button>
                    ) : (
                        <button
                            type='button'
                            onClick={handleNext}
                            className='w-[160px] py-2 px-4 bg-[#303030] hover:bg-[#1e1e1e] text-white rounded-md transition-all duration-150'
                        >
                            Next
                        </button>
                    )}
                </div>
            </form>
            <Toaster />
        </div>
    );
}

export default NewProject;