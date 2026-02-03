import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import '../App.css';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from './SmartImage';

function AccordionWithContent() {
    const [activeIndex, setActiveIndex] = useState(null);
    const [siteContent, setSiteContent] = useState(null);
    const accordionHeaderRefs = useRef([]);
    const scrollTimeoutRef = useRef(null);

    const scheduleScrollToHeader = useCallback((index) => {
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
            const headerEl = accordionHeaderRefs.current[index];

            if (!headerEl) {
                return;
            }

            const headerPosition = headerEl.getBoundingClientRect().top + window.scrollY;
            const offset = 50;
            const scrollToPosition = headerPosition - offset;

            window.scrollTo({
                top: scrollToPosition,
                behavior: 'smooth'
            });
        }, 400);
    }, []);

    const handleHeaderClick = useCallback((index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
            return;
        }

        setActiveIndex(index);
        scheduleScrollToHeader(index);
    }, [activeIndex, scheduleScrollToHeader]);

    const closePanel = useCallback((index) => {
        setActiveIndex(null);
        const trigger = accordionHeaderRefs.current[index];
        if (trigger && typeof trigger.focus === 'function') {
            trigger.focus({ preventScroll: true });
        }
    }, []);

    useEffect(() => {
        const handlePopState = () => {
            setActiveIndex(null);
        };

        window.history.replaceState({ panelOpen: false }, '', window.location.href);
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    useEffect(() => {
        if (activeIndex === null) {
            return;
        }
        window.history.pushState({ panelOpen: true }, '', window.location.href);
    }, [activeIndex]);

    useEffect(() => {
        const overlay = document.querySelector('.background-overlay');
        const body = document.body;
        const isMenuOpen = activeIndex !== null;

        if (overlay) {
            overlay.classList.toggle('menu-open', isMenuOpen);
        }
        if (body) {
            body.classList.toggle('menu-open', isMenuOpen);
        }

        return () => {
            if (overlay) {
                overlay.classList.remove('menu-open');
            }
            if (body) {
                body.classList.remove('menu-open');
            }
        };
    }, [activeIndex]);

    useEffect(() => {
        return () => {
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let isMounted = true;
        fetch(`${process.env.PUBLIC_URL}/content/site.json`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted) {
                    setSiteContent(data);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setSiteContent(null);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const renderTextLines = useCallback((text, className = 'accordion-text') => {
        if (!text) {
            return null;
        }

        const lines = String(text).split('\n');
        return (
            <p className={className}>
                {lines.map((line, index) => (
                    <span key={`${line}-${index}`}>
                        {line}
                        {index < lines.length - 1 ? <br /> : null}
                    </span>
                ))}
            </p>
        );
    }, []);

    const renderParagraphs = useCallback((paragraphs) => {
        if (!Array.isArray(paragraphs)) {
            return null;
        }

        return paragraphs.map((paragraph, index) => (
            <React.Fragment key={`${paragraph}-${index}`}>
                {renderTextLines(paragraph)}
            </React.Fragment>
        ));
    }, [renderTextLines]);

    const renderCvTable = useCallback((items) => {
        if (!Array.isArray(items)) {
            return null;
        }

        return (
            <table className="accordion-table">
                <tbody>
                    {items.map((item, index) => (
                        <tr key={`${item.title}-${index}`}>
                            <td>{item.year}</td>
                            <td>
                                <span className="cv-überschrift">{item.title}</span>
                                <br />
                                {item.venue}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }, []);

    const getVimeoEmbedUrl = useCallback((url) => {
        if (!url) {
            return null;
        }

        if (url.includes('player.vimeo.com')) {
            return url;
        }

        const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (match && match[1]) {
            return `https://player.vimeo.com/video/${match[1]}`;
        }

        return url;
    }, []);

    const renderWork = useCallback((work) => {
        if (!work) {
            return null;
        }

        const embedUrl = getVimeoEmbedUrl(work.videoUrl);
        const renderDetailLine = (detail, index) => {
            const match = String(detail).match(/(https?:\/\/\S+)/);
            if (match) {
                const url = match[1];
                const label = String(detail).replace(url, '').replace(/[:\\s]+$/, '').trim() || 'Link';
                return (
                    <span key={`${work.title}-detail-${index}`}>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline-link"
                        >
                            {label}
                        </a>
                        <br />
                    </span>
                );
            }

            return (
                <span key={`${work.title}-detail-${index}`}>
                    {detail}
                    <br />
                </span>
            );
        };

        return (
            <React.Fragment key={`${work.title}-${work.subtitle || ''}`}>
                <p className="selected-work-header">
                    <i>{work.title}</i>
                    {work.subtitle ? ` ${work.subtitle}` : null}
                </p>
                {work.image ? (
                    <SmartImage
                        className="image-content"
                        src={`${process.env.PUBLIC_URL}${work.image}`}
                        alt={work.imageAlt || work.title}
                    />
                ) : null}
                {embedUrl ? (
                    <div className="video-wrapper">
                        <iframe
                            src={embedUrl}
                            title={`${work.title} video`}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                ) : null}
                {Array.isArray(work.details) && work.details.length > 0 ? (
                    <p className="accordion-text">
                        {work.details.map((detail, index) => renderDetailLine(detail, index))}
                    </p>
                ) : null}
                {Array.isArray(work.links) && work.links.length > 0 ? (
                    <p className="accordion-text">
                        {work.links.map((link, index) => (
                            <span key={`${work.title}-link-${index}`}>
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline-link"
                                >
                                    {link.label}
                                </a>
                                <br />
                            </span>
                        ))}
                    </p>
                ) : null}
            </React.Fragment>
        );
    }, [getVimeoEmbedUrl]);

    const content = useMemo(() => {
        if (!siteContent) {
            return [
                {
                    title: 'Loading',
                    body: <p className="accordion-text">Loading content...</p>
                }
            ];
        }

        return [
            {
                title: siteContent.about?.title || 'About',
                body: (
                    <>
                        {siteContent.about?.image ? (
                            <SmartImage
                                className="image-content"
                                src={`${process.env.PUBLIC_URL}${siteContent.about.image}`}
                                alt={siteContent.about.imageAlt || siteContent.about.title}
                            />
                        ) : null}
                        {renderParagraphs(siteContent.about?.paragraphs)}
                    </>
                )
            },
            {
                title: 'CV',
                body: (
                    <>
                        <p className="cv-title">Education and Scholarships</p>
                        {renderCvTable(siteContent.cv?.education)}

                        <p className="cv-title">Work as Choreographer</p>
                        {renderCvTable(siteContent.cv?.choreographer)}

                        <p className="cv-title">Work as Performer</p>
                        {renderCvTable(siteContent.cv?.performer)}

                        <p className="cv-title">Work as choreographic Outside Eye / Assistance</p>
                        {renderCvTable(siteContent.cv?.outsideEye)}

                        <p className="cv-title">Work as Pedagogue</p>
                        {renderCvTable(siteContent.cv?.pedagogue)}
                    </>
                )
            },
            {
                title: 'Performing',
                body: (
                    <>
                        {siteContent.performing?.intro ? (
                            renderTextLines(siteContent.performing.intro, 'accordion-text')
                        ) : null}
                        {siteContent.performing?.works?.map((work) => renderWork(work))}
                    </>
                )
            },
            {
                title: 'Choreographing',
                body: (
                    <>
                        {siteContent.choreographing?.intro ? (
                            renderTextLines(siteContent.choreographing.intro, 'accordion-text')
                        ) : null}
                        {siteContent.choreographing?.works?.map((work) => renderWork(work))}
                    </>
                )
            },
            {
                title: 'Facilitating',
                body: (
                    <>
                        {siteContent.facilitating?.image ? (
                            <SmartImage
                                className="image-content"
                                src={`${process.env.PUBLIC_URL}${siteContent.facilitating.image}`}
                                alt={siteContent.facilitating.imageAlt || 'Facilitating'}
                            />
                        ) : null}
                        {renderParagraphs(siteContent.facilitating?.paragraphs)}
                    </>
                )
            },
            {
                title: 'Get in touch',
                body: (
                    <>
                        <p className="accordion-text">
                            {siteContent.contact?.links?.map((link, index) => (
                                <span key={`${link.label}-${index}`}>
                                    <a
                                        href={link.url}
                                        className="underline-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.label}
                                    </a>
                                    <br />
                                </span>
                            ))}
                        </p>
                    </>
                )
            },
            {
                title: 'Imprint',
                body: (
                    <>
                        {renderParagraphs(siteContent.imprint?.paragraphs)}
                    </>
                )
            }
        ];
    }, [renderCvTable, renderParagraphs, renderTextLines, renderWork, siteContent]);

     return (
        <div>
            <div className="akkordion-wrapper">
                <motion.div
                    className="accordion"
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: { staggerChildren: 0.12, delayChildren: 0.15 }
                        }
                    }}
                >
                {content.map((item, index) => {
                    const headerId = `accordion-header-${index}`;
                    const panelId = `accordion-panel-${index}`;
                    const isActive = activeIndex === index;

                    return (
                        <motion.div
                            key={item.title}
                            className="accordion-item"
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.1, 1] }}
                        >
                            <button
                                type="button"
                                className={`accordion-header${isActive ? ' active' : ''}`}
                                ref={(el) => {
                                    if (el) {
                                        accordionHeaderRefs.current[index] = el;
                                    } else {
                                        delete accordionHeaderRefs.current[index];
                                    }
                                }}
                                onClick={() => handleHeaderClick(index)}
                                aria-expanded={isActive}
                                aria-controls={panelId}
                                id={headerId}
                                style={{ zIndex: 20 }}
                            >
                                <span className="accordion-header__text">
                                    {item.title}
                                </span>
                            </button>
                            <AnimatePresence initial={false}>
                                {isActive && (
                                    <motion.div
                                        key={panelId}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="accordion-body"
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={headerId}
                                        style={{ zIndex: 0 }}
                                    >
                                        <div className="accordion-body__topline">
                                            <button
                                                type="button"
                                                className="accordion-close"
                                                onClick={() => closePanel(index)}
                                                aria-label={`${item.title} schließen`}
                                            >
                                                ×
                                            </button>
                                        </div>
                                        {item.body}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
                </motion.div>
            </div>
        </div>
    );
}

export default AccordionWithContent;
