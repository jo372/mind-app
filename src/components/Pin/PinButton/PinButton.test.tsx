import PinButton from './PinButton';
import React from "react";
import { render } from '@testing-library/react'

describe('PinButton', () => {
    it('should have an "onClick" listener when the props are provided', () => {
        const onClick = jest.fn();
        const { container } = render(<PinButton onClick={onClick} />);
        const input = container.querySelector('button');
        input?.click();
        expect(onClick).toHaveBeenCalled();
    })
    it('when the button is clicked it should have an "active" class', () => {
        const { container } = render(<PinButton />);
        const input = container.querySelector('button');
        input?.click();
        expect(input?.classList.contains('active')).toBe(true);
    })
    it('when the button is clicked it should remove class "active" after 100ms', () => {
        jest.useFakeTimers();
        const { container } = render(<PinButton />);
        const input = container.querySelector('button');
        input?.click();
        expect(input?.classList.contains('active')).toBe(true);
        jest.advanceTimersByTime(100);
        expect(input?.classList.contains('active')).toBe(false);
    })
    it('should return text when "text" prop is provided with no child', () => {
        const { container } = render(<PinButton text="test" />);
        const input = container.querySelector('button');
        expect(input?.textContent).toBe('test');
    })
    it('should return child when "text" prop is not provided', () => {
        const { container } = render(<PinButton><div>test</div></PinButton>);
        const input = container.querySelector('button');
        expect(input?.textContent).toBe('test');
    })
});