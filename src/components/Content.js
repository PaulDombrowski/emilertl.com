import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import { motion, AnimatePresence } from 'framer-motion';

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);
    const accordionHeaderRefs = useRef([]); 

    const handleHeaderClick = (index, e) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
            setTimeout(() => {
                const headerPosition = accordionHeaderRefs.current[index].getBoundingClientRect().top + window.scrollY;
                const offset = 50;
                const scrollToPosition = headerPosition - offset;
                window.scrollTo({
                    top: scrollToPosition,
                    behavior: "smooth"
                });
            }, 400);
        }
    };

    useEffect(() => {
        const accordionElement = document.querySelector('.accordion'); 

        if (!accordionElement) return;

        const updateOverlay = () => {
            const overlay = document.querySelector(".background-overlay");
            if (overlay) {
                if (activeIndex === null) {
                    overlay.classList.remove("scrolling");
                } else {
                    overlay.classList.add("scrolling");
                }
            }
        };

        const observer = new MutationObserver(mutations => {
            for(let mutation of mutations) {
                if(mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    updateOverlay();
                }
            }
        });

        observer.observe(accordionElement, {
            attributes: true,
            childList: false,
            subtree: false
        });

        return () => {
            observer.disconnect(); 
        };

    }, [activeIndex]);
    
    
    
    

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
                    <p className='accordion-text'>Emil Maria Ertl (they/them), *94 in Nürnberg, works as a dancer, choreographer and facilitator in the field of performance art. Both in their own work as well as when collaborating, their main curiosity lies in social relationality and its navigation. When making dance, Emil is interested in porosity, choreography as a container for feelings, holding several perspectives at once, staying with friction, moving within paradoxes, and magic-making. <p></p>

Emil’s work <i>Eternal Betrayal</i> &nbsp;was shown at Ballhaus Ost in the frame of Dirty Debüt, and at ada studios in the frame of <i>NAH DRAN</i>&nbsp; extended. In 2022 they published <i>Eigentlich benutze ich dieses Wort nicht</i>, an audio piece around failure and fuck ups, in collaboration with Onur Agbaba, Rahel Barra and Lotta Beckers. <br/>
As a dancer they have worked with choreographers such as Tümay Kilincel and Cornelius Schaper, Olympia Bukkakis, Ellen Söderhult, Gry Tingskog, Ar Utke Acs, Tchivett, Florentina Holzinger and Sindri Runudde.
Emil is facilitating dance workshops both in community-centers as well as in institutions. <p></p>

