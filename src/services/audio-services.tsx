export function speak(text: string, language = 'en-US') {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);

        const voices = window.speechSynthesis.getVoices();
        utterance.voice = voices.find(voice => voice.lang === language) || voices[0];
    
        utterance.lang = language; 
        utterance.pitch = 0; // Висота голосу (0 до 2)
        utterance.rate = 1;  // Швидкість мовлення (0.1 до 10)
        utterance.volume = 1; // Гучність (0 до 1)

        // Озвучення тексту
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Ваш браузер не підтримує відтворення аудіо');
    }
}

