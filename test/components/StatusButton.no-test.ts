// /* eslint-disable no-undef */
// import "@testing-library/jest-dom";
// import { render, screen, fireEvent } from '@testing-library/react';
// import { StatusButton } from '../../src/components/table/buttons/StatusButton';
// import { statusColors } from '../../src/app/table';

// describe('StatusButton', () => {
//   const statusOptions = statusColors.Users;

//   const renderStatusButton = (status:any) => {
//     render(<StatusButton text={status} statusColors={statusOptions} />);
//     return screen.getByRole('button', { name: status });
//   };

//   const expectButtonToHaveStatus = (button:any, status: string | RegExp) => {
//     expect(button).toHaveTextContent(status);
//     expect(button).toHaveStyle(`background-color: ${statusOptions[status]}`);
//   };

//   test('should render the button with the correct initial color and text', () => {
//     const initialStatus = 'Active';

//     const button = renderStatusButton(initialStatus);

//     expectButtonToHaveStatus(button, initialStatus);
//   });

//   test('should change to the next status and color when clicked', () => {
//     const initialStatus = 'Active';
//     const nextStatus = 'Inactive';

//     const button = renderStatusButton(initialStatus);

//     expectButtonToHaveStatus(button, initialStatus);

//     fireEvent.click(button);

//     expectButtonToHaveStatus(button, nextStatus);
//   });
// });
