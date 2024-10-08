import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

const FAQs = [
    "What are the main benefits of a freezone company over a mainland company?",
    "Tell me about Partner pro group.",
    "What are the bare minimum requirements to form a new company in Saudi Arabia?",
    "If I open an online business in the UAE, how do i proceed?",
    "Is it legal to accept payments for a Saudi company without registering it?",
];

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFAQOpen, setIsFAQOpen] = useState(false);
    const messagesEndRef = useRef(null);

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
            const response = await axios.post(`https://chatbot9000-f6e8117d2921.herokuapp.com/ask`, { question: input });
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: response.data.answer }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: 'An error occurred. Please try again.' }]);
        }

        setIsLoading(false);
    };

    const handleFAQClick = (question) => {
        setInput(question);
        setIsFAQOpen(false);
    };

    return (
        <div>
            <Navbar />
            <div className="app">
                <header>
                    <h1><span className="title-white">Sovereign</span><span className="title-red">GPT</span></h1>
                </header>
                <div className="content">
                    <div className={`faq-section ${isFAQOpen ? 'open' : ''}`}>
                        <h2>Frequently Asked Questions</h2>
                        <div className="faq-toggle" onClick={() => setIsFAQOpen(!isFAQOpen)}>
                            <span>Frequently Asked Questions</span>
                            <span className={`faq-toggle-icon ${isFAQOpen ? 'open' : ''}`}>
                                {isFAQOpen ? '▲' : '▼'}
                            </span>
                        </div>
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
                <div className="who-we-are">
                    <h2>Who We Are</h2>
                    <p>
                        Sovereign stands out as a premier independent provider of corporate, private client,
                        and retirement planning services. With over 20,000 structures under management and
                        assets exceeding £20 billion, they cater to a diverse clientele including companies,
                        entrepreneurs, private investors, and high net worth individuals.
                        ...
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default App;