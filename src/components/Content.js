import React, { useState, useRef } from 'react';
import '../App.css';

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);
    const accordionWrapperRef = useRef(null);

    const handleHeaderClick = (index, e) => {
        setActiveIndex(activeIndex === index ? null : index);
        
        // Scrollen zum Akkordeon-Wrapper
        accordionWrapperRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const content = [
        {
            title: 'About',
            body: (
                <>
                <img className='image-content' src="/photo_2023-08-14_14-19-25.jpg" alt="Bild für Titel 2" />
                    
                    <p>Emil Ertl works as a dancer, choreographer, performer and teacher in the field of performance art and dance. Their work deals with questions around … In their own work as well as when working with others, a main interest is social relations and their navigations. Within relationality and its navigation lies potential for movement and change, both physically as well as politically … (hier gehts noch weiter mit 1-2 Sätzen)
                    Emils work Eternal Betrayal was shown at Ballhaus Ost in the frame of Dirty Debüt, and at ada studios in the frame of NAH DRAN extended. They recently published Eigentlich benutze ich dieses Wort nicht, an audio piece about failure and fucking up, created in collaboration with their collective ORAL-G.
                    As a dancer they work with choreographers such as Olympia Bukkakis, Ellen Söderhult, Antonia Baehr, Ar Utke Acs, Tchivett, Florentina Holzinger, Sindri Runudde and Tümay Kilincel. 
                    Emil is teaching dance workshops for adults, youth and kids both in DIY community centers as well as in art institutions. 

                    They studied at Tanzfabrik Berlin, Hochschule für Musik und Tanz Köln and graduated from University of the Arts Stockholm in 2019 with a BA in Dance Performance. Emil is based in Berlin and active in Germany, Sweden and internationally. 
                    </p>
                </>
            )
        },
       {
    title: 'CV',
    body: (
        <>
            <p>Work as Choreographer/Maker</p>
            <table className="accordion-table">

                <tbody>
                
                    <tr>
                        <td>2022</td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>  Eigentlich benutze ich dieses Wort nicht.
                        <p className="performance-description">Ein Portrait des
                        Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra,
                        Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung,
                        Frankfurt am Main</p></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
    ];

    return (
        <div className="akkordion-wrapper" ref={accordionWrapperRef}>
            <div className="accordion">
                {content.map((item, index) => (
                    <div key={index} className="accordion-item">
                        <div className="accordion-header">
                            <span 
                                style={{flexGrow: 1, cursor: 'pointer'}}
                                onClick={(e) => handleHeaderClick(index, e)}
                            >
                                {item.title}
                            </span>
                            {activeIndex === index && 
                                <span 
                                    className="accordion-close" 
                                    onClick={() => setActiveIndex(null)}
                                >
                                    &times;
                                </span>
                            }
                        </div>
                        {activeIndex === index && <div className="accordion-body">{item.body}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AccordionWithContent;