They studied at Tanzfabrik Berlin, Hochschule für Musik und Tanz Köln and graduated from University of the Arts Stockholm in 2019 with a Bachelor in Dance Performance. In 2023, Emil received the danceWEB scholarship at Impulstanz Vienna. <p></p>

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
                                <td><span className="cv-überschrift">Dance Intensive</span>  <br />Tanzfabrik Berlin</td>
                            </tr>
                        </tbody>
                    </table>

                    <p className='cv-title'>Work as Choreographer</p>
                    <table className="accordion-table">
                        <tbody>
                        <tr>
                                <td>2023</td>
                                <td> <span className="cv-überschrift">Serpentine Serpentine</span> <br />work in progress with Onur Agbaba, Flutgraben e.V.</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Masculinity & Jazzdance: a research</span> <br />DISTANZEN Dachverband Tanz</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td> <span className="cv-überschrift">Eigentlich benutze ich dieses Wort nicht. Ein Portrait des Scheiterns in 5 Stimme</span> <br /> Audio piece in collaboration with Onur Agbaba, Rahel Barra and Lotta Beckers. HTA Postgraduiertenförderung, Frankfurt am Main </td>
                            </tr>
                
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Eigentümliche Verhältnisse</span> <br />essay-film in collaboration with Onur Agbaba and Lotta Beckers, Recherche Förderung Fonds DAKU, HAU Berlin </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Kämpferisches Tanzen</span> <br />movement research, DISTANZEN Dachverband Deutschland </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Tuning Grooving Testing</span> <br />residency, LAKE studios Berlin </td>
                            </tr>
                           
                            <tr>
                                <td>2021</td>
                                <td> <span className="cv-überschrift">Eternal Betrayal</span> <br />Dirty Debüt Ballhaus Ost Berlin + NAH DRAN extended ada studio Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Mini Muscle Drag Show</span> <br />in collaboration with Rahel Barra and Nattan Dobkin, Fleetstreet Theatre Hamburg </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">SXLX</span> <br />video series, Ackerstadtpalast Berlin  </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">Outro – riding solo with u</span> <br />Ackerstadt Palast Berlin </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">PLAYDATE</span> <br />with Iokasti Zougrafou, Hosek Contemporary Berlin </td>
                            </tr>
                            <tr>
                                <td>2020</td>
                                <td> <span className="cv-überschrift">The Cosy Boi Slut Team and The Cunt Brothers</span> <br /> dancing group with Sindri Runudde</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">The Wild and The Cute – a Call Center for Creatures of Any Kind</span> <br /> with Sepideh Khodarahmi, residency at Dansenshus Stockholm</td>
                            </tr>
                            <tr>
                                <td>2018</td>
                                <td> <span className="cv-überschrift">hole</span> <br />weld Stockholm </td>
                            </tr>
                        </tbody>
                    </table>
        
                    <p className='cv-title'>Work as Performer</p> 
                    <table className="accordion-table">
                        <tbody>
                        <tr>
                                <td>2024</td>
                                <td> <span className="cv-überschrift">parasight</span> <br />by Gry Tingskog, Atalante Gothenborg (premiere spring 24)</td>
                            </tr>
                            <tr>
                                <td>2023</td>
                                <td> <span className="cv-überschrift">Foyer Phobie </span> <br /> by Tümay Kilinçel and Cornelius Schaper, Fortuna Wetten Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td> <span className="cv-überschrift">replay</span> <br /> by Olympia Bukkakis, co-choregraphy+performance, Sophiensaele Berlin</td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td><span className="cv-überschrift">Närheten</span>  <br /> by Tove Sahlin, Tour with Riksteatern Sweden</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">The Fishing Dance and Other Cosmic Confessions </span>  <br /> by Sindri Runudde, Aspen Stockholm</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td><span className="cv-überschrift">DUNKA DUNKA </span> <br /> remix by Ellen Söderhult, Heizhaus Berlin</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">How to do things with romance  </span> <br />a prologue by Ellen Söderhult, Palladium Malmö</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">echoes</span> <br /> by Ar Utke Acs, MDT Stockholm and Danshallerne Copenhagen</td>
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
                                <td>2019</td>
                                <td><span className="cv-überschrift">echoes </span> <br />by Klara Utke Acs, MDT Stockholm and Danshallerne Copenhagen</td>
                            </tr>
                
                            <tr>
                                <td>2019</td>
                                <td><span className="cv-überschrift">touching landscapes</span> <br />by Tchivett, Uferstudios Berlin</td>
                            </tr>
                        
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Ägget, katten och dikten</span>  <br />by Pontus Pettersson, Konsthall C Stockholm</td>
                            </tr>
                            <tr>
                                <td>2019</td>
                                <td><span className="cv-überschrift">KNOT KNOT</span> <br />by Lea Moro, SKH Stockholm </td>
                            </tr>
                            <tr>
                                <td>2018</td>
                                <td><span className="cv-überschrift">DESCTRUCTION LAB </span> <br />by Florentina Holzinger, My Wild Flag, MDT Stockholm</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">SPLENDOUR </span> <br />by Stina Nyberg, SKH Stockholm</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">borrowed landscape  </span> <br />by Heine Avdal & Yukiko Shinozaki/fieldworks, ICA maxi Stockholm </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><span className="cv-überschrift">arrivals procrastinate *echo* </span> <br />by Ar Utke Acs, Norbergfestival Sweden </td>
                            </tr>
                            <tr>
                                <td>2017</td>
                                <td><span className="cv-überschrift">OUROBORACULAR </span> <br />by Eleanor Bauer, SKH Stockholm  </td>
                            </tr>
                            <tr>
                                <td>2016</td>
                                <td><span className="cv-überschrift">How to do things with romance – a prologue </span> <br />by Ellen Söderhult 2016-19: MDT Stockholm, Danshallerne Copenhagen, Black Box Theatre Oslo </td>
                            </tr>
                        </tbody>
                    </table>
        
                <p className='cv-title'>Work as (choreographic) Assistance </p> 
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
        
                    <p className='cv-title'>Work as Facilitator</p> 
                    <table className="accordion-table">
                        <tbody>

                        <tr>
                                <td>2023</td>
                                <td><span className="cv-überschrift">Dance Workshop</span>  <br /> Queerfilmfestival Leipzig </td>
                            </tr>
                        <tr>
                                <td></td>
                                <td><span className="cv-überschrift">Commercial Jazz 4 Queers</span>  <br /> KUTE Studio Berlin </td>
                            </tr>
                            <tr>
                                <td>2022</td>
                                <td><span className="cv-überschrift">Drag and Jazz Dance Workshop</span>  <br /> Universität Leipzig</td>
                            </tr>
                            <tr>
                                <td>2021</td>
                                <td><span className="cv-überschrift">Improvisation for Teens</span>  <br /> Zirkus CABUWAZI Berlin</td>
                            </tr>
                            <tr>
                                <td>2015</td>
                                <td><span className="cv-überschrift">Creative Dance for Kids</span>  <br /> Jump Bilingual Kindergarten Berlin </td>
                            </tr>
                        </tbody>
                    </table>
                   
        
                   
                </>
            
            ) 
        },
        {
            title: 'CHOREOGRAPHING',
            body: (
                <>
                 <p className='accordion-text'> <i>Selected Works</i></p>
                 <p className= 'selected-work-header'>
                    Serpentine Serpentine
                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/serpentine serpentine.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />
                    <p className='accordion-text'>Work in Progress <p></p>


                <i>Serpentine serpentine never a straight line serpentine.</i> 
                Along the lines of Peaches’ song Serpentine, this research investigates the notion of creases, crumples, wrinkles and folds. Straightened things appear to function, to be correct, to be clean. Wrinkled or crumpled stuff on the other hand commonly is thought of as messy, wild or inappropriate. Serpentine Serpentine wishes to dissect this dichotomy and examine the potential of the act of crumpling. If the act of straightening stands for heteronormativity, can the act of crumpling be a queer act of resistance? How can we use choreography as a tool to research the act of straightening things out? 
                <p></p>
                Concept: Onur Agbaba and Emil Ertl <br />
                Flutgraben Berlin, 2023 <br />
                
                </p> 

                <p className= 'selected-work-header'>
                    Eigentümliche Verhältnisse
                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/eigentümliche verhältnisse 2.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />
                    <p className='accordion-text'> Essay-Film <p></p>


                    Through performative interventions, this research in essay-film format aims to reveal invisible boundaries of property relations and investigates affects coupled to them. Using the notion of property domination as a world relationship (Sachherrschaft als Weltverhältnis), <i>Eigentümliche Verhältnisse</i> seeks to challenge the manifestation of property relations and the sacredness of private property.  
                <p></p>
                Concept, Camera, Choreogaphy: Onur Agbaba,Lotta Beckers, Emil Ertl <br />
                Spoken Text: Eva von Redecker <br />
                Song: I’m a Victim of this Song – Pipilotti Rist <br />
                Fonds DAKU Recherche Förderung HAU Berlin, 2022 <br />
                Video available on request <br />
                

                </p> 


                <p className= 'selected-work-header'>
                    Eternal Betrayal
                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/eternal betrayal.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />
                      <div class="video-wrapper">
                 <iframe src="https://player.vimeo.com/video/520291775" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
                    <p className='accordion-text'> <p></p>

                    <i>Eternal Betrayal</i> is a collection of various movie scenes that all portray the same thing: a revelation of a betrayal. In film plots, these scenes classically are followed by relief and reharmonization – a narration through which societal morals are revealed. Those morals often point towards heteronormative, cis-patriarchal ideas of order and loyalty. Driven by the desire to stay with brokenness instead of seeking moralist glue to fix it with, <i>Eternal Betrayal</i> invites to soak in your tears and linger within the clarity of (heart)break.
                <p></p>
                Concept, Choreography, Performance: Emil Ertl <br />
                Performance: Renan Manhães <br />
                Song: Anna von Hausswolff <br />
                Camera: Alicja Hoppel <br />
                Dirty Debüt, Ballhaus Ost Berlin + NAH DRAN extended, ada studios Berlin 2021    <br />   
                Videodocumentation: Alicja Hoppel
                
                </p> 
              



                <p className= 'selected-work-header'>
                Outro – riding solo with u                   </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/outro1.jpeg'} 
                    alt="bild kann nicht angezeigt werden"   />

                     <div class="video-wrapper">
                 <iframe src="https://player.vimeo.com/video/679718479" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>

                    <p className='accordion-text'> <p></p>

                    <i>Outro – riding solo with u</i> is a performance made for two and danced by one. Besides dealing with relationality and long distance intimacies, this dance moves within the space between what is lost and what remains when grieving. <i>Outro – riding solo with u</i> can be thought of as a continuation of <i>Eternal Betrayal</i>.
                    <p></p>
                    Concept, Choreography, Performance, Sound: Emil Ertl <br />
                Lights: Isi Oyarzún <br />
                 Song: Describe – Perfume Genius <br />
                Broken Knee Festival at Ackerstadtpalast Berlin  <br />
                Videodocumentation: AsphaltKollektivBerlin e.V. / Lukas Hamm <br /> <p></p>
        
                <a href="https://vimeo.com/679718479" target="_blank" rel="noopener noreferrer" class="underline-link">Photos</a> <br />


                
                </p> 
               
                </>
  
            )
        },




        {
            title: 'PERFOMING',
            body: (
                <>
                <p className='accordion-text'> <i>Selected Works</i></p>
                 <p className= 'selected-work-header'>
                 
                 <i>replay</i> &nbsp; by Olympia Bukkakis 
                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/Olympia Bukkakis replay-8308.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />
                    <p className='accordion-text'><p></p>

                    Co-choreography & Performance <br />
                    Sophiensaele Berlin <br />
                    2023 <br />
                    <p></p>

                    <a href="https://www.tanzforumberlin.de/en/production/replay/" target="_blank" rel="noopener noreferrer" class="underline-link">Trailer and Credits</a> <br />



                    
                </p> 

                <p className= 'selected-work-header'>
                <i>echoes</i> &nbsp; by Ar Utke Acs

                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/echoes 2.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />

                    <div class="video-wrapper">
                    <iframe src="https://player.vimeo.com/video/629473430" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                    </div>

                    <p className='accordion-text'>  <p></p>
                    
                    MDT Stockholm, Danshallerne Copenhagen <br />2021 <br />
                    <a href="https://vimeo.com/629473430" target="_blank" rel="noopener noreferrer" class="underline-link">Trailer and Credits</a> <br />

                    Photo: Märta Thisner <br />  <p>
                    </p>
                    

                </p> 



                <p className= 'selected-work-header'>
                <i>DUNKA DUNKA</i> &nbsp; remix by Ellen Söderhult                </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/dunkadunka.00_44_36_19.Still036(1).jpeg'} 
                    alt="bild kann nicht angezeigt werden"   />

                <div class="video-wrapper">
                <iframe src="https://player.vimeo.com/video/708406231" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                </div>
                    <p className='accordion-text'> <p></p>


                Heizhaus Berlin <br />
                2021 <br />
                <a href="https://vimeo.com/708406231" target="_blank" rel="noopener noreferrer" class="underline-link">Trailer and Credits</a> <br /> <p></p>
                
                
                </p> 


                



                <p className= 'selected-work-header'>
                How to do things with romance – a prologue by Ellen Söderhult   </p>
                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/how to do things with romance 2.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />

                    <div class="video-wrapper">
                     <iframe src="https://player.vimeo.com/video/297615719" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>
                     </div>

                    <p className='accordion-text'> <p></p>

                     MDT Stockholm, Danshallerne Copenhagen, Black Box Theatre Oslo, Palladium Malmö <br /> 2016-2021 <br />
                     <a href="https://vimeo.com/297615719" target="_blank" rel="noopener noreferrer" class="underline-link">Trailer and Credits</a> <br />
                     <p> </p>

                    

                     

                
                </p> 
                
                </>
  
            )
        },

        {
            title: 'FACILITATING',
            body: (
                <>

                <img 
                    className='image-content' 
                    src={process.env.PUBLIC_URL + '/teaching3.jpg'} 
                    alt="bild kann nicht angezeigt werden"   />
                    <p className='accordion-text'><p></p>

                    Emil is facilitating dance workshops both in institutions as well as community-oriented organizations. The content of their classes varies from each occasion and are puzzled together with improvisation techniques, movement research, commercial jazz dance, instant composition practices and a good sprinkle of 90s pop music. <p></p>

                   
                    
                </p>
            
                
                </>
  
            )
        },


       

        {
            title: 'GET IN TOUCH',
            body: (
                <>
                    <p className='accordion-text'><p></p>

                    

                    
                    <a href="mailto:amertl.mails@gmail.com" class="underline-link" target="_blank" rel="noopener noreferrer">MAIL</a>
            <br />

            {/* Vimeo Link */}
            <a href="https://vimeo.com/emilertl" class="underline-link" target="_blank" rel="noopener noreferrer">VIMEO</a>
            <br />

            {/* Instagram Link */}
            <a href="https://instagram.com/emxi_maux?igshid=MzRlODBiNWFlZA=="  class="underline-link"target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                    
                </p>
            
                
                </>
  
            )
        },


        {
            title: 'IMPRINT',
            body: (
                <>
                    <p className='accordion-text'> © Emil Maria Ertl 2023 <br /> <p></p>

c/o Studio13 e.V. <br />
Ziegrastraße 13  <br />
12057 Berlin  <br /> <p></p>

amertl.mails[at]gmail.com <br />

Webdesign and Programming: Paul Dombrowski <br /> <p></p>



Images: <br />
ABOUT + FACILITATING: Đôn Hoang <br />
SERPENTINE SERPENTINE: Onur Agbaba <br />
ETERNAL BETRAYAL: Anna Agliardi <br />
OUTRO: Jim Mafrim  <br />
REPLAY: Maya Wallraff  <br />
                on photo: Olympia Bukkakis, The Darvish, Emil Ertl <br />
ECHOES: Märta Thisner <br />
DUNKA DUNKA: Camille Lacadee <br />
                            On photo: Ellen Söderhult, Emil Ertl <br />
HOW TO DO THINGS WITH ROMANCE: Olle Ehn Hillberg <br />
                                                        On photo: Elise Sjöberg, Michelle Persson, Oda Brekke, Stina Ehn, Sarah Kebedech Ziebe, Emil Ertl <br /> <p></p>




Haftungsausschluss: Die Inhalte dieser Seiten sind mit größter Sorgfalt erstellt. Der Autor übernimmt keine Gewähr für Aktualität, Richtigkeit und Vollständigkeit der auf dieser Website bereitgestellten Angaben. Die Seite enthält Links zu externen Webseiten Dritter, auf deren Inhalte keinerlei Einfluss besteht. Deshalb wird für diese Inhalte keine Gewähr übernommen. Für die Inhalte der verlinkten Seiten ist ausschließlich der jeweilige Anbieter bzw. Betreiber der Seiten verantwortlich; alle verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zu diesem Zeitpunkt nicht erkennbar. Eine andauernde inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend entfernt.Die Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb dieser Seite bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur zu privaten Zwecken gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere sind Inhalte Dritter als solche gekennzeichnet. Sollten Sie dennoch auf eine Urheberrechtsverletzung aufmerksam werden, wird um Hinweis gebeten. Bei Bekanntwerden von Rechtsverletzungen werden derartige Inhalte umgehend entfernt.Die Nutzung der Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Der Nutzung der hier veröffentlichten Kontaktinformationen durch Dritte zur Übersendung von nicht bestellter Werbung und Informationsmaterialien wird hiermit widersprochen.
</p>


      
                
                </>
  
            )
        },
        

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
                                    exit={{ opacity: 0, height: 0 }}
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