import PinInput from './PinInput';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import CryptoHelper from '../../../lib/CryptoHelper';

describe('PinInput', () => {
    it('should update the display with a masked value when button pressed', async() => {
        const { container } = render(<PinInput />);
        const input = container.querySelector('input');
        const btn_1 : HTMLButtonElement | null = container.querySelector('#pin_button_1');
        btn_1?.click();
        waitFor(() => {
            expect(input?.value).toBe("●")
        })
    });
    it('should remove a masked character from the display when the backspace is pressed', async() => {
        const { container } = render(<PinInput />);
        const input = container.querySelector('input');
        const btn_1 : HTMLButtonElement | null = container.querySelector('#pin_button_1');
        btn_1?.click();
        const btn_backspace : HTMLButtonElement | null = container.querySelector('#pin_button_backspace');
        btn_backspace?.click();
        waitFor(() => { 
            expect(input?.value).toBe("")
        });
    });
    it('should return a hashed pin when the enter key is pressed', async() => {
        const onSubmit = (pin: string) => { 
            waitFor(() => {
                expect(pin).toBe(CryptoHelper.createSha512Hash("1"));
            })
        }
        const { container } = render(<PinInput onSubmit={onSubmit}/>);
        const btn_1 : HTMLButtonElement | null = container.querySelector('#pin_button_1');
        btn_1?.click();
        const btn_enter : HTMLButtonElement | null = container.querySelector('#pin_button_enter');
        btn_enter?.click()
    })
    it('if no input is passed when enter pressed, it should return nothing', () => {
        const onSubmit = (pin: string) => { 
            waitFor(() => {
                expect(pin).toBe("");
            })
        }
        const { container } = render(<PinInput onSubmit={onSubmit}/>);
        const btn_enter : HTMLButtonElement | null = container.querySelector('#pin_button_enter');
        btn_enter?.click()
    })
});