import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import "./Autocomplete.css";
import { useDebounce, useKeyboard, useOutsideClick } from "./hooks";
import { IconCross, IconRepo, IconSearch, IconSpin, IconUser } from "./Icons";
import { GHItem, GHItemRepo, GHItemUser, Status } from "./types";

const fetchUsers = async (query: string, page = 1): Promise<GHItemUser[]> => {
  const res = await axios.get("https://api.github.com/search/users", {
    params: { q: `${query} in:login type:user`, per_page: 50, page },
  });

  return res.data.items.map((item: any) => ({ ...item, type: "user", name: item.login }));
};

const fetchRepos = async (query: string, page = 1): Promise<GHItemRepo[]> => {
  const res = await axios.get("https://api.github.com/search/repositories", {
    params: { q: `${query} in:name`, per_page: 50, page },
  });

  return res.data.items.map((item: any) => ({ ...item, type: "repo", name: item.full_name || item.name }));
};

function UnderlinedResult({ text, value }: { text: string; value: string }): JSX.Element {
  const beginIndex = text.toLowerCase().indexOf(value.toLowerCase());
  const begin = text.slice(0, beginIndex);
  const middle = text.slice(beginIndex, beginIndex + value.length);
  const end = text.slice(beginIndex + value.length, text.length);

  return (
    <>
      {begin}
      <span style={{ textDecoration: "underline" }}>{middle}</span>
      {end}
    </>
  );
}

function Autocomplete({ name, placeholder }: { name: string; placeholder?: string }): JSX.Element {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<GHItem[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const debouncedValue = useDebounce(value, 500);

  const init = useCallback(async () => {
    if (debouncedValue !== undefined && debouncedValue.length >= 3) {
      setStatus("loading");

      try {
        const users = await fetchUsers(debouncedValue);
        const repos = await fetchRepos(debouncedValue);
        const combined = [...users, ...repos];
        const combinedSorted = combined.sort((a, b) => a.name.localeCompare(b.name));

        setResults(combinedSorted);
        setStatus("success");
      } catch (err) {
        setResults([]);
        setStatus("error");
      }
    }
  }, [debouncedValue]);

  useEffect(() => {
    init();
  }, [init]);

  const reset = () => {
    setValue("");
    setStatus("idle");
    setResults([]);
    setSelectedIndex(0);
  };

  const { dropdownMenuRef, inputRef } = useOutsideClick(reset);

  const { selectedIndex, setSelectedIndex } = useKeyboard(reset, results);

  return (
    <div className="makersden-autocomplete-wrapper">
      <form role="search" noValidate onSubmit={(event) => event.preventDefault()}>
        <label id="makersden-autocomplete-label" className="makersden-autocomplete-input-label">
          Search GitHub
        </label>
        <input
          aria-autocomplete="list"
          aria-labelledby="makersden-autocomplete-label"
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          className="makersden-autocomplete-input"
          enterKeyHint="go"
          maxLength={64}
          name={name}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          ref={inputRef}
          spellCheck="false"
          type="search"
          value={value}
        />
      </form>

      <IconSearch />

      {status === "loading" && <IconSpin />}

      {status !== "loading" && (
        <button
          className="makersden-autocomplete--button-reset"
          onClick={() => reset()}
          title="Clear the query"
          type="reset"
        >
          <IconCross />
        </button>
      )}

      {status === "error" && (
        <div role="alert" className="makersden-autocomplete-menu--error">
          Something went wrong. Try again in a few moments.
        </div>
      )}

      {status === "success" && (
        <div className="makersden-autocomplete-menu" ref={dropdownMenuRef}>
          <ul role="listbox">
            {results?.map((item, index) => (
              <li
                aria-selected={selectedIndex === index}
                className="makersden-autocomplete-menu-item"
                key={item?.id}
                onMouseEnter={() => setSelectedIndex(index)}
                role="option"
              >
                <a target="_blank" rel="noopener noreferrer" href={item?.html_url}>
                  {item.type === "repo" ? <IconRepo /> : <IconUser />}
                  <UnderlinedResult text={item.name} value={debouncedValue} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Autocomplete;
