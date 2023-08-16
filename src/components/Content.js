import React, { useState, useRef } from 'react';
import '../App.css';

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [subActiveIndex, setSubActiveIndex] = useState(null);
    const accordionWrapperRef = useRef(null);

    const handleHeaderClick = (index, e) => {
        if (activeIndex === index) { // Wenn der aktuelle Index dem geklickten Index entspricht (d.h. das Akkordeon wird geschlossen)
            if (index === 2) { // Wenn "selected pieces" geschlossen wird
                setSubActiveIndex(null); // Setze subActiveIndex zurück, um alle Unterreiter zu schließen
            }
        }
        setActiveIndex(activeIndex === index ? null : index);
        accordionWrapperRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const content = [
        {
            title: 'About',
            body: (
                <>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/photo_2023-08-14_14-19-25.jpg'} 
                    alt="bild kann nicht angeziegt werden" 
                    style={{filter: "url(#wavy)"}}
                    onMouseOver={(e) => e.target.style.filter = ""}
                    onMouseOut={(e) => e.target.style.filter = "url(#wavy)"}
                />
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
                                <td> <span className="cv-überschrift">Eigentlich benutze ich dieses Wort nicht</span> <br />Ein Portrait des Scheiterns in 5 Stimmen, audio piece with Rahel Crawford Barra, Onur Agbaba and Lotta Beckers, HTA Postgraduierten Förderung, Frankfurt am Main</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">movement research</span> <br /> funded by DISTANZEN Dachverband Tanz</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Eigentümliche Verhältnisse,</span> <br />performative research with Onur Agbaba and Lotta Beckers, TakeHeart Fonds Daku, HAU Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Residency</span> <br />Residency Movement and Music Research at Lakestudios Berlin</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td> <span className="cv-überschrift">Eternal Betrayal,</span> <br />Eternal Betrayal, Dirty Debüt Ballhaus Ost Berlin + NAH DRAN extended ada studio Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Outro</span> <br />riding solo with u at Ackerstadt Palast Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">PLAYDATE</span> <br />PLAYDATE with Iokasti Zougrafou at Hosek Contemporary Berlin</td>
                            </tr>
                            <tr>
                                <td>2020</td>
                                <td> <span className="cv-überschrift">The Cosy Boi Slut Team</span> <br /> dancing group with Sindri Runudde</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p>Work as Performer</p>
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2023</td>
                                <td>replay by Olympia Bukkakis, premiere February 2023 at Sophiensaele Berlin</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td>Närheten by Tove Sahlin, Riksteatern Sweden</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td>SLXL video series, Ackerstadt Palast Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>DUNKA DUNKA by Ellen Söderhult, Heizhaus Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>How to do things with romance – a prologue by Ellen Söderhult, Palladium Malmö</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>The Fishing Dance and Other Cosmic Confessions by Sindri Runudde, Nordwind Festival, Kampnagel Hamburg</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Landscapes of desire by Tchivett, Künstlerhaus Lukas Aahrenshoop</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>echoes by Klara Utke Acs, MDT Stockholm and Danshallerne Copenhagen</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Mini Muscle Drag Show with Natal Igor Dobkin and Rahel Barra, Fleetstreet Theater Hamburg</td>
                            </tr>
                            <tr>
                                <td>2019</td>
                                <td>touching landscapes by Tchivett, Uferstudios Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Ägget, katten och dikten by Pontus Pettersson, Konsthall C Stockholm</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p>Work as Assistance</p>
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2022</td>
                                <td>IN THE DEPTHS by Sheena McGrandles and Claire Sobottke, Lübbenau</td>
                            </tr>
                            <tr>
                                <td>2020</td>
                                <td>Die Hörposaune by Antonia Baehr and Jule Flierl, HAU Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>A Touch of the Other by Olympia Bukkakis, Sophiensaele Berlin</td>
                            </tr>
                            <tr>
                                <td>2019</td>
                                <td>Walking Backwards by Renate Lorenz and Pauline Boudry, Venice Biennale</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p>Work as Pedagogue</p>
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2022</td>
                                <td>Drag and Jazz Dance Workshop, University Madithea, Leipzig</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Creative Dance for Teens and Kids, Zirkus CABUWAZI Berlin</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td>Improvisation and Dance Workshop for Queer and Trans People at Failing Femmes Berlin</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p>Education</p>
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2016-19</td>
                                <td>BA in Dance Performance, Stockholm University of the Arts</td>
                            </tr>
                            <tr>
                                <td>2015-16</td>
                                <td>Hochschule für Musik und Tanz, Köln</td>
                            </tr>
                            <tr>
                                <td>2013-14</td>
                                <td>Guest Student in Dance, Theater Academy of the University of the Arts Helsinki</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )
        },
{
    title: 'selected pieces',
    body: (
        <div className="accordion">
            {[ 
                { title: 'Piece 1', body: <div>Content for Piece 1</div> },
                { title: 'Piece 2', body: <div>Content for Piece 2</div> },
                { title: 'Piece 3', body: <div>Content for Piece 3</div> },
                { title: 'Piece 4', body: <div>Content for Piece 4</div> }
            ].map((subItem, subIndex) => (
                <div key={subIndex} className="accordion-item">
                    <div 
                        className="accordion-header" 
                        onClick={() => setSubActiveIndex(subActiveIndex === subIndex ? null : subIndex)}
                    >
                        {subItem.title}
                    </div>
                    {subActiveIndex === subIndex && <div className="accordion-body">{subItem.body}</div>}
                </div>
            ))}
        </div>
    )
}
];

return (
<div>
    {/* SVG Filter */}
    <svg width="0" height="0">
        <defs>
            <filter id="wavy">
                <feTurbulence type="turbulence" baseFrequency="0.01" numOctaves="5" result="turbulence">
                    <animate attributeName="baseFrequency" dur="18s" values="0.01; 0.02; 0.01" repeatCount="indefinite" />
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbulence" scale="40" />
            </filter>
        </defs>
    </svg>
    
    <div className="akkordion-wrapper" ref={accordionWrapperRef}>
        <div className="accordion">
        {content.map((item, index) => (
            <div key={index} className="accordion-item">
                <div 
                    className="accordion-header" 
                    onClick={(e) => handleHeaderClick(index, e)}
                >
                    <span style={{flexGrow: 1, cursor: 'pointer'}}>
                        {item.title}
                    </span>
                    {activeIndex === index && 
                        <span 
                            className="accordion-close" 
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveIndex(null);
                            }}
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
</div>
);
}

export default AccordionWithContent;

