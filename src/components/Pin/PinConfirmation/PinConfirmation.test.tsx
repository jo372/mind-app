import PinConfirmation from "./PinConfirmation"; 
import React from "react";
import { render, waitFor } from "@testing-library/react";
import Key from "../../../lib/Key";
import CryptoHelper from "../../../lib/CryptoHelper";

describe("PinConfirmation", () => {
    it('should check the localStorage and call onSuccess when pins match', async() => {
        const { localStorage } = window;
        const onSuccess = jest.fn();
        localStorage.setItem(Key.PIN, CryptoHelper.createSha512Hash("1234"));
        const { container } = render(<PinConfirmation onSuccess={onSuccess} />);
        
        for(let i=1; i <= 4; i++){
            const btn : HTMLButtonElement | null = container.querySelector(`#pin_button_${i}`);
            btn?.click();
        }
        const enter_button : HTMLButtonElement | null = container.querySelector("#pin_button_enter");
        enter_button?.click();
        waitFor(() => {
            expect(onSuccess).toHaveBeenCalled();
        })
    })
    it('should call onFailure when the pins do not match', async() => {
        const { localStorage } = window;
        const onFailure = jest.fn();
        const onSuccess = jest.fn();
        localStorage.setItem(Key.PIN, CryptoHelper.createSha512Hash("1234"));
        
        const { container } = render(<PinConfirmation onSuccess={onSuccess} onFailure={onFailure} />);
        for(let i=1; i <= 3; i++){
            const btn : HTMLButtonElement | null = container.querySelector(`#pin_button_${i}`);
            btn?.click();
        }
        const enter_button : HTMLButtonElement | null = container.querySelector("#pin_button_enter");
        enter_button?.click();
        waitFor(() => {
            expect(onFailure).toHaveBeenCalled();
        });
    });
});