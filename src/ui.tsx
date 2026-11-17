export function Sprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
      <symbol id="art-wheat" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 58V14" />
          <path d="M32 46c-8 0-13-5-14-12 8 0 13 4 14 12z" />
          <path d="M32 46c8 0 13-5 14-12-8 0-13 4-14 12z" />
          <path d="M32 34c-8 0-12-5-13-11 7 0 12 4 13 11z" />
          <path d="M32 34c8 0 12-5 13-11-7 0-12 4-13 11z" />
          <path d="M32 22c-6 0-10-4-10-9 5 0 9 3 10 9z" />
          <path d="M32 22c6 0 10-4 10-9-5 0-9 3-10 9z" />
        </g>
      </symbol>
      <symbol id="art-croissant" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 44c-3-11 6-23 23-23s26 12 23 23c-8-6-15-3-23 3-8-6-15-9-23-3z" />
          <path d="M20 24c-2 7-1 13 3 18" />
          <path d="M32 21v24" />
          <path d="M44 24c2 7 1 13-3 18" />
        </g>
      </symbol>
      <symbol id="art-loaf" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 40c0-11 11-19 24-19s24 8 24 19c0 6-11 10-24 10S8 46 8 40z" />
          <path d="M20 28l5 6M30 25l5 6M40 28l5 6" />
          <path d="M8 40c0 6 11 10 24 10s24-4 24-10" />
        </g>
      </symbol>
      <symbol id="art-cupcake" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 34h28l-4 20H22z" />
          <path d="M18 34c0-4 2-6 4-8-2-4 0-8 4-9 0-4 4-7 8-7s8 3 8 7c4 1 6 5 4 9 2 2 4 4 4 8" />
          <path d="M22 40h20M23 46h18" />
          <circle cx="32" cy="13" r="2.5" fill="currentColor" stroke="none" />
        </g>
      </symbol>
      <symbol id="art-coffee" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 28h34v13a11 11 0 0 1-11 11H21a11 11 0 0 1-11-11z" />
          <path d="M44 31h5a6 6 0 0 1 0 12h-5" />
          <path d="M18 20c-2-3 2-5 0-8M28 20c-2-3 2-5 0-8M38 20c-2-3 2-5 0-8" />
          <path d="M8 56h44" />
        </g>
      </symbol>
      <symbol id="art-cake" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 30h44v16a6 6 0 0 1-6 6H16a6 6 0 0 1-6-6z" />
          <path d="M10 30c4-4 8 2 12-1s8 3 12 0 8 3 12 0 8 3 8 1" />
          <path d="M32 29V14" />
          <circle cx="32" cy="12" r="3" fill="currentColor" stroke="none" />
          <path d="M20 38v8M32 38v8M44 38v8" />
        </g>
      </symbol>
      <symbol id="art-danish" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 12c14 0 22 9 22 20s-9 20-22 20S10 43 10 32s8-20 22-20z" />
          <path d="M32 18c-8 0-13 6-13 14s6 14 13 14 13-6 13-14-5-14-13-14z" />
          <circle cx="32" cy="32" r="5" />
          <path d="M24 22l3 3M40 22l-3 3M24 42l3-3M40 42l-3-3" />
        </g>
      </symbol>
      <symbol id="art-pin" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M32 58s18-18 18-32a18 18 0 1 0-36 0c0 14 18 32 18 32z" />
          <circle cx="32" cy="26" r="7" />
        </g>
      </symbol>
      <symbol id="art-leaf" viewBox="0 0 64 64">
        <g fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M52 12C28 12 14 22 14 40c0 6 3 10 3 10s4-16 20-24c-10 8-16 16-18 26 20 2 33-16 33-40z" />
        </g>
      </symbol>
      <symbol id="art-heart" viewBox="0 0 64 64">
        <path d="M32 54S10 40 10 25a12 12 0 0 1 22-7 12 12 0 0 1 22 7c0 15-22 29-22 29z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      </symbol>
    </svg>
  );
}

export function Icon({ name, className = '' }: { name: string; className?: string }) {
  return (
    <svg className={`art ${className}`.trim()} aria-hidden="true">
      <use href={`#art-${name}`} />
    </svg>
  );
}
