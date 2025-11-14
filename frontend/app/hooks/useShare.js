import { useMemo } from "react";

export default function useShare(text, url = window.location.href) {
    return useMemo(() => {
        if (!text) return null;

        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(url);

        return {
            twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
            reddit: `https://www.reddit.com/submit?title=${encodedText}&text=${encodedText}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
            whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
            telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
            email: `mailto:?subject=${encodedText}&body=${encodedText}%0A${encodedUrl}`,
        };
    }, [text, url]);
}
