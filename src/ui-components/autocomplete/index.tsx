import React, {useState} from 'react';

import styles from './index.module.css';

export type SuggestionElement = {
    id: number;
    name: string;
};

type Props = {
    suggestions: SuggestionElement[];
    onChoose: (element: SuggestionElement) => void;
};

type State = {
    activeSuggestion: number;
    // The suggestions that match the user's input
    filteredSuggestions: SuggestionElement[];
    // Whether or not the suggestion list is shown
    showSuggestions: boolean;
    // What the user has entered
    userInput: string;
};

export const Autocomplete = (props: Props): React.ReactElement => {
    const [state, setState] = useState<State>({
        // The active selection's index
        activeSuggestion: 0,
        // The suggestions that match the user's input
        filteredSuggestions: [],
        // Whether or not the suggestion list is shown
        showSuggestions: false,
        // What the user has entered
        userInput: '',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onChange = (e: any) => {
        const {suggestions} = props;
        const userInput = e.currentTarget.value;

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) >
                -1,
        );

        setState({
            activeSuggestion: 0,
            filteredSuggestions: filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value,
        });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onClick = (e: any) => {
        const text = e.currentTarget.innerText as string;
        const id = Number(e.target.getAttribute('data-key'));

        setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: text,
        });
        props.onChoose({id: +id, name: text});
    };

    const onKeyDown = (e: {keyCode: number}) => {
        const {activeSuggestion, filteredSuggestions} = state;

        // User pressed the enter key
        if (e.keyCode === 13) {
            setState({
                filteredSuggestions: [],
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]?.name || '',
            });
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            setState((state) => ({
                ...state,
                activeSuggestion: activeSuggestion - 1,
            }));
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            setState((state) => ({
                ...state,
                activeSuggestion: activeSuggestion + 1,
            }));
        }
    };

    const {
        showSuggestions,
        userInput,
        filteredSuggestions,
        activeSuggestion,
    } = state;

    return (
        <div className={styles.autocomplete}>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={state.userInput}
                className={styles.inputText}
                placeholder={'Введите название'}
            />
            {showSuggestions && userInput && (
                <ul className={styles.suggestions}>
                    {filteredSuggestions.map((suggestion, index) => {
                        let className;

                        // Flag the active suggestion with a class
                        if (index === activeSuggestion) {
                            className = styles.suggestionActive;
                        }

                        return (
                            <li
                                className={`${styles.suggestionElement} ${className}`}
                                key={suggestion.id}
                                data-key={suggestion.id}
                                onClick={onClick}
                            >
                                {suggestion.name}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};
