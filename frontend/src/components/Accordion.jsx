import React, { useState } from 'react';
import './Accordion.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState([]);
    const [coletstatus, setcoletstatus] = useState([]);
    const [isDivGreen, setIsDivGreen] = useState([]);



    const Facturi = [
        {
            title: 'Factura nr 1',
        },
        {
            title: 'Factura nr 2',
        },
        {
            title: 'Factura nr 3',
        },
        {
            title: 'Factura nr 4',
        },
    ];


    const Factura1 = [
        {
            title: 'Colet nr 1',
        },
        {
            title: 'Colet nr 2',
        },
        {
            title: 'Colet nr 3',
        },
        {
            title: 'Colet nr 4',
        },
    ];




    const handleAccordionClick = (index) => {
        if (activeIndex.includes(index)) {
            setActiveIndex(activeIndex.filter((i) => i !== index));
        } else {
            setActiveIndex([...activeIndex, index]);
        }
    };

    const handleAccordionClickForColet = (index) => {
        if (coletstatus.includes(index)) {
            setcoletstatus(coletstatus.filter((i) => i !== index));
        } else {
            setcoletstatus([...coletstatus, index]);
        }
    };

    const handleSvgClick = (index) => {
        if (isDivGreen.includes(index)) {
            setIsDivGreen(isDivGreen.filter((i) => i !== index));
        } else {
            setIsDivGreen([...isDivGreen, index]);
        }
    };



    return (
        <div className="h-screen bg-gradient-to-br from-green-50 to-indigo-100 grid place-items-center">
            <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-7/12 mx-auto rounded border">
                <div className="bg-white p-10 shadow-sm">
                    <div className="flex items-center">
                        <h6 className="text-3xl font-large text-gray-800 mr-4">Dosar Transport Actual</h6>
                        <button className="button-17" role="button" style={{ marginLeft: 'auto' }}>
                            Scaneaza dosar nou
                        </button>
                    </div>
                    <div className="h-1 mx-auto border-b my-5"></div>

                    {Facturi.map((item, index) => (
                        <div
                            key={index}
                            className={`transition hover:bg-indigo-50 ${activeIndex.includes(index) ? 'bg-indigo-50' : ''
                                }`}
                        >
                            <div
                                className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                                onClick={() => handleAccordionClick(index)}
                            >
                                <FontAwesomeIcon
                                    icon={activeIndex.includes(index) ? faMinus : faPlus}
                                    className="fas"
                                />
                                <h4 className="text-xl ">{item.title}</h4>
                            </div>

                            <div
                                className="accordion-content px-5 pt-0 overflow-hidden"
                                style={{
                                    maxHeight: activeIndex.includes(index) ? '1000px' : '0px',
                                }}
                            >

                                {Factura1.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`transition hover:bg-indigo-80 ${coletstatus.includes(index) ? 'bg-indigo-100' : ''} ${isDivGreen.includes(index) ? 'bg-green-300' : 'bg-indigo-100'}`}
                                    >
                                        <div
                                            className="accordion-header cursor-pointer transition flex space-x-5 px-5 items-center h-16"
                                            onClick={() => handleAccordionClickForColet(index)}
                                        >
                                            <FontAwesomeIcon
                                                icon={coletstatus.includes(index) ? faMinus : faPlus}
                                                className="fas"
                                            />
                                            <h3>{item.title}</h3>
                                            <button onClick={() => handleSvgClick(index)}
                                                type="button"
                                                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center ml-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${isDivGreen.includes(index) ? 'bg-green-300' : 'bg-indigo-500'}`}
                                                style={{ marginLeft: 'auto' }}>
                                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                {isDivGreen.includes(index) ? <path d="M18 6L6 18M6 6L18 18" /> : <path d="M20 6L9 17l-5-5" />}
                                                </svg>
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                            </button>
                                        </div>

                                        <div
                                            className="accordion-content px-5 pt-0 overflow-hidden"
                                            style={{
                                                maxHeight: coletstatus.includes(index) ? '1000px' : '0px',
                                            }}
                                        >
                                            - - sample text - -
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div >
        </div >
    );
};

export default Accordion;
