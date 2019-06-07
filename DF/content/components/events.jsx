import Datatable from 'react-data-table-component';
import { connect } from 'react-redux';
import ExpandedRow from './subEvent/expandedRow';

require('./events.scss');

// Displays the events in a table
class Events extends React.Component{
    // Table columns
    columns() {
        return [
            {
                name: 'Name',
                selector: 'name',
                sortable: true
            },
            {
                name: 'Date',
                selector: 'date',
                sortable: true,
                cell: row => {
                    var date = new Date(row.date);
                    return (
                        <div>
                            {`${date.toLocaleDateString()} ${date.toLocaleTimeString()}`}
                        </div>
                    )
                }
            }
        ];
    }

    render() {
        return(
            <div className="Events">
                <div>
                    <Datatable
                        title="Events"
                        columns={this.columns()}
                        data={this.props.events}

                        expandableRows
                        expandableRowsComponent={<ExpandedRow />}
                    />
                </div>
            </div>
        );
    }
}

Events.propTypes={
};

const mapStateToProps = state => {
    return {
        events: state.events
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);