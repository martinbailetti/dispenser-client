import "@testing-library/jest-dom/extend-expect";
declare global {
    interface Window {  
        bridge_actionFromMachine: (param: string) => void;
        bridge_actionFromWeb: (param: string) => void;
    }
}

export { }; 