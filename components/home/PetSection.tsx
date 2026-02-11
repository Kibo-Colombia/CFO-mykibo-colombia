'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface MascotMessage {
    text: string;
    mood: 'normal' | 'happy' | 'sad' | 'pleased';
}

interface MascotSectionProps {
    investmentPercentage: number;
    pendingPercentage: number;
    userName?: string;
    mascotTypeOverride?: string;
}

// Default to Kibo if nothing selected
const DEFAULT_PET = 'kibo';
const DEFAULT_NAME = 'Kibo';

interface PetMessage {
    text: string;
    mood: 'normal' | 'happy' | 'sad' | 'pleased';
}

interface PetSectionProps {
    investmentPercentage: number;
    pendingPercentage: number;
    userName?: string;
    petTypeOverride?: string;
}

const getPetMessages = (
    investmentPercentage: number,
    pendingPercentage: number
): PetMessage[] => {
    const messages: PetMessage[] = [];

    // Primary message based on investment health
    if (investmentPercentage >= 80) {
        messages.push({
            text: "¡Excelente! Estás invirtiendo muy bien tu dinero 🎉",
            mood: 'happy'
        });
    } else if (investmentPercentage >= 50) {
        messages.push({
            text: "¡Vas por buen camino! Sigue así 💪",
            mood: 'pleased'
        });
    } else if (investmentPercentage >= 25) {
        messages.push({
            text: "Aún tienes margen para invertir más. ¡Tú puedes!",
            mood: 'normal'
        });
    } else {
        messages.push({
            text: "¡Animo! Cada pequeño paso cuenta para tu futuro 🌱",
            mood: 'sad'
        });
    }

    // Secondary motivational messages
    if (pendingPercentage > 50) {
        messages.push({
            text: "Tienes buenos fondos disponibles. ¿Consideraste invertir más?",
            mood: 'normal'
        });
    }

    return messages;
};

const getPetImage = (type: string, mood: 'normal' | 'happy' | 'sad' | 'pleased'): string => {
    return `/pet/${type}/${mood}.png`;
};

export function PetSection({ investmentPercentage, pendingPercentage, userName, petTypeOverride }: PetSectionProps) {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Pet state
    const [petType, setPetType] = useState(petTypeOverride || DEFAULT_PET);
    const [petName, setPetName] = useState(DEFAULT_NAME);

    useEffect(() => {
        // If override is present, do not respect local storage
        if (petTypeOverride) {
            setPetType(petTypeOverride);
            // Capitalize first letter for name
            setPetName(petTypeOverride.charAt(0).toUpperCase() + petTypeOverride.slice(1));
            return;
        }

        // Otherwise load from local storage, or use defaults for new users
        const storedType = localStorage.getItem('pet_type') || localStorage.getItem('mascot_type');
        const storedName = localStorage.getItem('pet_name') || localStorage.getItem('mascot_name');

        if (storedType) {
            setPetType(storedType);
            // Migrate if needed
            if (!localStorage.getItem('pet_type')) {
                localStorage.setItem('pet_type', storedType);
            }
        } else {
            // New user - ensure default is set
            setPetType(DEFAULT_PET);
        }

        if (storedName) {
            setPetName(storedName);
            // Migrate if needed
            if (!localStorage.getItem('pet_name')) {
                localStorage.setItem('pet_name', storedName);
            }
        } else {
            // New user - ensure default is set
            setPetName(DEFAULT_NAME);
        }
    }, [petTypeOverride]);

    const messages = getPetMessages(investmentPercentage, pendingPercentage);
    const currentMessage = messages[currentMessageIndex];

    // Rotate messages every 5 seconds
    useEffect(() => {
        if (messages.length <= 1) return;

        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
                setIsAnimating(false);
            }, 300);
        }, 5000);

        return () => clearInterval(interval);
    }, [messages.length]);

    return (
        <div className="relative flex flex-col items-center">
            {/* Speech Bubble */}
            <div
                className={`
          relative mb-1 p-4 rounded-2xl
          bg-card
          border backdrop-blur-sm
          w-full max-w-sm min-h-[80px]
          shadow-[0_4px_12px_rgba(0,0,0,0.2)]
          transition-all duration-300
          ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
        `}
                style={{ borderColor: 'var(--color-total)' }}
            >


                {/* Message content */}
                <p className="text-white text-sm font-medium leading-relaxed text-center">
                    {currentMessage?.text}
                </p>

                {/* Message indicators */}
                {messages.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-3">
                        {messages.map((_, index) => (
                            <div
                                key={index}
                                className={`
                  w-1.5 h-1.5 rounded-full transition-all duration-300
                  ${index === currentMessageIndex
                                        ? 'bg-kibo-blue w-4'
                                        : 'bg-kibo-blue/30'}
                `}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Separated Arrow Pointer */}
            <div className="mb-4">
                <div
                    className="w-0 h-0
                     border-l-[12px] border-l-transparent
                     border-r-[12px] border-r-transparent
                     border-t-[14px]"
                    style={{
                        borderTopColor: 'var(--color-total)',
                        filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'
                    }}
                />
            </div>

            {/* Pet Image */}
            <div className="relative animate-float">
                {/* Glow effect behind pet */}
                <div
                    className={`
            absolute inset-0 rounded-full blur-3xl opacity-30
            ${currentMessage?.mood === 'happy' ? 'bg-kibo-purple' :
                            currentMessage?.mood === 'sad' ? 'bg-kibo-red' :
                                currentMessage?.mood === 'pleased' ? 'bg-kibo-blue' :
                                    'bg-kibo-teal'}
          `}
                />

                {/* Pet container with animation */}
                <div
                    className="relative w-32 h-32 md:w-40 md:h-40 
                     transition-transform duration-500 hover:scale-105
                     drop-shadow-[0_0_10px_rgba(169,217,199,0.2)]"
                >
                    <Image
                        src={getPetImage(petType, currentMessage?.mood || 'normal')}
                        alt={`${petName} - Tu mascota financiera`}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Floating particles around pet */}
                <div className="absolute -top-2 -right-2 w-2 h-2 bg-kibo-teal rounded-full animate-pulse" />
                <div className="absolute top-4 -left-3 w-1.5 h-1.5 bg-kibo-purple rounded-full animate-pulse delay-300" />
                <div className="absolute -bottom-1 right-4 w-1 h-1 bg-kibo-red rounded-full animate-pulse delay-500" />
            </div>
        </div>
    );
}
