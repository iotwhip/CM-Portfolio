
import React, { useState, useCallback } from 'react';
import { generateCreativeBrief } from '../services/geminiService';

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);


const Booking: React.FC = () => {
    const [hours, setHours] = useState<number>(1);
    const [ideaPrompt, setIdeaPrompt] = useState<string>('');
    const [generatedBrief, setGeneratedBrief] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isBooked, setIsBooked] = useState<boolean>(false);

    const handleGenerateBrief = useCallback(async () => {
        if (!ideaPrompt.trim()) {
            setError('Please enter an idea first.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedBrief('');
        const brief = await generateCreativeBrief(ideaPrompt);
        setGeneratedBrief(brief);
        setIsLoading(false);
    }, [ideaPrompt]);

    const handleBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setIsBooked(true);
    };

    const cost = Math.max(1, hours) * 50;

    if (isBooked) {
        return (
            <div className="text-center p-8 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-3xl font-bold text-green-400">Thank you for your booking!</h3>
                <p className="text-slate-300 mt-4">I will get back to you via email within 24 hours to confirm the details.</p>
                <button
                    onClick={() => setIsBooked(false)}
                    className="mt-6 bg-cyan-500 text-black font-bold py-2 px-6 rounded-lg hover:bg-cyan-400 transition-colors"
                >
                    Make Another Booking
                </button>
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">Let's Create Together</h3>
                <p className="text-slate-400 text-lg">
                    Book my AI content creation services to bring your vision to life. Whether it's for branding, art, or marketing, I can help you craft stunning visuals.
                </p>
                <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                    <h4 className="font-bold text-xl text-white mb-2">Need Inspiration?</h4>
                    <p className="text-slate-400 mb-4">Use my AI-powered idea generator to craft a creative brief for your project.</p>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={ideaPrompt}
                            onChange={(e) => setIdeaPrompt(e.target.value)}
                            placeholder="e.g., a cybernetic forest at dusk"
                            className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        />
                        <button
                            onClick={handleGenerateBrief}
                            disabled={isLoading}
                            className="w-full flex items-center justify-center gap-2 bg-fuchsia-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-fuchsia-500 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Generating...' : 'Generate Creative Brief'}
                            {!isLoading && <SparklesIcon className="w-5 h-5" />}
                        </button>
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        {generatedBrief && (
                            <textarea
                                readOnly
                                value={generatedBrief}
                                className="w-full h-32 bg-slate-900 border border-slate-700 rounded-md p-4 text-slate-300 text-sm resize-none"
                            />
                        )}
                    </div>
                </div>
            </div>

            <form onSubmit={handleBooking} className="p-8 bg-slate-800/50 rounded-lg border border-slate-700 space-y-6">
                 <h4 className="font-bold text-2xl text-white mb-4">Booking Form</h4>
                <div className="space-y-2">
                    <label htmlFor="name" className="text-slate-300 font-medium">Full Name</label>
                    <input id="name" type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                 <div className="space-y-2">
                    <label htmlFor="email" className="text-slate-300 font-medium">Email Address</label>
                    <input id="email" type="email" required className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
                </div>
                 <div className="space-y-2">
                    <label htmlFor="details" className="text-slate-300 font-medium">Project Details</label>
                    <textarea id="details" rows={4} required placeholder="Tell me about your project. You can paste the generated brief here." className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-y"></textarea>
                </div>
                <div className="space-y-2">
                    <label htmlFor="hours" className="text-slate-300 font-medium">Estimated Hours</label>
                    <input
                        id="hours"
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        min="1"
                        className="w-full bg-slate-900 border border-slate-700 rounded-md px-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                    />
                </div>
                <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
                    <p className="text-slate-300">Minimum rate: $50/hour</p>
                    <p className="text-2xl font-bold text-white">Total: <span className="text-cyan-400">${cost.toFixed(2)}</span></p>
                </div>
                <button type="submit" className="w-full bg-cyan-500 text-black font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors text-lg">
                    Book Now
                </button>
            </form>
        </div>
    );
};

export default Booking;
