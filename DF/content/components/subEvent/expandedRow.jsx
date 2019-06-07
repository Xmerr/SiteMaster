// Displays the event details under each table row
class ExpandedRow extends React.Component{
    render() {
        return(
            <div className="ExpandedRow">
                <div className="desc">
                    {this.props.data.description}
                </div>
            </div>
        );
    }
}

ExpandedRow.propTypes={
    data: PropTypes.object, // Row Data
};

export default ExpandedRow;