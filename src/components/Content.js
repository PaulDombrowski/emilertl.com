import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [subActiveIndex, setSubActiveIndex] = useState(null);
    const accordionHeaderRefs = useRef([]); // Liste von refs für Akkordeon-Header
    const [prevActiveIndex, setPrevActiveIndex] = useState(null);

    const handleHeaderClick = (index, e) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setPrevActiveIndex(activeIndex);
            setActiveIndex(index);
            setTimeout(() => {
                const headerPosition = accordionHeaderRefs.current[index].getBoundingClientRect().top + window.scrollY;
                const offset = 50;  // Hier können Sie den gewünschten Abstand einstellen.
                const scrollToPosition = headerPosition - offset;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });
            }, 200);  // Verzögern Sie das Scrollen um 300ms
        }
    };
    
    
    
    
    

    const content = [
        {
            title: 'About',
            body: (
                <>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/DSC03621-2.jpg'} 
                    alt="bild kann nicht angezeigt werden" 
                />
                    <p className='accordion-text'>Emil Ertl (they/them) is a dancer, performer and choreographer. Both in their own work as well as when collaborating, their main curiosity lies in social relationality and its navigations. When making dance, Emil is interested in porosity, choreography as a container for feelings, holding several perspectives at once, staying with friction, moving within paradoxes, and magic-making. <p></p>

Emil’s work <i>Eternal Betrayal</i> &nbsp;was shown at Ballhaus Ost in the frame of Dirty Debüt, and at ada studios in the frame of <i>NAH DRAN</i>&nbsp; extended. In 2022 they published <i>Eigentlich benutze ich dieses Wort nicht</i>, an audio piece about failure and fucking up, in collaboration with Onur Agbaba, Rahel Barra and Lotta Beckers. <br/>
As a dancer they have worked with choreographers such as Tümay Kilincel and Cornelius Schaper, Olympia Bukkakis, Ellen Söderhult, Gry Tingskog, Ar Utke Acs, Tchivett, Florentina Holzinger and Sindri Runudde.
Emil is facilitating dance workshops both in community-centers as well as in institutions. <p></p>

They studied at Tanzfabrik Berlin, Hochschule für Musik und Tanz Köln and graduated from University of the Arts Stockholm in 2019 with a BA in Dance Performance. In 2023, Emil received the danceWEB scholarship at Impulstanz Vienna. <p></p>

Most recently, Emil is working on <i>Serpentine Serpentine</i>, a research investigating the dichotomy between crumpling and straightening with Onur Agbaba in residency at Flutgraben Berlin. Next to that, they are in rehearsal process with Gry Tingskog for <i>parasight</i>, which will be premiering in spring 2024. <p></p> 

Emil is based in Berlin and active in Germany, Sweden and internationally. 

                    </p>
                </>
            )
        },
        {
            title: 'CV',
            body: (
                <>

                <p className='cv-title'>Education</p> 
                    <table className="accordion-table">
                        <tbody>
                        <tr>
                                <td>2023</td>
                                <td><span className="cv-überschrift">DanceWeb Scholarship</span>  <br /> Impulstanz Vienna</td>
                            </tr>
                            <tr>
                                <td>2016- <br /> 2019</td>
                                <td><span className="cv-überschrift">BA in Dance Performance</span>  <br /> Stockholm University of the Arts</td>
                            </tr>
                            <tr>
                                <td>2015-<br />2016</td>
                                <td><span className="cv-überschrift">Hochschule für Musik und Tanz</span>  <br />Köln</td>
                            </tr>
                            <tr>
                                <td>2013-<br />2014</td>
                                <td><span className="cv-überschrift">Guest Student in Dance</span>  <br /> Theater Academy of the University of the Arts Helsinki</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className='cv-title'>Work as Choreographer/Maker</p>
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
                                <td> <span className="cv-überschrift">Eigentümliche Verhältnisse</span> <br />performative research with Onur Agbaba and Lotta Beckers, TakeHeart Fonds Daku, HAU Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Residency</span> <br />Residency Movement and Music Research at Lakestudios Berlin</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td> <span className="cv-überschrift">Eternal Betrayal</span> <br />Eternal Betrayal, Dirty Debüt Ballhaus Ost Berlin + NAH DRAN extended ada studio Berlin</td>
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
        
                    <p className='cv-title'>Work as Performer</p> 
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2023</td>
                                <td> <span className="cv-überschrift">replay</span> <br /> by Olympia Bukkakis, premiere February 2023 at Sophiensaele Berlin</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td><span className="cv-überschrift">Närheten</span>  <br /> by Tove Sahlin, Riksteatern Sweden</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td><span className="cv-überschrift">SLXL video series</span> <br /> Ackerstadt Palast Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">DUNKA DUNKA</span> <br />by Ellen Söderhult, Heizhaus Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">How to do things with romance</span> <br /> a prologue by Ellen Söderhult, Palladium Malmö</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">The Fishing Dance and Other Cosmic Confessions</span> <br /> by Sindri Runudde, Nordwind Festival, Kampnagel Hamburg</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Landscapes of desire</span> <br />by Tchivett, Künstlerhaus Lukas Aahrenshoop</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">echoes </span> <br />by Klara Utke Acs, MDT Stockholm and Danshallerne Copenhagen</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Mini Muscle Drag Show</span> <br /> with Natal Igor Dobkin and Rahel Barra, Fleetstreet Theater Hamburg</td>
                            </tr>
                            <tr>
                                <td>2019</td>
                                <td><span className="cv-überschrift">touching landscapes</span> <br />by Tchivett, Uferstudios Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Ägget, katten och dikten</span>  <br />by Pontus Pettersson, Konsthall C Stockholm</td>
                            </tr>
                        </tbody>
                    </table>
        
                <p className='cv-title'>Work as Assistance</p> 
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2022</td>
                                <td><span className="cv-überschrift">IN THE DEPTHS</span>  <br /> by Sheena McGrandles and Claire Sobottke, Lübbenau</td>
                            </tr>
                            <tr>
                                <td>2020</td>
                                <td><span className="cv-überschrift">Die Hörposaune</span>  <br /> by Antonia Baehr and Jule Flierl, HAU Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">A Touch of the Other</span>  <br /> by Olympia Bukkakis, Sophiensaele Berlin</td>
                            </tr>
                            <tr>
                                <td>2019</td>
                                <td><span className="cv-überschrift">Walking Backwards</span>  <br /> by Renate Lorenz and Pauline Boudry, Venice Biennale</td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p className='cv-title'>Work as Pedagogue</p> 
                    <table className="accordion-table">
                        <tbody>
                            <tr>
                                <td>2022</td>
                                <td><span className="cv-überschrift">Drag and Jazz Dance Workshop</span>  <br /> University Madithea, Leipzig</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Creative Dance for Teens and Kids,</span>  <br /> Zirkus CABUWAZI Berlin</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td><span className="cv-überschrift">Improvisation and Dance Workshop for Queer and Trans People</span>  <br /> Failing Femmes Berlin</td>
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

        { title: 'eternal betrayal',
        body: 
            <div>
            <img   className='image-content'  src={process.env.PUBLIC_URL + '/photo_2023-08-16_21-30-12.jpg'} alt="Beschreibung für Bild 1.1"/>
           <p className='accordion-text'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   
            Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet </p> 
            <div class="video-wrapper">
            <iframe src="https://player.vimeo.com/video/520291775" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
        </div>
            </div> },


             
               
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
            <div className="akkordion-wrapper">
                <div className="accordion">
                {content.map((item, index) => (
    <div key={index} className="accordion-item">
        <div 
            className="accordion-header" 
            ref={el => accordionHeaderRefs.current[index] = el}
            onClick={(e) => handleHeaderClick(index, e)}
        >
            {item.title}
        </div>
        <AnimatePresence initial={false}>
            {activeIndex === index && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={
                        prevActiveIndex !== null 
                        ? { opacity: 0, height: 0, transition: { duration: 0 } }
                        : { opacity: 0, height: 0 }
                    }
                    className="accordion-body"
                >
                    {item.body}
                </motion.div>
            )}
        </AnimatePresence>
    </div>
))}

                </div>
            </div>
        </div>
    );
}


export default AccordionWithContent;

