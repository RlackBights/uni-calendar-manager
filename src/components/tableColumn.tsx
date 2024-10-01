export interface tableColumnType {
    columnName: String;     
}

export default function TableColumn( { columnName } : tableColumnType ) {
    return (
        <div>
            <div className="column-header">{columnName}</div>
            <div className="column-body">
                
            </div>
        </div>
    )
}