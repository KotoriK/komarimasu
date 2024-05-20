/// <reference types="astro/client" />
declare module 'virtual:pwa-info' {
    export const pwaInfo: {
        webManifest: {
            linkTag: string;
        };
    };
}
declare module 'virtual:pwa-register' {
    export function registerSW(option: Record<string, any>): void;
}