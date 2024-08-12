import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import { Icon } from '@iconify/react';
import instagramIcon from '@iconify-icons/mdi/instagram';
import facebookIcon from '@iconify-icons/mdi/facebook';

const FAQs = [
    "What are the main benefits of a freezone company over a mainland company?",
    "Tell me about Partner pro group.",
    "What are the bare minimum requirements to form a new company in Saudi Arabia?",
    "If I open an online business in the UAE, how do i proceed?",
    "is it legal to accept payments for a Saudi company without registering it?",
];

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const sovereignText = `
        Sovereign stands out as a premier independent provider of corporate, private client, and retirement planning services. With over 20,000 structures under management and assets exceeding £20 billion, they cater to a diverse clientele including companies, entrepreneurs, private investors, and high net worth individuals. Their expertise spans three core areas: Sovereign Corporate Services, which assists companies in establishing and managing operations across major jurisdictions; Sovereign Private Client Services, offering wealth protection and succession planning for internationally mobile families and entrepreneurs; and Sovereign Retirement Planning, providing flexible and portable pension solutions. With a presence in more than 20 jurisdictions worldwide, Sovereign specializes in delivering integrated advice and services to clients with complex international needs. Their comprehensive offerings range from company formation and back-office solutions to wealth management, foreign property ownership, and yacht and aircraft registration. Sovereign's commitment to excellence and innovation has positioned them as industry leaders, particularly in pension scheme administration and transfers. Sovereign's team of in-house specialists and qualified actuaries ensures that clients receive tailored solutions that can adapt to changing circumstances over time. Whether it's corporate structuring, wealth protection, or retirement planning, Sovereign provides the expertise and global reach to help clients generate, structure, and protect their assets efficiently across borders.
    `;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setMessages(prevMessages => [...prevMessages, { type: 'question', content: input }]);
        setInput('');

        try {
            const response = await axios.post(`http://127.0.0.1:8080/ask`, { question: input });
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: response.data.answer }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: 'An error occurred. Please try again.' }]);
        }

        setIsLoading(false);
    };

    const handleFAQClick = (question) => {
        setInput(question);
    };

    return (
        <div className="app">
            <nav className="navbar">
                <a href="#" onClick={() => window.location.reload()}>Home</a>
                <a href="https://www.sovereigngroup.com/our-services/" target="_blank" rel="noopener noreferrer">Sovereign Group</a>
                <a href="#contact">Contact</a>
            </nav>
            <header>
                <h1><span className="title-white">Sovereign</span><span className="title-red">GPT</span></h1>
            </header>
            <div className="content">
                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <ul className="faq-list">
                        {FAQs.map((question, index) => (
                            <li key={index} className="faq-item" onClick={() => handleFAQClick(question)}>{question}</li>
                        ))}
                    </ul>
                </div>
                <div className="chat-section">
                    <div className="messages">
                        {messages.map((message, index) => (
                            <div key={index} className={`message ${message.type}`}>
                                <strong>{message.type === 'question' ? 'Q: ' : 'A: '}</strong>
                                {message.content}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? '...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
            <div className="sovereign-wrapper">
                <h2>Who We Are</h2>
                <div className="sovereign-section">
                    <p>{sovereignText}</p>
                </div>
            </div>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <h4>Explore</h4>
                        <ul>
                            <li><a href="#">Chatbot</a></li>
                            <li><a href="#">Sovereign group</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#contact">Contact us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact us</h4>
                        <ul>
                            <li>
                                <a href="#">
                                    <Icon icon={instagramIcon} fontSize="24px"/>
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Icon icon={facebookIcon} fontSize="24px"/>
                                    Facebook
                                </a>
                            </li>
                            <li><a href="mailto:sovereignemail@gmail.com">Sovereignemail@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 SovereignGPT. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
