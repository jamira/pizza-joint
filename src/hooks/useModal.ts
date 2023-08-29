import { useState } from "react";

interface CustomHookState {
    isShowing: boolean;
    handleToggle: (isShow: boolean) => void;
}

const useModal = (initialValue: boolean = false): CustomHookState => {
    const [isShowing, setIsShowing] = useState(initialValue);

    const handleToggle = () => {
        setIsShowing(!isShowing);
    };

    return {
        isShowing,
        handleToggle
    };
}

export default useModal;
