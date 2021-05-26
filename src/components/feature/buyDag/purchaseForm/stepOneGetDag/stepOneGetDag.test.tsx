///////////////////////////
// Module Imports 
///////////////////////////

import { render } from '@testing-library/react'

///////////////////////////
// View Imports
///////////////////////////

import StepOneGetDag from '.';

///////////////////////////
// Test 
///////////////////////////

describe("Purchase Form - StepOneGetDag", () => {

    let component;

    beforeEach(() => {
        component = render(<StepOneGetDag />);
    })

    it('should render correctly', () => {
        expect(component).toMatchSnapshot();
    });    


})