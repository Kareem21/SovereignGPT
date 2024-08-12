import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

const FAQs = [
    "What are the main benefits of a freezone company over a mainland company?",
    "Tell me about Partner pro group.",
    "What are the bare minimum requirements to form a new company in Saudi Arabia?",
    "If I open an online business in the UAE, how do I proceed?",
    "Is it legal to accept payments for a Saudi company without registering it?",
];

function App() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const typewriterEffect = (text, callback) => {
        let index = 0;
        const interval = setInterval(() => {
            setMessages(prevMessages => {
                const lastMessage = prevMessages[prevMessages.length - 1];
                const updatedMessage = { ...lastMessage, content: lastMessage.content + text[index] };
                return [...prevMessages.slice(0, -1), updatedMessage];
            });
            index++;
            if (index === text.length) {
                clearInterval(interval);
                callback();
            }
        }, 50); // Adjust the speed of the typewriter effect here
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setMessages(prevMessages => [...prevMessages, { type: 'question', content: input }]);
        setInput('');

        try {
            const response = await axios.post(`http://127.0.0.1:8080/ask`, { question: input });
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: '' }]);
            typewriterEffect(response.data.answer, () => setIsLoading(false));
        } catch (error) {
            console.error('Error:', error);
            setMessages(prevMessages => [...prevMessages, { type: 'answer', content: 'An error occurred. Please try again.' }]);
            setIsLoading(false);
        }
    };

    const handleFAQClick = (question) => {
        setInput(question);
    };

    return (
        <div className="app">
            <header>
                <img src="assets/logo.gif" alt="Logo" className="logo" />
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
                            style={{ flexGrow: 1 }}
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? '...' : 'Send'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
