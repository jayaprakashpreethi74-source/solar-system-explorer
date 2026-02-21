import { useState, useEffect } from 'react';
import { TextureLoader, SRGBColorSpace } from 'three';

/**
 * Robust texture loader with fallback state.
 * @param {string} url - The texture URL to load.
 * @returns {object} { texture, error }
 */
export const useTextureWithFallback = (url) => {
    const [texture, setTexture] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!url) return;
        const loader = new TextureLoader();
        loader.load(
            url,
            (tex) => {
                tex.colorSpace = SRGBColorSpace;
                setTexture(tex);
                setError(false);
            },
            undefined, // onProgress
            (err) => {
                console.warn(`Fallback: Texture failed for ${url}. Using procedural color.`);
                setError(true);
            }
        );
    }, [url]);

    return { texture, error };
};
