/**
 * Entry dedicado SOLO para las variantes con audio ("<Id>-A").
 * Aísla el render del Root principal para no depender de archivos en progreso
 * de otras sesiones (ej. un componente a medio escribir rompería el bundle).
 * Render: npx remotion render src/audio/audioRoot.tsx <Id>-A out/...
 */
import '../index.css';
import React from 'react';
import { registerRoot } from 'remotion';
import { AudioCompositions } from './AudioCompositions';

const AudioRoot: React.FC = () => <AudioCompositions />;

registerRoot(AudioRoot);
