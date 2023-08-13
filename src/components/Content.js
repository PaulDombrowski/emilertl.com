import React, { useState } from 'react';
import '../App.css';  // Wenn Sie Styling verwenden möchten

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);

    const content = [
        {
            title: 'About',
            body: (
                <>
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
            title: 'Titel 2',
            body: <img src="https://example.com/image.jpg" alt="Bild für Titel 2" />
        },
        {
            title: 'Titel 3',
            body: (
                <>
                    <h3>Überschrift für Titel 3</h3>
                    <p>Text für Titel 3.</p>
                </>
            )
        }
    ];

    return (
        <div class="akkordion-wrapper">
        <div className="accordion">
            {content.map((item, index) => (
                <div key={index} className="accordion-item">
                    <div className="accordion-header">
                        <span 
                            style={{flexGrow: 1, cursor: 'pointer'}}
                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
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