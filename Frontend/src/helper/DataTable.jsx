import React from "react";

export default function Datatable({ data }) {

    const columns = data[0] && Object.keys(data.results[0]);
    data[0] && console.log(Object.keys(data.results[0]))
    return <table cellPadding={0} cellSpacing={0}>
        <thead>
            <tr>
                {data[0] && columns.map((heading) =>
                    <th>{heading}</th>
                )}
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
}