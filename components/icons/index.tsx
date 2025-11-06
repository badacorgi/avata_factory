import React from 'react';

// Bodies
export const Body1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><circle cx="50" cy="50" r="45" fill="currentColor"/></svg>
);
export const Body2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><rect x="20" y="10" width="60" height="80" rx="30" fill="currentColor"/></svg>
);
export const Body3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><rect x="10" y="10" width="80" height="80" rx="10" fill="currentColor"/></svg>
);
export const Body4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M50 5 L61.2 35.5 H95 L71.9 55.4 L83 85 L50 65 L17 85 L28.1 55.4 L5 35.5 H38.8 Z" fill="currentColor"/></svg>
);
export const Body5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M85 50 C85 77.6 62.6 100 35 100 S-15 77.6 -15 50 S8.4 0 35 0 S85 22.4 85 50 Z" fill="currentColor"/></svg>
);


// Hairs
export const Hair1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M10,40 Q50,0 90,40 L90,30 Q50,-10 10,30 Z" fill="currentColor"/></svg>
);
export const Hair2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M20,45 A30,30 0 0,1 80,45 L80,20 L20,20 Z" fill="currentColor"/></svg>
);
export const Hair3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><rect x="25" y="15" width="50" height="30" rx="5" fill="currentColor"/></svg>
);
export const Hair4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><path d="M48,20 Q50,10 52,20 L55,10 L50,0 L45,10 Z M45,25 C40,15 60,15 55,25" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>
);
export const Hair5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><path d="M20,40 L30,20 L40,40 L50,15 L60,40 L70,20 L80,40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/></svg>
);
export const Hair6: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><path d="M65,25 A10,5 0 0,1 75,30" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
);
export const Hair7: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><g fill="currentColor"><path d="M10,30 C0,40 15,55 15,45 L25,30 Z"/><path d="M90,30 C100,40 85,55 85,45 L75,30 Z"/></g></svg>
);


// Eyes
export const Eyes1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><g fill="currentColor"><circle cx="35" cy="50" r="5"/><circle cx="65" cy="50" r="5"/><circle cx="37" cy="48" r="1.5" fill="white"/><circle cx="67" cy="48" r="1.5" fill="white"/></g></svg>
);
export const Eyes2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><g fill="none" stroke="currentColor" strokeWidth="3"><path d="M30 45 L40 55 M40 45 L30 55"/><path d="M60 45 L70 55 M70 45 L60 55"/></g></svg>
);
export const Eyes3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><g fill="currentColor"><circle cx="40" cy="50" r="2"/><circle cx="60" cy="50" r="2"/></g></svg>
);
export const Eyes4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><g fill="currentColor"><path d="M35 45 C 25 45, 25 60, 35 60 C 45 60, 45 45, 35 45 M 65 45 C 55 45, 55 60, 65 60 C 75 60, 75 45, 65 45" /></g></svg>
);
export const Eyes5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><g><circle cx="35" cy="50" r="8" fill="currentColor"/><circle cx="65" cy="50" r="8" fill="currentColor"/><circle cx="38" cy="53" r="3" fill="black"/><circle cx="62" cy="47" r="3" fill="black"/></g></svg>
);
export const Eyes6: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><g><circle cx="50" cy="50" r="10" fill="currentColor"/><circle cx="50" cy="50" r="4" fill="black"/></g></svg>
);
export const Eyes7: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><g fill="currentColor"><path d="M30 50 C35 45, 45 45, 50 50 C45 55, 35 55, 30 50 Z M70 50 C75 45, 85 45, 90 50 C85 55, 75 55, 70 50 Z"/><path d="M40,55 Q42,65 38,70"/><path d="M80,55 Q82,65 78,70"/></g></svg>
);

// Accessories
export const Acc1: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M75 25 L85 15 L85 35 Z M75 25 L65 15 L65 35 Z" fill="currentColor"/></svg>
);
export const Acc2: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><path d="M35,65 Q50,75 65,65 Q50,70 35,65" fill="currentColor"/></svg>
);
export const Acc3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><circle cx="55" cy="65" r="3" fill="currentColor"/></svg>
);
export const Acc4: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 100 100" {...props}><rect x="30" y="75" width="20" height="5" fill="currentColor" transform="rotate(-20 40 77.5)"/></svg>
);
export const Acc5: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><circle cx="50" cy="60" r="6" fill="currentColor"/></svg>
);
export const Acc6: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><path d="M50 0 L40 30 H60 Z" fill="currentColor"/></svg>
);
export const Acc7: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><g fill="none" stroke="currentColor" strokeWidth="3"><circle cx="35" cy="50" r="8"/><circle cx="65" cy="50" r="8"/><path d="M43,50 H57"/></g></svg>
);
export const Acc8: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 100 100" {...props}><path d="M5,20 C15,10 30,10 40,20 C30,30 15,30 5,20 Z M38,18 L45,15" fill="currentColor" stroke="currentColor" strokeWidth="1"/></svg>
);
