import React from "react";

export function IconSpin(): JSX.Element {
  return (
    <svg
      role="progressbar"
      className="github-autocomplete--icon-spinner"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path
        style={{ opacity: 0.75 }}
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}

export function IconCross(): JSX.Element {
  return (
    <svg className="github-autocomplete--icon-cross" viewBox="0 0 14 14">
      <path
        d="M6.012 7L1 12.012l.988.988L7 7.988 12.012 13l.988-.988L7.988 7 13 1.988 12.012 1 7 6.012 1.988 1 1 1.988 6.012 7z"
        fill="currentColor"
      />
    </svg>
  );
}

export function IconSearch(): JSX.Element {
  return (
    <svg className="github-autocomplete--icon-search" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.486 1.6a3.886 3.886 0 100 7.771 3.886 3.886 0 000-7.771zM0 5.486a5.486 5.486 0 1110.971 0A5.486 5.486 0 010 5.486z" />
      <path d="M10.83 9.34a.5.5 0 01.244.134l4.572 4.572a.5.5 0 010 .708l-.892.892a.5.5 0 01-.707 0l-4.573-4.572a.5.5 0 01-.134-.245l-.426-1.915 1.915.426z" />
    </svg>
  );
}

export function IconRepo(): JSX.Element {
  return (
    <svg className="github-autocomplete--icon-repo" fill="currentColor" viewBox="0 0 16 16" version="1.1">
      <path
        fillRule="evenodd"
        d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
      ></path>
    </svg>
  );
}

export function IconUser(): JSX.Element {
  return (
    <svg fill="currentColor" className="github-autocomplete--icon-user" viewBox="0 0 24 24">
      <path d="M12 14.016q2.531 0 5.273 1.102t2.742 2.883v2.016h-16.031v-2.016q0-1.781 2.742-2.883t5.273-1.102zM12 12q-1.641 0-2.813-1.172t-1.172-2.813 1.172-2.836 2.813-1.195 2.813 1.195 1.172 2.836-1.172 2.813-2.813 1.172z"></path>
    </svg>
  );
}
