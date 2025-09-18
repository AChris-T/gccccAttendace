import { AgGridReact } from 'ag-grid-react';
import { useCallback, useMemo, useState } from 'react';
import {
    ModuleRegistry,
    AllCommunityModule,
} from 'ag-grid-community';

// Register the module
ModuleRegistry.registerModules([
    AllCommunityModule, // or AllEnterpriseModule
]);

const FirstTimersTable = () => {
    const [rowData, setRowData] = useState([
        { id: 1, make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { id: 2, make: "Ford", model: "F-Series", price: 33850, electric: false },
        { id: 3, make: "Ford", model: "F-Series", price: 33850, electric: false },
        { id: 4, make: "Ford", model: "F-Series", price: 33850, electric: false },
        { id: 5, make: "Ford", model: "F-Series", price: 33850, electric: false },
        { id: 6, make: "Ford", model: "F-Series", price: 33850, electric: false },
    ]);
    const defaultColDef = useMemo(() => ({
        flex: 1, filter: true, editable: true, enableCellChangeFlash: true,
    }), [])
    const rowSelection = useMemo(() => {
        return {
            mode: 'multiRow',
        };
    }, []);
    const onRowSelected = useCallback((event) => {
        console.log(
            "row " +
            event.node.data.make +
            " selected = " +
            event.node.isSelected(),
        );
    }, []);
    const getRowId = useCallback((params) => {
        console.log(params)
        return params.data.id;
    }, []);
    const onSelectionChanged = useCallback((event) => {
        const rowCount = event.selectedNodes?.length;
        console.log("selection changed, " + rowCount + " rows selected");
    }, []);
    const CompanyLogoRenderer = ({ value }) => (
        <span style={{ display: "flex", height: "100%", width: "100%", alignItems: "center" }}>{value && <img alt={`${value} Flag`} src={`https://www.ag-grid.com/example-assets/space-company-logos/${value?.toLowerCase()}.png`} style={{ display: "block", width: "25px", height: "auto", maxHeight: "50%", marginRight: "12px", filter: "brightness(1.1)" }} />}<p style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{value}</p></span>
    );
    const [colDefs, setColDefs] = useState([
        { field: "make", filter: true },
        { field: "model", pinned: 'left', rowDrag: true },
        { field: "price", valueFormatter: params => { return '£' + params.value.toLocaleString(); } },
        { field: "electric", }, //cellRenderer: CompanyLogoRenderer
    ]);
    const [count, setCount] = useState(0);
    // const isRowSelectable = useCallback((node) => node.data.value > count, [count]);
    return (
        <div className='mb-2' style={{ width: "100%", height: 400 }}>
            <AgGridReact rowSelection={rowSelection} pagination={true} defaultColDef={defaultColDef} loading={false} rowData={rowData} columnDefs={colDefs} onCellValueChanged={event => console.log(`New Cell Value: ${event.value}`)}
                onRowSelected={onRowSelected}
                onSelectionChanged={onSelectionChanged}
                getRowId={getRowId}
                suppressDragLeaveHidesColumns={true}
                debug
            />
            {/* rowBuffer={rowBuffer}

            // GOOD
            rowModelType='clientSide'
            rowHeight={50} */}
        </div>
    )
}

export default FirstTimersTable