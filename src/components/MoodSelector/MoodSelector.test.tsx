import MoodSelector, { Mood } from "./MoodSelector";
import React from "react";
import { render } from '@testing-library/react'

describe('MoodSelector', () => {
    it('should return a Mood when the button has been clicked.', () => {
      const onClickHandler = jest.fn((mood: Mood | undefined) => {
          expect(mood).toBeDefined()
      });
      const { container } = render(<MoodSelector onClick={onClickHandler}/>);
      const moodButton = container.querySelector('.btn.mood') as HTMLButtonElement;
      moodButton?.click();
      expect(onClickHandler).toHaveBeenCalled();
    });
    it('when a mood is pressed it should contain the active class', () => {
        const { container } = render(<MoodSelector onClick={jest.fn()}/>);
        const moodButton = container.querySelector('.btn.mood') as HTMLButtonElement;
        moodButton?.click();
        expect(moodButton?.classList.contains('active')).toBeTruthy();
    });
    it('when a different mood is selected, it should remove the active class from the previous element', () => {
        const { container } = render(<MoodSelector onClick={jest.fn()}/>);
        const firstMoodButton = container.querySelector('.btn.mood') as HTMLButtonElement;
        firstMoodButton.click();
        expect(firstMoodButton?.classList.contains('active')).toBeTruthy();
        const secondMoodButton = container.querySelectorAll('.btn.mood')[1] as HTMLButtonElement;
        secondMoodButton.click();
        expect(secondMoodButton?.classList.contains('active')).toBeTruthy();
        expect(firstMoodButton?.classList.contains('active')).toBeFalsy();
    });
    it('if the same mood is selected again, it should remove the active class from the element', () => {
        const { container } = render(<MoodSelector onClick={jest.fn()}/>);
        const firstMoodButton = container.querySelector('.btn.mood') as HTMLButtonElement;
        firstMoodButton.click();
        expect(firstMoodButton?.classList.contains('active')).toBeTruthy();
        firstMoodButton.click();
        expect(firstMoodButton?.classList.contains('active')).toBeFalsy();
    })
    it('should return undefined when no option is selected', () => {
        let counter = 0;
        const onClickHandler = jest.fn((mood: Mood | undefined) => {
            if(counter === 1) expect(mood).toBeUndefined();
            counter++; 
        });
        const { container } = render(<MoodSelector onClick={onClickHandler}/>);
        const moodButton = container.querySelector('.btn.mood') as HTMLButtonElement;
        moodButton?.click();
        moodButton?.click();
    })
})