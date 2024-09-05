import { TableData } from "./TableData";

/* eslint-disable react/prop-types */
export const TableRow = ({ headers, item }) => {
    return (
        <tr key={item.id}>
            {headers.map((header, index) => (
                <TableData key={`${index}-${item}`} header={header} item={item} colIndex={index} />
            ))}
        </tr>
    );
};
